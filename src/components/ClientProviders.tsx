// src/components/ClientProviders.tsx
'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Import components directly
import { AuthInitializer } from '@/components/AuthInitializer';
import { SecurityProvider } from '@/components/SecurityProvider';
import { AnalyticsProvider } from '@/components/Analytics';
import { AnimationProvider } from '@/components/AnimationProvider'; // Add AnimationProvider

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps): React.ReactElement {
  // Create a new QueryClient instance for each session
  const [queryClient] = useState(
    (): QueryClient =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
          },
        },
      })
  );

  // Avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mark as mounted after hydration
    setMounted(true);
  }, []);

  // Return a simple loading state during SSR to prioritize fast initial load
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        <SecurityProvider>
          <AnalyticsProvider>
            <AnimationProvider>{children}</AnimationProvider>
          </AnalyticsProvider>
        </SecurityProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
