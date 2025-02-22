// src/hooks/useAPI.ts
import { useState, useCallback } from 'react';
import { useCSRF } from './useCSRF';
import { useSecureContext } from './useSecureContext';

interface APIOptions {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
  withCredentials?: boolean;
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  secure?: boolean;
  retry?: number;
}

interface APIResponse<T> {
  message?: string;
  data?: T;
  status: number;
}

interface APIError extends Error {
  status?: number;
  code?: string;
}

export const useAPI = (options: APIOptions = {}): {
  request: <T>(endpoint: string, config?: RequestConfig) => Promise<T>;
  loading: boolean;
  error: APIError | null;
  get: <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>) => Promise<T>;
  post: <T>(endpoint: string, data?: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  put: <T>(endpoint: string, data?: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  patch: <T>(endpoint: string, data?: unknown, config?: Omit<RequestConfig, 'method' | 'body'>) => Promise<T>;
  delete: <T>(endpoint: string, config?: Omit<RequestConfig, 'method'>) => Promise<T>;
  token: string | null;
} => {
  const {
    baseURL = process.env.NEXT_PUBLIC_API_URL ?? '/api',
    defaultHeaders = {},
    withCredentials = true
  } = options;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<APIError | null>(null);
  
  const { token, appendCSRFToken } = useCSRF();
  const { isAuthenticated } = useSecureContext();

  const buildURL = useCallback((endpoint: string, params?: Record<string, string>): string => {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `${baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
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
      headers = {},
      ...restConfig
    } = config;

    try {
      setLoading(true);
      setError(null);

      // Security checks
      if (secure && !isAuthenticated) {
        throw new Error('Authentication required');
      }

      // Prepare headers
      const requestHeaders = new Headers({
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...Object.fromEntries(Object.entries(headers))
      });

      // Add CSRF token for non-GET requests
      if (method !== 'GET' && method !== 'HEAD') {
        appendCSRFToken(requestHeaders);
      }

      // Make request
      const response = await fetch(buildURL(endpoint, params), {
        method,
        headers: requestHeaders,
        credentials: withCredentials ? 'include' : 'same-origin',
        ...restConfig
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json() as APIResponse<unknown>;
        
        const error = new Error(errorData.message ?? `Request failed with status: ${String(response.status)}`) as APIError;
        error.status = response.status;
        throw error;
      }

      // Parse response data
      const contentType = response.headers.get('content-type');
      let responseData: T;

      if (contentType?.includes('application/json')) {
        const jsonResponse = await response.json() as APIResponse<T>;
        responseData = jsonResponse.data as T;
      } else if (contentType?.includes('text/')) {
        responseData = await response.text() as unknown as T;
      } else {
        responseData = await response.blob() as unknown as T;
      }

      return responseData;

    } catch (err) {
      // Handle network errors and retries
      if (retry > 0 && (
        err instanceof TypeError || // Network error
        (err instanceof Error && err.message.includes('network'))
      )) {
        console.warn(`Retrying request to ${endpoint}. Attempts remaining: ${String(retry - 1)}`);
        return await request(endpoint, { ...config, retry: retry - 1 });
      }
      
      const apiError = err as APIError;
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [buildURL, appendCSRFToken, isAuthenticated, defaultHeaders, withCredentials]);

  const get = useCallback(<T>(
    endpoint: string, 
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> => request<T>(endpoint, { ...config, method: 'GET' }), [request]);

  const post = useCallback(<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => request<T>(endpoint, { 
    ...config, 
    method: 'POST', 
    body: data ? JSON.stringify(data) : undefined 
  }), [request]);

  const put = useCallback(<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => request<T>(endpoint, { 
    ...config, 
    method: 'PUT', 
    body: data ? JSON.stringify(data) : undefined 
  }), [request]);

  const patch = useCallback(<T>(
    endpoint: string, 
    data?: unknown, 
    config?: Omit<RequestConfig, 'method' | 'body'>
  ): Promise<T> => request<T>(endpoint, { 
    ...config, 
    method: 'PATCH', 
    body: data ? JSON.stringify(data) : undefined 
  }), [request]);

  const del = useCallback(<T>(
    endpoint: string, 
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> => request<T>(endpoint, { ...config, method: 'DELETE' }), [request]);

  return {
    request,
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    token,
  };
};