// src/app/(website)/what-we-do/mvp-development/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { generateServiceDetailStructuredData } from '@/lib/seo/serviceDetailStructuredData';
import MVPDevelopmentPage from './components/MVPDevelopmentPage';

export const metadata: Metadata = {
  title: 'MVP Development Services | SolveJet',
  description:
    'Launch your product faster with our MVP development services. We build lean, market-ready minimum viable products that validate your business idea, attract early adopters, and secure investor funding.',
  keywords:
    'MVP development, minimum viable product, rapid prototyping, startup development, lean startup, product validation, agile MVP, market testing',
  openGraph: {
    title: 'MVP Development Services | SolveJet',
    description:
      'Transform your ideas into market-ready products quickly with our MVP development services. We help startups and enterprises validate concepts, attract users, and secure funding with lean, scalable MVPs.',
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'
        }/images/services/mvp-development-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'SolveJet MVP Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVP Development Services | SolveJet',
    description:
      "Transform your ideas into market-ready products quickly with SolveJet's expert MVP development team.",
    images: [
      `${
        process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'
      }/images/services/mvp-development-og.jpg`,
    ],
  },
};

export default function MVPDevelopmentServicePage(): React.ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';
  let structuredData = '';

  try {
    structuredData = generateServiceDetailStructuredData({
      baseUrl,
      serviceName: 'MVP Development',
      serviceDescription:
        'Launch faster with a Minimum Viable Product that validates your business idea, attracts early adopters, and secures investor funding without overbuilding.',
      serviceUrl: `${baseUrl}/services/mvp-development`,
      serviceImageUrl: `${baseUrl}/images/services/mvp-development.jpg`,
    });
  } catch (error) {
    console.error('Error generating structured data:', error);
  }

  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      {/* Main page content */}
      <MVPDevelopmentPage />
    </>
  );
}
