// src/components/AnimationProvider.tsx
'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { JSX } from 'react';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps): JSX.Element {
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (initialized.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      try {
        // Initialize smooth scrolling
        import('@/lib/lenis')
          .then(({ initLenis }) => {
            const lenis = initLenis();

            // Connect Lenis to ScrollTrigger for synchronized animations
            if (lenis) {
              lenis.on('scroll', () => {
                ScrollTrigger.update();
              });

              // Use arrow function to avoid 'this' binding issues
              gsap.ticker.add((time): void => {
                lenis.raf(time * 1000);
              });

              gsap.ticker.lagSmoothing(0);
            }
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              console.warn('Animation initialization failed:', error.message);
            } else {
              console.warn('Animation initialization failed:', error);
            }
          });

        // Set up common scroll animations
        setupScrollAnimations();
      } catch (error) {
        console.error('Failed to initialize animations:', error);
      }
    }

    initialized.current = true;

    // Cleanup function
    return (): void => {
      try {
        // Clean up all GSAP animations to prevent memory leaks
        ScrollTrigger.getAll().forEach(trigger => {
          trigger.kill();
        });
        gsap.globalTimeline.clear();
      } catch (error) {
        console.error('Error cleaning up animations:', error);
      }
    };
  }, []);

  // Set up common scroll animations used across the site
  const setupScrollAnimations = (): void => {
    try {
      // Fade-in animations for elements with the .fade-in class
      gsap.utils.toArray<HTMLElement>('.fade-in').forEach(element => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100px',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    } catch (error) {
      console.error('Error setting up scroll animations:', error);
    }
  };

  return <>{children}</>;
}
