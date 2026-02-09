import SEOHead from '../components/SEOHead'
import { seoConfig } from '../seo-config'
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
      <SEOHead
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        canonicalUrl={seoConfig.company.url}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": seoConfig.pages.home.title,
          "description": seoConfig.pages.home.description,
          "url": seoConfig.company.url
        }}
      />
      
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