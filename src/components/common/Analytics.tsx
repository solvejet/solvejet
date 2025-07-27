// src/components/common/Analytics.tsx
'use client';

import Script from 'next/script';
import { useState, useEffect, useRef, useCallback, JSX } from 'react';

// Analytics IDs with proper typing
interface AnalyticsIds {
    readonly GTM_ID: string;
    readonly GA_ID: string;
    readonly CLARITY_ID: string;
    readonly HOTJAR_ID: string;
    readonly LINKEDIN_PARTNER_ID: string;
    readonly FACEBOOK_PIXEL_ID: string;
}

const getAnalyticsIds = (): AnalyticsIds => ({
    GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || '',
    GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
    CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID || '',
    HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
    LINKEDIN_PARTNER_ID: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '',
    FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
});

interface AnalyticsConfig {
    readonly enableInDevelopment: boolean;
    readonly debugMode: boolean;
    readonly enableConsentMode: boolean;
}

const config: AnalyticsConfig = {
    enableInDevelopment: false,
    debugMode: process.env.NODE_ENV === 'development',
    enableConsentMode: true,
};

interface ScriptStatus {
    readonly [key: string]: 'loading' | 'loaded' | 'error';
}

type LogLevel = 'info' | 'warn' | 'error';

const log = (level: LogLevel, message: string, data?: unknown): void => {
    if (config.debugMode) {
        const logFn = level === 'error' ? console.error : console.warn;
        logFn(`[Analytics] ${message}`, data || '');
    }
};

