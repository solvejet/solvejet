// src/components/Services/CustomSoftwareDevelopment/Credentials.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

export interface CredentialBadge {
  id: string;
  name: string;
  imagePath: string;
  alt: string;
  link?: string;
  category: 'partner' | 'certification' | 'award';
}

interface CredentialsProps {
  className?: string;
}

export default function Credentials({ className }: CredentialsProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Static data directly in the component
  const title = 'World-Class Technology Credentials';
  const description =
    'At SolveJet, we maintain the highest industry standards through strategic partnerships and certifications. Our engineering team leverages these credentials to deliver enterprise-grade software solutions with advanced security protocols, cloud-native architecture, and scalable infrastructure that ensures your business critical applications perform flawlessly under any load conditions.';

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
      id: 'clutch-software',
      name: 'Clutch Top Software Development',
      imagePath: '/images/credentials/clutch-top-software.webp',
      alt: 'Top Software Developers by Clutch',
      category: 'award',
      link: 'https://clutch.co/profile/solvejet',
    },
    {
      id: 'goodfirms',
      name: 'Goodfirms Top Software',
      imagePath: '/images/credentials/goodfirms-top-software.webp',
      alt: 'Top Software Development Company by Goodfirms',
      category: 'award',
      link: 'https://www.goodfirms.co/company/solvejet',
    },
    {
      id: 'designrush',
      name: 'DesignRush Top Agency',
      imagePath: '/images/credentials/designrush-top-software.webp',
      alt: 'Top Software Development Company by DesignRush',
      category: 'award',
      link: 'https://www.designrush.com/agency/profile/solvejet',
    },
  ];

  // Track section view on mount and handle visibility
  useEffect(() => {
    // Track view event
    trackEvent({
      name: 'csd_credentials_view',
      category: 'engagement',
      label: 'custom_software_development_credentials',
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
      id="credentials-section"
      className={cn('py-24 bg-gray-50 dark:bg-gray-800', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          <h2
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 dark:text-white mb-6 transition-all duration-700 tracking-tight',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              'text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-4xl transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {description}
          </p>
        </div>

        {/* Simple badge grid - show 5 badges */}
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-5 transition-all duration-700 pt-8',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          {credentialBadges.map(badge => (
            <div
              key={badge.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                if (badge.link) {
                  trackEvent({
                    name: 'credential_badge_click',
                    category: 'engagement',
                    label: `credential_${badge.id}`,
                  });
                  window.open(badge.link, '_blank');
                }
              }}
            >
              <div className="h-24 flex items-center mb-4">
                <Image
                  src={badge.imagePath}
                  alt={badge.alt}
                  width={200}
                  height={100}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <span className="text-sm text-center text-gray-700 dark:text-gray-300">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
