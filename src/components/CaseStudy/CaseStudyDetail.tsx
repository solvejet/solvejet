// src/components/CaseStudy/CaseStudyDetail.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Server,
  Database,
  Code,
  Shield,
  Clock,
  Users,
  TrendingUp,
  PieChart,
  CloudCog,
  Check,
  Award,
  Heart,
  Smartphone,
  Zap,
  Globe,
  ClipboardCheck,
  Calendar,
  Video,
  Activity,
  Link2,
  MessageSquare,
  Trophy,
  CheckCircle,
  ShoppingCart,
  Package,
  BarChart,
  ShoppingBag,
  UserCheck,
  Search,
  MapPin,
  DollarSign,
  Wrench,
  Home,
  Cpu,
  FileText,
  CreditCard,
  Clipboard,
  Radio,
  RefreshCcw,
  Bell,
} from 'lucide-react';
import type { CaseStudy } from '@/types/case-study';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';

// Icon mapping for technical details - expanded with additional icons
const iconMap: Record<string, React.ReactNode> = {
  // Original icons
  Shield: <Shield className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  CloudCog: <CloudCog className="w-6 h-6" />,
  PieChart: <PieChart className="w-6 h-6" />,
  ApiGateway: <Server className="w-6 h-6" />,
  Lambda: <Code className="w-6 h-6" />,
  Kubernetes: <CloudCog className="w-6 h-6" />,
  DocumentDB: <Database className="w-6 h-6" />,
  ElastiCache: <Database className="w-6 h-6" />,
  CloudFront: <CloudCog className="w-6 h-6" />,
  AppService: <Server className="w-6 h-6" />,
  ApiManagement: <Server className="w-6 h-6" />,
  Functions: <Code className="w-6 h-6" />,
  Redis: <Database className="w-6 h-6" />,
  Storage: <Database className="w-6 h-6" />,
  KeyVault: <Shield className="w-6 h-6" />,
  Monitor: <TrendingUp className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Dashboard: <PieChart className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  ClipboardCheck: <ClipboardCheck className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Link: <Link2 className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Activity: <Activity className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
  CheckCircle: <CheckCircle className="w-6 h-6" />,

  // Additional icons for e-commerce and real estate
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  BarChart: <BarChart className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  DollarSign: <DollarSign className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Clipboard: <Clipboard className="w-6 h-6" />,
  Radio: <Radio className="w-6 h-6" />,
  RefreshCcw: <RefreshCcw className="w-6 h-6" />,
  Bell: <Bell className="w-6 h-6" />,
};

// Default if icon not found
const DefaultIcon = <Server className="w-6 h-6" />;

