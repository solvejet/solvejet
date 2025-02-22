// src/hooks/useSecureContext.ts
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

interface SecurityContextReturn extends SecurityContextType {
  checkPermission: (permission: string) => boolean;
  requireAuth: (requiredRole?: string) => boolean;
  lastActivity: Date;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecureContext = (): SecurityContextReturn => {
  const context = useContext(SecurityContext);
  const router = useRouter();
  const [lastActivity, setLastActivity] = useState<Date>(new Date());

  if (!context) {
    throw new Error('useSecureContext must be used within a SecurityProvider');
  }

  useEffect((): (() => void) => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    let inactivityTimer: NodeJS.Timeout;

    const handleActivity = (): void => {
      setLastActivity(new Date());
      // Reset inactivity timer
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Use void operator to explicitly ignore the promise
        void router.push('/auth/logout');
      }, 30 * 60 * 1000);
    };

    // Add activity listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Initial timer
    handleActivity();

    // Cleanup function
    return (): void => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(inactivityTimer);
    };
  }, [router]);

  const checkPermission = (permission: string): boolean => {
    return context.user?.permissions.includes(permission) ?? false;
  };

  const requireAuth = (requiredRole?: string): boolean => {
    if (!context.isAuthenticated) {
      // Use void operator to explicitly ignore the promise
      void router.push('/auth/login');
      return false;
    }
    if (requiredRole && context.user?.role !== requiredRole) {
      // Use void operator to explicitly ignore the promise
      void router.push('/403');
      return false;
    }
    return true;
  };

  return {
    ...context,
    lastActivity,
    checkPermission,
    requireAuth,
  };
};