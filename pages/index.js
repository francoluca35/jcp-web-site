import Head from 'next/head'
import { Header } from "../components/Header"
import { HeroSection } from "../components/HeroSection"
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
        <title>PanIndustrial - Maquinaria Industrial para Panaderías</title>
        <meta name="description" content="Líderes en maquinaria industrial para panaderías. Hornos, amasadoras, repuestos y servicio técnico 24/7. Más de 20 años de experiencia." />
        <meta name="keywords" content="maquinaria panadería, hornos industriales, amasadoras, repuestos panadería, servicio técnico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-[#f8f9fa]">
        <Header />
        <main>
          <HeroSection />
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
          >
            <ArrowUp className="h-4 w-4 md:h-8 md:w-8" />
          </Button>
        )}
      </div>
    </>
  )
} 