// src/app/(website)/layout.tsx
import type { JSX, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for Header with SSR enabled
const Header = dynamic(() => import('@/components/layout/Header'), { ssr: true });

// Lazy load footer to prioritize main content
const Footer = lazy(() => import('@/components/layout/Footer'));

// Simple loading placeholder for footer
const FooterFallback = (): JSX.Element => (
  <footer className="bg-gray-900 py-12">
    <div className="container mx-auto px-4">
      <div className="text-center text-white opacity-0">
        <p>© {new Date().getFullYear()} SolveJet. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function WebsiteLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
