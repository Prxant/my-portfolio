/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F97316',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#3B82F6",      // Blue
          "secondary": "#10B981",    // Green
          "accent": "#F97316",       // Orange
          "neutral": "#1f2937",      // Dark Gray
          "base-100": "#ffffff",     // White background
          "info": "#3abff8",         // Light Blue
          "success": "#36d399",      // Green
          "warning": "#fbbd23",      // Yellow
          "error": "#f87272",        // Red
        },
        dark: {
          "primary": "#60A5FA",      // Light Blue
          "secondary": "#34D399",    // Light Green
          "accent": "#FB923C",       // Light Orange
          "neutral": "#1f2937",      // Dark Gray
          "base-100": "#1f2937",     // Dark Gray Background
          "base-200": "#374151",     // Medium Gray
          "base-300": "#4b5563",     // Light Gray
          "base-content": "#f1f5f9",// Light Gray text
          "info": "#0ea5e9",         // Sky Blue
          "success": "#22c55e",      // Green
          "warning": "#f59e0b",      // Amber
          "error": "#ef4444",        // Red
        }
      }
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};