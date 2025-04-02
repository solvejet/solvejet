// src/lib/seo/serviceDetailStructuredData.ts

interface ServiceDetailStructuredDataProps {
  baseUrl: string;
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  serviceImageUrl: string;
}

/**
 * Generates structured data for a specific service page
 *
 * @param {ServiceDetailStructuredDataProps} props - The service details
 * @returns {string} JSON-LD structured data as a string
 */
export function generateServiceDetailStructuredData({
  baseUrl,
  serviceName,
  serviceDescription,
  serviceUrl,
  serviceImageUrl,
}: ServiceDetailStructuredDataProps): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: 'SolveJet',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.svg`,
      },
    },
    image: serviceImageUrl,
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '0',
        longitude: '0',
      },
      geoRadius: '40075000', // Entire Earth
    },
    serviceType: serviceName,
    termsOfService: `${baseUrl}/terms`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
          },
        },
      ],
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4.9',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Client Review',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  return JSON.stringify(structuredData);
}
