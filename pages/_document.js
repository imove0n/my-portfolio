import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              opacity: 0;
              animation: pageLoad 0.4s ease 0.1s forwards;
            }
            @keyframes pageLoad {
              to { opacity: 1; }
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}