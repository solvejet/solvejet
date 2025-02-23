// src/lib/analytics/types.ts
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export interface AnalyticsEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: unknown;
}
