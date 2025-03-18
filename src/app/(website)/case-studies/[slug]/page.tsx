// src/app/(website)/case-studies/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import CaseStudyHero from './components/CaseStudyHero';
import CaseStudyContent from './components/CaseStudyContent';
import CaseStudyMetrics from './components/CaseStudyMetrics';
import CaseStudySolution from './components/CaseStudySolution';
import CaseStudyTechnology from './components/CaseStudyTechnology';
import CaseStudyResults from './components/CaseStudyResults';
import RelatedCaseStudies from './components/RelatedCaseStudies';
import CaseStudyCTA from './components/CaseStudyCTA';
import LoadingFallback from './components/LoadingFallback';
import { getCaseStudyBySlug, getRelatedCaseStudies } from '@/services/case-study-service';
import { getCaseStudyStructuredData } from '@/lib/structured-data';
import { CaseStudyProvider } from './components/CaseStudyContext';
import { AnalyticsPageView } from '@/components/Analytics/AnalyticsPageView';
import type { JSX } from 'react';

interface Params {
  slug: string;
}

interface PageProps {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';
  const fullUrl = `${baseUrl}/case-studies/${slug}`;

  return {
    title: `${caseStudy.title} - Case Study`,
    description: caseStudy.overview,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.overview,
      type: 'article',
      images: [
        {
          url: caseStudy.coverImage.src,
          width: caseStudy.coverImage.width,
          height: caseStudy.coverImage.height,
          alt: caseStudy.coverImage.alt,
        },
      ],
      locale: 'en_US',
      url: fullUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.overview,
      images: [caseStudy.coverImage.src],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Fetch related case studies
  const relatedCaseStudies = caseStudy.relatedCaseStudies
    ? await getRelatedCaseStudies(caseStudy.relatedCaseStudies)
    : [];

  // Generate structured data for SEO
  const structuredData = getCaseStudyStructuredData(caseStudy);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Analytics */}
      <AnalyticsPageView
        pageType="case_study_detail"
        pageData={{
          caseStudyId: caseStudy.id,
          caseStudyTitle: caseStudy.title,
          industry: caseStudy.industry,
        }}
      />

      <CaseStudyProvider caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies}>
        {/* Hero Section with cover image, title, subtitle */}
        <CaseStudyHero />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Suspense fallback={<LoadingFallback type="content" />}>
                {/* Overview Section */}
                <CaseStudyContent />
              </Suspense>

              <Suspense fallback={<LoadingFallback type="solution" />}>
                {/* Solution Section */}
                <CaseStudySolution />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <Suspense fallback={<LoadingFallback type="metrics" />}>
                {/* Key Metrics */}
                <CaseStudyMetrics />
              </Suspense>

              <Suspense fallback={<LoadingFallback type="technology" />}>
                {/* Technology Stack */}
                <CaseStudyTechnology />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Results Section (Full Width) */}
        <Suspense fallback={<LoadingFallback type="results" />}>
          <CaseStudyResults />
        </Suspense>

        {/* Related Case Studies */}
        <Suspense fallback={<LoadingFallback type="related" />}>
          <RelatedCaseStudies />
        </Suspense>

        {/* Call to Action */}
        <CaseStudyCTA />
      </CaseStudyProvider>
    </>
  );
}

// Generate static paths for all case studies
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Using the same import style as getCaseStudyBySlug
  const { getCaseStudies } = await import('@/services/case-study-service');
  const caseStudies = await getCaseStudies();

  return caseStudies.map(study => ({
    slug: study.slug,
  }));
}
