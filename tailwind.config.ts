import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EEA03E',       // Brand Orange
          light: '#F5B664',
          dark: '#C67817',
          50: '#FFF9F0',
        },
        secondary: {
          DEFAULT: '#FA554F',       // Brand Coral Red
          light: '#FB8E8A',
          dark: '#DF332D',
          50: '#FFF5F5',
        },
        'logo-grey': '#646464',
        dark: {
          DEFAULT: '#0F172A',       // Slate-900
          muted: '#1E293B',         // Slate-800
        },
        medium: '#475569',          // Slate-600
        light: {
          DEFAULT: '#F8FAFC',       // Slate-50
          alt: '#F1F5F9',           // Slate-100
        },
        'border-custom': '#E2E8F0', // Slate-200
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Noto Naskh Arabic', 'Arial', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
