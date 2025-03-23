// src/components/Home/CaseStudySection.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { CaseStudy } from '@/types/case-study';

interface CaseStudySectionProps {
  caseStudies: CaseStudy[];
  className?: string;
}

const CaseStudyCard: React.FC<{
  caseStudy: CaseStudy;
  index: number;
}> = ({ caseStudy, index }) => {
  const { trackEvent } = useAnalytics();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (): void => {
    trackEvent({
      name: 'case_study_card_click',
      category: 'engagement',
      label: `case_study_${caseStudy.slug}`,
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        case_study_industry: caseStudy.industry,
      },
    });
  };

  return (
    <div
      ref={cardRef}
      id={`case-study-${caseStudy.id}`}
      className="w-full mb-12 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg"
    >
      {/* Card layout - with image on left for desktop, top for mobile */}
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800">
        {/* Image section - 40% width on desktop, full width on mobile */}
        <div className="md:w-2/5 h-80 md:h-auto relative">
          <Image
            src={caseStudy.coverImage.src}
            alt={caseStudy.coverImage.alt}
            width={600}
            height={450}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            quality={70}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:from-black/70 md:via-black/40 md:to-transparent" />

          {/* Industry badge positioned on the image */}
          <div className="absolute top-6 left-6 px-4 py-1.5 bg-element-500 text-white text-sm font-medium rounded-full">
            {caseStudy.industry}
          </div>
        </div>

        {/* Content section - 60% width on desktop, full width on mobile */}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              {caseStudy.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 text-base">{caseStudy.overview}</p>

            {/* Challenge & Solution Summary */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    The Challenge
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Our Solution
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Results metrics in a row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {caseStudy.results.metrics.slice(0, 4).map((metric, idx) => (
                <div key={idx} className="flex flex-col p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <span className="text-2xl font-bold text-element-500">{metric.value}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href={`/case-studies/${caseStudy.slug}`}>
              <TrackedButton
                variant="default"
                className="mt-2"
                rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
                trackingEvent={{
                  name: 'case_study_read_more_click',
                  category: 'navigation',
                  label: `case_study_${caseStudy.slug}_read_more`,
                  properties: {
                    case_study_id: caseStudy.id,
                    case_study_title: caseStudy.title,
                  },
                }}
                onClick={handleCardClick}
              >
                Read Full Case Study
              </TrackedButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CaseStudySection({
  caseStudies,
  className,
}: CaseStudySectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const sectionRef = useRef<HTMLElement>(null);

  // Limit to only 4 case studies
  const limitedCaseStudies = caseStudies.slice(0, 4);

  // Track section view
  useEffect(() => {
    trackEvent({
      name: 'case_study_section_view',
      category: 'engagement',
      label: 'case_study_section',
      properties: {
        case_study_count: limitedCaseStudies.length,
        industries: limitedCaseStudies.map(cs => cs.industry).join(','),
      },
    });
  }, [trackEvent, limitedCaseStudies]);

  return (
    <section
      ref={sectionRef}
      className={cn('py-16 bg-gray-50 dark:bg-gray-900', className)}
      id="case-studies-section"
    >
      {/* Section header */}
      <div className="container mx-auto px-4 max-w-[95rem] mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="max-w-2xl mb-8 md:mb-0">
            <span className="text-md font-medium text-element-500 dark:text-element-400 inline-block mb-2">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
              Case Studies
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore how we've helped businesses across industries achieve their goals with our
              innovative solutions.
            </p>
          </div>

          <Link href="/case-studies">
            <TrackedButton
              variant="default"
              rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
              trackingEvent={{
                name: 'view_all_case_studies_click',
                category: 'navigation',
                label: 'view_all_case_studies',
              }}
            >
              View All Case Studies
            </TrackedButton>
          </Link>
        </div>
      </div>

      {/* Vertical stack of case study cards - limited to 4 */}
      <div className="container mx-auto px-4 max-w-[95rem]">
        {limitedCaseStudies.map((caseStudy, index) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
        ))}
      </div>

      {/* Call to action */}
      <div className="container mx-auto px-4 max-w-[95rem] mt-8 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Ready to create your own success story?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <TrackedButton
              rightIcon={<ArrowRight className="ml-2 h-4 w-4" />}
              trackingEvent={{
                name: 'contact_us_click',
                category: 'conversion',
                label: 'case_studies_contact_us',
              }}
              className="bg-element-500 hover:bg-element-600 text-white"
            >
              Contact Us
            </TrackedButton>
          </Link>
          <Link href="/case-studies">
            <TrackedButton
              variant="outline"
              rightIcon={<ExternalLink className="ml-2 h-4 w-4" />}
              className="border-element-500 text-element-500 hover:bg-element-500 hover:text-white dark:border-element-400 dark:text-element-400 dark:hover:bg-element-600"
              trackingEvent={{
                name: 'more_case_studies_click',
                category: 'navigation',
                label: 'more_case_studies',
              }}
            >
              Explore More Case Studies
            </TrackedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
