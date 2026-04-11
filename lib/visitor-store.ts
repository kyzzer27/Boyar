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
const STALE_MS = 2 * 60 * 1000; // 2 minutes without a heartbeat = ended

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

// ---------- Public API ----------

export async function upsertSession(input: VisitorSession): Promise<VisitorSession> {
	if (KV_READY) {
		// Merge with existing so loginAt stays stable on heartbeats.
		const existingRaw = await kv.hget(LIVE_KEY, input.id);
		const existing = parseSession(existingRaw);
		const merged: VisitorSession = existing
			? {
					...existing,
					// Update mutable fields; keep original loginAt.
					ip: input.ip || existing.ip,
					userAgent: input.userAgent || existing.userAgent,
					platform: input.platform || existing.platform,
					timezone: input.timezone || existing.timezone,
					lastSeen: input.lastSeen,
					name: input.name ?? existing.name ?? null,
					role: input.role ?? existing.role ?? null,
					password: input.password ?? existing.password ?? null,
			  }
			: input;

		await kv.hset(LIVE_KEY, { [input.id]: JSON.stringify(merged) });
		return merged;
	}

	// Memory fallback
	const existing = mem.live.get(input.id);
	const merged: VisitorSession = existing
		? {
				...existing,
				ip: input.ip || existing.ip,
				userAgent: input.userAgent || existing.userAgent,
				platform: input.platform || existing.platform,
				timezone: input.timezone || existing.timezone,
				lastSeen: input.lastSeen,
				name: input.name ?? existing.name ?? null,
				role: input.role ?? existing.role ?? null,
				password: input.password ?? existing.password ?? null,
		  }
		: input;
	mem.live.set(input.id, merged);
	return merged;
}

export async function getLiveSessions(): Promise<VisitorSession[]> {
	if (KV_READY) {
		const all = (await kv.hgetall<Record<string, unknown>>(LIVE_KEY)) ?? {};
		const list: VisitorSession[] = [];
		for (const raw of Object.values(all)) {
			const parsed = parseSession(raw);
			if (parsed) list.push(parsed);
		}
		return list;
	}
	return Array.from(mem.live.values());
}

export async function getHistory(): Promise<EndedSession[]> {
	if (KV_READY) {
		const raws = (await kv.lrange<unknown>(HISTORY_KEY, 0, MAX_HISTORY - 1)) ?? [];
		const list: EndedSession[] = [];
		for (const r of raws) {
			const parsed = parseEnded(r);
			if (parsed) list.push(parsed);
		}
		return list;
	}
	return [...mem.history];
}

/** End a session (by id) — moves it from live to history with a computed duration. */
export async function endSession(
	sessionId: string,
	reason: EndedSession["endedReason"] = "stale"
): Promise<EndedSession | null> {
	if (!sessionId) return null;

	if (KV_READY) {
		const raw = await kv.hget(LIVE_KEY, sessionId);
		const session = parseSession(raw);
		if (!session) return null;

		const endedAt = reason === "logout" ? Date.now() : session.lastSeen;
		const duration = Math.max(0, endedAt - session.loginAt);
		const ended: EndedSession = { ...session, endedAt, duration, endedReason: reason };

		await kv.hdel(LIVE_KEY, sessionId);
		await kv.lpush(HISTORY_KEY, JSON.stringify(ended));
		await kv.ltrim(HISTORY_KEY, 0, MAX_HISTORY - 1);
		return ended;
	}

	const session = mem.live.get(sessionId);
	if (!session) return null;
	const endedAt = reason === "logout" ? Date.now() : session.lastSeen;
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
