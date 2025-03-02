// src/app/(website)/components/HomeClient.tsx
'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactElement } from 'react';

// Lazy load non-critical components
const Button = lazy(() => import('@/components/ui/Button').then(mod => ({ default: mod.Button })));

export default function HomeClient(): ReactElement {
  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Hero Section with optimized LCP */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-element-500 mix-blend-multiply opacity-10" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          {/* Pre-rendered critical h1 for faster LCP */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
            style={{
              // Inline critical styles to avoid CLS
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
            data-font-display="swap" // Custom attribute instead of inline style
          >
            Transform Your Business with{' '}
            <span className="text-element-500">Innovative Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8">
            We build cutting-edge software solutions that help businesses scale, innovate, and
            succeed in the digital age.
          </p>

          {/* Conditionally render buttons after mount for hydration */}
          {isMounted ? (
            <div className="flex justify-center gap-4">
              <Suspense
                fallback={
                  <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-element-500 text-white">
                    Get Started
                  </div>
                }
              >
                <Button size="lg" onClick={() => (window.location.href = '/contact')}>
                  Get Started
                </Button>
              </Suspense>
              <Suspense
                fallback={
                  <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-element-500 text-element-500">
                    Learn More About Our Services
                  </div>
                }
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => (window.location.href = '/services')}
                >
                  Learn More About Our Services
                </Button>
              </Suspense>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-element-500 text-white">
                Get Started
              </div>
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-element-500 text-element-500">
                Learn More About Our Services
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We offer comprehensive software development services tailored to your unique business
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Software Development',
                description:
                  'Tailored solutions built with cutting-edge technology to meet your specific needs.',
              },
              {
                title: 'Mobile App Development',
                description:
                  'Native and cross-platform mobile applications for iOS and Android platforms.',
              },
              {
                title: 'Web Development',
                description:
                  'Responsive and user-friendly web applications with modern technologies.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <Link
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-element-500 hover:text-element-600 dark:hover:text-element-400 inline-flex items-center"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Explore {service.title}
                  <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We combine technical expertise with industry knowledge to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Skilled developers with years of industry experience.',
              },
              {
                title: 'Quality Focus',
                description: 'Rigorous testing and quality assurance processes.',
              },
              {
                title: 'Timely Delivery',
                description: 'We respect deadlines and deliver on time, every time.',
              },
              {
                title: 'Ongoing Support',
                description: '24/7 support and maintenance for your solutions.',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-element-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help transform your business.
          </p>

          {isMounted ? (
            <Suspense
              fallback={
                <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-white text-white">
                  Contact Us Today
                </div>
              }
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-element-500"
                onClick={() => (window.location.href = '/contact')}
              >
                Contact Us Today
              </Button>
            </Suspense>
          ) : (
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-white text-white">
              Contact Us Today
            </div>
          )}
        </div>
      </section>
    </>
  );
}
