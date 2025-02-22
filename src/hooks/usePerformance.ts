// src/hooks/usePerformance.ts
import { useEffect, useRef } from 'react';

export const usePerformance = (componentName: string): number => {
  const renderCount = useRef<number>(0);

  useEffect((): void => {
    renderCount.current += 1;
    
    // Log performance metrics only in development
    if (process.env.NODE_ENV === 'development') {
      const performance = window.performance;
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      // Use console.warn for development logging
      console.warn(`[${componentName}] Performance Metrics:`, {
        renderCount: renderCount.current,
        ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
        domLoad: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
      });
    }
  });

  return renderCount.current;
};
