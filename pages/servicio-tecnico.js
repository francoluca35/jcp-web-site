import Head from 'next/head'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export default function ServicioTecnico() {
  return (
    <>
      <Head>
        <title>Servicio Técnico Especializado para Maquinaria de Panadería | JCP Maquinarias</title>
        <meta name="description" content="Servicio técnico especializado para maquinaria de panadería. Mantenimiento preventivo, reparaciones, instalación y asesoría técnica. Cobertura nacional con técnicos certificados. 24/7." />
        <meta name="keywords" content="servicio técnico maquinaria panadería, mantenimiento preventivo, reparación hornos amasadoras, instalación equipos panadería, técnicos certificados argentina" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Servicio Técnico Especializado para Maquinaria de Panadería" />
        <meta property="og:description" content="Servicio técnico especializado para maquinaria de panadería. Mantenimiento, reparaciones e instalación con cobertura nacional." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app/servicio-tecnico" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app/servicio-tecnico" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Servicio Técnico para Maquinaria de Panadería",
              "description": "Servicio técnico especializado para maquinaria de panadería y pastelería",
              "provider": {
                "@type": "Organization",
                "name": "JCP Maquinarias"
              },
              "serviceType": "Servicio Técnico Industrial",
              "areaServed": "Argentina",
              "url": "https://maquinariasjcp.netlify.app/servicio-tecnico",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock"
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
              Servicio Técnico Especializado
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Servicio técnico especializado para maquinaria de panadería y pastelería. 
              Mantenimiento preventivo, reparaciones, instalación y asesoría técnica con cobertura nacional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Mantenimiento Preventivo */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Mantenimiento Preventivo</h2>
                <p className="text-gray-600 mb-4">
                  Planes de mantenimiento preventivo personalizados para optimizar el rendimiento 
                  y prolongar la vida útil de tu maquinaria.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Inspección técnica periódica</li>
                  <li>• Lubricación y ajustes</li>
                  <li>• Limpieza de componentes</li>
                  <li>• Verificación de funcionamiento</li>
                  <li>• Reportes detallados</li>
                </ul>
              </div>

              {/* Reparaciones */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Reparaciones</h2>
                <p className="text-gray-600 mb-4">
                  Reparaciones rápidas y eficientes con técnicos certificados y repuestos originales. 
                  Minimizamos el tiempo de inactividad.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Diagnóstico preciso de fallas</li>
                  <li>• Reparación in situ</li>
                  <li>• Repuestos originales</li>
                  <li>• Garantía de trabajo</li>
                  <li>• Soporte técnico 24/7</li>
                </ul>
              </div>

              {/* Instalación */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Instalación</h2>
                <p className="text-gray-600 mb-4">
                  Instalación profesional de maquinaria nueva con puesta en marcha y capacitación 
                  del personal operativo.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Instalación llave en mano</li>
                  <li>• Puesta en marcha</li>
                  <li>• Capacitación operativa</li>
                  <li>• Certificación de funcionamiento</li>
                  <li>• Documentación técnica</li>
                </ul>
              </div>

              {/* Asesoría Técnica */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Asesoría Técnica</h2>
                <p className="text-gray-600 mb-4">
                  Asesoría técnica especializada para optimizar procesos productivos y seleccionar 
                  la maquinaria más adecuada.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Auditorías técnicas</li>
                  <li>• Optimización de procesos</li>
                  <li>• Selección de equipos</li>
                  <li>• Planificación de proyectos</li>
                  <li>• Consultoría especializada</li>
                </ul>
              </div>

              {/* Emergencias */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Servicio de Emergencias</h2>
                <p className="text-gray-600 mb-4">
                  Servicio de emergencias 24/7 para resolver problemas críticos que afecten 
                  la producción de tu panadería.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Atención 24/7</li>
                  <li>• Respuesta rápida</li>
                  <li>• Diagnóstico remoto</li>
                  <li>• Reparación urgente</li>
                  <li>• Seguimiento post-reparación</li>
                </ul>
              </div>

              {/* Capacitación */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-[#ff6b35] mb-4">Capacitación</h2>
                <p className="text-gray-600 mb-4">
                  Programas de capacitación para operadores y personal técnico en el uso, 
                  mantenimiento y seguridad de la maquinaria.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Capacitación operativa</li>
                  <li>• Mantenimiento básico</li>
                  <li>• Seguridad industrial</li>
                  <li>• Certificaciones</li>
                  <li>• Material didáctico</li>
                </ul>
              </div>
            </div>

            {/* Cobertura Nacional */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">
                Cobertura Nacional
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Contamos con técnicos certificados en todo el país para brindarte un servicio 
                rápido y eficiente donde sea que te encuentres.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#ff6b35]">BUENOS AIRES</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#ff6b35]">CÓRDOBA</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#ff6b35]">SANTA FE</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#ff6b35]">MENDOZA</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#ff6b35]">ENTRE RÍOS</span>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#ff6b35]">TUCUMÁN</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Necesitas Servicio Técnico?
              </h3>
              <p className="text-white mb-6">
                Contáctanos y te responderemos en menos de 2 horas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#ff6b35] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Solicitar Servicio
                </button>
                <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Emergencias 24/7
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
