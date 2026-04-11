/** @format */

import { NextResponse } from "next/server";
import {
	getLiveSessions,
	getHistory,
	pruneStale,
	isKvConfigured,
} from "@/lib/visitor-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = "BPJoel27";

export async function GET(request: Request) {
	// Accept auth via header OR login-password cookie matching admin password.
	const headerAuth = request.headers.get("x-admin-password") ?? "";
	const cookieHeader = request.headers.get("cookie") ?? "";
	const loginPw = cookieHeader
		.split(";")
		.map((c) => c.trim())
		.find((c) => c.startsWith("bp_login_pw="));
	const loginPwValue = loginPw ? decodeURIComponent(loginPw.split("=")[1] ?? "") : "";

	if (headerAuth !== ADMIN_PASSWORD && loginPwValue !== ADMIN_PASSWORD) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await pruneStale();
		const liveRaw = await getLiveSessions();
		const history = await getHistory();

		const sessions = liveRaw.sort((a, b) => b.loginAt - a.loginAt);

		return NextResponse.json({
			ok: true,
			persistent: isKvConfigured(),
			count: sessions.length,
			historyCount: history.length,
			serverTime: Date.now(),
			sessions,
			history,
		});
	} catch (err) {
		console.error("admin visitors GET failed", err);
		return NextResponse.json({ error: "store unavailable" }, { status: 500 });
	}
}
