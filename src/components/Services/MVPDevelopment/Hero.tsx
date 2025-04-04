// src/components/Services/MVPDevelopment/Hero.tsx
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { cn } from '@/lib/utils';
import { Application } from '@splinetool/runtime';

export interface ServiceHeroProps {
  title: string;
  description: string;
  benefits: {
    title: string;
    description: string;
  }[];
  className?: string;
}

export default function Hero({
  title,
  description,
  benefits,
  className,
}: ServiceHeroProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const textSwitcherRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Rotating text for the MVP page
  const rotatingTexts = [
    'Product Validation',
    'Market Testing',
    'Startup Growth',
    'Investor Pitches',
  ];

  // Track component view
  useEffect(() => {
    trackEvent({
      name: 'mvp_hero_view',
      category: 'engagement',
      label: 'mvp_development_hero',
    });

    // Set loaded state after initial render for animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Check if device is mobile on mount and on resize
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return (): void => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [trackEvent]);

  // Initialize Spline 3D background
  useEffect(() => {
    // Performance optimization: Only load Spline if user doesn't prefer reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skip loading Spline for users who prefer reduced motion
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    if (!canvasRef.current) return;

    // Initialize Spline
    const canvas = canvasRef.current;

    // Create the application instance
    const app = new Application(canvas);
    appRef.current = app;

    // Set a timeout to cancel loading if it takes too long (3 seconds)
    const loadTimeout = setTimeout(() => {
      console.warn('Spline scene loading timed out after 3 seconds');
      setIsLoaded(true);
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    }, 3000);

    // Load the spline scene with a timeout to avoid blocking the main thread
    const initTimeout = setTimeout(() => {
      app
        .load('/models/titanium.splinecode')
        .then(() => {
          // Clear the timeout since loading succeeded
          clearTimeout(loadTimeout);

          setIsLoaded(true);

          // Optimize render loop - only render when necessary
          const renderLoop = (): void => {
            if (document.visibilityState === 'visible') {
              requestAnimationFrame(renderLoop);
            }
          };
          requestAnimationFrame(renderLoop);
        })
        .catch((error: unknown) => {
          console.error('Error loading Spline scene:', error);
          setIsLoaded(true); // Set as loaded even on error to avoid blocking UI
        });
    }, 100);

    // Cleanup function
    return (): void => {
      clearTimeout(initTimeout);
      clearTimeout(loadTimeout);
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  }, []);

  // Text rotation effect for subtitle
  useEffect(() => {
    // Define the rotation function
    const rotateText = (): void => {
      if (!textSwitcherRef.current) return;

      setIsAnimating(true);
      setTimeout(() => {
        setTextIndex(prevIndex => (prevIndex + 1) % rotatingTexts.length);

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
      const intervalId = setInterval(rotateText, 4000);

      // Cleanup interval in the effect's cleanup function
      return (): void => {
        clearInterval(intervalId);
      };
    }, 2000);

    // Return the cleanup function
    return (): void => {
      clearTimeout(initialDelay);
    };
  }, [rotatingTexts]);

  // Scroll to features section
  const scrollToFeatures = useCallback((): void => {
    const featuresSection = document.getElementById('service-features-section');
    if (featuresSection) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(featuresSection, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn('relative w-full min-h-screen overflow-hidden bg-black', className)}
      aria-label="MVP Development"
    >
      {/* Spline Background - Dynamically loaded */}
      <div className="absolute inset-0 w-full h-full z-0">
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000`}
          aria-hidden="true"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
        {!isLoaded && <div className="absolute inset-0 bg-black" aria-hidden="true" />}
      </div>

      {/* Static accent circles with reduced opacity for better visibility */}
      <div
        className="absolute opacity-30 rounded-full"
        style={{
          width: '500px',
          height: '500px',
          left: '15%',
          top: '30%',
          background:
            'radial-gradient(circle, rgba(238, 96, 156, 0.3) 0%, rgba(238, 96, 156, 0) 70%)',
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
            'radial-gradient(circle, rgba(28, 204, 158, 0.2) 0%, rgba(28, 204, 158, 0) 70%)',
          filter: 'blur(50px)',
          transform: 'translate(50%, 50%)',
        }}
        aria-hidden="true"
      />

      {/* Content container - improved responsiveness */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center py-16 md:py-0">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Main heading - render immediately */}
          <div className="flex justify-between items-start mb-8 md:mb-16 pt-4 md:pt-20">
            <div className="w-full max-w-6xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight tracking-tight">
                {title}
              </h1>

              {/* Subheading with highlighted text */}
              <div className="mt-4 md:mt-6 text-xl sm:text-2xl md:text-4xl font-normal">
                <span className="text-white">Perfect for </span>
                <span
                  ref={textSwitcherRef}
                  className={`text-pink-400 inline-block ${
                    isAnimating ? 'text-rotate-out' : 'text-rotate-in'
                  }`}
                >
                  {rotatingTexts[textIndex]}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 md:mt-10 max-w-3xl text-gray-300 text-sm md:text-md leading-relaxed">
                {description}
              </p>

              {/* CTA buttons - improved responsive layout */}
              <div className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-5">
                <TrackedButton
                  variant="default"
                  size={isMobile ? 'default' : 'lg'}
                  className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/20 group w-full sm:w-auto"
                  onClick={() => {
                    scrollToFeatures();
                  }}
                  trackingEvent={{
                    name: 'mvp_explore_button_click',
                    category: 'navigation',
                    label: 'mvp_explore_features',
                  }}
                >
                  <span className="flex items-center justify-center">
                    Explore Features
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                  </span>
                </TrackedButton>

                <Link href="/contact" className="w-full sm:w-auto">
                  <TrackedButton
                    variant="outline"
                    size={isMobile ? 'default' : 'lg'}
                    className="border-white text-white hover:bg-white/10 group w-full"
                    trackingEvent={{
                      name: 'mvp_contact_button_click',
                      category: 'conversion',
                      label: 'mvp_contact_button',
                    }}
                  >
                    <span className="flex items-center justify-center">
                      Talk to an Expert
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </TrackedButton>
                </Link>
              </div>
            </div>

            {/* Scroll indicator - only visible on desktop */}
            <div
              className="hidden md:flex items-center text-white cursor-pointer hover:text-white/90 transition-colors mt-4 md:mt-8"
              onClick={scrollToFeatures}
              role="button"
              tabIndex={0}
              aria-label="Scroll down to features"
              onKeyDown={(e): void => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToFeatures();
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

        {/* Benefits grid - improved responsive layout */}
        <div className="mt-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={cn(
                  'bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 transition-all duration-500',
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${String(index * 150)}ms` }}
              >
                <h3 className="text-white text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
