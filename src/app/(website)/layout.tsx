// Updated src/app/(website)/layout.tsx
import type { JSX, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Static import for critical footer content
import { Footer } from './components/Footer';

// Dynamically import the header with improved loading fallback
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: true,
  loading: () => (
    <header className="fixed w-full z-50 py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[95rem]">
        <div className="py-3 px-4 bg-black/80 backdrop-blur-lg border-0 lg:border border-gray-800/30 rounded-lg h-16 flex items-center justify-between">
          {/* Logo placeholder */}
          <div className="w-36 md:w-44 h-8 bg-black/20 rounded-md"></div>

          {/* Navigation placeholder */}
          <div className="hidden md:flex space-x-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-20 h-4 bg-black/20 rounded-md"></div>
            ))}
          </div>

          {/* Button placeholder */}
          <div className="hidden md:block w-32 h-10 bg-black/20 rounded-md"></div>

          {/* Mobile menu button placeholder */}
          <div className="md:hidden w-10 h-10 bg-black/20 rounded-md"></div>
        </div>
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
