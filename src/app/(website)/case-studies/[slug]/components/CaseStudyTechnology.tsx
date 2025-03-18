// src/(website)/case-studies/[slug]/components/CaseStudyTechnology.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useCaseStudy } from './CaseStudyContext';
import { cn } from '@/lib/utils';
import { Code, Server, Database, Cloud, Cpu, Layers } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import type { JSX } from 'react';

export default function CaseStudyTechnology(): JSX.Element {
  const { caseStudy } = useCaseStudy();
  const { trackEvent } = useAnalytics();

  // Group technologies by category
  const groupedTechnologies = caseStudy.technologies.reduce<
    Record<string, typeof caseStudy.technologies>
  >((acc, tech) => {
    const category = tech.category ?? 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {});

  // Animation ref and control
  const techRef = React.useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(techRef, { once: false, amount: 0.3 });

  // Track tech stack view
  useEffect(() => {
    if (isInView) {
      void controls.start('visible');
      trackEvent({
        name: 'case_study_tech_stack_view',
        category: 'engagement',
        label: 'tech_stack_view',
        properties: {
          case_study_id: caseStudy.id,
          case_study_title: caseStudy.title,
          tech_count: caseStudy.technologies.length,
        },
      });
    }
  }, [isInView, controls, trackEvent, caseStudy]);

  // Category icons
  const getCategoryIcon = (category: string): JSX.Element => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Code className="h-5 w-5" />;
      case 'backend':
        return <Server className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'infrastructure':
      case 'cloud':
        return <Cloud className="h-5 w-5" />;
      case 'devops':
        return <Layers className="h-5 w-5" />;
      default:
        return <Cpu className="h-5 w-5" />;
    }
  };

  // Category colors
  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'backend':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'database':
        return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'infrastructure':
      case 'cloud':
        return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'devops':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'ai/ml':
        return 'text-indigo-600 bg-indigo-100 border-indigo-200';
      default:
        return 'text-element-600 bg-element-100 border-element-200';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  // Tech item click handler
  const handleTechClick = (tech: { name: string; category?: string }): void => {
    trackEvent({
      name: 'case_study_tech_click',
      category: 'engagement',
      label: 'tech_click',
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        tech_name: tech.name,
        tech_category: tech.category,
      },
    });
  };

  return (
    <motion.div
      ref={techRef}
      id="technology"
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Cpu className="h-5 w-5 mr-2 text-element-500" />
        Technology Stack
      </h3>

      <div className="space-y-6">
        {Object.entries(groupedTechnologies).map(([category, techs]) => (
          <motion.div key={category} variants={itemVariants}>
            <div className="flex items-center mb-4">
              <div
                className={cn(
                  'h-8 w-8 rounded-lg flex items-center justify-center mr-3',
                  getCategoryColor(category)
                )}
              >
                {getCategoryIcon(category)}
              </div>
              <h4 className="font-medium text-gray-800">{category}</h4>
            </div>

            <div className="flex flex-wrap gap-2 ml-2">
              {techs.map((tech, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    'px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium',
                    'text-gray-700 transition-all duration-300',
                    'hover:bg-element-50 hover:border-element-300 hover:text-element-700',
                    'hover:shadow-sm hover:-translate-y-0.5'
                  )}
                  whileHover={{
                    y: -2,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  whileTap={{ y: 0 }}
                  onClick={() => {
                    handleTechClick(tech);
                  }}
                >
                  {tech.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-element-50 rounded-lg border border-element-100">
        <h4 className="font-medium text-element-700 mb-2">Why These Technologies?</h4>
        <p className="text-sm text-element-600">
          This stack was carefully selected for its scalability, performance, and long-term
          maintainability. It provides the perfect balance of cutting-edge capabilities and
          enterprise-grade reliability needed to address the client's specific challenges.
        </p>
      </div>
    </motion.div>
  );
}
