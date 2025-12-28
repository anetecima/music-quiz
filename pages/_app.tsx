import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'theme/tw.css'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiProvider } from '@mui/material/styles'
import { ThemeProvider } from '@/components/themeProvider'
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
      <meta charSet="utf-8" />
      <title>WELCOME TO THE GAME!!!</title>
      <meta name="robots" content="noIndex, noFollow" />
    </Head>
    <main>
      <ThemeProvider defaultTheme="light" enableColorScheme themes={['light', 'mint']}>
        <MuiProvider theme={themeMui}>
          <CssBaseline />
          <Component {...pageProps} />
        </MuiProvider>
      </ThemeProvider>
    </main>
  </CacheProvider>
)

export default CustomApp
