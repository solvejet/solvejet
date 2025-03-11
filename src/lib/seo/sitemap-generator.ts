// src/lib/seo/sitemap-generator.ts
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import type { SitemapUrl, SitemapConfig } from '../../types/seo';

/**
 * Generates a sitemap.xml file based on the Next.js App Router structure
 */
export function generateSitemap(config: SitemapConfig): void {
  // Using console.warn as an allowed alternative to log
  console.warn('Generating sitemap.xml...');

  const {
    baseUrl,
    pagesDirectory,
    outputPath,
    excludePaths,
    additionalPaths = [],
    defaultChangeFreq = 'weekly',
    defaultPriority = 0.7,
  } = config;

  // Ensure the base URL doesn't have a trailing slash
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // Get only page.ts/js files which represent actual routes in Next.js App Router
  const globPattern = `${pagesDirectory}/**/page.{js,jsx,ts,tsx}`;

  // We need to handle potential errors from glob pattern matching
  const pageFiles: string[] = [];
  try {
    // Safely assign the result of glob.sync
    const files = glob.sync(globPattern);
    // Push each file to our array
    files.forEach(file => pageFiles.push(file));
  } catch (error) {
    // Using allowed console.error
    console.error(
      'Error scanning page files:',
      error instanceof Error ? error.message : String(error)
    );
  }

  const sitemapUrls: SitemapUrl[] = [];

  // Process each file and convert to a URL
  pageFiles.forEach((file: string) => {
    // Extract the relative path from the app directory
    const relativePath = path.relative(pagesDirectory, file);

    // Get the directory containing the page.ts/js file
    let route = path.dirname(relativePath);

    // Replace route groups (parentheses syntax in Next.js App Router)
    route = route.replace(/\([^)]+\)\//g, '');

    // Handle index/root route
    if (route === '.') {
      route = '/';
    } else {
      // Ensure route starts with a slash
      if (!route.startsWith('/')) {
        route = `/${route}`;
      }
    }

    // Replace backslash with forward slash for Windows compatibility
    route = route.replace(/\\/g, '/');

    // Skip excluded paths
    if (
      route.startsWith('/api/') ||
      route.startsWith('/admin/') ||
      excludePaths.some((excludePath: string) => {
        // Support both exact matches and wildcard patterns
        if (excludePath.endsWith('*')) {
          const prefix = excludePath.slice(0, -1);
          return route.startsWith(prefix);
        }
        return route === excludePath;
      })
    ) {
      return;
    }

    // Add to sitemap URLs
    sitemapUrls.push({
      url: `${normalizedBaseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: defaultChangeFreq,
      priority: defaultPriority,
    });
  });

  // Add additional paths
  additionalPaths.forEach(customPath => {
    // Check if this path already exists in sitemapUrls
    const existingPathIndex = sitemapUrls.findIndex(
      item => item.url === `${normalizedBaseUrl}${customPath.url}`
    );

    // Only add if it doesn't exist, or update it with higher priority info
    if (existingPathIndex >= 0) {
      sitemapUrls[existingPathIndex] = {
        ...sitemapUrls[existingPathIndex],
        changeFrequency: customPath.changeFrequency,
        priority: customPath.priority,
      };
    } else {
      sitemapUrls.push({
        ...customPath,
        url: customPath.url.startsWith('http')
          ? customPath.url
          : `${normalizedBaseUrl}${customPath.url}`,
        lastModified: customPath.lastModified || new Date().toISOString(),
      });
    }
  });

  // Generate the XML content
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    url => `  <url>
    <loc>${url.url}</loc>
    ${url.lastModified ? `<lastmod>${url.lastModified}</lastmod>` : ''}
    ${url.changeFrequency ? `<changefreq>${String(url.changeFrequency)}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${String(url.priority)}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Write the sitemap.xml file
  fs.writeFileSync(outputPath, sitemapXml);
  console.warn('sitemap.xml generated successfully');
}
