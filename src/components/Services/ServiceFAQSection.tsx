// src/components/Services/ServiceFAQSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceFAQSectionProps {
  className?: string;
}

// FAQ items data
const faqItems = [
  {
    id: 'faq-1',
    question: 'What types of services does SolveJet offer?',
    answer: 'SolveJet offers a comprehensive range of technology services including custom software development, cloud services, AI and machine learning solutions, mobile app development, MVP development, data analytics, IT staff augmentation, and IT consulting. We tailor our services to meet the specific needs of businesses across various industries.',
  },
  {
    id: 'faq-2',
    question: 'How does your software development process work?',
    answer: 'Our software development process follows a structured yet flexible approach that includes discovery and planning, design and architecture, development and testing, and deployment and support. We use agile methodologies to ensure iterative development with continuous feedback and improvement throughout the project lifecycle.',
  },
  {
    id: 'faq-3',
    question: 'What industries do you specialize in?',
    answer: 'We have expertise across multiple industries including real estate and PropTech, e-commerce and retail, manufacturing, logistics and supply chain, travel and hospitality, healthcare, fintech, and more. Our cross-industry experience allows us to bring innovative solutions and best practices to any business domain.',
  },
  {
    id: 'faq-4',
    question: 'How long does it typically take to complete a project?',
    answer: 'Project timelines vary based on scope, complexity, and specific requirements. A simple MVP might take 2-3 months, while enterprise-level solutions can span 6-12 months or more. During our initial consultation, we`ll provide a detailed timeline estimate for your specific project after understanding your needs fully.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes, we offer comprehensive post-deployment support and maintenance services to ensure your solution continues to operate optimally. We provide various support packages including regular updates, performance monitoring, bug fixes, security patches, and system enhancements depending on your needs.',
  },
  {
    id: 'faq-6',
    question: 'What technologies do you work with?',
    answer: 'We work with a wide range of modern technologies including React, Next.js, Vue.js, Angular, Node.js, Python, Java, .NET, AWS, Azure, Google Cloud, Kubernetes, Docker, TensorFlow, PyTorch, and many others. Our technology stack selection is always driven by your specific project requirements and business goals rather than our preferences.',
  },
];

const FAQItem: React.FC<{
  item: typeof faqItems[0];
  isOpen: boolean;
  toggleAccordion: () => void;
  onInteraction: (id: string, action: string) => void;
}> = ({ item, isOpen, toggleAccordion, onInteraction }) => {
  return (
    <div className="mb-4">
      <button
        className="w-full text-left bg-white dark:bg-gray-700 rounded-xl px-6 py-4 flex justify-between items-center hover:shadow-md transition-all duration-300"
        onClick={() => {
          toggleAccordion();
          onInteraction(item.id, isOpen ? 'collapse' : 'expand');
        }}
        aria-expanded={isOpen}
        aria-controls={`content-${item.id}`}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.question}</h3>
        <span className="text-element-500 dark:text-element-400 ml-4">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>
      <div
        id={`content-${item.id}`}
        className={cn(
          "overflow-hidden transition-all duration-300 rounded-b-xl",
          isOpen
            ? "max-h-80 opacity-100 bg-white dark:bg-gray-700 mt-1 px-6 py-4"
            : "max-h-0 opacity-0"
        )}
      >
        <p className="text-gray-600 dark:text-gray-300">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

export default function ServiceFAQSection({ className }: ServiceFAQSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>('faq-1'); // First one open by default

  // Track section view
  useEffect(() => {
    trackEvent({
      name: 'faq_section_view',
      category: 'engagement',
      label: 'faq_section',
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [trackEvent]);

  // Toggle FAQ accordion
  const toggleAccordion = (id: string): void => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  // Track FAQ interactions
  const handleFAQInteraction = (id: string, action: string): void => {
    trackEvent({
      name: `faq_${action}`,
      category: 'engagement',
      label: id,
      properties: {
        faq_id: id,
        action: action,
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className={cn('py-8 ', className)}
      id="services-faq-section"
    >
      <div className="container mx-auto px-4 max-w-[95rem]">
        {/* Section header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="text-md font-medium text-element-500 dark:text-element-400 inline-block mb-2">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Get answers to the most common questions about our services, processes, and technology solutions.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className={cn(
          "max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openFAQ === item.id}
              toggleAccordion={() => { toggleAccordion(item.id); }}
              onInteraction={handleFAQInteraction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
