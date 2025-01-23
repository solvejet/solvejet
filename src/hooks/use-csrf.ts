// hooks/use-csrf.ts
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface CsrfState {
  csrfToken: string | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

interface CsrfResponse {
  token: string
  error?: string
}

export function useCsrf(): CsrfState {
  const [csrfToken, setCsrfToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // Use AbortController for cleanup
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchToken = useCallback(async (): Promise<void> => {
    // Clear any existing error state
    setError(null)
    setIsLoading(true)

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/csrf', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: abortControllerRef.current.signal,
        credentials: 'include', // Important for cookies
      })

      if (!response.ok) {
        throw new Error(
          `Failed to fetch CSRF token: ${response.status} ${response.statusText}`
        )
      }

      const data: CsrfResponse = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.token) {
        throw new Error('No token received from server')
      }

      setCsrfToken(data.token)
    } catch (err) {
      // Only set error if it's not an abort error
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err)
        // Clear token if there's an error
        setCsrfToken(null)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch on mount
  useEffect(() => {
    fetchToken()

    return () => {
      // Cleanup: abort any in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchToken])

  // Auto-refresh token if it's cleared or on error
  useEffect(() => {
    if (!csrfToken && !isLoading && !error) {
      fetchToken()
    }
  }, [csrfToken, isLoading, error, fetchToken])

  // Token refresh interval (e.g., every 15 minutes)
  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchToken()
      },
      15 * 60 * 1000
    ) // 15 minutes

    return () => {
      clearInterval(interval)
    }
  }, [fetchToken])

  return {
    csrfToken,
    isLoading,
    error,
    refetch: fetchToken,
  }
}

// Optional: Type guard for CSRF response
// function isCsrfResponse(data: unknown): data is CsrfResponse {
//   return (
//     typeof data === 'object' &&
//     data !== null &&
//     'token' in data &&
//     typeof (data as CsrfResponse).token === 'string'
//   )
// }

// Optional: Custom error class for CSRF-related errors
export class CsrfError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CsrfError'
  }
}
