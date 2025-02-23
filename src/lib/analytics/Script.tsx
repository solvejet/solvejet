// src/lib/analytics/Script.tsx
'use client';

import Script from 'next/script';
import { ANALYTICS_CONFIG } from './config';
import type { JSX } from 'react';

export function AnalyticsScripts(): JSX.Element {
  // Early return if no IDs are configured
  if (
    !ANALYTICS_CONFIG.gtm.containerId &&
    !ANALYTICS_CONFIG.ga.measurementId &&
    !ANALYTICS_CONFIG.hubspot.trackerId
  ) {
    return <></>;
  }

  return (
    <>
      {/* Google Tag Manager */}
      {ANALYTICS_CONFIG.gtm.isEnabled && ANALYTICS_CONFIG.gtm.containerId && (
        <Script
          id="gtm-script"
          strategy="worker"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.gtm.containerId}');
            `,
          }}
        />
      )}

      {/* Google Analytics */}
      {ANALYTICS_CONFIG.ga.isEnabled && ANALYTICS_CONFIG.ga.measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga.measurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_CONFIG.ga.measurementId}');
              `,
            }}
          />
        </>
      )}

      {/* HubSpot */}
      {ANALYTICS_CONFIG.hubspot.isEnabled && ANALYTICS_CONFIG.hubspot.trackerId && (
        <Script
          id="hs-script-loader"
          src={`//js.hs-scripts.com/${ANALYTICS_CONFIG.hubspot.trackerId}.js`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

export function AnalyticsNoScript(): JSX.Element | null {
  if (!ANALYTICS_CONFIG.gtm.isEnabled || !ANALYTICS_CONFIG.gtm.containerId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.gtm.containerId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
