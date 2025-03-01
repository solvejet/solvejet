// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_HEADERS, CORS_HEADERS } from './lib/security/constants';

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;

  // More comprehensive check for static files and Next.js internals
  // This is critical for proper module loading
  if (
    pathname.includes('/_next/') ||
    pathname.includes('/api/') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webmanifest') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.module.js') ||
    pathname.includes('@react-refresh')
  ) {
    return NextResponse.next();
  }

  // For other paths, apply security headers
  const response = NextResponse.next();

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
    // Match all routes except static files, api routes, and _next internal routes
    '/((?!_next/static|_next/image|_next/data|_next/webpack-hmr|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|ico|css|js|json|webmanifest)).*)',
    // Match admin routes for auth checks
    '/admin/:path*',
  ],
};
