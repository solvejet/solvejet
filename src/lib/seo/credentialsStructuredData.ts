// src/lib/seo/credentialsStructuredData.ts

/**
 * Generate JSON-LD structured data for the company's credentials and certifications
 * This improves SEO by providing search engines with explicit information about certifications
 */
export function generateCredentialsStructuredData(baseUrl: string): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SolveJet",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "sameAs": [
      "https://www.linkedin.com/company/solvejet",
      "https://twitter.com/solvejet",
      "https://www.facebook.com/solvejet"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Google Cloud Partner",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Google Cloud",
          "url": "https://cloud.google.com/partners"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "ISO 27001:2022 Certified",
        "recognizedBy": {
          "@type": "Organization",
          "name": "International Organization for Standardization",
          "url": "https://www.iso.org/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top Software Development Company",
        "recognizedBy": {
          "@type": "Organization",
          "name": "DesignRush",
          "url": "https://www.designrush.com/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top Software Development Company",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Goodfirms",
          "url": "https://www.goodfirms.co/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top Software Developers",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Clutch",
          "url": "https://clutch.co/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top Web Developers",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Clutch",
          "url": "https://clutch.co/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top App Development Company",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Clutch",
          "url": "https://clutch.co/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top Flutter Developers",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Clutch",
          "url": "https://clutch.co/"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "award",
        "name": "Top VueJs Company",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Clutch",
          "url": "https://clutch.co/"
        }
      }
    ]
  };

  return JSON.stringify(structuredData);
}
