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
  const { isAuthenticated, user } = useAuthStore();
  const { checkPermission } = useSecureContext();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToastStore();
  const [authChecked, setAuthChecked] = useState(false);
  const redirectedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check if user is super admin
  const isSuperAdmin = (): boolean => {
    return user?.role === 'SUPER_ADMIN';
  };

  useEffect((): (() => void) => {
    // Skip protection for login page
    if (pathname === '/admin/login') {
      setAuthChecked(true);
      setIsLoading(false);
      redirectedRef.current = false;
      return (): void => {
        // Empty cleanup function to satisfy TypeScript
      };
    }

    // Reset redirect flag when path changes
    if (redirectedRef.current && pathname !== '/admin/login' && pathname !== '/admin/dashboard') {
      redirectedRef.current = false;
    }

    // Handle authentication check
    const checkAuth = (): void => {
      if (!isAuthenticated) {
        // Only show toast and redirect if we haven't already
        if (!redirectedRef.current) {
          redirectedRef.current = true;

          // Add toast on next tick to avoid React state updates during render
          setTimeout(() => {
            toast.addToast({
              title: 'Authentication Required',
              message: 'Please log in to access the admin area',
              variant: 'warning',
            });
          }, 0);

          // Use Next.js router for navigation with braces to address ESLint error
          router.push('/admin/login');
        }
        return;
      }

      // Role-based access control
      if (requiredRole && user?.role !== requiredRole) {
        // Super admin can access everything
        if (isSuperAdmin()) {
          setAuthChecked(true);
          setIsLoading(false);
          return;
        }

        // Only show toast and redirect if we haven't already
        if (!redirectedRef.current) {
          redirectedRef.current = true;

          // Add toast on next tick to avoid React state updates during render
          setTimeout(() => {
            toast.addToast({
              title: 'Access Denied',
              message: `This area requires ${requiredRole} privileges`,
              variant: 'error',
            });
          }, 0);

          // Use Next.js router for navigation with braces to address ESLint error
          router.push('/admin/dashboard');
        }
        return;
      }

      // Permission-based access control
      if (requiredPermission && !checkPermission(requiredPermission)) {
        // Super admin can access everything
        if (isSuperAdmin()) {
          setAuthChecked(true);
          setIsLoading(false);
          return;
        }

        // Only show toast and redirect if we haven't already
        if (!redirectedRef.current) {
          redirectedRef.current = true;

          // Add toast on next tick to avoid React state updates during render
          setTimeout(() => {
            toast.addToast({
              title: 'Access Denied',
              message: 'You do not have permission to access this area',
              variant: 'error',
            });
          }, 0);

          // Use Next.js router for navigation with braces to address ESLint error
          router.push('/admin/dashboard');
        }
        return;
      }

      // If we get here, user is authorized
      setAuthChecked(true);
      setIsLoading(false);
    };

    // Set a small timeout to ensure any auth store initialization has completed
    const timer = setTimeout(() => {
      checkAuth();
    }, 50);

    // Return a cleanup function
    return (): void => {
      clearTimeout(timer);
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
  ]);

  // For login page, always render content
  if (pathname === '/admin/login') {
    return <ErrorBoundary fallback={<ProtectedLayoutErrorFallback />}>{children}</ErrorBoundary>;
  }

  // For protected pages, render only after auth check is complete
  if (isAuthenticated && authChecked) {
    return <ErrorBoundary fallback={<ProtectedLayoutErrorFallback />}>{children}</ErrorBoundary>;
  }

  // Loading state while checking authentication
  if (isLoading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-element-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // For login page or during auth check, just render children inside ErrorBoundary
  return <ErrorBoundary fallback={<ProtectedLayoutErrorFallback />}>{children}</ErrorBoundary>;
}
