/** @format */

import { NextResponse } from "next/server";
import {
	getLiveSessions,
	getHistory,
	pruneStale,
	isKvConfigured,
	clearHistory,
	kickSession,
	ADMIN_PASSWORDS,
} from "@/lib/visitor-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "BPJoel27";

function isAuthorized(request: Request): boolean {
	const headerAuth = request.headers.get("x-admin-password") ?? "";
	const cookieHeader = request.headers.get("cookie") ?? "";
	const loginPw = cookieHeader
		.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith("bp_login_pw="));
	const loginPwValue = loginPw ? decodeURIComponent(loginPw.split("=")[1] ?? "") : "";
	return headerAuth === ADMIN_PASSWORD || loginPwValue === ADMIN_PASSWORD;
}

export async function GET(request: Request) {
	if (!isAuthorized(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		// Run pruneStale in parallel with reads, and don't fail the whole
		// request if pruning hits a transient KV hiccup. Stale sessions will
		// be cleaned up on the next successful poll.
		const [, liveRaw, historyRaw] = await Promise.all([
			pruneStale().catch((e) => {
				console.warn("pruneStale failed (non-fatal):", e);
				return undefined;
			}),
			getLiveSessions(),
			getHistory(),
		]);

		// Defense in depth — never leak admin sessions even if somehow stored.
		const sessions = liveRaw
			.filter((s) => !(s.password && ADMIN_PASSWORDS.has(s.password)))
			.sort((a, b) => b.loginAt - a.loginAt);
		const history = historyRaw.filter((s) => !(s.password && ADMIN_PASSWORDS.has(s.password)));

		// Compute analytics for the admin summary cards.
		const now = Date.now();
		const todayStart = new Date();
		todayStart.setHours(0, 0, 0, 0);
		const todayMs = todayStart.getTime();

		const todaysHistory = history.filter((s) => s.loginAt >= todayMs);
		const todaysLive = sessions.filter((s) => s.loginAt >= todayMs);
		const uniqueIpsToday = new Set<string>([
			...todaysHistory.map((s) => s.ip),
			...todaysLive.map((s) => s.ip),
		]);
		const uniquePasswordsToday = new Set<string>([
			...todaysHistory.map((s) => s.password ?? ""),
			...todaysLive.map((s) => s.password ?? ""),
		]);
		uniquePasswordsToday.delete("");

		const totalHistoryDuration = history.reduce((sum, s) => sum + (s.duration ?? 0), 0);
		const avgDurationMs =
			history.length > 0 ? Math.floor(totalHistoryDuration / history.length) : 0;

		const liveDurationTotal = sessions.reduce((sum, s) => sum + (now - s.loginAt), 0);

		const analytics = {
			todayVisits: todaysHistory.length + todaysLive.length,
			todayUniqueIps: uniqueIpsToday.size,
			todayUniqueUsers: uniquePasswordsToday.size,
			avgDurationMs,
			liveDurationTotalMs: liveDurationTotal,
			totalHistory: history.length,
		};

		return NextResponse.json({
			ok: true,
			persistent: isKvConfigured(),
			count: sessions.length,
			historyCount: history.length,
			serverTime: now,
			analytics,
			sessions,
			history,
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		const stack = err instanceof Error ? err.stack : undefined;
		console.error("admin visitors GET failed", { message, stack });
		return NextResponse.json(
			{
				error: "store unavailable",
				detail: message,
				kvConfigured: isKvConfigured(),
			},
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	if (!isAuthorized(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	let action = "";
	let sessionId = "";
	try {
		const body = await request.json();
		action = typeof body?.action === "string" ? body.action : "";
		sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";
	} catch {
		return NextResponse.json({ error: "Invalid body" }, { status: 400 });
	}

	try {
		if (action === "clearHistory") {
			await clearHistory();
			return NextResponse.json({ ok: true });
		}
		if (action === "kick") {
			if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });
			const ended = await kickSession(sessionId);
			return NextResponse.json({ ok: true, ended });
		}
		return NextResponse.json({ error: "Unknown action" }, { status: 400 });
	} catch (err) {
		console.error("admin visitors POST failed", err);
		return NextResponse.json({ error: "action failed" }, { status: 500 });
	}
}
