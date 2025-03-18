'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useCaseStudy } from './CaseStudyContext';
import type { JSX } from 'react';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

export default function RelatedCaseStudies(): JSX.Element {
  const { relatedCaseStudies, caseStudy } = useCaseStudy();
  const { trackEvent } = useAnalytics();

  // Skip rendering if no related case studies
  if (relatedCaseStudies.length === 0) {
    return <></>;
  }

  // Animation ref and control
  const relatedRef = React.useRef(null);
  const controls = useAnimation();
  const isInView = useInView(relatedRef, { once: false, amount: 0.2 });

  // Track related case studies section view
  useEffect(() => {
    if (isInView) {
      void controls.start('visible');
      trackEvent({
        name: 'case_study_related_view',
        category: 'engagement',
        label: 'related_case_studies_view',
        properties: {
          case_study_id: caseStudy.id,
          case_study_title: caseStudy.title,
          related_count: relatedCaseStudies.length,
        },
      });
    }
  }, [isInView, controls, trackEvent, caseStudy, relatedCaseStudies.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  // Track case study click
  interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    coverImage: {
      src: string;
      alt: string;
    };
    industry: string;
  }

  const handleCaseStudyClick = (study: CaseStudy): void => {
    trackEvent({
      name: 'case_study_related_click',
      category: 'navigation',
      label: `related_case_study_click_${study.slug}`,
      properties: {
        source_case_study_id: caseStudy.id,
        target_case_study_id: study.id,
        target_case_study_title: study.title,
      },
    });
  };

  return (
    <section ref={relatedRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Case Studies</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover more success stories from our portfolio of innovative solutions across
              industries.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {relatedCaseStudies.map(study => (
              <Link
                key={study.id}
                href={`/case-studies/${study.slug}`}
                onClick={() => {
                  handleCaseStudyClick(study);
                }}
                className="group block h-full"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-element-200">
                  <div className="aspect-video relative">
                    <Image
                      src={study.coverImage.src}
                      alt={study.coverImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {study.industry}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-element-600 transition-colors duration-300">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">{study.subtitle}</p>

                    <div className="flex items-center text-element-500 font-medium mt-auto group-hover:text-element-600 transition-colors duration-300">
                      <span>View Case Study</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-element-600 font-medium hover:text-element-800 transition-colors"
              onClick={() => {
                trackEvent({
                  name: 'case_study_view_all_click',
                  category: 'navigation',
                  label: 'view_all_case_studies',
                  properties: {
                    source_case_study_id: caseStudy.id,
                  },
                });
              }}
            >
              <span>View All Case Studies</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
