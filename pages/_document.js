import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS - loads immediately to prevent FOUC */
            body {
              opacity: 0 !important;
              background: #0f172a !important;
              color: #f8fafc !important;
              margin: 0 !important;
              padding: 0 !important;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif !important;
            }
            body.hydrated {
              opacity: 1 !important;
              animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Add class immediately after body renders
            document.body.classList.add('hydrated');
          `
        }} />
      </body>
    </Html>
  )
}