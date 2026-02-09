import SEOHead from '../components/SEOHead'
import { seoConfig } from '../seo-config'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { CheckCircle, Award, Truck, ArrowRight, Zap, Settings, Star, Users, Clock, Shield, Package, DollarSign, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function CombosSoluciones() {
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

  const combosData = [
    {
      id: 1,
      name: "Combo Panadería Básica",
      description: "Equipamiento esencial para iniciar una panadería pequeña",
      originalPrice: "$45,000",
      comboPrice: "$38,500",
      savings: "$6,500",
      savingsPercent: "14%",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3NTY0OTQxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      equipment: [
        "Amasadora Rápida C-004 (25kg)",
        "Horno Rotativo ZU-97 (9 bandejas)",
        "Mesa de Trabajo Acero Inox",
        "Balanza Digital Industrial"
      ],
      idealFor: "Panaderías pequeñas, emprendimientos",
      production: "Capacidad: 40kg masa/día",
      features: ["Instalación incluida", "Capacitación del personal", "Garantía extendida", "Soporte técnico 6 meses"],
      popular: true
    },
    {
      id: 2,
      name: "Combo Panadería Industrial",
      description: "Solución completa para panaderías de mediana escala",
      originalPrice: "$85,000",
      comboPrice: "$72,000",
      savings: "$13,000",
      savingsPercent: "15%",
      image: "https://images.unsplash.com/photo-1656180384586-0f1cde47a9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnJlYWQlMjBvdmVufGVufDF8fHx8MTc1NjQ5NDEyOHww&ixlib=rb-4.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      equipment: [
        "Amasadora Industrial C-008 (50kg)",
        "Horno Convector HC-150 (12 bandejas)",
        "Sobadora Martino 450mm",
        "Divisora Automática",
        "Mesa de Trabajo Premium"
      ],
      idealFor: "Panaderías medianas, franquicias",
      production: "Capacidad: 120kg masa/día",
      features: ["Instalación y puesta a punto", "Capacitación completa", "Garantía 2 años", "Soporte técnico 12 meses", "Plan de mantenimiento"],
      popular: false
    },
    {
      id: 3,
      name: "Combo Pizzería Completo",
      description: "Equipamiento especializado para pizzerías y restaurantes",
      originalPrice: "$62,000",
      comboPrice: "$52,000",
      savings: "$10,000",
      savingsPercent: "16%",
      image: "https://images.unsplash.com/photo-1703607888337-aae6d77b3d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWl4ZXIlMjBiYWtlcnl8ZW58MXx8fHwxNzU2NDk0MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      equipment: [
        "Amasadora Rápida C-004 (25kg)",
        "Horno Pizzero HP-120",
        "Mesa de Estirado Acero Inox",
        "Cortadora de Pizza Automática",
        "Refrigerador de Masa"
      ],
      idealFor: "Pizzerías, restaurantes, delivery",
      production: "Capacidad: 200 pizzas/día",
      features: ["Instalación especializada", "Recetas incluidas", "Garantía 2 años", "Soporte técnico 12 meses", "Asesoramiento gastronómico"],
      popular: false
    },
    {
      id: 4,
      name: "Combo Pastelería Premium",
      description: "Solución integral para pastelerías y repostería fina",
      originalPrice: "$95,000",
      comboPrice: "$80,000",
      savings: "$15,000",
      savingsPercent: "16%",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBzaG9wfGVufDF8fHx8MTc1NjQ5NDEyOXww&ixlib=rb-4.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      equipment: [
        "Batidora Planetaria 20L",
        "Horno Convector Pastelero",
        "Sobadora de Repostería",
        "Mesa de Decoración Premium",
        "Refrigerador de Productos"
      ],
      idealFor: "Pastelerías, repostería fina, cafeterías",
      production: "Capacidad: 150 productos/día",
      features: ["Instalación premium", "Capacitación especializada", "Garantía 2 años", "Soporte técnico 12 meses", "Consultoría gastronómica"],
      popular: false
    }
  ];

  return (
    <>
      <SEOHead
        title={seoConfig.pages.combos.title}
        description={seoConfig.pages.combos.description}
        keywords={seoConfig.pages.combos.keywords}
        canonicalUrl={`${seoConfig.company.url}/combos-soluciones`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Combos y Soluciones Integrales para Panaderías",
          "description": "Combos completos de equipamiento industrial para panaderías con descuentos especiales",
          "url": `${seoConfig.company.url}/combos-soluciones`,
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": 4,
            "itemListElement": combosData.map((combo, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": combo.name,
                "description": combo.description,
                "category": "Combos de Equipamiento",
                "brand": "JCP Maquinarias",
                "offers": {
                  "@type": "Offer",
                  "price": combo.comboPrice,
                  "priceCurrency": "ARS",
                  "availability": "https://schema.org/InStock",
                  "priceValidUntil": "2025-12-31"
                }
              }
            }))
          }
        }}
      />
      
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
                <Package className="h-4 w-4 text-[#ffd23f] mr-2" />
                <span className="text-sm font-semibold text-[#ffd23f] uppercase tracking-wide">Soluciones Integrales</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                <span className="text-white">COMBOS</span>
                <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">INTEGRALES</span>
                <span className="text-white block text-2xl lg:text-3xl font-bold mt-2 text-[#adb5bd]">Equipamiento Completo</span>
              </h1>
              
              <p className="text-xl text-[#adb5bd] mb-10 leading-relaxed max-w-4xl mx-auto">
                Soluciones completas para tu negocio con descuentos especiales. 
                Combos diseñados por expertos que incluyen instalación, capacitación y soporte técnico. 
                Ahorra hasta 16% comprando todo junto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                  onClick={() => document.getElementById('combos').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Combos Disponibles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                  onClick={() => window.open('https://wa.me/541163962947?text=Hola, me interesa conocer más sobre los combos de equipamiento', '_blank')}
                >
                  Asesoramiento Gratuito
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas de los Combos */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                ¿Por Qué Elegir Nuestros Combos?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestros combos están diseñados por expertos para ofrecerte la mejor relación 
                calidad-precio y todas las ventajas que necesitas para tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "Ahorro Garantizado",
                  description: "Descuentos de hasta 16% al comprar en combo vs equipos individuales",
                  color: "from-[#ff6b35] to-[#ffd23f]"
                },
                {
                  icon: Package,
                  title: "Instalación Incluida",
                  description: "Instalación profesional y puesta a punto sin costo adicional",
                  color: "from-[#ffd23f] to-[#ff6b35]"
                },
                {
                  icon: Users,
                  title: "Capacitación Completa",
                  description: "Entrenamiento del personal en el uso y mantenimiento del equipo",
                  color: "from-[#ff6b35] to-[#ffd23f]"
                },
                {
                  icon: Shield,
                  title: "Soporte Extendido",
                  description: "Garantía extendida y soporte técnico especializado incluido",
                  color: "from-[#ffd23f] to-[#ff6b35]"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className={`bg-gradient-to-r ${benefit.color} rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center`}>
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catálogo de Combos */}
        <section id="combos" className="py-16 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Combos Disponibles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones completas diseñadas para diferentes tipos de negocios. 
                Cada combo incluye todo lo necesario para comenzar tu producción.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {combosData.map((combo) => (
                <div key={combo.id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative ${combo.popular ? 'ring-2 ring-[#ff6b35]' : ''}`}>
                  {combo.popular && (
                    <div className="absolute top-4 left-4 bg-[#ff6b35] text-white px-3 py-1 rounded-full text-sm font-bold">
                      MÁS POPULAR
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{combo.name}</h3>
                        <p className="text-gray-600 mb-4">{combo.description}</p>
                        <p className="text-sm text-[#ff6b35] font-semibold">{combo.idealFor}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#ff6b35]">{combo.comboPrice}</div>
                        <div className="text-sm text-gray-500 line-through">{combo.originalPrice}</div>
                        <div className="text-sm font-bold text-green-600">Ahorra {combo.savings}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Equipamiento Incluido:</h4>
                      <ul className="space-y-2">
                        {combo.equipment.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-[#ff6b35] mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Capacidad de Producción:</h4>
                      <p className="text-gray-600 text-sm mb-4">{combo.production}</p>
                      
                      <h4 className="font-semibold text-gray-900 mb-3">Beneficios Incluidos:</h4>
                      <ul className="space-y-1">
                        {combo.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 text-[#ffd23f] mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <TrendingUp className="h-4 w-4 inline mr-1" />
                        Ahorro del {combo.savingsPercent}
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                        onClick={() => window.open(`https://wa.me/541163962947?text=Hola, me interesa el ${combo.name}`, '_blank')}
                      >
                        Consultar Combo
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
              ¿Necesitas un Combo Personalizado?
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Nuestros expertos pueden diseñar una solución personalizada según tu producción, 
              espacio disponible y presupuesto específico.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-[#ff6b35] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open('https://wa.me/541163962947?text=Hola, necesito un combo personalizado para mi negocio', '_blank')}
              >
                <Users className="mr-2 h-5 w-5" />
                Consulta Personalizada
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#ff6b35] font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                onClick={() => window.location.href = '/catalog'}
              >
                Ver Catálogo Individual
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
