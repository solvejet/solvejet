// src/hooks/useCSRF.ts
'use client';

import { useState, useCallback, useEffect } from 'react';

interface CSRFOptions {
  cookieName?: string;
  headerName?: string;
}

interface CSRFHookReturn {
  token: string | null;
  getCSRFToken: () => Promise<string | null>;
  appendCSRFToken: (headers?: Headers | Record<string, string>) => Headers | Record<string, string>;
}

interface CSRFResponse {
  token: string;
  [key: string]: unknown;
}

export const useCSRF = (options: CSRFOptions = {}): CSRFHookReturn => {
  const { cookieName = 'XSRF-TOKEN', headerName = 'X-XSRF-TOKEN' } = options;

  const [token, setToken] = useState<string | null>(null);

  // Initial token fetch
  useEffect(() => {
    const fetchInitialToken = async (): Promise<void> => {
      const result = await getCSRFTokenInternal();
      if (result) {
        setToken(result);
      }
    };

    void fetchInitialToken();
  }, []);

  const getCSRFTokenInternal = useCallback(async (): Promise<string | null> => {
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
            return tokenFromCookie;
          }
        }
      }

      // If no token in cookie, request new one
      const response = await fetch('/api/csrf', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch CSRF token: ${String(response.status)} ${response.statusText}`
        );
      }

      // Try to get the token from the cookie again after the fetch
      const newCookies = document.cookie.split(';');
      const newCSRFCookie = newCookies
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(`${cookieName}=`));

      if (newCSRFCookie) {
        const parts = newCSRFCookie.split('=');
        if (parts.length >= 2) {
          const tokenFromCookie = parts[1];
          if (tokenFromCookie) {
            return tokenFromCookie;
          }
        }
      }

      // If we still don't have a token, try to get it from the response
      try {
        // Use proper typing for the response data
        const responseData = (await response.json()) as CSRFResponse;
        if (responseData.token && typeof responseData.token === 'string') {
          return responseData.token;
        }
      } catch {
        // If the response isn't JSON, fall back to text
        const textData = await response.text();
        if (textData) {
          return textData;
        }
      }

      // If we get here, we couldn't find a token
      console.warn('Could not retrieve CSRF token from response or cookies');
      return null;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  }, [cookieName]);

  const getCSRFToken = useCallback(async (): Promise<string | null> => {
    const newToken = await getCSRFTokenInternal();
    if (newToken) {
      setToken(newToken);
    }
    return newToken;
  }, [getCSRFTokenInternal]);

  const appendCSRFToken = useCallback(
    (headers: Headers | Record<string, string> = {}): Headers | Record<string, string> => {
      if (!token) {
        console.warn('No CSRF token available to append to headers');
        return headers;
      }

      if (headers instanceof Headers) {
        headers.set(headerName, token);
        return headers;
      }

      return {
        ...headers,
        [headerName]: token,
      };
    },
    [token, headerName]
  );

  return {
    token,
    getCSRFToken,
    appendCSRFToken,
  };
};
