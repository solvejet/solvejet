// src/app/page.tsx
import React from 'react';
import { generateMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

// Generate metadata for SEO
export const metadata: Metadata = generateMetadata({
  title: 'Leading Software Development Company | Google Cloud Partner | ISO Certified',
  description: 'SolveJet is a top-rated software development company and Google Cloud Partner with ISO certification. Recognized by Clutch, GoodFirms, and DesignRush for delivering enterprise-grade software solutions.',
  url: '/',
});

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Await the searchParams in Next.js 15
  const params = await searchParams;
  
  return (
    <>
      <HomePageClient searchParams={params} />
      
      {/* Preload critical resources for next likely pages */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/portfolio" />
    </>
  );
}