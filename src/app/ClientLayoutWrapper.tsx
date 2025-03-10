'use client';

import { ClientProviders } from '@/components/ClientProviders';
import type { ReactNode } from 'react';
import type { JSX } from 'react';

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

// This wrapper allows us to use dynamic imports with ssr: false
// Since this is a client component, not a server component
export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps): JSX.Element {
  return <ClientProviders>{children}</ClientProviders>;
}
