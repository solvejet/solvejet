// src/app/(website)/case-studies/[slug]/components/CaseStudyResults.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useCaseStudy } from './CaseStudyContext';
import { cn } from '@/lib/utils';
import { TrendingUp, Award, PieChart, ChevronRight, Check, ExternalLink } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import type { JSX } from 'react';

export default function CaseStudyResults(): JSX.Element {
  const { caseStudy, sectionRefs, visibleSections } = useCaseStudy();
  const { trackEvent } = useAnalytics();

  // Animation ref and control
  const resultsRef = React.useRef<HTMLElement>(null);
  const controls = useAnimation();
  const isInView = useInView(resultsRef, { once: false, amount: 0.2 });

  // Track results section view
  useEffect(() => {
    if (isInView) {
      void controls.start('visible');
      trackEvent({
        name: 'case_study_results_view',
        category: 'engagement',
        label: 'results_view',
        properties: {
          case_study_id: caseStudy.id,
          case_study_title: caseStudy.title,
        },
      });
    }
  }, [isInView, controls, trackEvent, caseStudy]);

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

  return (
    <section
      ref={resultsRef}
      className="py-20 bg-gradient-to-br from-element-900 to-element-700 text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          ref={sectionRefs.results}
          id="results"
          className={cn(
            'scroll-mt-20 transition-opacity duration-500',
            visibleSections.results ? 'opacity-100' : 'opacity-90'
          )}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-12">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm mr-4 border border-white/20">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Results & Impact</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-white/90 leading-relaxed">
              Our solution delivered exceptional results, exceeding client expectations and
              transforming their business operations. The implementation led to significant
              improvements in performance, efficiency, and user satisfaction.
            </p>
          </motion.div>

          {/* Key impact areas */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative overflow-hidden"
              whileHover={{
                y: -8,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Background accent */}
              <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-element-400/20 blur-xl"></div>

              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 mr-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Business Growth</h3>
              </div>
              <p className="text-white/80 mb-4">
                Accelerated market expansion and revenue growth through improved scalability and
                operational efficiency.
              </p>
              <div className="flex items-center text-element-300 mt-4 text-sm font-medium group">
                <span>45% increase in revenue</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative overflow-hidden"
              whileHover={{
                y: -8,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Background accent */}
              <div className="absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-yellow-400/20 blur-xl"></div>

              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 mr-3">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Customer Satisfaction</h3>
              </div>
              <p className="text-white/80 mb-4">
                Drastically improved user experience with faster response times and intuitive
                interfaces.
              </p>
              <div className="flex items-center text-element-300 mt-4 text-sm font-medium group">
                <span>92% customer satisfaction score</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative overflow-hidden"
              whileHover={{
                y: -8,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Background accent */}
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-green-400/20 blur-xl"></div>

              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-white/10 mr-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Operational Efficiency</h3>
              </div>
              <p className="text-white/80 mb-4">
                Streamlined workflows and automated processes reduced operational costs and resource
                requirements.
              </p>
              <div className="flex items-center text-element-300 mt-4 text-sm font-medium group">
                <span>32% reduction in operational costs</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          </motion.div>

          {/* Client ROI summary */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto mt-16 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Return on Investment</h3>
            <p className="text-white/90 mb-6 text-center">
              The client achieved full return on investment within 6 months, with ongoing benefits
              continuing to accrue over time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-5 transition-all duration-300 hover:bg-white/15 border border-white/5 hover:border-white/20">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-element-300" />
                  Quantitative Benefits
                </h4>
                <ul className="space-y-3 text-white/90">
                  {[
                    '45% increase in overall revenue',
                    '32% reduction in operational costs',
                    '85% decrease in system downtime',
                    '73% faster transaction processing',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-element-500/30 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                        <Check className="h-3 w-3 text-element-300" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-5 transition-all duration-300 hover:bg-white/15 border border-white/5 hover:border-white/20">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-element-300" />
                  Qualitative Benefits
                </h4>
                <ul className="space-y-3 text-white/90">
                  {[
                    'Improved employee satisfaction and productivity',
                    'Enhanced brand reputation and market positioning',
                    'Better strategic decision-making with data insights',
                    'Increased agility to respond to market changes',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-5 w-5 rounded-full bg-element-500/30 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                        <Check className="h-3 w-3 text-element-300" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
