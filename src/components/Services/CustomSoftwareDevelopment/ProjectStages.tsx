// src/components/Services/CustomSoftwareDevelopment/ProjectStages.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FileSearch,
  BarChart4,
  Code,
  Check,
  Rocket,
  Zap,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectApproachProps {
  className?: string;
}

export default function ProjectStages({ className }: ProjectApproachProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

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
      name: 'csd_approach_step_click',
      category: 'engagement',
      label: `approach_step_${String(step)}`,
    });
  };

  // Enhanced step details with more engaging content
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
      icon: <FileSearch className="h-6 w-6" />,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      number: '01',
      title: 'Discovery & Requirements',
      description:
        'We immerse ourselves in your business ecosystem to thoroughly understand your objectives, user needs, and technical landscape. This foundational phase ensures we build solutions that truly solve your unique challenges.',
      image: '/images/services/discovery-phase.webp',
      bulletPoints: [
        'Stakeholder interviews and collaborative workshops',
        'User research and journey mapping sessions',
        'Market analysis and competitive assessment',
        'Technical feasibility evaluation',
      ],
      outcomes: [
        { icon: <Check className="h-4 w-4" />, text: 'Comprehensive requirements documentation' },
        { icon: <Check className="h-4 w-4" />, text: 'User personas and journey maps' },
        { icon: <Check className="h-4 w-4" />, text: 'Project success metrics defined' },
      ],
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10',
      number: '02',
      title: 'Planning & Architecture',
      description:
        'Our expert architects design a robust, future-proof system tailored to your needs. We develop comprehensive project plans with clear timelines, resource allocations, and risk mitigation strategies to ensure smooth execution.',
      image: '/images/services/planning-architecture.webp',
      bulletPoints: [
        'System architecture and technology stack selection',
        'Data flow and security planning',
        'Infrastructure and scalability design',
        'Detailed project roadmap creation',
      ],
      outcomes: [
        { icon: <Check className="h-4 w-4" />, text: 'Technical architecture blueprint' },
        { icon: <Check className="h-4 w-4" />, text: 'Detailed project plan and timeline' },
        { icon: <Check className="h-4 w-4" />, text: 'Risk assessment and mitigation strategy' },
      ],
    },
    {
      icon: <Code className="h-6 w-6" />,
      color: 'from-element-600 to-element-400',
      bgColor: 'bg-element-50 dark:bg-element-900/10',
      number: '03',
      title: 'Development & Implementation',
      description:
        'Using agile methodologies, our engineering team builds your solution with a focus on quality, security, and maintainability. Regular iterations and demonstrations ensure you stay connected throughout the development process.',
      image: '/images/services/development-phase.webp',
      bulletPoints: [
        'Agile development cycles with continuous integration',
        'Test-driven development practices',
        'Regular code reviews and quality assurance',
        'Iterative demonstrations and feedback implementation',
      ],
      outcomes: [
        { icon: <Check className="h-4 w-4" />, text: 'Production-ready codebase' },
        { icon: <Check className="h-4 w-4" />, text: 'Comprehensive technical documentation' },
        { icon: <Check className="h-4 w-4" />, text: 'Version-controlled repositories' },
      ],
    },
    {
      icon: <Check className="h-6 w-6" />,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      number: '04',
      title: 'Quality Assurance',
      description:
        'Our rigorous testing protocols ensure your software operates flawlessly under all conditions. We verify functionality, performance, security, and user experience to deliver an exceptional product that exceeds expectations.',
      image: '/images/services/quality-assurance.webp',
      bulletPoints: [
        'Automated and manual testing across all components',
        'Performance and load testing at scale',
        'Security vulnerability assessment and penetration testing',
        'User acceptance testing and feedback integration',
      ],
      outcomes: [
        { icon: <Check className="h-4 w-4" />, text: 'Comprehensive test documentation' },
        { icon: <Check className="h-4 w-4" />, text: 'Security compliance verification' },
        { icon: <Check className="h-4 w-4" />, text: 'Performance optimization report' },
      ],
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      color: 'from-amber-600 to-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/10',
      number: '05',
      title: 'Deployment & Launch',
      description:
        'We execute a meticulously planned deployment strategy to ensure a seamless transition. Our team handles infrastructure configuration, data migration, and system integration while minimizing business disruption.',
      image: '/images/services/deployment-launch.webp',
      bulletPoints: [
        'Production environment setup and configuration',
        'Data migration with integrity validation',
        'Phased rollout strategy implementation',
        'Comprehensive user training and documentation',
      ],
      outcomes: [
        { icon: <Check className="h-4 w-4" />, text: 'Stable production environment' },
        { icon: <Check className="h-4 w-4" />, text: 'User adoption support materials' },
        { icon: <Check className="h-4 w-4" />, text: 'Performance monitoring systems' },
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      color: 'from-red-600 to-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/10',
      number: '06',
      title: 'Maintenance & Evolution',
      description:
        'Our relationship continues well beyond launch. We provide proactive monitoring, regular updates, and strategic enhancements to ensure your software remains cutting-edge, secure, and aligned with your evolving business needs.',
      image: '/images/services/maintenance-evolution.webp',
      bulletPoints: [
        '24/7 monitoring and support with rapid response protocols',
        'Regular security updates and vulnerability patching',
        'Performance optimization and system health monitoring',
        'Planned feature enhancements and capability expansion',
      ],
      outcomes: [
        { icon: <Check className="h-4 w-4" />, text: 'Ongoing maintenance schedule' },
        { icon: <Check className="h-4 w-4" />, text: 'Feature roadmap for future expansion' },
        { icon: <Check className="h-4 w-4" />, text: 'Technology upgrade recommendations' },
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
              Our Project Approach
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-16 leading-relaxed max-w-3xl">
              We follow a comprehensive, proven methodology that combines agile flexibility with
              structured governance to ensure predictable outcomes, transparent communication, and
              exceptional quality for your custom software project.
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
              className="h-full bg-gradient-to-r from-element-500 to-element-400 transition-all duration-500 ease-out"
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
                    <span className="absolute w-full h-full rounded-full animate-ping opacity-30 bg-gradient-to-br from-element-500 to-element-400" />
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
                  <div className="text-sm font-medium text-element-600 dark:text-element-400">
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
                      ? 'from-element-500 to-element-400 scale-100 opacity-100'
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
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-element-500 to-element-400 flex items-center justify-center text-white mr-3">
                        <Check className="h-4 w-4" />
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
                                'h-5 w-5 transition-all duration-300 group-hover:text-element-500',
                                stepDetails[activeStep - 1]?.color.includes('blue')
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : stepDetails[activeStep - 1]?.color.includes('purple')
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : stepDetails[activeStep - 1]?.color.includes('element')
                                  ? 'text-element-600 dark:text-element-400'
                                  : stepDetails[activeStep - 1]?.color.includes('green')
                                  ? 'text-green-600 dark:text-green-400'
                                  : stepDetails[activeStep - 1]?.color.includes('amber')
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-red-600 dark:text-red-400'
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
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-element-500 to-element-400 flex items-center justify-center text-white mr-3">
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
                                stepDetails[activeStep - 1]?.color.includes('blue')
                                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                  : stepDetails[activeStep - 1]?.color.includes('purple')
                                  ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                  : stepDetails[activeStep - 1]?.color.includes('element')
                                  ? 'bg-element-100 text-element-600 dark:bg-element-900/30 dark:text-element-400'
                                  : stepDetails[activeStep - 1]?.color.includes('green')
                                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                  : stepDetails[activeStep - 1]?.color.includes('amber')
                                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                                  : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
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
                          name: 'csd_approach_cta_click',
                          category: 'conversion',
                          label: 'approach_contact_us',
                        }}
                      >
                        Discuss Your Project Requirements
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
                    alt={stepDetails[activeStep - 1]?.title ?? 'Project approach step'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Enhanced gradient overlay with animation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end transition-opacity duration-500 group-hover:opacity-90">
                    <div className="p-8 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                      {/* Phase indicator with pulse animation */}
                      <div className="inline-block px-3 py-1 bg-element-500/80 text-white text-sm font-medium rounded-full mb-4 animate-pulse">
                        Phase {stepDetails[activeStep - 1]?.number}
                      </div>
                      {/* Title with enhanced typography */}
                      <h4 className="text-3xl font-bold mb-4 transition-all duration-300 group-hover:text-element-400">
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
