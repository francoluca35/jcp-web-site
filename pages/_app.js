import '../styles/globals.css'
import Head from 'next/head'
import WebVitals from '../components/WebVitals'
import { 
  generatePerformanceMetaTags, 
  generatePreloadLinks, 
  generatePreconnectLinks, 
  generateDnsPrefetchLinks 
} from '../performance-config'
import { seoConfig } from '../seo-config'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Meta tags básicos */}
        <meta charSet="utf-8" />
        
        {/* Meta tags de rendimiento */}
        {generatePerformanceMetaTags().map((meta, index) => (
          <meta key={index} {...meta} />
        ))}
        
        {/* Preload de recursos críticos */}
        {generatePreloadLinks().map((link, index) => (
          <link key={index} {...link} />
        ))}
        
        {/* Preconnect a dominios externos */}
        {generatePreconnectLinks().map((link, index) => (
          <link key={index} {...link} />
        ))}
        
        {/* DNS Prefetch */}
        {generateDnsPrefetchLinks().map((link, index) => (
          <link key={index} {...link} />
        ))}
        
        {/* Resource Hints adicionales */}
        <link rel="preload" href="/data/modernProducts.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/data/productCatalog.json" as="fetch" crossOrigin="anonymous" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.schema.organization)
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.schema.website)
          }}
        />
        
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${seoConfig.analytics.googleAnalytics.id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${seoConfig.analytics.googleAnalytics.id}', {
                    send_page_view: true,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
              }}
            />
          </>
        )}
      </Head>
      
      {/* Componente para monitorear Web Vitals */}
      <WebVitals />
      
      <Component {...pageProps} />
    </>
  )
}