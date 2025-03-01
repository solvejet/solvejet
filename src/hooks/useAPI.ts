// src/hooks/useAPI.ts - Fixed version with ESLint/TypeScript fixes
'use client';

import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCSRF } from './useCSRF';
import { useSecureContext } from './useSecureContext';

interface APIOptions {
  baseURL?: string;
  defaultHeaders?: HeadersInit;
  withCredentials?: boolean;
}

interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: Record<string, string>;
  secure?: boolean;
  retry?: number;
  body?: BodyInit | null;
}

interface APIError extends Error {
  status?: number;
  code?: string | undefined;
}

interface APIResponse<T> {
  message?: string;
  data?: T;
  status: number;
}

interface ErrorData {
  message?: string;
  code?: string;
  [key: string]: unknown;
}

interface APIHookReturn {
  request: <T>(endpoint: string, config?: RequestConfig) => Promise<T>;
  get: <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  post: <T>(
    endpoint: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'method' | 'body'>
  ) => Promise<T>;
  put: <T>(
    endpoint: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'method' | 'body'>
  ) => Promise<T>;
  patch: <T>(
    endpoint: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'method' | 'body'>
  ) => Promise<T>;
  delete: <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>) => Promise<T>;
  loading: boolean;
  error: APIError | null;
  token: string | null;
}

export const useAPI = (options: APIOptions = {}): APIHookReturn => {
  const {
    // Fix: Keep a fixed baseURL format for consistent API calls
    baseURL = '/api',
    defaultHeaders = {},
    withCredentials = true,
  } = options;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<APIError | null>(null);

  const queryClient = useQueryClient();
  const { token, appendCSRFToken } = useCSRF();
  const { isAuthenticated } = useSecureContext();

  const buildURL = useCallback(
    (endpoint: string, params?: Record<string, string>): string => {
      // Fix: Ensure the endpoint has correct prefix format
      // This ensures we don't have double '/api/api/' or missing '/api/'
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const fullUrl = `${baseURL}${cleanEndpoint}`;

      const url = new URL(
        fullUrl.startsWith('http') ? fullUrl : `${window.location.origin}${fullUrl}`
      );

      if (params) {
        Object.entries(params).forEach(([key, value]: [string, string]) => {
          if (value) {
            url.searchParams.append(key, value);
          }
        });
      }

      return url.toString();
    },
    [baseURL]
  );

  const request = useCallback(
    async <T>(endpoint: string, config: RequestConfig = {}): Promise<T> => {
      const {
        method = 'GET',
        params,
        secure = true,
        retry = 2,
        headers: configHeaders = {},
        body = null,
        ...restConfig
      } = config;

      try {
        setLoading(true);
        setError(null);

        if (secure && !isAuthenticated) {
          throw new Error('Authentication required');
        }

        const requestHeaders = new Headers(defaultHeaders);

        if (configHeaders instanceof Headers) {
          configHeaders.forEach((value, key) => {
            requestHeaders.set(key, value);
          });
        } else {
          Object.entries(configHeaders).forEach(([key, value]: [string, string]) => {
            if (value) {
              requestHeaders.set(key, value);
            }
          });
        }

        // Fixed boolean comparison ESLint error
        if (!requestHeaders.has('Content-Type') && !(body instanceof FormData)) {
          requestHeaders.set('Content-Type', 'application/json');
        }

        if (method !== 'GET' && method !== 'HEAD') {
          appendCSRFToken(requestHeaders);
        }

        // Make the API request
        const response = await fetch(buildURL(endpoint, params), {
          method,
          headers: requestHeaders,
          credentials: withCredentials ? 'include' : 'same-origin',
          body,
          ...restConfig,
        });

        if (!response.ok) {
          let errorMessage = `Request failed with status: ${String(response.status)}`;
          let errorData: ErrorData | null = null;

          try {
            // Attempt to parse error response
            // Type assertion with a more specific type
            errorData = (await response.json()) as ErrorData;
            // Using non-null assertion with optional chaining since we know errorData exists here
            if (errorData.message) {
              errorMessage = errorData.message;
            }
          } catch {
            // If JSON parsing fails, try to get text (removed unused variable)
            try {
              const errorText = await response.text();
              if (errorText) {
                errorMessage = errorText;
              }
            } catch {
              // Fallback to default error message
            }
          }

          const apiError = new Error(errorMessage) as APIError;
          apiError.status = response.status;
          // Handle possibly undefined code
          apiError.code = errorData?.code;
          throw apiError;
        }

        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          // Properly typed json response with specific union type
          const jsonResponse = (await response.json()) as APIResponse<T> | T;

          // Handle both direct data and wrapped response formats
          if (jsonResponse && typeof jsonResponse === 'object' && 'data' in jsonResponse) {
            // Type guard has narrowed jsonResponse to APIResponse<T>
            return jsonResponse.data;
          }

          return jsonResponse as T;
        }

        if (contentType?.includes('text/')) {
          return (await response.text()) as unknown as T;
        }

        return (await response.blob()) as unknown as T;
      } catch (err) {
        if (
          retry > 0 &&
          (err instanceof TypeError || (err instanceof Error && err.message.includes('network')))
        ) {
          console.warn(`Retrying request to ${endpoint}. Attempts remaining: ${String(retry - 1)}`);
          return await request<T>(endpoint, { ...config, retry: retry - 1 });
        }

        const apiError = err as APIError;
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [buildURL, appendCSRFToken, isAuthenticated, defaultHeaders, withCredentials, queryClient]
  );

  const get = useCallback(
    <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> => {
      return request<T>(endpoint, { ...config, method: 'GET' });
    },
    [request]
  );

  const post = useCallback(
    <T>(
      endpoint: string,
      data?: unknown,
      config?: Omit<RequestConfig, 'method' | 'body'>
    ): Promise<T> => {
      let body: BodyInit | null = null;

      if (data instanceof FormData) {
        body = data;
      } else if (data !== undefined && data !== null) {
        body = JSON.stringify(data);
      }

      return request<T>(endpoint, {
        ...config,
        method: 'POST',
        body,
      });
    },
    [request]
  );

  const put = useCallback(
    <T>(
      endpoint: string,
      data?: unknown,
      config?: Omit<RequestConfig, 'method' | 'body'>
    ): Promise<T> => {
      let body: BodyInit | null = null;

      if (data instanceof FormData) {
        body = data;
      } else if (data !== undefined && data !== null) {
        body = JSON.stringify(data);
      }

      return request<T>(endpoint, {
        ...config,
        method: 'PUT',
        body,
      });
    },
    [request]
  );

  const patch = useCallback(
    <T>(
      endpoint: string,
      data?: unknown,
      config?: Omit<RequestConfig, 'method' | 'body'>
    ): Promise<T> => {
      let body: BodyInit | null = null;

      if (data instanceof FormData) {
        body = data;
      } else if (data !== undefined && data !== null) {
        body = JSON.stringify(data);
      }

      return request<T>(endpoint, {
        ...config,
        method: 'PATCH',
        body,
      });
    },
    [request]
  );

  const del = useCallback(
    <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>): Promise<T> => {
      return request<T>(endpoint, { ...config, method: 'DELETE' });
    },
    [request]
  );

  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    loading,
    error,
    token,
  };
};
