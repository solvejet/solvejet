// src/components/Home/IndustriesGrid.tsx
'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';

export interface Industry {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  iconName: string;
  color: string;
  content?: string;
  imagePath?: string;
}

interface IndustryCardProps {
  industry: Industry;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  priority?: boolean;
  index: number;
  isLarge?: boolean;
}

interface IndustriesGridProps {
  industries: Industry[];
  className?: string;
}

// Define IndustryCard without memo
function IndustryCard({
  industry,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  priority = false,
  index,
  isLarge = false,
}: IndustryCardProps): React.ReactElement {
  const { trackEvent } = useAnalytics();

  const handleLinkClick = useCallback(() => {
    trackEvent({
      name: 'industry_card_click',
      category: 'navigation',
      label: `industry_${industry.id}`,
      properties: {
        industry_id: industry.id,
        industry_title: industry.title,
        position: index,
        is_large_card: isLarge,
      },
    });
  }, [trackEvent, industry.id, industry.title, index, isLarge]);

  // Aspect ratio and sizing based on card type
  const aspectRatio = isLarge ? 'aspect-[16/9]' : 'aspect-square';

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300 hover:shadow-lg`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter} // Keyboard focus triggers same behavior as hover
      tabIndex={0} // Make div focusable for keyboard navigation
    >
      {/* Background image with overlay - optimized */}
      <div className={`${aspectRatio} relative overflow-hidden`}>
        <Image
          src={industry.imagePath ?? `/images/industries/${industry.id}.webp`}
          alt={`${industry.title} industry visualization`}
          fill
          sizes={
            isLarge
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={isLarge ? 75 : 70} // Reduced quality for better performance
        />
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            backgroundColor: isHovered ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.4)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content overlay - positioned at bottom */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10">
        <div
          className="flex flex-col transition-all duration-300"
          style={{
            transform: isHovered ? `translateY(-${isLarge ? '24px' : '16px'})` : 'translateY(0)',
          }}
        >
          <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-normal text-white mb-2`}>
            {industry.title}
          </h3>

          {/* Underline border that moves with the title */}
          <div
            className="w-[95%] h-px bg-white/40 mb-4 transition-transform duration-300"
            aria-hidden="true"
          />

          {/* Description shown on hover - simplified for better performance */}
          {isHovered && (
            <p className={`text-white/90 text-${isLarge ? 'sm' : 'xs'} mb-${isLarge ? '5' : '4'}`}>
              {industry.shortDescription ??
                'We provide cutting-edge solutions tailored for this industry.'}
            </p>
          )}

          {/* Bottom action row with Learn More link and button - simplified */}
          {isHovered && (
            <div className={`flex items-center justify-end gap-${isLarge ? '4' : '3'}`}>
              <Link
                href={`/industries/${industry.id}`}
                className={`text-white inline-flex items-center transition-all duration-300 hover:text-yellow-400 text-${
                  isLarge ? 'base' : 'sm'
                }`}
                onClick={handleLinkClick}
              >
                <span>Learn more about {industry.title}</span>
              </Link>

              <Link
                href={`/industries/${industry.id}`}
                className={`h-${isLarge ? '10' : '8'} w-${
                  isLarge ? '10' : '8'
                } rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:bg-yellow-400`}
                aria-label={`Learn more about ${industry.title} industry solutions`}
                onClick={handleLinkClick}
              >
                <ArrowUpRight
                  className={`h-${isLarge ? '5' : '4'} w-${isLarge ? '5' : '4'} text-gray-900`}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main component without memoization
function IndustriesGrid({ industries, className }: IndustriesGridProps): React.ReactElement {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { trackEvent } = useAnalytics();

  // Use 2-3 layout - 2 rectangular cards on top, 3 square cards on bottom
  const topIndustries = industries.slice(0, 2);
  const bottomIndustries = industries.slice(2);

  // Track section view - once when component mounts
  React.useEffect(() => {
    // Delay tracking slightly to prioritize rendering
    const trackingTimeout = setTimeout(() => {
      trackEvent({
        name: 'industries_grid_view',
        category: 'engagement',
        label: 'industries_section',
        properties: {
          industry_count: industries.length,
          industry_categories: industries.map(i => i.id).join(','),
        },
      });
    }, 500);

    return (): void => {
      clearTimeout(trackingTimeout);
    };
  }, [trackEvent, industries]);

  // Memoized hover handlers
  const createHoverHandler = useCallback(
    (industryId: string, isEnter: boolean) => {
      return (): void => {
        setHoveredCard(isEnter ? industryId : null);

        // Only track hover events that last for meaningful engagement (300ms)
        if (isEnter) {
          const timer = setTimeout(() => {
            trackEvent({
              name: 'industry_card_hover',
              category: 'engagement',
              label: `industry_${industryId}_hover`,
              properties: {
                industry_id: industryId,
              },
            });
          }, 300);

          // Remove the return since it's a void function and never used
          setTimeout(() => {
            clearTimeout(timer);
          }, 310);
        }
      };
    },
    [trackEvent]
  );

  return (
    <section className={cn('py-24 bg-white rounded-t-3xl', className)}>
      <div className="container mx-auto px-4 max-w-7xl rounded-t-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 md:mb-0">
            Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-lg">
            We can help you do more in your area of expertise
          </p>
        </div>

        {/* Top row - 2 larger rectangular cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {topIndustries.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              isHovered={hoveredCard === industry.id}
              onMouseEnter={createHoverHandler(industry.id, true)}
              onMouseLeave={createHoverHandler(industry.id, false)}
              priority={index === 0} // Only prioritize the first image
              index={index}
              isLarge={true}
            />
          ))}
        </div>

        {/* Bottom grid - only show available industries */}
        {bottomIndustries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bottomIndustries.map((industry, index) => (
              <IndustryCard
                key={industry.id}
                industry={industry}
                isHovered={hoveredCard === industry.id}
                onMouseEnter={createHoverHandler(industry.id, true)}
                onMouseLeave={createHoverHandler(industry.id, false)}
                priority={false} // Don't prioritize loading for bottom row
                index={index + topIndustries.length}
                isLarge={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default IndustriesGrid;
