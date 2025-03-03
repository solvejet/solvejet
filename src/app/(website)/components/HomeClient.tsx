// src/app/(website)/components/HomeClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FeaturesSection from '@/components/Home/FeaturesSection';
import HeroSection from '@/components/Home/HeroSection';
import IndustrySection from '@/components/Home/IndustrySection';
import ServicesSection from '@/components/Home/ServicesSection';

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Industry {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  content: string;
}

const industries: Industry[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'PropTech solutions for the modern real estate industry',
    iconName: 'Building2',
    color: 'bg-blue-500',
    content: 'Innovative solutions for property management, sales, and analytics.',
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Digital commerce solutions for global reach',
    iconName: 'ShoppingCart',
    color: 'bg-purple-500',
    content: 'Scalable platforms, payment integrations, and inventory management.',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Industry 4.0 and smart manufacturing',
    iconName: 'Factory',
    color: 'bg-green-500',
    content: 'IoT integration, process automation, and supply chain optimization.',
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Supply chain and logistics optimization',
    iconName: 'Truck',
    color: 'bg-amber-500',
    content: 'Route optimization, warehouse management, and delivery tracking.',
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    description: 'Digital solutions for travel businesses',
    iconName: 'Plane',
    color: 'bg-teal-500',
    content: 'Booking systems, customer experience, and operational efficiency.',
  },
];

// Rotation values for each card for a more natural look
const rotations: number[] = [-2, 1, -1.5, 1, -0.5];

export default function HomeClient(): React.ReactElement {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const industryStickyContainerRef = useRef<HTMLDivElement>(null);
  const industrySectionsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect((): (() => void) => {
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);

    let initialized = false;

    // Initialize GSAP only once DOM is ready
    const initScrollAnimation = (): void => {
      if (!industryStickyContainerRef.current || !industrySectionsRef.current || initialized)
        return;

      // Clear existing ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger): void => {
        trigger.kill();
      });

      // Get all the industry section cards
      const cards = gsap.utils.toArray<HTMLElement>('.industry-card');

      if (cards.length === 0) return;

      // Set initial positions of all cards (below the viewport)
      cards.forEach((card, index): void => {
        gsap.set(card, {
          y: window.innerHeight,
          rotate: rotations[index] ?? 0,
          opacity: 0,
        });
      });

      // Get the hero element to calculate its position
      const heroElement = heroRef.current;
      const heroHeight = heroElement?.offsetHeight ?? window.innerHeight;

      // Create the main ScrollTrigger for the industry stacking effect
      // Start the effect when we reach the bottom portion of the hero section
      ScrollTrigger.create({
        trigger: industryStickyContainerRef.current,
        start: `top+=${String(Math.max(0, heroHeight - window.innerHeight - 100))}px top`, // Start when we're 100px from the bottom of hero
        end: `+=${String(window.innerHeight * 3)}px`, // End after 3 viewport heights of scrolling
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self): void => {
          const progress = self.progress;
          const totalCards = cards.length;
          const progressPerCard = 1 / totalCards;

          // Update active section based on progress
          const newActiveIndex = Math.min(Math.floor(progress * totalCards), totalCards - 1);
          setActiveSection(newActiveIndex);

          // Animate each card based on scroll progress
          cards.forEach((card, index): void => {
            const cardStart = index * progressPerCard;
            let cardProgress = (progress - cardStart) / progressPerCard;
            cardProgress = Math.min(Math.max(cardProgress, 0), 1);

            // Calculate vertical position based on progress
            let yPos = window.innerHeight * (1 - cardProgress);
            let xPos = 0;
            let opacity = cardProgress;
            let scale = 0.9 + 0.1 * cardProgress;

            // If this card is fully shown and we're scrolling to the next one,
            // move this card out of the way
            if (cardProgress === 1 && index < totalCards - 1) {
              const remainingProgress =
                (progress - (cardStart + progressPerCard)) / (1 - (cardStart + progressPerCard));

              if (remainingProgress > 0) {
                const distanceMultiplier = 1 - index * 0.15;
                xPos = -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
                yPos = -window.innerHeight * 0.3 * distanceMultiplier * remainingProgress;
                opacity = 1 - remainingProgress * 0.7;
                scale = scale - remainingProgress * 0.1;
              }
            }

            // Apply the animation
            gsap.to(card, {
              y: yPos,
              x: xPos,
              opacity: opacity,
              scale: scale,
              duration: 0,
              ease: 'none',
            });
          });
        },
      });

      // Set up additional sections animation
      const additionalSections = document.querySelectorAll('.additional-section');
      additionalSections.forEach((section): void => {
        gsap.from(section, {
          opacity: 0,
          y: 100,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            scrub: false,
          },
        });
      });

      initialized = true;
    };

    // Wait a moment for the DOM to be fully rendered
    const timer = setTimeout(initScrollAnimation, 200);

    // Run again when window is resized
    const handleResize = (): void => {
      initialized = false;

      ScrollTrigger.getAll().forEach((trigger): void => {
        trigger.kill();
      });

      setTimeout(initScrollAnimation, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return (): void => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);

      // Kill all GSAP instances
      ScrollTrigger.getAll().forEach((trigger): void => {
        trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Hero Section - Fixed in position, no animation on scroll */}
      <div ref={heroRef} className="relative">
        <HeroSection />
      </div>

      {/* Industry Sections Container - Starts below hero and then stacks cards */}
      <div
        ref={industryStickyContainerRef}
        className="sticky-container relative w-full overflow-hidden"
        style={{ height: '300vh' }} // Height for scrolling
      >
        <div
          ref={industrySectionsRef}
          className="industry-sections-container sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center"
        >
          {/* Industry Sections that will stack */}
          {industries.map((industry, index) => {
            // Safely compute z-index as a string to avoid template literal type errors
            const zIndex =
              activeSection === index ? 'z-10' : `z-${String(Math.max(0, 10 - index))}`;

            return (
              <div
                key={industry.id}
                className={`industry-card absolute w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-1/2 ${zIndex}`}
              >
                <IndustrySection
                  industry={industry}
                  isActive={activeSection === index}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Regular scrolling sections that come after */}
      <div className="pt-16 pb-24">
        <FeaturesSection className="additional-section" />
        <ServicesSection className="additional-section" />
      </div>
    </div>
  );
}
