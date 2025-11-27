import { NextResponse } from 'next/server';
import { createAdminToken } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: 'Missing admin password configuration.' }, { status: 500 });
  }

  const payload = await request.json().catch(() => null);
  const submittedPassword = typeof payload?.password === 'string' ? payload.password : null;

  if (!submittedPassword) {
    return NextResponse.json({ error: 'Password required.' }, { status: 400 });
  }

  if (submittedPassword !== adminPassword) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  const token = await createAdminToken(adminPassword);
  const response = NextResponse.json({ success: true });

  response.cookies.set('admin_auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/admin',
    maxAge: 60 * 60 * 8,
  });

  return response;
}

