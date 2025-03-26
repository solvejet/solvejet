// src/components/Home/HeroSection.tsx
'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type { JSX } from 'react';
import { Application } from '@splinetool/runtime';

// Pre-define constants to avoid recreating objects on every render
const ROTATING_TEXTS = [
  'Intelligent Solutions',
  'Enterprise Systems',
  'AI Technologies',
  'Scalable Products',
  'Digital Experiences',
];

// Pre-defined client logos with proper dimensions
const CLIENT_LOGOS = [
  {
    path: '/images/clients/kelsi_organics.webp',
    alt: 'Kelsi Organics Logo',
    width: 120,
    height: 34,
  },
  {
    path: '/images/clients/riya-logo.webp',
    alt: 'Riya Logo',
    width: 120,
    height: 34,
  },
  {
    path: '/images/clients/logo.webp',
    alt: '7Eventzz Logo',
    width: 120,
    height: 34,
  },
  {
    path: '/images/clients/tyent.webp',
    alt: 'Tyent Australia Logo',
    width: 120,
    height: 34,
  },
];

// Optimized ClientLogos component
const ClientLogos = (): JSX.Element => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {CLIENT_LOGOS.map((logo, i) => (
        <div key={i} className="h-12 w-32 relative flex items-center justify-center">
          <Image
            src={logo.path}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-auto w-auto max-h-full max-w-full object-contain filter brightness-0 invert opacity-90"
            // Use eager loading for above-the-fold content
            loading="eager"
            priority={true}
          />
        </div>
      ))}
    </div>
  );
};

// Mobile client logos component with optimized images
const MobileClientLogos = (): JSX.Element => {
  return (
    <div className="flex md:hidden items-center justify-center space-x-4 mt-4">
      {CLIENT_LOGOS.map((logo, i) => (
        <div key={i} className="h-10 w-24 relative flex items-center justify-center">
          <Image
            src={logo.path}
            alt={logo.alt}
            width={logo.width / 1.2}
            height={logo.height / 1.2}
            className="h-auto w-auto max-h-full max-w-full object-contain filter brightness-0 invert opacity-90"
            // Use eager loading for above-the-fold content
            loading="eager"
            priority={true}
          />
        </div>
      ))}
    </div>
  );
};

