// src/components/Home/HeroSection.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import FluidBackgroundAnimation from '@/components/animations/FluidBackgroundAnimation';
import { cn } from '@/lib/utils';
import type { JSX } from 'react';
import '@/styles/hero-animations.css';

export default function HeroSection(): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Animation sequence on mount
  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate elements in sequence with improved timing
    tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo(
        subHeadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5' // Slight overlap with previous animation
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        clientsRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.2'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 0.7, y: 0, duration: 0.5 },
        '-=0.5'
      );

    // Add scroll event listener to fade out elements as user scrolls down
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      const fadeStart = 100; // Start fading when scrolled 100px
      const fadeEnd = 500; // Complete fade by 500px
      const opacity = 1 - Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

      if (contentRef.current) {
        contentRef.current.style.opacity = opacity.toString();
        contentRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }

      // Hide scroll indicator immediately on scroll
      if (scrollIndicatorRef.current && scrollY > 50) {
        scrollIndicatorRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up
    return (): void => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fluid background animation */}
      <FluidBackgroundAnimation primaryColor="#0055B8" secondaryColor="#000000" speed={0.15} />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />

      {/* Decorative accent lines */}
      <div className="absolute top-[20%] right-[5%] w-[40%] h-[0.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-float-line" />
      <div
        className="absolute bottom-[25%] left-[10%] w-[60%] h-[0.5px] bg-gradient-to-r from-blue-400 via-transparent to-transparent opacity-40 animate-float-line"
        style={{ animationDelay: '1s' }}
      />

      {/* Content container */}
      <div
        ref={contentRef}
        className="container relative z-10 h-full flex flex-col justify-center transition-transform duration-1000 ease-out"
      >
        <div className="max-w-3xl">
          {/* Main heading - left aligned */}
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Experience the <br className="hidden sm:block" />
            <span className="text-gradient">Expertise</span>
          </h1>

          {/* Subheading with highlighted text */}
          <div ref={subHeadingRef} className="mt-4 text-2xl md:text-3xl font-medium">
            <span className="text-white">Experience </span>
            <span className="text-yellow-500 glow-text">Artificial Intelligence</span>
          </div>

          {/* Paragraph content */}
          <p
            ref={paragraphRef}
            className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl pr-4 leading-relaxed"
          >
            At SolveJet, we've been turning technology into business success stories since 2010.
            With a passion for innovation and a commitment to excellence, we create IT solutions
            that unlock new possibilities for our clients worldwide.
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="mt-8">
            <Link href="/services" className="inline-block">
              <Button
                className={cn(
                  'px-7 py-3 text-base bg-yellow-500 hover:bg-yellow-400 text-black',
                  'rounded-full transition-all duration-300 transform hover:scale-105',
                  'shadow-lg hover:shadow-yellow-500/30 focus:ring-2 focus:ring-yellow-300'
                )}
                rightIcon={
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                }
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Client logos section */}
        <div
          ref={clientsRef}
          className="absolute bottom-16 left-0 right-0 flex justify-start max-w-7xl mx-auto px-4 overflow-hidden"
        >
          <div className="flex items-center gap-12 opacity-70 hover:opacity-90 transition-opacity duration-300">
            <div className="text-white text-xs uppercase tracking-widest hidden md:block">
              Trusted by:
            </div>
            <div className="flex space-x-8 items-center">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={cn(
                    'h-8 w-16 md:h-10 md:w-24 bg-white/10 backdrop-blur-sm rounded-md',
                    'flex items-center justify-center hover:bg-white/15 transition-all duration-300',
                    'transform hover:-translate-y-1'
                  )}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-white/80 to-white/60 mask-client-logo" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 text-sm animate-pulse cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <span className="mb-2">Scroll down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
