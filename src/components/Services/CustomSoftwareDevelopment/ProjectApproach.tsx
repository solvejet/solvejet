// src/components/Services/CustomSoftwareDevelopment/ProjectApproach.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Users, Code, Shield, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

interface ProjectApproachProps {
  className?: string;
}

export default function ProjectApproach({ className }: ProjectApproachProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Track section view on mount and handle visibility
  useEffect(() => {
    trackEvent({
      name: 'csd_approach_view',
      category: 'engagement',
      label: 'custom_software_development_approach',
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

  // Project approach cards
  const approachCards = [
    {
      id: 'collaborative',
      icon: <Users className="h-8 w-8" />,
      title: `Collaborative Partnership`,
      description: `We work as an extension of your team, ensuring transparent communication and regular feedback throughout the development process. Our collaborative approach ensures your vision is realized while maintaining alignment with business objectives.`,
    },
    {
      id: 'agile',
      icon: <Code className="h-8 w-8" />,
      title: `Agile Methodology`,
      description: `Our flexible, iterative approach adapts to evolving requirements while maintaining project momentum. We deliver value incrementally, allowing you to see progress early and respond effectively to changing priorities as your business needs evolve.`,
    },
    {
      id: 'security',
      icon: <Shield className="h-8 w-8" />,
      title: `Security-First Development`,
      description: `Security isn't an afterthought—it's integral to our development process. We implement industry best practices and rigorous testing protocols to ensure your application is fortified against vulnerabilities from the earliest stages of development.`,
    },
    {
      id: 'data',
      icon: <BarChart className="h-8 w-8" />,
      title: `Data-Driven Decisions`,
      description: `We leverage analytics and performance metrics to guide our development process. By collecting and analyzing relevant data throughout the project lifecycle, we ensure that every feature and optimization is validated by measurable outcomes rather than assumptions.`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="project-approach-section"
      className={cn('py-24 bg-gray-900 dark:bg-gray-900', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            className={cn(
              'text-4xl md:text-5xl font-normal text-white mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            Project Approaches
          </h2>
        </div>

        {/* Cards in a 2-per-row grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approachCards.map((card, index) => (
            <div
              key={card.id}
              className={cn(
                'bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 transition-all duration-500 border border-gray-700/50',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
                hoveredCard === card.id
                  ? 'border-element-500/50 bg-gray-800/70'
                  : 'hover:border-element-500/30 hover:bg-gray-800/60'
              )}
              style={{ transitionDelay: `${String(index * 100)}ms` }}
              onMouseEnter={() => {
                setHoveredCard(card.id);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Icon and Title */}
                <div className="md:col-span-3 flex flex-col items-start">
                  <div
                    className={cn(
                      'p-3 rounded-lg bg-element-500/10 text-element-500 mb-4 transition-all duration-300',
                      hoveredCard === card.id ? 'bg-element-500/20 scale-110' : ''
                    )}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 md:mb-0">{card.title}</h3>
                </div>

                {/* Description */}
                <div className="md:col-span-9">
                  <p className="text-gray-300 leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
