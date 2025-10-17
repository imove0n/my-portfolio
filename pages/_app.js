import '../styles/globals.css'
import '../styles/portfolio.css'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isChangingRoute, setIsChangingRoute] = useState(false)

  useEffect(() => {
    const handleStart = (url) => {
      // Only show loader if navigating to a different page
      if (url !== router.asPath) {
        setIsChangingRoute(true)
      }
    }
    const handleComplete = () => {
      setIsChangingRoute(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <style jsx global>{`
        /* Prevent FOUC during route transitions */
        .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-bg-primary);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          font-size: var(--font-size-lg);
          font-family: var(--font-primary);
        }
      `}</style>

      {isChangingRoute && (
        <div className="page-transition-overlay">
          <div style={{ textAlign: 'center' }}>
            <div className="loading-spinner"></div>
            Loading...
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(14, 165, 233, 0.2);
          border-top: 4px solid var(--color-primary);
          border-radius: var(--radius-full);
          animation: spin var(--duration-epic) linear infinite;
          margin: 0 auto 1rem;
        }
      `}</style>

      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
export default MyApp