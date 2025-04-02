// src/components/Services/MVPDevelopment/ProjectStages.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Brush,
  Code,
  Gauge,
  Rocket,
  LineChart,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectStagesProps {
  className?: string;
}

export default function ProjectStages({ className }: ProjectStagesProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Track section view on mount and handle visibility
  useEffect(() => {
    trackEvent({
      name: 'mvp_stages_view',
      category: 'engagement',
      label: 'mvp_development_stages',
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

  // Auto-rotate through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev < 6 ? prev + 1 : 1));
    }, 6000);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  const handleStepClick = (step: number): void => {
    setActiveStep(step);

    // Add animation to details panel
    if (detailsRef.current) {
      detailsRef.current.classList.add('animate-pulse-once');
      setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.classList.remove('animate-pulse-once');
        }
      }, 300);
    }

    trackEvent({
      name: 'mvp_stages_step_click',
      category: 'engagement',
      label: `stages_step_${String(step)}`,
    });
  };

  // MVP-specific step details with more engaging content
  const stepDetails: {
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    number: string;
    title: string;
    description: string;
    image: string;
    bulletPoints: string[];
    outcomes: { icon: React.ReactNode; text: string }[];
  }[] = [
    {
      icon: <Search className="h-6 w-6" />,
      color: 'from-pink-600 to-pink-400',
      bgColor: 'bg-pink-50 dark:bg-pink-900/10',
      number: '01',
      title: 'Discovery & Validation',
      description:
        'We help you validate your idea through market research, competitor analysis, and user interviews. This critical phase ensures we`re building an MVP that solves real problems for your target audience.',
      image: '/images/services/discovery-phase.webp',
      bulletPoints: [
        'Problem statement definition and refinement',
        'Target user identification and persona development',
        'Market analysis and competitive landscaping',
        'Value proposition crystallization',
      ],
      outcomes: [
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Validated business concept' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Clear user persona profiles' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Defined MVP success metrics' },
      ],
    },
    {
      icon: <Brush className="h-6 w-6" />,
      color: 'from-indigo-600 to-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/10',
      number: '02',
      title: 'Feature Prioritization & Design',
      description:
        'We identify the core features that deliver maximum value with minimum development effort. Our design process focuses on creating intuitive workflows that highlight your product`s unique value proposition.',
      image: '/images/services/planning-architecture.webp',
      bulletPoints: [
        'Feature prioritization with MoSCoW methodology',
        'User journey mapping and storyboarding',
        'Low-fidelity wireframing and rapid prototyping',
        'Interactive mockups and usability testing',
      ],
      outcomes: [
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Focused MVP feature set' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'User-validated UI/UX designs' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Technical feasibility assessment' },
      ],
    },
    {
      icon: <Code className="h-6 w-6" />,
      color: 'from-cyan-600 to-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
      number: '03',
      title: 'Rapid Development',
      description:
        'Using agile methodologies and modern tech stacks, we build your MVP with a focus on speed and quality. Our iterative approach allows for continuous feedback and adjustments throughout the development process.',
      image: '/images/services/development-phase.webp',
      bulletPoints: [
        'Technology stack selection optimized for speed',
        'Sprint-based development with weekly demos',
        'Continuous integration and automated testing',
        'Technical debt management and documentation',
      ],
      outcomes: [
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Functioning product within weeks' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Scalable, maintainable codebase' },
        {
          icon: <ChevronRight className="h-4 w-4" />,
          text: 'Comprehensive development documentation',
        },
      ],
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      number: '04',
      title: 'Testing & Quality Assurance',
      description:
        'We ensure your MVP works flawlessly across devices and use cases. Our QA process combines automated testing with real user feedback to catch issues before launch.',
      image: '/images/services/quality-assurance.webp',
      bulletPoints: [
        'Functional and non-functional testing',
        'Cross-browser and device compatibility checks',
        'Performance optimization and load testing',
        'Beta testing with real users',
      ],
      outcomes: [
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Bug-free user experience' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Performance-optimized application' },
        {
          icon: <ChevronRight className="h-4 w-4" />,
          text: 'Pre-launch user feedback and improvements',
        },
      ],
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      color: 'from-amber-600 to-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/10',
      number: '05',
      title: 'Launch & User Acquisition',
      description:
        'We help you deploy your MVP and implement strategies to attract early adopters. Our launch approach focuses on creating momentum and generating valuable user feedback from day one.',
      image: '/images/services/deployment-launch.webp',
      bulletPoints: [
        'Deployment to production environments',
        'Analytics and monitoring setup',
        'Launch marketing strategy implementation',
        'Early adopter onboarding and support',
      ],
      outcomes: [
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Successfully deployed MVP' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Initial user base acquisition' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Data collection infrastructure' },
      ],
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10',
      number: '06',
      title: 'Measure & Iterate',
      description:
        'We help you analyze user data and feedback to identify improvement opportunities. This feedback loop drives the roadmap for future iterations, ensuring your product evolves based on real user needs.',
      image: '/images/services/maintenance-evolution.webp',
      bulletPoints: [
        'Key metrics tracking and analysis',
        'User feedback collection and synthesis',
        'Feature performance evaluation',
        'Roadmap planning for next iterations',
      ],
      outcomes: [
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Data-driven insights report' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Validated/invalidated assumptions' },
        { icon: <ChevronRight className="h-4 w-4" />, text: 'Prioritized enhancement roadmap' },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="project-approach-section"
      className={cn('py-24 bg-white dark:bg-gray-900 overflow-hidden', className)}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-7xl sm:ml-0 ml-0 md:pt-0">
          {/* Enhanced header with fade-up animation */}
          <div
            className={cn(
              'transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 dark:text-white mb-6 tracking-tight">
              MVP Development Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 leading-relaxed max-w-3xl">
              We follow a streamlined, focused process specifically designed for MVPs that
              prioritizes speed to market while maintaining product quality and gathering actionable
              user feedback.
            </p>
          </div>
        </div>

        {/* Improved timeline with animated indicator */}
        <div
          ref={timelineRef}
          className={cn(
            'relative mb-20 transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Timeline bar with gradient highlight for active segment */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-400 transition-all duration-500 ease-out"
              style={{
                width: `${((activeStep / 6) * 100).toString()}%`,
              }}
            />
          </div>

          <div className="relative flex justify-between">
            {stepDetails.map((step, index) => (
              <div
                key={index}
                className={cn(
                  'relative z-10 flex flex-col items-center cursor-pointer group transition-all duration-300',
                  activeStep === index + 1 ? 'scale-110' : 'hover:scale-105'
                )}
                onClick={() => {
                  handleStepClick(index + 1);
                }}
              >
                {/* Enhanced circle with gradient and animation */}
                <div
                  className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg',
                    activeStep === index + 1
                      ? `bg-gradient-to-br ${step.color} text-white scale-110`
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'
                  )}
                >
                  {/* Pulsing ring animation for active step */}
                  {activeStep === index + 1 && (
                    <span className="absolute w-full h-full rounded-full animate-ping opacity-30 bg-gradient-to-br from-pink-500 to-purple-400" />
                  )}
                  {step.icon}
                </div>

                <div
                  className={cn(
                    'mt-4 text-center transition-all duration-300',
                    activeStep === index + 1
                      ? 'opacity-100 scale-100'
                      : 'opacity-70 scale-95 group-hover:opacity-100'
                  )}
                >
                  <div className="text-sm font-medium text-pink-600 dark:text-pink-400">
                    Phase {step.number}
                  </div>
                  <h3
                    className={cn(
                      'text-lg font-medium transition-all duration-300',
                      activeStep === index + 1
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Enhanced active indicator with slide animation */}
                <div
                  className={cn(
                    'absolute -bottom-8 left-1/2 w-8 h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r',
                    activeStep === index + 1
                      ? 'from-pink-500 to-purple-400 scale-100 opacity-100'
                      : 'from-transparent to-transparent scale-0 opacity-0'
                  )}
                  style={{ transform: 'translateX(-50%)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Active step details with enhanced layout and animations */}
        <div
          ref={detailsRef}
          className={cn(
            'transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Left column: Details (expanded to 3/5) */}
            <div className="lg:col-span-3">
              <div
                className={cn(
                  'rounded-2xl overflow-hidden transition-all duration-500 ease-out transform hover:shadow-xl h-full',
                  stepDetails[activeStep - 1]?.bgColor
                )}
              >
                {/* Content wrapper with padding */}
                <div className="p-8 md:p-10 h-full flex flex-col">
                  {/* Phase indicator with gradient text */}
                  <div
                    className={cn(
                      'text-lg font-medium mb-3 bg-gradient-to-r bg-clip-text text-transparent',
                      stepDetails[activeStep - 1]?.color
                    )}
                  >
                    Phase {stepDetails[activeStep - 1]?.number ?? ''}
                  </div>

                  {/* Title with animation */}
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-300">
                    {stepDetails[activeStep - 1]?.title ?? ''}
                  </h3>

                  {/* Description with enhanced typography */}
                  <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    {stepDetails[activeStep - 1]?.description ?? ''}
                  </p>

                  {/* Key Activities with improved visuals */}
                  <div className="space-y-6 mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-400 flex items-center justify-center text-white mr-3">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                      Key Activities
                    </h4>

                    {/* Bullet points with hover effect */}
                    <ul className="space-y-3 pl-4">
                      {stepDetails[activeStep - 1]?.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start group">
                          <div className="mr-3 p-2 rounded-full transition-all duration-300 group-hover:scale-110">
                            <ChevronRight
                              className={cn(
                                'h-5 w-5 transition-all duration-300 group-hover:text-pink-500',
                                stepDetails[activeStep - 1]?.color.includes('pink')
                                  ? 'text-pink-600 dark:text-pink-400'
                                  : stepDetails[activeStep - 1]?.color.includes('indigo')
                                  ? 'text-indigo-600 dark:text-indigo-400'
                                  : stepDetails[activeStep - 1]?.color.includes('cyan')
                                  ? 'text-cyan-600 dark:text-cyan-400'
                                  : stepDetails[activeStep - 1]?.color.includes('green')
                                  ? 'text-green-600 dark:text-green-400'
                                  : stepDetails[activeStep - 1]?.color.includes('amber')
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-purple-600 dark:text-purple-400'
                              )}
                            />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes section */}
                  <div className="space-y-6 mb-8">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-400 flex items-center justify-center text-white mr-3">
                        <Rocket className="h-4 w-4" />
                      </span>
                      Deliverables
                    </h4>

                    {/* Outcome items with improved layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {stepDetails[activeStep - 1]?.outcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center mr-3',
                                stepDetails[activeStep - 1]?.color.includes('pink')
                                  ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
                                  : stepDetails[activeStep - 1]?.color.includes('indigo')
                                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                                  : stepDetails[activeStep - 1]?.color.includes('cyan')
                                  ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
                                  : stepDetails[activeStep - 1]?.color.includes('green')
                                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                  : stepDetails[activeStep - 1]?.color.includes('amber')
                                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                  : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                              )}
                            >
                              {outcome.icon}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                              {outcome.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA with enhanced styling */}
                  <div className="mt-auto pt-6">
                    <Link href="/contact">
                      <TrackedButton
                        variant="default"
                        className={cn(
                          'w-full bg-gradient-to-r shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1',
                          stepDetails[activeStep - 1]?.color
                        )}
                        rightIcon={
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        }
                        trackingEvent={{
                          name: 'mvp_stages_cta_click',
                          category: 'conversion',
                          label: 'stages_contact_us',
                        }}
                      >
                        Discuss Your MVP Requirements
                      </TrackedButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Image and overlay (reduced to 2/5) */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden h-full shadow-xl transition-all duration-500 transform hover:shadow-2xl group">
                <div className="relative w-full h-full min-h-[400px]">
                  <Image
                    src={stepDetails[activeStep - 1]?.image ?? '/images/services/default.webp'}
                    alt={stepDetails[activeStep - 1]?.title ?? 'Project stage'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Enhanced gradient overlay with animation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end transition-opacity duration-500 group-hover:opacity-90">
                    <div className="p-8 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                      {/* Phase indicator with pulse animation */}
                      <div className="inline-block px-3 py-1 bg-pink-500/80 text-white text-sm font-medium rounded-full mb-4 animate-pulse">
                        Phase {stepDetails[activeStep - 1]?.number}
                      </div>
                      {/* Title with enhanced typography */}
                      <h4 className="text-3xl font-bold mb-4 transition-all duration-300 group-hover:text-pink-400">
                        {stepDetails[activeStep - 1]?.title}
                      </h4>
                      {/* Concise description with better visibility */}
                      <p className="text-white/90 text-lg max-w-md leading-relaxed">
                        {(stepDetails[activeStep - 1]?.description?.split('.')[0] ?? '') + '.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
