// postcss.config.js
module.exports = {
  plugins: {
    // Process imports early
    'postcss-import': {},

    // Process Tailwind CSS
    tailwindcss: {},

    // Add vendor prefixes automatically
    autoprefixer: {},

    // In production, add extra optimizations
    ...(process.env.NODE_ENV === 'production'
      ? {
          // Minify CSS in production
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                // Prevent potential layout shifts from minification
                minifyFontValues: {
                  removeQuotes: false,
                },
                // Keep z-index values as is
                zindex: false,
              },
            ],
          },
        }
      : {}),
  },
};
