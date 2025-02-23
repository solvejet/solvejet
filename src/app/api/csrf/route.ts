// src/app/api/csrf/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function GET(): Promise<NextResponse> {
  const token = crypto.randomBytes(32).toString('hex');
  
  const response = NextResponse.json({ token }, { status: 200 });
  
  // Set CSRF token cookie with security options
  response.cookies.set('XSRF-TOKEN', token, {
    httpOnly: false, // Needs to be false so JS can read it
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return Promise.resolve(response);
}