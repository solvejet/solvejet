// src/app/(website)/layout.tsx
import type { JSX, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Static import for critical footer content
import { Footer } from './components/Footer';

// Dynamically import the header with loading fallback
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: true,
  loading: () => (
    <header className="fixed w-full z-50 py-3 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[95rem]">
        <div className="h-16 bg-black/50 backdrop-blur-lg border-0 lg:border border-gray-800/30 rounded-lg"></div>
      </div>
    </header>
  ),
});

export default function WebsiteLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
