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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
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
          maxInitialRequests: 30,
          maxAsyncRequests: 30,
          minSize: 10000,
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
            // Smaller libraries - group similar types together
            analytics: {
              test: /[\\/]lib[\\/]analytics[\\/]/,
              name: 'analytics',
              priority: 15,
              chunks: 'async',
              reuseExistingChunk: true,
            },
            // Other libs - dynamic naming but with path limit to avoid too many chunks
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                // Get package name
                const packageNameMatch = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                );
                if (!packageNameMatch) return 'vendors';

                const packageName = packageNameMatch[1];
                // Group by first letter to reduce chunk count, with special handling for @scoped packages
                const firstChar =
                  packageName.charAt(0) === '@'
                    ? packageName.split('/')[0].slice(1, 2)
                    : packageName.charAt(0);
                return `vendor-${firstChar}`;
              },
              priority: 10,
              minChunks: 1,
              chunks: 'async',
              reuseExistingChunk: true,
            },
          },
        };
      }
    }

    return config;
  },

  // Security headers configuration
  headers: (): Promise<
    {
      source: string;
      headers: {
        key: string;
        value: string;
      }[];
    }[]
  > => {
    return Promise.resolve([
      {
        source: '/:path*',
        headers: Object.entries(SECURITY_HEADERS).map(([key, value]) => ({
          key,
          value: Array.isArray(value) ? value.join(',') : value,
        })),
      },
      {
        source: '/api/:path*',
        headers: [
          ...Object.entries(SECURITY_HEADERS).map(([key, value]) => ({
            key,
            value: Array.isArray(value) ? value.join(',') : value,
          })),
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      // Add caching for static assets
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]);
  },

  // Enhanced compiler options for faster builds
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // SWC minification is enabled by default in Next.js 13+
} satisfies NextConfig;

// PWA Configuration
const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!noprecache/**/*'],
  runtimeCaching: [
    {
      urlPattern: /\/offline$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'offline-page',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
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
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
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
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:json|xml|csv)$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'static-data-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

// Apply bundle analyzer if ANALYZE flag is set
export default withBundleAnalyzer(withPWAConfig(nextConfig));
