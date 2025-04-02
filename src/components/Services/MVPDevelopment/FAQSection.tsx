// src/components/Services/MVPDevelopment/FAQSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/lib/analytics/hooks/useAnalytics';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  plainTextAnswer?: string; // Plain text version for schema
}

interface FAQSectionProps {
  className?: string;
}

export default function FAQSection({ className }: FAQSectionProps): React.ReactElement {
  const { trackEvent } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Track view event
    trackEvent({
      name: 'mvp_faq_view',
      category: 'engagement',
      label: 'mvp_development_faq',
    });

    // Set up intersection observer for animation triggers
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

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);

    if (openIndex !== index) {
      trackEvent({
        name: 'mvp_faq_expand',
        category: 'engagement',
        label: `faq_${String(index + 1)}_expand`,
      });
    }
  };

  // FAQ data with plain text answers for schema - specific to MVP development
  const faqItems: FAQItem[] = [
    {
      question: 'What is an MVP?',
      answer: (
        <p>
          An MVP (Minimum Viable Product) is a product with just enough features to satisfy early
          customers and provide feedback for future development. It focuses on the core value
          proposition and essential functionalities that solve the primary user problem, allowing
          for market validation with minimal resources. MVPs are about learning as efficiently as
          possible, testing business hypotheses, and iterating based on real user feedback.
        </p>
      ),
      plainTextAnswer:
        'An MVP (Minimum Viable Product) is a product with just enough features to satisfy early customers and provide feedback for future development. It focuses on the core value proposition and essential functionalities that solve the primary user problem, allowing for market validation with minimal resources. MVPs are about learning as efficiently as possible, testing business hypotheses, and iterating based on real user feedback.',
    },
    {
      question: 'How long does it take to build an MVP?',
      answer: (
        <div>
          <p className="mb-4">
            The timeline for MVP development can vary significantly based on complexity, but we
            typically follow these timeframes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Discovery and planning: 1-2 weeks</li>
            <li>Design and prototyping: 2-4 weeks</li>
            <li>Development: 4-12 weeks</li>
            <li>Testing and refinement: 1-3 weeks</li>
            <li>Launch preparation: 1 week</li>
          </ul>
          <p className="mt-4">
            Many MVPs can be delivered within 8-16 weeks from start to finish. We prioritize speed
            while ensuring the product properly validates your core business hypotheses. During our
            initial consultation, we'll provide a more specific timeline based on your project
            requirements.
          </p>
        </div>
      ),
      plainTextAnswer:
        'The timeline for MVP development can vary significantly based on complexity, but we typically follow these timeframes: Discovery and planning (1-2 weeks), Design and prototyping (2-4 weeks), Development (4-12 weeks), Testing and refinement (1-3 weeks), and Launch preparation (1 week). Many MVPs can be delivered within 8-16 weeks from start to finish. We prioritize speed while ensuring the product properly validates your core business hypotheses. During our initial consultation, we`ll provide a more specific timeline based on your project requirements.',
    },
    {
      question: 'How much does it cost to develop an MVP?',
      answer: (
        <p>
          MVP development costs typically range from $25,000 to $150,000, depending on scope,
          complexity, and platform requirements. Simple web-based MVPs might start around
          $25,000-$50,000, while more complex apps with multiple user types or integrations can
          range from $50,000-$150,000. We offer flexible engagement models including fixed-price
          packages for startups with defined budgets. Following our discovery phase, we'll provide a
          detailed estimate aligned with your business goals and funding situation.
        </p>
      ),
      plainTextAnswer:
        'MVP development costs typically range from $25,000 to $150,000, depending on scope, complexity, and platform requirements. Simple web-based MVPs might start around $25,000-$50,000, while more complex apps with multiple user types or integrations can range from $50,000-$150,000. We offer flexible engagement models including fixed-price packages for startups with defined budgets. Following our discovery phase, we`ll provide a detailed estimate aligned with your business goals and funding situation.',
    },
    {
      question: 'What features should I include in my MVP?',
      answer: (
        <div>
          <p className="mb-4">
            Determining the right features for your MVP requires a focused approach:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Focus on solving one core problem exceptionally well</li>
            <li>Prioritize features that directly support your key value proposition</li>
            <li>Include only what's necessary to test your primary business hypotheses</li>
            <li>
              Consider the minimum functionality needed for users to complete the core journey
            </li>
            <li>Postpone nice-to-have features for future iterations</li>
          </ul>
          <p className="mt-4">
            During our discovery phase, we'll help you prioritize features using frameworks like
            MoSCoW (Must-haves, Should-haves, Could-haves, and Won't-haves) to ensure your MVP
            effectively validates your business model while keeping development time and costs
            reasonable.
          </p>
        </div>
      ),
      plainTextAnswer:
        "Determining the right features for your MVP requires a focused approach: Focus on solving one core problem exceptionally well, prioritize features that directly support your key value proposition, include only what's necessary to test your primary business hypotheses, consider the minimum functionality needed for users to complete the core journey, and postpone nice-to-have features for future iterations. During our discovery phase, we'll help you prioritize features using frameworks like MoSCoW (Must-haves, Should-haves, Could-haves, and Won't-haves) to ensure your MVP effectively validates your business model while keeping development time and costs reasonable.",
    },
    {
      question: 'How do you ensure my MVP is scalable for future growth?',
      answer: (
        <div>
          <p className="mb-4">
            While MVPs focus on minimum features, we build with future scaling in mind through:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Solid architecture:</strong> Designing clean, modular code architecture that
              supports future expansion
            </li>
            <li>
              <strong>Technology selection:</strong> Choosing scalable tech stacks suitable for your
              growth trajectory
            </li>
            <li>
              <strong>Cloud infrastructure:</strong> Utilizing cloud-based solutions that scale
              automatically with user growth
            </li>
            <li>
              <strong>Database design:</strong> Creating database schemas that accommodate evolving
              data requirements
            </li>
            <li>
              <strong>API-first approach:</strong> Building extensible APIs that allow for future
              integrations
            </li>
          </ul>
          <p className="mt-4">
            We strike the right balance between rapid MVP delivery and thoughtful technical choices
            that prevent costly rewrites later. Our approach focuses on key scalability aspects
            while keeping initial development lean.
          </p>
        </div>
      ),
      plainTextAnswer:
        'While MVPs focus on minimum features, we build with future scaling in mind through: Solid architecture - Designing clean, modular code architecture that supports future expansion; Technology selection - Choosing scalable tech stacks suitable for your growth trajectory; Cloud infrastructure - Utilizing cloud-based solutions that scale automatically with user growth; Database design - Creating database schemas that accommodate evolving data requirements; API-first approach - Building extensible APIs that allow for future integrations. We strike the right balance between rapid MVP delivery and thoughtful technical choices that prevent costly rewrites later. Our approach focuses on key scalability aspects while keeping initial development lean.',
    },
    {
      question: 'What happens after the MVP is launched?',
      answer: (
        <div>
          <p className="mb-4">Post-launch is a critical phase in the MVP journey, focusing on:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>User feedback collection:</strong> Implementing analytics, conducting user
              interviews, and gathering quantitative/qualitative data
            </li>
            <li>
              <strong>Metrics analysis:</strong> Monitoring key performance indicators to validate
              business hypotheses
            </li>
            <li>
              <strong>Iterative improvements:</strong> Rapidly implementing high-value enhancements
              based on user feedback
            </li>
            <li>
              <strong>Technical optimization:</strong> Addressing performance issues and technical
              debt
            </li>
            <li>
              <strong>Roadmap development:</strong> Creating a strategic plan for future releases
            </li>
            <li>
              <strong>Investor-ready reporting:</strong> Preparing data-driven insights to support
              fundraising efforts
            </li>
          </ul>
          <p className="mt-4">
            We offer post-launch support packages to help you maximize learning from your MVP and
            quickly iterate toward product-market fit. Many clients continue working with us as they
            scale from MVP to full-featured product.
          </p>
        </div>
      ),
      plainTextAnswer:
        'Post-launch is a critical phase in the MVP journey, focusing on: User feedback collection: Implementing analytics, conducting user interviews, and gathering quantitative/qualitative data; Metrics analysis: Monitoring key performance indicators to validate business hypotheses; Iterative improvements: Rapidly implementing high-value enhancements based on user feedback; Technical optimization: Addressing performance issues and technical debt; Roadmap development: Creating a strategic plan for future releases; Investor-ready reporting: Preparing data-driven insights to support fundraising efforts. We offer post-launch support packages to help you maximize learning from your MVP and quickly iterate toward product-market fit. Many clients continue working with us as they scale from MVP to full-featured product.',
    },
    {
      question: 'How do you approach user experience design for MVPs?',
      answer: (
        <div>
          <p className="mb-4">
            Our MVP design approach balances simplicity with quality user experience:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>User-centered design:</strong> Starting with user problems rather than feature
              lists
            </li>
            <li>
              <strong>Simplified user journeys:</strong> Creating streamlined flows focused on core
              functionality
            </li>
            <li>
              <strong>Rapid prototyping:</strong> Using low and medium-fidelity wireframes to
              validate concepts quickly
            </li>
            <li>
              <strong>Design systems:</strong> Building consistent components that enable rapid
              iteration
            </li>
            <li>
              <strong>Usability testing:</strong> Conducting targeted sessions to identify friction
              points
            </li>
          </ul>
          <p className="mt-4">
            While MVPs prioritize functionality over comprehensive design, we ensure the user
            experience is intuitive and polished where it matters most. This approach helps validate
            not just that you can build the solution, but that users actually want to use it.
          </p>
        </div>
      ),
      plainTextAnswer:
        'Our MVP design approach balances simplicity with quality user experience: User-centered design: Starting with user problems rather than feature lists; Simplified user journeys: Creating streamlined flows focused on core functionality; Rapid prototyping: Using low and medium-fidelity wireframes to validate concepts quickly; Design systems: Building consistent components that enable rapid iteration; Usability testing: Conducting targeted sessions to identify friction points. While MVPs prioritize functionality over comprehensive design, we ensure the user experience is intuitive and polished where it matters most. This approach helps validate not just that you can build the solution, but that users actually want to use it.',
    },
    {
      question: 'What technologies do you use for MVP development?',
      answer: (
        <div>
          <p className="mb-4">
            We select technologies for MVPs based on development speed, cost-effectiveness, and
            future scalability:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Frontend:</strong> React, Next.js, Vue.js, Flutter (for cross-platform mobile)
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Python/Django, Ruby on Rails
            </li>
            <li>
              <strong>Databases:</strong> MongoDB, PostgreSQL, Firebase
            </li>
            <li>
              <strong>Cloud services:</strong> AWS, Google Cloud, Firebase, Vercel
            </li>
            <li>
              <strong>Analytics:</strong> Mixpanel, Google Analytics, Amplitude
            </li>
            <li>
              <strong>Authentication:</strong> Auth0, Firebase Auth, AWS Cognito
            </li>
          </ul>
          <p className="mt-4">
            We typically recommend proven, widely-adopted technologies with extensive community
            support for MVPs, allowing for rapid development while maintaining quality. Our
            technology recommendations are tailored to your specific product needs, team expertise,
            and long-term business strategy.
          </p>
        </div>
      ),
      plainTextAnswer:
        'We select technologies for MVPs based on development speed, cost-effectiveness, and future scalability: Frontend: React, Next.js, Vue.js, Flutter (for cross-platform mobile); Backend: Node.js, Python/Django, Ruby on Rails; Databases: MongoDB, PostgreSQL, Firebase; Cloud services: AWS, Google Cloud, Firebase, Vercel; Analytics: Mixpanel, Google Analytics, Amplitude; Authentication: Auth0, Firebase Auth, AWS Cognito. We typically recommend proven, widely-adopted technologies with extensive community support for MVPs, allowing for rapid development while maintaining quality. Our technology recommendations are tailored to your specific product needs, team expertise, and long-term business strategy.',
    },
    {
      question: 'Do I need technical knowledge to work with you on my MVP?',
      answer: (
        <p>
          No technical knowledge is required. We specialize in working with non-technical founders
          and product owners, translating your business vision into technical requirements and
          solutions. Our process includes education on key concepts as needed, clear communication
          in non-technical language, and regular demos that focus on business value rather than
          technical details. We provide guidance on technical decisions while ensuring you remain in
          control of your product vision and business strategy. We can adapt our collaboration
          approach based on your technical comfort level and prior experience.
        </p>
      ),
      plainTextAnswer:
        'No technical knowledge is required. We specialize in working with non-technical founders and product owners, translating your business vision into technical requirements and solutions. Our process includes education on key concepts as needed, clear communication in non-technical language, and regular demos that focus on business value rather than technical details. We provide guidance on technical decisions while ensuring you remain in control of your product vision and business strategy. We can adapt our collaboration approach based on your technical comfort level and prior experience.',
    },
    {
      question: 'Can you help with fundraising and investor materials?',
      answer: (
        <div>
          <p className="mb-4">
            Yes, we support startups with investor-focused deliverables and guidance:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Technical documentation:</strong> Creating architecture diagrams and technical
              overviews for technical due diligence
            </li>
            <li>
              <strong>Metrics dashboards:</strong> Setting up KPI tracking and analytics to
              demonstrate traction
            </li>
            <li>
              <strong>Product roadmaps:</strong> Developing visual roadmaps showing future
              development phases
            </li>
            <li>
              <strong>Demo preparation:</strong> Polishing key features for investor demos and pitch
              events
            </li>
            <li>
              <strong>Scaling plans:</strong> Outlining technical scaling strategies as user growth
              accelerates
            </li>
          </ul>
          <p className="mt-4">
            Many of our clients have successfully raised seed and Series A funding based in part on
            the MVPs we've built together. We understand what investors look for in early-stage
            products and can help you position your technology effectively during fundraising.
          </p>
        </div>
      ),
      plainTextAnswer:
        "Yes, we support startups with investor-focused deliverables and guidance: Technical documentation: Creating architecture diagrams and technical overviews for technical due diligence; Metrics dashboards: Setting up KPI tracking and analytics to demonstrate traction; Product roadmaps: Developing visual roadmaps showing future development phases; Demo preparation: Polishing key features for investor demos and pitch events; Scaling plans: Outlining technical scaling strategies as user growth accelerates. Many of our clients have successfully raised seed and Series A funding based in part on the MVPs we've built together. We understand what investors look for in early-stage products and can help you position your technology effectively during fundraising.",
    },
  ];

  // Generate the FAQ schema in JSON-LD format
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.plainTextAnswer,
      },
    })),
  };

  return (
    <section
      ref={sectionRef}
      id="faq-section"
      className={cn('py-24 bg-white dark:bg-gray-900', className)}
    >
      {/* JSON-LD Structured Data for FAQ */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-[95rem]">
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              'text-center mb-16 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our MVP development approach, process, and what
              to expect when working with us.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  openIndex === index
                    ? 'bg-gray-50 dark:bg-gray-800/50'
                    : 'bg-white dark:bg-gray-800'
                )}
                style={{ transitionDelay: `${String(index * 100)}ms` }}
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                  onClick={() => {
                    toggleFAQ(index);
                  }}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                    ) : (
                      <Plus className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 text-gray-600 dark:text-gray-300',
                    openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="p-6 pt-0">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              'mt-16 text-center transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            <p className="text-gray-600 dark:text-gray-300">
              Still have questions?{' '}
              <a
                href="#contact-form-section"
                className="text-pink-600 dark:text-pink-400 font-medium hover:underline"
              >
                Contact us
              </a>{' '}
              for more information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
