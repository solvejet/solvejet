// src/components/Services/ServiceHeroSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { cn } from '@/lib/utils';

interface ServiceHeroSectionProps {
  className?: string;
}

export default function ServiceHeroSection({
  className,
}: ServiceHeroSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Track component view
  useEffect(() => {
    trackEvent({
      name: 'services_hero_view',
      category: 'engagement',
      label: 'services_hero_section',
    });

    // Set loaded state after initial render
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, [trackEvent]);

  // Scroll to service cards section
  const scrollToServices = (): void => {
    const servicesSection = document.getElementById('services-cards-section');
    if (servicesSection) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(servicesSection, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative w-full min-h-[90vh] pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 overflow-hidden',
        className
      )}
    >
      {/* Background gradient elements */}
      <div
        className={cn(
          'absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-element-900/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          'absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 transition-opacity duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Animated background grid */}
      <div
        className={cn(
          'absolute inset-0 opacity-20 hero-grid transition-opacity duration-1000',
          isLoaded ? 'opacity-20' : 'opacity-0'
        )}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="container mx-auto px-4 max-w-[95rem] relative z-10 mt-10">
        <div className="max-w-5xl">
          {/* Subtitle */}
          <div
            className={cn(
              'inline-flex items-center px-4 py-2 rounded-full bg-element-900/40 border border-element-800/50 text-element-400 mb-6 transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="w-2 h-2 rounded-full bg-element-500 mr-2"></span>
            <span className="text-sm font-medium">Our Services & Expertise</span>
          </div>

          {/* Main heading with improved text */}
          <h1
            className={cn(
              'text-xl md:text-3xl lg:text-6xl/[4.2rem] font-normal text-white leading-tight mb-7 transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span>Architect </span>
            <span className="text-element-400">Digital</span>
            <span> Success</span>
            <br className="hidden md:block" />
            <span className="relative inline-block">
              Beyond <span className="text-yellow-500">Conventional</span> Limits
            </span>
          </h1>

          {/* Description with improved text */}
          <p
            className={cn(
              'text-l text-gray-300 mb-8 max-w-3xl transition-all duration-700 leading-relaxed',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            We don't just build software—we engineer future-proof digital ecosystems that transcend
            traditional boundaries. Our solutions blend technical precision with strategic vision to
            unlock unprecedented business capabilities.
          </p>

          {/* CTA buttons */}
          <div
            className={cn(
              'flex flex-wrap gap-4 transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <TrackedButton
              variant="default"
              size="lg"
              className="bg-element-500 hover:bg-element-600 text-white shadow-lg shadow-element-500/20 group relative overflow-hidden"
              onClick={() => {
                scrollToServices();
              }}
              trackingEvent={{
                name: 'services_explore_button_click',
                category: 'navigation',
                label: 'services_explore_button',
              }}
            >
              <span className="relative z-10 flex items-center">
                Explore Our Services
                <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-element-600 to-element-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </TrackedButton>

            <Link href="/contact">
              <TrackedButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 group relative overflow-hidden"
                trackingEvent={{
                  name: 'services_contact_button_click',
                  category: 'conversion',
                  label: 'services_contact_button',
                }}
              >
                <span className="relative z-10 flex items-center">
                  Talk to an Expert
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </TrackedButton>
            </Link>
          </div>
        </div>

        {/* Stats counter section with animation */}
        <div
          className={cn(
            'mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-element-900/10">
            <div className="text-4xl font-bold text-white mb-2 relative">
              <span className="relative z-10">15+</span>
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-element-500/20 rounded-full blur-xl"></span>
            </div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-element-900/10">
            <div className="text-4xl font-bold text-white mb-2 relative">
              <span className="relative z-10">200+</span>
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-element-500/20 rounded-full blur-xl"></span>
            </div>
            <div className="text-gray-400">Completed Projects</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-element-900/10">
            <div className="text-4xl font-bold text-white mb-2 relative">
              <span className="relative z-10">70+</span>
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-element-500/20 rounded-full blur-xl"></span>
            </div>
            <div className="text-gray-400">Tech Experts</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/40 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-element-900/10">
            <div className="text-4xl font-bold text-white mb-2 relative">
              <span className="relative z-10">98%</span>
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-element-500/20 rounded-full blur-xl"></span>
            </div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}
