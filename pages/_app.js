import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/Assets/logo.png" as="image" type="image/png" />
        <link rel="preload" href="/Assets/logo.webp" as="image" type="image/webp" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Performance */}
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Resource Hints */}
        <link rel="preload" href="/data/modernProducts.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/data/productCatalog.json" as="fetch" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JCP Maquinarias",
              "url": "https://maquinariasjcp.netlify.app",
              "logo": "https://maquinariasjcp.netlify.app/Assets/logo.png",
              "description": "Líderes en maquinaria industrial para panaderías. Hornos, amasadoras, repuestos y servicio técnico 24/7.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54-11-6396-2947",
                "contactType": "customer service"
              }
            })
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}