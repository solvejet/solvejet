// src/lib/optimize/preload.ts

/**
 * Preloads critical resources for better performance
 * This should be called in a useEffect in the app layout or client components
 */
export function preloadCriticalAssets(): void {
  if (typeof window === 'undefined') return;

  // Preload critical images only - remove hardcoded JS chunks
  const criticalImages = [
    // Hero background image is highest priority
    '/images/clients/kelsi_organics.webp',
    '/images/clients/riya-logo.webp',
    '/images/clients/logo.webp',
    '/images/clients/tyent.webp',
    // Industry images that appear in viewport quickly
    '/images/industries/real-estate.webp',
    '/images/industries/ecommerce.webp',
    '/images/services/custom-software-development.svg',
  ];

  // Helper to create link elements
  const createLink = (rel: string, href: string, as?: string, importance?: string): void => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (as) link.setAttribute('as', as);
    if (importance) link.setAttribute('importance', importance);
    document.head.appendChild(link);
  };

  // Preload critical resources in order of priority
  // Use requestIdleCallback to avoid blocking the main thread
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Preload hero images with high importance
      criticalImages.slice(0, 5).forEach(image => {
        createLink('preload', image, 'image', 'high');
      });

      // Then preload other images with lower importance
      criticalImages.slice(5).forEach(image => {
        createLink('preload', image, 'image', 'low');
      });
    });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
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
  const routesToPrefetch = ['/case-studies', '/what-we-do', '/contact'];

  // Non-critical resources that can be prefetched when browser is idle
  const prefetchResources = [
    // Additional images for below-the-fold content
    '/images/team-collaboration.webp',
    '/images/industries/healthcare.webp',
    '/images/industries/fintech.webp',
    '/images/industries/logistics.webp',
    '/images/industries/manufacturing.webp',
  ];

  // Helper to prefetch routes
  const prefetchRoute = (href: string): void => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  // Helper to prefetch resources with specific type
  const prefetchResource = (href: string, as?: string): void => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    if (as) link.setAttribute('as', as);
    document.head.appendChild(link);
  };

  // Use Intersection Observer to prefetch routes when user scrolls
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          // Start prefetching when user scrolls down
          routesToPrefetch.forEach(prefetchRoute);

          // Prefetch other resources
          prefetchResources.forEach(resource => {
            // Determine resource type from extension
            const extension = resource.split('.').pop()?.toLowerCase();
            const resourceType =
              extension === 'webp' || extension === 'png' || extension === 'jpg'
                ? 'image'
                : extension === 'js'
                ? 'script'
                : extension === 'css'
                ? 'style'
                : undefined;

            prefetchResource(resource, resourceType);
          });

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
        prefetchResources.forEach(resource => {
          const extension = resource.split('.').pop()?.toLowerCase();
          const resourceType =
            extension === 'webp' || extension === 'png' || extension === 'jpg'
              ? 'image'
              : extension === 'js'
              ? 'script'
              : extension === 'css'
              ? 'style'
              : undefined;

          prefetchResource(resource, resourceType);
        });
      }, 5000);
    }
  } else {
    // Fallback for browsers without Intersection Observer
    setTimeout(() => {
      routesToPrefetch.forEach(prefetchRoute);
      prefetchResources.forEach(resource => {
        const extension = resource.split('.').pop()?.toLowerCase();
        const resourceType =
          extension === 'webp' || extension === 'png' || extension === 'jpg'
            ? 'image'
            : extension === 'js'
            ? 'script'
            : extension === 'css'
            ? 'style'
            : undefined;

        prefetchResource(resource, resourceType);
      });
    }, 5000);
  }
}

/**
 * Advanced: Loads the Spline model asynchronously when conditions are right
 * This should be called only when appropriate (user has engaged, page is idle)
 */
export function preloadSplineWhenReady(): void {
  if (typeof window === 'undefined') return;

  // Check if this is a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Don't preload on mobile or for users who prefer reduced motion
  if (isMobile || prefersReducedMotion) return;

  // Wait for page to be fully loaded and idle
  if (document.readyState === 'complete') {
    initPreloadSequence();
  } else {
    window.addEventListener('load', initPreloadSequence, { once: true });
  }

  function initPreloadSequence(): void {
    // Wait for the browser to be idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(
        () => {
          // For Spline specifically, use prefetch with low importance
          // This will be non-blocking and happen in the background
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = '/models/titanium.splinecode';
          link.setAttribute('as', 'fetch');
          link.setAttribute('importance', 'low');
          link.setAttribute('crossorigin', 'anonymous');
          document.head.appendChild(link);
        },
        { timeout: 10000 } // 10 second timeout
      );
    } else {
      // Fallback with long timeout to ensure it doesn't compete with critical resources
      setTimeout(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/models/titanium.splinecode';
        link.setAttribute('as', 'fetch');
        link.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(link);
      }, 8000);
    }
  }
}
