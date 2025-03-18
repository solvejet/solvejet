'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useCaseStudy } from './CaseStudyContext';
import { FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import type { JSX } from 'react';

export default function CaseStudyContent(): JSX.Element {
  const { caseStudy, sectionRefs, visibleSections, animationComplete, completeAnimation } =
    useCaseStudy();
  const { trackEvent } = useAnalytics();

  // Control animation timing for each section
  const overviewControls = useAnimation();
  const challengeControls = useAnimation();
  const approachControls = useAnimation();

  // Check if sections are in view
  const isOverviewInView = useInView(sectionRefs.overview, { once: false, amount: 0.3 });
  const isChallengeInView = useInView(sectionRefs.challenge, { once: false, amount: 0.3 });
  const isApproachInView = useInView(sectionRefs.approach, { once: false, amount: 0.3 });

  // Trigger animations when sections come into view
  useEffect(() => {
    if (isOverviewInView) {
      void overviewControls.start('visible');
      if (!animationComplete.overview) {
        trackEvent({
          name: 'case_study_section_view',
          category: 'engagement',
          label: 'overview_section_view',
          properties: {
            case_study_id: caseStudy.id,
            case_study_title: caseStudy.title,
            section: 'overview',
          },
        });
        completeAnimation('overview');
      }
    }
  }, [
    isOverviewInView,
    overviewControls,
    animationComplete.overview,
    trackEvent,
    caseStudy,
    completeAnimation,
  ]);

  useEffect(() => {
    if (isChallengeInView) {
      void challengeControls.start('visible');
      if (!animationComplete.challenge) {
        trackEvent({
          name: 'case_study_section_view',
          category: 'engagement',
          label: 'challenge_section_view',
          properties: {
            case_study_id: caseStudy.id,
            case_study_title: caseStudy.title,
            section: 'challenge',
          },
        });
        completeAnimation('challenge');
      }
    }
  }, [
    isChallengeInView,
    challengeControls,
    animationComplete.challenge,
    trackEvent,
    caseStudy,
    completeAnimation,
  ]);

  useEffect(() => {
    if (isApproachInView) {
      void approachControls.start('visible');
      if (!animationComplete.approach) {
        trackEvent({
          name: 'case_study_section_view',
          category: 'engagement',
          label: 'approach_section_view',
          properties: {
            case_study_id: caseStudy.id,
            case_study_title: caseStudy.title,
            section: 'approach',
          },
        });
        completeAnimation('approach');
      }
    }
  }, [
    isApproachInView,
    approachControls,
    animationComplete.approach,
    trackEvent,
    caseStudy,
    completeAnimation,
  ]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-16 mb-16">
      {/* Overview Section */}
      <motion.section
        ref={sectionRefs.overview}
        id="overview"
        className={cn(
          'scroll-mt-32 py-8 transition-opacity duration-500',
          visibleSections.overview ? 'opacity-100' : 'opacity-70'
        )}
        variants={containerVariants}
        initial="hidden"
        animate={overviewControls}
      >
        <motion.div variants={itemVariants} className="flex items-center mb-6">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-4">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-element-50 p-6 rounded-lg shadow-sm border border-blue-100"
        >
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
            <p className="text-lg leading-relaxed text-gray-700">{caseStudy.overview}</p>

            {/* Project overview infographic - simplified for clarity */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry</h3>
                <p className="text-gray-700">{caseStudy.industry}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h3>
                <p className="text-gray-700">6 Months</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Focus</h3>
                <p className="text-gray-700">Digital Transformation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Challenge Section */}
      <motion.section
        ref={sectionRefs.challenge}
        id="challenge"
        className={cn(
          'scroll-mt-20 py-8 transition-opacity duration-500',
          visibleSections.challenge ? 'opacity-100' : 'opacity-70'
        )}
        variants={containerVariants}
        initial="hidden"
        animate={challengeControls}
      >
        <motion.div variants={itemVariants} className="flex items-center mb-6">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mr-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">The Challenge</h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8"
        >
          <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
        </motion.div>

        {/* Key challenges grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold">Legacy System Constraints</h3>
            </div>
            <p className="text-gray-600">
              Outdated architecture that couldn't scale with growing business needs and imposed
              significant technical debt.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold">Data Silos</h3>
            </div>
            <p className="text-gray-600">
              Critical information fragmented across multiple disconnected systems making unified
              analysis impossible.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold">Performance Bottlenecks</h3>
            </div>
            <p className="text-gray-600">
              Slow response times affecting user experience and causing operational inefficiencies.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold">Security Vulnerabilities</h3>
            </div>
            <p className="text-gray-600">
              Outdated security protocols exposing sensitive data to potential breaches.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Approach Section */}
      <motion.section
        ref={sectionRefs.approach}
        id="approach"
        className={cn(
          'scroll-mt-20 py-8 transition-opacity duration-500',
          visibleSections.approach ? 'opacity-100' : 'opacity-70'
        )}
        variants={containerVariants}
        initial="hidden"
        animate={approachControls}
      >
        <motion.div variants={itemVariants} className="flex items-center mb-6">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mr-4">
            <Lightbulb className="h-6 w-6 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Our Approach</h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl mb-10 border border-yellow-100"
        >
          <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.approach}</p>
        </motion.div>

        {/* Timeline visualization */}
        <motion.div
          variants={itemVariants}
          className="relative border-l-2 border-yellow-500 pl-8 ml-6 mt-16"
        >
          {/* Timeline items */}
          <div className="mb-12 relative">
            <div className="absolute -left-14 top-0 h-8 w-8 rounded-full bg-yellow-500 border-4 border-white flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Discovery & Analysis</h3>
            <p className="text-gray-600">
              Comprehensive assessment of existing systems, business processes, and stakeholder
              requirements.
            </p>
          </div>

          <div className="mb-12 relative">
            <div className="absolute -left-14 top-0 h-8 w-8 rounded-full bg-yellow-500 border-4 border-white flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Solution Architecture</h3>
            <p className="text-gray-600">
              Design of a modern, scalable architecture to meet current and future needs.
            </p>
          </div>

          <div className="mb-12 relative">
            <div className="absolute -left-14 top-0 h-8 w-8 rounded-full bg-yellow-500 border-4 border-white flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Agile Implementation</h3>
            <p className="text-gray-600">
              Iterative delivery with two-week sprints and regular feedback loops to ensure
              alignment with objectives.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-14 top-0 h-8 w-8 rounded-full bg-yellow-500 border-4 border-white flex items-center justify-center">
              <span className="text-white font-bold">4</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Optimization</h3>
            <p className="text-gray-600">
              Ongoing refinements based on performance metrics and user feedback to ensure maximum
              ROI.
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
