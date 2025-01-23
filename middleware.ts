// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/csrf'

const PROTECTED_PATHS = ['/api/contact', '/api/user']
const rateLimit = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 60 // 60 requests per minute

function getIP(request: NextRequest) {
  const xff = request.headers.get('x-forwarded-for')
  return xff ? xff.split(',')[0] : '127.0.0.1'
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Origin':
          process.env.NODE_ENV === 'production' ? 'https://solvejet.net' : '*',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  const requiresCsrf = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (requiresCsrf && request.method !== 'GET') {
    try {
      // Rate limiting with proper IP detection
      const clientIP = getIP(request)
      const now = Date.now()
      const rateData = rateLimit.get(clientIP) ?? { count: 0, timestamp: now }

      if (now - rateData.timestamp > RATE_LIMIT_WINDOW) {
        rateData.count = 0
        rateData.timestamp = now
      }

      if (rateData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        )
      }

      rateData.count++
      rateLimit.set(clientIP, rateData)

      const csrfToken = request.headers.get('x-csrf-token')
      const sessionToken = request.cookies.get('csrf_session_token')?.value

      if (!csrfToken || !sessionToken) {
        return NextResponse.json(
          { error: 'CSRF token missing' },
          { status: 403 }
        )
      }

      const isValid = await verifyToken(csrfToken, sessionToken)
      if (!isValid) {
        return NextResponse.json(
          { error: 'CSRF token invalid' },
          { status: 403 }
        )
      }
    } catch (error) {
      console.error('CSRF validation error:', error)
      return NextResponse.json(
        { error: 'CSRF validation failed' },
        { status: 403 }
      )
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|public|robots.txt|sitemap.xml).*)',
  ],
}
