/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './pages/*'],
  theme: {
    extend: {
      colors: {
        game: {
          100: 'var(--game-category-bg)',
          200: 'var(--game-button-bg)',
          300: 'var(--game-question-modal-timer)',
          modal: 'var(--game-question-modal-bg)'
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
        show: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
