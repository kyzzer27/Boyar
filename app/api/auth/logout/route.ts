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

	const applyBody = (parsed: unknown) => {
		if (!parsed || typeof parsed !== "object") return;
		const obj = parsed as Record<string, unknown>;
		if (typeof obj.sessionId === "string") sessionId = obj.sessionId;
		if (typeof obj.endedAt === "number" && Number.isFinite(obj.endedAt)) {
			clientEndedAt = obj.endedAt;
		}
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

	// Clear all auth/tracking cookies.
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

	return response;
}
