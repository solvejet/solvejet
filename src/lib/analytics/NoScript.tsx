// src/lib/analytics/NoScript.tsx
import type { JSX } from 'react';
import { ANALYTICS_CONFIG } from './config';

export function AnalyticsNoScript(): JSX.Element | null {
  const gtmId = ANALYTICS_CONFIG.gtm.containerId;

  // Early return if GTM is not enabled or ID is missing
  if (!ANALYTICS_CONFIG.gtm.isEnabled || !gtmId) {
    return null;
  }

  // Now TypeScript knows gtmId is definitely a string
  const iframeSrc = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;

  return (
    <noscript>
      <iframe
        src={iframeSrc}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
