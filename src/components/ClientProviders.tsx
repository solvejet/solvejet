// src/components/ClientProviders.tsx
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

// Define prop types for providers
interface SecurityProviderProps {
  children: ReactNode;
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

interface AnimationProviderProps {
  children: ReactNode;
}

// More efficient lazy loading with load prioritization
const SecurityProvider = lazy(() => {
  let loadPromise: Promise<{ default: React.ComponentType<SecurityProviderProps> }>;

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    // Load during idle time for better performance
    loadPromise = new Promise(resolve => {
      (window as Window).requestIdleCallback(() => {
        import('@/components/SecurityProvider')
          .then(mod => {
            resolve({ default: mod.SecurityProvider });
          })
          .catch((err: unknown) => {
            console.error('Failed to load SecurityProvider:', err);
            // Fallback component if loading fails
            const FallbackProvider: React.FC<SecurityProviderProps> = ({ children }) => (
              <>{children}</>
            );
            resolve({ default: FallbackProvider });
          });
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    loadPromise = import('@/components/SecurityProvider')
      .then(mod => ({ default: mod.SecurityProvider }))
      .catch((err: unknown) => {
        console.error('Failed to load SecurityProvider:', err);
        const FallbackProvider: React.FC<SecurityProviderProps> = ({ children }) => <>{children}</>;
        return { default: FallbackProvider };
      });
  }

  return loadPromise;
});

// Load analytics only when browser is idle
const AnalyticsProvider = lazy(() => {
  // Use a lower priority for analytics as it's not critical for UX
  return new Promise<{ default: React.ComponentType<AnalyticsProviderProps> }>(resolve => {
    setTimeout(() => {
      import('@/components/Analytics')
        .then(mod => {
          resolve({ default: mod.AnalyticsProvider });
        })
        .catch(() => {
          // Provide a no-op fallback
          const FallbackProvider: React.FC<AnalyticsProviderProps> = ({ children }) => (
            <>{children}</>
          );
          resolve({ default: FallbackProvider });
        });
    }, 500); // Short delay for initial rendering to complete
  });
});

// Load animations with lowest priority
const AnimationProvider = lazy(() => {
  // Delay animations to prioritize core content
  return new Promise<{ default: React.ComponentType<AnimationProviderProps> }>(resolve => {
    setTimeout(() => {
      import('@/components/AnimationProvider')
        .then(mod => {
          resolve({ default: mod.AnimationProvider });
        })
        .catch(() => {
          // Provide a no-op fallback
          const FallbackProvider: React.FC<AnimationProviderProps> = ({ children }) => (
            <>{children}</>
          );
          resolve({ default: FallbackProvider });
        });
    }, 1000); // Longer delay for animations
  });
});

// Memoized components for nested providers
const MemoizedAuthInitializer = memo(() => <AuthInitializer />);

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

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps): JSX.Element {
  // Create stable query client instance
  const [queryClient] = useState(() => new QueryClient(QUERY_CLIENT_OPTIONS));

  // Track component mounting for hydration safety
  const [mounted, setMounted] = useState(false);

  // Track when to load non-critical providers
  const [shouldLoadAnimations, setShouldLoadAnimations] = useState(false);

  useEffect(() => {
    // Only mark as mounted after hydration
    setMounted(true);

    // Schedule animations to load after critical content
    const animationTimer = setTimeout(() => {
      setShouldLoadAnimations(true);
    }, 2000); // 2 second delay for animations

    return (): void => {
      clearTimeout(animationTimer);
    };
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
                {shouldLoadAnimations ? (
                  <Suspense fallback={<DefaultFallback>{children}</DefaultFallback>}>
                    <AnimationProvider>{children}</AnimationProvider>
                  </Suspense>
                ) : (
                  // Render children directly until animations are ready to load
                  children
                )}
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
