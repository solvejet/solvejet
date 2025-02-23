// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';
import { SECURITY_HEADERS, CORS_HEADERS } from './lib/security/constants';

/**
 * Apply security headers to all responses
 */
export const middleware: NextMiddleware = (): NextResponse => {
  const response = NextResponse.next();
  
  // Apply security headers
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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};