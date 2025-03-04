// src/components/SmoothScroll.tsx
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { initLenis, destroyLenis } from '@/lib/lenis';

export function SmoothScroll(): null {
  // This component doesn't render anything, it just initializes smooth scrolling
  useEffect(() => {
    // Initialize Lenis for smooth scrolling site-wide
    const lenis = initLenis();

    // Connect Lenis to ScrollTrigger for scroll animations only if both are available
    if (lenis !== null && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Use arrow function to avoid 'this' binding issues
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Use arrow function to avoid 'this' binding issues
      gsap.ticker.add((time): void => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Cleanup function
    return (): void => {
      destroyLenis();
    };
  }, []);

  return null;
}
