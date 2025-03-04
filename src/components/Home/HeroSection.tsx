// src/components/Home/HeroSection.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

// Define client logo type for better type safety
interface ClientLogo {
  path: string;
  alt: string;
}

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

  // For SEO optimization
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SolveJet',
    description: 'Custom software development and digital transformation solutions',
    url: 'https://solvejet.net',
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const diagonalLineRef = useRef<HTMLDivElement>(null);
  const textSwitcherRef = useRef<HTMLSpanElement>(null);

  // Define client logos with proper typing
  const clientLogos: ClientLogo[] = [
    { path: '/images/clients/kelsi_organics.webp', alt: 'Kelsi Organics Logo' },
    { path: '/images/clients/riya-logo.webp', alt: 'Riya Logo' },
    { path: '/images/clients/logo.webp', alt: '7Eventzz Logo' },
    { path: '/images/clients/tyent.webp', alt: 'Tyent Australia Logo' },
  ];

  // Text rotation animation with 3D effect
  useEffect((): (() => void) => {
    const interval = setInterval(() => {
      if (!textSwitcherRef.current) return;

      // Start rotation out animation
      setIsAnimating(true);

      // After animation out completes, change text and animate in
      setTimeout(() => {
        setTextIndex(prevIndex => (prevIndex + 1) % rotatingTexts.length);

        // Small delay before animating in
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 500);
    }, 5000);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  // Animation sequence on mount
  useEffect(() => {
    // Skip animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!contentRef.current || prefersReducedMotion) {
      // Make content visible immediately for users who prefer reduced motion
      if (
        prefersReducedMotion &&
        headingRef.current &&
        subHeadingRef.current &&
        paragraphRef.current &&
        clientsRef.current
      ) {
        gsap.set(
          [headingRef.current, subHeadingRef.current, paragraphRef.current, clientsRef.current],
          { opacity: 1, y: 0 }
        );
      }
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      // Delay animation start for better page load performance
      delay: 0.2,
    });

    // Animate elements in sequence with performance optimizations
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, clearProps: 'transform' }
    )
      .fromTo(
        subHeadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: 'transform' },
        '-=0.4'
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: 'transform' },
        '-=0.2'
      )
      .fromTo(clientsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2');

    // Animate diagonal line
    if (diagonalLineRef.current) {
      gsap.to(diagonalLineRef.current, {
        duration: 8,
        y: -15,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Clean up
    return (): void => {
      tl.kill();
    };
  }, []);

  const scrollToContent = (): void => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Enhanced background with animated gradient effect */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        {/* Primary gradient orb that slowly animates */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-element-900/20 blur-3xl rounded-l-full animate-pulse-slow"></div>

        {/* Secondary floating gradient elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/10 blur-3xl rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-800/10 blur-3xl rounded-full animate-float-reverse"></div>

        {/* Subtle overlay gradient for texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-90"></div>

        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-noise"></div>
      </div>

      {/* Animated diagonal line */}
      <div className="absolute bottom-[30%] w-full">
        <div
          ref={diagonalLineRef}
          className="w-full h-[1px] bg-element-500/30 transform rotate-[5deg] animate-float-line"
        ></div>
      </div>

      {/* Content container - aligned with header and optimized for all screen sizes */}
      <div
        ref={contentRef}
        className="container mx-auto px-4 sm:px-6 max-w-[95rem] relative z-10 h-full flex flex-col justify-center"
      >
        {/* Center Logo removed to avoid duplication with header */}

        <div className="max-w-7xl sm:ml-0 ml-0 fade-in pt-16 md:pt-0">
          {/* Main heading with more space and scroll at far right */}
          <div className="flex justify-between items-start mb-12">
            <div className="w-full max-w-4xl mr-8">
              <h1
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-7xl font-normal text-white leading-tight tracking-tight whitespace-nowrap"
              >
                Engineering Tomorrow
              </h1>

              {/* Subheading with highlighted text and animation */}
              <div ref={subHeadingRef} className="mt-4 text-2xl md:text-4xl font-normal">
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

            {/* Scroll indicator - positioned at far right, only visible on desktop */}
            <div
              className="hidden md:flex items-center text-white cursor-pointer hover:text-white/90 transition-colors mt-4 md:mt-8"
              onClick={scrollToContent}
              role="button"
              tabIndex={0}
              aria-label="Scroll down to content"
              onKeyDown={e => {
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
            {/* Paragraph content with more generous width and improved line height */}
            <p
              ref={paragraphRef}
              className="text-md/8 md:text-sm text-gray-300 max-w-lg md:max-w-3xl lg:max-w-4xl pr-4 leading-relaxed md:leading-8"
            >
              SolveJet pioneers technology solutions that transcend conventional boundaries. We
              leverage cutting-edge innovation to empower businesses with scalable, future-proof
              systems that drive growth and operational excellence in today's rapidly evolving
              digital landscape.
            </p>

            {/* Client logos section - marquee on mobile, static on desktop */}
            <div className="hidden md:flex items-center space-x-6" ref={clientsRef}>
              {clientLogos.map((logo, i) => (
                <div key={i} className="h-10 w-24 relative overflow-hidden">
                  <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-sm flex items-center justify-center p-1">
                    <Image
                      src={logo.path}
                      alt={logo.alt}
                      width={80}
                      height={30}
                      className="h-full w-auto object-contain brightness-0 invert opacity-80"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile marquee for logos */}
            <div className="md:hidden w-full overflow-hidden">
              <div className="animate-marquee flex space-x-6">
                {Array.from({ length: 8 }, (_, i) => {
                  // Ensure we have a valid index by using modulo
                  const logoIndex = i % clientLogos.length;

                  // We know this is safe because:
                  // 1. clientLogos is a non-empty array (defined above)
                  // 2. We're using modulo of the array length, so index is always valid
                  // 3. ESLint-friendly approach without non-null assertion
                  const logo = clientLogos[logoIndex];

                  // TypeScript should recognize logo is defined, but we can be extra safe
                  if (!logo) {
                    // This condition will never be true, but it satisfies TypeScript
                    return null;
                  }

                  return (
                    <div key={i} className="h-8 w-20 flex-shrink-0 relative overflow-hidden">
                      <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-sm flex items-center justify-center p-1">
                        <Image
                          src={logo.path}
                          alt={logo.alt}
                          width={64}
                          height={24}
                          className="h-full w-auto object-contain brightness-0 invert opacity-80"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
