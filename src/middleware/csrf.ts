// middleware/csrf.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/csrf'

// List of paths that require CSRF protection
const PROTECTED_PATHS = ['/api/contact', '/api/admin/auth']

export async function middleware(request: NextRequest) {
  // Only check CSRF for protected paths and non-GET requests
  if (
    !PROTECTED_PATHS.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    ) ||
    request.method === 'GET'
  ) {
    return NextResponse.next()
  }

  try {
    const csrfToken = request.headers.get('x-csrf-token')
    const sessionToken = request.cookies.get('csrf_session_token')?.value

    if (!csrfToken || !sessionToken) {
      return NextResponse.json({ error: 'CSRF token missing' }, { status: 403 })
    }

    const isValid = await verifyToken(csrfToken, sessionToken)
    if (!isValid) {
      return NextResponse.json({ error: 'CSRF token invalid' }, { status: 403 })
    }

    return NextResponse.next()
  } catch (error) {
    console.error('CSRF validation error:', error)
    return NextResponse.json(
      { error: 'CSRF validation failed' },
      { status: 403 }
    )
  }
}

export const config = {
  matcher: '/api/:path*',
}
