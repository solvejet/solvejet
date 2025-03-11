// src/app/ClientLayoutWrapper.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Define children prop type for consistent usage
interface ChildrenProps {
  children: React.ReactNode;
}

// Initial loading state component - just passes through children to prevent flickering
const InitialLoadingState = ({ children }: ChildrenProps): React.JSX.Element => <>{children}</>;

// Dynamically import the ClientProviders with a fallback that renders children directly
// This ensures content is visible even if providers fail to load
const ClientProviders = dynamic(
  () => import('@/components/ClientProviders').then(mod => mod.MemoizedClientProviders),
  {
    ssr: false,
    loading: () => <InitialLoadingState children={(<></>) as React.ReactNode} />,
  }
);

// Dynamically import Providers with lower priority but still show content
const Providers = dynamic(
  () => import('@/components/Providers').then(mod => ({ default: mod.Providers })),
  {
    ssr: false,
    loading: () => <InitialLoadingState children={(<></>) as React.ReactNode} />,
  }
);

export default function ClientLayoutWrapper({ children }: ChildrenProps): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [loadProviders, setLoadProviders] = useState(false);

  // Main mount effect
  useEffect((): (() => void) => {
    setMounted(true);

    // Schedule delayed loading of providers
    const timer = setTimeout(() => {
      setLoadProviders(true);
    }, 500); // Reduced delay to 500ms for faster provider loading

    return (): void => {
      clearTimeout(timer);
    };
  }, []);

  // Lenis persistence effect - manage Lenis with dedicated checks
  useEffect(() => {
    if (!mounted) return undefined;

    let checkInterval: NodeJS.Timeout;

    // Dynamically import Lenis functions to avoid SSR issues
    const importLenisFunctions = async (): Promise<void> => {
      try {
        // Dynamic import
        const lenis = await import('@/lib/lenis');

        // Initialize Lenis if not already initialized
        lenis.reinitializeLenis();

        // Set up a periodic check to ensure Lenis stays initialized
        checkInterval = setInterval(() => {
          if (typeof window !== 'undefined') {
            // If Lenis is missing, reinitialize it
            const currentLenis = lenis.getLenis();
            if (!currentLenis || !window.lenis) {
              console.warn('Reinitializing Lenis - instance missing');
              lenis.reinitializeLenis();
            }
          }
        }, 10000); // Check every 10 seconds
      } catch (error) {
        console.error('Failed to initialize Lenis:', error);
      }
    };

    void importLenisFunctions();

    // Return cleanup function that does NOT destroy Lenis
    return (): void => {
      clearInterval(checkInterval);
      // Don't call destroyLenis() here - we want Lenis to persist
    };
  }, [mounted]);

  // Before hydration, return just the children to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  // Always return children wrapped in a fragment to ensure they're visible
  // This prevents the white screen issue
  return (
    <>
      {children}
      {loadProviders && (
        <ClientProviders>
          <Providers>{null}</Providers>
        </ClientProviders>
      )}
    </>
  );
}
