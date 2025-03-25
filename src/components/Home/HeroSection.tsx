// src/components/Home/HeroSection.tsx
'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import type { JSX } from 'react';
import dynamic from 'next/dynamic';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import Spline from '@splinetool/react-spline';

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

// Use dynamic import for Spline to avoid blocking the main thread
const DynamicSpline = dynamic(() => Promise.resolve(Spline), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="text-white text-opacity-50">Loading 3D scene...</div>
    </div>
  ),
});

// Memoized ClientLogos component
const ClientLogos = React.memo((): JSX.Element => {
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
            loading="eager"
            priority={true}
          />
        </div>
      ))}
    </div>
  );
});
ClientLogos.displayName = 'ClientLogos';

// Memoized MobileClientLogos component
const MobileClientLogos = React.memo((): JSX.Element => {
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
            loading="eager"
            priority={true}
          />
        </div>
      ))}
    </div>
  );
});
MobileClientLogos.displayName = 'MobileClientLogos';

// Background component separated for better performance
const BackgroundScene = React.memo(
  ({ splineFilePath }: { splineFilePath: string }): JSX.Element => {
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [isSplineVisible, setIsSplineVisible] = useState(false);
    const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
    const { trackEvent } = useAnalytics();

    // Deferred loading of Spline
    useEffect((): (() => void) => {
      // First, check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // If user prefers reduced motion, don't load Spline at all
      if (prefersReducedMotion) {
        return (): void => {
          /* empty cleanup */
        };
      }

      // Otherwise, defer loading until after main content renders
      const timer = setTimeout(() => {
        setShouldLoadSpline(true);
      }, 1000); // 1 second delay

      return (): void => {
        clearTimeout(timer);
      };
    }, []);

    // Track load event
    useEffect((): (() => void) => {
      if (isSplineLoaded) {
        trackEvent({
          name: 'spline_3d_loaded',
          category: 'performance',
          label: 'hero_3d_scene',
        });

        // Wait a bit then show the 3D scene with a fade-in
        const showTimer = setTimeout(() => {
          setIsSplineVisible(true);
        }, 500);

        return (): void => {
          clearTimeout(showTimer);
        };
      }
      return (): void => {
        /* empty cleanup */
      };
    }, [isSplineLoaded, trackEvent]);

    return (
      <div className="absolute inset-0 w-full h-full z-0 bg-black" aria-hidden="true">
        {/* Add a static background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
          aria-hidden="true"
        />

        {/* Only render Spline when shouldLoadSpline is true */}
        {shouldLoadSpline && (
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: isSplineVisible ? 1 : 0, // Use isSplineVisible
              transition: 'opacity 1s ease-in-out',
            }}
          >
            <DynamicSpline
              scene={splineFilePath}
              onLoad={() => {
                setIsSplineLoaded(true);
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
BackgroundScene.displayName = 'BackgroundScene';

export default function HeroSection(): React.ReactElement {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const textSwitcherRef = useRef<HTMLSpanElement>(null);
  const { trackEvent } = useAnalytics();

  // Path to your local Spline file
  const splineFilePath = '/models/titanium.spline';

  // Simplified scroll function
  const scrollToContent = useCallback((): void => {
    if (typeof window !== 'undefined') {
      if (window.lenis) {
        window.lenis.scrollTo(window.innerHeight, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // Text rotation effect - fixing visibility issues
  useEffect((): (() => void) => {
    // Skip if in SSR
    if (typeof window === 'undefined') {
      return (): void => {
        /* empty cleanup */
      };
    }

    const timeouts: NodeJS.Timeout[] = [];
    let rotationInterval: NodeJS.Timeout | null = null;
    let mounted = true;

    const safeSetTimeout = (callback: () => void, delay: number): NodeJS.Timeout => {
      const id = setTimeout(callback, delay);
      timeouts.push(id);
      return id;
    };

    // Function to perform one rotation cycle
    const rotateText = (): void => {
      if (!mounted) return;

      // Step 1: Start fade out animation
      setIsAnimating(true);

      // Step 2: After fade out animation completes, change the text content
      safeSetTimeout(() => {
        if (!mounted) return;

        // Update to the next text index
        setTextIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % ROTATING_TEXTS.length;

          return nextIndex;
        });

        // Step 3: After changing text content, start fade in animation
        safeSetTimeout(() => {
          if (!mounted) return;
          setIsAnimating(false);

          // Track for analytics
          trackEvent({
            name: 'rotating_text_changed',
            category: 'ui_interaction',
            label: `text_${String(textIndex)}`,
          });
        }, 50);
      }, 300);
    };

    // Delay the start of rotation by 2 seconds
    safeSetTimeout(() => {
      if (!mounted) return;

      // Perform first rotation after delay
      rotateText();

      // Then set up interval for subsequent rotations
      rotationInterval = setInterval(rotateText, 5000);
    }, 2000);

    // Clean up function
    return (): void => {
      mounted = false;
      timeouts.forEach(clearTimeout);
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [trackEvent]); // Remove textIndex from dependencies to avoid re-creating effect

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Spline background */}
      <BackgroundScene splineFilePath={splineFilePath} />

      {/* Static accent circles */}
      <div
        className="absolute opacity-40 rounded-full"
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
        className="absolute opacity-30 rounded-full"
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

      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Main heading */}
          <div className="flex justify-between items-start mb-12 pt-4 md:pt-16">
            <div className="w-full max-w-4xl mr-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight tracking-tight">
                Engineering Tomorrow
              </h1>
              {/* Subheading with rotating text */}
              <div className="mt-4 text-2xl md:text-4xl font-normal">
                <span className="text-white">Crafting </span>
                <span
                  ref={textSwitcherRef}
                  className={`text-yellow-500 inline-block transition-opacity duration-300 ease-in-out ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  }`}
                  aria-live="polite"
                >
                  {ROTATING_TEXTS[textIndex]}
                </span>
              </div>
            </div>

            {/* Scroll indicator */}
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

        {/* Hero description and client logos */}
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
            {/* Client logos */}
            <ClientLogos />
            {/* Mobile client logos */}
            <MobileClientLogos />
          </div>
        </div>
      </div>
    </section>
  );
}
