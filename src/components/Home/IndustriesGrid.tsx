// src/components/Home/IndustriesGrid.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Industry {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  iconName: string;
  color: string;
  content?: string;
  imagePath?: string;
}

interface IndustriesGridProps {
  industries: Industry[];
  className?: string;
}

export default function IndustriesGrid({
  industries,
  className,
}: IndustriesGridProps): React.ReactElement {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Use a 2-3 layout - 2 rectangular cards on top, 3 square cards on bottom
  const topIndustries = industries.slice(0, 2);
  const bottomIndustries = industries.slice(2);

  return (
    <section className={cn('py-24 bg-white rounded-t-3xl', className)}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 md:mb-0">
            Industries
          </h2>
          <p className="text-xl text-gray-600 max-w-lg">
            We can help you do more in your area of expertise
          </p>
        </div>

        {/* Top row - 2 larger rectangular cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {topIndustries.map(industry => (
            <div
              key={industry.id}
              className="relative group overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300"
              onMouseEnter={() => {
                setHoveredCard(industry.id);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
            >
              {/* Background image with overlay */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={industry.imagePath ?? `/images/industries/${industry.id}.webp`}
                  alt={`${industry.title} industry`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              </div>

              {/* Content overlay - positioned at bottom */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                <div
                  className="flex flex-col transition-all duration-300"
                  style={{
                    transform: hoveredCard === industry.id ? 'translateY(-24px)' : 'translateY(0)',
                  }}
                >
                  <h3 className="text-2xl font-normal text-white mb-2">{industry.title}</h3>

                  {/* Underline border that moves with the title */}
                  <div className="w-[95%] h-px bg-white/40 mb-4 transition-transform duration-300"></div>

                  {/* Description shown on hover */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      hoveredCard === industry.id
                        ? 'max-h-24 opacity-100 mb-5'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-white/90 text-sm">
                      {industry.shortDescription ??
                        'We provide cutting-edge solutions tailored for this industry.'}
                    </p>
                  </div>

                  {/* Bottom action row with Learn More link and button (shown on hover) */}
                  <div
                    className={`flex items-center justify-end gap-4 transition-all duration-300 ${
                      hoveredCard === industry.id
                        ? 'opacity-100 max-h-10'
                        : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    <Link
                      href={`/industries/${industry.id}`}
                      className={`text-white inline-flex items-center transition-all duration-300 hover:text-yellow-400`}
                    >
                      <span>Learn more</span>
                    </Link>

                    <Link
                      href={`/industries/${industry.id}`}
                      className={`h-10 w-10 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-yellow-400 ${
                        hoveredCard === industry.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      aria-label={`Learn more about ${industry.title}`}
                    >
                      <ArrowUpRight className="h-5 w-5 text-gray-900" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom grid - 3 square cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottomIndustries.map(industry => (
            <div
              key={industry.id}
              className="relative group overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300 hover:shadow-lg"
              onMouseEnter={() => {
                setHoveredCard(industry.id);
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
              }}
            >
              {/* Background image with overlay */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={industry.imagePath ?? `/images/industries/${industry.id}.webp`}
                  alt={`${industry.title} industry`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
              </div>

              {/* Content overlay - positioned at bottom */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                <div
                  className="flex flex-col transition-all duration-300"
                  style={{
                    transform: hoveredCard === industry.id ? 'translateY(-16px)' : 'translateY(0)',
                  }}
                >
                  <h3 className="text-xl font-normal text-white mb-2">{industry.title}</h3>

                  {/* Underline border that moves with the title */}
                  <div className="w-[95%] h-px bg-white/40 mb-3 transition-transform duration-300"></div>

                  {/* Description shown on hover */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      hoveredCard === industry.id
                        ? 'max-h-20 opacity-100 mb-4'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-white/90 text-xs">
                      {industry.shortDescription ??
                        'We provide cutting-edge solutions tailored for this industry.'}
                    </p>
                  </div>

                  {/* Bottom action row with Learn More link and button (shown on hover) */}
                  <div
                    className={`flex items-center justify-end gap-3 transition-all duration-300 ${
                      hoveredCard === industry.id
                        ? 'opacity-100 max-h-10'
                        : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    <Link
                      href={`/industries/${industry.id}`}
                      className={`text-white text-sm inline-flex items-center transition-all duration-300 hover:text-yellow-400`}
                    >
                      <span>Learn more</span>
                    </Link>

                    <Link
                      href={`/industries/${industry.id}`}
                      className={`h-8 w-8 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-yellow-400 ${
                        hoveredCard === industry.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      aria-label={`Learn more about ${industry.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4 text-gray-900" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
