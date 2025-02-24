// src/components/ClientProviders.tsx
'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Dynamic imports for non-critical components
const Providers = dynamic(
  () => import('@/components/Providers').then(mod => ({ default: mod.Providers })),
  {
    loading: () => <></>,
  }
);

const AnalyticsProvider = dynamic(
  () => import('@/components/Analytics').then(mod => ({ default: mod.AnalyticsProvider })),
  {
    loading: () => <></>,
  }
);

const SpeedInsights = dynamic(() =>
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
  return (
    <ErrorBoundary>
      <SpeedInsights />
      <AnalyticsProvider>
        <Providers>{children}</Providers>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}
