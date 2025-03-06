// src/components/Home/ClientsSection.tsx
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import Marquee from 'react-fast-marquee';

// Define our clients data
const clients = [
  {
    name: 'Tyent Australia',
    logo: '/images/clients/tyent.webp',
  },
  {
    name: 'Kelsi Organics',
    logo: '/images/clients/kelsi_organics.webp',
  },
  {
    name: '7Eventzz',
    logo: '/images/clients/logo.webp',
  },
  {
    name: 'Riya Travel',
    logo: '/images/clients/riya-logo.webp',
  },
  {
    name: 'Little India',
    logo: '/images/clients/little-india.svg',
  },
  {
    name: 'Sporter',
    logo: '/images/clients/sporter.svg',
    noFilter: true, // Add noFilter flag for Sporter logo
  },
  {
    name: 'Crafted Elements',
    logo: '/images/clients/crafted.webp',
  },
  {
    name: 'Govoyage',
    logo: '/images/clients/govyages.webp',
  },
];

// Certification & Partnership data
const certifications = [
  {
    name: 'ISO Certified',
    logo: '/images/certifications/iso-certification.svg',
    description: 'Security Management System',
  },
  {
    name: 'Google Cloud Partner',
    logo: '/images/certifications/google-cloud-partner.svg',
    description: 'Certified Cloud Solutions Provider',
  },
  {
    name: 'Clutch',
    logo: '/images/certifications/clutch-reviews.svg',
    description: 'Top Rated Development Company',
  },
];

// Define marquee logos with noFilter flag where needed
const marqueeLogos = [
  { name: 'Tyent Australia', logo: '/images/clients/tyent.webp' },
  { name: 'Crafted Elements', logo: '/images/clients/crafted.webp' },
  { name: 'GoVoyages', logo: '/images/clients/govyages.webp' },
  { name: '7eventszz', logo: '/images/clients/logo.webp' },
  { name: 'Sporter', logo: '/images/clients/sporter.svg', noFilter: true },
  { name: 'Little India', logo: '/images/clients/little-india.svg' },
  { name: 'Kelsi Organics', logo: '/images/clients/kelsi_organics.webp' },
  { name: 'Numax India', logo: '/images/clients/Max-logo.png'},
];

interface ClientsSectionProps {
  className?: string;
}

export default function ClientsSection({ className }: ClientsSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  // Track section view
  useEffect((): void => {
    trackEvent({
      name: 'view_clients_section',
      category: 'engagement',
      label: 'clients_section',
    });
  }, [trackEvent]);

  return (
    <section
      className={cn(
        'relative bg-gradient-to-b from-gray-900 to-gray-950 py-16 overflow-hidden',
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-element-900/20 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-element-800/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-[95rem] relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-element-900/60 rounded-full text-element-400 text-sm font-medium mb-3">
            Our Network
          </span>
          <h2 className="text-3xl md:text-4xl text-white font-medium">
            Trusted by Leading Companies
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            We partner with industry leaders to deliver exceptional software solutions that drive
            growth and innovation.
          </p>
        </div>

        {/* Main content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Certifications - now as interactive cards */}
          <div className="lg:col-span-1">
            <h3 className="text-xl text-white font-medium mb-4 relative">
              <span className="relative z-10">Certifications</span>
              <span className="absolute bottom-0 left-0 h-1 w-12 bg-element-500 rounded-full"></span>
            </h3>

            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-element-900/20 hover:border-element-800/50"
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-element-900/0 via-element-900/5 to-element-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
                      <Image
                        src={cert.logo}
                        alt={cert.name}
                        width={cert.name === 'ISO Certified' ? 42 : 100}
                        height={cert.name === 'ISO Certified' ? 42 : 60}
                        className={cn(
                          'transition-transform duration-300 group-hover:scale-110 max-w-full max-h-12 ',
                          cert.name === 'ISO Certified' ? 'filter brightness-0 invert' : ''
                        )}
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-element-400 transition-colors duration-300">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-gray-400">{cert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Logo Grid - with hover effects */}
          <div className="lg:col-span-2">
            <h3 className="text-xl text-white font-medium mb-4 relative">
              <span className="relative z-10">Our Clients</span>
              <span className="absolute bottom-0 left-0 h-1 w-12 bg-element-500 rounded-full"></span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/30 border border-gray-800/50 rounded-xl p-6 h-36 flex items-center justify-center transition-all duration-300 hover:bg-gray-800/50 hover:border-gray-700 hover:shadow-lg hover:shadow-black/10"
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={160}
                    height={80}
                    className={cn(
                      'max-w-full max-h-16 object-contain transition-all duration-300 group-hover:opacity-100 group-hover:scale-110',
                      // Apply filter for certain logos but not for Sporter
                      client.noFilter ? '' : 'filter brightness-0 invert opacity-80'
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider with gradient effect */}
      <div className="relative">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      {/* Enhanced logo marquee using react-fast-marquee */}
      <div className="py-6">
        <Marquee speed={40} pauseOnHover={true} className="py-2" autoFill={true} loop={0}>
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-12 flex items-center justify-center group transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={logo.logo}
                alt={logo.name}
                width={120}
                height={100}
                className={cn(
                  'max-h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-100',
                  // Apply filter conditionally based on noFilter flag
                  logo.noFilter ? '' : 'filter brightness-0 invert opacity-70'
                )}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
