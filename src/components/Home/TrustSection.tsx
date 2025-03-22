// src/components/Home/TrustSection.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { Award, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import Marquee from 'react-fast-marquee';

interface CredentialBadge {
  id: string;
  name: string;
  imagePath: string;
  alt: string;
  link?: string;
  category: 'partner' | 'certification' | 'award';
  description?: string;
}

interface TrustSectionProps {
  className?: string;
}

const TrustSection: React.FC<TrustSectionProps> = ({ className }) => {
  const { trackEvent } = useAnalytics();
  const [visibleCategory, setVisibleCategory] = useState<string>('all');
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Track section view on mount and handle visibility
  useEffect(() => {
    // Track view event
    trackEvent({
      name: 'trust_section_view',
      category: 'engagement',
      label: 'trust_section',
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

  // Track badge click
  const handleBadgeClick = useCallback(
    (badge: CredentialBadge): void => {
      trackEvent({
        name: 'credential_badge_click',
        category: 'engagement',
        label: `credential_${badge.id}`,
        properties: {
          badge_id: badge.id,
          badge_name: badge.name,
          badge_category: badge.category,
        },
      });
    },
    [trackEvent]
  );

  // Handle filter change
  const handleFilterChange = useCallback(
    (category: string): void => {
      setVisibleCategory(category);
      trackEvent({
        name: 'trust_section_filter',
        category: 'engagement',
        label: `filter_${category}`,
      });
    },
    [trackEvent]
  );

  // Credential badges with proper alt text for SEO and links
  const credentialBadges: CredentialBadge[] = [
    {
      id: 'gcp-partner',
      name: 'Google Cloud Partner',
      imagePath: '/images/credentials/google-cloud-partner.webp',
      alt: 'Google Cloud Partner Badge',
      category: 'partner',
      link: 'https://cloud.google.com/find-a-partner/partner/solvejet',
      description: 'Certified expertise in Google Cloud solutions and services',
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001:2022',
      imagePath: '/images/credentials/iso-27001-2022.webp',
      alt: 'ISO 27001:2022 Certification',
      category: 'certification',
      description: 'Internationally recognized information security management standard',
    },
    {
      id: 'designrush',
      name: 'DesignRush Top Software Development Company',
      imagePath: '/images/credentials/designrush-top-software.webp',
      alt: 'Top Software Development Company by DesignRush',
      category: 'award',
      link: 'https://www.designrush.com/agency/software-development',
      description: 'Recognized among the leading software development companies',
    },
    {
      id: 'goodfirms',
      name: 'Goodfirms Top Software Development Company',
      imagePath: '/images/credentials/goodfirms-top-software.webp',
      alt: 'Top Software Development Company by Goodfirms',
      category: 'award',
      link: 'https://www.goodfirms.co/company/solvejet',
      description: 'Rated as a top-tier software development company',
    },
    {
      id: 'clutch-software',
      name: 'Clutch Top Software Development Company',
      imagePath: '/images/credentials/clutch-top-software.webp',
      alt: 'Top Software Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
      description: 'Recognized for excellence in software development solutions',
    },
    {
      id: 'clutch-web',
      name: 'Clutch Top Web Development Company',
      imagePath: '/images/credentials/clutch-top-web.webp',
      alt: 'Top Web Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
      description: 'Leading web development company according to Clutch',
    },
    {
      id: 'clutch-app',
      name: 'Clutch Top App Development Company',
      imagePath: '/images/credentials/clutch-top-app.webp',
      alt: 'Top App Development Company by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
      description: 'Award-winning mobile app development services',
    },
    {
      id: 'clutch-flutter',
      name: 'Clutch Top Flutter Development Company',
      imagePath: '/images/credentials/clutch-top-flutter.webp',
      alt: 'Top Flutter Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
      description: 'Premier Flutter development expertise recognized by Clutch',
    },
    {
      id: 'clutch-vuejs',
      name: 'Clutch Top VueJs Development Company',
      imagePath: '/images/credentials/clutch-top-vuejs.webp',
      alt: 'Top VueJs Company by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
      description: 'Leading Vue.js development team according to Clutch',
    },
  ];

  // Filter badges by category
  const filteredBadges =
    visibleCategory === 'all'
      ? credentialBadges
      : credentialBadges.filter(badge => badge.category === visibleCategory);

  return (
    <section
      ref={sectionRef}
      id="trust-section"
      className={cn('py-24 bg-white dark:bg-gray-900', className)}
      aria-labelledby="trust-section-title"
    >
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Section Header - Consistent with other sections */}
        <div
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-md font-medium text-element-500 dark:text-element-400">
            Our Credentials
          </span>
          <h2
            id="trust-section-title"
            className="text-5xl font-semibold mt-2 mb-4 text-gray-900 dark:text-white"
          >
            Industry Recognition & Partners
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Our commitment to excellence has earned us recognition from leading industry authorities
            and platforms, validating our expertise and quality of service.
          </p>
        </div>

        {/* Filter tabs - simplified and consistent with Services design */}
        <div
          className={cn(
            'flex justify-center flex-wrap gap-3 mb-12 transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <button
            onClick={() => {
              handleFilterChange('all');
            }}
            className={cn(
              'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors',
              visibleCategory === 'all'
                ? 'bg-element-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            All Credentials
          </button>
          <button
            onClick={() => {
              handleFilterChange('partner');
            }}
            className={cn(
              'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center',
              visibleCategory === 'partner'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <ShieldCheck className="mr-1.5 h-4 w-4" /> Partners
          </button>
          <button
            onClick={() => {
              handleFilterChange('certification');
            }}
            className={cn(
              'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center',
              visibleCategory === 'certification'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <Award className="mr-1.5 h-4 w-4" /> Certifications
          </button>
          <button
            onClick={() => {
              handleFilterChange('award');
            }}
            className={cn(
              'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center',
              visibleCategory === 'award'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <Award className="mr-1.5 h-4 w-4" /> Awards
          </button>
        </div>

        {/* Credentials Grid - using similar card style to Services */}
        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {filteredBadges.map((badge, index) => (
            <div
              key={badge.id}
              className={cn(
                'bg-white dark:bg-gray-800 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out relative group cursor-pointer h-full shadow-sm hover:shadow-lg',
                hoveredBadge === badge.id ? 'transform -translate-y-2' : '',
                badge.category === 'partner'
                  ? 'border-l-4 border-green-500'
                  : badge.category === 'certification'
                  ? 'border-l-4 border-purple-500'
                  : 'border-l-4 border-amber-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                `transition-all duration-700 delay-${Math.min(300 + index * 75, 800).toString()}`
              )}
              onMouseEnter={() => {
                setHoveredBadge(badge.id);
              }}
              onMouseLeave={() => {
                setHoveredBadge(null);
              }}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Badge header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative mr-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center p-2">
                      <Image
                        src={badge.imagePath}
                        alt={badge.alt}
                        width={120}
                        height={120}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {badge.name}
                      </h3>
                      {badge.category === 'partner' && (
                        <span className="inline-flex items-center text-xs text-green-700 dark:text-green-400">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Official Partner
                        </span>
                      )}
                      {badge.category === 'certification' && (
                        <span className="inline-flex items-center text-xs text-purple-700 dark:text-purple-400">
                          <Award className="h-3 w-3 mr-1" /> Certification
                        </span>
                      )}
                      {badge.category === 'award' && (
                        <span className="inline-flex items-center text-xs text-amber-700 dark:text-amber-400">
                          <Award className="h-3 w-3 mr-1" /> Award
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow mb-6">
                  {badge.description}
                </p>

                {/* Button container - similar to ServiceSection hover experience */}
                <div
                  className={cn(
                    'mt-auto transition-all duration-500 ease-in-out',
                    hoveredBadge === badge.id
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-4'
                  )}
                >
                  {badge.link && (
                    <Link href={badge.link} target="_blank" rel="noopener noreferrer">
                      <TrackedButton
                        variant="default"
                        size="sm"
                        className="bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full px-6"
                        rightIcon={
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        }
                        onClick={() => {
                          handleBadgeClick(badge);
                        }}
                        trackingEvent={{
                          name: 'credential_badge_click',
                          category: 'engagement',
                          label: `credential_${badge.id}`,
                        }}
                      >
                        Learn More
                      </TrackedButton>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client logos section */}
        <div
          className={cn(
            'mt-16 transition-all duration-700 delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white inline-flex items-center">
              <Users className="h-6 w-6 mr-2 text-element-500" /> Trusted By Industry Leaders
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Our clients include leading companies across various industries
            </p>
          </div>

          {/* Client logos marquee */}
          <div className="relative overflow-hidden py-4 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-white before:to-transparent dark:before:from-gray-900 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-white after:to-transparent dark:after:from-gray-900">
            <Marquee speed={30} pauseOnHover={true} className="py-2" autoFill={true}>
              {[
                'kelsi_organics',
                'riya-logo',
                'logo',
                'tyent',
                'crafted',
                'little-india',
                'govoyages',
                'sporter',
              ].map((logo, index) => (
                <div
                  key={index}
                  className="mx-8 flex-shrink-0 p-4 flex items-center justify-center h-16 w-48"
                >
                  <Image
                    src={`/images/clients/${logo}.${
                      logo === 'little-india' || logo === 'sporter' ? 'svg' : 'webp'
                    }`}
                    alt={`Client logo ${String(index + 1)}`}
                    width={160}
                    height={80}
                    className={cn(
                      'max-w-full max-h-full object-contain',
                      logo !== 'sporter' ? 'filter dark:brightness-0 dark:invert' : ''
                    )}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
