// src/lib/lenis.ts
import Lenis from 'lenis';

// Extend Window interface to include lenis instance
declare global {
  interface Window {
    lenis?: Lenis | null;
  }
}

/**
 * Complete type definition for Lenis options
 */
interface LenisOptions {
  wrapper?: HTMLElement | Window;
  content?: HTMLElement;
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  wheelMultiplier?: number;
  lerp?: number;
  infinite?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchInertiaMultiplier?: number;
  autoResize?: boolean;
}

// Track animation frame for performance optimization
let rafId: number | null = null;

// Memoize media query to avoid recalculating
let reducedMotionQuery: MediaQueryList | null = null;

// Constants
const DEFAULT_OPTIONS: LenisOptions = Object.freeze({
  duration: 1.1,
  easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

/**
 * Checks if user prefers reduced motion
 */
function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  }

  return reducedMotionQuery.matches;
}

/**
 * Initializes Lenis smooth scrolling with performance optimizations
 */
export function initLenis(customOptions?: Partial<LenisOptions>): Lenis | null {
  // Server-side or reduced motion checks
  if (typeof window === 'undefined' || getPrefersReducedMotion()) return null;

  // Return existing instance if already initialized
  if (window.lenis) return window.lenis;

  try {
    // Merge default options with any custom options - only create object if needed
    const lenisOptions = customOptions ? { ...DEFAULT_OPTIONS, ...customOptions } : DEFAULT_OPTIONS;

    // Create new Lenis instance
    const lenis = new Lenis(lenisOptions);
    window.lenis = lenis;

    // Clean up any existing animation frame
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    // Optimized RAF loop with proper cleanup tracking
    const handleRaf = (time: number): void => {
      if (window.lenis) {
        window.lenis.raf(time);
        rafId = requestAnimationFrame(handleRaf);
      }
    };

    // Start animation loop
    rafId = requestAnimationFrame(handleRaf);
    return lenis;
  } catch (error) {
    console.error('Lenis initialization failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Gets the current Lenis instance if available
 */
export function getLenis(): Lenis | null {
  return typeof window !== 'undefined' ? window.lenis ?? null : null;
}

/**
 * Properly cleans up the Lenis instance and animation frames
 */
export function destroyLenis(): void {
  if (typeof window === 'undefined') return;

  // Cancel animation frame to prevent memory leaks
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Destroy Lenis instance
  if (window.lenis) {
    try {
      window.lenis.destroy();
      window.lenis = null;
    } catch (error) {
      console.error('Error destroying Lenis:', error instanceof Error ? error.message : error);
    }
  }
}
