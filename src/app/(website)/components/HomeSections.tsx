'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  IndustriesGridSkeleton,
  ServiceSectionSkeleton,
  TrustSectionSkeleton,
} from '@/components/Home/skeletons';
import type { Industry, Service } from '@/data/home-page-data';

// Define proper interfaces for our components
interface SectionProps {
  id: string;
}

interface IndustriesProps extends SectionProps {
  industries: Industry[];
}

interface ServicesProps extends SectionProps {
  services: Service[];
}

// Create typesafe dynamic components
const IndustriesGrid = dynamic(() => import('@/components/Home/IndustriesGrid'), {
  loading: () => <IndustriesGridSkeleton />,
  ssr: false,
});

const ServiceSection = dynamic(() => import('@/components/Home/ServiceSection'), {
  loading: () => <ServiceSectionSkeleton />,
  ssr: false,
});

// Add the new TrustSection component
const TrustSection = dynamic(() => import('@/components/Home/TrustSection'), {
  loading: () => <TrustSectionSkeleton />,
  ssr: false,
});

// TypeSafe section components
export function IndustriesSection({ industries }: IndustriesProps): React.JSX.Element {
  return (
    <>
      <IndustriesGrid industries={industries} />
    </>
  );
}

export function ServicesSection({ services }: ServicesProps): React.JSX.Element {
  return (
    <>
      <ServiceSection services={services} />
    </>
  );
}

export function TrustCredentialsSection({ id }: SectionProps): React.JSX.Element {
  return (
    <>
      <div id={id}>
        <TrustSection />
      </div>
    </>
  );
}

// Main component that renders all sections
interface HomeSectionsProps {
  industries: Industry[];
  services: Service[];
}

export default function HomeSections({
  industries,
  services,
}: HomeSectionsProps): React.JSX.Element {
  return (
    <>
      <IndustriesSection id="industries-section" industries={industries} />
      <ServicesSection id="services-section" services={services} />
      <TrustCredentialsSection id="trust-section" />
    </>
  );
}
