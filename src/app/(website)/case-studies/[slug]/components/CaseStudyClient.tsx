// src/app/(website)/case-studies/[slug]/components/CaseStudyClient.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  BarChart,
  TrendingUp,
  Zap,
  DollarSign,
  Package,
  Truck,
  AlertTriangle,
  Clock,
  Database,
  Users,
  FileMinus,
  Smartphone,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { CaseStudy, CaseStudySummary } from '@/types/case-study';
import type { JSX } from 'react';
// Performance charts - loaded only when in viewport
import dynamic from 'next/dynamic';
const PerformanceCharts = dynamic(() => import('./PerformanceCharts'), {
  loading: () => <div className="h-80 bg-gray-50 animate-pulse rounded-lg"></div>,
  ssr: false,
});
interface CaseStudyClientProps {
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudySummary[];
}

export default function CaseStudyClient({
  caseStudy,
  relatedCaseStudies,
}: CaseStudyClientProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs for intersection observers
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    challenge: useRef<HTMLDivElement>(null),
    approach: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
    technologies: useRef<HTMLDivElement>(null),
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

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

  // Find icon for metric
  const getMetricIcon = (iconName?: string): JSX.Element => {
    switch (iconName) {
      case 'trending-up':
        return <TrendingUp className="h-6 w-6" />;
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'dollar-sign':
        return <DollarSign className="h-6 w-6" />;
      case 'package':
        return <Package className="h-6 w-6" />;
      case 'truck':
        return <Truck className="h-6 w-6" />;
      case 'alert-triangle':
        return <AlertTriangle className="h-6 w-6" />;
      case 'clock':
        return <Clock className="h-6 w-6" />;
      case 'database':
        return <Database className="h-6 w-6" />;
      case 'users':
        return <Users className="h-6 w-6" />;
      case 'file-minus':
        return <FileMinus className="h-6 w-6" />;
      case 'smartphone':
        return <Smartphone className="h-6 w-6" />;
      default:
        return <BarChart className="h-6 w-6" />;
    }
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Setup intersection observers for sections
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];

    // Create observers for each section
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Track section view
              trackEvent({
                name: `view_${key}_section`,
                category: 'engagement',
                label: `case_study_${caseStudy.slug}_${key}`,
                properties: {
                  case_study_id: caseStudy.id,
                  case_study_title: caseStudy.title,
                  industry: caseStudy.industry,
                  section: key,
                },
              });

              // Stop observing after triggering once
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 } // 20% of section must be visible
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    // Track initial page view
    trackEvent({
      name: 'view_case_study',
      category: 'engagement',
      label: `case_study_${caseStudy.slug}`,
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        industry: caseStudy.industry,
      },
    });

    return (): void => {
      // Clean up all observers
      observers.forEach(observer => {
        observer.disconnect();
      });
    };
  }, [caseStudy, trackEvent]);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-element-500 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress.toString()}%` }}
        aria-hidden="true"
      />

      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-element-900 to-element-700 pt-32 pb-20">
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
            background:
              'radial-gradient(circle, rgba(255, 204, 0, 0.4) 0%, rgba(255, 204, 0, 0) 70%)',
            filter: 'blur(50px)',
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Navigation link */}
          <div className="flex flex-wrap items-center justify-between mb-10">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 group mb-4 md:mb-0"
            >
              <ChevronLeft className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Case Studies</span>
            </Link>

            {/* Publication date */}
            <div className="flex items-center text-white/70 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={caseStudy.publishedAt}>{formatDate(caseStudy.publishedAt)}</time>
              {caseStudy.updatedAt && (
                <span className="ml-2 text-white/60">
                  (Updated: {formatDate(caseStudy.updatedAt)})
                </span>
              )}
            </div>
          </div>

          {/* Industry badge - prominent display */}
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full">
              <Briefcase className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{caseStudy.industry}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero content */}
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {caseStudy.title}
              </h1>
              <p className="text-xl text-white/80 mb-6 leading-relaxed">{caseStudy.subtitle}</p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white/90">{caseStudy.overview}</p>
              </div>
            </div>

            {/* Hero image with metrics */}
            <div className="relative mt-8 lg:mt-0">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={caseStudy.coverImage.src}
                  alt={caseStudy.coverImage.alt}
                  width={caseStudy.coverImage.width}
                  height={caseStudy.coverImage.height}
                  className="object-cover w-full h-full"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-element-900/70 to-transparent opacity-70"></div>
              </div>

              {/* Key metrics badges */}
              {caseStudy.results.metrics.slice(0, 2).map((metric, index) => (
                <div
                  key={index}
                  className={cn(
                    'absolute bg-white rounded-full h-24 w-24 p-2 shadow-lg flex flex-col items-center justify-center text-center',
                    index === 0 ? '-top-4 -left-4 z-10' : '-bottom-4 -right-4 z-10'
                  )}
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
                </div>
              ))}
            </div>
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

      {/* Table of contents - sticky */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-nowrap items-center py-3 overflow-x-auto hide-scrollbar">
            <span className="text-gray-500 mr-4 flex-shrink-0">Jump to:</span>
            <nav className="flex space-x-6">
              {Object.entries(sectionRefs).map(([key, ref]) => (
                <button
                  key={key}
                  onClick={() => {
                    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    trackEvent({
                      name: 'navigation_click',
                      category: 'navigation',
                      label: `jump_to_${key}`,
                    });
                  }}
                  className="text-gray-600 hover:text-element-600 whitespace-nowrap transition-colors"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content sections */}
      <div className="pb-16">
        {/* Overview section */}
        <section ref={sectionRefs.overview} className="py-16 bg-white" id="overview">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="h-12 w-1 bg-element-500 mr-4 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
              </div>

              <div className="bg-element-50 p-6 rounded-lg">
                <div className="flex items-start mb-6">
                  <div className="bg-element-100 rounded-full p-3 mr-4">
                    <Briefcase className="h-6 w-6 text-element-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Industry: {caseStudy.industry}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{caseStudy.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge section */}
        <section ref={sectionRefs.challenge} className="py-16 bg-gray-50" id="challenge">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="h-12 w-1 bg-red-500 mr-4 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">The Challenge</h2>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-10">
                <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
              </div>

              {/* Key challenges grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold">Legacy System Limitations</h3>
                  </div>
                  <p className="text-gray-600">
                    Outdated architecture that couldn't scale with growing business needs.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold">Data Fragmentation</h3>
                  </div>
                  <p className="text-gray-600">
                    Information siloed across multiple unconnected systems.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold">Performance Issues</h3>
                  </div>
                  <p className="text-gray-600">
                    Slow response times impacting customer experience and internal operations.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">4</span>
                    </div>
                    <h3 className="text-lg font-semibold">Security Concerns</h3>
                  </div>
                  <p className="text-gray-600">
                    Vulnerabilities in existing systems putting sensitive data at risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach section */}
        <section ref={sectionRefs.approach} className="py-16 bg-white" id="approach">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="h-12 w-1 bg-yellow-500 mr-4 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">Our Approach</h2>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl mb-10 border border-yellow-100">
                <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.approach}</p>
              </div>

              {/* Timeline visualization */}
              <div className="relative border-l-2 border-yellow-500 pl-8 ml-4 mt-16">
                {/* Timeline items */}
                <div className="mb-12 relative">
                  <div className="absolute -left-12 top-0 h-6 w-6 rounded-full bg-yellow-500 border-4 border-white"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Discovery & Analysis</h3>
                  <p className="text-gray-600">
                    Comprehensive assessment of existing systems and business requirements.
                  </p>
                </div>

                <div className="mb-12 relative">
                  <div className="absolute -left-12 top-0 h-6 w-6 rounded-full bg-yellow-500 border-4 border-white"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Solution Architecture</h3>
                  <p className="text-gray-600">
                    Design of a modern, scalable architecture to meet current and future needs.
                  </p>
                </div>

                <div className="mb-12 relative">
                  <div className="absolute -left-12 top-0 h-6 w-6 rounded-full bg-yellow-500 border-4 border-white"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Agile Implementation</h3>
                  <p className="text-gray-600">
                    Phased delivery with regular feedback loops to ensure alignment with objectives.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-12 top-0 h-6 w-6 rounded-full bg-yellow-500 border-4 border-white"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Optimization</h3>
                  <p className="text-gray-600">
                    Ongoing refinements based on performance metrics and user feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution section */}
        <section ref={sectionRefs.solution} className="py-16 bg-gray-50" id="solution">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <div className="h-12 w-1 bg-green-500 mr-4 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">The Solution</h2>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl border border-green-100 mb-10">
                <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.solution}</p>
              </div>

              {/* Solution features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2 2h14z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Microservices Architecture
                  </h3>
                  <p className="text-gray-600">
                    Scalable, modular design that enables independent deployment and maintenance of
                    components.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Security</h3>
                  <p className="text-gray-600">
                    Multi-layered protection with encryption, access controls, and automated threat
                    detection.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Processing</h3>
                  <p className="text-gray-600">
                    Instant data processing for up-to-the-minute insights and actions.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
                  <p className="text-gray-600">
                    Comprehensive dashboards and reporting tools for data-driven decision making.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results section */}
        <section ref={sectionRefs.results} className="py-16 bg-white" id="results">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="h-12 w-1 bg-blue-500 mr-4 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">Results & Impact</h2>
              </div>

              {/* Metrics grid - responsive and visually appealing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {caseStudy.results.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="metric-item bg-white rounded-xl p-8 shadow-md border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`p-2 rounded-lg mr-2 ${
                          metric.value.includes('+') ? 'bg-green-100' : 'bg-blue-100'
                        }`}
                      >
                        {getMetricIcon(metric.icon)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{metric.label}</h3>
                    </div>
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        metric.value.includes('+') ? 'text-green-500' : 'text-element-500'
                      }`}
                    >
                      {metric.value}
                    </div>
                    <p className="text-gray-500 text-sm">Compared to industry average</p>
                  </div>
                ))}
              </div>

              {/* Performance data visualization - dynamically loaded */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Performance Analysis
                </h3>
                <PerformanceCharts />
              </div>

              {/* Impact summary */}
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Transformation</h3>
                <p className="text-gray-700 mb-6">
                  The implementation of our solution led to significant improvements across all key
                  business metrics. The organization saw dramatic increases in operational
                  efficiency, customer satisfaction, and revenue growth.
                </p>
                <div className="flex items-center text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>ROI achieved within 6 months</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies section */}
        <section ref={sectionRefs.technologies} className="py-16 bg-gray-50" id="technologies">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-12">
                <div className="h-12 w-1 bg-gray-400 mr-4 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">Technologies Used</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {Object.entries(groupedTechnologies).map(([category, techs]) => (
                  <div
                    key={category}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {techs.map((tech, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-element-50 hover:text-element-600 border border-gray-200 hover:border-element-200 cursor-default"
                        >
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology stack visualization */}
              <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Technology Stack
                </h3>

                <div className="flex flex-col">
                  {/* Frontend layer */}
                  <div className="mb-4">
                    <div className="mb-2 text-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm font-medium">
                        Frontend
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                        React
                      </div>
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                        Redux
                      </div>
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                        TypeScript
                      </div>
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                        Material UI
                      </div>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="flex justify-center my-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  {/* Backend layer */}
                  <div className="mb-4">
                    <div className="mb-2 text-center">
                      <span className="bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium">
                        Backend
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-100 text-sm">
                        Node.js
                      </div>
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-100 text-sm">
                        Express
                      </div>
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-100 text-sm">
                        GraphQL
                      </div>
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-100 text-sm">
                        Microservices
                      </div>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="flex justify-center my-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>

                  {/* Data layer */}
                  <div>
                    <div className="mb-2 text-center">
                      <span className="bg-purple-100 text-purple-700 rounded-full px-4 py-1 text-sm font-medium">
                        Data & Infrastructure
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-100 text-sm">
                        MongoDB
                      </div>
                      <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-100 text-sm">
                        Redis
                      </div>
                      <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-100 text-sm">
                        AWS
                      </div>
                      <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-100 text-sm">
                        Kubernetes
                      </div>
                      <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-100 text-sm">
                        Docker
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        {caseStudy.nextSteps && (
          <section className="py-16 bg-gradient-to-br from-element-900 to-element-700 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{caseStudy.nextSteps.title}</h2>
                <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                  {caseStudy.nextSteps.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href={caseStudy.nextSteps.cta.href}>
                    <TrackedButton
                      size="lg"
                      rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                      trackingEvent={{
                        name: 'case_study_cta_click',
                        category: 'conversion',
                        label: `case_study_${caseStudy.slug}_cta`,
                        properties: {
                          case_study_id: caseStudy.id,
                          case_study_title: caseStudy.title,
                          industry: caseStudy.industry,
                          cta_text: caseStudy.nextSteps.cta.label,
                          cta_url: caseStudy.nextSteps.cta.href,
                        },
                      }}
                      className="bg-white text-element-900 hover:bg-gray-100"
                    >
                      {caseStudy.nextSteps.cta.label}
                    </TrackedButton>
                  </Link>

                  <Link href="/case-studies">
                    <TrackedButton
                      variant="outline"
                      size="lg"
                      trackingEvent={{
                        name: 'view_all_case_studies_click',
                        category: 'navigation',
                        label: 'view_all_case_studies',
                      }}
                      className="border-white text-white hover:bg-white/10"
                    >
                      View All Case Studies
                    </TrackedButton>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related case studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-12">
                  <div className="h-12 w-1 bg-gray-400 mr-4 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-900">Related Case Studies</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedCaseStudies.map(study => (
                    <Link
                      key={study.id}
                      href={`/case-studies/${study.slug}`}
                      className="group"
                      onClick={() => {
                        trackEvent({
                          name: 'related_case_study_click',
                          category: 'navigation',
                          label: `related_to_${caseStudy.slug}_clicked_${study.slug}`,
                          properties: {
                            source_case_study: caseStudy.id,
                            source_industry: caseStudy.industry,
                            target_case_study: study.id,
                            target_industry: study.industry,
                          },
                        });
                      }}
                    >
                      <div className="bg-white rounded-lg overflow-hidden shadow-md transform transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1 border border-gray-100 group-hover:border-element-200 h-full flex flex-col">
                        <div className="aspect-video relative">
                          <Image
                            src={study.coverImage.src}
                            alt={study.coverImage.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                              {study.industry}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-element-600 transition-colors duration-300">
                            {study.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 mb-4">{study.subtitle}</p>
                          <div className="flex items-center text-element-500 font-medium group-hover:text-element-600 transition-colors duration-300 mt-auto">
                            <span>View Case Study</span>
                            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
