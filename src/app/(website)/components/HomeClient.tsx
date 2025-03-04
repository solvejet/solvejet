// src/app/(website)/components/HomeClient.tsx
'use client';

import { useEffect, useState, memo } from 'react';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

// Import HeroSection with better loading strategy
const HeroSection = dynamic(() => import('@/components/Home/HeroSection'), {
  ssr: true, // Enable server-side rendering to improve initial render
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="w-32 h-8 bg-element-900/50 animate-pulse rounded"></div>
    </div>
  ),
});

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

// Lazy load the IndustriesGrid component
const IndustriesGrid = dynamic(
  () =>
    import('@/components/Home/IndustriesGrid').then(mod => ({
      default: memo(mod.default),
    })),
  {
    ssr: true,
    loading: () => (
      <div className="py-24 bg-white rounded-t-3xl">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
            <div className="h-12 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[1, 2].map(i => (
              <div key={i} className="aspect-[16/9] bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

function HomeClient(): ReactElement {
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
      {/* Hero Section */}
      <HeroSection />

      {/* Industries Section */}
      <IndustriesGrid industries={industries} />
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(HomeClient);
