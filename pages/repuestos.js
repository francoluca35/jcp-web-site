import Head from 'next/head'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function Repuestos() {
  return (
    <>
      <Head>
        <title>Repuestos para Maquinaria de Panadería | JCP Maquinarias Argentina</title>
        <meta name="description" content="Repuestos originales para maquinaria de panadería. Motores, engranajes, rodamientos, sinfines, coronas, quemadores, sondas de temperatura. Envío a todo Argentina. Stock permanente." />
        <meta name="keywords" content="repuestos maquinaria panadería, motores amasadoras, engranajes sobadoras, sinfines coronas, quemadores hornos, repuestos Pauna, repuestos Imepa" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Repuestos para Maquinaria de Panadería | JCP Maquinarias" />
        <meta property="og:description" content="Repuestos originales para maquinaria de panadería. Motores, engranajes, sinfines y más. Envío a todo Argentina." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/repuestos" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/repuestos" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Repuestos para Maquinaria de Panadería",
              "description": "Repuestos originales para maquinaria de panadería y pastelería",
              "brand": {
                "@type": "Brand",
                "name": "JCP Maquinarias"
              },
              "category": "Repuestos Industriales",
              "url": "https://maquinariasjcp.netlify.app/repuestos",
              "image": "https://maquinariasjcp.netlify.app/Assets/logojcp.png",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "ARS",
                "seller": {
                  "@type": "Organization",
                  "name": "JCP Maquinarias"
                }
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <Header />
        <main role="main" className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-8">
              Repuestos para Maquinaria de Panadería
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Repuestos originales y de alta calidad para mantener tu maquinaria funcionando al 100%. 
              Stock permanente y envío a todo Argentina.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Repuestos para Amasadoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Repuestos para Amasadoras</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Motores eléctricos monofásicos y trifásicos</li>
                  <li>• Sinfines y coronas helicoidales</li>
                  <li>• Ganchos amasadores en acero inoxidable</li>
                  <li>• Bowls y tazas de amasado</li>
                  <li>• Rodamientos y retenes</li>
                  <li>• Cables y conectores eléctricos</li>
                  <li>• Interruptores y controles</li>
                </ul>
              </div>

              {/* Repuestos para Hornos */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Repuestos para Hornos</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Quemadores de gas y eléctricos</li>
                  <li>• Sondas de temperatura</li>
                  <li>• Termostatos digitales</li>
                  <li>• Ventiladores y motores</li>
                  <li>• Bandejas y rejillas</li>
                  <li>• Aislamiento térmico</li>
                  <li>• Sistemas de vapor</li>
                </ul>
              </div>

              {/* Repuestos para Sobadoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Repuestos para Sobadoras</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Rodillos de laminado</li>
                  <li>• Engranajes helicoidales</li>
                  <li>• Cadenas y piñones</li>
                  <li>• Motores reductores</li>
                  <li>• Bandas transportadoras</li>
                  <li>• Guías y ajustes</li>
                  <li>• Sistemas de refrigeración</li>
                </ul>
              </div>

              {/* Repuestos para Batidoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Repuestos para Batidoras</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Ganchos batidores planetarios</li>
                  <li>• Paletas y globos</li>
                  <li>• Bowls de diferentes capacidades</li>
                  <li>• Motores de velocidad variable</li>
                  <li>• Controles electrónicos</li>
                  <li>• Accesorios especializados</li>
                  <li>• Sistemas de elevación</li>
                </ul>
              </div>

              {/* Repuestos para Divisoras */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Repuestos para Divisoras</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cuchillas divisoras</li>
                  <li>• Pistones y cilindros</li>
                  <li>• Válvulas de control</li>
                  <li>• Sensores de peso</li>
                  <li>• Motores hidráulicos</li>
                  <li>• Sistemas de lubricación</li>
                  <li>• Controles de precisión</li>
                </ul>
              </div>

              {/* Repuestos Generales */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Repuestos Generales</h2>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Rodamientos industriales</li>
                  <li>• Retenes y juntas</li>
                  <li>• Correas y poleas</li>
                  <li>• Cables y conectores</li>
                  <li>• Interruptores y controles</li>
                  <li>• Herramientas especializadas</li>
                  <li>• Lubricantes industriales</li>
                </ul>
              </div>
            </div>

            {/* Marcas Compatibles */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">
                Repuestos Compatibles con las Principales Marcas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <span className="font-semibold text-[#ff6b35]">PAUNA</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <span className="font-semibold text-[#ff6b35]">IMEPA</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <span className="font-semibold text-[#ff6b35]">SCHEPENS</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <span className="font-semibold text-[#ff6b35]">FINESCHI</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <span className="font-semibold text-[#ff6b35]">PAN-SOY</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <span className="font-semibold text-[#ff6b35]">OTRAS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿No Encuentras el Repuesto que Buscas?
              </h3>
              <p className="text-white mb-6">
                Contáctanos y te ayudaremos a encontrar el repuesto exacto para tu maquinaria
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#ff6b35] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Consultar Repuesto
                </button>
                <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Solicitar Cotización
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
