// src/lib/optimize/preload.ts

/**
 * Preloads critical resources for better performance
 * This should be called in a useEffect in the app layout or client components
 */
export function preloadCriticalAssets(): void {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/images/industries/real-estate.webp',
    '/images/industries/ecommerce.webp',
    '/images/services/custom-software-development.svg',
    '/images/team-effort.jpg'
  ];

  // Preload critical JavaScript chunks
  const criticalChunks = ['/_next/static/chunks/framework.js', '/_next/static/chunks/main.js'];

  // Helper to create link elements
  const createLink = (rel: string, href: string, as?: string): void => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (as) link.setAttribute('as', as);
    document.head.appendChild(link);
  };

  // Preload critical resources in order of priority
  // Use requestIdleCallback to avoid blocking the main thread
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Preload critical chunks first
      criticalChunks.forEach(chunk => {
        createLink('preload', chunk, 'script');
      });

      // Then preload images
      criticalImages.forEach(image => {
        createLink('preload', image, 'image');
      });
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      criticalChunks.forEach(chunk => {
        createLink('preload', chunk, 'script');
      });

      criticalImages.forEach(image => {
        createLink('preload', image, 'image');
      });
    }, 1000); // Add a small delay to prioritize initial render
  }
}

/**
 * Prefetches non-critical routes and resources
 * This should be called after the page has loaded
 */
export function prefetchResources(): void {
  if (typeof window === 'undefined') return;

  // Only run in production
  if (process.env.NODE_ENV !== 'production') return;

  // Routes to prefetch
  const routesToPrefetch = ['/case-studies', '/services', '/contact'];

  // Helper to prefetch routes
  const prefetchRoute = (href: string): void => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  // Use Intersection Observer to prefetch routes when user scrolls
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          // Start prefetching when user scrolls down
          routesToPrefetch.forEach(prefetchRoute);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    // Observe the footer or another element near the bottom
    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    } else {
      // Fallback if no footer
      setTimeout(() => {
        routesToPrefetch.forEach(prefetchRoute);
      }, 5000);
    }
  } else {
    // Fallback for browsers without Intersection Observer
    setTimeout(() => {
      routesToPrefetch.forEach(prefetchRoute);
    }, 5000);
  }
}
