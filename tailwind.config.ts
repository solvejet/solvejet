// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  // Add future configuration
  future: {
    hoverOnlyWhenSupported: true, // Respects 'hover: none' media query
    respectDefaultRingColorOpacity: true, // Better focus ring behavior
    disableColorOpacityUtilitiesByDefault: true, // More efficient opacity utilities
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#FFFFFF',
          dark: '#121212',
        },
        element: {
          DEFAULT: '#0055B8', // Base blue
          50: '#E6F1FF', // Lightest blue, almost white
          100: '#CCE4FF',
          200: '#99C8FF',
          300: '#66ACFF',
          400: '#3390FF',
          500: '#0055B8', // Primary brand blue
          600: '#0044A1', // Slightly darker
          700: '#003380', // Dark blue
          800: '#002266', // Very dark blue
          900: '#001133', // Almost black blue
          950: '#000D29', // Near black with blue tint
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'menu-slide-down': 'menuSlideDown 0.3s ease-out forwards',
        'underline-expand': 'underlineExpand 0.3s ease-out forwards',
        glow: 'glow 1s ease-in-out infinite alternate',
        ripple: 'ripple 0.6s linear forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        menuSlideDown: {
          '0%': {
            transform: 'translateY(-10px) scaleY(0.9)',
            opacity: '0',
            transformOrigin: 'top',
          },
          '100%': {
            transform: 'translateY(0) scaleY(1)',
            opacity: '1',
            transformOrigin: 'top',
          },
        },
        underlineExpand: {
          '0%': {
            transform: 'scaleX(0)',
            transformOrigin: 'left',
          },
          '100%': {
            transform: 'scaleX(1)',
            transformOrigin: 'left',
          },
        },
        glow: {
          '0%': { boxShadow: '0 0 0 rgba(0, 85, 184, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 85, 184, 0.4)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
