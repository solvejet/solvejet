// src/components/Analytics/index.tsx
'use client';

import { type JSX, lazy, Suspense, type ReactNode } from 'react';

// Lazy load analytics components
const AnalyticsScripts = lazy(() =>
  import('@/lib/analytics/Script').then(mod => ({
    default: mod.AnalyticsScripts,
  }))
);

const AnalyticsNoScript = lazy(() =>
  import('@/lib/analytics/NoScript').then(mod => ({
    default: mod.AnalyticsNoScript,
  }))
);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps): JSX.Element {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsScripts />
        <AnalyticsNoScript />
      </Suspense>
      {children}
    </>
  );
}
