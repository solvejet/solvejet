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
      const csrfCookie = cookies.find(cookie => 
        cookie.trim().startsWith(`${cookieName}=`)
      );
      
      if (csrfCookie) {
        const tokenFromCookie = csrfCookie.split('=')[1];
        setToken(tokenFromCookie);
        return tokenFromCookie;
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
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  }, [cookieName]);

  const appendCSRFToken = useCallback((headers: Headers | Record<string, string> = {}): Headers | Record<string, string> => {
    if (token) {
      if (headers instanceof Headers) {
        headers.set(headerName, token);
      } else {
        headers[headerName] = token;
      }
    }
    return headers;
  }, [token, headerName]);

  return {
    token,
    getCSRFToken,
    appendCSRFToken
  };
};