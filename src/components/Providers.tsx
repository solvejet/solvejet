// src/components/Providers.tsx
'use client';

import React, { lazy, Suspense, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/ui/toast/ToastProvider';
import { initLenis } from '@/lib/lenis';

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
    setIsMounted(true);

    // Initialize Lenis for smooth scrolling site-wide
    initLenis();

    // No need for cleanup as Lenis will be active throughout the site
  }, []);

  if (!isMounted) {
    return <></>;
  }

  return (
    <ErrorBoundary>
      <ToastProvider />
      <Suspense fallback={null}>
        <SpeedInsights />
      </Suspense>
      {children}
    </ErrorBoundary>
  );
}
