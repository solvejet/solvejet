// src/app/(website)/case-studies/[slug]/page.tsx
import React from 'react';
import { use } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/data/case-studies';
import { getBreadcrumbStructuredData, getCaseStudyStructuredData } from '@/lib/structured-data';
import type { JSX } from 'react';

// Dynamic import the CaseStudyDetail component
const CaseStudyDetail = dynamic(() => import('@/components/CaseStudy/CaseStudyDetail'), {
  ssr: true,
  loading: () => <CaseStudyDetailSkeleton />,
});

// Simple skeleton loader
function CaseStudyDetailSkeleton(): JSX.Element {
  return (
    <section className="pt-24 md:pt-36 pb-12 bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-32 mb-6"></div>
          <div className="h-12 bg-gray-700 rounded-lg w-3/4 mb-4"></div>
          <div className="h-12 bg-gray-700 rounded-lg w-1/2 mb-8"></div>
          <div className="h-4 bg-gray-700 rounded w-full max-w-2xl mb-8"></div>
          <div className="h-4 bg-gray-700 rounded w-full max-w-2xl mb-8"></div>
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="h-8 bg-gray-700 rounded-full w-32"></div>
            <div className="h-8 bg-gray-700 rounded-full w-40"></div>
            <div className="h-8 bg-gray-700 rounded-full w-36"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Generate Static Params for all case studies
export function generateStaticParams(): { slug: string }[] {
  const slugs = getAllCaseStudySlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: caseStudy.metaData?.title ?? `${caseStudy.title} | Case Study`,
    description: caseStudy.metaData?.description ?? caseStudy.overview,
    keywords: caseStudy.metaData?.keywords ?? [caseStudy.industry, 'case study', 'success story'],
    openGraph: {
      title: caseStudy.metaData?.title ?? `${caseStudy.title} | Case Study`,
      description: caseStudy.metaData?.description ?? caseStudy.overview,
      images: [
        {
          url: caseStudy.coverImage.src,
          width: 1200,
          height: 630,
          alt: caseStudy.coverImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.metaData?.title ?? `${caseStudy.title} | Case Study`,
      description: caseStudy.metaData?.description ?? caseStudy.overview,
      images: [caseStudy.coverImage.src],
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): JSX.Element {
  // Use React's 'use' hook to unwrap the Promise (client components)
  const { slug } = use(params);
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Generate structured data for SEO
  const caseStudyJsonLd = getCaseStudyStructuredData(caseStudy);
  const breadcrumbJsonLd = getBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
    { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Case Study Detail Component */}
      <CaseStudyDetail caseStudy={caseStudy} />
    </>
  );
}
