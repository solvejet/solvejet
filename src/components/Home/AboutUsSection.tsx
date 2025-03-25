// src/components/Home/AboutUsSection.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { Users, Briefcase, Award, Code } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AboutUsSectionProps {
  className?: string;
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ className }) => {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Track view event
    trackEvent({
      name: 'about_section_view',
      category: 'engagement',
      label: 'about_section',
    });

    // Set up intersection observer for animation triggers
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [trackEvent]);

  return (
    <section
      ref={sectionRef}
      id="about-us-section"
      className={cn('py-24 bg-white dark:bg-gray-900', className)}
      aria-labelledby="about-us-section-title"
    >
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left section - Tagline and image */}
          <div
            className={cn(
              'transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {/* Tagline with highlight */}
            <h2
              id="about-us-section-title"
              className="text-4xl sm:text-6xl font-medium text-gray-900 dark:text-white mb-12"
            >
              <span className="text-element-500 block mb-2">Engineering</span>
              <span>Tomorrow, Today</span>
            </h2>

            {/* Image with enhanced styling */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-element-500 to-element-400 rounded-3xl blur-sm opacity-50"></div>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/team-collaboration.webp"
                  alt="SolveJet team collaborating"
                  width={600}
                  height={450}
                  className="object-cover w-full h-full rounded-3xl"
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/30 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right section - Content and stats */}
          <div
            className={cn(
              'flex flex-col space-y-16 transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {/* Content paragraph with enhanced styling */}
            <p className="text-md md:text-md text-gray-700 dark:text-gray-300 leading-relaxed">
              We're more than developers – we're problem solvers and visionaries committed to your
              success. Our team delivers cutting-edge solutions that optimize operations, enhance
              user experiences, and accelerate your business growth.
            </p>

            {/* Stats with enhanced UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Stat 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl font-bold text-element-500 dark:text-element-400">
                    50+
                  </span>
                  <div className="w-12 h-12 bg-element-100 dark:bg-element-900/50 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-element-600 dark:text-element-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Active Clients
                </h3>
              </div>

              {/* Stat 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl font-bold text-element-500 dark:text-element-400">
                    15+
                  </span>
                  <div className="w-12 h-12 bg-element-100 dark:bg-element-900/50 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-element-600 dark:text-element-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Years of Experience
                </h3>
              </div>

              {/* Stat 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl font-bold text-element-500 dark:text-element-400">
                    70+
                  </span>
                  <div className="w-12 h-12 bg-element-100 dark:bg-element-900/50 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-element-600 dark:text-element-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">IT Experts</h3>
              </div>

              {/* Stat 4 */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl font-bold text-element-500 dark:text-element-400">
                    200+
                  </span>
                  <div className="w-12 h-12 bg-element-100 dark:bg-element-900/50 rounded-full flex items-center justify-center">
                    <Code className="h-6 w-6 text-element-600 dark:text-element-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Technologies
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

/**
 * Skeleton loader for the About Us section
 */
export function AboutUsSectionSkeleton(): React.ReactElement {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Tagline and image skeleton */}
          <div>
            <Skeleton className="h-10 w-4/5 mb-2" />
            <Skeleton className="h-10 w-3/5 mb-12" />

            <div className="rounded-3xl overflow-hidden aspect-video">
              <Skeleton className="h-full w-full" />
            </div>
          </div>

          {/* Right column - Content and stats skeleton */}
          <div className="flex flex-col space-y-16">
            {/* Content paragraph skeleton */}
            <div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-4/5" />
            </div>

            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Skeleton className="h-10 w-20" />
                      <Skeleton className="h-12 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-32" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
