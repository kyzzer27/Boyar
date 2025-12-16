import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from './lib/admin-auth';

const LOOKS_HASH = /^[a-f0-9]{64}$/i;

function normalizeSecret(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  return LOOKS_HASH.test(trimmed) ? trimmed.toLowerCase() : trimmed;
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
    const portalToken = normalizeSecret(request.cookies.get('bp_auth_token')?.value);
    const validTokens = [
      normalizeSecret(process.env.ADMIN_PASSWORD),
      normalizeSecret(process.env.INVESTOR_PASSWORD),
      normalizeSecret(process.env.INVESTOR_LITE_PASSWORD),
    ].filter(Boolean) as string[];

    if (!portalToken || !validTokens.includes(portalToken)) {
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
