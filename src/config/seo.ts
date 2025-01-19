// src/config/seo.ts
import { Metadata } from 'next'
import { siteConfig } from './site'

interface SEOMetadataProps {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png',
  noIndex = false,
}: SEOMetadataProps): Metadata {
  const baseUrl = siteConfig.author.website.replace(/\/$/, '')
  const url = `${baseUrl}${path}`

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
  const baiduVerification = process.env.NEXT_PUBLIC_BAIDU_VERIFICATION
  const nortonVerification = process.env.NEXT_PUBLIC_NORTON_VERIFICATION

  // Convert verification tokens to arrays and filter out undefined values
  const verificationTokens = googleVerification ? [googleVerification] : []
  const otherVerification = {
    ...(baiduVerification && {
      'baidu-site-verification': [baiduVerification],
    }),
    ...(nortonVerification && {
      'norton-safeweb-site-verification': [nortonVerification],
    }),
  }

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title || siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: description || siteConfig.description,
    keywords: [
      'software development',
      'ISO certified',
      'custom software',
      'IT services',
      'India',
      'USA',
      'global software company',
      'enterprise software',
      'digital transformation',
      'cloud solutions',
      'AI development',
      'mobile apps',
      'web development',
    ],
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.author.website,
      },
    ],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image],
      creator: '@solvejet',
      site: '@solvejet',
    },
    verification: {
      google: verificationTokens,
      ...(Object.keys(otherVerification).length > 0 && {
        other: otherVerification,
      }),
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
      },
    },
  }
}

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.author.website,
  logo: `${siteConfig.author.website}/logo.png`,
  sameAs: [
    siteConfig.social.twitter,
    siteConfig.social.linkedin,
    siteConfig.social.github,
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: siteConfig.contacts.India,
      contactType: 'customer service',
      areaServed: ['IN', 'US'],
      availableLanguage: ['en'],
    },
  ],
})

export const generateWebPageSchema = (title: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.author.website}/logo.png`,
    },
  },
})

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})
