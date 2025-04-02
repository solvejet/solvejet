// src/components/Home/TrustSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import Marquee from 'react-fast-marquee';

interface CredentialBadge {
  id: string;
  name: string;
  imagePath: string;
  alt: string;
  link?: string;
  category: 'partner' | 'certification' | 'award';
}

interface TrustSectionProps {
  className?: string;
}

const TrustSection: React.FC<TrustSectionProps> = ({ className }) => {
  const { trackEvent } = useAnalytics();
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

  // Credential badges with proper alt text for SEO and links
  const credentialBadges: CredentialBadge[] = [
    {
      id: 'gcp-partner',
      name: 'Google Cloud Partner',
      imagePath: '/images/credentials/google-cloud-partner.webp',
      alt: 'Google Cloud Partner Badge',
      category: 'partner',
      link: 'https://cloud.google.com/find-a-partner/partner/solvejet',
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001:2022',
      imagePath: '/images/credentials/iso-27001-2022.webp',
      alt: 'ISO 27001:2022 Certification',
      category: 'certification',
    },
    {
      id: 'designrush',
      name: 'DesignRush Top Software Development Company',
      imagePath: '/images/credentials/designrush-top-software.webp',
      alt: 'Top Software Development Company by DesignRush',
      category: 'award',
      link: 'https://www.designrush.com/agency/profile/solvejet',
    },
    {
      id: 'goodfirms',
      name: 'Goodfirms Top Software Development Company',
      imagePath: '/images/credentials/goodfirms-top-software.webp',
      alt: 'Top Software Development Company by Goodfirms',
      category: 'award',
      link: 'https://www.goodfirms.co/company/solvejet',
    },
    {
      id: 'clutch-software',
      name: 'Clutch Top Software Development Company',
      imagePath: '/images/credentials/clutch-top-software.webp',
      alt: 'Top Software Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
    },
    {
      id: 'clutch-web',
      name: 'Clutch Top Web Development Company',
      imagePath: '/images/credentials/clutch-top-web.webp',
      alt: 'Top Web Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
    },
    {
      id: 'clutch-app',
      name: 'Clutch Top App Development Company',
      imagePath: '/images/credentials/clutch-top-app.webp',
      alt: 'Top App Development Company by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
    },
    {
      id: 'clutch-flutter',
      name: 'Clutch Top Flutter Development Company',
      imagePath: '/images/credentials/clutch-top-flutter.webp',
      alt: 'Top Flutter Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
    },
    {
      id: 'clutch-vuejs',
      name: 'Clutch Top VueJs Development Company',
      imagePath: '/images/credentials/clutch-top-vuejs.webp',
      alt: 'Top VueJs Company by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
    },
    {
      id: 'techreviewer-solvejet',
      name: 'TechReviewer Top Software Development Company',
      imagePath: '/images/credentials/techreviewer_solvejet.webp',
      alt: 'Top Softwarer Developers by Tech Reviewer',
      category: 'award',
      link: 'https://techreviewer.co/companies/solvejet',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="trust-section"
      className={cn('py-16 bg-gray-50 dark:bg-gray-800', className)}
    >
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Section title aligned left like About Us section */}
        <div
          className={cn(
            'mb-8 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-md font-medium text-element-500 dark:text-element-400">
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mt-2 mb-4 text-gray-900 dark:text-white">
            Awards & Certifications
          </h2>
        </div>
      </div>

      {/* Full-width marquee - moved outside container div */}
      <div
        className={cn(
          'transition-all duration-700 w-full overflow-hidden',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Marquee
          speed={40}
          pauseOnHover={true}
          gradientWidth={100}
          gradientColor="#f9fafb" // Light gray color matching the bg-gray-50
          className="py-2"
        >
          {credentialBadges.map(badge => (
            <div key={badge.id} className="mx-3 flex-shrink-0 flex items-center justify-center">
              {badge.link ? (
                <Link
                  href={badge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent({
                      name: 'credential_badge_click',
                      category: 'engagement',
                      label: `credential_${badge.id}`,
                    });
                  }}
                >
                  <div className="p-4 hover:-translate-y-1 transition-all duration-300 h-40 w-44 flex items-center justify-center">
                    <Image
                      src={badge.imagePath}
                      alt={badge.alt}
                      width={140}
                      height={140}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </Link>
              ) : (
                <div className="p-4 transition-all duration-300 h-40 w-44 flex items-center justify-center">
                  <Image
                    src={badge.imagePath}
                    alt={badge.alt}
                    width={140}
                    height={140}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustSection;
