// src/lib/lenis.ts
import Lenis from 'lenis';

// Extend Window interface to include lenis
declare global {
  interface Window {
    lenis?: Lenis | undefined;
  }
}

// Define valid Lenis options
interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;

  if (window.lenis) return window.lenis;

  const lenisOptions: LenisOptions = {
    duration: 1.1,
    easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  };

  const lenis = new Lenis(lenisOptions);
  window.lenis = lenis;

  function raf(time: number): void {
    if (window.lenis) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
  }

  requestAnimationFrame(raf);
  return lenis;
}

export function getLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  return window.lenis ?? null;
}

export function destroyLenis(): void {
  if (typeof window !== 'undefined' && window.lenis) {
    window.lenis.destroy();
    delete window.lenis;
  }
}
