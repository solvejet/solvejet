// src/components/Services/ServiceCardsSection.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { Service } from '@/data/home-page-data';

interface ServiceCardsSectionProps {
  services: Service[];
  className?: string;
}

const ServiceCard: React.FC<{
  service: Service;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ service, index, isHovered, onMouseEnter, onMouseLeave }) => {
  const { trackEvent } = useAnalytics();

  const handleServiceClick = (): void => {
    trackEvent({
      name: 'service_card_click',
      category: 'engagement',
      label: `service_${service.id}_click`,
      properties: {
        service_id: service.id,
        service_title: service.title,
        position: index,
      },
    });
  };

  return (
    <div
      id={`service-${service.id}`}
      className="bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      tabIndex={0}
    >
      <div className="p-8 h-full flex flex-col">
        {/* Service header with icon and badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="h-16 w-16 bg-element-100 dark:bg-element-900/50 rounded-xl flex items-center justify-center p-3 text-element-600 dark:text-element-400">
            <Image
              src={service.iconPath}
              alt={`${service.title} icon`}
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
            />
          </div>

          {/* Service badge/tag */}
          {service.tags && service.tags.length > 0 && (
            <span className={cn('px-3 py-1 rounded-full text-sm', service.tags[0]?.className)}>
              {service.tags[0]?.text}
            </span>
          )}
        </div>

        {/* Service title and description */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {service.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{service.description}</p>

        {/* Service tags */}
        {service.tags && service.tags.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.slice(1).map((tag, idx) => (
              <span key={idx} className={cn('px-3 py-1 rounded-full text-sm', tag.className)}>
                {tag.text}
              </span>
            ))}
          </div>
        )}

        {/* Call to action button */}
        <div
          className={cn(
            'transform transition-all duration-500 ease-in-out',
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
          )}
        >
          <Link href={service.href}>
            <TrackedButton
              variant="default"
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white group"
              rightIcon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              }
              trackingEvent={{
                name: 'service_learn_more_click',
                category: 'navigation',
                label: `service_${service.id}_learn_more`,
                properties: {
                  service_id: service.id,
                  service_name: service.title,
                },
              }}
              onClick={handleServiceClick}
            >
              Learn More
            </TrackedButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function ServiceCardsSection({
  services,
  className,
}: ServiceCardsSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  // Track section view
  useEffect(() => {
    trackEvent({
      name: 'service_cards_section_view',
      category: 'engagement',
      label: 'service_cards_section',
      properties: {
        service_count: services.length,
      },
    });
  }, [services, trackEvent]);

  // Memoized hover handlers
  const createHoverHandler = useCallback(
    (serviceId: string, isEnter: boolean) => {
      return (): void => {
        setHoveredService(isEnter ? serviceId : null);

        // Only track hover events that last for meaningful engagement (300ms)
        if (isEnter) {
          const timer = setTimeout(() => {
            trackEvent({
              name: 'service_card_hover',
              category: 'engagement',
              label: `service_${serviceId}_hover`,
              properties: {
                service_id: serviceId,
              },
            });
          }, 300);

          setTimeout(() => {
            clearTimeout(timer);
          }, 310);
        }
      };
    },
    [trackEvent]
  );

  return (
    <section
      className={cn('py-24 bg-white dark:bg-gray-900', className)}
      id="services-cards-section"
    >
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-md font-medium text-element-500 dark:text-element-400 inline-block mb-2">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
            Comprehensive Technology Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            From custom software development to cloud migration and AI implementation, we offer
            end-to-end technology services tailored to your business needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredService === service.id}
              onMouseEnter={createHoverHandler(service.id, true)}
              onMouseLeave={createHoverHandler(service.id, false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
