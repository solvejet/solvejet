// src/app/(website)/case-studies/[slug]/components/CaseStudyCTA.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';
import { useCaseStudy } from './CaseStudyContext';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import type { JSX } from 'react';

export default function CaseStudyCTA(): JSX.Element {
  const { caseStudy } = useCaseStudy();
  const { trackEvent } = useAnalytics();

  // Animation ref and control
  const ctaRef = React.useRef<HTMLElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ctaRef, { once: false, amount: 0.3 });

  // Track CTA section view
  useEffect(() => {
    if (isInView) {
      void controls.start('visible');
      trackEvent({
        name: 'case_study_cta_view',
        category: 'engagement',
        label: 'cta_view',
        properties: {
          case_study_id: caseStudy.id,
          case_study_title: caseStudy.title,
        },
      });
    }
  }, [isInView, controls, trackEvent, caseStudy]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  // CTA text and destination based on case study
  const ctaText = caseStudy.nextSteps?.title ?? 'Ready to Transform Your Business?';
  const ctaDescription =
    caseStudy.nextSteps?.description ??
    'Let us help you leverage the latest technology to solve your business challenges and drive growth.';
  const ctaButtonText = caseStudy.nextSteps?.cta.label ?? 'Schedule a Consultation';
  const ctaButtonLink = caseStudy.nextSteps?.cta.href ?? '/contact';

  // Track CTA click
  const handleCtaClick = (): void => {
    trackEvent({
      name: 'case_study_cta_click',
      category: 'conversion',
      label: 'cta_button_click',
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        cta_text: ctaButtonText,
        cta_link: ctaButtonLink,
      },
    });
  };

  return (
    <motion.section
      ref={ctaRef}
      className="py-20 bg-element-900 text-white relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Accent circles */}
      <div
        className="absolute opacity-20 rounded-full -right-64 -top-64 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 85, 184, 0.4) 0%, rgba(0, 85, 184, 0) 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-element-900/70 via-transparent to-element-800/70"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <ExternalLink className="h-12 w-12 text-element-300 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{ctaText}</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">{ctaDescription}</p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                href={ctaButtonLink}
                onClick={handleCtaClick}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-element-900 font-medium text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <span>{ctaButtonText}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex items-center px-6 py-3 rounded-full bg-transparent text-white font-medium text-lg border border-white/30 hover:bg-white/10 transition-all duration-300"
                onClick={() => {
                  trackEvent({
                    name: 'case_study_browse_more_click',
                    category: 'navigation',
                    label: 'browse_more_case_studies',
                  });
                }}
              >
                Browse More Case Studies
              </Link>
            </motion.div>
          </div>

          {/* Additional resources */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-white/70 text-sm w-full text-center mb-2">Explore more resources:</p>
            {['White Papers', 'Blog Articles', 'Industry Reports', 'Success Stories'].map(
              (resource, i) => (
                <Link
                  key={i}
                  href={`/resources/${resource.toLowerCase().replace(' ', '-')}`}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white/90 transition-all duration-300"
                  onClick={() => {
                    trackEvent({
                      name: 'case_study_resource_click',
                      category: 'navigation',
                      label: `resource_${resource.toLowerCase().replace(' ', '_')}`,
                    });
                  }}
                >
                  {resource}
                </Link>
              )
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
