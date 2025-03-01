// src/components/ClientProviders.tsx
'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthInitializer } from '@/components/AuthInitializer';
import { SecurityProvider } from '@/components/SecurityProvider';

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

  useEffect((): void => {
    setMounted(true);
  }, []);

  // Return a simple loading state during SSR
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        <AuthInitializer />
        <SpeedInsights />
        <SecurityProvider>
          <AnalyticsProvider>
            <Providers>{children}</Providers>
          </AnalyticsProvider>
        </SecurityProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
