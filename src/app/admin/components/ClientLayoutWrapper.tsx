// src/app/admin/components/ClientLayoutWrapper.tsx
'use client';

import type { JSX, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { ProtectedAdminLayout } from './ProtectedAdminLayout';
import { TopBar } from './TopBar';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Custom fallback component for admin errors
function AdminErrorFallback(): JSX.Element {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
          Something went wrong
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          An error occurred in the admin panel. Please try refreshing the page or contact the system
          administrator if the problem persists.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="px-4 py-2 bg-element-500 text-white rounded-md hover:bg-element-600 transition-colors"
          >
            Refresh Page
          </button>
          <a
            href="/admin/dashboard"
            className="px-4 py-2 border border-element-500 text-element-500 rounded-md hover:bg-element-50 dark:hover:bg-element-900 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>('/');
  const pathname = usePathname();

  useEffect((): void => {
    setIsMounted(true);
    // Safely capture the pathname even if the router isn't fully mounted
    if (pathname) {
      setCurrentPath(pathname);
    } else if (typeof window !== 'undefined') {
      // Fallback to window.location.pathname if router's pathname is not available
      setCurrentPath(window.location.pathname);
    }
  }, [pathname]);

  // Show loading state until client-side hydration is complete
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const isLoginPage = currentPath === '/admin/login';

  // Default protection for all admin routes - requires at least VIEWER role
  return (
    <ProtectedAdminLayout requiredRole="VIEWER">
      <ErrorBoundary fallback={<AdminErrorFallback />}>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          {!isLoginPage && <TopBar />}
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        </div>
      </ErrorBoundary>
    </ProtectedAdminLayout>
  );
}
