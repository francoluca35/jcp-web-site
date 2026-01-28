import Head from 'next/head'
import { Header } from "../components/Header"
import { HeroSection } from "../components/HeroSection"
import { AboutSection } from "../components/AboutSection"
import { HistoryGallery } from "../components/HistoryGallery"
import { ModernCatalog } from "../components/ModernCatalog"
import { PartsAndServicesSection } from "../components/PartsAndServicesSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import { FloatingBar } from "../components/FloatingBar"
import { Button } from "../components/ui/button"
import { ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detectar scroll para mostrar/ocultar botón de ir arriba solo al final de la página
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Mostrar el botón cuando esté a menos de 300px del final de la página
      const threshold = 300;
      const isNearBottom = scrollTop + windowHeight >= documentHeight - threshold;
      
      setShowScrollTop(isNearBottom);
    };

    // Verificar también al cargar la página
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <Head>
        <title>Amasadoras Industriales Argentina | Hornos Panadería | JCP Maquinarias</title>
        <meta name="description" content="Líderes en amasadoras industriales, hornos rotativos y maquinaria para panaderías en Argentina. Más de 20 años de experiencia. Asesoramiento especializado y repuestos originales garantizados." />
        <meta name="keywords" content="amasadora industrial argentina, hornos rotativos panadería, maquinaria panadería argentina, amasadoras 50 kg, hornos convector industriales, sobadoras martino, repuestos amasadoras, combos equipamiento panadería, guía compra amasadora industrial" />
        <meta name="author" content="JCP Maquinarias" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="es-AR" />
        <meta name="geo.region" content="AR" />
        <meta name="geo.placename" content="Argentina" />
        <meta name="revisit-after" content="3 days" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Amasadoras Industriales Argentina | Hornos Panadería | JCP Maquinarias" />
        <meta property="og:description" content="Líderes en amasadoras industriales, hornos rotativos y maquinaria para panaderías en Argentina. Asesoramiento especializado y repuestos originales garantizados." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app" />
        <meta property="og:image" content="https://maquinariasjcp.netlify.app/Assets/logojcp.png" />
        <meta property="og:site_name" content="JCP Maquinarias" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amasadoras Industriales Argentina | JCP Maquinarias" />
        <meta name="twitter:description" content="Líderes en maquinaria industrial para panaderías. Amasadoras, hornos rotativos y repuestos originales." />
        <meta name="twitter:image" content="https://maquinariasjcp.netlify.app/Assets/logojcp.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/Assets/logojcp.png" as="image" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JCP Maquinarias",
              "description": "Líderes en maquinaria industrial para panaderías en Argentina. Amasadoras, hornos rotativos, sobadoras y repuestos originales.",
              "url": "https://maquinariasjcp.netlify.app",
              "logo": "https://maquinariasjcp.netlify.app/Assets/logojcp.png",
              "telephone": "+54 11 6396 2947",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AR",
                "addressRegion": "Buenos Aires"
              },
              "sameAs": [],
              "foundingDate": "2004",
              "numberOfEmployees": "10-50",
              "industry": "Maquinaria Industrial",
              "knowsAbout": [
                "Amasadoras Industriales",
                "Hornos Rotativos",
                "Sobadoras",
                "Maquinaria Panadería",
                "Repuestos Originales"
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JCP Maquinarias",
              "url": "https://maquinariasjcp.netlify.app",
              "description": "Catálogo completo de maquinaria industrial para panaderías en Argentina",
              "publisher": {
                "@type": "Organization",
                "name": "JCP Maquinarias"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://maquinariasjcp.netlify.app/catalog?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <Header />
        <main role="main">
          <HeroSection />
          <AboutSection />
          <HistoryGallery />
            <ModernCatalog />
          <PartsAndServicesSection />
        
          <ContactSection />
        </main>
        <Footer />
        <FloatingBar />
        
        {/* Botón Ir hacia arriba - solo aparece al final de la página */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-0 left-4 bg-orange-600 hover:bg-[#1a1a1a] text-white rounded-md w-10 h-10 md:w-12 md:h-12 shadow-lg transition-all duration-300 z-40 flex items-center justify-center"
            size="sm"
            aria-label="Ir hacia arriba"
            title="Ir hacia arriba"
          >
            <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        )}
      </div>
    </>
  )
} 