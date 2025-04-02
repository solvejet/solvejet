// src/app/(website)/what-we-do/mvp-development/components/MVPDevelopmentPage.tsx
'use client';

import React, { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import {
  ServiceDetailHeroSkeleton,
  CredentialsSkeleton,
  ProjectStagesSkeleton,
} from '@/components/Services/CustomSoftwareDevelopment/skeletons';
import { CaseStudySectionSkeleton } from '@/components/Home/skeletons';

// Dynamic imports with suspense for performance
const Hero = dynamic(() => import('@/components/Services/MVPDevelopment/Hero'), {
  loading: () => <ServiceDetailHeroSkeleton />,
  ssr: true,
});

const Credentials = lazy(() => import('@/components/Services/MVPDevelopment/Credentials'));

const ProjectApproach = lazy(() => import('@/components/Services/MVPDevelopment/ProjectApproach'));

const ProjectStages = lazy(() => import('@/components/Services/MVPDevelopment/ProjectStages'));

const MVPCaseStudies = lazy(() => import('@/components/Services/MVPDevelopment/MVPCaseStudies'));

const FAQSection = lazy(() => import('@/components/Services/MVPDevelopment/FAQSection'));

const ContactFormSection = lazy(
  () => import('@/components/Services/MVPDevelopment/ContactFormSection')
);

export default function MVPDevelopmentPage(): React.ReactElement {
  // Hero section data
  const heroProps = {
    title: 'MVP Development',
    description:
      'Bring your ideas to market faster with our MVP development services. We help startups and enterprises build lean, market-ready minimum viable products that validate concepts, attract early adopters, and secure investor funding—all without overbuilding.',
    benefits: [
      {
        title: 'Faster Time-to-Market',
        description: 'Launch your core product quickly to test market response',
      },
      {
        title: 'Reduced Initial Cost',
        description: 'Minimize investment while validating your business model',
      },
      {
        title: 'User-Centered Design',
        description: 'Focus on solving real problems for your target audience',
      },
      {
        title: 'Iterative Enhancement',
        description: 'Data-driven improvement based on actual user feedback',
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={heroProps.title}
        description={heroProps.description}
        benefits={heroProps.benefits}
      />

      {/* Credentials Section */}
      <Suspense fallback={<CredentialsSkeleton />}>
        <Credentials />
      </Suspense>

      {/* Project Approach Section */}
      <Suspense
        fallback={
          <div className="h-96 bg-white flex items-center justify-center">
            <div className="animate-pulse h-10 w-40 bg-gray-200 rounded"></div>
          </div>
        }
      >
        <ProjectApproach />
      </Suspense>

      {/* Project Stages Section */}
      <Suspense fallback={<ProjectStagesSkeleton />}>
        <ProjectStages />
      </Suspense>

      {/* Case Studies Section */}
      <Suspense fallback={<CaseStudySectionSkeleton />}>
        <MVPCaseStudies />
      </Suspense>

      {/* FAQ Section */}
      <Suspense
        fallback={
          <div className="h-96 bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className="animate-pulse h-10 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        }
      >
        <FAQSection />
      </Suspense>

      {/* Contact Form Section */}
      <Suspense
        fallback={
          <div className="h-96 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
            <div className="animate-pulse h-10 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        }
      >
        <ContactFormSection />
      </Suspense>
    </>
  );
}
