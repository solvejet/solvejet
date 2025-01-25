// src/hooks/use-admin-auth.ts
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCsrf } from './use-csrf'

interface User {
  id: string
  name: string
  email: string
  roles: string[]
}

interface AdminAuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    isLoading: true,
    error: null,
  })
  const { csrfToken } = useCsrf()
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      const savedUser = localStorage.getItem(USER_KEY)

      if (!token || !savedUser) {
        setState({
          user: null,
          isLoading: false,
          error: null,
        })
        return false
      }

      // Verify token with server
      const response = await fetch('/api/admin/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setState({
          user: null,
          isLoading: false,
          error: 'Authentication failed',
        })
        return false
      }

      const userData = await response.json()
      setState({
        user: userData,
        isLoading: false,
        error: null,
      })
      return true
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      setState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      })
      return false
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        if (!csrfToken) {
          throw new Error('CSRF token not available')
        }

        const response = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Login failed')
        }

        // Store auth data
        localStorage.setItem(TOKEN_KEY, data.token)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))

        // Update state
        setState({
          user: data.user,
          isLoading: false,
          error: null,
        })

        // Navigate to dashboard
        router.replace('/admin/dashboard')

        return data.user
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Login failed',
          isLoading: false,
        }))
        throw error
      }
    },
    [csrfToken, router]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setState({
      user: null,
      isLoading: false,
      error: null,
    })
    router.replace('/admin/login')
  }, [router])

  // Initial auth check
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    ...state,
    login,
    logout,
    checkAuth,
  }
}
