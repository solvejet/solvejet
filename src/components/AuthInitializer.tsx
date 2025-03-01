// src/components/AuthInitializer.tsx
'use client';

import { useEffect, useState } from 'react';
import { initializeAuth } from '@/store/auth-store';

export function AuthInitializer(): null {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setInitialized(true);
      }
    };

    if (!initialized) {
      void init();
    }
  }, [initialized]);

  return null;
}
