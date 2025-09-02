import Head from 'next/head'
import { Header } from "../components/Header"
import { HeroSection } from "../components/HeroSection"
import { AboutSection } from "../components/AboutSection"
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

  // Detectar scroll para mostrar/ocultar botón de ir arriba
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
  
  return (
    <>
      <Head>
        <title>JCP Maquinarias - Maquinaria Industrial para Panaderías</title>
        <meta name="description" content="Líderes en maquinaria industrial para panaderías. Hornos, amasadoras, repuestos y servicio técnico 24/7. Más de 20 años de experiencia." />
        <meta name="keywords" content="maquinaria panadería, hornos industriales, amasadoras, repuestos panadería, servicio técnico, JCP maquinarias" />
        <meta name="author" content="JCP Maquinarias" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="es" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph */}
        <meta property="og:title" content="JCP Maquinarias - Maquinaria Industrial para Panaderías" />
        <meta property="og:description" content="Líderes en maquinaria industrial para panaderías. Hornos, amasadoras, repuestos y servicio técnico 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maquinariasjcp.netlify.app" />
        <meta property="og:image" content="https://maquinariasjcp.netlify.app/Assets/logo.png" />
        <meta property="og:site_name" content="JCP Maquinarias" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JCP Maquinarias - Maquinaria Industrial" />
        <meta name="twitter:description" content="Líderes en maquinaria industrial para panaderías" />
        <meta name="twitter:image" content="https://maquinariasjcp.netlify.app/Assets/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://maquinariasjcp.netlify.app" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/Assets/logo.png" as="image" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]" lang="es">
        <Header />
        <main role="main">
          <HeroSection />
          <AboutSection />
          <ModernCatalog />
          <PartsAndServicesSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingBar />
        
        {/* Botón Ir hacia arriba */}
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-0 right-4 bg-orange-600 hover:bg-[#1a1a1a] text-white rounded-md w-8 h-8 md:w-10 md:h-10 shadow-lg transition-all duration-300 z-40 flex items-center justify-center"
            size="sm"
            aria-label="Ir hacia arriba"
            title="Ir hacia arriba"
          >
            <ArrowUp className="h-4 w-4 md:h-8 md:w-8" />
          </Button>
        )}
      </div>
    </>
  )
} 