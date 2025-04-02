// src/components/Services/CustomSoftwareDevelopment/FAQSection.tsx
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
      name: 'csd_faq_view',
      category: 'engagement',
      label: 'custom_software_development_faq',
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
        name: 'csd_faq_expand',
        category: 'engagement',
        label: `faq_${String(index + 1)}_expand`,
      });
    }
  };

  // FAQ data with plain text answers for schema
  const faqItems: FAQItem[] = [
    {
      question: 'What is custom software development?',
      answer: (
        <p>
          Custom software development is the process of designing, creating, deploying, and
          maintaining software that is specifically developed for a particular organization or user
          with their specific requirements and preferences. Unlike commercial off-the-shelf software
          (COTS), custom software is tailored to address your unique business challenges and
          opportunities.
        </p>
      ),
      plainTextAnswer:
        'Custom software development is the process of designing, creating, deploying, and maintaining software that is specifically developed for a particular organization or user with their specific requirements and preferences. Unlike commercial off-the-shelf software (COTS), custom software is tailored to address your unique business challenges and opportunities.',
    },
    {
      question: 'How long does it take to develop custom software?',
      answer: (
        <div>
          <p className="mb-4">
            The timeline for custom software development varies significantly depending on the
            complexity, scope, and requirements of your project. Typically, the development process
            includes several phases:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Discovery and requirements gathering: 2-4 weeks</li>
            <li>Design and planning: 2-8 weeks</li>
            <li>Development: 3-12 months</li>
            <li>Testing and quality assurance: 2-8 weeks</li>
            <li>Deployment and initial support: 1-4 weeks</li>
          </ul>
          <p className="mt-4">
            During our initial consultation, we can provide a more accurate timeline based on your
            specific project needs and constraints.
          </p>
        </div>
      ),
      plainTextAnswer:
        'The timeline for custom software development varies significantly depending on the complexity, scope, and requirements of your project. Typically, the development process includes several phases: Discovery and requirements gathering (2-4 weeks), Design and planning (2-8 weeks), Development (3-12 months), Testing and quality assurance (2-8 weeks), and Deployment and initial support (1-4 weeks). During our initial consultation, we can provide a more accurate timeline based on your specific project needs and constraints.',
    },
    {
      question: 'How much does custom software development cost?',
      answer: (
        <p>
          The cost of custom software development depends on various factors, including project
          complexity, features, integrations, user experience requirements, and timeline. Simple
          applications might start at $20,000-$50,000, while enterprise-level solutions with
          advanced features can range from $100,000 to $500,000 or more. We provide detailed
          estimates after understanding your project requirements through our discovery process,
          ensuring transparency and alignment with your budget.
        </p>
      ),
      plainTextAnswer:
        'The cost of custom software development depends on various factors, including project complexity, features, integrations, user experience requirements, and timeline. Simple applications might start at $20,000-$50,000, while enterprise-level solutions with advanced features can range from $100,000 to $500,000 or more. We provide detailed estimates after understanding your project requirements through our discovery process, ensuring transparency and alignment with your budget.',
    },
    {
      question: 'Do I need custom software or would off-the-shelf solutions work?',
      answer: (
        <div>
          <p className="mb-4">Off-the-shelf solutions can be suitable if:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Your business processes are relatively standard</li>
            <li>The solution covers most of your requirements out of the box</li>
            <li>You have limited budget and time constraints</li>
            <li>You don't need unique features to gain a competitive advantage</li>
          </ul>
          <p className="mb-4">Custom software might be a better fit if:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your business has unique processes that require specific workflows</li>
            <li>You need tight integration with existing proprietary systems</li>
            <li>You need specific features that provide competitive advantage</li>
            <li>You want full control over the product roadmap and feature development</li>
            <li>Long-term total cost of ownership calculations favor custom development</li>
          </ul>
          <p className="mt-4">
            During our initial consultation, we can help you evaluate whether custom or
            off-the-shelf solutions better serve your business needs.
          </p>
        </div>
      ),
      plainTextAnswer:
        "Off-the-shelf solutions can be suitable if your business processes are relatively standard, the solution covers most of your requirements out of the box, you have limited budget and time constraints, and you don't need unique features to gain a competitive advantage. Custom software might be a better fit if your business has unique processes that require specific workflows, you need tight integration with existing proprietary systems, you need specific features that provide competitive advantage, you want full control over the product roadmap and feature development, and long-term total cost of ownership calculations favor custom development. During our initial consultation, we can help you evaluate whether custom or off-the-shelf solutions better serve your business needs.",
    },
    {
      question: 'What technologies do you use for custom software development?',
      answer: (
        <div>
          <p className="mb-4">
            We select technologies based on your specific project requirements, performance needs,
            scalability considerations, and long-term maintenance. Some of the technologies we
            commonly work with include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Frontend:</strong> React, Angular, Vue.js, Next.js, TypeScript
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Python, Java, .NET, Go
            </li>
            <li>
              <strong>Mobile:</strong> React Native, Flutter, Swift, Kotlin
            </li>
            <li>
              <strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
            </li>
            <li>
              <strong>Cloud:</strong> AWS, Azure, Google Cloud Platform
            </li>
            <li>
              <strong>DevOps:</strong> Docker, Kubernetes, CI/CD pipelines
            </li>
            <li>
              <strong>AI/ML:</strong> TensorFlow, PyTorch, scikit-learn
            </li>
          </ul>
          <p className="mt-4">
            We prioritize using established, well-supported technologies that align with your team's
            capabilities and your long-term technology strategy.
          </p>
        </div>
      ),
      plainTextAnswer:
        "We select technologies based on your specific project requirements, performance needs, scalability considerations, and long-term maintenance. Some of the technologies we commonly work with include: Frontend: React, Angular, Vue.js, Next.js, TypeScript; Backend: Node.js, Python, Java, .NET, Go; Mobile: React Native, Flutter, Swift, Kotlin; Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch; Cloud: AWS, Azure, Google Cloud Platform; DevOps: Docker, Kubernetes, CI/CD pipelines; AI/ML: TensorFlow, PyTorch, scikit-learn. We prioritize using established, well-supported technologies that align with your team's capabilities and your long-term technology strategy.",
    },
    {
      question: 'How do you ensure the quality and security of custom software?',
      answer: (
        <div>
          <p className="mb-4">
            We implement a comprehensive quality assurance and security approach throughout the
            development lifecycle:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Quality Assurance:</strong> Automated testing (unit, integration, system
              tests), manual testing, performance testing, and user acceptance testing
            </li>
            <li>
              <strong>Security Practices:</strong> Secure coding standards, regular security code
              reviews, dependency vulnerability scanning
            </li>
            <li>
              <strong>Security Testing:</strong> Penetration testing, vulnerability assessments, and
              OWASP compliance checks
            </li>
            <li>
              <strong>Compliance:</strong> Adherence to relevant industry standards (GDPR, HIPAA,
              SOC2, etc.)
            </li>
            <li>
              <strong>DevSecOps:</strong> Security integrated throughout CI/CD pipelines
            </li>
            <li>
              <strong>Monitoring:</strong> Continuous monitoring for performance issues and security
              threats
            </li>
          </ul>
          <p className="mt-4">
            Our security-first approach ensures that your application is protected against common
            vulnerabilities and built with best practices from the ground up.
          </p>
        </div>
      ),
      plainTextAnswer:
        'We implement a comprehensive quality assurance and security approach throughout the development lifecycle: Quality Assurance: Automated testing (unit, integration, system tests), manual testing, performance testing, and user acceptance testing; Security Practices: Secure coding standards, regular security code reviews, dependency vulnerability scanning; Security Testing: Penetration testing, vulnerability assessments, and OWASP compliance checks; Compliance: Adherence to relevant industry standards (GDPR, HIPAA, SOC2, etc.); DevSecOps: Security integrated throughout CI/CD pipelines; Monitoring: Continuous monitoring for performance issues and security threats. Our security-first approach ensures that your application is protected against common vulnerabilities and built with best practices from the ground up.',
    },
    {
      question: 'What is your development methodology?',
      answer: (
        <div>
          <p className="mb-4">
            We primarily use Agile development methodologies with a focus on iterative development
            and continuous client feedback. Our typical approach includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Sprint-based delivery:</strong> Breaking work into 1-2 week sprints with
              defined deliverables
            </li>
            <li>
              <strong>Regular demos:</strong> Showcasing progress and gathering feedback at the end
              of each sprint
            </li>
            <li>
              <strong>Transparent communication:</strong> Daily standups, sprint planning, and
              retrospectives
            </li>
            <li>
              <strong>Continuous integration:</strong> Automated testing and deployment pipelines
            </li>
            <li>
              <strong>Adaptability:</strong> Ability to reprioritize based on emerging needs and
              feedback
            </li>
          </ul>
          <p className="mt-4">
            For some projects, we may adapt our approach to include elements of other methodologies
            like Lean or DevOps principles based on your specific needs and organizational culture.
          </p>
        </div>
      ),
      plainTextAnswer:
        'We primarily use Agile development methodologies with a focus on iterative development and continuous client feedback. Our typical approach includes: Sprint-based delivery (Breaking work into 1-2 week sprints with defined deliverables), Regular demos (Showcasing progress and gathering feedback at the end of each sprint), Transparent communication (Daily standups, sprint planning, and retrospectives), Continuous integration (Automated testing and deployment pipelines), and Adaptability (Ability to reprioritize based on emerging needs and feedback). For some projects, we may adapt our approach to include elements of other methodologies like Lean or DevOps principles based on your specific needs and organizational culture.',
    },
    {
      question: 'How do you handle ongoing maintenance and support?',
      answer: (
        <div>
          <p className="mb-4">
            We offer comprehensive maintenance and support services for all custom software we
            develop, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Proactive monitoring:</strong> Automated system health checks and performance
              monitoring
            </li>
            <li>
              <strong>Bug fixes:</strong> Timely resolution of any issues that arise
            </li>
            <li>
              <strong>Security updates:</strong> Regular patching and dependency updates
            </li>
            <li>
              <strong>Feature enhancements:</strong> Ongoing improvements and new features
            </li>
            <li>
              <strong>Technical support:</strong> Different SLA tiers available based on your needs
            </li>
            <li>
              <strong>System optimization:</strong> Performance tuning and scalability improvements
            </li>
          </ul>
          <p className="mt-4">
            We offer flexible maintenance plans tailored to your needs, whether that's a
            comprehensive managed service or on-demand support.
          </p>
        </div>
      ),
      plainTextAnswer:
        "We offer comprehensive maintenance and support services for all custom software we develop, including: Proactive monitoring (Automated system health checks and performance monitoring), Bug fixes (Timely resolution of any issues that arise), Security updates (Regular patching and dependency updates), Feature enhancements (Ongoing improvements and new features), Technical support (Different SLA tiers available based on your needs), and System optimization (Performance tuning and scalability improvements). We offer flexible maintenance plans tailored to your needs, whether that's a comprehensive managed service or on-demand support.",
    },
    {
      question: 'Who will own the intellectual property rights to the software?',
      answer: (
        <p>
          Upon completion of the project and full payment, you will own the intellectual property
          rights to the custom software we develop for you. This includes all source code, designs,
          and documentation created specifically for your project. We believe in transparent IP
          ownership, ensuring that you have full control over the software that powers your
          business. The only exceptions would be any third-party components or pre-existing
          frameworks we might leverage, which would be clearly outlined in our agreement.
        </p>
      ),
      plainTextAnswer:
        'Upon completion of the project and full payment, you will own the intellectual property rights to the custom software we develop for you. This includes all source code, designs, and documentation created specifically for your project. We believe in transparent IP ownership, ensuring that you have full control over the software that powers your business. The only exceptions would be any third-party components or pre-existing frameworks we might leverage, which would be clearly outlined in our agreement.',
    },
    {
      question: 'What makes SolveJet different from other custom software development companies?',
      answer: (
        <div>
          <p className="mb-4">SolveJet differentiates itself through:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Deep business understanding:</strong> We focus on understanding your business
              objectives, not just technical requirements
            </li>
            <li>
              <strong>Technical excellence:</strong> Our team consists of senior developers and
              architects with extensive industry experience
            </li>
            <li>
              <strong>Strategic partnership:</strong> We work as an extension of your team,
              providing strategic guidance beyond just coding
            </li>
            <li>
              <strong>Focus on outcomes:</strong> We measure success by the business value
              delivered, not just project completion
            </li>
            <li>
              <strong>Transparent communication:</strong> Clear, honest communication with no
              technical jargon or surprises
            </li>
            <li>
              <strong>Quality assurance:</strong> Rigorous testing and quality controls throughout
              the development process
            </li>
            <li>
              <strong>Post-launch support:</strong> Comprehensive maintenance and evolution services
            </li>
          </ul>
          <p className="mt-4">
            Our client retention rate and the number of clients who expand their engagement with us
            after initial projects speak to our commitment to excellence and partnership.
          </p>
        </div>
      ),
      plainTextAnswer:
        'SolveJet differentiates itself through: Deep business understanding (We focus on understanding your business objectives, not just technical requirements), Technical excellence (Our team consists of senior developers and architects with extensive industry experience), Strategic partnership (We work as an extension of your team, providing strategic guidance beyond just coding), Focus on outcomes (We measure success by the business value delivered, not just project completion), Transparent communication (Clear, honest communication with no technical jargon or surprises), Quality assurance (Rigorous testing and quality controls throughout the development process), and Post-launch support (Comprehensive maintenance and evolution services). Our client retention rate and the number of clients who expand their engagement with us after initial projects speak to our commitment to excellence and partnership.',
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
              Get answers to common questions about our custom software development services,
              process, and approach.
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
                      <Minus className="h-5 w-5 text-element-500 dark:text-element-400" />
                    ) : (
                      <Plus className="h-5 w-5 text-element-500 dark:text-element-400" />
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
                className="text-element-600 dark:text-element-400 font-medium hover:underline"
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
