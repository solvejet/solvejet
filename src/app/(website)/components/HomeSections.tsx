// src/app/(website)/components/HomeSections.tsx
'use client';

import React, { Suspense, lazy } from 'react';
import {
  IndustriesGridSkeleton,
  ServiceSectionSkeleton,
  TrustSectionSkeleton,
  CaseStudySectionSkeleton,
  AboutUsSectionSkeleton,
} from '@/components/Home/skeletons';
import type { Industry, Service } from '@/data/home-page-data';
import type { CaseStudy } from '@/types/case-study';

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

interface CaseStudiesProps extends SectionProps {
  caseStudies: CaseStudy[];
}

// Create typesafe dynamic components with improved loading behavior
const AboutUsSection = lazy(() =>
  import('@/components/Home/AboutUsSection').then(mod => ({
    default: mod.default,
  }))
);

const IndustriesGrid = lazy(() =>
  import('@/components/Home/IndustriesGrid').then(mod => ({
    default: mod.default,
  }))
);

const ServiceSection = lazy(() =>
  import('@/components/Home/ServiceSection').then(mod => ({
    default: mod.default,
  }))
);

// Add the TrustSection component
const TrustSection = lazy(() =>
  import('@/components/Home/TrustSection').then(mod => ({
    default: mod.default,
  }))
);

// Add the CaseStudySection component
const CaseStudySection = lazy(() =>
  import('@/components/Home/CaseStudySection').then(mod => ({
    default: mod.default,
  }))
);

// TypeSafe section components
export function AboutSection({ id }: SectionProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<AboutUsSectionSkeleton />}>
        <AboutUsSection />
      </Suspense>
    </div>
  );
}

export function IndustriesSection({ industries }: IndustriesProps): React.JSX.Element {
  return (
    <Suspense fallback={<IndustriesGridSkeleton />}>
      <IndustriesGrid industries={industries} />
    </Suspense>
  );
}

export function ServicesSection({ services }: ServicesProps): React.JSX.Element {
  return (
    <Suspense fallback={<ServiceSectionSkeleton />}>
      <ServiceSection services={services} />
    </Suspense>
  );
}

export function TrustCredentialsSection({ id }: SectionProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<TrustSectionSkeleton />}>
        <TrustSection />
      </Suspense>
    </div>
  );
}

export function CaseStudiesSection({ caseStudies, id }: CaseStudiesProps): React.JSX.Element {
  return (
    <div id={id}>
      <Suspense fallback={<CaseStudySectionSkeleton />}>
        <CaseStudySection caseStudies={caseStudies} />
      </Suspense>
    </div>
  );
}

// Main component that renders all sections with improved loading priority
interface HomeSectionsProps {
  industries: Industry[];
  services: Service[];
  caseStudies: CaseStudy[];
}

export default function HomeSections({
  industries,
  services,
  caseStudies,
}: HomeSectionsProps): React.JSX.Element {
  return (
    <>
      {/* Each section is wrapped in Suspense with appropriate fallbacks */}
      <IndustriesSection id="industries-section" industries={industries} />
      <ServicesSection id="services-section" services={services} />
      <CaseStudiesSection id="case-studies-section" caseStudies={caseStudies} />
      <AboutSection id="about-us-section" />
      <TrustCredentialsSection id="trust-section" />
    </>
  );
}
