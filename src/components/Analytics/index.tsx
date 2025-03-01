// src/components/Analytics/index.tsx
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { AnalyticsScripts, AnalyticsNoScript } from '@/lib/analytics/Script';
import { ANALYTICS_CONFIG } from '@/lib/analytics/config';
import type { AnalyticsEvent } from '@/lib/analytics/types';
import type { JSX } from 'react';

interface AnalyticsContextType {
  isEnabled: boolean;
  trackEvent: (event: AnalyticsEvent) => void;
}

// Create a default no-op function that satisfies ESLint
const noopTrackEvent = (/* event: AnalyticsEvent */): void => {
  // This is intentionally empty as it's a placeholder for when analytics is disabled
  // or before the real implementation is available
};

const AnalyticsContext = createContext<AnalyticsContextType>({
  isEnabled: false,
  trackEvent: noopTrackEvent, // Use the named function instead of inline empty arrow
});

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps): JSX.Element {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState<boolean>(false);

  useEffect((): void => {
    // Check if analytics is enabled based on configuration and user preferences
    const { gtm, ga } = ANALYTICS_CONFIG;
    const enabled = gtm.isEnabled || ga.isEnabled;

    // Check user preferences for analytics/tracking from localStorage
    const userConsentKey = 'analytics_consent';
    const userConsent = typeof window !== 'undefined' ? localStorage.getItem(userConsentKey) : null;

    // If user has explicitly denied consent, respect that regardless of config
    if (userConsent === 'denied') {
      setIsAnalyticsEnabled(false);
      return;
    }

    // Otherwise, go with the config setting
    setIsAnalyticsEnabled(enabled);

    // If this is first visit and config is enabled, store consent in localStorage
    if (userConsent === null && enabled && typeof window !== 'undefined') {
      localStorage.setItem(userConsentKey, 'granted');
    }
  }, []);

  const trackEvent = (event: AnalyticsEvent): void => {
    if (!isAnalyticsEnabled) {
      // If analytics is disabled, don't track anything
      return;
    }

    try {
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
  };

  return (
    <AnalyticsContext.Provider
      value={{
        isEnabled: isAnalyticsEnabled,
        trackEvent,
      }}
    >
      {/* Add analytics scripts if enabled */}
      {isAnalyticsEnabled && <AnalyticsScripts />}
      {isAnalyticsEnabled && <AnalyticsNoScript />}
      {children}
    </AnalyticsContext.Provider>
  );
}

// Export the hook for using analytics throughout the app
export const useAnalytics = (): AnalyticsContextType => {
  return useContext(AnalyticsContext);
};
