// src/app/(website)/services/custom-software-development/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { generateServiceDetailStructuredData } from '@/lib/seo/serviceDetailStructuredData';
import CustomSoftwareDevelopmentPage from './components/CustomSoftwareDevelopmentPage';

export const metadata: Metadata = {
  title: 'Custom Software Development Services | SolveJet',
  description:
    'Transform your business with tailored software solutions. Our custom software development services deliver scalable, secure, and innovative applications designed for your unique needs.',
  keywords:
    'custom software development, bespoke software solutions, enterprise application development, software consulting, custom web applications, business software solutions',
  openGraph: {
    title: 'Custom Software Development Services | SolveJet',
    description:
      'Build powerful, scalable software solutions tailored to your business needs. Our expert development team creates custom applications that drive efficiency, growth, and innovation.',
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'
        }/images/services/custom-software-development-og.jpg`,
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
      "Build powerful, scalable software solutions tailored to your business needs with SolveJet's expert development team.",
    images: [
      `${
        process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'
      }/images/services/custom-software-development-og.jpg`,
    ],
  },
};

export default function CustomSoftwareDevelopmentServicePage(): React.ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';
  let structuredData = '';

  try {
    structuredData = generateServiceDetailStructuredData({
      baseUrl,
      serviceName: 'Custom Software Development',
      serviceDescription:
        'Build tailored software solutions that perfectly align with your business processes, address specific challenges, and drive growth.',
      serviceUrl: `${baseUrl}/services/custom-software-development`,
      serviceImageUrl: `${baseUrl}/images/services/custom-software-development.jpg`,
    });
  } catch (error) {
    console.error('Error generating structured data:', error);
  }

  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      {/* Main page content */}
      <CustomSoftwareDevelopmentPage />
    </>
  );
}
