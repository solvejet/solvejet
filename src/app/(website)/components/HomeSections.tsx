'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import {
  IndustriesGridSkeleton,
  ServiceSectionSkeleton,
  ClientsSectionSkeleton,
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

const ClientsSection = dynamic(() => import('@/components/Home/ClientsSection'), {
  loading: () => <ClientsSectionSkeleton />,
  ssr: false,
});

// TypeSafe section components
export function IndustriesSection({ industries, id }: IndustriesProps): React.JSX.Element {
  return (
    <>
      <div id={id} className="section-placeholder" />
      <IndustriesGrid industries={industries} />
    </>
  );
}

export function ServicesSection({ services, id }: ServicesProps): React.JSX.Element {
  return (
    <>
      <div id={id} className="section-placeholder" />
      <ServiceSection services={services} />
    </>
  );
}

export function ClientsGridSection({ id }: SectionProps): React.JSX.Element {
  return (
    <>
      <div id={id} className="section-placeholder" />
      <ClientsSection />
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
      <ClientsGridSection id="clients-section" />
    </>
  );
}
