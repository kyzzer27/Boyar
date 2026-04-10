/** @format */

import { NextResponse } from "next/server";
import { visitorStore, detectPlatform, pruneStale, type VisitorSession } from "@/lib/visitor-store";

function getClientIp(request: Request): string {
	const headers = request.headers;
	const forwarded = headers.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();
	const real = headers.get("x-real-ip");
	if (real) return real.trim();
	const cf = headers.get("cf-connecting-ip");
	if (cf) return cf.trim();
	return "unknown";
}

function readCookie(request: Request, name: string): string | null {
	const cookie = request.headers.get("cookie") ?? "";
	const parts = cookie.split(";").map((p) => p.trim());
	for (const p of parts) {
		const idx = p.indexOf("=");
		if (idx === -1) continue;
		const k = p.slice(0, idx);
		const v = p.slice(idx + 1);
		if (k === name) return decodeURIComponent(v);
	}
	return null;
}

export async function POST(request: Request) {
	const body = await request.json().catch(() => ({}));
	const sessionId: string = typeof body.sessionId === "string" ? body.sessionId : "";
	const timezone: string = typeof body.timezone === "string" ? body.timezone : "Unknown";
	const cookieName = readCookie(request, "bp_login_name");
	const cookiePw = readCookie(request, "bp_login_pw");
	const cookieRole = readCookie(request, "bp_auth_flag");
	const name: string | null = cookieName ?? (typeof body.name === "string" ? body.name : null);
	const role: string | null = cookieRole ?? (typeof body.role === "string" ? body.role : null);
	const password: string | null = cookiePw;

	if (!sessionId) {
		return NextResponse.json({ error: "sessionId required" }, { status: 400 });
	}

	const ip = getClientIp(request);
	const userAgent = request.headers.get("user-agent") ?? "";
	const platform = detectPlatform(userAgent);
	const now = Date.now();

	const existing = visitorStore.sessions.get(sessionId);
	if (existing) {
		existing.lastSeen = now;
		existing.ip = ip;
		existing.userAgent = userAgent;
		existing.platform = platform;
		existing.timezone = timezone;
		if (name) existing.name = name;
		if (role) existing.role = role;
		if (password) existing.password = password;
	} else {
		const session: VisitorSession = {
			id: sessionId,
			ip,
			userAgent,
			platform,
			timezone,
			loginAt: now,
			lastSeen: now,
			name,
			role,
			password,
		};
		visitorStore.sessions.set(sessionId, session);
	}

	pruneStale();
	return NextResponse.json({ ok: true });
}
