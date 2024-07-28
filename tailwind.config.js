/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './pages/*'],
  theme: {
    extend: {
      colors: {
        cta: 'rgb(182 127 178)',
        border: {
          1: '#ddd',
          2: '#ddd'
        }
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        show: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
