import Head from 'next/head'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { CheckCircle, Award, Truck, ArrowRight, Zap, Settings, Star, Users, Clock, Shield } from "lucide-react"
import { useState, useEffect } from "react"

export default function AmasadorasIndustriales() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const amasadorasData = [
    {
      id: 1,
      name: "Amasadora Rápida C-004",
      capacity: "25 kg harina / 40 kg masa",
      power: "Motor trifásico 4HP",
      time: "6-8 minutos",
      price: "Consultar",
      features: ["Espiral de acero forjado", "Rulemanes blindados", "Zona cilíndrica optimizada", "Ideal para espacios reducidos"],
      idealFor: "Panaderías pequeñas, pizzerías, supermercados"
    },
    {
      id: 2,
      name: "Amasadora Industrial C-008",
      capacity: "50 kg harina / 80 kg masa",
      power: "Motor trifásico 7.5HP",
      time: "8-12 minutos",
      price: "Consultar",
      features: ["Doble espiral", "Sistema de inclinación automática", "Batea de acero inoxidable", "Control de velocidad variable"],
      idealFor: "Panaderías medianas, pastelerías industriales"
    },
    {
      id: 3,
      name: "Amasadora Industrial C-012",
      capacity: "75 kg harina / 120 kg masa",
      power: "Motor trifásico 10HP",
      time: "10-15 minutos",
      price: "Consultar",
      features: ["Triple espiral", "Sistema hidráulico", "Batea extraíble", "Timer digital"],
      idealFor: "Panaderías industriales, grandes producciones"
    }
  ];

  return (
    <>
      <Head>
        <title>Amasadoras Industriales Argentina | Guía Completa de Compra | JCP Maquinarias</title>
        <meta name="description" content="Guía completa para elegir la amasadora industrial ideal. Catálogo de amasadoras de 25kg a 75kg, especificaciones técnicas detalladas, precios y combos especiales. Asesoramiento técnico gratuito en Argentina." />
        <meta name="keywords" content="amasadora industrial argentina, amasadoras 50 kg precio, cómo elegir amasadora industrial, amasadora rápida panadería, especificaciones técnicas amasadora, motor trifásico amasadora, guía compra amasadora industrial, combos amasadora sobadora" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="es-AR" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Amasadoras Industriales Argentina | Guía Completa de Compra" />
        <meta property="og:description" content="Guía completa para elegir la amasadora industrial ideal. Especificaciones técnicas detalladas y asesoramiento técnico gratuito." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/amasadoras-industriales" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/amasadoras-industriales" />
        
        {/* Structured Data - Product Collection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Amasadoras Industriales Argentina",
              "description": "Catálogo completo de amasadoras industriales para panaderías con especificaciones técnicas detalladas",
              "url": "https://maquinariasjcp.netlify.app/amasadoras-industriales",
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": 3,
                "itemListElement": amasadorasData.map((item, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": item.name,
                    "description": `Amasadora industrial con capacidad de ${item.capacity}`,
                    "category": "Amasadoras Industriales",
                    "brand": "JCP Maquinarias",
                    "offers": {
                      "@type": "Offer",
                      "price": item.price,
                      "priceCurrency": "ARS",
                      "availability": "https://schema.org/InStock"
                    }
                  }
                }))
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a1a1a] via-[#495057] to-[#1a1a1a] py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 to-[#ffd23f]/10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center text-white">
              <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/20 to-[#ffd23f]/20 rounded-full px-4 py-2 mb-6 border border-[#ff6b35]/30">
                <Zap className="h-4 w-4 text-[#ffd23f] mr-2" />
                <span className="text-sm font-semibold text-[#ffd23f] uppercase tracking-wide">Guía Completa de Compra</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                <span className="text-white">AMASADORAS</span>
                <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">INDUSTRIALES</span>
                <span className="text-white block text-2xl lg:text-3xl font-bold mt-2 text-[#adb5bd]">Argentina</span>
              </h1>
              
              <p className="text-xl text-[#adb5bd] mb-10 leading-relaxed max-w-4xl mx-auto">
                Descubre cómo elegir la amasadora industrial perfecta para tu panadería. 
                Especificaciones técnicas detalladas, comparativas y asesoramiento especializado para tomar la mejor decisión.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                  onClick={() => document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Catálogo Completo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                  onClick={() => window.open('https://wa.me/541163962947?text=Hola, necesito asesoramiento para elegir una amasadora industrial', '_blank')}
                >
                  Asesoramiento Gratuito
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Guía de Compra Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Cómo Elegir tu Amasadora Industrial Ideal
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestra experiencia de más de 20 años nos permite guiarte en la elección correcta 
                para maximizar tu inversión y productividad.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-[#f8f9fa] p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ff6b35] p-3 rounded-lg mr-4">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">1. Capacidad de Producción</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Calcula tu producción diaria de masa para determinar la capacidad ideal. 
                  Considera el crecimiento futuro de tu negocio.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />25kg harina: Ideal para pizzerías</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />50kg harina: Panaderías medianas</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />75kg harina: Producción industrial</li>
                </ul>
              </div>

              <div className="bg-[#f8f9fa] p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ff6b35] p-3 rounded-lg mr-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">2. Potencia y Eficiencia</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  La potencia del motor determina la velocidad de amasado y la eficiencia energética. 
                  Motores trifásicos ofrecen mayor durabilidad.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />4HP: Producción pequeña</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />7.5HP: Producción media</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />10HP: Producción industrial</li>
                </ul>
              </div>

              <div className="bg-[#f8f9fa] p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-[#ff6b35] p-3 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">3. Materiales y Durabilidad</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Los materiales de construcción garantizan la durabilidad y facilidad de limpieza. 
                  Acero inoxidable es fundamental en la industria alimentaria.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />Acero inoxidable 304</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />Espirales de acero forjado</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />Rulemanes blindados</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Catálogo de Productos */}
        <section id="catalogo" className="py-16 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Catálogo de Amasadoras Industriales
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Especificaciones técnicas detalladas para cada modelo. 
                Compara características y encuentra la amasadora perfecta para tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {amasadorasData.map((amasadora) => (
                <div key={amasadora.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{amasadora.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.8</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Capacidad</p>
                          <p className="text-gray-600">{amasadora.capacity}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Zap className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Potencia</p>
                          <p className="text-gray-600">{amasadora.power}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Tiempo de Amasado</p>
                          <p className="text-gray-600">{amasadora.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Características Principales:</h4>
                      <ul className="space-y-2">
                        {amasadora.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Ideal para:</h4>
                      <p className="text-gray-600 text-sm">{amasadora.idealFor}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-[#ff6b35]">{amasadora.price}</p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                        onClick={() => window.open(`https://wa.me/541163962947?text=Hola, me interesa la ${amasadora.name}`, '_blank')}
                      >
                        Consultar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Necesitas Asesoramiento Personalizado?
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Nuestros técnicos especializados te ayudarán a elegir la amasadora ideal 
              según tu producción, espacio disponible y presupuesto.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-[#ff6b35] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open('https://wa.me/541163962947?text=Hola, necesito asesoramiento para elegir una amasadora industrial', '_blank')}
              >
                <Users className="mr-2 h-5 w-5" />
                Asesoramiento Gratuito
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#ff6b35] font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                onClick={() => window.location.href = '/catalog'}
              >
                Ver Catálogo Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* Botón Ir hacia arriba */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-orange-600 hover:bg-[#1a1a1a] text-white rounded-md w-10 h-10 shadow-lg transition-all duration-300 z-40 flex items-center justify-center"
            size="sm"
            aria-label="Ir hacia arriba"
            title="Ir hacia arriba"
          >
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </Button>
        )}
      </div>
    </>
  )
}
