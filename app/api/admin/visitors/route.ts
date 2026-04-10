/** @format */

import { NextResponse } from "next/server";
import { visitorStore, pruneStale } from "@/lib/visitor-store";

const ADMIN_PASSWORD = "BPJoel27";

export async function GET(request: Request) {
	// Accept auth via header OR login-password cookie matching admin password
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

	pruneStale();

	const sessions = Array.from(visitorStore.sessions.values()).sort(
		(a, b) => b.loginAt - a.loginAt
	);

	const history = visitorStore.history ?? [];

	return NextResponse.json({
		ok: true,
		count: sessions.length,
		historyCount: history.length,
		serverTime: Date.now(),
		sessions,
		history,
	});
}
