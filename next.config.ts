import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'
import { withAxiom } from 'next-axiom'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'solvejet.net',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Webpack configuration
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  experimental: {
    scrollRestoration: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'solvejet.net'],
    },
  },
  optimizeFonts: true,
}

// Export the composed configuration
export default withAxiom(withBundleAnalyzer(nextConfig))
