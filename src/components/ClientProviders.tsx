// src/components/ClientProviders.tsx
'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthInitializer } from '@/components/AuthInitializer';

// Lazily load non-critical providers
const SecurityProvider = lazy(() =>
  import('@/components/SecurityProvider').then(mod => ({
    default: mod.SecurityProvider,
  }))
);

const AnalyticsProvider = lazy(() =>
  import('@/components/Analytics').then(mod => ({
    default: mod.AnalyticsProvider,
  }))
);

const AnimationProvider = lazy(() =>
  import('@/components/AnimationProvider').then(mod => ({
    default: mod.AnimationProvider,
  }))
);

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps): React.ReactElement {
  // Create a stable QueryClient with optimized settings
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            // Add these optimizations:
            refetchOnWindowFocus: false, // Reduce unnecessary refetches
            refetchOnReconnect: 'always', // Only refetch when truly needed
            // cacheTime: 10 * 60 * 1000, // 10 minutes cache time
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
        <Suspense fallback={<>{children}</>}>
          <SecurityProvider>
            <Suspense fallback={<>{children}</>}>
              <AnalyticsProvider>
                <Suspense fallback={<>{children}</>}>
                  <AnimationProvider>{children}</AnimationProvider>
                </Suspense>
              </AnalyticsProvider>
            </Suspense>
          </SecurityProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