// Color utility function to get appropriate classes based on color name
const getColorClasses = (
  color: string | undefined
): { bg: string; text: string; hover: string; border: string } => {
  switch (color) {
    case 'red':
      return {
        bg: 'bg-red-100 dark:bg-red-900/20',
        text: 'text-red-600 dark:text-red-400',
        hover: 'group-hover:bg-red-600 group-hover:text-white dark:group-hover:bg-red-500',
        border: 'border-red-200 dark:border-red-800',
      };
    case 'blue':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500',
        border: 'border-blue-200 dark:border-blue-800',
      };
    case 'green':
      return {
        bg: 'bg-green-100 dark:bg-green-900/20',
        text: 'text-green-600 dark:text-green-400',
        hover: 'group-hover:bg-green-600 group-hover:text-white dark:group-hover:bg-green-500',
        border: 'border-green-200 dark:border-green-800',
      };
    case 'purple':
      return {
        bg: 'bg-purple-100 dark:bg-purple-900/20',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-500',
        border: 'border-purple-200 dark:border-purple-800',
      };
    case 'amber':
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/20',
        text: 'text-amber-600 dark:text-amber-400',
        hover: 'group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-amber-500',
        border: 'border-amber-200 dark:border-amber-800',
      };
    default:
      return {
        bg: 'bg-element-100 dark:bg-element-900/20',
        text: 'text-element-600 dark:text-element-400',
        hover: 'group-hover:bg-element-600 group-hover:text-white dark:group-hover:bg-element-500',
        border: 'border-element-200 dark:border-element-800',
      };
  }
};

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [, setActiveTab] = useState<string>('overview');

  // Refs for intersection observer and scrolling
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    challenge: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    architecture: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
  };

  // Setup intersection observer for animations and active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -20% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));

          // Update active tab based on currently visible section
          if (entry.intersectionRatio > 0.5) {
            setActiveTab(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section refs
    Object.entries(sectionRefs).forEach(([, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return (): void => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    trackEvent({
      name: 'view_case_study',
      category: 'content_engagement',
      label: `case_study_${caseStudy.slug}`,
      properties: {
        case_study_id: caseStudy.id,
        case_study_title: caseStudy.title,
        industry: caseStudy.industry,
      },
    });
  }, [caseStudy.id, caseStudy.industry, caseStudy.slug, caseStudy.title, trackEvent]);

  // Filter tech stack by category
  const filteredStack =
    activeCategory === 'all'
      ? caseStudy.architecture.technologies
      : caseStudy.architecture.technologies.filter(tech => tech.category === activeCategory);

  return (
    <>
      {/* Hero Section with enhanced styling */}
      <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 overflow-hidden relative">
        {/* Improved animated background elements */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-element-900/20 blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-element-800/10 blur-3xl animate-pulse"
            style={{ animationDuration: '12s' }}
          ></div>
          <div
            className="absolute bottom-24 left-1/3 w-64 h-64 rounded-full bg-blue-900/20 blur-3xl animate-pulse"
            style={{ animationDuration: '15s' }}
          ></div>
        </div>

        {/* Grid background with animation */}
        <div
          className="absolute inset-0 opacity-20 bg-grid"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Content column with staggered animations */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div
                  className="inline-flex items-center px-4 py-1.5 bg-element-900/60 rounded-full text-element-400 text-sm font-medium mb-6 animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <span className="mr-2">{caseStudy.industry}</span>
                  <span className="w-1 h-1 rounded-full bg-element-400"></span>
                  <span className="ml-2">{caseStudy.duration}</span>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6 animate-slide-up"
                  style={{ animationDelay: '0.5s' }}
                >
                  {caseStudy.title}
                </h1>

                <p
                  className="text-md md:text-md text-gray-300 mb-8 leading-relaxed animate-slide-up"
                  style={{ animationDelay: '0.7s' }}
                >
                  {caseStudy.overview}
                </p>

                <div
                  className="flex flex-wrap gap-3 mb-8 animate-fade-in"
                  style={{ animationDelay: '0.9s' }}
                >
                  {caseStudy.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-200 hover:bg-element-800 hover:text-white transition-colors duration-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div
                  className="flex flex-col sm:flex-row gap-4 mb-6 justify-center lg:justify-start animate-fade-in"
                  style={{ animationDelay: '1.1s' }}
                >
                  <Link href="/contact">
                    <TrackedButton
                      variant="default"
                      className="bg-element-500 hover:bg-element-600 text-white relative overflow-hidden group"
                      rightIcon={
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      }
                      trackingEvent={{
                        name: 'case_study_cta_click',
                        category: 'conversion',
                        label: `case_study_${caseStudy.slug}_discuss_project`,
                        properties: {
                          case_study_id: caseStudy.id,
                          cta_location: 'header',
                        },
                      }}
                    >
                      <span className="relative z-10">Discuss Your Project</span>
                      <span className="absolute inset-0 bg-element-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </TrackedButton>
                  </Link>

                  <Link href="/case-studies">
                    <TrackedButton
                      variant="outline"
                      className="border-gray-400 text-gray-300 hover:bg-gray-800 hover:border-white transition-colors duration-300"
                      trackingEvent={{
                        name: 'view_more_case_studies_click',
                        category: 'navigation',
                        label: 'more_case_studies',
                        properties: {
                          source_case_study: caseStudy.id,
                        },
                      }}
                    >
                      View More Case Studies
                    </TrackedButton>
                  </Link>
                </div>
              </div>
            </div>

            {/* Image column with enhanced animation */}
            <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl shadow-black/30 transform transition-all duration-700 hover:scale-[1.02] hover:shadow-element-900/20">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-transparent z-10"></div>

                <Image
                  src={caseStudy.coverImage.src}
                  alt={caseStudy.coverImage.alt}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Results metrics in horizontal row with glass effect */}
          <div
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 transform transition-all duration-500',
              'bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 animate-slide-up'
            )}
            style={{ animationDelay: '1.3s' }}
          >
            {caseStudy.results.metrics.map((metric, index) => {
              const colorClasses = getColorClasses(metric.color);

              return (
                <div
                  key={index}
                  className="relative overflow-hidden group rounded-xl bg-gray-800/70 p-6 border border-gray-700/40 transition-all duration-500 hover:bg-gray-800 hover:border-gray-600 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        'w-16 h-16 rounded-full mb-4 flex items-center justify-center transition-all duration-300',
                        colorClasses.bg,
                        colorClasses.text,
                        colorClasses.hover
                      )}
                    >
                      {metric.icon && iconMap[metric.icon] ? (
                        iconMap[metric.icon]
                      ) : (
                        <CheckCircle className="w-7 h-7" />
                      )}
                    </div>

                    <div className="text-3xl md:text-4xl font-medium text-white mb-2">
                      {metric.value}
                    </div>

                    <div className="text-base text-gray-300 font-medium mb-1">{metric.label}</div>

                    {metric.description && (
                      <div className="text-sm text-gray-400">{metric.description}</div>
                    )}
                  </div>

                  {/* Background decoration */}
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-gradient-to-r from-gray-700/0 to-gray-700/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section
        id="overview"
        ref={sectionRefs.overview}
        className={cn(
          'py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden',
          visibleSections.overview ? 'opacity-100' : 'opacity-0 translate-y-10'
        )}
        style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
      >
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Overview
            </h2>
            <div className="w-20 h-1.5 bg-element-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300">{caseStudy.overview}</p>
          </div>

          {/* Services Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {caseStudy.services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:border-element-300 dark:hover:border-element-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-lg bg-element-50 dark:bg-element-900/20 flex items-center justify-center mb-4 text-element-600 dark:text-element-400">
                    {/* Use an appropriate icon based on service name */}
                    {service.includes('UI/UX') && <Code className="w-8 h-8" />}
                    {service.includes('Development') && <Server className="w-8 h-8" />}
                    {service.includes('Cloud') && <CloudCog className="w-8 h-8" />}
                    {service.includes('DevOps') && <Activity className="w-8 h-8" />}
                    {service.includes('E-commerce') && <ShoppingCart className="w-8 h-8" />}
                    {service.includes('Mobile') && <Smartphone className="w-8 h-8" />}
                    {service.includes('Integration') && <Link2 className="w-8 h-8" />}
                    {service.includes('Analytics') && <BarChart className="w-8 h-8" />}
                    {service.includes('Custom') && <Wrench className="w-8 h-8" />}
                    {service.includes('IoT') && <Cpu className="w-8 h-8" />}
                    {service.includes('Infrastructure') && <Server className="w-8 h-8" />}
                    {!service.includes('UI/UX') &&
                      !service.includes('Development') &&
                      !service.includes('Cloud') &&
                      !service.includes('DevOps') &&
                      !service.includes('E-commerce') &&
                      !service.includes('Mobile') &&
                      !service.includes('Integration') &&
                      !service.includes('Analytics') &&
                      !service.includes('Custom') &&
                      !service.includes('IoT') &&
                      !service.includes('Infrastructure') && <CheckCircle className="w-8 h-8" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {service}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge and Solution Section with enhanced styling */}
      <section
        id="challenge"
        ref={sectionRefs.challenge}
        className={cn(
          'py-20 bg-white dark:bg-gray-800 relative overflow-hidden',
          visibleSections.challenge ? 'opacity-100' : 'opacity-0 translate-y-10'
        )}
        style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-element-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-element-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Challenge and Solution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Challenge Column */}
            <div className="flex flex-col transform transition-all duration-700 hover:translate-y-[-5px]">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-xl bg-red-600/20 flex items-center justify-center mr-4 shadow-lg">
                    <Award className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white group flex items-center">
                    The Challenge
                    <span className="block w-0 group-hover:w-full h-1 bg-red-500 mt-1 transition-all duration-500"></span>
                  </h2>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex-grow hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                {/* Decorative elements */}
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-red-500/5 rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-700"></div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                  {caseStudy.challenge}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10">
                  Key Challenges:
                </h3>
                <ul className="space-y-4 relative z-10">
                  {caseStudy.challenge
                    .split('. ')
                    .slice(1, 5)
                    .map(
                      (point, index) =>
                        point.trim().length > 20 && (
                          <li
                            key={index}
                            className="flex items-start transform transition hover:translate-x-1 duration-300"
                          >
                            <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                              <ChevronRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{point.trim()}.</p>
                          </li>
                        )
                    )}
                </ul>
              </div>
            </div>

            {/* Solution Column */}
            <div
              className="flex flex-col transform transition-all duration-700 hover:translate-y-[-5px]"
              id="solution"
              ref={sectionRefs.solution}
            >
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-xl bg-green-600/20 flex items-center justify-center mr-4 shadow-lg">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white group flex items-center">
                    Our Solution
                    <span className="block w-0 group-hover:w-full h-1 bg-green-500 mt-1 transition-all duration-500"></span>
                  </h2>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex-grow hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                {/* Decorative elements */}
                <div className="absolute -right-10 -top-10 w-20 h-20 bg-green-500/5 rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-700"></div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                  {caseStudy.solution}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 relative z-10">
                  Key Solutions:
                </h3>
                <ul className="space-y-4 relative z-10">
                  {caseStudy.solution
                    .split('. ')
                    .slice(1, 5)
                    .map(
                      (point, index) =>
                        point.trim().length > 20 && (
                          <li
                            key={index}
                            className="flex items-start transform transition hover:translate-x-1 duration-300"
                          >
                            <div className="mr-3 mt-1 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{point.trim()}.</p>
                          </li>
                        )
                    )}
                </ul>
              </div>
            </div>
          </div>

          {/* Approach Section with improved styling */}
          <div className="mt-16 max-w-4xl mx-auto transform transition-all duration-700 hover:translate-y-[-5px]">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center group flex flex-col items-center">
              Our Approach
              <span className="block w-16 h-1.5 bg-element-500 mt-4 group-hover:w-32 transition-all duration-500 rounded-full"></span>
            </h3>

            <div className="mt-8 bg-gradient-to-r from-element-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-8 shadow-xl border border-element-100 dark:border-gray-600 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-element-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
                {caseStudy.approach}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section MOVED UP */}
      <section
        id="architecture"
        ref={sectionRefs.architecture}
        className={cn(
          'py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden',
          visibleSections.architecture ? 'opacity-100' : 'opacity-0 translate-y-10'
        )}
        style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Architecture
            </h2>
            <div className="w-20 h-1.5 bg-element-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-md text-gray-700 dark:text-gray-300">
              {caseStudy.architecture.description}
            </p>
          </div>

          {/* Technology Stack Tabs MOVED UP */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Technology Stack
            </h3>

            <div className="flex justify-center flex-wrap mb-8 gap-2">
              <button
                onClick={() => {
                  setActiveCategory('all');
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeCategory === 'all'
                    ? 'bg-element-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-element-500 hover:text-white'
                )}
              >
                All
              </button>

              <button
                onClick={() => {
                  setActiveCategory('frontend');
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeCategory === 'frontend'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white'
                )}
              >
                Frontend
              </button>

              <button
                onClick={() => {
                  setActiveCategory('backend');
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeCategory === 'backend'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-green-500 hover:text-white'
                )}
              >
                Backend
              </button>

              <button
                onClick={() => {
                  setActiveCategory('database');
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeCategory === 'database'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-amber-500 hover:text-white'
                )}
              >
                Database
              </button>

              <button
                onClick={() => {
                  setActiveCategory('cloud');
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeCategory === 'cloud'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-500 hover:text-white'
                )}
              >
                Cloud Services
              </button>

              <button
                onClick={() => {
                  setActiveCategory('infrastructure');
                }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300',
                  activeCategory === 'infrastructure'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white'
                )}
              >
                Infrastructure
              </button>
            </div>

            {/* Tech Stack Grid with improved animation and layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredStack.map((tech, index) => (
                <div
                  key={`${tech.name}-${String(index)}`}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-element-300 dark:hover:border-element-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-16 h-16 flex items-center justify-center mb-4">
                    {tech.icon && iconMap[tech.icon] ? (
                      React.cloneElement(iconMap[tech.icon] as React.ReactElement, {
                        ...{ className: 'w-10 h-10 text-element-600 dark:text-element-400' },
                      })
                    ) : (
                      <Code className="w-10 h-10 text-element-600 dark:text-element-400" />
                    )}
                  </div>
                  <span className="text-base font-medium text-gray-900 dark:text-white">
                    {tech.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Highlights Grid with improved styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 md:col-span-2 text-center">
              Technical Highlights
            </h3>

            {caseStudy.architecture.highlights.map((highlight, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={cn(
                    'bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700',
                    'hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 hover:border-element-300 dark:hover:border-element-700 group',
                    isEven ? 'md:translate-y-8' : ''
                  )}
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-5">
                        <div className="w-14 h-14 rounded-lg bg-element-100 dark:bg-element-900/30 flex items-center justify-center text-element-600 dark:text-element-400 transition-all duration-300 group-hover:bg-element-600 group-hover:text-white">
                          {highlight.icon && iconMap[highlight.icon] ? (
                            iconMap[highlight.icon]
                          ) : (
                            <Code className="w-8 h-8" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-element-600 dark:group-hover:text-element-400 transition-colors">
                          {highlight.title}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">{highlight.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features Section with improved cards */}
      <section
        id="features"
        ref={sectionRefs.features}
        className={cn(
          'py-20 bg-white dark:bg-gray-800 relative overflow-hidden',
          visibleSections.features ? 'opacity-100' : 'opacity-0 translate-y-10'
        )}
        style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <div className="w-20 h-1.5 bg-element-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our solution included these essential features to address the core business
              requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudy.architecture.keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg border border-gray-100 hover:border-element-300 dark:border-gray-700 dark:hover:border-element-700 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-element-50 dark:bg-element-900/20 flex items-center justify-center text-element-600 dark:text-element-400 transition-all duration-300 group-hover:bg-element-600 group-hover:text-white mb-6">
                    {feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : DefaultIcon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-element-600 dark:group-hover:text-element-400 transition-colors">
                    {feature.name}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section with improved visuals */}
      <section
        id="results"
        ref={sectionRefs.results}
        className={cn(
          'py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden',
          visibleSections.results ? 'opacity-100' : 'opacity-0 translate-y-10'
        )}
        style={{ transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Results & Impact
            </h2>
            <div className="w-20 h-1.5 bg-element-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300">{caseStudy.results.summary}</p>
          </div>

          {/* Metric cards in horizontal layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {caseStudy.results.metrics.map((metric, index) => {
              const colorClasses = getColorClasses(metric.color);

              return (
                <div
                  key={index}
                  className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                >
                  {/* Colored top border */}
                  <div className={`h-2 w-full ${colorClasses.bg.replace('bg-', 'bg-')}`}></div>

                  <div className="p-6">
                    {/* Icon with background */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      {metric.icon && iconMap[metric.icon] ? (
                        React.cloneElement(iconMap[metric.icon] as React.ReactElement, {
                          ...{ className: 'w-16 h-16' },
                        })
                      ) : (
                        <CheckCircle className="w-16 h-16" />
                      )}
                    </div>

                    {/* Metric content */}
                    <div className="relative z-10">
                      <div className={`text-4xl font-bold mb-2 ${colorClasses.text}`}>
                        {metric.value}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {metric.label}
                      </h3>
                      {metric.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {metric.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Animated border on hover */}
                  <div
                    className={`absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-${
                      colorClasses.border.split('-')[1] ?? 'default'
                    } rounded-xl transition-all duration-300`}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Visual impact area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Project Impact Visualization
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Key performance indicators before and after implementation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Before/After percentage visualization */}
              <div className="space-y-6">
                {caseStudy.results.metrics.slice(0, 2).map((metric, index) => {
                  const numericValue = parseFloat(metric.value.replace(/[^0-9.]/g, ''));
                  const previousValue =
                    numericValue > 20 ? numericValue / (1 + numericValue / 100) : 10;
                  const colorClasses = getColorClasses(metric.color);

                  return (
                    <div key={index} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {metric.label}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {previousValue.toFixed(0)}% → {metric.value}
                        </span>
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        {/* Before bar */}
                        <div
                          className="h-full bg-gray-400 dark:bg-gray-600 animate-width-expand"
                          style={{ width: `${String(previousValue)}%` }}
                        ></div>
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                        {/* After bar with animation */}
                        <div
                          className={`h-full animate-width-expand ${colorClasses.bg.replace(
                            'bg-',
                            'bg-'
                          )}`}
                          style={{
                            width: `${numericValue.toString()}%`,
                            animationDelay: `${(index * 0.2).toString()}s`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Achievement highlights */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4 text-lg">
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {caseStudy.results.summary
                    .split('. ')
                    .slice(0, 4)
                    .map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 mr-3">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{point.trim()}.</p>
                      </li>
                    ))}
                </ul>

                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-element-100 dark:bg-element-900/20 text-element-800 dark:text-element-200">
                    {caseStudy.industry} Industry Impact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced styling */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-gradient-to-r from-element-900 to-blue-900 rounded-2xl p-12 shadow-xl border border-element-800 text-center relative overflow-hidden group transform transition-all duration-500 hover:shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10"></div>
            <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:w-60 group-hover:h-60 transition-all duration-700"></div>
            <div className="absolute -left-20 bottom-0 w-40 h-40 bg-element-400/5 rounded-full blur-3xl group-hover:w-60 group-hover:h-60 transition-all duration-700"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-gray-100 mb-8">
                Let's discuss how we can help you achieve similar results with a customized solution
                tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <TrackedButton
                    variant="default"
                    size="lg"
                    className="bg-white hover:bg-gray-100 text-element-900 font-medium shadow-lg px-8"
                    rightIcon={
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    }
                    trackingEvent={{
                      name: 'case_study_footer_cta_click',
                      category: 'conversion',
                      label: `case_study_${caseStudy.slug}_discuss_project_footer`,
                      properties: {
                        case_study_id: caseStudy.id,
                        cta_location: 'footer',
                      },
                    }}
                  >
                    Start Your Project
                  </TrackedButton>
                </Link>

                <Link href="/case-studies">
                  <TrackedButton
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10 px-8"
                    trackingEvent={{
                      name: 'view_more_case_studies_footer_click',
                      category: 'navigation',
                      label: 'more_case_studies_footer',
                      properties: {
                        source_case_study: caseStudy.id,
                      },
                    }}
                  >
                    Explore More Case Studies
                  </TrackedButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Add a custom style for the bar chart animation */}
      <style jsx global>{`
        @keyframes bar-rise {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-bar-rise {
          animation: bar-rise 1s ease-out forwards;
        }

        .bg-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
