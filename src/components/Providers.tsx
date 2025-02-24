// src/components/Providers.tsx
'use client';

import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/ui/toast/ToastProvider';

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

  React.useEffect(() => {
    setIsMounted(true);
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
