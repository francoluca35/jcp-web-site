import Head from 'next/head'
import { CompleteCatalog } from "../components/CompleteCatalog"

export default function Catalog() {
  return (
    <>
      <Head>
        <title>Catálogo Completo - Maquinaria Industrial para Panaderías | JCP Maquinarias</title>
        <meta name="description" content="Catálogo completo de maquinaria industrial para panaderías. Hornos rotativos, amasadoras, sobadoras, batidoras planetarias y repuestos originales. Servicio técnico especializado en Argentina." />
        <meta name="keywords" content="catálogo maquinaria panadería, hornos industriales argentina, amasadoras sobadoras, repuestos panadería, servicio técnico maquinaria" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Catálogo Completo - Maquinaria Industrial para Panaderías" />
        <meta property="og:description" content="Catálogo completo de maquinaria industrial para panaderías. Hornos, amasadoras, sobadoras y repuestos originales." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/catalog" />
        
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
