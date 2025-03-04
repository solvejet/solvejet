// src/app/(website)/components/HomeClient.tsx
'use client';

import { useEffect } from 'react';
import FeaturesSection from '@/components/Home/FeaturesSection';
import HeroSection from '@/components/Home/HeroSection';
import IndustriesGrid from '@/components/Home/IndustriesGrid';
import ServicesSection from '@/components/Home/ServicesSection';
import type { ReactElement } from 'react';

// Industry data - limited to only the 5 requested industries
const industries = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'PropTech solutions for the modern real estate industry',
    shortDescription:
      'Our innovative real estate solutions streamline property management, sales processes, and data analytics for agencies and developers.',
    iconName: 'Building2',
    color: 'bg-blue-500',
    imagePath: '/images/industries/real-estate.webp',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Digital commerce solutions for global reach',
    shortDescription:
      'We build powerful, scalable ecommerce platforms that integrate seamlessly with payment gateways and inventory systems.',
    iconName: 'ShoppingCart',
    color: 'bg-purple-500',
    imagePath: '/images/industries/ecommerce.webp',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Industry 4.0 and smart manufacturing',
    shortDescription:
      'Our Industry 4.0 solutions incorporate IoT, AI, and data analytics to optimize production processes and reduce downtime.',
    iconName: 'Factory',
    color: 'bg-green-500',
    imagePath: '/images/industries/manufacturing.webp',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Supply chain and logistics optimization',
    shortDescription:
      'We develop comprehensive logistics management systems that provide real-time tracking and route optimization.',
    iconName: 'Truck',
    color: 'bg-amber-500',
    imagePath: '/images/industries/logistics.webp',
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    description: 'Digital solutions for travel businesses',
    shortDescription:
      'Our travel industry solutions help agencies, hotels, and tour operators deliver exceptional customer experiences.',
    iconName: 'Plane',
    color: 'bg-teal-500',
    imagePath: '/images/industries/travel.webp',
  },
];

export default function HomeClient(): ReactElement {
  useEffect((): (() => void) => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);

    // Return empty cleanup function to satisfy TypeScript
    return (): void => {
      // Empty cleanup function
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Industries Section - Now using the new grid component */}
      <IndustriesGrid industries={industries} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Services Section */}
      <ServicesSection />
    </>
  );
}
