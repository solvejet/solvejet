// src/app/(website)/case-studies/[slug]/page.tsx

import type { Metadata } from 'next';
import type { JSX } from 'react';
import { notFound } from 'next/navigation';
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getCaseStudies,
} from '@/services/case-study-service';
import CaseStudyClient from './components/CaseStudyClient';
import type { CaseStudySummary, CaseStudy } from '@/types/case-study';

// Define params type with Promise for Next.js 15
type SlugParams = Promise<{ slug: string }>;

// Define the params for static generation
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const caseStudies = await getCaseStudies();
  return caseStudies.map(study => ({
    slug: study.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: SlugParams }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: caseStudy.metaData?.title ?? `${caseStudy.title} | SolveJet Case Study`,
    description: caseStudy.metaData?.description ?? caseStudy.overview,
    keywords: caseStudy.metaData?.keywords ?? [
      'case study',
      'success story',
      'digital transformation',
    ],
    openGraph: {
      title: caseStudy.metaData?.title ?? `${caseStudy.title} | SolveJet Case Study`,
      description: caseStudy.metaData?.description ?? caseStudy.overview,
      type: 'article',
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.updatedAt,
      images: [
        {
          url: caseStudy.metaData?.ogImage ?? caseStudy.coverImage.src,
          width: 1200,
          height: 630,
          alt: caseStudy.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.metaData?.title ?? `${caseStudy.title} | SolveJet Case Study`,
      description: caseStudy.metaData?.description ?? caseStudy.overview,
      images: [caseStudy.metaData?.ogImage ?? caseStudy.coverImage.src],
    },
  };
}

// Main page component
export default async function Page({ params }: { params: SlugParams }): Promise<JSX.Element> {
  // Access slug from the Promise
  const { slug } = await params;

  // Fetch case study data
  const caseStudy: CaseStudy | null = await getCaseStudyBySlug(slug);

  // Handle case study not found
  if (!caseStudy) {
    notFound();
  }

  // Fetch related case studies if available
  let relatedCaseStudies: CaseStudySummary[] = [];
  if (caseStudy.relatedCaseStudies && caseStudy.relatedCaseStudies.length > 0) {
    relatedCaseStudies = await getRelatedCaseStudies(caseStudy.relatedCaseStudies);
  }

  // Render the client component with the data
  return <CaseStudyClient caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
}
