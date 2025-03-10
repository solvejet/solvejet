'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import {
  IndustriesGridSkeleton,
  ServiceSectionSkeleton,
  ClientsSectionSkeleton,
} from '@/components/Home/skeletons';
import type { ReactElement } from 'react';

// Dynamic imports with client-side rendering only
const IndustriesGrid = dynamic(() => import('@/components/Home/IndustriesGrid'), {
  ssr: false,
  loading: () => <IndustriesGridSkeleton />,
});

const ServiceSection = dynamic(() => import('@/components/Home/ServiceSection'), {
  ssr: false,
  loading: () => <ServiceSectionSkeleton />,
});

const ClientsSection = dynamic(() => import('@/components/Home/ClientsSection'), {
  ssr: false,
  loading: () => <ClientsSectionSkeleton />,
});

// Import types from data file
import type { Industry, Service } from '@/data/home-page-data';

interface HomeSectionsProps {
  industries: Industry[];
  services: Service[];
}

export default function HomeSections({ industries, services }: HomeSectionsProps): ReactElement {
  return (
    <>
      {/* Industries Section */}
      <div id="industries-section" className="section-placeholder"></div>
      <Suspense fallback={<IndustriesGridSkeleton />}>
        <IndustriesGrid industries={industries} />
      </Suspense>

      {/* Services Section */}
      <div id="services-section" className="section-placeholder"></div>
      <Suspense fallback={<ServiceSectionSkeleton />}>
        <ServiceSection services={services} />
      </Suspense>

      {/* Clients Section */}
      <div id="clients-section" className="section-placeholder"></div>
      <Suspense fallback={<ClientsSectionSkeleton />}>
        <ClientsSection />
      </Suspense>
    </>
  );
}
