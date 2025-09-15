import Head from 'next/head'
import { CompleteCatalog } from "../components/CompleteCatalog"

export default function Catalog() {
  return (
    <>
      <Head>
        <title>Catálogo Amasadoras Industriales | Hornos Rotativos | Sobadoras Martino Argentina</title>
        <meta name="description" content="Catálogo completo de amasadoras industriales, hornos rotativos, sobadoras Martino y maquinaria para panaderías en Argentina. Especificaciones técnicas detalladas, precios y combos especiales. Asesoramiento técnico gratuito." />
        <meta name="keywords" content="catálogo amasadoras industriales, hornos rotativos argentina, sobadoras martino, amasadoras 50 kg precio, hornos convector panadería, combos equipamiento panadería, especificaciones técnicas maquinaria, guía compra amasadora industrial" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Catálogo Amasadoras Industriales | Hornos Rotativos | Sobadoras Martino" />
        <meta property="og:description" content="Catálogo completo con especificaciones técnicas detalladas de amasadoras industriales, hornos rotativos y sobadoras Martino en Argentina." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/catalog" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/catalog" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Catálogo de Maquinaria Industrial para Panaderías",
              "description": "Catálogo completo de maquinaria industrial para panaderías y pastelerías",
              "url": "https://maquinariasjcp.netlify.app/catalog",
              "numberOfItems": 50,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Hornos Rotativos Industriales",
                  "url": "https://maquinariasjcp.netlify.app/catalog#hornos"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Amasadoras Industriales",
                  "url": "https://maquinariasjcp.netlify.app/catalog#amasadoras"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Sobadoras Industriales",
                  "url": "https://maquinariasjcp.netlify.app/catalog#sobadoras"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Repuestos Originales",
                  "url": "https://maquinariasjcp.netlify.app/catalog#repuestos"
                }
              ]
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <main role="main">
          <CompleteCatalog />
        </main>
      </div>
    </>
  )
}
