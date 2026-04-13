/** @format */

// Persistent visitor session store backed by Vercel KV / Upstash Redis.
// Falls back to an in-memory store when KV env vars are absent (local dev).
//
// Data model:
//   Hash  "bp:visitor:live"     → { [sessionId]: JSON(VisitorSession) }
//   List  "bp:visitor:history"  → LPUSH JSON(EndedSession), trimmed to MAX_HISTORY

import { kv } from "@vercel/kv";

export interface VisitorSession {
	id: string;
	ip: string;
	userAgent: string;
	platform: "Desktop" | "Mobile" | "Tablet" | "Unknown";
	timezone: string;
	loginAt: number; // epoch ms — first seen
	lastSeen: number; // epoch ms — most recent heartbeat
	name?: string | null;
	role?: string | null;
	password?: string | null;
}

export interface EndedSession extends VisitorSession {
	endedAt: number; // epoch ms — when session was ended
	duration: number; // ms — total session duration
	endedReason?: "logout" | "stale" | "manual";
}

const LIVE_KEY = "bp:visitor:live";
const HISTORY_KEY = "bp:visitor:history";
const MAX_HISTORY = 500;
const STALE_MS = 90 * 1000; // 90s without a heartbeat = ended
const HEARTBEAT_MS = 5 * 1000; // expected client heartbeat cadence

/**
 * Admin passwords that should never be recorded in visitor tracking.
 * Keep this in sync with the admin password in the login route.
 */
export const ADMIN_PASSWORDS = new Set(["BPJoel27"]);

/**
 * Map of known passwords → display name. Used so the admin dashboard
 * never shows "Unknown visitor" for a password that has a friendly name,
 * even if the bp_login_name cookie wasn't yet set when the first
 * heartbeat fired.
 */
export const NAME_BY_PASSWORD: Record<string, string> = {
	BPScott27: "Scott",
	BPVikas27: "Vikas",
	BPKapil27: "Kapil Mittal",
	BPZulfiqar27: "Zulfiqar",
	BPSparsh27: "Sparsh",
	BPYuri27: "Yuri",
	BPJoel27: "Joel",
	BPInderjeet27: "Inderjeet",
	BPAnjali27: "Anjali",
	BPSam27: "Sam",
	BPInvestor27: "Investor",
	BPinvestor27: "Investor",
	BPinvestor: "Investor",
};

export function nameForPassword(pw?: string | null): string | null {
	if (!pw) return null;
	return NAME_BY_PASSWORD[pw] ?? null;
}

