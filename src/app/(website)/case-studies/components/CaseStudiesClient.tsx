// src/app/(website)/case-studies/components/CaseStudiesClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { X } from 'lucide-react';
import { TrackedButton } from '@/components/ui/Button/TrackedButton';
import type { CaseStudySummary } from '@/types/case-study';
import { cn } from '@/lib/utils';

interface CaseStudiesClientProps {
  featuredCaseStudies: CaseStudySummary[];
  regularCaseStudies: CaseStudySummary[];
}

export default function CaseStudiesClient({
  featuredCaseStudies,
  regularCaseStudies,
}: CaseStudiesClientProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Extract unique industries from all case studies
  const allCaseStudies = [...featuredCaseStudies, ...regularCaseStudies];
  const industries = [...new Set(allCaseStudies.map(study => study.industry))];

  // Filter case studies based on search term and selected industry
  const filteredRegularCaseStudies = regularCaseStudies.filter(study => {
    const matchesSearch =
      searchTerm === '' ||
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.overview.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = selectedIndustry === null || study.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  // Filter featured case studies (only by industry when set)
  const filteredFeaturedCaseStudies = featuredCaseStudies.filter(study => {
    return selectedIndustry === null || study.industry === selectedIndustry;
  });

  // Track page view
  useEffect(() => {
    trackEvent({
      name: 'view_case_studies_page',
      category: 'engagement',
      label: 'case_studies_page_view',
    });
  }, [trackEvent]);

  // Track search and filter actions
  useEffect(() => {
    if (searchTerm) {
      trackEvent({
        name: 'case_studies_search',
        category: 'search',
        label: 'case_studies_search',
        properties: {
          search_term: searchTerm,
        },
      });
    }
  }, [searchTerm, trackEvent]);

  useEffect(() => {
    if (selectedIndustry) {
      trackEvent({
        name: 'case_studies_filter',
        category: 'filter',
        label: 'case_studies_industry_filter',
        properties: {
          selected_industry: selectedIndustry,
        },
      });
    }
  }, [selectedIndustry, trackEvent]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Handle industry filter selection
  const handleIndustrySelect = (industry: string | null): void => {
    setSelectedIndustry(industry === selectedIndustry ? null : industry);
    setIsFilterDropdownOpen(false);
  };

  // Handle clicking outside the filter dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (isFilterDropdownOpen && !target.closest('.filter-dropdown-container')) {
        setIsFilterDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-element-900 pt-32 pb-24 overflow-hidden">
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

        {/* Accent circle */}
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Case Studies
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Explore our portfolio of successful client projects across various industries.
              Real-world examples of how we deliver transformative software solutions that drive
              business growth.
            </p>
            <Link href="/contact">
              <TrackedButton
                size="lg"
                rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                trackingEvent={{
                  name: 'case_studies_cta_click',
                  category: 'conversion',
                  label: 'case_studies_contact',
                }}
                className="bg-white text-element-900 hover:bg-gray-100"
              >
                Start Your Project
              </TrackedButton>
            </Link>
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

      {/* Search and filter section */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search input */}
            <div className="relative md:w-1/2 lg:w-1/3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-element-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Industry filter - desktop (improved dropdown version) */}
            <div className="hidden md:block relative filter-dropdown-container">
              <button
                onClick={() => {
                  setIsFilterDropdownOpen(!isFilterDropdownOpen);
                }}
                className="flex items-center justify-between px-4 py-2 w-64 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-gray-600" />
                  <span>{selectedIndustry ?? 'All Industries'}</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-gray-600 transition-transform',
                    isFilterDropdownOpen && 'transform rotate-180'
                  )}
                />
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100 w-64 py-2 max-h-80 overflow-y-auto z-30">
                  <button
                    onClick={() => {
                      handleIndustrySelect(null);
                    }}
                    className={cn(
                      'w-full px-4 py-2 text-left hover:bg-gray-50',
                      selectedIndustry === null && 'bg-element-50 text-element-600 font-medium'
                    )}
                  >
                    All Industries
                  </button>

                  {industries.map((industry, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleIndustrySelect(industry);
                      }}
                      className={cn(
                        'w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center',
                        selectedIndustry === industry &&
                          'bg-element-50 text-element-600 font-medium'
                      )}
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      {industry}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter button (mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => {
                  setMobileFiltersOpen(!mobileFiltersOpen);
                }}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2" />
                <span>{mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
            </div>
          </div>

          {/* Mobile filters (collapsible) */}
          {mobileFiltersOpen && (
            <div className="mt-4 md:hidden">
              <h3 className="text-gray-700 font-medium mb-2">Filter by industry:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    handleIndustrySelect(null);
                  }}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm transition-colors',
                    selectedIndustry === null
                      ? 'bg-element-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  All Industries
                </button>
                {industries.map((industry, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleIndustrySelect(industry);
                    }}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm flex items-center transition-colors',
                      selectedIndustry === industry
                        ? 'bg-element-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <Briefcase className="h-3 w-3 mr-1" />
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured case studies */}
      {filteredFeaturedCaseStudies.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center">
              <div className="h-8 w-1 bg-element-500 mr-4 rounded-full"></div>
              Featured Case Studies
            </h2>

            <div className="grid grid-cols-1 gap-10">
              {filteredFeaturedCaseStudies.map(study => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  onClick={() => {
                    trackEvent({
                      name: 'featured_case_study_click',
                      category: 'navigation',
                      label: `featured_case_study_${study.slug}`,
                      properties: {
                        case_study_id: study.id,
                        case_study_title: study.title,
                        industry: study.industry,
                      },
                    });
                  }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-element-200">
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/2 relative">
                        <div className="aspect-video lg:h-full relative">
                          <Image
                            src={study.coverImage.src}
                            alt={study.coverImage.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-70"></div>
                          <div className="absolute top-4 left-4">
                            <div className="px-3 py-1 bg-element-500 text-white rounded-full text-sm font-medium">
                              Featured
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center">
                              <Briefcase className="h-3 w-3 mr-1" />
                              {study.industry}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-1/2 p-8 md:p-10 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-element-600 transition-colors duration-300">
                          {study.title}
                        </h3>
                        <p className="text-gray-500 mb-4 italic">{study.subtitle}</p>
                        <p className="text-gray-700 mb-8 line-clamp-3">{study.overview}</p>

                        <div className="flex items-center text-element-500 font-medium mt-auto group-hover:text-element-600 transition-colors duration-300">
                          <span>Read Case Study</span>
                          <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All case studies grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-4 md:mb-0">
              <div className="h-8 w-1 bg-gray-400 mr-4 rounded-full"></div>
              {selectedIndustry ? `${selectedIndustry} Case Studies` : 'All Case Studies'}
            </h2>
            <div className="text-sm text-gray-500 bg-white py-1 px-4 rounded-full border border-gray-200">
              Showing {filteredRegularCaseStudies.length}{' '}
              {filteredRegularCaseStudies.length === 1 ? 'result' : 'results'}
            </div>
          </div>

          {filteredRegularCaseStudies.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center">
              <div className="mb-6">
                <Search className="h-16 w-16 text-gray-300 mx-auto" />
              </div>
              <p className="text-xl text-gray-600 mb-6">
                No case studies found for your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry(null);
                }}
                className="text-element-500 hover:text-element-600 font-medium inline-flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Clear filters and try again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRegularCaseStudies.map(study => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  onClick={() => {
                    trackEvent({
                      name: 'case_study_click',
                      category: 'navigation',
                      label: `case_study_${study.slug}`,
                      properties: {
                        case_study_id: study.id,
                        case_study_title: study.title,
                        industry: study.industry,
                      },
                    });
                  }}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-element-200 h-full flex flex-col">
                    <div className="aspect-video relative">
                      <Image
                        src={study.coverImage.src}
                        alt={study.coverImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white rounded-full text-sm font-medium flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {study.industry}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-element-600 transition-colors duration-300">
                        {study.title}
                      </h3>
                      <p className="text-gray-500 italic mb-2">{study.subtitle}</p>
                      <p className="text-gray-600 line-clamp-3 mb-4 text-sm">{study.overview}</p>

                      <div className="flex items-center text-element-500 font-medium mt-auto group-hover:text-element-600 transition-colors duration-300">
                        <span>Read Case Study</span>
                        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-element-900 to-element-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Let's discuss how our expertise can help you achieve your business goals with custom
              software solutions.
            </p>
            <Link href="/contact">
              <TrackedButton
                size="lg"
                rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                trackingEvent={{
                  name: 'case_studies_footer_cta_click',
                  category: 'conversion',
                  label: 'case_studies_contact_footer',
                }}
                className="bg-white text-element-900 hover:bg-gray-100"
              >
                Schedule a Consultation
              </TrackedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
