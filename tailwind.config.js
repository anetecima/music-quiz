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
          '60%': { transform: 'translate(100%)' },
          '100%': { transform: 'translate(100%)' }
        },

        slideRight: {
          '0%': { left: '0' },
          '100%': { left: '100%' }
        },

        slideLeft: {
          '0%': { right: '0' },
          '100%': { right: '100%' }
        },

        slideUp: {
          '0%': { transform: 'translateY(-360px)' },
          '100%': { transform: 'translateY(0px)' }
        },

        /*colors: {
          '0%': { background: 'white' },
          '80%': { background: 'white' },
          '40%': { background: 'white' }
        },*/

        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.02)' },
          '60%': { transform: 'scale(1.03)' }
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
