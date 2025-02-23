// src/lib/analytics/config.ts
const getEnvVar = (name: string): string | undefined => {
  if (typeof window !== 'undefined') {
    return process.env[name];
  }
  return undefined;
};

export const ANALYTICS_CONFIG = {
  gtm: {
    containerId: getEnvVar('NEXT_PUBLIC_GTM_ID'),
    isEnabled: Boolean(getEnvVar('NEXT_PUBLIC_GTM_ID')),
  },
  ga: {
    measurementId: getEnvVar('NEXT_PUBLIC_GA_ID'),
    isEnabled: Boolean(getEnvVar('NEXT_PUBLIC_GA_ID')),
  },
  hubspot: {
    trackerId: getEnvVar('NEXT_PUBLIC_HUBSPOT_ID'),
    isEnabled: Boolean(getEnvVar('NEXT_PUBLIC_HUBSPOT_ID')),
  },
} as const;

// Type for our analytics configuration
export type AnalyticsConfig = typeof ANALYTICS_CONFIG;

// Validation function that won't throw errors
export function validateAnalyticsConfig(): {
  isValid: boolean;
  missingVars: string[];
} {
  const { gtm, ga, hubspot } = ANALYTICS_CONFIG;
  const missingVars: string[] = [];

  if (!gtm.containerId) missingVars.push('NEXT_PUBLIC_GTM_ID');
  if (!ga.measurementId) missingVars.push('NEXT_PUBLIC_GA_ID');
  if (!hubspot.trackerId) missingVars.push('NEXT_PUBLIC_HUBSPOT_ID');

  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}
