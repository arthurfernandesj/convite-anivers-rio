/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: '#050304',
        carbon: '#0e0a0b',
        wine: '#2a0a12',
        bordo: '#5a1424',
        gold: { DEFAULT: '#c9a24d', light: '#ecd28f', aged: '#8f7133' },
        cream: '#f1e8d6',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
