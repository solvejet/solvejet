// src/app/(website)/what-we-do/components/ServicesPageSections.tsx
'use client';

import React, { Suspense, lazy } from 'react';
import {
  ServiceHeroSectionSkeleton,
  ServiceCardsSectionSkeleton,
  ServiceProcessSectionSkeleton,
  ServiceCTASectionSkeleton,
  ServiceFAQSectionSkeleton,
} from '@/components/Services/skeletons';
import type { Service } from '@/data/home-page-data';

// Define proper interfaces for our components
interface SectionProps {
  id: string;
}

interface ServicesProps extends SectionProps {
  services: Service[];
}

// Create typesafe dynamic components with improved loading behavior
const ServiceHeroSection = lazy(() =>
  import('@/components/Services/ServiceHeroSection').then(mod => ({
    default: mod.default,
  }))
);

const ServiceCardsSection = lazy(() =>
  import('@/components/Services/ServiceCardsSection').then(mod => ({
    default: mod.default,
  }))
);

const ServiceProcessSection = lazy(() =>
  import('@/components/Services/ServiceProcessSection').then(mod => ({
    default: mod.default,
  }))
);

const ServiceCTASection = lazy(() =>
  import('@/components/Services/ServiceCTASection').then(mod => ({
    default: mod.default,
  }))
);

const ServiceFAQSection = lazy(() =>
  import('@/components/Services/ServiceFAQSection').then(mod => ({
    default: mod.default,
  }))
);

// TypeSafe section components
export function HeroSection({ id }: SectionProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<ServiceHeroSectionSkeleton />}>
        <ServiceHeroSection />
      </Suspense>
    </div>
  );
}

export function CardsSection({ services, id }: ServicesProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<ServiceCardsSectionSkeleton />}>
        <ServiceCardsSection services={services} />
      </Suspense>
    </div>
  );
}

export function ProcessSection({ id }: SectionProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<ServiceProcessSectionSkeleton />}>
        <ServiceProcessSection />
      </Suspense>
    </div>
  );
}

export function FAQSection({ id }: SectionProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<ServiceFAQSectionSkeleton />}>
        <ServiceFAQSection />
      </Suspense>
    </div>
  );
}

export function CTASection({ id }: SectionProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<ServiceCTASectionSkeleton />}>
        <ServiceCTASection />
      </Suspense>
    </div>
  );
}

// Main component that renders all sections with improved loading priority
interface ServicesPageSectionsProps {
  services: Service[];
}

export default function ServicesPageSections({
  services,
}: ServicesPageSectionsProps): React.JSX.Element {
  return (
    <>
      {/* Each section is wrapped in Suspense with appropriate fallbacks */}
      <HeroSection id="services-hero-section" />
      <CardsSection id="services-cards-section" services={services} />
      <ProcessSection id="services-process-section" />
      <FAQSection id="services-faq-section" />
      <CTASection id="services-cta-section" />
    </>
  );
}
