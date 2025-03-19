/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5F9FC',
          100: '#E1EEF6',
          200: '#B3D5E9',
          500: '#4A90B9',
          700: '#1B5478',
          900: '#0D2B3D',
        },
      },
    },
  },
  plugins: [],
} 