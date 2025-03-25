// src/app/(website)/what-we-do/custom-software-development/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { generateServiceDetailStructuredData } from '@/lib/seo/serviceDetailStructuredData';
import CustomSoftwareHero from '@/components/CustomSoftwareDevelopment/CustomSoftwareHero';

export const metadata: Metadata = {
  title: 'Custom Software Development Services | SolveJet',
  description:
    'Transform your business with tailor-made software solutions. Our expert team delivers scalable, future-proof custom software that drives growth and operational excellence.',
  keywords:
    'custom software development, bespoke software solutions, enterprise software development, scalable software, business software solutions, custom web applications, software consulting',
  openGraph: {
    title: 'Custom Software Development Services | SolveJet',
    description:
      'Transform your business with tailor-made software solutions that perfectly align with your unique needs and workflows.',
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'
        }/images/services/custom-software-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'SolveJet Custom Software Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development Services | SolveJet',
    description:
      'Transform your business with tailor-made software solutions. Our expert team delivers scalable, future-proof custom software.',
    images: [
      `${
        process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'
      }/images/services/custom-software-og.jpg`,
    ],
  },
};

export default function CustomSoftwareDevelopmentPage(): React.ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';
  let structuredData = '';

  try {
    // Generate structured data for this specific service
    structuredData = generateServiceDetailStructuredData(baseUrl, {
      name: 'Custom Software Development',
      description:
        'Transform your business with tailor-made software solutions that perfectly align with your unique needs and workflows. Our expert team delivers scalable, future-proof solutions that drive growth and operational excellence.',
      url: `${baseUrl}/what-we-do/custom-software-development`,
      image: `${baseUrl}/images/services/custom-software-og.jpg`,
      provider: 'SolveJet',
      serviceType: 'Software Development Service',
    });
  } catch (error) {
    console.error('Error generating structured data:', error);
  }

  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      {/* Hero Section */}
      <CustomSoftwareHero />

      {/* More sections to be added */}
    </>
  );
}
