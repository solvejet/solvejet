// src/lib/structured-data.ts

import type { CaseStudy } from '@/types/case-study';

/**
 * Generates structured data (JSON-LD) for a case study
 * Following schema.org Article format
 */
export function getCaseStudyStructuredData(caseStudy: CaseStudy): Record<string, unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.overview,
    image: [`${baseUrl}${caseStudy.coverImage.src}`],
    author: {
      '@type': 'Organization',
      name: 'SolveJet',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SolveJet',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/case-studies/${caseStudy.slug}`,
    },
    keywords:
      caseStudy.metaData?.keywords?.join(', ') ??
      `${caseStudy.industry}, case study, success story`,
    articleSection: 'Case Study',
    articleBody: `${caseStudy.overview} ${caseStudy.challenge} ${caseStudy.approach} ${caseStudy.solution}`,
    // Add industry as a specific property
    about: {
      '@type': 'Thing',
      name: caseStudy.industry,
    },
    // Add performance metrics
    result: caseStudy.results.metrics.map(metric => ({
      '@type': 'Thing',
      name: metric.label,
      value: metric.value,
    })),
  };
}

/**
 * Generates structured data for a case studies list page
 */
export function getCaseStudiesListStructuredData(): Record<string, unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    headline: 'Case Studies - Client Success Stories',
    description: 'Explore our portfolio of successful client projects across various industries.',
    url: `${baseUrl}/case-studies`,
    publisher: {
      '@type': 'Organization',
      name: 'SolveJet',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [], // This would be populated with case study summaries when used
    },
  };
}

/**
 * Generates FAQ structured data for case studies
 */
export function getCommonFaqStructuredData(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What industries do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize in digital transformation across multiple industries including healthcare, finance, retail, manufacturing, and logistics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary based on scope and complexity. Small projects may take 2-3 months, while enterprise-level transformations can span 6-12 months.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We work with a wide range of technologies including React, Node.js, Python, AWS, Azure, GCP, Kubernetes, AI/ML frameworks, and more, always selecting the best technology stack for each specific project's requirements.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do you measure project success?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We define clear KPIs at the project outset, which may include metrics like revenue growth, cost reduction, conversion rate improvements, customer satisfaction scores, and operational efficiency gains.',
        },
      },
    ],
  };
}

/**
 * Generates breadcrumb structured data
 */
export function getBreadcrumbStructuredData(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
