import { createTheme } from '@material-ui/core/styles'

export const materialTheme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 768, md: 1024, lg: 1200, xl: 1920 }
  },
  // typography: {
  // fontFamily: ['Open Sans', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
  // },
  palette: {
    // type: 'light'
    // primary: {
    //   main: '#000',
    //   light: cMint,
    //   dark: cDark
    // },
    // secondary: {
    //   main: '#000',
    //   light: cMint,
    //   dark: cDark
    // },
    // error: {
    //   main: '#ff0000'
    // },
    // background: {
    //   default: '#fff'
    // }
  },
  overrides: {
    // MuiPaper: {
    //   root: {
    //     backgroundColor: '#fff',
    //     borderRadius: '0 !important'
    //   }
    // },
    // MuiTextField: {
    //   root: {
    //     color: cDark,
    //     backgroundColor: '#fff',
    //     borderRadius: 4
    //   }
    // },
    // MuiFormLabel: {
    //   root: {
    //     color: cDarkGrey,
    //     '&$focused': {
    //       color: cDarkGrey
    //     }
    //   }
    // }
    // MuiFilledInput: {
    //   root: {
    //     fontSize: 14,
    //     color: cDark,
    //     backgroundColor: 'transparent !important',
    //     border: 'solid #E0E0E0 1px',
    //     borderRadius: '4px !important',
    //     '&:hover': {
    //       backgroundColor: 'transparent'
    //     },
    //     '&$focused': {
    //       color: cDark,
    //       backgroundColor: 'transparent',
    //       borderColor: '#3E8D70 !important'
    //     }
    //   },
    //   input: {
    //     padding: '25px 12px 8px',
    //     backgroundColor: 'transparent',
    //     '&::placeholder': {
    //       opacity: 1,
    //       color: cDarkGrey,
    //       fontSize: 14
    //     }
    //   }
    // }
    // MuiTooltip: {
    //   tooltip: {
    //     borderRadius: 0,
    //     backgroundColor: '#fff',
    //     color: cDark,
    //     padding: 16,
    //     fontSize: '12px',
    //     boxShadow: '0px 2px 10px #00000029'
    //   },
    //   arrow: {
    //     color: '#fff'
    //   }
    // }
  }
})
