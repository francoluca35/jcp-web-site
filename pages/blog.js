import Head from 'next/head'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "Guía Completa: Cómo Elegir la Amasadora Ideal para tu Panadería",
      excerpt: "Descubre los factores clave para seleccionar la amasadora perfecta según tu volumen de producción y tipo de productos.",
      category: "Maquinaria",
      readTime: "8 min",
      date: "2024-12-19",
      slug: "como-elegir-amasadora-panaderia"
    },
    {
      id: 2,
      title: "Mantenimiento Preventivo: 10 Tips para Prolongar la Vida de tu Horno Rotativo",
      excerpt: "Aprende las mejores prácticas de mantenimiento para mantener tu horno rotativo funcionando al máximo rendimiento.",
      category: "Mantenimiento",
      readTime: "6 min",
      date: "2024-12-18",
      slug: "mantenimiento-preventivo-horno-rotativo"
    },
    {
      id: 3,
      title: "Repuestos Esenciales: ¿Qué Debes Tener Siempre en Stock?",
      excerpt: "Lista completa de repuestos críticos que toda panadería debe tener disponibles para evitar paradas de producción.",
      category: "Repuestos",
      readTime: "5 min",
      date: "2024-12-17",
      slug: "repuestos-esenciales-stock-panaderia"
    },
    {
      id: 4,
      title: "Diferencias entre Amasadora de Espiral vs Brazos: ¿Cuál Elegir?",
      excerpt: "Análisis técnico detallado de las ventajas y desventajas de cada tipo de amasadora según tu producción.",
      category: "Maquinaria",
      readTime: "7 min",
      date: "2024-12-16",
      slug: "amasadora-espiral-vs-brazos"
    },
    {
      id: 5,
      title: "Optimización de Procesos: Cómo Aumentar la Productividad en tu Panadería",
      excerpt: "Estrategias prácticas para optimizar el flujo de trabajo y maximizar la eficiencia de tu maquinaria.",
      category: "Procesos",
      readTime: "10 min",
      date: "2024-12-15",
      slug: "optimizacion-procesos-panaderia"
    },
    {
      id: 6,
      title: "Seguridad Industrial: Protocolos Básicos para Operadores de Maquinaria",
      excerpt: "Guía esencial de seguridad para operadores de maquinaria de panadería y prevención de accidentes.",
      category: "Seguridad",
      readTime: "6 min",
      date: "2024-12-14",
      slug: "seguridad-industrial-maquinaria-panaderia"
    }
  ];

  return (
    <>
      <Head>
        <title>Blog Técnico - Maquinaria de Panadería | JCP Maquinarias</title>
        <meta name="description" content="Blog técnico especializado en maquinaria de panadería. Guías, tips de mantenimiento, optimización de procesos y novedades del sector industrial panadero." />
        <meta name="keywords" content="blog maquinaria panadería, mantenimiento preventivo, optimización procesos, guías técnicas, industria panadera argentina" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog Técnico - Maquinaria de Panadería | JCP Maquinarias" />
        <meta property="og:description" content="Blog técnico especializado en maquinaria de panadería. Guías, tips y novedades del sector." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/blog" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/blog" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Blog Técnico JCP Maquinarias",
              "description": "Blog técnico especializado en maquinaria de panadería",
              "url": "https://maquinariasjcp.netlify.app/blog",
              "publisher": {
                "@type": "Organization",
                "name": "JCP Maquinarias"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <Header />
        <main role="main" className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">
              Blog Técnico
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Contenido técnico especializado para profesionales del sector panadero. 
              Guías, tips de mantenimiento y novedades de la industria.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-[#ff6b35] bg-orange-100 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-[#1a1a1a] mb-3 hover:text-[#ff6b35] transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString('es-AR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <button className="text-[#ff6b35] font-semibold hover:text-[#ff5722] transition-colors">
                        Leer más →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-12 bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Quieres Recibir Contenido Técnico Exclusivo?
              </h3>
              <p className="text-white mb-6">
                Suscríbete a nuestro newsletter y recibe las últimas novedades, tips de mantenimiento 
                y ofertas especiales directamente en tu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Suscribirse
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