export default function Analytics(): JSX.Element | null {
    const [scriptStatus, setScriptStatus] = useState<ScriptStatus>({});
    const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mountedRef = useRef<boolean>(true);

    // Only load analytics in production or if explicitly enabled in development
    const shouldLoadAnalytics = process.env.NODE_ENV === 'production' || config.enableInDevelopment;

    const ids = getAnalyticsIds();

    const performHealthCheck = useCallback((): void => {
        if (typeof window === 'undefined') return;

        console.warn('[Analytics Health Check]');
        log('info', `Environment: ${process.env.NODE_ENV}`);
        log('info', `GTM (${ids.GTM_ID}): ${Array.isArray(window.dataLayer) ? '✅ Loaded' : '❌ Failed'}`);
        log('info', `GA (${ids.GA_ID}): ${typeof window.gtag === 'function' ? '✅ Loaded' : '❌ Failed'}`);
        log('info', `Clarity (${ids.CLARITY_ID}): ${typeof window.clarity === 'function' ? '✅ Loaded' : '❌ Failed'}`);
        log('info', `Hotjar (${ids.HOTJAR_ID}): ${typeof window.hj === 'function' ? '✅ Loaded' : '❌ Failed'}`);
        log('info', `LinkedIn (${ids.LINKEDIN_PARTNER_ID}): ${typeof window.lintrk === 'function' ? '✅ Loaded' : '❌ Failed'}`);
        log('info', `Facebook (${ids.FACEBOOK_PIXEL_ID}): ${typeof window.fbq === 'function' ? '✅ Loaded' : '❌ Failed'}`);

        // Log script statuses
        log('info', 'Script statuses:', scriptStatus);
    }, [ids, scriptStatus]);

    useEffect(() => {
        mountedRef.current = true;

        if (!shouldLoadAnalytics) {
            log('info', 'Analytics disabled in development');
            return;
        }

        // Initialize consent mode if enabled
        if (config.enableConsentMode && typeof window !== 'undefined') {
            // Set up data layer for consent mode
            window.dataLayer = window.dataLayer || [];

            // Default consent state
            window.dataLayer.push({
                event: 'default_consent',
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
            });
        }

        // Health check after all scripts should be loaded
        initTimeoutRef.current = setTimeout(() => {
            if (!mountedRef.current) return;

            if (config.debugMode) {
                performHealthCheck();
            }
        }, 5000);

        return () => {
            mountedRef.current = false;
            if (initTimeoutRef.current) {
                clearTimeout(initTimeoutRef.current);
            }
        };
    }, [shouldLoadAnalytics, performHealthCheck]);

    const updateScriptStatus = (scriptId: string, status: ScriptStatus[string]): void => {
        if (!mountedRef.current) return;

        setScriptStatus(prev => ({
            ...prev,
            [scriptId]: status,
        }));
    };

    if (!shouldLoadAnalytics) {
        return null;
    }

    return (
        <>
            {/* Google Tag Manager */}
            {ids.GTM_ID && (
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    onLoad={() => {
                        log('info', 'GTM loaded successfully');
                        updateScriptStatus('gtm', 'loaded');
                    }}
                    onError={(e) => {
                        log('error', 'Failed to load GTM', e);
                        updateScriptStatus('gtm', 'error');
                    }}
                    onReady={() => {
                        updateScriptStatus('gtm', 'loading');
                    }}
                >
                    {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${ids.GTM_ID}');
          `}
                </Script>
            )}

            {/* Google Analytics (fallback if GTM is not used) */}
            {ids.GA_ID && !ids.GTM_ID && (
                <>
                    <Script
                        id="ga-script"
                        src={`https://www.googletagmanager.com/gtag/js?id=${ids.GA_ID}`}
                        strategy="afterInteractive"
                        onLoad={() => {
                            log('info', 'GA script loaded successfully');
                            updateScriptStatus('ga-script', 'loaded');
                        }}
                        onError={(e) => {
                            log('error', 'Failed to load GA script', e);
                            updateScriptStatus('ga-script', 'error');
                        }}
                    />
                    <Script
                        id="ga-init"
                        strategy="afterInteractive"
                        onLoad={() => {
                            log('info', 'GA initialized successfully');
                            updateScriptStatus('ga-init', 'loaded');
                        }}
                        onError={(e) => {
                            log('error', 'Failed to initialize GA', e);
                            updateScriptStatus('ga-init', 'error');
                        }}
                    >
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ids.GA_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                ${config.enableConsentMode ? `
                consent: {
                  ad_storage: 'denied',
                  analytics_storage: 'denied'
                }
                ` : ''}
              });
            `}
                    </Script>
                </>
            )}

            {/* Microsoft Clarity */}
            {ids.CLARITY_ID && (
                <Script
                    id="clarity-script"
                    strategy="afterInteractive"
                    onLoad={() => {
                        log('info', 'Clarity loaded successfully');
                        updateScriptStatus('clarity', 'loaded');
                    }}
                    onError={(e) => {
                        log('error', 'Failed to load Clarity', e);
                        updateScriptStatus('clarity', 'error');
                    }}
                >
                    {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${ids.CLARITY_ID}");
          `}
                </Script>
            )}

            {/* Hotjar */}
            {ids.HOTJAR_ID && (
                <Script
                    id="hotjar-script"
                    strategy="afterInteractive"
                    onLoad={() => {
                        log('info', 'Hotjar loaded successfully');
                        updateScriptStatus('hotjar', 'loaded');
                    }}
                    onError={(e) => {
                        log('error', 'Failed to load Hotjar', e);
                        updateScriptStatus('hotjar', 'error');
                    }}
                >
                    {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${ids.HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
                </Script>
            )}

            {/* LinkedIn Insight Tag */}
            {ids.LINKEDIN_PARTNER_ID && (
                <Script
                    id="linkedin-script"
                    strategy="afterInteractive"
                    onLoad={() => {
                        log('info', 'LinkedIn Insight loaded successfully');
                        updateScriptStatus('linkedin', 'loaded');
                    }}
                    onError={(e) => {
                        log('error', 'Failed to load LinkedIn Insight', e);
                        updateScriptStatus('linkedin', 'error');
                    }}
                >
                    {`
            _linkedin_partner_id = "${ids.LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
                </Script>
            )}

            {/* Facebook Pixel */}
            {ids.FACEBOOK_PIXEL_ID && (
                <Script
                    id="facebook-pixel"
                    strategy="afterInteractive"
                    onLoad={() => {
                        log('info', 'Facebook Pixel loaded successfully');
                        updateScriptStatus('facebook', 'loaded');
                    }}
                    onError={(e) => {
                        log('error', 'Failed to load Facebook Pixel', e);
                        updateScriptStatus('facebook', 'error');
                    }}
                >
                    {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${ids.FACEBOOK_PIXEL_ID}');
            ${config.enableConsentMode ? `
            fbq('consent', 'revoke');
            ` : ''}
            fbq('track', 'PageView');
          `}
                </Script>
            )}

            {/* GTM NoScript fallback */}
            {ids.GTM_ID && (
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${ids.GTM_ID}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                        title="Google Tag Manager"
                    />
                </noscript>
            )}

            {/* GDPR Compliance Helper - Development Only */}
            {config.debugMode && config.enableConsentMode && (
                <Script
                    id="gdpr-helper"
                    strategy="lazyOnload"
                >
                    {`
            // GDPR Compliance Helper
            window.analyticsConsent = {
              granted: false, // Default to false for GDPR compliance
              updateConsent: function(granted, adConsent = false) {
                this.granted = granted;
                
                // Update GTM/GA consent
                if (typeof window.gtag === 'function') {
                  window.gtag('consent', 'update', {
                    'analytics_storage': granted ? 'granted' : 'denied',
                    'ad_storage': adConsent ? 'granted' : 'denied',
                    'ad_user_data': adConsent ? 'granted' : 'denied',
                    'ad_personalization': adConsent ? 'granted' : 'denied'
                  });
                }
                
                // Update Facebook Pixel consent
                if (typeof window.fbq === 'function') {
                  if (granted && adConsent) {
                    window.fbq('consent', 'grant');
                  } else {
                    window.fbq('consent', 'revoke');
                  }
                }
                
                // Update other analytics tools
                if (typeof window.clarity === 'function') {
                  if (!granted) {
                    window.clarity('stop');
                  } else {
                    window.clarity('start');
                  }
                }
                
                console.warn('[Analytics] Consent updated - Analytics:', granted, 'Advertising:', adConsent);
              },
              
              grantAll: function() {
                this.updateConsent(true, true);
              },
              
              grantAnalytics: function() {
                this.updateConsent(true, false);
              },
              
              denyAll: function() {
                this.updateConsent(false, false);
              }
            };
            
            // Expose global consent functions
            window.grantAnalyticsConsent = window.analyticsConsent.grantAll.bind(window.analyticsConsent);
            window.denyAnalyticsConsent = window.analyticsConsent.denyAll.bind(window.analyticsConsent);
          `}
                </Script>
            )}

            {/* Performance Monitoring - Development Only */}
            {config.debugMode && (
                <Script
                    id="performance-monitor"
                    strategy="lazyOnload"
                >
                    {`
            // Performance monitoring for analytics scripts
            const analyticsPerf = {
              start: performance.now(),
              scripts: {},
              markLoaded: function(name) {
                this.scripts[name] = {
                  loadTime: performance.now() - this.start,
                  timestamp: new Date().toISOString()
                };
                console.warn('[Analytics Perf]', name, 'loaded in', this.scripts[name].loadTime.toFixed(2), 'ms');
              },
              
              getReport: function() {
                return {
                  totalScripts: Object.keys(this.scripts).length,
                  avgLoadTime: Object.values(this.scripts).reduce((sum, script) => sum + script.loadTime, 0) / Object.keys(this.scripts).length,
                  scripts: this.scripts
                };
              }
            };
            
            // Monitor script loads
            const scriptIds = ['gtm', 'ga', 'clarity', 'hotjar', 'linkedin', 'facebook'];
            scriptIds.forEach(service => {
              const script = document.querySelector('#' + service + '-script');
              if (script) {
                script.addEventListener('load', () => analyticsPerf.markLoaded(service));
                script.addEventListener('error', () => {
                  console.error('[Analytics Perf]', service, 'failed to load');
                });
              }
            });
            
            // Report after all scripts should be loaded
            setTimeout(() => {
              console.warn('[Analytics Performance Report]');
              console.warn('Summary:', analyticsPerf.getReport());
            }, 8000);
            
            // Expose for manual inspection
            window.analyticsPerf = analyticsPerf;
          `}
                </Script>
            )}

            {/* Error Boundary for Analytics */}
            {config.debugMode && (
                <Script
                    id="analytics-error-boundary"
                    strategy="lazyOnload"
                >
                    {`
            // Global error handler for analytics
            window.addEventListener('error', (event) => {
              if (event.filename && (
                event.filename.includes('googletagmanager.com') ||
                event.filename.includes('google-analytics.com') ||
                event.filename.includes('clarity.ms') ||
                event.filename.includes('hotjar.com') ||
                event.filename.includes('snap.licdn.com') ||
                event.filename.includes('connect.facebook.net')
              )) {
                console.error('[Analytics Error]', {
                  message: event.message,
                  filename: event.filename,
                  lineno: event.lineno,
                  colno: event.colno,
                  error: event.error
                });
                
                // Optionally report to your error tracking service
                // reportAnalyticsError(event);
              }
            });
            
            // Promise rejection handler
            window.addEventListener('unhandledrejection', (event) => {
              if (event.reason && event.reason.message && 
                  event.reason.message.includes('analytics')) {
                console.error('[Analytics Promise Rejection]', event.reason);
              }
            });
          `}
                </Script>
            )}

            {/* Consent Banner Integration Helper */}
            {config.enableConsentMode && (
                <Script
                    id="consent-integration"
                    strategy="lazyOnload"
                >
                    {`
            // Helper for integrating with consent management platforms
            window.initAnalyticsWithConsent = function(config = {}) {
              const {
                analytics = false,
                advertising = false,
                functional = true,
                necessary = true
              } = config;
              
              // Update all analytics tools based on consent
              if (typeof window.analyticsConsent === 'object' && window.analyticsConsent) {
                window.analyticsConsent.updateConsent(analytics, advertising);
              }
              
              // Fire consent event for GTM
              if (Array.isArray(window.dataLayer)) {
                window.dataLayer.push({
                  event: 'consent_update',
                  analytics_consent: analytics,
                  advertising_consent: advertising,
                  functional_consent: functional,
                  necessary_consent: necessary
                });
              }
              
              console.warn('[Analytics] Consent initialized:', config);
            };
            
            // Auto-detect popular consent management platforms
            setTimeout(() => {
              // OneTrust
              if (typeof window.OneTrust === 'object' && window.OneTrust) {
                console.warn('[Analytics] OneTrust detected - integrate with OneTrust consent events');
              }
              
              // Cookiebot
              if (typeof window.Cookiebot === 'object' && window.Cookiebot) {
                console.warn('[Analytics] Cookiebot detected - integrate with Cookiebot consent events');
              }
              
              // Custom consent banner detection
              const consentBanner = document.querySelector('[data-consent-banner]');
              if (consentBanner) {
                console.warn('[Analytics] Custom consent banner detected');
              }
            }, 2000);
          `}
                </Script>
            )}
        </>
    );
}