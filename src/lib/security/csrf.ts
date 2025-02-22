// src/lib/security/csrf.ts
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CSRFConfig {
  cookieName: string;
  headerName: string;
}

const DEFAULT_CONFIG: CSRFConfig = {
  cookieName: 'XSRF-TOKEN',
  headerName: 'X-XSRF-TOKEN'
};

/**
 * Generates a cryptographically secure random token
 */
const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Type guard to check if the request method is safe
 */
const isSafeMethod = (method: string): boolean => {
  return ['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());
};

/**
 * Constructs a secure cookie string
 */
const constructCookieString = (name: string, value: string, isProduction: boolean): string => {
  return [
    `${name}=${value}`,
    'Path=/',
    'HttpOnly=false',
    `Secure=${isProduction ? 'true' : 'false'}`,
    'SameSite=Strict'
  ].join('; ');
};

/**
 * CSRF Protection middleware for Next.js API routes
 */
export const csrfProtection = (config: Partial<CSRFConfig> = {}) => {
  const { cookieName, headerName } = { ...DEFAULT_CONFIG, ...config };

  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ): Promise<void> => {
    try {
      // For safe methods, generate and set new token
      if (isSafeMethod(req.method ?? 'GET')) {
        const token = generateToken();
        const isProduction = process.env.NODE_ENV === 'production';
        
        // Set cookie with security options
        res.setHeader('Set-Cookie', [
          constructCookieString(cookieName, token, isProduction)
        ]);
        
        await next();
        return;
      }

      // For unsafe methods, validate token
      const cookieToken = req.cookies[cookieName];
      const headerToken = req.headers[headerName.toLowerCase()];

      if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        res.status(403).json({
          error: 'CSRF token validation failed',
          code: 'CSRF_ERROR'
        });
        return;
      }

      await next();
    } catch (error: unknown) {
      console.error('CSRF Protection Error:', error);
      res.status(500).json({
        error: 'Internal server error during CSRF validation',
        code: 'CSRF_INTERNAL_ERROR'
      });
    }
  };
};

/**
 * Helper to attach CSRF token to requests
 */
export const attachCSRFToken = (headers: Headers): Headers => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${DEFAULT_CONFIG.cookieName}=`))
    ?.split('=')[1];

  if (token) {
    headers.set(DEFAULT_CONFIG.headerName, token);
  }

  return headers;
};

/**
 * Get CSRF token from cookies
 */
export const getCSRFToken = (): string | null => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${DEFAULT_CONFIG.cookieName}=`))
    ?.split('=')[1] ?? null;

  return token;
};