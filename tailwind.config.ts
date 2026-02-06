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
          DEFAULT: '#136dec',
          light: '#4b94f7',
          dark: '#0d5ac4',
        },
        secondary: {
          DEFAULT: '#94a3b8',
          light: '#cbd5e1',
          dark: '#64748b',
        },
        'background-light': '#f4f7fa',
        'surface-light': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'profile-card': '0px 4px 12px 0px rgba(0, 0, 0, 0.03)',
        'profile-button': '0px 8px 24px 0px rgba(0, 0, 0, 0.12)',
        'profile-header': '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'soft': '0 8px 30px rgba(0,0,0,0.04)',
        'card': '0 2px 12px rgba(0,0,0,0.05)',
        'floating': '0 8px 24px rgba(19, 109, 236, 0.2)',
      },
      borderRadius: {
        '20px': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
