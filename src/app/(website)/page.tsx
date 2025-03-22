// src/app/(website)/page.tsx
import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import HomeSections from './components/HomeSections';
import { industries, services } from '@/data/home-page-data';
import { generateCredentialsStructuredData } from '@/lib/seo/credentialsStructuredData';
import type { Metadata } from 'next';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'SolveJet - Top Software Development Company',
  description:
    "Transform your business with SolveJet's award-winning software development services. Trusted by leading brands and recognized by top industry authorities like Google Cloud, ISO 27001, DesignRush, Clutch, and Goodfirms.",
  keywords:
    'software development, Google Cloud Partner, ISO 27001 certified, top software company, web development, app development, flutter development, vue.js development',
  openGraph: {
    title: 'SolveJet - Award-Winning Software Development Company',
    description:
      'Certified Google Cloud Partner & ISO 27001:2022 compliant software development company recognized by industry leaders for excellence in custom software, web, and app development.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'}/images/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'SolveJet Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Award-Winning Software Development',
    description:
      'Google Cloud Partner & ISO 27001 certified software development company trusted by industry leaders.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net'}/images/og-home.jpg`],
  },
};

export default function HomePage(): ReactElement {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://solvejet.net';
  const structuredData = generateCredentialsStructuredData(baseUrl);

  return (
    <>
      {/* Add JSON-LD structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      {/* Hero section is critical for LCP so load it directly */}
      <HeroSection />

      {/* Load remaining sections via client component */}
      <HomeSections industries={industries} services={services} />
    </>
  );
}
