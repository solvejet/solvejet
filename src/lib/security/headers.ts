// src/lib/security/headers.ts
export const headers = {
    // CORS headers
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS?.split(',') ?? ['*'],
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-XSRF-TOKEN',
    
    // Security headers (ISO 27001:2022 compliant)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
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
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};