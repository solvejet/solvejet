// src/components/Providers.tsx
'use client';

import React, { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  preloadCriticalAssets,
  prefetchResources,
  preloadSplineWhenReady,
} from '@/lib/optimize/preload';

// Lazy load ToastProvider which is not immediately needed
const ToastProvider = lazy(() =>
  import('@/components/ui/toast/ToastProvider').then(mod => ({
    default: mod.ToastProvider,
  }))
);

// Lazy load SpeedInsights only in production
const SpeedInsights = lazy(() =>
  process.env.NODE_ENV === 'production'
    ? import('@vercel/speed-insights/next').then(({ SpeedInsights }) => ({
        default: SpeedInsights,
      }))
    : Promise.resolve({ default: () => null })
);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    // Mark as mounted after hydration
    setIsMounted(true);

    // Preload critical assets immediately
    preloadCriticalAssets();

    // Initialize Lenis for smooth scrolling, but with a slight delay to prioritize critical content
    // Fix: Wrap async function to avoid returning Promise in setTimeout
    const lenisTimeout = setTimeout(() => {
      const initLenis = async (): Promise<void> => {
        try {
          const { reinitializeLenis } = await import('@/lib/lenis');
          reinitializeLenis();
        } catch (error) {
          console.error('Error initializing Lenis:', error);
        }
      };

      // Execute but don't return the promise
      void initLenis();
    }, 100); // Small delay to prioritize critical content

    // User interaction monitoring for Spline preloading
    let userHasInteracted = false;
    const handleUserInteraction = (): void => {
      if (!userHasInteracted) {
        userHasInteracted = true;
        // After user shows engagement, preload Spline
        preloadSplineWhenReady();
        // Remove listeners
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      }
    };

    // Add interaction listeners
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });

    // Prefetch non-critical resources after page load
    if (document.readyState === 'complete') {
      prefetchResources();
    } else {
      window.addEventListener('load', prefetchResources, { once: true });
    }

    // Clean up
    return (): void => {
      clearTimeout(lenisTimeout);
      window.removeEventListener('load', prefetchResources);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  // Only show a minimal shell before hydration to prevent flicker
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <ToastProvider />
      </Suspense>
      <Suspense fallback={null}>
        <SpeedInsights />
      </Suspense>
      {children}
    </ErrorBoundary>
  );
}
