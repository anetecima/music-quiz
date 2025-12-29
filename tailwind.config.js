/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './pages/*'],
  theme: {
    extend: {
      colors: {
        game: {
          100: 'var(--game-100)',
          200: 'var(--game-200)',
          300: 'var(--game-300)',
          400: 'var(--game-400)',
          500: 'var(--game-500)'
        },
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

        slide: {
          '0%': { transform: 'translate(0%)' },
          '40%': { transform: 'translate(20%)' },
          '100%': { transform: 'translate(100%)' }
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
