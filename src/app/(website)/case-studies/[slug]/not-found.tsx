// src/app/(website)/case-studies/[slug]/not-found.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { ChevronLeft, Search, Folder, FileQuestion, ArrowRight } from 'lucide-react';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import { SolvejetLogo } from '@/components/ui/SolvejetLogo';

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <SolvejetLogo height={40} className="transition-transform hover:scale-105" />
          </Link>
          <Link
            href="/case-studies"
            className="flex items-center text-element-600 dark:text-element-400 hover:text-element-800 dark:hover:text-element-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Back to Case Studies</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-element-900 to-element-700 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <FileQuestion className="h-64 w-64 -mt-10 -mr-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
              Case Study Not Found
            </h1>
            <p className="text-lg opacity-90 relative z-10">
              We couldn't locate the resource you're looking for
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-start mb-8">
              <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 mr-4">
                <Search className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Unable to Find This Case Study
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  The case study you're looking for might have been moved, renamed, or doesn't
                  exist.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  URL:{' '}
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {typeof window !== 'undefined' ? window.location.pathname : ''}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <Link href="/case-studies" className="flex-1">
                <TrackedButton
                  variant="default"
                  fullWidth={true}
                  className="group"
                  leftIcon={<Folder className="mr-2 h-5 w-5" />}
                  trackingEvent={{
                    name: 'not_found_browse_case_studies_click',
                    category: 'navigation',
                    label: 'browse_case_studies_from_404',
                  }}
                >
                  <span>Browse All Case Studies</span>
                </TrackedButton>
              </Link>

              <Link href="/contact" className="flex-1">
                <TrackedButton
                  variant="outline"
                  fullWidth={true}
                  className="group"
                  rightIcon={
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  }
                  trackingEvent={{
                    name: 'not_found_contact_click',
                    category: 'navigation',
                    label: 'contact_from_404',
                  }}
                >
                  <span>Contact Our Team</span>
                </TrackedButton>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Popular Case Studies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/case-studies/fintech-banking-platform"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-element-50 dark:hover:bg-element-900/30 border border-gray-100 dark:border-gray-700 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    Digital Banking Platform
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    FinTech transformation with 35% increased engagement
                  </div>
                </Link>

                <Link
                  href="/case-studies/healthcare-patient-portal"
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-element-50 dark:hover:bg-element-900/30 border border-gray-100 dark:border-gray-700 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    Healthcare Patient Portal
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Integrated solution improving patient satisfaction by 38%
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SolveJet. All rights reserved.
        </div>
      </div>
    </div>
  );
}
