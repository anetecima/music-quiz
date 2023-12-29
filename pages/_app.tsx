import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import 'theme/tw.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import createEmotionCache from '../src/createEmotionCache'
import themeMui from '../src/theme/theme.mui'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const CustomApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no"
      />
      <meta charSet="utf-8" />
      <title>WELCOME TO THE GAME!!!</title>
      <meta name="robots" content="noIndex, noFollow" />
      {/* PWA primary color */}
      <link key="favicon" rel="shortcut icon" href="/favicon_w.ico" />
    </Head>

    <main>
      <ThemeProvider theme={themeMui}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  </CacheProvider>
)

export default CustomApp
