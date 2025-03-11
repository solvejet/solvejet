// src/components/AnimationProvider.tsx
'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';

// Define a type for GSAP and ScrollTrigger
interface GSAPInstance {
  fromTo: (
    element: HTMLElement | HTMLElement[],
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>
  ) => unknown;
  to: (element: HTMLElement | HTMLElement[], vars: Record<string, unknown>) => unknown;
  utils: {
    toArray: <T>(selector: string | NodeList | HTMLElement[] | HTMLElement) => T[];
  };
  ticker: {
    add: (callback: (time: number) => void) => void;
    remove: (callback: (time: number) => void) => void;
    lagSmoothing: (threshold: number, adjustedLag?: number) => void;
  };
  globalTimeline: {
    clear: () => void;
  };
  registerPlugin: (plugin: unknown) => void;
}

interface ScrollTriggerInstance {
  create: (vars: Record<string, unknown>) => unknown;
  update: () => void;
  getAll: () => { kill: () => void }[];
  refresh: () => void;
}

interface AnimationProviderProps {
  children: ReactNode;
}

// Define animations configuration to make them easier to maintain and modify
const ANIMATIONS = {
  fadeIn: {
    from: { opacity: 0, y: 20 },
    to: {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
    scrollTrigger: {
      start: 'top bottom-=100px',
      toggleActions: 'play none none none',
    },
  },
  // Add more animations as needed
};

export function AnimationProvider({ children }: AnimationProviderProps): JSX.Element {
  const initialized = useRef<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Use proper typing for Lenis but don't create a local instance
  const [isGsapReady, setIsGsapReady] = useState(false);

  // References for GSAP and tickerCallback to avoid re-creating them
  const gsapRef = useRef<GSAPInstance | null>(null);
  const scrollTriggerRef = useRef<ScrollTriggerInstance | null>(null);
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null);

  // Check for reduced motion preference
  useEffect((): (() => void) => {
    if (typeof window !== 'undefined') {
      // Get initial value
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(prefersReducedMotion);

      // Set up listener for changes
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleChange = (e: MediaQueryListEvent): void => {
        setReducedMotion(e.matches);
      };

      // Modern event listener
      mediaQuery.addEventListener('change', handleChange);

      return (): void => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    return (): void => {
      // Empty return for server-side rendering
    };
  }, []);

  // Handle animations setup - now with better idle detection
  useEffect((): (() => void) => {
    // Skip if already initialized or user prefers reduced motion
    if (initialized.current || reducedMotion || !isGsapReady) {
      return (): void => {
        // Empty cleanup function if we didn't initialize
      };
    }

    const initializeGsap = async (): Promise<void> => {
      // Use requestIdleCallback to wait for an idle period
      const requestIdlePromise = (): Promise<void> =>
        new Promise(resolve => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(
              () => {
                resolve();
              },
              { timeout: 3000 }
            );
          } else {
            // Fallback to setTimeout for browsers without requestIdleCallback
            setTimeout(() => {
              resolve();
            }, 1000);
          }
        });

      // Wait for browser idle time
      await requestIdlePromise();

      // Now initialize GSAP in an optimized way
      try {
        // Import and get Lenis instance instead of creating one
        const lenisModule = await import('@/lib/lenis');
        // Get the existing lenis instance instead of creating a new one
        const lenisInstance = lenisModule.getLenis();

        // Dynamically import GSAP
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/dist/ScrollTrigger');

        gsapRef.current = gsapModule.gsap as GSAPInstance;
        scrollTriggerRef.current =
          scrollTriggerModule.ScrollTrigger as unknown as ScrollTriggerInstance;

        // Register ScrollTrigger plugin
        gsapRef.current.registerPlugin(scrollTriggerRef.current);

        // Don't add Lenis to gsap ticker - this was causing conflict
        // Instead, connect to ScrollTrigger's update function
        if (lenisInstance) {
          // Connect Lenis to ScrollTrigger
          const scrollTriggerUpdate = (): void => {
            if (scrollTriggerRef.current) {
              scrollTriggerRef.current.update();
            }
          };

          lenisInstance.on('scroll', scrollTriggerUpdate);
        }

        // Set up animations after a short delay
        setTimeout(() => {
          setupScrollAnimations();
        }, 500);
      } catch (error) {
        console.error(
          'Animation initialization failed:',
          error instanceof Error ? error.message : String(error)
        );
      }
    };

    // Run setup after a short delay to prioritize rendering
    const initTimer = setTimeout(() => {
      void initializeGsap();
      initialized.current = true;
    }, 1500);

    // Clean up function with proper typing
    return (): void => {
      clearTimeout(initTimer);

      // Clean up ticker
      if (tickerCallbackRef.current && gsapRef.current) {
        gsapRef.current.ticker.remove(tickerCallbackRef.current);
      }

      // Clean up scroll triggers
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.getAll().forEach((trigger): void => {
          trigger.kill();
        });
      }

      // Clear timeline
      if (gsapRef.current) {
        gsapRef.current.globalTimeline.clear();
      }

      // IMPORTANT: Disconnect from ScrollTrigger but DON'T destroy Lenis
      // We just disconnect our event listener
      const disconnectScrollTrigger = async (): Promise<void> => {
        try {
          const lenisModule = await import('@/lib/lenis');
          const lenisInstance = lenisModule.getLenis();

          if (lenisInstance && scrollTriggerRef.current) {
            const scrollTriggerUpdate = (): void => {
              if (scrollTriggerRef.current) {
                scrollTriggerRef.current.update();
              }
            };

            // Remove our specific event listener
            lenisInstance.off('scroll', scrollTriggerUpdate);
          }
        } catch (error) {
          console.error('Error disconnecting ScrollTrigger:', error);
        }
      };

      void disconnectScrollTrigger();
    };
  }, [reducedMotion, isGsapReady]);

  // Load GSAP after interactive metrics are done
  useEffect((): (() => void) => {
    // After the component mounts, wait for a period before loading GSAP
    const timer = setTimeout(() => {
      setIsGsapReady(true);
    }, 2000); // 2 seconds delay

    return (): void => {
      clearTimeout(timer);
    };
  }, []);

  // Optimized scroll animation setup with proper typing
  const setupScrollAnimations = (): void => {
    if (!gsapRef.current || !scrollTriggerRef.current) return;

    try {
      // Use a single batch operation for better performance
      const fadeElements = gsapRef.current.utils.toArray<HTMLElement>('.fade-in');

      // Only set up animations if elements exist (performance)
      if (fadeElements.length > 0) {
        fadeElements.forEach((element): void => {
          // Create on-demand with configuration from constant
          gsapRef.current?.fromTo(element, ANIMATIONS.fadeIn.from, {
            ...ANIMATIONS.fadeIn.to,
            scrollTrigger: {
              trigger: element,
              ...ANIMATIONS.fadeIn.scrollTrigger,
            },
          });
        });
      }
    } catch (error) {
      console.error(
        'Error setting up scroll animations:',
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  return <>{children}</>;
}
