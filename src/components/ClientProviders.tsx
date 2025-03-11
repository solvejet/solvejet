// src/components/ClientProviders.tsx
'use client';

import type { ReactNode, JSX } from 'react';
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';
import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Define a type for the props to make memoization type-safe
interface ProviderChildrenProps {
  children: ReactNode;
}

// Create stable fallback to avoid re-renders
const DefaultFallback = memo(({ children }: ProviderChildrenProps) => <>{children}</>);

// Optimized query client options
const QUERY_CLIENT_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always' as const,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 0,
      networkMode: 'always' as const,
    },
  },
};

// Deferred AuthInitializer
const AuthInitializer = lazy(() =>
  import('@/components/AuthInitializer').then(mod => ({
    default: mod.AuthInitializer,
  }))
);

// More efficient lazy loading with load prioritization
const SecurityProvider = lazy(() =>
  import('@/components/SecurityProvider').then(mod => ({
    default: mod.SecurityProvider,
  }))
);

// Load analytics only when browser is idle
const AnalyticsProvider = lazy(() =>
  import('@/components/Analytics').then(mod => ({
    default: mod.AnalyticsProvider,
  }))
);

// Load animations with lowest priority
const AnimationProvider = lazy(() =>
  import('@/components/AnimationProvider').then(mod => ({
    default: mod.AnimationProvider,
  }))
);

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps): JSX.Element {
  // Create stable query client instance
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_OPTIONS));

  // Track component mounting for hydration safety
  const [mounted, setMounted] = useState(false);

  // Track when to load providers in a staggered manner
  const [loadState, setLoadState] = useState({
    security: false,
    analytics: false,
    animation: false,
    auth: false,
  });

  useEffect(() => {
    // Only mark as mounted after hydration
    setMounted(true);

    // Schedule providers to load progressively:
    const timers = [
      // Security is higher priority
      setTimeout(() => {
        setLoadState(prev => ({ ...prev, security: true }));
      }, 100),

      // Auth initializer
      setTimeout(() => {
        setLoadState(prev => ({ ...prev, auth: true }));
      }, 300),

      // Analytics can wait a bit longer
      setTimeout(() => {
        setLoadState(prev => ({ ...prev, analytics: true }));
      }, 2000),

      // Animations are lowest priority
      setTimeout(() => {
        setLoadState(prev => ({ ...prev, animation: true }));
      }, 3500),
    ];

    return (): void => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // Return a simple loading state during SSR to prioritize fast initial load
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {loadState.auth && (
          <Suspense fallback={null}>
            <AuthInitializer />
          </Suspense>
        )}

        {loadState.security ? (
          <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
            <SecurityProvider>
              {loadState.analytics ? (
                <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
                  <AnalyticsProvider>
                    {loadState.animation ? (
                      <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
                        <AnimationProvider>{children}</AnimationProvider>
                      </Suspense>
                    ) : (
                      children
                    )}
                  </AnalyticsProvider>
                </Suspense>
              ) : (
                children
              )}
            </SecurityProvider>
          </Suspense>
        ) : (
          children
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Export memoized version for use in higher-level components
export const MemoizedClientProviders = memo(ClientProviders);
