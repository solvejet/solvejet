// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100;

// Configuration
function getAllowedOrigins(): string[] {
  if (process.env.NODE_ENV === "production") {
    return [
      "https://solvejet.net",
      "https://www.solvejet.net",
      "https://solvejet.vercel.app", // Add your Vercel domain
    ];
  }
  return [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://[::1]:3000", // IPv6 localhost
  ];
}

function getRateLimitKey(request: NextRequest): string {
  // Get IP address from various headers (priority order)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const connectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare
  const vercelIp = request.headers.get("x-vercel-forwarded-for"); // Vercel

  const ip =
    forwarded?.split(",")[0]?.trim() ||
    realIp ||
    connectingIp ||
    vercelIp ||
    "unknown";

  return `rate_limit:${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

function validateCSRFToken(request: NextRequest): boolean {
  const token = request.headers.get("x-csrf-token");

  // For development, be more lenient
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Check if token exists and matches expected format
  if (!token) {
    return false;
  }

  // Validate token format (64 character hex string)
  return /^[a-f0-9]{64}$/.test(token);
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  // Remove X-Powered-By header
  response.headers.delete("x-powered-by");

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  // Content Security Policy - FIXED with all required domains
  const cspHeader = [
    "default-src 'self'",
    // Script sources - Updated with all analytics domains
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
      "https://www.googletagmanager.com " +
      "https://www.google-analytics.com " +
      "https://vercel.live " +
      "https://widget.clutch.co " +
      "https://www.clarity.ms " +
      "https://snap.licdn.com " +
      "https://connect.facebook.net " +
      "https://static.hotjar.com",

    // Style sources
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    // Image sources
    "img-src 'self' data: https: blob:",

    // Font sources
    "font-src 'self' https://fonts.gstatic.com",

    // Connect sources - Updated with analytics endpoints
    "connect-src 'self' " +
      "https://www.google-analytics.com " +
      "https://vercel.live " +
      "wss://ws-us3.pusher.com " +
      "https://widget.clutch.co " +
      "https://www.clarity.ms " +
      "https://snap.licdn.com " +
      "https://connect.facebook.net " +
      "https://in.hotjar.com " +
      "wss://*.hotjar.com",

    // Frame sources
    "frame-src 'self' " +
      "https://vercel.live " +
      "https://widget.clutch.co " +
      "https://www.googletagmanager.com",

    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);

  // HSTS in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // Cache control for service worker
  if (response.url?.includes("/sw.js")) {
    response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return response;
}

function isStaticAsset(pathname: string): boolean {
  const staticExtensions = [
    ".js",
    ".css",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".webp",
    ".avif",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
  ];

  return (
    staticExtensions.some((ext) => pathname.endsWith(ext)) ||
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/static/")
  );
}

function detectSuspiciousActivity(request: NextRequest): boolean {
  const { pathname, search } = request.nextUrl;
  const url = `${pathname}${search}`.toLowerCase();
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const referer = request.headers.get("referer")?.toLowerCase() || "";

  // Suspicious patterns
  const suspiciousPatterns = [
    // Path traversal
    /\.\./,
    /\.\.%2f/,
    /\.\.%5c/,

    // XSS attempts
    /<script[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,

    // SQL injection
    /union.*select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /'.*or.*'/i,

    // Command injection
    /;\s*(cat|ls|pwd|whoami)/i,
    /\|\s*(cat|ls|pwd|whoami)/i,

    // File inclusion
    /\/etc\/passwd/i,
    /\/proc\/self\/environ/i,

    // Common attack strings
    /\bphpmyadmin\b/i,
    /\badmin\b.*\blogin\b/i,
    /\bwp-admin\b/i,
    /\.php$/i, // Assuming this is not a PHP app
  ];

  // Check URL and user agent
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url) || pattern.test(userAgent) || pattern.test(referer)) {
      return true;
    }
  }

  // Check for suspicious user agents
  const maliciousUserAgents = [
    /nikto/i,
    /sqlmap/i,
    /nmap/i,
    /masscan/i,
    /zap/i,
    /burp/i,
  ];

  return maliciousUserAgents.some((pattern) => pattern.test(userAgent));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // Skip processing for static assets
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Detect and block suspicious activity
  if (detectSuspiciousActivity(request)) {
    console.warn(`Suspicious request blocked: ${request.url}`, {
      ip: getRateLimitKey(request).replace("rate_limit:", ""),
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });

    return NextResponse.json(
      { error: "Request blocked due to suspicious activity" },
      { status: 400 }
    );
  }

  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 200 });
    const allowedOrigins = getAllowedOrigins();

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Origin, Cache-Control, Pragma"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");

    return addSecurityHeaders(response);
  }

  // Rate limiting for API routes
  if (pathname.startsWith("/api/")) {
    const rateLimitKey = getRateLimitKey(request);

    if (!checkRateLimit(rateLimitKey)) {
      const resetTime = Math.ceil(Date.now() / 1000 + 60);

      return NextResponse.json(
        {
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": resetTime.toString(),
          },
        }
      );
    }

    // CSRF protection for state-changing operations
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      if (!validateCSRFToken(request)) {
        return NextResponse.json(
          {
            error: "Invalid CSRF token",
            message: "CSRF token is missing or invalid.",
          },
          { status: 403 }
        );
      }
    }

    // Validate origin for API requests
    const allowedOrigins = getAllowedOrigins();

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        {
          error: "Forbidden origin",
          message: "Request from unauthorized origin.",
        },
        { status: 403 }
      );
    }

    // Add CORS headers for API responses
    const response = NextResponse.next();

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }

    return addSecurityHeaders(response);
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (will be handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json, sw.js, robots.txt, sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|robots.txt|sitemap.xml).*)",
    "/api/:path*",
  ],
};
