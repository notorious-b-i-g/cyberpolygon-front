/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0f1222',
        'bg-card': 'rgba(22, 25, 40, 0.5)',
        'text-light': '#ffffff',
        'text-gray': '#a0a0a0',
        'accent-purple': '#6a00ff',
        'accent-blue': '#00f0ff',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
} 