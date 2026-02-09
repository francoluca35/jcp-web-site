import '../styles/globals.css'
import Head from 'next/head'
import WebVitals from '../components/WebVitals'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Meta tags básicos */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Preconnect a dominios externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Security Headers - Solo los que funcionan en meta tags */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="color-scheme" content="light dark" />
        
      </Head>
      
      <Component {...pageProps} />
      <WebVitals />
    </>
  )
}