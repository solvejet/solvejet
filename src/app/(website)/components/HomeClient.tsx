// src/app/(website)/components/HomeClient.tsx
'use client';

import React, { lazy, Suspense } from 'react';
import type { ReactElement } from 'react';
import HeroSection from '@/components/Home/HeroSection';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load non-critical components
const ServiceSection = lazy(() => import('@/components/Home/ServiceSection'));
const ClientsSection = lazy(() => import('@/components/Home/ClientsSection'));
const IndustriesGrid = lazy(() => import('@/components/Home/IndustriesGrid'));

// Industry and services data
const industries = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'PropTech solutions for the modern real estate industry',
    shortDescription:
      'Our innovative real estate solutions streamline property management, sales processes, and data analytics.',
    iconName: 'Building2',
    color: 'bg-blue-500',
    imagePath: '/images/industries/real-estate.webp',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Digital commerce solutions for global reach',
    shortDescription:
      'We build powerful, scalable ecommerce platforms with seamless payment and inventory integration.',
    iconName: 'ShoppingCart',
    color: 'bg-purple-500',
    imagePath: '/images/industries/ecommerce.webp',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Industry 4.0 and smart manufacturing',
    shortDescription:
      'Our Industry 4.0 solutions incorporate IoT, AI, and data analytics to optimize production.',
    iconName: 'Factory',
    color: 'bg-green-500',
    imagePath: '/images/industries/manufacturing.webp',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Supply chain and logistics optimization',
    shortDescription:
      'We develop comprehensive logistics management systems with real-time tracking.',
    iconName: 'Truck',
    color: 'bg-amber-500',
    imagePath: '/images/industries/logistics.webp',
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    description: 'Digital solutions for travel businesses',
    shortDescription:
      'Our travel industry solutions help agencies, hotels, and tour operators deliver exceptional experiences.',
    iconName: 'Plane',
    color: 'bg-teal-500',
    imagePath: '/images/industries/travel.webp',
  },
];

// Move services data to a separate file to reduce bundle size
import { services } from '@/data/services';

// Skeleton loaders for each section
const IndustriesGridSkeleton = (): ReactElement => (
  <div className="py-24 bg-white rounded-t-3xl">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
        <Skeleton className="h-12 w-48 mb-6 md:mb-0" />
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

const ServiceSectionSkeleton = (): ReactElement => (
  <div className="py-24 bg-[#F5F5FB]">
    <div className="container mx-auto px-4 max-w-[95rem]">
      <div className="text-center mb-16">
        <Skeleton className="h-6 w-32 mx-auto mb-4" />
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-8 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-64 w-full rounded-3xl" />
        ))}
      </div>
    </div>
  </div>
);

const ClientsSectionSkeleton = (): ReactElement => (
  <section className="py-16 bg-gray-900">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Skeleton className="h-6 w-32 bg-gray-700 mx-auto mb-4" />
        <Skeleton className="h-10 w-64 bg-gray-700 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 bg-gray-700 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div>
          <Skeleton className="h-8 w-48 bg-gray-700 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full bg-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-8 w-48 bg-gray-700 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-36 w-full bg-gray-700 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function HomeClient(): ReactElement {
  return (
    <>
      {/* Hero is not lazy loaded as it's critical for LCP */}
      <HeroSection />

      {/* Lazy load below-the-fold sections with suspense fallbacks */}
      <Suspense fallback={<IndustriesGridSkeleton />}>
        <IndustriesGrid industries={industries} />
      </Suspense>

      <Suspense fallback={<ServiceSectionSkeleton />}>
        <ServiceSection services={services} />
      </Suspense>

      <Suspense fallback={<ClientsSectionSkeleton />}>
        <ClientsSection />
      </Suspense>
    </>
  );
}
