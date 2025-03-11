// next.config.js

const { optimize } = require('webpack');

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  publicExcludes: ['!noprecache/**/*'],
  // Support offline page
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
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 * 7, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'CacheFirst',
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
      handler: 'CacheFirst',
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
      urlPattern: /\/api\/.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // Timeout after 10 seconds
      },
    },
    {
      urlPattern: /\/offline$/,
      handler: 'StaleWhileRevalidate',
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

// Handle bundle analyzer conditionally
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
    formats: ['image/avif', 'image/webp'],
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
  webpack: (config, { dev }) => {
    if (typeof config.module?.rules === 'object') {
      const rules = config.module.rules;
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
      if (!dev) {
        try {
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
        } catch (error) {
          console.error('Error loading compression-webpack-plugin:', error);
        }
      }

      // Optimize code splitting for smaller bundles
      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 10,
          maxAsyncRequests: 10,
          minSize: 20000,
          maxSize: 244000, // ~240KB limit helps with caching
          cacheGroups: {
            default: false,
            vendors: false,
            // Critical framework chunk
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
              minChunks: 3,
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
    optimizeCss: true,
    // optimizeCss: process.env.NODE_ENV === 'production',
  },

  // Server actions configuration (moved from experimental)
  serverActions: true,

  // External packages (moved from experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['mongoose'],
};

// Apply both configurations
module.exports = withBundleAnalyzer(withPWA(nextConfig));
