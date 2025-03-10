// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';
import withPWA from 'next-pwa';
import { SECURITY_HEADERS } from './src/lib/security/constants';

// Import webpack bundle analyzer conditionally
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config: NextConfig) => config;

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Enable auto tree-shaking to remove unused code
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'], // Prioritize modern formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 7, // Cache for 7 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enhanced webpack configuration for performance
  webpack: (config: WebpackConfig): WebpackConfig => {
    if (typeof config.module?.rules === 'object') {
      const rules = config.module.rules as unknown[];
      rules.push({
        test: /\.(pdf|docx?|xlsx?|csv|zip)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/files/[hash][ext]',
        },
      });
    }

    // Add tree-shaking optimization
    if (config.optimization) {
      // Enable inner graph optimization for tree shaking
      config.optimization.innerGraph = true;

      // Enable module concatenation
      config.optimization.concatenateModules = true;

      // Add aggressive compression in production
      if (process.env.NODE_ENV === 'production') {
        const CompressionPlugin = require('compression-webpack-plugin');
        if (!config.plugins) {
          config.plugins = [];
        }
        config.plugins.push(
          new CompressionPlugin({
            test: /\.(js|css|html|svg)$/,
            filename: '[path][base].gz',
            algorithm: 'gzip',
            threshold: 10240, // Only compress files > 10KB
            minRatio: 0.8, // Only compress if compression ratio is better than 0.8
          })
        );
      }

      // Optimize code splitting for smaller bundles
      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 10, // Reduced from 30
          maxAsyncRequests: 10, // Reduced from 30
          minSize: 20000, // Increased from 10000
          maxSize: 244000, // ~240KB limit helps with caching
          cacheGroups: {
            default: false,
            vendors: false,
            // Critical framework chunk - keep these together for better caching
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 50,
              chunks: 'all',
              enforce: true,
            },
            // UI library components
            ui: {
              name: 'ui-components',
              test: /[\\/]components[\\/]ui[\\/]/,
              priority: 40,
              minChunks: 2,
              reuseExistingChunk: true,
              chunks: 'all',
            },
            // Commons chunk with tighter minChunks threshold
            commons: {
              name: 'commons',
              minChunks: 3, // Stricter - only truly common code
              priority: 30,
              chunks: 'all',
              reuseExistingChunk: true,
            },
            // Separate heavy dependencies
            heavy: {
              test: /[\\/]node_modules[\\/](recharts|lucide-react|gsap)[\\/]/,
              name: 'heavy-vendors',
              priority: 20,
              chunks: 'async',
              reuseExistingChunk: true,
            },
          },
        };
      }
    }

    return config;
  },

  // Enhanced compiler options for faster builds
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    // Enable optimizeCss for production builds
    optimizeCss: process.env.NODE_ENV === 'production',

    // Enable concurrent features for better performance
    serverActions: {
      bodySizeLimit: '2mb',
    },

    // Use newer React optimizations
    serverComponentsExternalPackages: ['mongoose'],
  },
} satisfies NextConfig;

// PWA Configuration - simplified for better performance
const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!noprecache/**/*'],
  // Simpler runtimeCaching configuration
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'CacheFirst', // Changed from StaleWhileRevalidate
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 * 7, // 7 days (increased)
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'CacheFirst', // Changed from StaleWhileRevalidate
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:css)$/i,
      handler: 'CacheFirst', // Changed from StaleWhileRevalidate
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
});

// Apply bundle analyzer if ANALYZE flag is set
export default withBundleAnalyzer(withPWAConfig(nextConfig));