// Spline background component with performance optimizations
const SplineBackground = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Performance optimization: Only load Spline if not in a mobile device
    // or if the user preference doesn't indicate reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile =
      typeof window !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Skip loading Spline for mobile devices or users who prefer reduced motion
    if (prefersReducedMotion || isMobile) {
      setIsLoaded(true);
      return;
    }

    if (!canvasRef.current) return;

    // Initialize Spline
    const canvas = canvasRef.current;

    // Create the application instance
    const app = new Application(canvas);
    appRef.current = app;

    // Load the spline scene with a timeout to avoid blocking the main thread for too long
    const timeout = setTimeout(() => {
      app
        .load('/models/titanium.splinecode')
        .then(() => {
          setIsLoaded(true);
          console.warn('Spline scene loaded successfully');

          // Optimize render loop - only render when necessary
          // Ensure the scene renders only when the document is visible
          const renderLoop = (): void => {
            if (document.visibilityState === 'visible') {
              // Spline handles rendering internally; no need to call app.render()
              requestAnimationFrame(renderLoop);
            }
          };
          requestAnimationFrame(renderLoop);
        })
        .catch((error: unknown) => {
          console.error('Error loading Spline scene:', error);
          setIsLoaded(true); // Set as loaded even on error to avoid blocking UI
        });
    }, 100); // Small delay to allow other critical elements to load first

    // Cleanup function
    return (): void => {
      clearTimeout(timeout);
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-1000`}
        aria-hidden="true"
        style={{
          willChange: 'transform', // GPU acceleration hint
          transform: 'translateZ(0)', // Force GPU rendering
        }}
      />
      {!isLoaded && <div className="absolute inset-0 bg-black" aria-hidden="true" />}
    </div>
  );
};

// Main component with optimizations to prevent disappearing
export default function HeroSection(): React.ReactElement {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const textSwitcherRef = useRef<HTMLSpanElement>(null);

  // Simplified scroll function using a dedicated ref to improve performance
  const scrollToContent = useCallback((): void => {
    // Check if window.lenis exists (from your implementation in src/lib/lenis.ts)
    if (typeof window !== 'undefined') {
      if (window.lenis) {
        // Use Lenis smooth scroll if available
        window.lenis.scrollTo(window.innerHeight, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
        });
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Optimized text rotation effect
  useEffect(() => {
    // Define the rotation function
    const rotateText = (): void => {
      if (!textSwitcherRef.current) return;

      setIsAnimating(true);
      setTimeout(() => {
        setTextIndex(prevIndex => (prevIndex + 1) % ROTATING_TEXTS.length);

        // Remove animation class after the state updates
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300);
    };

    // Start rotation after a delay to ensure component is fully mounted
    const initialDelay = setTimeout(() => {
      rotateText();

      // Set up interval for rotation
      const intervalId = setInterval(rotateText, 5000);

      // Cleanup interval in the effect's cleanup function
      return (): void => {
        clearInterval(intervalId);
      };
    }, 2000);

    // Return the cleanup function
    return (): void => {
      clearTimeout(initialDelay);
    };
  }, []); // Empty dependency array ensures this only runs once

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Spline Background - Dynamically loaded */}
      {typeof window !== 'undefined' && <SplineBackground />}

      {/* Static accent circles with reduced opacity for better visibility with Spline */}
      <div
        className="absolute opacity-30 rounded-full"
        style={{
          width: '500px',
          height: '500px',
          left: '15%',
          top: '30%',
          background: 'radial-gradient(circle, rgba(0, 85, 184, 0.3) 0%, rgba(0, 85, 184, 0) 70%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute opacity-20 rounded-full"
        style={{
          width: '400px',
          height: '400px',
          right: '10%',
          bottom: '20%',
          background:
            'radial-gradient(circle, rgba(255, 204, 0, 0.2) 0%, rgba(255, 204, 0, 0) 70%)',
          filter: 'blur(50px)',
          transform: 'translate(50%, 50%)',
        }}
        aria-hidden="true"
      />

      {/* Content container - no initial animations */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Main heading - render immediately */}
          <div className="flex justify-between items-start mb-12 pt-4 md:pt-16">
            <div className="w-full max-w-4xl mr-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight tracking-tight">
                Engineering Tomorrow
              </h1>

              {/* Subheading with highlighted text */}
              <div className="mt-4 text-2xl md:text-4xl font-normal">
                <span className="text-white">Crafting </span>
                <span
                  ref={textSwitcherRef}
                  className={`text-yellow-500 inline-block ${
                    isAnimating ? 'text-rotate-out' : 'text-rotate-in'
                  }`}
                >
                  {ROTATING_TEXTS[textIndex]}
                </span>
              </div>
            </div>

            {/* Scroll indicator - only visible on desktop */}
            <div
              className="hidden md:flex items-center text-white cursor-pointer hover:text-white/90 transition-colors mt-4 md:mt-8"
              onClick={scrollToContent}
              role="button"
              tabIndex={0}
              aria-label="Scroll down to content"
              onKeyDown={(e): void => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToContent();
                }
              }}
            >
              <div className="flex items-center">
                <span className="mr-2 border-b-2 border-white text-base md:text-base pb-1">
                  Scroll down
                </span>
                <ChevronDown className="h-6 w-6 animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero description - Critical LCP element - Preloaded */}
        <div className="absolute bottom-16 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-[95rem]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <p
              id="hero-description"
              className="text-gray-300 leading-relaxed md:leading-loose"
              data-lcp-element="true"
            >
              SolveJet pioneers technology solutions that transcend conventional boundaries. We
              leverage cutting-edge innovation to empower businesses with scalable, future-proof
              systems that drive growth and operational excellence in today's rapidly evolving
              digital landscape.
            </p>

            {/* Client logos - always render them for above-the-fold content */}
            <ClientLogos />

            {/* Mobile client logos */}
            <MobileClientLogos />
          </div>
        </div>
      </div>
    </section>
  );
}
