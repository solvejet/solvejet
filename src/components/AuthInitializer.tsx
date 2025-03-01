// src/components/AuthInitializer.tsx - Fixed version
'use client';

import { useEffect, useState } from 'react';
import { initializeAuth, useAuthStore } from '@/store/auth-store';

export function AuthInitializer(): null {
  const [initialized, setInitialized] = useState(false);
  const { isInitializing, setInitializing } = useAuthStore();

  useEffect((): (() => void) => {
    let mounted = true;

    const init = async (): Promise<void> => {
      try {
        // Check if we've already initialized in this session to avoid duplicate calls
        const alreadyInitialized = sessionStorage.getItem('auth_initialized') === 'true';

        if (!alreadyInitialized) {
          // Set a timeout to ensure we don't get stuck in an infinite loading state
          const timeoutId = setTimeout(() => {
            if (mounted) {
              console.warn('Auth initialization timed out, forcing completion');
              setInitializing(false);
              sessionStorage.setItem('auth_initialized', 'true');
              setInitialized(true);
            }
          }, 5000); // 5 seconds timeout

          await initializeAuth();

          clearTimeout(timeoutId);
        } else {
          // If already initialized, make sure state is properly set
          if (isInitializing) {
            setInitializing(false);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setInitializing(false);
          sessionStorage.setItem('auth_initialized', 'true');
        }
      } finally {
        if (mounted) {
          setInitialized(true);
          sessionStorage.setItem('auth_initialized', 'true');
        }
      }
    };

    // Always run init() but check for existing initialization
    if (!initialized) {
      void init();
    }

    return (): void => {
      mounted = false;
    };
  }, [initialized, isInitializing, setInitializing]);

  return null;
}
