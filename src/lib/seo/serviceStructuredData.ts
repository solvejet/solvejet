// src/lib/seo/serviceStructuredData.ts
import type { Service } from '@/data/home-page-data';

/**
 * Generates structured data (JSON-LD) for the services page
 * Following schema.org Service format
 */
export function generateServiceStructuredData(baseUrl: string, services: Service[]): string {
  // Create the main organization data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SolveJet',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description:
      'Custom software development and technology solutions for businesses across various industries.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-909-508-1408',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  };

  // Create the service offering data
  const serviceOfferingData = services.map(service => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    url: `${baseUrl}${service.href}`,
    provider: {
      '@type': 'Organization',
      name: 'SolveJet',
      url: baseUrl,
    },
    description: service.description,
    serviceType: service.tags?.map(tag => tag.text) ?? [service.title],
    serviceOutput:
      'Custom software solutions, cloud infrastructure, mobile applications, and enterprise systems',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
          },
        },
      ],
    },
  }));

  // Create the FAQ structured data
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of services does SolveJet offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SolveJet offers a comprehensive range of technology services including custom software development, cloud services, AI and machine learning solutions, mobile app development, MVP development, data analytics, IT staff augmentation, and IT consulting. We tailor our services to meet the specific needs of businesses across various industries.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does your software development process work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our software development process follows a structured yet flexible approach that includes discovery and planning, design and architecture, development and testing, and deployment and support. We use agile methodologies to ensure iterative development with continuous feedback and improvement throughout the project lifecycle.',
        },
      },
      {
        '@type': 'Question',
        name: 'What industries do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We have expertise across multiple industries including real estate and PropTech, e-commerce and retail, manufacturing, logistics and supply chain, travel and hospitality, healthcare, fintech, and more. Our cross-industry experience allows us to bring innovative solutions and best practices to any business domain.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide ongoing support after project completion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer comprehensive post-deployment support and maintenance services to ensure your solution continues to operate optimally. We provide various support packages including regular updates, performance monitoring, bug fixes, security patches, and system enhancements depending on your needs.',
        },
      },
    ],
  };

  // Combine all structured data into a single array
  const structuredDataArray = [organizationData, ...serviceOfferingData, faqData];

  // Return as a formatted JSON string
  return JSON.stringify(structuredDataArray);
}
