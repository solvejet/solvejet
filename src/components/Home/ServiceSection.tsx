// src/components/Home/ServiceSection.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import Link from 'next/link';
import { Image } from '@/components/ui/Image';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';

export interface Service {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  href: string;
  tags?: { text: string; className: string }[];
}

interface ServiceSectionProps {
  services: Service[];
  className?: string;
}

// Enhanced ServiceCard with updated design requirements
const ServiceCard: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { trackEvent } = useAnalytics();

  const handleServiceClick = (): void => {
    trackEvent({
      name: 'service_card_click',
      category: 'engagement',
      label: `service_${service.id}_click`,
      properties: {
        service_id: service.id,
        service_title: service.title,
      },
    });
  };

  return (
    <div
      id={`service-${service.id}`}
      onClick={handleServiceClick}
      className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden
        transition-all duration-500 ease-in-out relative group cursor-pointer h-full"
    >
      <div className="p-8 h-full flex flex-col lg:flex-row mt-2 mb-2">
        {/* Content side - vertically centered by default, moves to top on hover */}
        <div className="lg:w-3/5 h-full flex flex-col">
          {/* This wrapper maintains height and manages the vertical positioning */}
          <div
            className="h-full flex flex-col justify-center
            transition-all duration-500 ease-in-out transform group-hover:-translate-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-5">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {service.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-sm font-normal ${tag.className}`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>

          {/* Button container - hidden and slides up on hover */}
          <div
            className="mt-auto transition-all duration-500 ease-in-out transform translate-y-10 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100 absolute bottom-8 left-8"
          >
            <Link href={service.href}>
              <TrackedButton
                variant="default"
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full px-6"
                size="sm"
                rightIcon={
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
                trackingEvent={{
                  name: 'service_learn_more_click',
                  category: 'navigation',
                  label: `service_${service.id}_learn_more`,
                  properties: {
                    service_id: service.id,
                    service_title: service.title,
                  },
                }}
              >
                Let's chat
              </TrackedButton>
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="lg:w-2/5 relative flex items-center justify-center">
          <div className="w-full h-56 lg:h-full overflow-hidden rounded-xl">
            <Image
              src={service.iconPath}
              alt={service.title}
              width={400}
              height={300}
              className="w-full h-full object-contain scale-90 group-hover:scale-105
                transition-transform duration-700 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection: React.FC<ServiceSectionProps> = ({ services, className }) => {
  const { trackEvent } = useAnalytics();
  const sectionRef = useRef<HTMLElement>(null);

  // Track section view
  useEffect(() => {
    trackEvent({
      name: 'services_section_view',
      category: 'engagement',
      label: 'services_section',
      properties: {
        service_count: services.length,
        service_types: services.map(s => s.id).join(','),
      },
    });
  }, [services, trackEvent]);

  return (
    <section ref={sectionRef} className={cn('py-24 bg-[#F5F5FB] dark:bg-gray-900', className)}>
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="text-center mb-16">
          <span className="text-md font-medium text-element-500 dark:text-element-400">
            Our Expertise
          </span>
          <h2 className="text-5xl font-semibold mt-2 mb-4 text-gray-900 dark:text-white">
            Services We Offer
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            We deliver innovative, reliable, and scalable solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Call to action section with background image */}
        <div
          className="mt-16 rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/team-effort.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="max-w-2xl mx-auto text-gray-200 mb-8">
              Let's discuss how our expertise can help you achieve your goals. Schedule a free
              consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <TrackedButton
                  rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                  trackingEvent={{
                    name: 'request_consultation_click',
                    category: 'conversion',
                    label: 'consultation_request',
                  }}
                  className="bg-element-500 hover:bg-element-600 text-white"
                >
                  Schedule Consultation
                </TrackedButton>
              </Link>
              <Link href="/case-studies">
                <TrackedButton
                  variant="outline"
                  rightIcon={<ExternalLink className="ml-2 h-4 w-4" />}
                  trackingEvent={{
                    name: 'view_portfolio_click',
                    category: 'navigation',
                    label: 'portfolio_view',
                  }}
                  className="border-white text-white hover:bg-white/10"
                >
                  View Our Work
                </TrackedButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
