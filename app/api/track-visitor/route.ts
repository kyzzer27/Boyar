/** @format */

import { NextResponse } from "next/server";
import {
	upsertSession,
	deleteSession,
	detectPlatform,
	pruneStale,
	ADMIN_PASSWORDS,
	nameForPassword,
	type VisitorSession,
} from "@/lib/visitor-store";

// Force node runtime so we can use @vercel/kv.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(request: Request): string {
	const h = request.headers;

	// Vercel's trusted client IP header is the most reliable.
	const vercel = h.get("x-vercel-forwarded-for");
	if (vercel) return vercel.split(",")[0].trim();

	const forwarded = h.get("x-forwarded-for");
	if (forwarded) return forwarded.split(",")[0].trim();

	const real = h.get("x-real-ip");
	if (real) return real.trim();

	const cf = h.get("cf-connecting-ip");
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

	if (!sessionId) {
		return NextResponse.json({ error: "sessionId required" }, { status: 400 });
	}

	const cookieName = readCookie(request, "bp_login_name");
	const cookiePw = readCookie(request, "bp_login_pw");
	const cookieRole = readCookie(request, "bp_auth_flag");
	const password: string | null = cookiePw;
	const role: string | null = cookieRole ?? (typeof body.role === "string" ? body.role : null);
	const name: string | null =
		cookieName ??
		nameForPassword(password) ??
		(typeof body.name === "string" ? body.name : null);

	// Admin sessions are never tracked. If the session was created pre-login
	// and is now being upgraded to admin, also remove the pre-existing record.
	if (password && ADMIN_PASSWORDS.has(password)) {
		try {
			await deleteSession(sessionId);
		} catch {
			/* noop */
		}
		return NextResponse.json({ ok: true, skipped: "admin" });
	}

	const ip = getClientIp(request);
	const userAgent = request.headers.get("user-agent") ?? "";
	const platform = detectPlatform(userAgent);
	const now = Date.now();

	const session: VisitorSession = {
		id: sessionId,
		ip,
		userAgent,
		platform,
		timezone,
		loginAt: now, // ignored on merge if session already exists
		lastSeen: now,
		name,
		role,
		password,
	};

	try {
		await upsertSession(session);
		// Fire-and-forget prune; don't block the heartbeat.
		pruneStale().catch(() => {});
	} catch (err) {
		console.error("track-visitor upsert failed", err);
		return NextResponse.json({ error: "store unavailable" }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
}
