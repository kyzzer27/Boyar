import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from './lib/admin-auth';

export async function middleware(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD is not set.');
    return NextResponse.json({ error: 'Missing admin password configuration.' }, { status: 500 });
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_auth_token')?.value;
    const expectedToken = await createAdminToken(adminPassword);

    if (!token || token !== expectedToken) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

