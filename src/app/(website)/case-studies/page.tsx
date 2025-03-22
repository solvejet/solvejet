// src/app/(website)/case-studies/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import caseStudies from '@/data/case-studies';
import getCaseStudiesListStructuredData from '@/lib/structured-data';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Case Studies - Client Success Stories | SolveJet',
  description:
    'Explore our portfolio of successful client projects and digital transformations across various industries including fintech, healthcare, retail, and more.',
  keywords: ['case studies', 'success stories', 'client projects', 'digital transformation'],
};

export default function CaseStudiesPage(): JSX.Element {
  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCaseStudiesListStructuredData()),
        }}
      />

      {/* Hero Section */}
      <section className="pt-24 md:pt-36 pb-16 bg-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-element-900/20 blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-element-800/10 blur-3xl"></div>
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 opacity-20 hero-grid" aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Real-world success stories showcasing how our solutions have transformed businesses
              and delivered measurable results
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {caseStudies.map((caseStudy, index) => (
              <Link
                key={caseStudy.id}
                href={`/case-studies/${caseStudy.slug}`}
                className={cn(
                  'bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700',
                  'hover:shadow-xl transition-all duration-300 hover:border-element-300 dark:hover:border-element-700 group',
                  index === 0 ? 'md:col-span-2' : ''
                )}
              >
                <div className={cn('flex flex-col', index === 0 ? 'md:flex-row' : '')}>
                  {/* Image */}
                  <div
                    className={cn(
                      'relative overflow-hidden',
                      index === 0 ? 'md:w-1/2 h-64 md:h-auto' : 'h-56'
                    )}
                  >
                    <Image
                      src={caseStudy.coverImage.src}
                      alt={caseStudy.coverImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes={
                        index === 0
                          ? '(max-width: 768px) 100vw, 50vw'
                          : '(max-width: 768px) 100vw, 33vw'
                      }
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center px-3 py-1 bg-element-500/90 rounded-full text-white text-xs font-medium">
                        {caseStudy.industry}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      'p-6 flex flex-col',
                      index === 0 ? 'md:w-1/2' : '',
                      'justify-between h-full'
                    )}
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-element-600 dark:group-hover:text-element-400 transition-colors">
                        {caseStudy.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {caseStudy.overview}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {caseStudy.services.slice(0, 3).map((service, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            {service}
                          </span>
                        ))}
                        {caseStudy.services.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            +{caseStudy.services.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center text-element-600 dark:text-element-400 font-medium">
                        <span>View Case Study</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                {index === 0 && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap justify-between">
                    {caseStudy.results.metrics.slice(0, 4).map((metric, i) => (
                      <div key={i} className="text-center px-2">
                        <div className="text-xl md:text-2xl font-bold text-element-600 dark:text-element-400">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="bg-gradient-to-r from-element-900 to-blue-900 rounded-2xl p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your business goals with custom-tailored
              digital solutions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-element-900 font-medium rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
