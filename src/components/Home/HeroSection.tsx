// src/components/Home/HeroSection.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { Image } from '@/components/ui/Image';

// Define client logo type for better type safety
interface ClientLogo {
  path: string;
  alt: string;
  width: number;
  height: number;
}

// Simplified and optimized hero section
export default function HeroSection(): React.ReactElement {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rotatingTexts = [
    'Intelligent Solutions',
    'Enterprise Systems',
    'AI Technologies',
    'Scalable Products',
    'Digital Experiences',
  ];

  const { trackEvent } = useAnalytics();
  const textSwitcherRef = useRef<HTMLSpanElement>(null);

  // Define client logos with proper typing and explicit dimensions
  const clientLogos: ClientLogo[] = [
    {
      path: '/images/clients/kelsi_organics.webp',
      alt: 'Kelsi Organics Logo',
      width: 140,
      height: 70,
    },
    { path: '/images/clients/riya-logo.webp', alt: 'Riya Logo', width: 140, height: 70 },
    { path: '/images/clients/logo.webp', alt: '7Eventzz Logo', width: 140, height: 70 },
    { path: '/images/clients/tyent.webp', alt: 'Tyent Australia Logo', width: 140, height: 70 },
  ];

  // Simplified scroll function
  const scrollToContent = useCallback((): void => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    trackEvent({
      name: 'hero_scroll_click',
      category: 'navigation',
      label: 'scroll_to_content',
    });
  }, [trackEvent]);

  // Set up text rotation after component is mounted
  React.useEffect(() => {
    // Initial tracking
    const trackingTimer = setTimeout(() => {
      trackEvent({
        name: 'view_hero_section',
        category: 'engagement',
        label: 'hero_section_viewed',
      });
    }, 2000);

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only start text rotation if animations should be enabled
    if (!prefersReducedMotion) {
      const rotateText = (): void => {
        if (!textSwitcherRef.current) return;
        setIsAnimating(true);
        setTimeout(() => {
          setTextIndex(prevIndex => (prevIndex + 1) % rotatingTexts.length);
          setTimeout(() => {
            setIsAnimating(false);
          }, 50);
        }, 300);
      };

      // Set up the rotation with a delay to allow initial render
      const rotationTimer = setTimeout(() => {
        rotateText();
        const intervalId = setInterval(rotateText, 5000);
        return (): void => {
          clearInterval(intervalId);
        };
      }, 2000);

      return (): void => {
        clearTimeout(rotationTimer);
        clearTimeout(trackingTimer);
      };
    }

    return (): void => {
      clearTimeout(trackingTimer);
    };
  }, [rotatingTexts.length, trackEvent]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      aria-label="Hero section"
    >
      {/* Static background - pre-rendered */}
      <div className="absolute inset-0 bg-[rgba(17, 24, 39, 1) 60%)]" aria-hidden="true" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(35, 40, 50, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(35, 40, 50, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '-0.5px -0.5px',
        }}
        aria-hidden="true"
      />

      {/* Static accent circles */}
      <div
        className="absolute opacity-35 rounded-full"
        style={{
          width: '500px',
          height: '500px',
          left: '15%',
          top: '30%',
          background: 'radial-gradient(circle, rgba(0, 85, 184, 0.2) 0%, rgba(0, 85, 184, 0) 70%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute opacity-25 rounded-full"
        style={{
          width: '400px',
          height: '400px',
          right: '10%',
          bottom: '20%',
          background:
            'radial-gradient(circle, rgba(255, 204, 0, 0.15) 0%, rgba(255, 204, 0, 0) 70%)',
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
                  className={`text-yellow-500 inline-block min-w-48 ${
                    isAnimating ? 'text-rotate-out' : 'text-rotate-in'
                  }`}
                >
                  {rotatingTexts[textIndex]}
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

        {/* Critical LCP element - use simple, static content for fastest render */}
        <div className="absolute bottom-16 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-[95rem]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Paragraph content - this is the LCP element */}
            <p
              className="text-md/9 md:text-sm text-gray-300 max-w-lg md:max-w-3xl lg:max-w-4xl pr-4 leading-relaxed md:leading-loose"
              id="hero-description"
            >
              SolveJet pioneers technology solutions that transcend conventional boundaries. We
              leverage cutting-edge innovation to empower businesses with scalable, future-proof
              systems that drive growth and operational excellence in today's rapidly evolving
              digital landscape.
            </p>

            {/* Client logos section - load with low priority */}
            <div className="hidden md:flex items-center space-x-8">
              {clientLogos.map((logo, i) => (
                <div key={i} className="h-12 w-32 relative flex items-center justify-center">
                  <Image
                    src={logo.path}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-auto w-auto max-h-full max-w-full object-contain filter brightness-0 invert opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
