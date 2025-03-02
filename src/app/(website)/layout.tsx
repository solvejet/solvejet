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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="h-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm border border-gray-200 dark:border-gray-800 rounded-lg"></div>
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
