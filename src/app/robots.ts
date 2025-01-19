// src/app/robots.ts
import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.author.website.replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/*.json$', '/*.xml$'],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
