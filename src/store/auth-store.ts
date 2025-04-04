// src/store/auth-store.ts - Fixed version

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions?: string[];
}

interface LoginResponse {
  success: boolean;
  user?: AdminUser;
  token?: string;
  message?: string;
}

interface VerifyTokenResponse {
  success: boolean;
  user?: AdminUser;
  message?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  isInitializing: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isSuperAdmin: () => boolean;
  setInitializing: (isInitializing: boolean) => void;
}

// API helper functions that don't rely on hooks
const apiHelpers = {
  async login(email: string, password: string, rememberMe = false): Promise<LoginResponse> {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: 'include', // Important for cookies
      });

      const data = (await response.json()) as LoginResponse;
      return data;
    } catch (error) {
      console.error('Login API error:', error instanceof Error ? error.message : 'Unknown error');
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout API error:', error instanceof Error ? error.message : 'Unknown error');
    }
  },

  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    try {
      const response = await fetch('/api/admin/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      const data = (await response.json()) as VerifyTokenResponse;
      return data;
    } catch (error) {
      console.error(
        'Token verification error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isInitializing: true, // Start with initializing true

      setInitializing: (isInitializing: boolean): void => {
        set({ isInitializing });
      },

      login: async (email: string, password: string, rememberMe = false): Promise<boolean> => {
        try {
          const data = await apiHelpers.login(email, password, rememberMe);

          if (!data.success) {
            return false;
          }

          if (!data.user || !data.token) {
            console.error('Missing user or token in login response');
            return false;
          }

          // Update store with user data and token
          set({
            isAuthenticated: true,
            user: data.user,
            token: data.token,
            isInitializing: false, // Important: Set to false after successful login
          });

          // Store token in localStorage if rememberMe is enabled
          if (typeof window !== 'undefined' && rememberMe) {
            try {
              localStorage.setItem('admin_token', data.token);
              localStorage.setItem('admin_user', JSON.stringify(data.user));
            } catch (storageError) {
              console.warn('Failed to store auth data in localStorage:', storageError);
            }
          }

          return true;
        } catch (error) {
          console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
          return false;
        }
      },

      logout: async (): Promise<void> => {
        try {
          await apiHelpers.logout();
        } catch (error) {
          console.warn(
            'Error calling logout API:',
            error instanceof Error ? error.message : 'Unknown error'
          );
        } finally {
          // Always clean up local state regardless of API response
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            isInitializing: false, // Set to false after logout
          });

          // Clear localStorage and sessionStorage
          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem('admin_token');
              localStorage.removeItem('admin_user');
              sessionStorage.removeItem('auth_initialized'); // Clear the initialization flag too

              // Add this to clear any persisted store data
              localStorage.removeItem('auth-storage');
            } catch (storageError) {
              console.warn('Failed to remove auth data from storage:', storageError);
            }
          }
        }
      },

      // Check if the current user has a specific permission
      hasPermission: (permission: string): boolean => {
        const { user } = get();

        if (!user?.permissions) {
          return false;
        }

        // Super admin has all permissions
        if (user.role === 'SUPER_ADMIN' || user.permissions.includes('*')) {
          return true;
        }

        return user.permissions.includes(permission);
      },

      // Check if the current user is a super admin
      isSuperAdmin: (): boolean => {
        return get().user?.role === 'SUPER_ADMIN';
      },
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      // Only persist these fields
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// Initialize auth state from localStorage and verify with server
export const initializeAuth = async (): Promise<void> => {
  if (typeof window === 'undefined') {
    useAuthStore.getState().setInitializing(false);
    return; // Skip on server-side
  }

  // Check if we've already initialized in this session
  const alreadyInitialized = sessionStorage.getItem('auth_initialized') === 'true';
  if (alreadyInitialized) {
    // If already initialized, update the store state accordingly
    const isAuthenticated = localStorage.getItem('admin_token') !== null;
    let user = null;
    const userJson = localStorage.getItem('admin_user');

    if (userJson) {
      try {
        user = JSON.parse(userJson) as AdminUser;
      } catch {
        // If parsing fails, ignore and continue with null user
      }
    }

    useAuthStore.setState({
      isAuthenticated,
      user,
      token: localStorage.getItem('admin_token'),
      isInitializing: false,
    });
    return;
  }

  let token: string | null = null;
  let userJson: string | null = null;

  try {
    // Try to read from localStorage
    token = localStorage.getItem('admin_token');
    userJson = localStorage.getItem('admin_user');
  } catch (storageError) {
    console.warn('Error accessing localStorage:', storageError);
    useAuthStore.getState().setInitializing(false);
    sessionStorage.setItem('auth_initialized', 'true');
    return;
  }

  if (!token) {
    useAuthStore.getState().setInitializing(false);
    sessionStorage.setItem('auth_initialized', 'true');
    return; // No token found, stay logged out
  }

  try {
    const data = await apiHelpers.verifyToken(token);

    if (!data.success || !data.user) {
      throw new Error('Invalid response format');
    }

    // Token is valid, set auth state
    useAuthStore.setState({
      isAuthenticated: true,
      token,
      user: data.user,
      isInitializing: false,
    });

    // Mark as initialized
    sessionStorage.setItem('auth_initialized', 'true');
  } catch (error) {
    console.error(
      'Error validating token:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    // Clean up invalid tokens
    try {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    } catch (storageError) {
      console.warn('Error removing items from localStorage:', storageError);
    }

    // If parsing userJson fails, this will be null which is fine
    let parsedUser: AdminUser | null = null;

    if (userJson) {
      try {
        parsedUser = JSON.parse(userJson) as AdminUser;
      } catch (parseError) {
        console.error('Error parsing stored user data:', parseError);
        try {
          localStorage.removeItem('admin_user');
        } catch (storageError) {
          console.warn('Error removing user from localStorage:', storageError);
        }
      }
    }

    // On network error, we'll fallback to stored user data if available
    // This allows limited offline access but security is reduced
    if (parsedUser) {
      useAuthStore.setState({
        isAuthenticated: true,
        token,
        user: parsedUser,
        isInitializing: false,
      });
    } else {
      useAuthStore.setState({
        isInitializing: false,
      });
    }

    // Mark as initialized even if there was an error
    sessionStorage.setItem('auth_initialized', 'true');
  }
};
