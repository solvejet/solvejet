// src/hooks/useSecureContext.ts
'use client';

import { useContext, useEffect, useState } from 'react';
import { SecurityContext } from '@/components/SecurityProvider';

interface SecurityContextReturn {
  isAuthenticated: boolean;
  csrfToken: string | null;
  user: {
    id: string;
    role: string;
    permissions: string[];
  } | null;
  securityLevel: 'high' | 'medium' | 'low';
  lastActivity: Date;
  checkPermission: (permission: string) => boolean;
  requireAuth: (requiredRole?: string) => boolean;
}

export const useSecureContext = (): SecurityContextReturn => {
  const context = useContext(SecurityContext);
  const [lastActivityTime, setLastActivityTime] = useState<Date>(new Date());

  if (!context) {
    throw new Error('useSecureContext must be used within a SecurityProvider');
  }

  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    let inactivityTimer: NodeJS.Timeout;

    const handleActivity = (): void => {
      setLastActivityTime(new Date());
      // Reset inactivity timer
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Use window.location for navigation
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/logout';
        }
      }, 30 * 60 * 1000); // 30 minutes
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
  }, []);

  const checkPermission = (permission: string): boolean => {
    return !!context.user?.permissions.includes(permission);
  };

  const requireAuth = (requiredRole?: string): boolean => {
    if (!context.isAuthenticated) {
      // Use window.location for navigation
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      return false;
    }

    if (requiredRole && context.user?.role !== requiredRole) {
      // Super admin bypass
      if (context.user?.role === 'SUPER_ADMIN') {
        return true;
      }

      // Use window.location for navigation
      if (typeof window !== 'undefined') {
        window.location.href = '/403';
      }
      return false;
    }

    return true;
  };

  return {
    ...context,
    lastActivity: lastActivityTime,
    checkPermission,
    requireAuth,
  };
};
