// src/components/SecurityProvider.tsx
'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { getCSRFToken } from '@/lib/security/csrf';

// Define the security context type
interface SecurityContextType {
  isAuthenticated: boolean;
  csrfToken: string | null;
  user: {
    id: string;
    role: string;
    permissions: string[];
  } | null;
  securityLevel: 'high' | 'medium' | 'low';
}

// Create the security context with default values
export const SecurityContext = createContext<SecurityContextType | null>(null);

interface SecurityProviderProps {
  children: React.ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps): React.ReactElement {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuthStore();
  const [securityLevel, setSecurityLevel] = useState<'high' | 'medium' | 'low'>('medium');

  // Effect to fetch CSRF token
  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      try {
        const token = typeof getCSRFToken === 'function' ? await Promise.resolve(getCSRFToken()) : getCSRFToken;
        setCsrfToken(token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    void fetchToken();
  }, []);

  // Effect to determine security level based on environment and factors
  useEffect(() => {
    const determineSecurityLevel = (): 'high' | 'medium' | 'low' => {
      // Check for HTTPS
      const isSecureConnection =
        typeof window !== 'undefined' && window.location.protocol === 'https:';

      // Check for production environment
      const isProduction = process.env.NODE_ENV === 'production';

      if (isProduction && isSecureConnection) {
        return 'high';
      } else if (isProduction || isSecureConnection) {
        return 'medium';
      } else {
        return 'low';
      }
    };

    setSecurityLevel(determineSecurityLevel());
  }, []);

  // Create the context value
  const contextValue: SecurityContextType = {
    isAuthenticated,
    csrfToken,
    user: user
      ? {
          id: user.id,
          role: user.role,
          permissions: user.permissions ?? [],
        }
      : null,
    securityLevel,
  };

  return <SecurityContext.Provider value={contextValue}>{children}</SecurityContext.Provider>;
}
