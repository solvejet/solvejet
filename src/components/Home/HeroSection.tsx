// src/components/Home/HeroSection.tsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

// Define client logo type for better type safety
interface ClientLogo {
  path: string;
  alt: string;
  width: number;
  height: number;
}

export default function HeroSection(): React.ReactElement {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Define client logos with proper typing and explicit dimensions
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

  // Text rotation animation with 3D effect - only if reduced motion is not preferred
  // Memoize with useCallback to prevent unnecessary re-renders
  const rotateText = useCallback(() => {
    if (!textSwitcherRef.current) return;

    setIsAnimating(true);
    setTimeout(() => {
      setTextIndex(prevIndex => (prevIndex + 1) % rotatingTexts.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  }, [rotatingTexts.length]);

  // Initialize and handle animations
  useEffect(() => {
    // Wait for the component to be fully mounted before showing animations
    const initTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only setup rotation for non-reduced motion
    let intervalId: NodeJS.Timeout | undefined;
    if (!prefersReducedMotion) {
      // Start the text rotation after a delay to avoid conflicts with the initial animation
      intervalId = setInterval(rotateText, 5000);
    }

    // Track hero section view
    trackEvent({
      name: 'view_hero_section',
      category: 'engagement',
      label: 'hero_section_viewed',
    });

    return (): void => {
      clearTimeout(initTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [rotateText, trackEvent]);

  const scrollToContent = useCallback((): void => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

    // Track scroll interaction
    trackEvent({
      name: 'hero_scroll_click',
      category: 'navigation',
      label: 'scroll_to_content',
    });
  }, [trackEvent]);

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

      {/* Subtle diagonal lines with single unified animation */}
      <div
        className={`absolute top-[30%] left-0 w-full h-px transform rotate-[5deg] origin-left transition-opacity duration-1000 ${
          isLoaded ? 'opacity-15 animate-float-line' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 85, 184, 0.5), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Second diagonal line for layered effect */}
      <div
        className={`absolute top-[60%] left-0 w-full h-px transform -rotate-[2deg] origin-right transition-opacity duration-1000 delay-500 ${
          isLoaded ? 'opacity-10' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 85, 184, 0.3), transparent)',
          animation: isLoaded ? 'floatingLine 12s ease-in-out infinite reverse' : 'none',
          animationDelay: '2s',
        }}
        aria-hidden="true"
      />

      {/* Content container with pre-defined styles to avoid layout shifts */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 pt-16 md:pt-0">
          {/* Main heading with more space and scroll at far right */}
          <div className="flex justify-between items-start mb-12">
            <div className="w-full max-w-4xl mr-8">
              <h1
                className={`text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-tight tracking-tight whitespace-nowrap transition-opacity duration-700 ease-out ${
                  isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-4'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                Engineering Tomorrow
              </h1>

              {/* Subheading with highlighted text and animation */}
              <div
                className={`mt-4 text-2xl md:text-4xl font-normal transition-opacity duration-700 ease-out ${
                  isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="text-white">Crafting </span>
                <span
                  ref={textSwitcherRef}
                  className={`text-yellow-500 inline-block min-w-48 ${
                    isAnimating ? 'text-rotate-out' : 'text-rotate-in'
                  }`}
                  style={{
                    display: 'inline-block',
                    perspective: '1000px',
                  }}
                >
                  {rotatingTexts[textIndex]}
                </span>
              </div>
            </div>

            {/* Scroll indicator - only visible on desktop */}
            <div
              className={`hidden md:flex items-center text-white cursor-pointer hover:text-white/90 transition-colors mt-4 md:mt-8 transition-opacity duration-700 ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
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

        {/* Bottom section with paragraph and client logos */}
        <div className="absolute bottom-16 left-0 right-0 container mx-auto px-4 sm:px-6 max-w-[95rem]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            {/* Paragraph content with CSS transitions */}
            <p
              className={`text-md/8 md:text-sm text-gray-300 max-w-lg md:max-w-3xl lg:max-w-4xl pr-4 leading-relaxed md:leading-8 transition-opacity duration-700 ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              SolveJet pioneers technology solutions that transcend conventional boundaries. We
              leverage cutting-edge innovation to empower businesses with scalable, future-proof
              systems that drive growth and operational excellence in today's rapidly evolving
              digital landscape.
            </p>

            {/* Client logos section - with explicit dimensions and optimized for performance */}
            <div
              className={`hidden md:flex items-center space-x-6 transition-opacity duration-700 ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0 transform translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {clientLogos.map((logo, i) => (
                <div key={i} className="h-10 w-24 relative overflow-hidden">
                  <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-sm flex items-center justify-center p-1">
                    <Image
                      src={logo.path}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="h-full w-auto object-contain brightness-0 invert opacity-80"
                      priority={i < 2} // Prioritize loading first two images
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile marquee for logos - optimized with explicit dimensions */}
            <div
              className={`md:hidden w-full overflow-hidden transition-opacity duration-700 ease-out ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex space-x-6">
                {clientLogos.map((logo, i) => (
                  <div key={i} className="h-8 w-20 flex-shrink-0 relative overflow-hidden">
                    <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-sm flex items-center justify-center p-1">
                      <Image
                        src={logo.path}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="h-full w-auto object-contain brightness-0 invert opacity-80"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
