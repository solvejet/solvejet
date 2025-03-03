// src/components/Home/IndustrySection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Building2, ShoppingCart, Factory, Truck, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { JSX } from 'react';

interface Industry {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  content: string;
}

interface IndustrySectionProps {
  industry: Industry;
  isActive: boolean;
  index: number;
}

export default function IndustrySection({
  industry,
  isActive,
  index,
}: IndustrySectionProps): React.ReactElement {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect((): void => {
    // No need for GSAP animations here, they're handled in HomeClient
    // This component just needs to show content based on isActive prop
  }, [isActive]);

  // Select the icon based on iconName with proper return type annotation
  const getIcon = (iconName: string): JSX.Element => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="h-8 w-8" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-8 w-8" />;
      case 'Factory':
        return <Factory className="h-8 w-8" />;
      case 'Truck':
        return <Truck className="h-8 w-8" />;
      case 'Plane':
        return <Plane className="h-8 w-8" />;
      default:
        return <Building2 className="h-8 w-8" />;
    }
  };

  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center px-4 py-4 sm:py-8 md:py-10',
        'bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-500 ease-out',
        'border border-gray-200 dark:border-gray-700',
        isActive ? 'active scale-100' : 'inactive scale-95'
      )}
      data-section-id={industry.id}
    >
      {/* Content container */}
      <div className="w-full max-w-7xl mx-auto py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div ref={contentRef} className="space-y-6 text-center lg:text-left">
            {/* Tag and heading */}
            <div className="space-y-2">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${industry.color.replace(
                  'bg-',
                  'bg-opacity-20 text-'
                )}`}
              >
                Industry Solutions
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                {industry.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
                {industry.description}
              </p>
            </div>

            {/* Features list */}
            <div className="mt-8 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-lg">{industry.content}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  'Customizable solutions',
                  'Scalable architecture',
                  'Data analytics',
                  'Integration capabilities',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full ${industry.color} flex items-center justify-center mr-3`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className={`px-6 py-3 ${industry.color} hover:bg-opacity-90 text-white`}
                rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
              >
                Learn more
              </Button>

              <Button
                variant="outline"
                className="px-6 py-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                View case studies
              </Button>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="flex justify-center lg:justify-end">
            <div
              className={cn(
                'relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden',
                'transition-all duration-500'
              )}
            >
              {/* Industry icon background */}
              <div
                className={`absolute inset-0 flex items-center justify-center ${industry.color} bg-opacity-10 dark:bg-opacity-20`}
              >
                <div
                  className={`p-6 rounded-full ${industry.color} bg-opacity-20 dark:bg-opacity-30`}
                >
                  <div className={`p-6 rounded-full ${industry.color} text-white`}>
                    {getIcon(industry.iconName)}
                  </div>
                </div>
              </div>

              {/* Overlay elements */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex flex-col items-center sm:items-start">
                  <h3 className="text-xl font-semibold text-white">{industry.title} Solutions</h3>
                  <p className="text-white/80 text-sm mt-2">Tailored for your business needs</p>
                </div>
              </div>

              {/* Card indicator showing position in stack */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg py-1 px-3 shadow-md">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {index + 1} / 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
