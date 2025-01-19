// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { menuData } from '@/data/menu-data'

type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: number
}

function getAllRoutes(): string[] {
  const routes: string[] = ['/']

  // Add service routes
  menuData.whatWeDo.services.forEach((service) => {
    routes.push(service.href)
  })

  // Add expertise routes
  menuData.whatWeDo.expertise.forEach((expertise) => {
    routes.push(expertise.href)
  })

  // Add technology routes
  menuData.technologies.forEach((tech) => {
    routes.push(tech.href)
  })

  // Add industry routes
  menuData.industries.forEach((industry) => {
    routes.push(industry.href)
  })

  // Add company routes
  menuData.company.forEach((item) => {
    routes.push(item.href)
  })

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.author.website.replace(/\/$/, '')
  const routes = getAllRoutes()

  const sitemapEntries: SitemapEntry[] = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }))

  return sitemapEntries
}
