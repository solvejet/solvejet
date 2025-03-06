// src/app/(website)/layout.tsx
import type { JSX, ReactNode } from 'react';
import Header from '@/components/layout/Header';

// Create a simple footer component
const SimpleFooter = (): JSX.Element => (
  <footer className="bg-gray-900 py-12">
    <div className="container mx-auto px-4">
      <div className="text-center text-white">
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
      <SimpleFooter />
    </div>
  );
}
