// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  // Add future configuration
  future: {
    hoverOnlyWhenSupported: true, // Respects 'hover: none' media query
    respectDefaultRingColorOpacity: true, // Better focus ring behavior
    disableColorOpacityUtilitiesByDefault: true, // More efficient opacity utilities
  },
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			]
  		},
  		colors: {
  			primary: {
  				light: '#FFFFFF',
  				dark: '#121212',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			element: {
  				'50': '#E6F1FF',
  				'100': '#CCE4FF',
  				'200': '#99C8FF',
  				'300': '#66ACFF',
  				'400': '#3390FF',
  				'500': '#0055B8',
  				'600': '#0044A1',
  				'700': '#003380',
  				'800': '#002266',
  				'900': '#001133',
  				'950': '#000D29',
  				DEFAULT: '#0055B8'
  			},
  			gray: {
  				'50': '#F9FAFB',
  				'100': '#F3F4F6',
  				'200': '#E5E7EB',
  				'300': '#D1D5DB',
  				'400': '#9CA3AF',
  				'500': '#6B7280',
  				'600': '#4B5563',
  				'700': '#374151',
  				'800': '#1F2937',
  				'900': '#111827',
  				'950': '#030712'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'slide-down': 'slideDown 0.5s ease-out',
  			'menu-slide-down': 'menuSlideDown 0.3s ease-out forwards',
  			'underline-expand': 'underlineExpand 0.3s ease-out forwards',
  			glow: 'glow 1s ease-in-out infinite alternate',
  			ripple: 'ripple 0.6s linear forwards'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			menuSlideDown: {
  				'0%': {
  					transform: 'translateY(-10px) scaleY(0.9)',
  					opacity: '0',
  					transformOrigin: 'top'
  				},
  				'100%': {
  					transform: 'translateY(0) scaleY(1)',
  					opacity: '1',
  					transformOrigin: 'top'
  				}
  			},
  			underlineExpand: {
  				'0%': {
  					transform: 'scaleX(0)',
  					transformOrigin: 'left'
  				},
  				'100%': {
  					transform: 'scaleX(1)',
  					transformOrigin: 'left'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 0 rgba(0, 85, 184, 0.4)'
  				},
  				'100%': {
  					boxShadow: '0 0 20px rgba(0, 85, 184, 0.4)'
  				}
  			},
  			ripple: {
  				'0%': {
  					transform: 'scale(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'scale(4)',
  					opacity: '0'
  				}
  			}
  		},
  		screens: {
  			xs: '375px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
