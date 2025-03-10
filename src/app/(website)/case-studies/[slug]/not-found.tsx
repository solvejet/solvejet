// src/app/(website)/case-studies/[slug]/not-found.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { ChevronLeft, Search } from 'lucide-react';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';

export default function CaseStudyNotFound(): React.ReactElement {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track 404 error for case studies
    trackEvent({
      name: 'case_study_not_found',
      category: 'error',
      label: 'case_study_404',
      properties: {
        url: typeof window !== 'undefined' ? window.location.pathname : '',
      },
    });
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-md p-12">
          <div className="mb-8">
            <Search className="h-16 w-16 text-element-500 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            We couldn't find the case study you're looking for. It may have been removed or the URL
            might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/case-studies">
              <TrackedButton
                variant="default"
                leftIcon={<ChevronLeft className="mr-2 h-5 w-5" />}
                trackingEvent={{
                  name: 'not_found_back_to_case_studies_click',
                  category: 'navigation',
                  label: 'back_to_case_studies_from_404',
                }}
              >
                Browse All Case Studies
              </TrackedButton>
            </Link>
            <Link href="/contact">
              <TrackedButton
                variant="outline"
                trackingEvent={{
                  name: 'not_found_contact_click',
                  category: 'navigation',
                  label: 'contact_from_404',
                }}
              >
                Contact Us
              </TrackedButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
