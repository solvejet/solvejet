// src/app/admin/layout.tsx
import type { ReactNode } from 'react';
import ClientLayoutWrapper from './components/ClientLayoutWrapper';
import type { JSX } from 'react';

// Keep the server component layout that wraps everything
export default function AdminLayout({ children }: { children: ReactNode }): JSX.Element {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
