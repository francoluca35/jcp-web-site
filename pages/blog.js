import Head from 'next/head'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { ArrowRight, Calendar, User, Clock, Tag, ChevronRight, BookOpen, Lightbulb, Wrench, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function Blog() {
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

  const blogPosts = [
    {
      id: 1,
      title: "Guía Completa para Elegir la Amasadora Industrial Ideal",
      excerpt: "Descubre cómo calcular la capacidad necesaria, analizar especificaciones técnicas y optimizar tu inversión en amasadoras industriales para panaderías.",
      category: "Guías de Compra",
      readTime: "8 min",
      date: "2024-12-19",
      tags: ["amasadoras", "guía compra", "especificaciones técnicas"],
      featured: true,
      url: "/blog/guia-elegir-amasadora-industrial"
    },
    {
      id: 2,
      title: "Horno de Gas vs Eléctrico: ¿Cuál es Mejor para tu Panadería?",
      excerpt: "Análisis técnico completo comparando consumo, eficiencia, costos operativos y características de hornos de gas y eléctricos para panaderías industriales.",
      category: "Comparativas Técnicas",
      readTime: "6 min",
      date: "2024-12-18",
      tags: ["hornos", "comparativa", "consumo energético"],
      featured: true,
      url: "/blog/horno-gas-vs-electrico-panaderia"
    },
    {
      id: 3,
      title: "5 Consejos para el Mantenimiento Preventivo de tu Amasadora",
      excerpt: "Mantén tu amasadora industrial en óptimas condiciones con estos consejos de mantenimiento preventivo que prolongan la vida útil y evitan costosas reparaciones.",
      category: "Mantenimiento",
      readTime: "5 min",
      date: "2024-12-17",
      tags: ["mantenimiento", "amasadoras", "prevención"],
      featured: false,
      url: "/blog/mantenimiento-preventivo-amasadoras"
    },
    {
      id: 4,
      title: "La Prueba de Ventana: Cómo Saber si tu Masa está Lista",
      excerpt: "Técnica fundamental para determinar el punto óptimo de amasado. Aprende a realizar la prueba de ventana y mejorar la calidad de tus productos.",
      category: "Técnicas de Producción",
      readTime: "4 min",
      date: "2024-12-16",
      tags: ["técnicas", "masa", "calidad"],
      featured: false,
      url: "/blog/prueba-ventana-masa-lista"
    },
    {
      id: 5,
      title: "Equipamiento Básico para Montar una Panadería desde Cero",
      excerpt: "Lista completa de maquinaria esencial para emprendedores que quieren iniciar una panadería. Incluye especificaciones, precios aproximados y consejos de compra.",
      category: "Emprendimiento",
      readTime: "10 min",
      date: "2024-12-15",
      tags: ["emprendimiento", "equipamiento básico", "panadería"],
      featured: true,
      url: "/blog/equipamiento-basico-panaderia-emprender"
    },
    {
      id: 6,
      title: "Optimización de Procesos: Cómo Aumentar la Productividad",
      excerpt: "Estrategias para optimizar el flujo de trabajo en tu panadería, desde la organización del espacio hasta la programación de horarios de producción.",
      category: "Optimización",
      readTime: "7 min",
      date: "2024-12-14",
      tags: ["productividad", "procesos", "optimización"],
      featured: false,
      url: "/blog/optimizacion-procesos-productividad-panaderia"
    }
  ];

  const categories = [
    { name: "Guías de Compra", count: 12, icon: BookOpen },
    { name: "Mantenimiento", count: 8, icon: Wrench },
    { name: "Comparativas Técnicas", count: 6, icon: TrendingUp },
    { name: "Técnicas de Producción", count: 10, icon: Lightbulb },
    { name: "Emprendimiento", count: 5, icon: User }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      <Head>
        <title>Blog Técnico Maquinaria Panadería | Guías y Consejos | JCP Maquinarias</title>
        <meta name="description" content="Blog especializado en maquinaria para panaderías. Guías de compra, mantenimiento preventivo, técnicas de producción y consejos técnicos de expertos en equipamiento industrial." />
        <meta name="keywords" content="blog maquinaria panadería, guías compra amasadoras, mantenimiento equipamiento industrial, técnicas producción panadería, consejos técnicos hornos, optimización procesos panadería" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="es-AR" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog Técnico Maquinaria Panadería | Guías y Consejos Expertos" />
        <meta property="og:description" content="Blog especializado con guías de compra, mantenimiento preventivo y técnicas de producción para equipamiento de panaderías." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/blog" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/blog" />
        
        {/* Structured Data - Blog */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Blog Técnico JCP Maquinarias",
              "description": "Blog especializado en maquinaria industrial para panaderías",
              "url": "https://maquinariasjcp.netlify.app/blog",
              "publisher": {
                "@type": "Organization",
                "name": "JCP Maquinarias",
                "logo": "https://maquinariasjcp.netlify.app/Assets/logojcp.png"
              },
              "blogPost": blogPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "datePublished": post.date,
                "author": {
                  "@type": "Organization",
                  "name": "JCP Maquinarias"
                },
                "url": `https://maquinariasjcp.netlify.app${post.url}`,
                "keywords": post.tags.join(", ")
              }))
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
                <BookOpen className="h-4 w-4 text-[#ffd23f] mr-2" />
                <span className="text-sm font-semibold text-[#ffd23f] uppercase tracking-wide">Conocimiento Especializado</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                <span className="text-white">BLOG</span>
                <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">TÉCNICO</span>
                <span className="text-white block text-2xl lg:text-3xl font-bold mt-2 text-[#adb5bd]">Maquinaria Panadería</span>
              </h1>
              
              <p className="text-xl text-[#adb5bd] mb-10 leading-relaxed max-w-4xl mx-auto">
                Guías técnicas especializadas, consejos de mantenimiento y análisis comparativos 
                de equipamiento industrial para panaderías. Conocimiento experto para optimizar tu inversión.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                  onClick={() => document.getElementById('articulos').scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Artículos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                  onClick={() => window.open('https://wa.me/541163962947?text=Hola, tengo una consulta técnica sobre maquinaria de panadería', '_blank')}
                >
                  Consulta Técnica
                  <User className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categorías Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Categorías Especializadas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Contenido técnico organizado por temáticas específicas para facilitar tu búsqueda 
                de información especializada en equipamiento industrial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={index} className="bg-[#f8f9fa] p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#ff6b35] p-3 rounded-lg mr-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} artículos</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {category.name === "Guías de Compra" && "Análisis detallados y comparativas para elegir el equipamiento ideal."}
                      {category.name === "Mantenimiento" && "Consejos y técnicas para mantener tu maquinaria en óptimas condiciones."}
                      {category.name === "Comparativas Técnicas" && "Estudios técnicos comparando diferentes tecnologías y marcas."}
                      {category.name === "Técnicas de Producción" && "Métodos y procesos para optimizar la producción en tu panadería."}
                      {category.name === "Emprendimiento" && "Guías para emprendedores que inician en el sector panadero."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Artículos Destacados */}
        <section id="articulos" className="py-16 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Artículos Destacados
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Los contenidos más consultados por nuestros clientes. 
                Guías completas y consejos técnicos de mayor valor.
              </p>
            </div>

            {/* Featured Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredPosts.map((post, index) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-[#ff6b35] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="ml-auto text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-[#ff6b35] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(post.date).toLocaleDateString('es-AR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      
                      <Button 
                        className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                        onClick={() => window.open(post.url, '_blank')}
                      >
                        Leer Más
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* All Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-[#ffd23f] text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="ml-auto text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-[#ff6b35] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('es-AR', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                      
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-[#ff6b35] hover:text-[#ff5722] p-0 h-auto"
                        onClick={() => window.open(post.url, '_blank')}
                      >
                        Leer
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Mantente Actualizado
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Recibe nuestros artículos técnicos más recientes y consejos especializados 
              directamente en tu correo electrónico.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button 
                className="bg-white text-[#ff6b35] hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Suscribirse
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