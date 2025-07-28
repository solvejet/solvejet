// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';

import { CSRFProvider } from '@/components/providers/CSRFProvider';
import AnalyticsComponent from '@/components/common/Analytics';

import './globals.css';
import Header from '@/components/layout/Header';

// Optimize font loading with display swap and preload
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  preload: true,
  weight: ['400', '500', '600', '700'], // Only load needed weights
});

// Enhanced metadata for SEO
export const metadata: Metadata = {
  title: {
    template: '%s | SolveJet - Top Software Development Company',
    default: 'SolveJet - Leading Software Development Company | Google Cloud Partner | ISO Certified',
  },
  description: 'SolveJet is a top-rated software development company and Google Cloud Partner with ISO certification. Recognized by Clutch, GoodFirms, and DesignRush for delivering enterprise-grade software solutions, cloud services, and custom development.',
  keywords: [
    'software development company',
    'custom software development',
    'Google Cloud Partner',
    'ISO certified software company',
    'enterprise software development',
    'cloud development services',
    'mobile app development',
    'web development company',
    'Clutch top developer',
    'GoodFirms software company',
    'DesignRush featured agency',
    'software consulting',
    'DevOps services',
    'API development',
    'microservices architecture',
    'scalable software solutions'
  ],
  authors: [{ name: 'SolveJet Development Team' }],
  creator: 'SolveJet',
  publisher: 'SolveJet',
  category: 'Software Development',
  classification: 'Business',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://solvejet.net'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'SolveJet - Software Development Company',
    title: 'SolveJet - Leading Software Development Company | Google Cloud Partner',
    description: 'Top-rated software development company and Google Cloud Partner with ISO certification. Recognized by Clutch, GoodFirms, and DesignRush for delivering enterprise software solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SolveJet - Leading Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolveJet - Leading Software Development Company | Google Cloud Partner',
    description: 'Top-rated software development company with ISO certification. Recognized by Clutch, GoodFirms, and DesignRush for enterprise software solutions.',
    images: ['/twitter-image.jpg'],
    creator: '@solvejet',
  },
  appleWebApp: {
    title: 'SolveJet',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'application-name': 'SolveJet',
    'apple-mobile-web-app-title': 'SolveJet',
    'theme-color': '#3C86FF',
    'msapplication-TileColor': '#3C86FF',
    'msapplication-config': '/browserconfig.xml',
    'google-site-verification': 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3C86FF' },
    { media: '(prefers-color-scheme: dark)', color: '#3C86FF' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const createStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SolveJet',
  alternateName: 'SolveJet Software Development',
  description: 'Leading software development company and Google Cloud Partner with ISO certification, specializing in enterprise software solutions, cloud services, and custom development.',
  url: 'https://solvejet.net',
  logo: 'https://solvejet.net/logo.png',
  image: 'https://solvejet.net/og-image.jpg',
  foundingDate: '2020',
  legalName: 'SolveJet',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'WY',
    addressLocality: 'Wyoming'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Business Development',
      email: 'contact@solvejet.net',
      availableLanguage: ['English']
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Technical Support',
      email: 'support@solvejet.net',
      availableLanguage: ['English']
    }
  ],
  sameAs: [
    'https://clutch.co/profile/solvejet',
    'https://www.goodfirms.co/company/solvejet',
    'https://www.designrush.com/agency/profile/solvejet',
    'https://www.linkedin.com/company/solvejet',
    'https://twitter.com/solvejet'
  ],
  serviceArea: {
    '@type': 'Place',
    name: 'Worldwide'
  },
  areaServed: ['Worldwide', 'United States', 'North America', 'Europe', 'Wyoming'],
  knowsAbout: [
    'Software Development',
    'Cloud Computing',
    'Google Cloud Platform',
    'Mobile App Development',
    'Web Development',
    'Enterprise Software',
    'DevOps',
    'API Development',
    'Microservices',
    'Custom Software Solutions'
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Cloud Partner',
      credentialCategory: 'Technology Partnership'
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'ISO Certification',
      credentialCategory: 'Quality Management'
    }
  ],
  award: [
    'Top Software Development Company - Clutch',
    'Leading Development Firm - GoodFirms',
    'Featured Software Agency - DesignRush'
  ],
  services: [
    {
      '@type': 'Service',
      name: 'Custom Software Development',
      description: 'Tailored enterprise software solutions built with modern technologies'
    },
    {
      '@type': 'Service',
      name: 'Cloud Development Services',
      description: 'Google Cloud Platform expertise for scalable infrastructure and applications'
    },
    {
      '@type': 'Service',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android'
    },
    {
      '@type': 'Service',
      name: 'Web Development',
      description: 'Modern web applications with optimal performance and user experience'
    },
    {
      '@type': 'Service',
      name: 'Enterprise Integration',
      description: 'System integration, API development, and enterprise software solutions'
    },
    {
      '@type': 'Service',
      name: 'DevOps & Automation',
      description: 'Continuous integration, deployment automation, and infrastructure management'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '150',
    bestRating: '5',
    worstRating: '1'
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5'
      },
      author: {
        '@type': 'Organization',
        name: 'Clutch'
      },
      reviewBody: 'Top-rated software development company with excellent technical expertise and project delivery.'
    }
  ]
});

export default function RootLayout({ children }: RootLayoutProps) {
  const structuredData = createStructuredData();

  return (
    <html lang="en" className={nunito.variable} suppressHydrationWarning>
      <head>
        {/* Critical resource hints - only for truly critical resources */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01I-wYBV0brAA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        {/* Add Google Font preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Only preload hero video poster for LCP improvement */}
        <link
          rel="preload"
          href="/video-poster.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* DNS prefetch for analytics only - non-critical */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Business-specific meta tags */}
        <meta name="business-type" content="Software Development Company" />
        <meta name="industry" content="Information Technology" />
        <meta name="geo.region" content="US-WY" />
        <meta name="geo.placename" content="Wyoming" />

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <CSRFProvider>
          <Header />
          <div id="root" className="relative">
            {children}
          </div>
          {/* Load analytics after critical content - your existing optimized component */}
          <AnalyticsComponent />
        </CSRFProvider>
      </body>
    </html>
  );
}