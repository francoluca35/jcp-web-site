import SEOHead from '../components/SEOHead'
import { seoConfig } from '../seo-config'
import { CompleteCatalog } from "../components/CompleteCatalog"

export default function Catalog() {
  return (
    <>
      <SEOHead
        title={seoConfig.pages.catalog.title}
        description={seoConfig.pages.catalog.description}
        keywords={seoConfig.pages.catalog.keywords}
        canonicalUrl={`${seoConfig.company.url}/catalog`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Catálogo de Maquinaria Industrial para Panaderías",
          "description": "Catálogo completo de maquinaria industrial para panaderías y pastelerías",
          "url": `${seoConfig.company.url}/catalog`,
          "numberOfItems": 50,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Hornos Rotativos Industriales",
              "url": `${seoConfig.company.url}/catalog`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Amasadoras Industriales",
              "url": `${seoConfig.company.url}/catalog`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Sobadoras Industriales",
              "url": `${seoConfig.company.url}/catalog`
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Repuestos Originales",
              "url": `${seoConfig.company.url}/catalog`
            }
          ]
        }}
      />
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <main role="main">
          <CompleteCatalog />
        </main>
      </div>
    </>
  )
}
