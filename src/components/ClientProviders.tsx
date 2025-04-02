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

// Deferred AuthInitializer with proper loading
const AuthInitializer = lazy(() =>
  import('@/components/AuthInitializer').then(mod => ({
    default: mod.AuthInitializer,
  }))
);

// Security provider with proper loading
const SecurityProvider = lazy(() =>
  import('@/components/SecurityProvider').then(mod => ({
    default: mod.SecurityProvider,
  }))
);

// Analytics provider with proper loading
const AnalyticsProvider = lazy(() =>
  import('@/components/Analytics').then(mod => ({
    default: mod.AnalyticsProvider,
  }))
);

// Animation provider with proper loading
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

  // Create a more straightforward loading approach that prioritizes QueryClient availability
  const [providersReady, setProvidersReady] = useState({
    security: false,
    analytics: false,
    animation: false,
    auth: false,
  });

  useEffect(() => {
    // Only mark as mounted after hydration
    setMounted(true);

    // Schedule providers to load progressively but ensure QueryClient is always available
    const timers = [
      // Security is higher priority
      setTimeout(() => {
        setProvidersReady(prev => ({ ...prev, security: true }));
      }, 100),

      // Auth initializer
      setTimeout(() => {
        setProvidersReady(prev => ({ ...prev, auth: true }));
      }, 300),

      // Analytics can wait a bit longer
      setTimeout(() => {
        setProvidersReady(prev => ({ ...prev, analytics: true }));
      }, 2000),

      // Animations are lowest priority
      setTimeout(() => {
        setProvidersReady(prev => ({ ...prev, animation: true }));
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

  // Always wrap everything in QueryClientProvider first to ensure it's available
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {/* Important: Auth initializer should be loaded unconditionally */}
        {providersReady.auth && (
          <Suspense fallback={null}>
            <AuthInitializer />
          </Suspense>
        )}

        {/* Security provider with fallback */}
        {providersReady.security ? (
          <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
            <SecurityProvider>
              {/* Analytics provider with fallback */}
              {providersReady.analytics ? (
                <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
                  <AnalyticsProvider>
                    {/* Animation provider with fallback */}
                    {providersReady.animation ? (
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
