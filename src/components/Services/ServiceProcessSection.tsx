// src/components/Services/ServiceProcessSection.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { Lightbulb, Clipboard, Code, Zap, CheckCircle } from 'lucide-react';

interface ServiceProcessSectionProps {
  className?: string;
}

// Define process steps with consistent structure
const processList = [
  {
    id: 'discovery',
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Discovery & Planning',
    description:
      'We start by understanding your business needs, challenges, and goals to develop a comprehensive roadmap.',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    shadowColor: 'shadow-blue-500/10',
    highlights: [
      'In-depth requirements gathering',
      'Stakeholder interviews',
      'Technical feasibility analysis',
      'Strategic planning workshops',
    ],
  },
  {
    id: 'design',
    icon: <Clipboard className="h-8 w-8" />,
    title: 'Design & Architecture',
    description:
      'Our experts design a solution architecture tailored to your specific requirements and technical constraints.',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
    shadowColor: 'shadow-purple-500/10',
    highlights: [
      'System architecture blueprints',
      'UX/UI prototyping',
      'Technical specification documents',
      'Infrastructure planning',
    ],
  },
  {
    id: 'development',
    icon: <Code className="h-8 w-8" />,
    title: 'Development & Testing',
    description:
      'We build your solution using agile methodologies, with rigorous testing at every iteration for quality assurance.',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    borderColor: 'border-green-200 dark:border-green-800',
    shadowColor: 'shadow-green-500/10',
    highlights: [
      'Iterative development cycles',
      'Continuous integration',
      'Comprehensive QA processes',
      'Performance optimization',
    ],
  },
  {
    id: 'deployment',
    icon: <Zap className="h-8 w-8" />,
    title: 'Deployment & Support',
    description:
      'We ensure smooth deployment, with ongoing maintenance and support to keep your solutions running optimally.',
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-50 dark:hover:bg-amber-900/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
    shadowColor: 'shadow-amber-500/10',
    highlights: [
      'Seamless production deployment',
      'Comprehensive knowledge transfer',
      'Ongoing technical support',
      'Regular updates and improvements',
    ],
  },
];

export default function ServiceProcessSection({
  className,
}: ServiceProcessSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Track section view and animation
  useEffect(() => {
    // Track view
    trackEvent({
      name: 'process_section_view',
      category: 'engagement',
      label: 'process_section',
    });

    // Set section to visible immediately for better UI rendering
    setIsVisible(true);

    // Animation on scroll with IntersectionObserver
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          sectionObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    // Animation for cards on scroll - using standard approach
    const cardObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setAnimatedCards(prev => ({ ...prev, [index]: true }));
              cardObserver.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    cardsRef.current.forEach(card => {
      if (card) cardObserver.observe(card);
    });

    return (): void => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, [trackEvent]);

  return (
    <section
      ref={sectionRef}
      className={cn('py-24 bg-gray-50 dark:bg-gray-800 overflow-hidden', className)}
      id="services-process-section"
    >
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Section header */}
        <div
          className={cn(
            'text-center mb-20 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="text-md font-medium text-element-500 dark:text-element-400 inline-block mb-2">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
            How We Work
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Our structured yet flexible approach ensures we deliver high-quality solutions
            efficiently, while maintaining clear communication throughout the entire process.
          </p>
        </div>

        {/* Process steps with timeline */}
        <div className="relative">
          {/* Horizontal timeline connector (visible on larger screens) */}
          <div className="hidden lg:block absolute top-16 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700"></div>

          {/* Process cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processList.map((process, index) => (
              <div
                key={process.id}
                ref={el => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  // Base card styles
                  'relative bg-white dark:bg-gray-700 rounded-xl transition-all duration-500',
                  // Custom hover effects
                  process.hoverColor,
                  // Hover animation effects
                  'hover:shadow-xl hover:-translate-y-2',
                  process.shadowColor,
                  // Animation states
                  animatedCards[index] || isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12',
                  // Card border
                  'border border-gray-100 dark:border-gray-600'
                )}
                onMouseEnter={() => {
                  trackEvent({
                    name: 'process_card_hover',
                    category: 'engagement',
                    label: `process_${process.id}_hover`,
                  });
                }}
              >
                {/* Step number indicator */}
                <div
                  className={cn(
                    'absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all duration-300',
                    'border-4 border-gray-50 dark:border-gray-800',
                    process.color
                  )}
                >
                  <span className="text-lg font-semibold text-white">{index + 1}</span>
                </div>

                {/* Card content */}
                <div className="p-8 pt-10">
                  {/* Icon */}
                  <div
                    className={cn(
                      'h-16 w-16 rounded-2xl flex items-center justify-center mb-6 text-white',
                      process.color,
                      'transition-transform duration-300 hover:scale-105'
                    )}
                  >
                    {process.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {process.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{process.description}</p>

                  {/* Key highlights */}
                  <div className="space-y-3">
                    <h4 className={cn('font-medium text-sm', process.textColor)}>
                      Key Activities:
                    </h4>
                    <ul className="space-y-2">
                      {process.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle
                            className={cn(
                              'h-5 w-5 mt-0.5 mr-2 flex-shrink-0 transition-transform duration-300',
                              process.textColor
                            )}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div
          className={cn(
            'text-center mt-16 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="text-lg">
            Each project is unique, and our process can be tailored to accommodate your specific
            business needs, timeline, and budget considerations.
          </p>
        </div>
      </div>
    </section>
  );
}
