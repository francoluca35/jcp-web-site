import Head from 'next/head'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { CheckCircle, Award, Truck, ArrowRight, Zap, Settings, Star, Users, Clock, Shield, Thermometer, Gauge } from "lucide-react"
import { useState, useEffect } from "react"

export default function HornosIndustriales() {
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

  const hornosData = [
    {
      id: 1,
      name: "Horno Rotativo ZU-97",
      capacity: "50 kg/h cocción",
      trays: "9 unidades",
      measures: "45x70 cm",
      power: "17.800 kcal/h",
      gasConsumption: "1 kg/h",
      voltage: "220V/380V/110V",
      price: "Consultar",
      features: ["Consumo gas 1 kg/h", "Tensión 220V/380V/110V", "Cámara fermentadora opcional", "Sistema de vapor"],
      idealFor: "Panaderías medianas, producción continua"
    },
    {
      id: 2,
      name: "Horno Convector Industrial HC-150",
      capacity: "75 kg/h cocción",
      trays: "12 unidades",
      measures: "60x80 cm",
      power: "25.000 kcal/h",
      gasConsumption: "1.5 kg/h",
      voltage: "220V/380V",
      price: "Consultar",
      features: ["Circulación forzada de aire", "Control digital de temperatura", "Sistema de vapor integrado", "Timer programable"],
      idealFor: "Panaderías industriales, grandes volúmenes"
    },
    {
      id: 3,
      name: "Horno Rotativo ZU-120",
      capacity: "100 kg/h cocción",
      trays: "15 unidades",
      measures: "50x80 cm",
      power: "35.000 kcal/h",
      gasConsumption: "2 kg/h",
      voltage: "380V",
      price: "Consultar",
      features: ["Rotación automática", "Control PID", "Sistema de limpieza automática", "Monitoreo remoto"],
      idealFor: "Producción industrial masiva, franquicias"
    }
  ];

  return (
    <>
      <Head>
        <title>Hornos Industriales para Panadería | Rotativos y Convector Argentina | JCP</title>
        <meta name="description" content="Catálogo completo de hornos industriales para panadería: rotativos, convector y de convección. Capacidades de 50kg a 100kg/h. Especificaciones técnicas detalladas, precios y asesoramiento especializado en Argentina." />
        <meta name="keywords" content="hornos industriales panadería, hornos rotativos argentina, hornos convector industriales, horno panadero 50 kg, especificaciones técnicas hornos, consumo gas horno industrial, guía compra horno panadero, hornos 220v 380v" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="es-AR" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Hornos Industriales para Panadería | Rotativos y Convector Argentina" />
        <meta property="og:description" content="Catálogo completo de hornos industriales con especificaciones técnicas detalladas. Capacidades de 50kg a 100kg/h para panaderías." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/hornos-industriales" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/hornos-industriales" />
        
        {/* Structured Data - Product Collection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Hornos Industriales para Panadería",
              "description": "Catálogo completo de hornos industriales para panaderías con especificaciones técnicas detalladas",
              "url": "https://maquinariasjcp.netlify.app/hornos-industriales",
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": 3,
                "itemListElement": hornosData.map((item, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Product",
                    "name": item.name,
                    "description": `Horno industrial con capacidad de ${item.capacity}`,
                    "category": "Hornos Industriales",
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
                <Thermometer className="h-4 w-4 text-[#ffd23f] mr-2" />
                <span className="text-sm font-semibold text-[#ffd23f] uppercase tracking-wide">Tecnología Industrial</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                <span className="text-white">HORNOS</span>
                <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">INDUSTRIALES</span>
                <span className="text-white block text-2xl lg:text-3xl font-bold mt-2 text-[#adb5bd]">Panadería Argentina</span>
              </h1>
              
              <p className="text-xl text-[#adb5bd] mb-10 leading-relaxed max-w-4xl mx-auto">
                Hornos rotativos y de convección de última generación. 
                Capacidades de 50kg a 100kg/h con especificaciones técnicas detalladas 
                y asesoramiento especializado para optimizar tu producción.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                  onClick={() => document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Especificaciones
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                  onClick={() => window.open('https://wa.me/541163962947?text=Hola, necesito asesoramiento para elegir un horno industrial', '_blank')}
                >
                  Consulta Técnica
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
                Guía Completa: Hornos Rotativos vs Convector
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conoce las diferencias técnicas entre tipos de hornos industriales 
                y elige el sistema de cocción más eficiente para tu panadería.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Hornos Rotativos */}
              <div className="bg-[#f8f9fa] p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ff6b35] p-3 rounded-lg mr-4">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hornos Rotativos</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Los hornos rotativos ofrecen cocción uniforme gracias al movimiento constante de las bandejas. 
                  Ideales para panaderías con producción continua y variedad de productos.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#ff6b35] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Ventajas:</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Cocción uniforme en todas las bandejas</li>
                        <li>• Mayor capacidad de producción</li>
                        <li>• Eficiencia energética superior</li>
                        <li>• Ideal para panes y productos de masa</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Gauge className="h-5 w-5 text-[#ff6b35] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Especificaciones Típicas:</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Capacidad: 50-100 kg/h</li>
                        <li>• Bandejas: 9-15 unidades</li>
                        <li>• Consumo: 1-2 kg gas/h</li>
                        <li>• Voltaje: 220V/380V</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hornos Convector */}
              <div className="bg-[#f8f9fa] p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ffd23f] p-3 rounded-lg mr-4">
                    <Thermometer className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hornos Convector</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Los hornos de convección utilizan circulación forzada de aire caliente para cocción rápida y uniforme. 
                  Perfectos para pastelería y productos que requieren cocción precisa.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#ffd23f] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Ventajas:</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Control preciso de temperatura</li>
                        <li>• Tiempo de cocción reducido</li>
                        <li>• Versatilidad en productos</li>
                        <li>• Ideal para pastelería fina</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Gauge className="h-5 w-5 text-[#ffd23f] mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Especificaciones Típicas:</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Capacidad: 60-120 kg/h</li>
                        <li>• Bandejas: 12-18 unidades</li>
                        <li>• Consumo: 1.5-2.5 kg gas/h</li>
                        <li>• Control digital PID</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparativa de Consumo */}
            <div className="bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Análisis de Consumo Energético
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Gauge className="h-8 w-8 text-[#ff6b35] mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Consumo Gas</h4>
                    <p className="text-sm text-gray-600">1-2 kg/h promedio</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Zap className="h-8 w-8 text-[#ffd23f] mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Potencia Eléctrica</h4>
                    <p className="text-sm text-gray-600">0.65-2.5 kW</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <Clock className="h-8 w-8 text-[#ff6b35] mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">Tiempo Calentamiento</h4>
                    <p className="text-sm text-gray-600">15-30 minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catálogo de Productos */}
        <section id="catalogo" className="py-16 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Catálogo de Hornos Industriales
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Especificaciones técnicas completas de cada modelo. 
                Compara capacidades, consumos y características para elegir el horno ideal.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {hornosData.map((horno) => (
                <div key={horno.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{horno.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.9</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <Gauge className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Capacidad</p>
                          <p className="text-gray-600">{horno.capacity}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Bandejas</p>
                          <p className="text-gray-600">{horno.trays} ({horno.measures})</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Thermometer className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Potencia</p>
                          <p className="text-gray-600">{horno.power}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Zap className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Consumo Gas</p>
                          <p className="text-gray-600">{horno.gasConsumption}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-[#ff6b35] mr-3" />
                        <div>
                          <p className="font-semibold text-gray-900">Tensión</p>
                          <p className="text-gray-600">{horno.voltage}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Características Técnicas:</h4>
                      <ul className="space-y-2">
                        {horno.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Ideal para:</h4>
                      <p className="text-gray-600 text-sm">{horno.idealFor}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-[#ff6b35]">{horno.price}</p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                        onClick={() => window.open(`https://wa.me/541163962947?text=Hola, me interesa el ${horno.name}`, '_blank')}
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
              Asesoramiento Técnico Especializado
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Nuestros técnicos te ayudarán a calcular la capacidad ideal según tu producción, 
              analizar el consumo energético y optimizar tu inversión.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-[#ff6b35] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open('https://wa.me/541163962947?text=Hola, necesito asesoramiento para elegir un horno industrial según mi producción', '_blank')}
              >
                <Users className="mr-2 h-5 w-5" />
                Consulta Técnica Gratuita
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
