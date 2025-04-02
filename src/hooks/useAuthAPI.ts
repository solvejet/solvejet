// src/hooks/useAuthAPI.ts

'use client';

import { useAPI } from './useAPI';

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

interface AuthAPIResult {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  verifyToken: (token: string) => Promise<VerifyTokenResponse>;
}

export const useAuthAPI = (): AuthAPIResult => {
  // Pass empty options instead of 'secure: false' as secure is not in APIOptions type
  const api = useAPI({});

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<LoginResponse> => {
    try {
      // Fix: Remove duplicate '/api' in the path
      const response = await api.request<LoginResponse>('admin/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
        secure: false, // This parameter is accepted by request method
      });
      return response;
    } catch (error) {
      console.error('Login API error:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Fix: Remove duplicate '/api' in the path
      await api.request('admin/logout', {
        method: 'POST',
        body: null,
        secure: false, // This parameter is accepted by request method
      });
    } catch (error) {
      console.error('Logout API error:', error instanceof Error ? error.message : 'Unknown error');
      // Still consider logout successful even if API call fails
    }
  };

  const verifyToken = async (token: string): Promise<VerifyTokenResponse> => {
    try {
      // Fix: Remove duplicate '/api' in the path
      const response = await api.request<VerifyTokenResponse>('admin/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        secure: false, // This parameter is accepted by request method
      });
      return response;
    } catch (error) {
      console.error(
        'Token verification error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  };

  return {
    login,
    logout,
    verifyToken,
  };
};
