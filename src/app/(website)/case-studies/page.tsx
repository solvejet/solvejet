// src/app/(website)/case-studies/page.tsx
import type { Metadata } from 'next';
import { getCaseStudies } from '@/services/case-study-service';
import CaseStudiesClient from './components/CaseStudiesClient';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Case Studies | SolveJet - Innovative Software Solutions',
  description:
    'Explore our portfolio of successful client projects across various industries. Real-world examples of how we deliver transformative software solutions that drive business growth.',
  keywords: [
    'software case studies',
    'client success stories',
    'software development portfolio',
    'digital transformation examples',
    'enterprise solutions case studies',
    'software project portfolio',
    'SolveJet projects',
  ],
  openGraph: {
    title: 'Case Studies | SolveJet - Innovative Software Solutions',
    description:
      'Explore our portfolio of successful client projects. See how we have helped businesses transform their operations with custom software solutions.',
    type: 'website',
    images: [
      {
        url: '/images/og/case-studies.jpg',
        width: 1200,
        height: 630,
        alt: 'SolveJet Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | SolveJet - Innovative Software Solutions',
    description: 'Explore our portfolio of successful client projects across various industries.',
    images: ['/images/og/case-studies.jpg'],
  },
};

export default async function CaseStudiesPage(): Promise<ReactElement> {
  // Fetch all case studies
  const caseStudies = await getCaseStudies();

  // Separate featured and regular case studies
  const featuredCaseStudies = caseStudies.filter(study => study.featured);

  // All non-featured case studies go to regular
  const regularCaseStudies = caseStudies.filter(study => !study.featured);

  return (
    <CaseStudiesClient
      featuredCaseStudies={featuredCaseStudies}
      regularCaseStudies={regularCaseStudies}
    />
  );
}
