/** @format */

import type { UserRole } from "@/components/layout/app-shell";
import { createHash } from "crypto";
import { NextResponse } from "next/server";

const LOOKS_HASH = /^[a-f0-9]{64}$/i;

interface CredentialConfig {
	role: UserRole;
	passwordEnv?: string;
}

interface CredentialMatch {
	role: UserRole;
	token: string;
}

function normalizeSecret(value?: string) {
	if (!value) return null;
	const trimmed = value.trim();
	return LOOKS_HASH.test(trimmed) ? trimmed.toLowerCase() : trimmed;
}

function hash(value: string) {
	return createHash("sha256").update(value).digest("hex");
}

function resolveCredential(
	passwordInput: string,
	credentials: CredentialConfig[]
): CredentialMatch | null {
	const trimmedInput = passwordInput.trim();
	for (const credential of credentials) {
		const storedSecretRaw = credential.passwordEnv;
		const normalizedStored = normalizeSecret(storedSecretRaw);
		if (!normalizedStored) continue;

		const isStoredHash = LOOKS_HASH.test(normalizedStored);
		const candidate = isStoredHash
			? hash(trimmedInput).toLowerCase()
			: trimmedInput;

		if (candidate === normalizedStored) {
			return {
				role: credential.role,
				token: normalizedStored,
			};
		}
	}

	return null;
}

export async function POST(request: Request) {
	const { password } = await request.json().catch(() => ({}));

	if (typeof password !== "string" || !password.trim()) {
		return NextResponse.json(
			{ error: "Password is required." },
			{ status: 400 }
		);
	}

	const builtInNamed: Record<string, { name: string; tz?: string; restrictAsk?: boolean; chatEnabled?: boolean }> = {
		BPScott27: { name: "Scott", tz: "Asia/Dubai" },
		BPVikas27: { name: "Vikas" },
		BPinvestor27: { name: "Investor" },
		BPKapil27: { name: "Kapil Mittal", chatEnabled: true },
		BPZulfiqar27: { name: "Zulfiqar", restrictAsk: true },
		BPSparsh27: { name: "Sparsh", restrictAsk: true },
		BPYuri27: { name: "Yuri", tz: "America/New_York" },
		BPJoel27: { name: "Joel", tz: "Asia/Kolkata" },
		BPInderjeet27: { name: "Inderjeet", tz: "Asia/Kolkata" },
		BPAnjali27: { name: "Anjali", tz: "Asia/Kolkata" },
		BPSam27: { name: "Sam", tz: "Europe/Copenhagen" },
		BPInvestor27: { name: "__no_name__" },
	};

	const namedPasswords: Record<string, string> = {};
	const namedTimezones: Record<string, string> = {};

	for (const [pw, cfg] of Object.entries(builtInNamed)) {
		namedPasswords[pw] = cfg.name;
		if (cfg.tz) namedTimezones[pw] = cfg.tz;
	}

	for (let i = 1; i <= 10; i++) {
		const pw = process.env[`NAMED_PASSWORD_${i}`];
		const name = process.env[`NAMED_GREET_${i}`];
		const tz = process.env[`NAMED_TIMEZONE_${i}`];
		if (pw && name) {
			namedPasswords[pw.trim()] = name.trim();
			if (tz) namedTimezones[pw.trim()] = tz.trim();
		}
	}

	const namedRestrictAsk: Record<string, boolean> = {};
	const namedChatEnabled: Record<string, boolean> = {};

	for (const [pw, cfg] of Object.entries(builtInNamed)) {
		if (cfg.restrictAsk) namedRestrictAsk[pw] = true;
		if (cfg.chatEnabled) namedChatEnabled[pw] = true;
	}

	const trimmedPw = password.trim();
	const greetName = namedPasswords[trimmedPw] ?? null;
	const greetTimezone = namedTimezones[trimmedPw] ?? null;
	const restrictAsk = namedRestrictAsk[trimmedPw] ?? false;
	const chatEnabled = namedChatEnabled[trimmedPw] ?? false;

	const credentialMatrix: CredentialConfig[] = [
		{ role: "admin", passwordEnv: process.env.ADMIN_PASSWORD },
		{ role: "investor", passwordEnv: process.env.INVESTOR_PASSWORD },
		{ role: "investor-lite", passwordEnv: process.env.INVESTOR_LITE_PASSWORD },
	];

	let match = resolveCredential(password, credentialMatrix);

	if (!match && greetName) {
		match = {
			role: "investor",
			token: hash(trimmedPw),
		};
	}

	// Development fallback
	const noCredsConfigured = credentialMatrix.every(
		(c) => !normalizeSecret(c.passwordEnv)
	);
	if (!match && noCredsConfigured && process.env.NODE_ENV !== "production") {
		const devPassword = "boyar-dev";
		if (trimmedPw === devPassword) {
			match = {
				role: "investor-lite",
				token: hash(devPassword),
			} as CredentialMatch;
		}
	}

	if (!match) {
		return NextResponse.json(
			{ error: "Invalid credentials." },
			{ status: 401 }
		);
	}

	const response = NextResponse.json({
		success: true,
		role: match.role,
		redirect: "/tools",
		...(greetName ? { greetName } : {}),
		...(greetTimezone ? { greetTimezone } : {}),
		...(restrictAsk ? { restrictAsk: true } : {}),
		...(chatEnabled ? { chatEnabled: true } : {}),
	});

	response.cookies.set("bp_auth_token", match.token, {
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 8,
	});

	response.cookies.set("bp_auth_flag", match.role, {
		httpOnly: false,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 8,
	});

	return response;
}
