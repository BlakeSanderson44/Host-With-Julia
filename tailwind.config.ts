import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#2F5D50',
        lake: '#3B82C4',
        sand: '#EBDDC3',
        cream: '#FAF9F6',
        charcoal: '#333333',
        slate: '#6B7280',
        moss: '#A3B18A',
      },
    },
  },
  plugins: [],
};

export default config;
