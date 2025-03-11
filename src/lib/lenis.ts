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

// Global variables to track Lenis instance and animation frame
let rafId: number | null = null;
let lenisInstance: Lenis | null = null;
let isDestroyed = false;

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
 * Handle the RAF loop for Lenis scrolling
 */
function startRaf(): void {
  // Clean up any existing animation frame first
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Only start if we have a valid instance
  if (!lenisInstance || isDestroyed) return;

  // The RAF handler function
  const handleRaf = (time: number): void => {
    if (lenisInstance && !isDestroyed) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(handleRaf);
    }
  };

  // Start the animation loop
  rafId = requestAnimationFrame(handleRaf);
}

/**
 * Reinitializes Lenis if it's been destroyed or is not functioning
 * This is the primary function to call if Lenis stops working
 */
export function reinitializeLenis(): Lenis | null {
  // Reset the destroyed flag
  isDestroyed = false;

  // If Lenis is already initialized and running, just return it
  if (lenisInstance && typeof window !== 'undefined' && window.lenis === lenisInstance) {
    return lenisInstance;
  }

  // Otherwise initialize a new instance
  return initLenis();
}

/**
 * Initializes Lenis smooth scrolling with performance optimizations
 * Will reuse an existing instance if available
 */
export function initLenis(customOptions?: Partial<LenisOptions>): Lenis | null {
  // Server-side or reduced motion checks
  if (typeof window === 'undefined' || getPrefersReducedMotion()) return null;

  // If we already have a Lenis instance and it's not destroyed, return it
  if (lenisInstance && !isDestroyed) {
    // Ensure it's also set on the window
    window.lenis = lenisInstance;
    return lenisInstance;
  }

  try {
    // Reset the destroyed flag
    isDestroyed = false;

    // Merge default options with any custom options
    const lenisOptions = customOptions ? { ...DEFAULT_OPTIONS, ...customOptions } : DEFAULT_OPTIONS;

    // Create new Lenis instance
    lenisInstance = new Lenis(lenisOptions);
    window.lenis = lenisInstance;

    // Start the RAF loop
    startRaf();

    // Add listener for document visibility changes to handle tab switching
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return lenisInstance;
  } catch (error) {
    console.error('Lenis initialization failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Handle visibility changes (tab switching)
 */
function handleVisibilityChange(): void {
  if (document.visibilityState === 'visible') {
    // Restart RAF loop when tab becomes visible again
    startRaf();
  } else if (rafId !== null) {
    // Pause animation when tab is not visible
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/**
 * Gets the current Lenis instance if available
 */
export function getLenis(): Lenis | null {
  // First check our module variable
  if (lenisInstance && !isDestroyed) {
    return lenisInstance;
  }

  // Then check the window object as fallback
  return typeof window !== 'undefined' ? window.lenis ?? null : null;
}

/**
 * Cleans up the Lenis instance resources
 * Doesn't fully destroy it so it can be reinitialized more easily
 */
export function stopLenis(): void {
  // Cancel animation frame
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Remove visibility change listener
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
}

/**
 * Properly cleans up the Lenis instance and animation frames
 */
export function destroyLenis(): void {
  if (typeof window === 'undefined') return;

  // Set the destroyed flag
  isDestroyed = true;

  // Cancel animation frame to prevent memory leaks
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Remove visibility change listener
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }

  // Destroy Lenis instance
  if (lenisInstance) {
    try {
      lenisInstance.destroy();
      lenisInstance = null;
      window.lenis = null;
    } catch (error) {
      console.error('Error destroying Lenis:', error instanceof Error ? error.message : error);
    }
  }
}

// Initialize on import if window is available
if (typeof window !== 'undefined' && !window.lenis) {
  // Use setTimeout to avoid blocking the main thread on initial load
  setTimeout(() => {
    initLenis();
  }, 0);
}
