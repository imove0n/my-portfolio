import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              visibility: hidden !important;
              opacity: 0 !important;
            }
            html.loaded {
              visibility: visible !important;
              opacity: 1 !important;
              transition: opacity 0.3s ease;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.classList.add('loaded');
          `
        }} />
      </body>
    </Html>
  )
}