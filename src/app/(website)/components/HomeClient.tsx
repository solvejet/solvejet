// src/app/(website)/components/HomeClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

// Import HeroSection using dynamic import with SSR disabled
const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black flex items-center justify-center"></div>,
});

// Dynamically import other components for better performance
const IndustriesGrid = dynamic(() => import('@/components/Home/IndustriesGrid'), {
  ssr: true,
  loading: () => <div className="h-96 bg-white"></div>,
});

// Industry data
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show content after client-side mount
    setMounted(true);

    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) {
    // Return a simple placeholder while mounting
    return <div className="h-screen bg-black"></div>;
  }

  return (
    <>
      {/* Hero Section - Not using Suspense to prevent hydration mismatches */}
      <HeroSection />

      {/* Industries Section - Using Suspense for better loading */}
      <Suspense fallback={<div className="h-96 bg-white"></div>}>
        <IndustriesGrid industries={industries} />
      </Suspense>

      {/* Other sections can be added here */}
      {/* <FeaturesSection /> */}
      {/* <ServicesSection /> */}
    </>
  );
}
