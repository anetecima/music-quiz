import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { materialTheme } from '../src/theme/materialUi'
import 'theme/tw.css'

interface App extends AppProps {
  err: unknown
}

const CustomApp = ({ Component, pageProps, err }: App) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no"
      />
      <meta charSet="utf-8" />
      <title>WELCOME TO THE GAME!!!</title>
      <meta name="robots" content="index, follow" />
      {/* PWA primary color */}
      <link key="favicon" rel="shortcut icon" href="/favicon_w.ico" />
    </Head>

    <ThemeProvider theme={materialTheme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Component {...pageProps} err={err} />
      </StylesProvider>
    </ThemeProvider>
  </>
)

export default CustomApp
