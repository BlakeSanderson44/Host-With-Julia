import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1B4332',
        'forest-light': '#2F5D50',
        'forest-dark': '#0F2B1F',
        lake: '#2563EB',
        'lake-light': '#3B82C4',
        'lake-dark': '#1D4ED8',
        sand: '#F7F3F0',
        'sand-warm': '#EBDDC3',
        cream: '#FEFCF9',
        charcoal: '#1F2937',
        'charcoal-light': '#374151',
        slate: '#64748B',
        'slate-light': '#94A3B8',
        moss: '#84CC16',
        'moss-light': '#A3B18A',
        'moss-dark': '#65A30D',
        accent: '#F59E0B',
        'accent-light': '#FCD34D',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
