// src/components/ClientProviders.tsx
'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthInitializer } from '@/components/AuthInitializer';
import { initLenis, destroyLenis } from '@/lib/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

  useEffect((): (() => void) => {
    setMounted(true);

    // Initialize Lenis for smooth scrolling site-wide
    const lenis = initLenis();

    // Connect Lenis to ScrollTrigger for scroll animations
    if (lenis !== null) {
      // Use arrow function to avoid 'this' binding issues
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Use arrow function to avoid 'this' binding issues
      gsap.ticker.add((time): void => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Cleanup function
    return (): void => {
      destroyLenis();
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
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
        <Suspense fallback={<>{children}</>}>
          <SecurityProvider>
            <Suspense fallback={<>{children}</>}>
              <AnalyticsProvider>
                <Suspense fallback={<>{children}</>}>
                  <Providers>{children}</Providers>
                </Suspense>
              </AnalyticsProvider>
            </Suspense>
          </SecurityProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
