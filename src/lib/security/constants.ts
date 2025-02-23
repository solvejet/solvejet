// src/lib/security/constants.ts
export const SECURITY_HEADERS = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' ${process.env.API_URL ?? ''};
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim(),
  } as const;
  
  export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS?.split(',') ?? ['*'],
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-XSRF-TOKEN',
  } as const;
  
  export const SECURITY_CONFIG = {
    INACTIVITY_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  } as const;