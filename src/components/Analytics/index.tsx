// src/components/Analytics/index.tsx
'use client';

import type { JSX, ReactNode } from 'react';
import { AnalyticsScripts } from '@/lib/analytics/Script';
import { AnalyticsNoScript } from '@/lib/analytics/NoScript';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps): JSX.Element {
  return (
    <>
      <AnalyticsScripts />
      <AnalyticsNoScript />
      {children}
    </>
  );
}
