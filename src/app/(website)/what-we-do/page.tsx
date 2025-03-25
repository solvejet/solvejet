// src/app/(website)/what-we-do/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { generateServiceStructuredData } from '@/lib/seo/serviceStructuredData';
import { services } from '@/data/home-page-data';
import ServicesPageSections from './components/ServicesPageSections';

export const metadata: Metadata = {
  title: 'What We Do | Software & Technology Services | SolveJet',
  description:
    "Discover SolveJet's comprehensive range of technology services including custom software development, cloud services, AI solutions, mobile app development, and more.",
  keywords:
    'software development services, cloud solutions, AI services, mobile app development, custom software, IT consulting, technology services, digital transformation',
  openGraph: {
    title: 'Expert Software Development & Technology Services | SolveJet',
    description:
      'Transform your business with our comprehensive range of technology services. From custom software and mobile apps to cloud solutions and AI integration.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'}/images/og-services.jpg`,
        width: 1200,
        height: 630,
        alt: 'SolveJet Technology Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Software & Technology Services | SolveJet',
    description:
      'Transform your business with our comprehensive technology services. From development to cloud solutions, we deliver excellence.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'}/images/og-services.jpg`],
  },
};

export default function WhatWeDoPage(): React.ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';
  let structuredData = '';
  try {
    structuredData = generateServiceStructuredData(baseUrl, services);
  } catch (error) {
    console.error('Error generating structured data:', error);
  }

  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      {/* Load service page sections */}
      <ServicesPageSections services={services} />
    </>
  );
}
