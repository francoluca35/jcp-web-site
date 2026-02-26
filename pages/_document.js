import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Google Search Console: podés verificar por archivo (public/google6a4aeb87ae4926e7.html) o por esta meta. Si agregás otra propiedad, añadí otra meta igual con el content que te da Search Console. */}
        <meta
          name="google-site-verification"
          content="google6a4aeb87ae4926e7"
        />
        <meta
          name="google-site-verification"
          content="0_y9ramkSULynQRxCiveQiNgnMafq5ejYYkmw_eCQ7o"
        />

        {/* Meta tags adicionales para el documento */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JCP Maquinarias" />
        
        {/* Fuente opcional: el sitio usa system fonts por defecto; sin preload para evitar "preloaded but not used" */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
