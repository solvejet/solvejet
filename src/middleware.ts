// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';
import { headers } from './lib/security';

/**
 * Apply security headers to all responses
 */
export const middleware: NextMiddleware = (): NextResponse => {
  // Get base response
  const response = NextResponse.next();
  
  // Apply all security headers
  Object.entries(headers).forEach(([key, value]) => {
    if (typeof value === 'string') {
      response.headers.set(key, value);
    } else if (Array.isArray(value)) {
      response.headers.set(key, value.join(','));
    }
  });

  return response;
};

/**
 * Configure which routes middleware applies to
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};