// src/app/api/csrf/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

function generateToken(): string {
  const randomBytes = crypto.randomBytes(32);
  const timestamp = Date.now().toString();

  return crypto
    .createHash('sha256')
    .update(Buffer.concat([randomBytes, Buffer.from(timestamp)]))
    .digest('hex');
}

function getCookieOptions(isProd: boolean): {
  name: string;
  value: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
} {
  return {
    name: CSRF_COOKIE_NAME,
    value: generateToken(),
    path: '/',
    httpOnly: false, // Needs to be false so JS can read it
    secure: isProd,
    sameSite: 'strict',
    maxAge: 86400, // 24 hours
  };
}

export function GET(): NextResponse {
  try {
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = getCookieOptions(isProd);

    // Create response
    const response = NextResponse.json(
      { token: cookieOptions.value },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      }
    );

    // Set cookie
    response.cookies.set(cookieOptions);

    // Set security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
  } catch (error) {
    console.error('CSRF Token Generation Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate CSRF token',
        code: 'CSRF_GENERATION_ERROR',
      },
      { status: 500 }
    );
  }
}

export function HEAD(): NextResponse {
  return NextResponse.json({}, { status: 200 });
}

// Block all other methods
export function POST(): NextResponse {
  return methodNotAllowed();
}

export function PUT(): NextResponse {
  return methodNotAllowed();
}

export function DELETE(): NextResponse {
  return methodNotAllowed();
}

export function PATCH(): NextResponse {
  return methodNotAllowed();
}

function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    {
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
    },
    {
      status: 405,
      headers: {
        Allow: 'GET, HEAD',
      },
    }
  );
}
