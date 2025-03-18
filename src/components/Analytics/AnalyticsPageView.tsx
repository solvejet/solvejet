'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/components/Analytics';
import { usePathname } from 'next/navigation';

interface AnalyticsPageViewProps {
  pageType: string;
  pageData?: Record<string, string | number | boolean>;
}

/**
 * Component that tracks page views in analytics
 * Use this at the top level of a page to automatically track page views
 */
export function AnalyticsPageView({ pageType, pageData = {} }: AnalyticsPageViewProps): null {
  const { trackEvent } = useAnalytics();
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on mount and when pathname changes
    trackEvent({
      name: 'page_view',
      category: 'engagement',
      label: pageType,
      properties: {
        page_type: pageType,
        path: pathname,
        ...pageData,
      },
    });
  }, [pathname, pageType, pageData, trackEvent]);

  // This component doesn't render anything
  return null;
}
