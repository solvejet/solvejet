// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/dashboard/private/",
          "/internal/",
          "/temp/",
          "/*.json$",
          "/staging/",
        ],
      },
      // Allow specific search engine crawlers
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/internal/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/internal/"],
      },
      // Block AI training crawlers (optional - you can remove if you want to allow)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "ByteSpider",
          "PetalBot",
        ],
        disallow: "/",
      },
      // Allow crawlers for business directories and review sites
      {
        userAgent: [
          "ClutchBot",
          "GoodFirmsBot",
          "DesignRushBot",
          "LinkedInBot",
          "facebookexternalhit",
          "Twitterbot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://solvejet.net/sitemap.xml",
    host: "https://solvejet.net",
  };
}
