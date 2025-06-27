/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          400: '#C0C0C0',
          500: '#8C93A1',
          600: '#677289',
          700: '#9DA4B2', // Базовий колір без прозорості
          800: '#E1E1E1',
        },
        dark: '#1A1A1A',
        blue: '#2F72E2',
        yellow: '#F59D0E',
        red: '#EF494F',
      },
    },
  },
  plugins: [],
}