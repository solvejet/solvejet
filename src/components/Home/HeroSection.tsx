// src/components/Home/HeroSection.tsx
'use client';

import { useRef, useState, useCallback, memo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { Image } from '@/components/ui/Image';
import { gsap } from 'gsap';

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
  const gridBackgroundRef = useRef<HTMLDivElement>(null);
  const accentCircleRef = useRef<HTMLDivElement>(null);
  const accentCircle2Ref = useRef<HTMLDivElement>(null);

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

      // Professional grid background animation
      if (gridBackgroundRef.current) {
        gsap.fromTo(
          gridBackgroundRef.current,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
          }
        );
      }

      // Accent circle animations
      if (accentCircleRef.current) {
        gsap.fromTo(
          accentCircleRef.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 0.5,
            scale: 1,
            duration: 2.5,
            delay: 0.3,
            ease: 'power2.out',
          }
        );

        // Subtle pulsating effect
        gsap.to(accentCircleRef.current, {
          opacity: 0.35,
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Second accent circle with different timing
      if (accentCircle2Ref.current) {
        gsap.fromTo(
          accentCircle2Ref.current,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 0.35,
            scale: 1,
            duration: 2.5,
            delay: 0.6,
            ease: 'power2.out',
          }
        );

        // Different pulsating effect
        gsap.to(accentCircle2Ref.current, {
          opacity: 0.25,
          scale: 1.03,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
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

      // Clean up GSAP animations
      gsap.killTweensOf(gridBackgroundRef.current);
      gsap.killTweensOf(accentCircleRef.current);
      gsap.killTweensOf(accentCircle2Ref.current);
    };
  }, [rotatingTexts.length, trackEvent, animationsEnabled]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      aria-label="Hero section"
    >
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pre-rendered background to prevent layout shifts */}
      <div className="absolute inset-0 bg-[rgba(17, 24, 39, 1) 60%)]" aria-hidden="true" />

      {/* Modern, professional animated background elements */}
      {animationsEnabled && (
        <>
          {/* Professional grid background */}
          <div
            ref={gridBackgroundRef}
            className="absolute inset-0 opacity-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(35, 40, 50, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(35, 40, 50, 0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '-0.5px -0.5px',
            }}
            aria-hidden="true"
          />

          {/* Accent circle 1 - primary brand color */}
          <div
            ref={accentCircleRef}
            className="absolute opacity-0 rounded-full"
            style={{
              width: '500px',
              height: '500px',
              left: '15%',
              top: '30%',
              background:
                'radial-gradient(circle, rgba(0, 85, 184, 0.2) 0%, rgba(0, 85, 184, 0) 70%)',
              filter: 'blur(50px)',
              transform: 'translate(-50%, -50%)',
            }}
            aria-hidden="true"
          />

          {/* Accent circle 2 - secondary brand color */}
          <div
            ref={accentCircle2Ref}
            className="absolute opacity-0 rounded-full"
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
        </>
      )}

      {/* Content container with pre-defined styles - no initial transitions */}
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Main heading - render immediately without animations on initial load */}
          {/* Fixed padding-top on mobile and increased text size */}
          <div className="flex justify-between items-start mb-12 pt-4 md:pt-16">
            <div className="w-full max-w-4xl mr-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight tracking-tight">
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
            {/* Paragraph content with increased line height */}
            <p
              className="text-md/9 md:text-sm text-gray-300 max-w-lg md:max-w-3xl lg:max-w-4xl pr-4 leading-relaxed md:leading-loose"
              id="hero-description"
            >
              SolveJet pioneers technology solutions that transcend conventional boundaries. We
              leverage cutting-edge innovation to empower businesses with scalable, future-proof
              systems that drive growth and operational excellence in today's rapidly evolving
              digital landscape.
            </p>

            {/* Client logos section - load asynchronously, with increased size and improved visibility */}
            {animationsEnabled && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
