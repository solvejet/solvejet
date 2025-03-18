// src/app/(website)/case-studies/[slug]/components/CaseStudyHero.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCaseStudy } from './CaseStudyContext';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { cn } from '@/lib/utils';
import type { JSX } from 'react';

export default function CaseStudyHero(): JSX.Element {
  const { caseStudy, sectionRefs } = useCaseStudy();
  const { trackEvent } = useAnalytics();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const totalScroll = docHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to overview section
  const scrollToOverview = (): void => {
    if (sectionRefs.overview.current) {
      sectionRefs.overview.current.scrollIntoView({ behavior: 'smooth' });
    }
    trackEvent({
      name: 'case_study_scroll_to_overview',
      category: 'engagement',
      label: 'scroll_to_overview',
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
      },
    });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-element-900 pt-32 pb-24 lg:pt-36 lg:pb-28">
      {/* Fixed progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-element-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${String(scrollProgress)}%` }}
        aria-hidden="true"
      />

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
        className="absolute opacity-20 rounded-full -left-64 -top-64 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 85, 184, 0.4) 0%, rgba(0, 85, 184, 0) 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute opacity-20 rounded-full -right-64 bottom-0 w-[500px] h-[500px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 204, 0, 0.4) 0%, rgba(255, 204, 0, 0) 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Navigation and date row */}
        <motion.div
          className="flex flex-wrap items-center justify-between mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center text-white/80 hover:text-white transition-all duration-300 group mb-4 md:mb-0 py-2 px-4 rounded-lg hover:bg-white/5"
            onClick={() => {
              trackEvent({
                name: 'case_study_back_to_list_click',
                category: 'navigation',
                label: 'back_to_case_studies',
                properties: {
                  case_study_id: caseStudy.id,
                  case_study_title: caseStudy.title,
                },
              });
            }}
          >
            <ChevronLeft className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Case Studies</span>
          </Link>

        </motion.div>

        {/* Industry badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-element-500/20 text-element-300 rounded-full border border-element-400/20 backdrop-blur-sm">
            <span className="text-sm font-medium">{caseStudy.industry}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <motion.div
            className="flex flex-col"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-semibold text-white mb-8 leading-tight"
              variants={fadeInUp}
            >
              {caseStudy.title}
            </motion.h1>

            <motion.p className="text-xl text-white/80 text-medium mb-8 leading-relaxed" variants={fadeInUp}>
              {caseStudy.subtitle}
            </motion.p>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transform transition-all duration-300 hover:border-element-400/30 hover:bg-element-900/20"
              variants={fadeInUp}
            >
              <p className="text-white/90 leading-relaxed">{caseStudy.overview}</p>
            </motion.div>

            <motion.button
              className="text-white flex items-center justify-center gap-2 mt-10 group max-w-max mx-auto lg:mx-0 py-3 px-6 rounded-lg bg-element-500/20 border border-element-400/30 backdrop-blur-sm transition-all duration-300 hover:bg-element-500/30"
              onClick={scrollToOverview}
              variants={fadeInUp}
              whileHover={{ y: 3 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explore Case Study</span>
              <ArrowDown className="h-5 w-5 group-hover:animate-bounce" />
            </motion.button>
          </motion.div>

          {/* Hero image with metrics overlay */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <div
              className={cn(
                'aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500',
                'hover:scale-[1.02] hover:shadow-element-500/30'
              )}
            >
              <Image
                src={caseStudy.coverImage.src}
                alt={caseStudy.coverImage.alt}
                width={caseStudy.coverImage.width}
                height={caseStudy.coverImage.height}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-80"></div>
            </div>

            {/* Key metrics highlights */}
            {caseStudy.results.metrics.slice(0, 2).map((metric, index) => (
              <motion.div
                key={index}
                className={cn(
                  'absolute bg-white rounded-full p-3 shadow-xl flex flex-col items-center justify-center text-center',
                  'transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1',
                  index === 0
                    ? '-top-4 -left-4 z-10 h-24 w-24'
                    : '-bottom-4 -right-4 z-10 h-28 w-28'
                )}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              >
                <div
                  className={cn(
                    'text-2xl font-bold',
                    metric.value.includes('+') ? 'text-green-600' : 'text-element-600'
                  )}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 mt-1 px-1">
                  {metric.label.split(' ').slice(0, 2).join(' ')}
                </div>
              </motion.div>
            ))}

            {/* Success indicator badge */}
            <motion.div
              className="absolute top-4 right-4 bg-green-500/90 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="h-2 w-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Success Story
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
