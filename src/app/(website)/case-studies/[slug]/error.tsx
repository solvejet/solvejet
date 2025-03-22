// src/app/(website)/case-studies/[slug]/error.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';

interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CaseStudyError({ error, reset }: ErrorComponentProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track error occurrence
    trackEvent({
      name: 'case_study_error',
      category: 'error',
      label: 'case_study_error',
      properties: {
        error_message: error.message,
        error_digest: error.digest,
        url: typeof window !== 'undefined' ? window.location.pathname : '',
      },
    });
  }, [error, trackEvent]);

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-md p-12">
          <div className="mb-8 text-red-500">
            <AlertCircle className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Something Went Wrong</h1>
          <p className="text-xl text-gray-600 mb-8">
            We encountered an error while loading this case study. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              variant="default"
              leftIcon={<RefreshCcw className="mr-2 h-5 w-5" />}
            >
              Try Again
            </Button>
            <Link href="/case-studies">
              <TrackedButton
                variant="outline"
                leftIcon={<Home className="mr-2 h-5 w-5" />}
                trackingEvent={{
                  name: 'error_home_click',
                  category: 'navigation',
                  label: 'home_from_error',
                }}
              >
                Back to Case Studies
              </TrackedButton>
            </Link>
          </div>

          {/* For developers in development environment */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 text-left border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Error Details (Dev Only):
              </h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {error.message}
                {error.stack && (
                  <>
                    <br />
                    <br />
                    {error.stack}
                  </>
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
