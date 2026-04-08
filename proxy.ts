import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from './lib/admin-auth';

const LOOKS_HASH = /^[a-f0-9]{64}$/i;

function normalizeSecret(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  return LOOKS_HASH.test(trimmed) ? trimmed.toLowerCase() : trimmed;
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

const PORTAL_GUARD_PREFIXES = ['/tools', '/pitch', '/cac'];

export async function proxy(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD is not set.');
    return NextResponse.json({ error: 'Missing admin password configuration.' }, { status: 500 });
  }

  const { pathname } = request.nextUrl;

  // Dedicated admin area protection (legacy flow)
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_auth_token')?.value;
    const expectedToken = await createAdminToken(adminPassword);

    if (!token || token !== expectedToken) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // Investor portal protection
  if (PORTAL_GUARD_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const portalToken = request.cookies.get('bp_auth_token')?.value?.trim();

    if (!portalToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const validTokens = [
      normalizeSecret(process.env.ADMIN_PASSWORD),
      normalizeSecret(process.env.INVESTOR_PASSWORD),
      normalizeSecret(process.env.INVESTOR_LITE_PASSWORD),
    ].filter(Boolean) as string[];

    for (let i = 1; i <= 10; i++) {
      const pw = process.env[`NAMED_PASSWORD_${i}`];
      if (pw) {
        const hashed = await sha256(pw.trim());
        validTokens.push(hashed);
      }
    }

    const builtInPasswords = [
      "BPScott27", "BPVikas27", "BPinvestor27", "BPKapil27",
      "BPZulfiqar27", "BPSparsh27", "BPYuri27", "BPInvestor27",
      "BPJoel27", "BPInderjeet27", "BPAnjali27", "BPSam27",
    ];
    for (const pw of builtInPasswords) {
      const h = await sha256(pw);
      if (!validTokens.includes(h)) validTokens.push(h);
    }

    const normalizedPortal = normalizeSecret(portalToken);
    if (!normalizedPortal || !validTokens.includes(normalizedPortal)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/tools/:path*',
    '/pitch/:path*',
    '/cac/:path*',
  ],
};
