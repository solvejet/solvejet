// src/components/Home/ServicesSection.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Code, Brain, HeadsetIcon, Users, Cloud, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesSectionProps {
  className?: string;
}

const services = [
  {
    title: 'Custom Software Development',
    description: 'Tailored software solutions for your business needs',
    icon: <Code className="h-6 w-6" />,
    color: 'bg-blue-500',
    link: '/services/custom-software-development',
  },
  {
    title: 'Artificial Intelligence',
    description: 'AI and machine learning solutions',
    icon: <Brain className="h-6 w-6" />,
    color: 'bg-purple-500',
    link: '/services/artificial-intelligence',
  },
  {
    title: 'IT Consulting',
    description: 'Strategic technology consulting',
    icon: <HeadsetIcon className="h-6 w-6" />,
    color: 'bg-green-500',
    link: '/services/it-consulting',
  },
  {
    title: 'IT Staff Augmentation',
    description: 'Skilled resources for your projects',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-amber-500',
    link: '/services/it-staff-augmentation',
  },
  {
    title: 'Cloud Services',
    description: 'AWS, Azure, and Google Cloud solutions',
    icon: <Cloud className="h-6 w-6" />,
    color: 'bg-teal-500',
    link: '/services/cloud-services',
  },
  {
    title: 'Mobile App Development',
    description: 'iOS and Android applications',
    icon: <Smartphone className="h-6 w-6" />,
    color: 'bg-red-500',
    link: '/services/mobile-app-development',
  },
];

// Define interface for ScrollTrigger instance instead of type
interface ScrollTriggerInstance {
  kill: () => void;
  vars: {
    trigger: HTMLElement | null;
  };
}

export default function ServicesSection({ className }: ServicesSectionProps): React.ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    if (!cardsRef.current)
      return (): void => {
        /* Empty cleanup */
      };

    const cards = Array.from(cardsRef.current.children);

    // Create a staggered animation for the cards
    gsap.fromTo(
      cards,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return (): void => {
      // Removed unnecessary condition since ScrollTrigger is always defined here
      const triggers = ScrollTrigger.getAll() as ScrollTriggerInstance[];
      triggers.forEach((trigger: ScrollTriggerInstance): void => {
        if (trigger.vars.trigger === cardsRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('py-24 bg-white dark:bg-gray-900 relative overflow-hidden', className)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-element-50 dark:bg-element-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-block px-4 py-1.5 bg-element-100 dark:bg-element-900/40 text-element-600 dark:text-element-400 rounded-full text-sm font-medium mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Comprehensive Solutions for Your Business
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                From custom software development to cloud infrastructure, we provide end-to-end
                services to transform your business.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button
                variant="outline"
                size="lg"
                className="border-element-500 text-element-500 hover:bg-element-50 dark:border-element-400 dark:text-element-400 dark:hover:bg-element-900/20"
                rightIcon={<ArrowRight className="h-4 w-4 ml-2" />}
              >
                View all services
              </Button>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-element-200 dark:hover:border-element-700"
            >
              <div
                className={`${service.color} p-3 rounded-xl inline-flex items-center justify-center text-white mb-4`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
              <a
                href={service.link}
                className="inline-flex items-center text-element-500 dark:text-element-400 font-medium hover:text-element-600 dark:hover:text-element-300 transition-colors"
              >
                Learn more
                <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Need a custom solution? Let's discuss how we can help your business grow.
          </p>
          <Button
            className="bg-element-500 hover:bg-element-600 text-white px-8 py-3"
            rightIcon={<ArrowRight className="h-5 w-5 ml-2" />}
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
