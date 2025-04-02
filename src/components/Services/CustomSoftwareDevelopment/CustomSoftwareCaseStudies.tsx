// src/components/Services/CustomSoftwareDevelopment/CustomSoftwareCaseStudies.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { CaseStudy } from '@/types/case-study';
import { getAllCaseStudies } from '@/data/case-studies';

interface CustomSoftwareCaseStudiesProps {
  className?: string;
}

export default function CustomSoftwareCaseStudies({
  className,
}: CustomSoftwareCaseStudiesProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    // Filter case studies to show relevant ones for custom software development
    // Ideally this would be filtered by tag or category, but for now we'll take a few relevant ones
    const allCaseStudies = getAllCaseStudies();
    const relevantCaseStudies = allCaseStudies.slice(0, 2); // Just show 2 case studies for this section
    setCaseStudies(relevantCaseStudies);

    // Track view event
    trackEvent({
      name: 'csd_case_studies_view',
      category: 'engagement',
      label: 'custom_software_development_case_studies',
    });

    // Set up intersection observer for animation triggers
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [trackEvent]);

  return (
    <section
      ref={sectionRef}
      id="case-studies-section"
      className={cn('py-24 bg-white dark:bg-gray-800', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          <div
            className={cn(
              'transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 dark:text-white mb-6 tracking-tight">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 leading-relaxed max-w-3xl">
              Explore how we've helped businesses across industries transform their operations with
              custom software solutions designed to address their unique challenges.
            </p>
          </div>
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {caseStudies.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className={cn(
                'bg-gray-50 dark:bg-gray-700 rounded-3xl overflow-hidden shadow-md transition-all duration-700 hover:shadow-xl transform hover:-translate-y-1',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${String(index * 200)}ms` }}
            >
              {/* Card layout with image on top */}
              <div className="flex flex-col h-full">
                {/* Image section */}
                <div className="w-full h-64 relative">
                  <Image
                    src={caseStudy.coverImage.src}
                    alt={caseStudy.coverImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Industry badge positioned on the image */}
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-element-500 text-white text-sm font-medium rounded-full">
                    {caseStudy.industry}
                  </div>
                </div>

                {/* Content section */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {caseStudy.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                    {caseStudy.overview}
                  </p>

                  {/* Results summary */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {caseStudy.results.metrics.slice(0, 2).map((metric, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-element-500">{metric.value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={`/case-studies/${caseStudy.slug}`} className="mt-auto">
                    <TrackedButton
                      variant="default"
                      rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                      trackingEvent={{
                        name: 'csd_case_study_click',
                        category: 'navigation',
                        label: `case_study_${caseStudy.slug}`,
                        properties: {
                          case_study_id: caseStudy.id,
                          case_study_title: caseStudy.title,
                        },
                      }}
                    >
                      Read Full Case Study
                    </TrackedButton>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Case Studies button */}
        <div className="mt-12 text-center">
          <Link href="/case-studies">
            <TrackedButton
              variant="outline"
              rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
              className="border-element-500 text-element-500 hover:bg-element-500 hover:text-white"
              trackingEvent={{
                name: 'view_all_case_studies_click',
                category: 'navigation',
                label: 'view_all_case_studies_from_csd',
              }}
            >
              View All Case Studies
            </TrackedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
