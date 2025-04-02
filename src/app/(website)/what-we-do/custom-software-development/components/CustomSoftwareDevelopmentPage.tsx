// src/app/(website)/services/custom-software-development/components/CustomSoftwareDevelopmentPage.tsx
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
const Hero = dynamic(() => import('@/components/Services/CustomSoftwareDevelopment/Hero'), {
  loading: () => <ServiceDetailHeroSkeleton />,
  ssr: true,
});

const Credentials = lazy(
  () => import('@/components/Services/CustomSoftwareDevelopment/Credentials')
);

const ProjectApproach = lazy(
  () => import('@/components/Services/CustomSoftwareDevelopment/ProjectApproach')
);

const ProjectStages = lazy(
  () => import('@/components/Services/CustomSoftwareDevelopment/ProjectStages')
);

const CustomSoftwareCaseStudies = lazy(
  () => import('@/components/Services/CustomSoftwareDevelopment/CustomSoftwareCaseStudies')
);

const FAQSection = lazy(() => import('@/components/Services/CustomSoftwareDevelopment/FAQSection'));

const ContactFormSection = lazy(
  () => import('@/components/Services/CustomSoftwareDevelopment/ContactFormSection')
);

export default function CustomSoftwareDevelopmentPage(): React.ReactElement {
  // Hero section data
  const heroProps = {
    title: 'Custom Software Development',
    description:
      'Transform your business with custom software solutions designed specifically to address your unique challenges and opportunities. We create scalable, secure, and innovative applications that align perfectly with your business processes and growth objectives.',
    benefits: [
      {
        title: 'Tailored Functionality',
        description: 'Solutions built precisely to match your specific business requirements',
      },
      {
        title: 'Scalable Architecture',
        description: 'Systems designed to grow alongside your business',
      },
      {
        title: 'Seamless Integration',
        description: 'Connect with your existing systems and third-party services',
      },
      {
        title: 'Performance Optimized',
        description: 'Fast, responsive applications built for maximum efficiency',
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

      {/* Credentials Section - now using component with static data */}
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
        <CustomSoftwareCaseStudies />
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
