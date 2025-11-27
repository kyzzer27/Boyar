import { NextResponse } from "next/server";
import { createHash } from "crypto";
import type { UserRole } from "@/components/layout/app-shell";

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

function resolveCredential(passwordInput: string, credentials: CredentialConfig[]): CredentialMatch | null {
  const trimmedInput = passwordInput.trim();
  for (const credential of credentials) {
    const storedSecretRaw = credential.passwordEnv;
    const normalizedStored = normalizeSecret(storedSecretRaw);
    if (!normalizedStored) continue;

    const isStoredHash = LOOKS_HASH.test(normalizedStored);
    const candidate = isStoredHash ? hash(trimmedInput).toLowerCase() : trimmedInput;

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
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const credentialMatrix: CredentialConfig[] = [
    { role: "admin", passwordEnv: process.env.ADMIN_PASSWORD },
    { role: "investor", passwordEnv: process.env.INVESTOR_PASSWORD },
    { role: "investor-lite", passwordEnv: process.env.INVESTOR_LITE_PASSWORD },
  ];

  const match = resolveCredential(password, credentialMatrix);

  if (!match) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const response = NextResponse.json({
    success: true,
    role: match.role,
    redirect: "/tools",
  });

  response.cookies.set("bp_auth_token", match.token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}


