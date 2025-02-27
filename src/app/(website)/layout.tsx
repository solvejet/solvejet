// src/app/(website)/layout.tsx
import type { JSX, ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function WebsiteLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
