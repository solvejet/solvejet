// src/app/admin/components/ProtectedAdminLayout.tsx
'use client';

import { useToastStore } from '@/components/ui/toast/toast-store';
import { useAuthStore } from '@/store/auth-store';
import { useSecureContext } from '@/hooks/useSecureContext';
import { usePathname, useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { useEffect, useRef, type ReactNode, useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface ProtectedAdminLayoutProps {
  children: ReactNode;
  requiredRole?: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'VIEWER';
  requiredPermission?: string;
}

// Custom fallback component for protected layout errors
function ProtectedLayoutErrorFallback(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
          Authentication Error
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          There was a problem loading the admin area. This might be due to an authentication issue.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={(): void => {
              router.push('/admin/login');
            }}
            className="px-4 py-2 bg-element-500 text-white rounded-md hover:bg-element-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProtectedAdminLayout({
  children,
  requiredRole,
  requiredPermission,
}: ProtectedAdminLayoutProps): JSX.Element {
  const { isAuthenticated, user, isInitializing } = useAuthStore();
  const securityContext = useSecureContext();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToastStore();
  const [authChecked, setAuthChecked] = useState(false);
  const redirectedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Safe permission check using security context
  const checkPermission = (permission: string): boolean => {
    return securityContext.checkPermission(permission);
  };

  useEffect(() => {
    // Set a safety timeout to avoid infinite loading
    if (isInitializing && !initTimeoutRef.current) {
      initTimeoutRef.current = setTimeout(() => {
        console.warn('Protected layout timeout triggered - forcing completion of initialization');
        setIsLoading(false);
        setAuthChecked(true);
      }, 8000); // 8 seconds timeout
    }

    // Skip protection for login page
    if (pathname === '/admin/login') {
      setAuthChecked(true);
      setIsLoading(false);
      redirectedRef.current = false;

      // Clear any timeouts
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
        initTimeoutRef.current = null;
      }

      // No cleanup needed
      return undefined;
    }

    // Handle authentication check once initialization is complete
    if (!isInitializing) {
      // Clear the timeout if it exists
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
        initTimeoutRef.current = null;
      }

      // Reset redirect flag when path changes
      if (redirectedRef.current && pathname !== '/admin/login' && pathname !== '/admin/dashboard') {
        redirectedRef.current = false;
      }

      // Check if user is authenticated
      if (!isAuthenticated) {
        // Only redirect if we haven't already
        if (!redirectedRef.current) {
          redirectedRef.current = true;

          // During a logout, only show toast and redirect to the login page
          // Check if it's a logout by checking for recent auth change
          const isLogout =
            typeof window !== 'undefined' && sessionStorage.getItem('is_logging_out') === 'true';

          if (!isLogout) {
            // Normal auth failure - not during logout
            setTimeout(() => {
              toast.addToast({
                title: 'Authentication Required',
                message: 'Please log in to access the admin area',
                variant: 'warning',
              });
            }, 0);
          }

          // Navigate directly to login page using window.location for complete reset
          window.location.href = '/admin/login';
          return;
        }

        // Update loading state
        setIsLoading(false);
        return;
      }

      // Rest of the function remains the same
      // ...
    }

    return (): void => {
      // Clear the timeout if component unmounts
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
        initTimeoutRef.current = null;
      }
    };
  }, [
    isAuthenticated,
    user,
    pathname,
    toast,
    requiredRole,
    requiredPermission,
    checkPermission,
    router,
    isInitializing,
  ]);

  // For login page, always render content
  if (pathname === '/admin/login') {
    return <ErrorBoundary fallback={<ProtectedLayoutErrorFallback />}>{children}</ErrorBoundary>;
  }

  // If still initializing auth and not timed out, show a loading indicator
  if (isInitializing && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-element-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading authentication...</p>
          <button
            onClick={() => {
              window.location.href = '/admin/login';
            }}
            className="mt-6 px-4 py-2 bg-element-500 text-white rounded-md hover:bg-element-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // For protected pages, render only after auth check is complete
  if (isAuthenticated && (authChecked || !isInitializing)) {
    return <ErrorBoundary fallback={<ProtectedLayoutErrorFallback />}>{children}</ErrorBoundary>;
  }

  // Loading state while checking authentication
  if (isLoading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-element-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading admin panel...</p>
          <button
            onClick={() => {
              window.location.href = '/admin/login';
            }}
            className="mt-6 px-4 py-2 bg-element-500 text-white rounded-md hover:bg-element-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // For login page or during auth check, just render children inside ErrorBoundary
  return <ErrorBoundary fallback={<ProtectedLayoutErrorFallback />}>{children}</ErrorBoundary>;
}
