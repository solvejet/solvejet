// src/components/Providers.tsx
'use client';

import React, { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initLenis } from '@/lib/lenis';
import { preloadCriticalAssets, prefetchResources } from '@/lib/optimize/preload';

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

    // Initialize Lenis for smooth scrolling
    initLenis();

    // Preload critical assets in first idle period
    preloadCriticalAssets();

    // Prefetch non-critical resources after page load
    if (document.readyState === 'complete') {
      prefetchResources();
    } else {
      window.addEventListener('load', prefetchResources, { once: true });
    }

    // Clean up
    return (): void => {
      window.removeEventListener('load', prefetchResources);
      // No need to destroy Lenis as it's managed globally
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
