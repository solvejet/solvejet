// src/app/(website)/layout.tsx
import type { JSX, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

// Load the Header immediately but with a more efficient version
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: true,
  loading: () => (
    <header className="fixed w-full z-50 py-2 bg-transparent">
      <div className="container mx-auto px-4 max-w-[95rem]">
        <div className="relative rounded-lg border border-gray-800/30 bg-gray-900/95 backdrop-blur-lg py-3 px-4"></div>
      </div>
    </header>
  ),
});

// Lazy load footer with low priority
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
