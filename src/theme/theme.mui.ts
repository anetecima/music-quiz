import { Roboto } from 'next/font/google'
import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

// Create a theme instance.
const themeMui = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 768, md: 1024, lg: 1200, xl: 1920 }
  },
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily
  }
})

export default themeMui
