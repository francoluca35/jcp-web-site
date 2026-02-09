import SEOHead from '../components/SEOHead'
import { seoConfig } from '../seo-config'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function Maquinaria() {
  return (
    <>
      <SEOHead
        title="Maquinaria Industrial para Panaderías | Hornos, Amasadoras, Sobadoras | JCP Maquinarias"
        description="Maquinaria industrial especializada para panaderías y pastelerías. Hornos rotativos, amasadoras de espiral y brazos, sobadoras industriales, batidoras planetarias. Fabricación argentina con garantía."
        keywords="maquinaria panadería industrial, hornos rotativos argentina, amasadoras sobadoras, batidoras planetarias, equipos panadería, maquinaria industrial, maquinas de panaderia, repuestos de panaderia, trinchadoras, jcp"
        canonicalUrl={`${seoConfig.company.url}/maquinaria`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Maquinaria Industrial para Panaderías",
          "description": "Maquinaria industrial especializada para panaderías y pastelerías",
          "brand": {
            "@type": "Brand",
            "name": "JCP Maquinarias"
          },
          "category": "Maquinaria Industrial",
          "url": `${seoConfig.company.url}/maquinaria`,
          "image": seoConfig.openGraph.images[0].url,
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "ARS",
            "seller": {
              "@type": "Organization",
              "name": "JCP Maquinarias"
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <Header />
        <main role="main" className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">
              Maquinaria Industrial para Panaderías
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hornos Rotativos */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Hornos Rotativos</h2>
                <p className="text-gray-600 mb-4">
                  Hornos rotativos industriales de alta eficiencia para panaderías y pastelerías. 
                  Tecnología avanzada con control digital de temperatura.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Capacidades de 6 a 20 bandejas</li>
                  <li>• Control digital de temperatura</li>
                  <li>• Sistema de vapor integrado</li>
                  <li>• Garantía de 2 años</li>
                </ul>
              </div>

              {/* Amasadoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Amasadoras Industriales</h2>
                <p className="text-gray-600 mb-4">
                  Amasadoras de espiral y brazos para diferentes volúmenes de producción. 
                  Diseño robusto para uso industrial intensivo.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Capacidades de 20kg a 200kg</li>
                  <li>• Motor de alta eficiencia</li>
                  <li>• Bowl en acero inoxidable</li>
                  <li>• Sistema de seguridad</li>
                </ul>
              </div>

              {/* Sobadoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Sobadoras Industriales</h2>
                <p className="text-gray-600 mb-4">
                  Sobadoras de mesa y de piso para laminado de masa. 
                  Precisión y durabilidad para producción industrial.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Rodillos ajustables</li>
                  <li>• Ancho de trabajo variable</li>
                  <li>• Sistema de refrigeración</li>
                  <li>• Control de velocidad</li>
                </ul>
              </div>

              {/* Batidoras Planetarias */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Batidoras Planetarias</h2>
                <p className="text-gray-600 mb-4">
                  Batidoras planetarias para pastelería y panadería. 
                  Versatilidad y potencia para diferentes preparaciones.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Capacidades de 20L a 140L</li>
                  <li>• Múltiples accesorios</li>
                  <li>• Control de velocidad variable</li>
                  <li>• Bowl extraíble</li>
                </ul>
              </div>

              {/* Divisoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Divisoras de Masa</h2>
                <p className="text-gray-600 mb-4">
                  Divisoras automáticas para porcionado preciso de masa. 
                  Aumenta la productividad y uniformidad del producto.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• División automática</li>
                  <li>• Peso ajustable</li>
                  <li>• Sistema de lubricación</li>
                  <li>• Fácil limpieza</li>
                </ul>
              </div>

              {/* Cámaras de Fermentación */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Cámaras de Fermentación</h2>
                <p className="text-gray-600 mb-4">
                  Cámaras de fermentación controlada para optimizar el proceso de panificación. 
                  Control preciso de temperatura y humedad.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Control de temperatura</li>
                  <li>• Control de humedad</li>
                  <li>• Sistema de circulación</li>
                  <li>• Programación digital</li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Necesitas Asesoramiento Técnico?
              </h3>
              <p className="text-white mb-6">
                Nuestros ingenieros especializados te ayudarán a elegir la maquinaria ideal para tu proyecto
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#ff6b35] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Solicitar Cotización
                </button>
                <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Descargar Catálogo
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
