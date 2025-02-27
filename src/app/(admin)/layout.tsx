// src/app/(admin)/layout.tsx
import type { ReactNode } from 'react';
import { TopBar } from './components/TopBar';
import type { JSX } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <TopBar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
