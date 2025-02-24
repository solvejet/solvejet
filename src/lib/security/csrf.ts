// src/lib/security/csrf.ts
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CSRFConfig {
  cookieName: string;
  headerName: string;
  tokenLength: number;
  cookieMaxAge: number;
}

const DEFAULT_CONFIG = {
  cookieName: 'XSRF-TOKEN',
  headerName: 'X-XSRF-TOKEN',
  tokenLength: 32,
  cookieMaxAge: 86400, // 24 hours in seconds
} as const;

/**
 * Generates a cryptographically secure random token with additional entropy
 */
export const generateToken = (length: number = DEFAULT_CONFIG.tokenLength): string => {
  const randomBytes = crypto.randomBytes(length);
  const timestamp = Date.now().toString();

  return crypto
    .createHash('sha256')
    .update(Buffer.concat([randomBytes, Buffer.from(timestamp)]))
    .digest('hex');
};

/**
 * Type guard to check if the request method is safe
 */
const isSafeMethod = (method: string): boolean => {
  return ['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());
};

/**
 * Performs constant-time string comparison to prevent timing attacks
 */
const safeCompare = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
};

/**
 * Constructs a secure cookie string with enhanced security options
 */
const constructCookieString = (
  name: string,
  value: string,
  isProduction: boolean,
  maxAge: number
): string => {
  const parts = [
    `${name}=${value}`,
    'Path=/',
    'HttpOnly=false', // Needs to be false so JS can read it
    `Secure=${isProduction ? 'true' : 'false'}`,
    'SameSite=Strict',
    `Max-Age=${maxAge.toString()}`,
  ];

  if (isProduction) {
    parts.push('__Host-');
  }

  return parts.filter(Boolean).join('; ');
};

/**
 * Validates token format
 */
const isValidTokenFormat = (token: unknown): token is string => {
  return typeof token === 'string' && /^[a-f0-9]{64}$/i.test(token);
};

/**
 * CSRF Protection middleware for Next.js API routes
 */
export const csrfProtection = (config: Partial<CSRFConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ): Promise<void> => {
    try {
      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');

      // For safe methods, generate and set new token
      if (isSafeMethod(req.method ?? 'GET')) {
        const token = generateToken(finalConfig.tokenLength);
        const isProduction = process.env.NODE_ENV === 'production';

        // Set cookie with enhanced security options
        res.setHeader('Set-Cookie', [
          constructCookieString(
            finalConfig.cookieName,
            token,
            isProduction,
            finalConfig.cookieMaxAge
          ),
        ]);

        await next();
        return;
      }

      // For unsafe methods, validate token
      const cookieToken = req.cookies[finalConfig.cookieName];
      const headerToken = req.headers[finalConfig.headerName.toLowerCase()];

      // Enhanced validation checks
      if (
        !isValidTokenFormat(cookieToken) ||
        !isValidTokenFormat(headerToken) ||
        !safeCompare(cookieToken, headerToken)
      ) {
        res.status(403).json({
          error: 'CSRF token validation failed',
          code: 'CSRF_ERROR',
        });
        return;
      }

      await next();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('CSRF Protection Error:', errorMessage);

      res.status(500).json({
        error: 'Internal server error during CSRF validation',
        code: 'CSRF_INTERNAL_ERROR',
      });
    }
  };
};

/**
 * Helper to attach CSRF token to requests with validation
 */
export const attachCSRFToken = (headers: Headers): Headers => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${DEFAULT_CONFIG.cookieName}=`))
      ?.split('=')[1];

    if (token && isValidTokenFormat(token)) {
      headers.set(DEFAULT_CONFIG.headerName, token);
    }

    return headers;
  } catch (error) {
    console.error('Error attaching CSRF token:', error);
    return headers;
  }
};

/**
 * Get CSRF token from cookies with validation
 */
export const getCSRFToken = (): string | null => {
  try {
    const token =
      document.cookie
        .split('; ')
        .find(row => row.startsWith(`${DEFAULT_CONFIG.cookieName}=`))
        ?.split('=')[1] ?? null;

    return token && isValidTokenFormat(token) ? token : null;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return null;
  }
};

/**
 * Helper to validate if CSRF protection is enabled and working
 */
export const validateCSRFProtection = async (): Promise<boolean> => {
  try {
    const token = getCSRFToken();
    if (!token) {
      // Try to fetch a new token
      const response = await fetch('/api/csrf', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      return true;
    }
    return true;
  } catch (error) {
    console.error('CSRF Protection Validation Error:', error);
    return false;
  }
};

// Export types for better type safety
export type { CSRFConfig };
