// src/components/AnimationProvider.tsx
'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type Lenis from 'lenis';
import type { JSX } from 'react';

// Register plugins just once outside the component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
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
  // Use proper typing for Lenis
  const lenisInstance = useRef<Lenis | null>(null);

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

  // Handle animations setup
  useEffect((): (() => void) => {
    // Skip if already initialized or user prefers reduced motion
    if (initialized.current || reducedMotion) {
      return (): void => {
        // Empty cleanup function if we didn't initialize
      };
    }

    const tickerCallback = (time: number): void => {
      if (lenisInstance.current) {
        lenisInstance.current.raf(time);
      }
    };

    const setupAnimations = async (): Promise<void> => {
      try {
        // Type-safe dynamic imports
        const lenisModule = await import('@/lib/lenis');
        const lenis = lenisModule.initLenis();
        lenisInstance.current = lenis;

        // Connect Lenis to ScrollTrigger only if lenis successfully initialized
        if (lenis) {
          // Use debounced scroll event for better performance
          let scrollTick = false;
          lenis.on('scroll', (): void => {
            if (!scrollTick) {
              scrollTick = true;

              // Use requestAnimationFrame for performance
              window.requestAnimationFrame((): void => {
                ScrollTrigger.update();
                scrollTick = false;
              });
            }
          });

          gsap.ticker.add(tickerCallback);
          gsap.ticker.lagSmoothing(0);

          // Set up scroll animations with performance optimization
          setupScrollAnimations();
        }
      } catch (error) {
        console.error(
          'Animation initialization failed:',
          error instanceof Error ? error.message : String(error)
        );
      }
    };

    // Run setup
    void setupAnimations();
    initialized.current = true;

    // Clean up function with proper typing
    return (): void => {
      // Import sync to ensure it's available during cleanup
      // We need to use dynamic import here to avoid circular dependencies
      import('@/lib/lenis')
        .then((lenisModule): void => {
          try {
            // Remove scroll triggers first
            ScrollTrigger.getAll().forEach((trigger): void => {
              trigger.kill();
            });

            // Clean GSAP
            gsap.globalTimeline.clear();

            // Clean up ticker if lenis was initialized - using a simpler approach that works
            if (lenisInstance.current) {
              // Instead of trying to use the exact same function reference,
              // just clear all ticker callbacks to be safe
              gsap.ticker.remove(tickerCallback);
            }

            // Destroy lenis with proper module import
            lenisModule.destroyLenis();
          } catch (error) {
            console.error(
              'Error cleaning up animations:',
              error instanceof Error ? error.message : String(error)
            );
          }
        })
        .catch((error: unknown): void => {
          // Use unknown instead of any
          console.error(
            'Error importing lenis module during cleanup:',
            error instanceof Error ? error.message : String(error)
          );
        });
    };
  }, [reducedMotion]);

  // Optimized scroll animation setup with proper typing
  const setupScrollAnimations = (): void => {
    try {
      // Use a single batch operation for better performance
      const fadeElements = gsap.utils.toArray<HTMLElement>('.fade-in');

      // Only set up animations if elements exist (performance)
      if (fadeElements.length > 0) {
        fadeElements.forEach((element): void => {
          // Create on-demand with configuration from constant
          gsap.fromTo(element, ANIMATIONS.fadeIn.from, {
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
