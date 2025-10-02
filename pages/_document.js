import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS to prevent FOUC - loads immediately */
            #__next {
              opacity: 0;
              transition: opacity 0.3s ease;
            }
            #__next.loaded {
              opacity: 1;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Add loaded class as soon as DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('__next').classList.add('loaded');
              });
            } else {
              document.getElementById('__next').classList.add('loaded');
            }
          `
        }} />
      </body>
    </Html>
  )
}