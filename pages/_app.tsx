import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import 'normalize.css'
import { materialTheme } from '../src/theme/materialUi'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

interface App extends AppProps {
  err: unknown
}

const CustomApp = ({ Component, pageProps, err }: App) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1,
                    width=device-width, shrink-to-fit=no, user-scalable=no"
      />
      <meta charSet="utf-8" />
      <title>WELCOME TO THE GAME!!!</title>
      {/*<meta name="Keywords" content={keywords} />*/}
      {/*<meta name="Description" content={description} />*/}
      <meta name="robots" content="index, follow" />
      {/* PWA primary color */}
      <link key="favicon" rel="shortcut icon" href="/favicon_w.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik+Beastly&display=swap"
        rel="stylesheet"
      />
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
