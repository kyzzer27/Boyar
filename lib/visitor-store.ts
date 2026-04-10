/** @format */

// Singleton in-memory visitor session store.
// Survives hot reloads in dev via globalThis.

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
	endedAt: number; // epoch ms — when session was pruned
	duration: number; // ms — total session duration
}

type StoreShape = {
	sessions: Map<string, VisitorSession>;
	history: EndedSession[]; // ended sessions, newest first
};

const MAX_HISTORY = 200; // keep the last 200 ended sessions

const g = globalThis as unknown as { __bpVisitorStore?: StoreShape };

if (!g.__bpVisitorStore) {
	g.__bpVisitorStore = {
		sessions: new Map<string, VisitorSession>(),
		history: [],
	};
}

// Migrate: if store was created before history was added
if (!g.__bpVisitorStore.history) {
	g.__bpVisitorStore.history = [];
}

export const visitorStore = g.__bpVisitorStore;

// Remove sessions idle for more than 2 minutes (no heartbeat).
// Ended sessions are moved to history.
const STALE_MS = 2 * 60 * 1000;

export function pruneStale() {
	const now = Date.now();
	for (const [key, session] of visitorStore.sessions) {
		if (now - session.lastSeen > STALE_MS) {
			// Move to history before deleting
			const ended: EndedSession = {
				...session,
				endedAt: session.lastSeen, // best estimate of when they left
				duration: session.lastSeen - session.loginAt,
			};
			visitorStore.history.unshift(ended);
			visitorStore.sessions.delete(key);
		}
	}
	// Trim history to MAX_HISTORY
	if (visitorStore.history.length > MAX_HISTORY) {
		visitorStore.history.length = MAX_HISTORY;
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
