// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_HEADERS, CORS_HEADERS } from './lib/security/constants';

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;

  // Simplified static file check
  if (
    pathname.includes('/_next/') ||
    pathname.includes('/api/') ||
    /\.(js|css|json|ico|png|jpg|svg|webmanifest|woff|woff2|ttf)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // For other paths, apply security headers
  const response = NextResponse.next();

  // Apply headers more efficiently
  Object.entries({ ...SECURITY_HEADERS, ...CORS_HEADERS }).forEach(([key, value]) => {
    if (typeof value === 'string') {
      response.headers.set(key, value);
    } else if (Array.isArray(value)) {
      response.headers.set(key, value.join(','));
    }
  });

  return response;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', '/admin/:path*'],
};
