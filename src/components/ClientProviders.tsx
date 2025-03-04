// src/components/ClientProviders.tsx
'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthInitializer } from '@/components/AuthInitializer';

// Register ScrollTrigger with GSAP
// Dynamically import GSAP to prevent it from blocking initial render
const loadGsapWithPlugins = async (): Promise<void> => {
  if (typeof window === 'undefined') return;

  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
};

// Lazy load non-critical components
const SecurityProvider = lazy(() =>
  import('@/components/SecurityProvider').then(mod => ({ default: mod.SecurityProvider }))
);

const ReactQueryDevtools = lazy(() =>
  process.env.NODE_ENV === 'development'
    ? import('@tanstack/react-query-devtools').then(mod => ({ default: mod.ReactQueryDevtools }))
    : Promise.resolve({ default: () => null })
);

const AnalyticsProvider = lazy(() =>
  import('@/components/Analytics').then(mod => ({ default: mod.AnalyticsProvider }))
);

const Providers = lazy(() =>
  import('@/components/Providers').then(mod => ({ default: mod.Providers }))
);

const SpeedInsights = lazy(() =>
  process.env.NODE_ENV === 'production'
    ? import('@vercel/speed-insights/next').then(mod => ({
        default: mod.SpeedInsights,
      }))
    : Promise.resolve({ default: () => null })
);

// Lazy load lenis smooth scrolling after critical content renders
const SmoothScroll = lazy(() => {
  return import('./SmoothScroll').then(mod => ({
    default: mod.SmoothScroll,
  }));
});

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
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect((): (() => void) => {
    setMounted(true);

    // Load GSAP and plugins asynchronously
    let gsapLoading = false;

    // Delay GSAP loading to improve initial render time
    const timer = setTimeout(() => {
      if (!gsapLoading) {
        gsapLoading = true;
        void loadGsapWithPlugins().then(() => {
          setGsapLoaded(true);
        });
      }
    }, 1000);

    // Cleanup function
    return (): void => {
      clearTimeout(timer);
    };
  }, []);

  // Return a simple loading state during SSR
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={null}>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </Suspense>
        <AuthInitializer />
        {/* Delay loading non-critical UI enhancements */}
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
        <Suspense fallback={<>{children}</>}>
          <SecurityProvider>
            <Suspense fallback={<>{children}</>}>
              <AnalyticsProvider>
                <Suspense fallback={<>{children}</>}>
                  <Providers>
                    {/* Only load smooth scrolling after everything else */}
                    {gsapLoaded && (
                      <Suspense fallback={null}>
                        <SmoothScroll />
                      </Suspense>
                    )}
                    {children}
                  </Providers>
                </Suspense>
              </AnalyticsProvider>
            </Suspense>
          </SecurityProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
