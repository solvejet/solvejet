// src/app/(website)/page.tsx
import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import HomeSections from './components/HomeSections';
import { industries, services } from '@/data/home-page-data';
import type { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <>
      {/* Hero section is critical for LCP so load it directly */}
      <HeroSection />

      {/* Load remaining sections via client component */}
      <HomeSections industries={industries} services={services} />
    </>
  );
}
