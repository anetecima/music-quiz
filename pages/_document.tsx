import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { GlobalStyles } from 'theme/global'
import { ServerStyleSheets } from '@material-ui/core'
import React from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets()
    const scSheets = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: App => props => {
            // noPixels = props.Component.noPixels
            return scSheets.collectStyles(sheets.collect(<App {...props} />))
          }
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheets.getStyleElement(),
          scSheets.getStyleElement()
        ]
      }
    } finally {
      scSheets.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="facebook-domain-verification" content="3ok8vnlmxdvm9t1dt698qzhmsiv47x" />
          {/*@ts-ignore*/}
          <style dangerouslySetInnerHTML={{ __html: GlobalStyles }} />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}
