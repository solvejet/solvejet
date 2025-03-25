// src/lib/seo/serviceDetailStructuredData.ts

interface ServiceDetailData {
  name: string;
  description: string;
  url: string;
  image: string;
  provider: string;
  serviceType: string;
  areaServed?: string;
  availableLanguage?: string[];
}

/**
 * Generates JSON-LD structured data for a specific service detail page
 *
 * @param baseUrl The base URL of the website
 * @param serviceData Service-specific data
 * @returns JSON-LD structured data as a string
 */
export function generateServiceDetailStructuredData(
  baseUrl: string,
  serviceData: ServiceDetailData
): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData.name,
    description: serviceData.description,
    url: serviceData.url,
    image: serviceData.image,
    provider: {
      '@type': 'Organization',
      name: serviceData.provider,
      url: baseUrl,
      logo: `${baseUrl}/images/logo.png`,
    },
    serviceType: serviceData.serviceType,
    areaServed: serviceData.areaServed ?? 'Worldwide',
    availableLanguage: serviceData.availableLanguage ?? ['English'],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '',
        priceCurrency: 'USD',
        description: 'Custom pricing based on project requirements',
      },
    },
  };

  return JSON.stringify(data, null, 2);
}
