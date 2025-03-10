// src/components/ClientProviders.tsx - Optimized
'use client';

import type { ReactNode, JSX } from 'react';
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthInitializer } from '@/components/AuthInitializer';

// Define a type for the props to make memoization type-safe
interface ProviderChildrenProps {
  children: ReactNode;
}

// Lazily load non-critical providers with proper typing and prefetching
const SecurityProvider = lazy(() => {
  // Start prefetching as soon as possible
  const promise = import('@/components/SecurityProvider').then(mod => ({
    default: mod.SecurityProvider,
  }));

  // Prefetch in background
  void promise;

  return promise;
});

const AnalyticsProvider = lazy(() => {
  const promise = import('@/components/Analytics').then(mod => ({
    default: mod.AnalyticsProvider,
  }));

  void promise;

  return promise;
});

const AnimationProvider = lazy(() => {
  const promise = import('@/components/AnimationProvider').then(mod => ({
    default: mod.AnimationProvider,
  }));

  void promise;

  return promise;
});

// Memoized components for nested providers to prevent unnecessary re-renders
const MemoizedAuthInitializer = memo(() => <AuthInitializer />);

// Create stable fallback to avoid re-renders
const DefaultFallback = memo(({ children }: ProviderChildrenProps) => <>{children}</>);

// Define query client options once outside component
const QUERY_CLIENT_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always' as const, // Fixed type with 'as const'
      gcTime: 10 * 60 * 1000, // Modern replacement for cacheTime
    },
    mutations: {
      // Add mutation options for better performance
      retry: 0,
      networkMode: 'always' as const,
    },
  },
};

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps): JSX.Element {
  // Use a ref for the QueryClient to ensure it's truly stable across renders
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_OPTIONS));

  // Avoid hydration mismatch with a dedicated state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mark as mounted after hydration
    setMounted(true);

    // Prefetch critical modules when browser is idle
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as Window).requestIdleCallback(() => {
        void import('@/components/SecurityProvider');
        void import('@/components/Analytics');
      });
    }
  }, []);

  // Return a simple loading state during SSR to prioritize fast initial load
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MemoizedAuthInitializer />
        <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
          <SecurityProvider>
            <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
              <AnalyticsProvider>
                <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
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

// Export memoized version for use in higher-level components
export const MemoizedClientProviders = memo(ClientProviders);
