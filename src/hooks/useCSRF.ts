// src/hooks/useCSRF.ts
import { useState, useCallback } from 'react';

interface CSRFOptions {
  cookieName?: string;
  headerName?: string;
}

interface CSRFHookReturn {
  token: string | null;
  getCSRFToken: () => Promise<string | null>;
  appendCSRFToken: (headers?: Headers | Record<string, string>) => Headers | Record<string, string>;
}

export const useCSRF = (options: CSRFOptions = {}): CSRFHookReturn => {
  const {
    cookieName = 'XSRF-TOKEN',
    headerName = 'X-XSRF-TOKEN'
  } = options;

  const [token, setToken] = useState<string | null>(null);

  const getCSRFToken = useCallback(async (): Promise<string | null> => {
    try {
      // First try to get from cookie
      const cookies = document.cookie.split(';');
      const csrfCookie = cookies
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(`${cookieName}=`));
      
      if (csrfCookie) {
        const parts = csrfCookie.split('=');
        if (parts.length >= 2) {
          const tokenFromCookie = parts[1];
          if (tokenFromCookie) {
            setToken(tokenFromCookie);
            return tokenFromCookie;
          }
        }
      }

      // If no token in cookie, request new one
      const response = await fetch('/api/csrf', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const newToken = await response.text();
      if (!newToken) {
        throw new Error('Received empty CSRF token');
      }

      setToken(newToken);
      return newToken;

    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  }, [cookieName]);

  const appendCSRFToken = useCallback((headers: Headers | Record<string, string> = {}): Headers | Record<string, string> => {
    if (!token) {
      return headers;
    }

    if (headers instanceof Headers) {
      headers.set(headerName, token);
      return headers;
    }

    return {
      ...headers,
      [headerName]: token
    };
  }, [token, headerName]);

  return {
    token,
    getCSRFToken,
    appendCSRFToken
  };
};