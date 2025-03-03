// src/components/Home/HeroSection.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import '@/styles/hero-animations.css';

export default function HeroSection(): React.ReactElement {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);

  // Animation sequence on mount
  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate elements in sequence
    tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo(
        subHeadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4' // Slight overlap with previous animation
      )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(clientsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2');

    // Clean up
    return (): void => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background gradient instead of the FluidBackgroundAnimation */}
      <div className="absolute inset-0 bg-gradient-to-br from-element-900 via-gray-900 to-black"></div>

      {/* Optional animated particles overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Add simple particle animation via CSS */}
          <div
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ top: '20%', left: '10%', animationDelay: '0s' }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{ top: '30%', left: '20%', animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-element-400 rounded-full animate-pulse"
            style={{ top: '15%', left: '50%', animationDelay: '1s' }}
          ></div>
          <div
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ top: '40%', left: '80%', animationDelay: '1.5s' }}
          ></div>
          <div
            className="absolute w-1 h-1 bg-element-500 rounded-full animate-pulse"
            style={{ top: '60%', left: '25%', animationDelay: '2s' }}
          ></div>
          <div
            className="absolute w-2 h-2 bg-blue-300 rounded-full animate-pulse"
            style={{ top: '70%', left: '60%', animationDelay: '2.5s' }}
          ></div>
        </div>
      </div>

      {/* Decorative accent line - similar to BlueSoft */}
      <div className="absolute top-[20%] right-[5%] w-[40%] h-[0.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60" />
      <div className="absolute bottom-[25%] left-[10%] w-[60%] h-[0.5px] bg-gradient-to-r from-blue-400 via-transparent to-transparent opacity-40" />

      {/* Content container positioned similarly to BlueSoft */}
      <div ref={contentRef} className="container relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Main heading - left aligned */}
          <h1
            ref={headingRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Experience the <br className="hidden sm:block" />
            Expertise
          </h1>

          {/* Subheading with highlighted text */}
          <div ref={subHeadingRef} className="mt-4 text-2xl md:text-3xl font-medium">
            <span className="text-white">Experience </span>
            <span className="text-yellow-500">Artificial Intelligence</span>
          </div>

          {/* Paragraph content - clean and simple */}
          <p
            ref={paragraphRef}
            className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl pr-4 leading-relaxed"
          >
            At SolveJet, we've been turning technology into business success stories since 2010.
            With a passion for innovation and a commitment to excellence, we create IT solutions
            that unlock new possibilities for our clients worldwide.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link href="/services" className="inline-block">
              <Button className="px-6 py-2.5 text-sm bg-yellow-500 hover:bg-yellow-400 text-black rounded-full flex items-center">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Client logos section - similar to BlueSoft */}
        <div
          ref={clientsRef}
          className="absolute bottom-16 left-0 right-0 flex justify-start max-w-7xl mx-auto px-4 overflow-hidden"
        >
          <div className="flex items-center gap-12 opacity-70">
            <div className="text-white text-xs uppercase tracking-widest hidden md:block">
              Trusted by:
            </div>
            <div className="flex space-x-8 items-center">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="h-8 w-16 md:h-10 md:w-24 bg-white/10 backdrop-blur-sm rounded-sm flex items-center justify-center"
                >
                  <div className="w-full h-full bg-gradient-to-r from-white/80 to-white/60 mask-client-logo" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex items-center text-white/70 text-sm">
          <span className="mr-2">Scroll down</span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            <path
              d="M8 2V22M8 22L14 16M8 22L2 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
