// src/components/Home/HeroSection.tsx
'use client';

import { useRef, useState, useCallback, memo, useEffect } from 'react';
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

// Use memo to prevent unnecessary re-renders
const HeroSection = memo(function HeroSection(): React.ReactElement {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Remove animation state that delays critical content
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const rotatingTexts = [
    'Intelligent Solutions',
    'Enterprise Systems',
    'AI Technologies',
    'Scalable Products',
    'Digital Experiences',
  ];

  const { trackEvent } = useAnalytics();

  // For SEO optimization
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SolveJet',
    description: 'Custom software development and digital transformation solutions',
    url: 'https://solvejet.net',
  };

  const textSwitcherRef = useRef<HTMLSpanElement>(null);

  // Define client logos with proper typing and explicit dimensions - reduced number and simplified
  const clientLogos: ClientLogo[] = [
    {
      path: '/images/clients/kelsi_organics.webp',
      alt: 'Kelsi Organics Logo',
      width: 80,
      height: 30,
    },
    { path: '/images/clients/riya-logo.webp', alt: 'Riya Logo', width: 80, height: 30 },
    { path: '/images/clients/logo.webp', alt: '7Eventzz Logo', width: 80, height: 30 },
    { path: '/images/clients/tyent.webp', alt: 'Tyent Australia Logo', width: 80, height: 30 },
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

  useEffect(() => {
    // Enable animations only after critical content is rendered
    const animationTimer = setTimeout(() => {
      setAnimationsEnabled(true);
    }, 100);

    // Only setup rotation for non-reduced motion and after initial render
    let rotationTimer: ReturnType<typeof setTimeout> | undefined;

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

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only start text rotation after initial render and if animations enabled
    if (!prefersReducedMotion && animationsEnabled) {
      rotationTimer = setTimeout(() => {
        rotateText();
        // Set up the interval only after the first rotation
        const intervalId = setInterval(rotateText, 5000);
        return (): void => {
          clearInterval(intervalId);
        };
      }, 2000);
    }

    // Track hero section view with a small delay to prioritize rendering
    const trackingTimer = setTimeout(() => {
      trackEvent({
        name: 'view_hero_section',
        category: 'engagement',
        label: 'hero_section_viewed',
      });
    }, 2000); // Delay tracking even further

    return (): void => {
      clearTimeout(animationTimer);
      clearTimeout(trackingTimer);
      if (rotationTimer) clearTimeout(rotationTimer);
    };
  }, [rotatingTexts.length, trackEvent, animationsEnabled]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pre-rendered background to prevent layout shifts */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage:
            'radial-gradient(circle at 70% 30%, rgba(0, 85, 184, 0.15) 0%, rgba(0, 0, 0, 1) 60%)',
        }}
        aria-hidden="true"
      />

      {/* Reduced number of decorative elements - only show when animations are enabled */}
      {animationsEnabled && (
        <div
          className="absolute top-[40%] left-0 w-full h-px transform rotate-[5deg] origin-left opacity-15"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 85, 184, 0.5), transparent)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Content container with pre-defined styles - no initial transitions */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 pt-16 md:pt-0">
          {/* Main heading - render immediately without animations on initial load */}
          <div className="flex justify-between items-start mb-12">
            <div className="w-full max-w-4xl mr-8">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-tight tracking-tight">
                Engineering Tomorrow
              </h1>

              {/* Subheading with highlighted text - no animations on initial load */}
              <div className="mt-4 text-2xl md:text-4xl font-normal">
                <span className="text-white">Crafting </span>
                <span
                  ref={textSwitcherRef}
                  className={`text-yellow-500 inline-block min-w-48 ${
                    animationsEnabled && isAnimating ? 'text-rotate-out' : 'text-rotate-in'
                  }`}
                  style={{
                    display: 'inline-block',
                    perspective: animationsEnabled ? '1000px' : 'none',
                  }}
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

        {/* Bottom section with paragraph and client logos - critical LCP element */}
        <div className="absolute bottom-16 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-[95rem]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Paragraph content - CRITICAL LCP ELEMENT - NO ANIMATIONS INITIALLY */}
            <p
              className="text-md/8 md:text-sm text-gray-300 max-w-lg md:max-w-3xl lg:max-w-4xl pr-4 leading-relaxed md:leading-8"
              id="hero-description"
            >
              SolveJet pioneers technology solutions that transcend conventional boundaries. We
              leverage cutting-edge innovation to empower businesses with scalable, future-proof
              systems that drive growth and operational excellence in today's rapidly evolving
              digital landscape.
            </p>

            {/* Client logos section - load asynchronously */}
            {animationsEnabled && (
              <div className="hidden md:flex items-center space-x-6">
                {clientLogos.map((logo, i) => (
                  <div key={i} className="h-10 w-24 relative overflow-hidden">
                    <Image
                      src={logo.path}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="h-full w-auto object-contain filter brightness-0 invert opacity-80"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
