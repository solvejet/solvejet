// src/lib/analytics/hooks/useAnalytics.ts
'use client';

import { useCallback } from 'react';
import { ANALYTICS_CONFIG } from '../config';
import type { AnalyticsEvent } from '../types';

interface AnalyticsHook {
  trackEvent: (event: AnalyticsEvent) => void;
  isEnabled: boolean;
}

export function useAnalytics(): AnalyticsHook {
  const isEnabled = ANALYTICS_CONFIG.gtm.isEnabled || ANALYTICS_CONFIG.ga.isEnabled;

  const trackEvent = useCallback(
    (event: AnalyticsEvent): void => {
      try {
        // Only track if analytics is enabled
        if (!isEnabled) {
          console.warn('Analytics tracking is disabled: Missing configuration');
          return;
        }

        // Google Analytics Event
        if (ANALYTICS_CONFIG.ga.isEnabled && typeof window !== 'undefined' && 'gtag' in window) {
          window.gtag('event', event.name, {
            event_category: event.category,
            event_label: event.label,
            value: event.value,
            non_interaction: event.nonInteraction,
            ...event,
          });
        }

        // Google Tag Manager Event
        if (
          ANALYTICS_CONFIG.gtm.isEnabled &&
          typeof window !== 'undefined' &&
          'dataLayer' in window
        ) {
          window.dataLayer.push({
            event: event.name,
            ...event,
          });
        }
      } catch (error) {
        // Use type assertion for error object
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error tracking event:', errorMessage);
      }
    },
    [isEnabled]
  );

  return { trackEvent, isEnabled };
}
