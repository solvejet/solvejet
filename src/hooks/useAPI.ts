// src/hooks/useAPI.ts
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
  code?: string;
}

interface APIResponse<T> {
  message?: string;
  data?: T;
  status: number;
}

interface APIHookReturn {
  request: <T>(endpoint: string, config?: RequestConfig) => Promise<T>;
  get: <T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  post: <T>(endpoint: string, data?: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  put: <T>(endpoint: string, data?: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  patch: <T>(endpoint: string, data?: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  delete: <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>) => Promise<T>;
  loading: boolean;
  error: APIError | null;
  token: string | null;
}

export const useAPI = (options: APIOptions = {}): APIHookReturn => {
  const {
    baseURL = process.env.NEXT_PUBLIC_API_URL ?? '/api',
    defaultHeaders = {},
    withCredentials = true
  } = options;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<APIError | null>(null);
  
  const queryClient = useQueryClient();
  const { token, appendCSRFToken } = useCSRF();
  const { isAuthenticated } = useSecureContext();

  const buildURL = useCallback((endpoint: string, params?: Record<string, string>): string => {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `${baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]: [string, string]) => {
        if (value) {
          url.searchParams.append(key, value);
        }
      });
    }
    
    return url.toString();
  }, [baseURL]);

  const request = useCallback(async <T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> => {
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

      if (!requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json');
      }

      if (method !== 'GET' && method !== 'HEAD') {
        appendCSRFToken(requestHeaders);
      }

      const response = await fetch(buildURL(endpoint, params), {
        method,
        headers: requestHeaders,
        credentials: withCredentials ? 'include' : 'same-origin',
        body,
        ...restConfig
      });

      if (!response.ok) {
        const errorData = await response.json() as APIResponse<unknown>;
        const apiError = new Error(
          errorData.message ?? `Request failed with status: ${String(response.status)}`
        ) as APIError;
        apiError.status = response.status;
        throw apiError;
      }

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        const jsonResponse = await response.json() as APIResponse<T>;
        return jsonResponse.data as T;
      } 
      
      if (contentType?.includes('text/')) {
        return await response.text() as unknown as T;
      } 
      
      return await response.blob() as unknown as T;

    } catch (err) {
      if (retry > 0 && (
        err instanceof TypeError || 
        (err instanceof Error && err.message.includes('network'))
      )) {
        const remainingRetries = String(retry - 1);
        console.warn(`Retrying request to ${endpoint}. Attempts remaining: ${remainingRetries}`);
        return await request<T>(endpoint, { ...config, retry: retry - 1 });
      }
      
      const apiError = err as APIError;
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [buildURL, appendCSRFToken, isAuthenticated, defaultHeaders, withCredentials, queryClient]);

  const get = useCallback(<T>(
    endpoint: string, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => {
    return request<T>(endpoint, { ...config, method: 'GET' });
  }, [request]);

  const post = useCallback(<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => {
    const body = data ? JSON.stringify(data) : null;
    return request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body as BodyInit | null
    });
  }, [request]);

  const put = useCallback(<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => {
    const body = data ? JSON.stringify(data) : null;
    return request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body as BodyInit | null
    });
  }, [request]);

  const patch = useCallback(<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => {
    const body = data ? JSON.stringify(data) : null;
    return request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body as BodyInit | null
    });
  }, [request]);

  const del = useCallback(<T>(
    endpoint: string, 
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> => {
    return request<T>(endpoint, { ...config, method: 'DELETE' });
  }, [request]);

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