// ---------- KV availability detection ----------
// @vercel/kv throws at call time if env vars are missing, so we gate on them.
const KV_READY = Boolean(
	(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
		process.env.KV_URL ||
		process.env.UPSTASH_REDIS_REST_URL
);

// ---------- In-memory fallback (dev only) ----------
type MemoryShape = {
	live: Map<string, VisitorSession>;
	history: EndedSession[];
};
const g = globalThis as unknown as { __bpVisitorMem?: MemoryShape };
if (!g.__bpVisitorMem) {
	g.__bpVisitorMem = { live: new Map(), history: [] };
}
const mem = g.__bpVisitorMem!;

function parseSession(raw: unknown): VisitorSession | null {
	if (!raw) return null;
	if (typeof raw === "string") {
		try {
			return JSON.parse(raw) as VisitorSession;
		} catch {
			return null;
		}
	}
	if (typeof raw === "object") return raw as VisitorSession;
	return null;
}

function parseEnded(raw: unknown): EndedSession | null {
	if (!raw) return null;
	if (typeof raw === "string") {
		try {
			return JSON.parse(raw) as EndedSession;
		} catch {
			return null;
		}
	}
	if (typeof raw === "object") return raw as EndedSession;
	return null;
}

function isAdminPassword(pw?: string | null): boolean {
	return Boolean(pw && ADMIN_PASSWORDS.has(pw));
}

// ---------- Public API ----------

export async function upsertSession(input: VisitorSession): Promise<VisitorSession | null> {
	// Never record admin sessions.
	if (isAdminPassword(input.password)) {
		// Make sure a pre-admin session (before login) is also removed.
		await deleteSession(input.id).catch(() => {});
		return null;
	}

	// If name wasn't provided but we can infer it from the password, do so.
	const resolvedName = input.name ?? nameForPassword(input.password) ?? null;
	const normalizedInput: VisitorSession = { ...input, name: resolvedName };

	if (KV_READY) {
		// Merge with existing so loginAt stays stable on heartbeats.
		const existingRaw = await kv.hget(LIVE_KEY, normalizedInput.id);
		const existing = parseSession(existingRaw);
		const merged: VisitorSession = existing
			? {
					...existing,
					// Update mutable fields; keep original loginAt.
					ip: normalizedInput.ip || existing.ip,
					userAgent: normalizedInput.userAgent || existing.userAgent,
					platform: normalizedInput.platform || existing.platform,
					timezone: normalizedInput.timezone || existing.timezone,
					lastSeen: normalizedInput.lastSeen,
					name: normalizedInput.name ?? existing.name ?? nameForPassword(normalizedInput.password ?? existing.password) ?? null,
					role: normalizedInput.role ?? existing.role ?? null,
					password: normalizedInput.password ?? existing.password ?? null,
			  }
			: normalizedInput;

		// Double-check after merge: if the merged session is an admin, delete it.
		if (isAdminPassword(merged.password)) {
			await deleteSession(merged.id).catch(() => {});
			return null;
		}

		await kv.hset(LIVE_KEY, { [normalizedInput.id]: JSON.stringify(merged) });
		return merged;
	}

	// Memory fallback
	const existing = mem.live.get(normalizedInput.id);
	const merged: VisitorSession = existing
		? {
				...existing,
				ip: normalizedInput.ip || existing.ip,
				userAgent: normalizedInput.userAgent || existing.userAgent,
				platform: normalizedInput.platform || existing.platform,
				timezone: normalizedInput.timezone || existing.timezone,
				lastSeen: normalizedInput.lastSeen,
				name: normalizedInput.name ?? existing.name ?? nameForPassword(normalizedInput.password ?? existing.password) ?? null,
				role: normalizedInput.role ?? existing.role ?? null,
				password: normalizedInput.password ?? existing.password ?? null,
		  }
		: normalizedInput;

	if (isAdminPassword(merged.password)) {
		mem.live.delete(normalizedInput.id);
		return null;
	}

	mem.live.set(normalizedInput.id, merged);
	return merged;
}

export async function getLiveSessions(): Promise<VisitorSession[]> {
	if (KV_READY) {
		const all = (await kv.hgetall<Record<string, unknown>>(LIVE_KEY)) ?? {};
		const list: VisitorSession[] = [];
		for (const raw of Object.values(all)) {
			const parsed = parseSession(raw);
			if (parsed && !isAdminPassword(parsed.password)) list.push(parsed);
		}
		return list;
	}
	return Array.from(mem.live.values()).filter((s) => !isAdminPassword(s.password));
}

export async function getHistory(): Promise<EndedSession[]> {
	if (KV_READY) {
		const raws = (await kv.lrange<unknown>(HISTORY_KEY, 0, MAX_HISTORY - 1)) ?? [];
		const list: EndedSession[] = [];
		for (const r of raws) {
			const parsed = parseEnded(r);
			if (parsed && !isAdminPassword(parsed.password)) list.push(parsed);
		}
		return list;
	}
	return mem.history.filter((s) => !isAdminPassword(s.password));
}

/** Delete a live session without recording it to history. */
export async function deleteSession(sessionId: string): Promise<boolean> {
	if (!sessionId) return false;
	if (KV_READY) {
		await kv.hdel(LIVE_KEY, sessionId);
		return true;
	}
	return mem.live.delete(sessionId);
}

/**
 * End a session (by id) — moves it from live to history with a computed duration.
 *
 * `clientEndedAt` is a trusted client-reported timestamp from sendBeacon on
 * tab close, which is more accurate than `lastSeen` for computing the
 * effective session end time.
 */
export async function endSession(
	sessionId: string,
	reason: EndedSession["endedReason"] = "stale",
	clientEndedAt?: number
): Promise<EndedSession | null> {
	if (!sessionId) return null;

	const computeEndedAt = (session: VisitorSession): number => {
		if (reason === "logout") {
			// Prefer the client-reported timestamp (exact moment they closed),
			// fall back to server now, and as a last resort use lastSeen.
			const now = Date.now();
			if (typeof clientEndedAt === "number" && clientEndedAt > session.loginAt && clientEndedAt <= now + 2000) {
				return clientEndedAt;
			}
			return Math.max(now, session.lastSeen + HEARTBEAT_MS);
		}
		// stale / manual: extend last seen by half the heartbeat cadence to
		// approximate the moment the user actually left (they were still
		// present somewhere between lastSeen and lastSeen + HEARTBEAT_MS).
		return session.lastSeen + Math.floor(HEARTBEAT_MS / 2);
	};

	if (KV_READY) {
		const raw = await kv.hget(LIVE_KEY, sessionId);
		const session = parseSession(raw);
		if (!session) return null;

		// Never persist admin sessions.
		if (isAdminPassword(session.password)) {
			await kv.hdel(LIVE_KEY, sessionId);
			return null;
		}

		const endedAt = computeEndedAt(session);
		const duration = Math.max(0, endedAt - session.loginAt);
		const ended: EndedSession = { ...session, endedAt, duration, endedReason: reason };

		await kv.hdel(LIVE_KEY, sessionId);
		await kv.lpush(HISTORY_KEY, JSON.stringify(ended));
		await kv.ltrim(HISTORY_KEY, 0, MAX_HISTORY - 1);
		return ended;
	}

	const session = mem.live.get(sessionId);
	if (!session) return null;

	if (isAdminPassword(session.password)) {
		mem.live.delete(sessionId);
		return null;
	}

	const endedAt = computeEndedAt(session);
	const duration = Math.max(0, endedAt - session.loginAt);
	const ended: EndedSession = { ...session, endedAt, duration, endedReason: reason };
	mem.live.delete(sessionId);
	mem.history.unshift(ended);
	if (mem.history.length > MAX_HISTORY) mem.history.length = MAX_HISTORY;
	return ended;
}

/** Move any sessions whose last heartbeat is older than STALE_MS into history. */
export async function pruneStale(): Promise<void> {
	const now = Date.now();
	const live = await getLiveSessions();
	for (const s of live) {
		if (now - s.lastSeen > STALE_MS) {
			await endSession(s.id, "stale");
		}
	}
}

/** Force-end any live session (manual kick from the admin panel). */
export async function kickSession(sessionId: string): Promise<EndedSession | null> {
	return endSession(sessionId, "manual");
}

/** Wipe all historical ended sessions. */
export async function clearHistory(): Promise<void> {
	if (KV_READY) {
		await kv.del(HISTORY_KEY);
		return;
	}
	mem.history.length = 0;
}

export function detectPlatform(ua: string): VisitorSession["platform"] {
	if (!ua) return "Unknown";
	const lower = ua.toLowerCase();
	if (/ipad|tablet/.test(lower)) return "Tablet";
	if (/mobi|iphone|android.+mobile|phone/.test(lower)) return "Mobile";
	if (/mozilla|chrome|safari|firefox|edge|windows|mac|linux/.test(lower)) return "Desktop";
	return "Unknown";
}

export function isKvConfigured(): boolean {
	return KV_READY;
}
