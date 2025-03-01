// src/components/SecurityProvider.tsx
'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { getCSRFToken, validateCSRFProtection } from '@/lib/security/csrf';
import type { JSX } from 'react';

interface User {
  id: string;
  role: string;
  permissions: string[];
}

interface SecurityContextType {
  isAuthenticated: boolean;
  csrfToken: string | null;
  user: User | null;
  securityLevel: 'high' | 'medium' | 'low';
  lastActivity: Date;
}

// Create context with a default undefined value
export const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps): JSX.Element {
  const { isAuthenticated, user } = useAuthStore();
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [securityLevel, setSecurityLevel] = useState<'high' | 'medium' | 'low'>('medium');
  const [lastActivity, setLastActivity] = useState<Date>(new Date());

  // Fetch CSRF token on mount
  useEffect((): void => {
    const fetchCSRFToken = async (): Promise<void> => {
      try {
        // First try to get from cookies
        const tokenFromCookies = getCSRFToken();
        if (tokenFromCookies) {
          setCsrfToken(tokenFromCookies);
          return;
        }

        // If no token in cookies, request a new one
        const validCSRF = await validateCSRFProtection();
        if (validCSRF) {
          // Check again after validation
          const newToken = getCSRFToken();
          if (newToken) {
            setCsrfToken(newToken);
          }
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    void fetchCSRFToken();
  }, []);

  // Determine security level based on connection and environment
  useEffect((): void => {
    // Check if using HTTPS
    const isSecureConnection =
      typeof window !== 'undefined' && window.location.protocol === 'https:';

    // Example logic - adjust according to your security requirements
    if (isSecureConnection && process.env.NODE_ENV === 'production') {
      setSecurityLevel('high');
    } else if (isSecureConnection || process.env.NODE_ENV === 'production') {
      setSecurityLevel('medium');
    } else {
      setSecurityLevel('low');
    }
  }, []);

  // Monitor user activity
  useEffect((): (() => void) => {
    const updateActivity = (): void => {
      setLastActivity(new Date());
    };

    // Track various user interactions
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    return (): void => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, []);

  // Create the context value object
  const contextValue: SecurityContextType = {
    isAuthenticated,
    csrfToken,
    user: user
      ? {
          id: user.id,
          role: user.role,
          permissions: user.permissions ?? [], // Using nullish coalescing operator
        }
      : null,
    securityLevel,
    lastActivity,
  };

  return <SecurityContext.Provider value={contextValue}>{children}</SecurityContext.Provider>;
}
