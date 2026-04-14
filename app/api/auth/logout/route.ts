/** @format */

import { NextResponse } from "next/server";
import { endSession } from "@/lib/visitor-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Logout endpoint — called either by a button click or by the browser's
 * `navigator.sendBeacon` on page unload. Ends the active visitor session
 * with accurate duration and clears auth cookies.
 */
export async function POST(request: Request) {
	let sessionId = "";
	let clientEndedAt: number | undefined;
	// When `keepAuth` is true the caller (e.g. the global visitor heartbeat
	// firing on visibilitychange/pagehide) wants to end the visitor record but
	// must NOT clear the auth cookies. Otherwise transient visibility changes
	// (mobile tab switches, focus loss, file downloads) silently log users out
	// and the next click bounces them back to the home page.
	let keepAuth = false;

	const applyBody = (parsed: unknown) => {
		if (!parsed || typeof parsed !== "object") return;
		const obj = parsed as Record<string, unknown>;
		if (typeof obj.sessionId === "string") sessionId = obj.sessionId;
		if (typeof obj.endedAt === "number" && Number.isFinite(obj.endedAt)) {
			clientEndedAt = obj.endedAt;
		}
		if (obj.keepAuth === true) keepAuth = true;
	};

	try {
		applyBody(await request.json());
	} catch {
		// Also support sendBeacon which may arrive as text/plain
		try {
			const text = await request.text();
			if (text) applyBody(JSON.parse(text));
		} catch {
			/* noop */
		}
	}

	if (sessionId) {
		try {
			await endSession(sessionId, "logout", clientEndedAt);
		} catch (err) {
			console.error("logout endSession failed", err);
		}
	}

	const response = NextResponse.json({ ok: true });

	if (!keepAuth) {
		// Clear all auth/tracking cookies — only on a real logout, not on a
		// visibilitychange/pagehide beacon.
		const cookiesToClear = [
			"bp_auth_token",
			"bp_auth_flag",
			"bp_login_pw",
			"bp_login_name",
			"bp_super_admin",
		];
		for (const name of cookiesToClear) {
			response.cookies.set(name, "", {
				path: "/",
				maxAge: 0,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
			});
		}
	}

	return response;
}
