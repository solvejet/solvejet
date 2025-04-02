// src/components/Services/MVPDevelopment/ProjectApproach.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Target, Gauge, Lightbulb, BarChart } from 'lucide-react';
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
      name: 'mvp_approach_view',
      category: 'engagement',
      label: 'mvp_development_approach',
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

  // Project approach cards - these are specific to MVP development
  const approachCards = [
    {
      id: 'lean',
      icon: <Target className="h-8 w-8" />,
      title: `Lean Startup Methodology`,
      description: `We embrace the build-measure-learn loop to minimize waste and maximize validated learning. By focusing on essential features that deliver core value, we help you quickly enter the market, gather feedback, and iterate based on real user data rather than assumptions.`,
    },
    {
      id: 'speed',
      icon: <Gauge className="h-8 w-8" />,
      title: `Speed to Market`,
      description: `In the competitive startup landscape, timing is crucial. Our accelerated development approach prioritizes getting your MVP into users' hands quickly without sacrificing quality. We achieve this through focused scope, rapid prototyping, and parallel workflow optimization.`,
    },
    {
      id: 'innovation',
      icon: <Lightbulb className="h-8 w-8" />,
      title: `Innovation-Focused`,
      description: `We help you identify and emphasize your product's unique value proposition and innovative elements. Our approach balances technical feasibility, business viability, and user desirability to create MVPs that stand out in the market while validating your core business assumptions.`,
    },
    {
      id: 'metrics',
      icon: <BarChart className="h-8 w-8" />,
      title: `Metrics-Driven Development`,
      description: `Every feature we build ties directly to measurable business outcomes. We establish clear key performance indicators before development begins and implement analytics throughout the MVP to capture critical user behavior data, enabling informed decisions for future iterations.`,
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
            Our MVP Approach
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
                  ? 'border-pink-500/50 bg-gray-800/70'
                  : 'hover:border-pink-500/30 hover:bg-gray-800/60'
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
                      'p-3 rounded-lg bg-pink-500/10 text-pink-500 mb-4 transition-all duration-300',
                      hoveredCard === card.id ? 'bg-pink-500/20 scale-110' : ''
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
