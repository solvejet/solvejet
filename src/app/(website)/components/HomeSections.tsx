// src/app/(website)/components/HomeSections.tsx
'use client';

import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  IndustriesGridSkeleton,
  ServiceSectionSkeleton,
  TrustSectionSkeleton,
  CaseStudySectionSkeleton,
  AboutUsSectionSkeleton,
} from '@/components/Home/skeletons';
import type { Industry, Service } from '@/data/home-page-data';
import type { CaseStudy } from '@/types/case-study';
import type { JSX } from 'react';

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

// Component to handle visibility-based loading
const VisibilitySensor = ({
  children,
  placeholder,
  rootMargin = '200px',
}: {
  children: React.ReactNode;
  placeholder: React.ReactNode;
  rootMargin?: string;
}): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01, // Only need minimal visibility to start loading
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className="min-h-[100px]">
      {isVisible ? children : placeholder}
    </div>
  );
};

// TypeSafe section components
function AboutSection({ id }: SectionProps): JSX.Element {
  return (
    <div id={id}>
      <VisibilitySensor placeholder={<AboutUsSectionSkeleton />}>
        <Suspense fallback={<AboutUsSectionSkeleton />}>
          <AboutUsSection />
        </Suspense>
      </VisibilitySensor>
    </div>
  );
}

function IndustriesSection({ industries, id }: IndustriesProps): JSX.Element {
  return (
    <div id={id}>
      <VisibilitySensor placeholder={<IndustriesGridSkeleton />} rootMargin="100px">
        <Suspense fallback={<IndustriesGridSkeleton />}>
          <IndustriesGrid industries={industries} />
        </Suspense>
      </VisibilitySensor>
    </div>
  );
}

function ServicesSection({ services, id }: ServicesProps): JSX.Element {
  return (
    <div id={id}>
      <VisibilitySensor placeholder={<ServiceSectionSkeleton />}>
        <Suspense fallback={<ServiceSectionSkeleton />}>
          <ServiceSection services={services} />
        </Suspense>
      </VisibilitySensor>
    </div>
  );
}

function TrustCredentialsSection({ id }: SectionProps): JSX.Element {
  return (
    <div id={id}>
      <VisibilitySensor placeholder={<TrustSectionSkeleton />}>
        <Suspense fallback={<TrustSectionSkeleton />}>
          <TrustSection />
        </Suspense>
      </VisibilitySensor>
    </div>
  );
}

function CaseStudiesSection({ caseStudies, id }: CaseStudiesProps): JSX.Element {
  return (
    <div id={id}>
      <VisibilitySensor placeholder={<CaseStudySectionSkeleton />}>
        <Suspense fallback={<CaseStudySectionSkeleton />}>
          <CaseStudySection caseStudies={caseStudies} />
        </Suspense>
      </VisibilitySensor>
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
}: HomeSectionsProps): JSX.Element {
  // Register performance metrics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window && 'mark' in performance) {
      // Mark when sections are ready to load
      performance.mark('sections-ready');
    }
  }, []);

  return (
    <>
      {/* Each section is wrapped in VisibilitySensor and Suspense with appropriate fallbacks */}
      <IndustriesSection id="industries-section" industries={industries} />
      <ServicesSection id="services-section" services={services} />
      <CaseStudiesSection id="case-studies-section" caseStudies={caseStudies} />
      <AboutSection id="about-us-section" />
      <TrustCredentialsSection id="trust-section" />
    </>
  );
}
