// src/components/Providers.tsx
'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/ui/toast/ToastProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
      <SpeedInsights />
      {children}
    </ErrorBoundary>
  );
}
