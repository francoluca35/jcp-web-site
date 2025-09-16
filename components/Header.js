import { useState, useEffect } from "react";
// import { Button } from "./ui/button.jsx";
import { Phone, Mail, Menu, X, ChevronDown, LogIn } from "lucide-react";
import { useRouter } from "next/router";
import { OptimizedLogo } from "./ui/optimized-image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hover events for menu
  const handleMenuHover = () => {
    setIsMenuOpen(true);
  };

  const handleMenuLeave = () => {
    setIsMenuOpen(false);
  };

  // Handle dropdown hover
  const handleDropdownHover = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  // Handle navigation click - CORREGIDO
  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    
    // Mapeo de nombres de sección a IDs reales (maneja acentos y caracteres especiales)
    const sectionMap = {
      'inicio': 'inicio',
      'nosotros': 'nosotros',
      'maquinas': 'maquinas',
      'máquinas': 'maquinas', // Con tilde
      'repuestos': 'repuestos',
      'contacto': 'contacto'
    };
    
    const actualSectionId = sectionMap[sectionId] || sectionId;
    
    // Smooth scroll to section with offset for fixed header
    const element = document.getElementById(actualSectionId);
    if (element) {
      const headerHeight = 80; // Altura del header fijo
      const elementPosition = element.offsetTop - headerHeight;
      
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      console.error(`Sección ${actualSectionId} no encontrada. Elementos disponibles:`, 
        Array.from(document.querySelectorAll('section[id]')).map(s => s.id)
      );
    }
  };

  // Check if we're on a specific page
  const isSpecificPage = router.pathname !== '/' && router.pathname !== '/index';

  // Navigation items for specific pages
  const specificPageNavItems = [
    { href: '/', label: 'Inicio' },
    { href: '/blog', label: 'Blog' },
    { href: '/catalog', label: 'Catálogo' },
    { href: '/maquinaria', label: 'Maquinaria' }
  ];

  // Navigation items for landing page
  const landingPageNavItems = [
    { href: '/', label: 'Inicio', isAnchor: true },
    { href: '#nosotros', label: 'Nosotros', isAnchor: true },
    { href: '#maquinas', label: 'Máquinas', isAnchor: true },
    { href: '#repuestos', label: 'Repuestos', isAnchor: true },
    { href: '#contacto', label: 'Contacto', isAnchor: true }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1a1a1a] shadow-2xl' 
          : 'bg-[#1a1a1a] shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => {
                  if (isSpecificPage) {
                    router.push('/');
                  } else {
                    window.scrollTo({ 
                      top: 0, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <OptimizedLogo className="mr-3" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8" role="navigation" aria-label="Navegación principal">
              {isSpecificPage ? (
                // Navigation for specific pages
                specificPageNavItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className={`transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 pb-1 transform hover:scale-105 ${
                      router.pathname === item.href
                        ? 'text-[#ff6b35] border-[#ff6b35]'
                        : 'text-white hover:text-[#ff6b35] border-transparent hover:border-[#ff6b35]'
                    }`}
                    aria-label={`Ir a ${item.label}`}
                  >
                    {item.label}
                  </a>
                ))
              ) : (
                // Navigation for landing page
                <>
                  {landingPageNavItems.map((item, index) => (
                    <a 
                      key={index}
                      href={item.href} 
                      className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1 transform hover:scale-105"
                      aria-label={`Ir a la sección de ${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </a>
                  ))}
                  
                  {/* Dropdown Menu for landing page */}
                  <div 
                    className="relative"
                    onMouseEnter={handleDropdownHover}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button 
                      className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1 transform hover:scale-105 flex items-center space-x-1"
                      aria-label="Ver más opciones"
                    >
                      <span>Ver Más</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Content */}
                    <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="py-2">
                        <a 
                          href="/maquinaria" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff6b35] hover:text-white transition-colors"
                        >
                          Catálogo Maquinaria
                        </a>
                        <a 
                          href="/catalog" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff6b35] hover:text-white transition-colors"
                        >
                          Catálogo Completo
                        </a>
                        <a 
                          href="/blog" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff6b35] hover:text-white transition-colors"
                        >
                          Blog Técnico
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </nav>

            {/* Desktop Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
             
              <button 
                className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                onClick={() => window.location.href = '/catalog'}
                aria-label="Ver catálogo completo de productos"
              >
                Ver Catalogo
              </button>
              {/* Login Icon */}
              <button 
                className="text-white hover:text-[#ff6b35] hover:bg-[#ff6b35]/10 p-2 rounded-lg transition-all duration-200"
                onClick={() => router.push('/admin/login')}
                aria-label="Iniciar sesión"
              >
                <LogIn className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div 
              className="lg:hidden relative"
              onMouseEnter={handleMenuHover}
              onMouseLeave={handleMenuLeave}
            >
              <button 
                className="text-white hover:bg-[#ff6b35]/20 p-2 rounded-lg transition-all duration-200"
                aria-label="Abrir menú de navegación"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`mobile-menu absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onMouseEnter={handleMenuHover}
          onMouseLeave={handleMenuLeave}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#ff6b35]/10">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  if (isSpecificPage) {
                    router.push('/');
                  } else {
                    window.scrollTo({ 
                      top: 0, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <OptimizedLogo className="mr-3" />
                <span className="text-white font-bold text-lg">JCP</span>
              </button>
              <button 
                className="text-white hover:bg-[#ff6b35]/20 p-2 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-6 py-8" role="navigation" aria-label="Navegación móvil">
              <div className="space-y-6">
                {isSpecificPage ? (
                  // Mobile navigation for specific pages
                  specificPageNavItems.map((item, index) => (
                    <a 
                      key={index}
                      href={item.href}
                      className={`block w-full text-left transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 pl-4 py-3 transform hover:translate-x-2 ${
                        router.pathname === item.href
                          ? 'text-[#ff6b35] border-[#ff6b35]'
                          : 'text-white hover:text-[#ff6b35] border-transparent hover:border-[#ff6b35]'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-label={`Ir a ${item.label}`}
                    >
                      {item.label}
                    </a>
                  ))
                ) : (
                  // Mobile navigation for landing page
                  <>
                    {landingPageNavItems.map((item, index) => (
                      <button 
                        key={index}
                        onClick={() => handleNavClick(item.label.toLowerCase())}
                        className="block w-full text-left text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-3 transform hover:translate-x-2"
                        aria-label={`Ir a la sección de ${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </button>
                    ))}
                    
                    {/* Mobile Dropdown for landing page */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full text-left text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-3 transform hover:translate-x-2 flex items-center justify-between"
                        aria-label="Ver más opciones"
                      >
                        <span>Ver Más</span>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Mobile Dropdown Content */}
                      <div className={`space-y-2 ml-4 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <a 
                          href="/maquinaria" 
                          className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium tracking-wide text-base border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-2 transform hover:translate-x-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Catálogo Maquinaria
                        </a>
                        <a 
                          href="/catalog" 
                          className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium tracking-wide text-base border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-2 transform hover:translate-x-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Catálogo Completo
                        </a>
                        <a 
                          href="/blog" 
                          className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium tracking-wide text-base border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-2 transform hover:translate-x-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Blog Técnico
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Contact Info & CTA */}
            <div className="p-6 border-t border-[#ff6b35]/10 space-y-4">
              
              <button 
                className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = '/catalog';
                }}
              >
                Ver Catalogo
              </button>
              {/* Mobile Login Button */}
              <button 
                className="w-full text-white hover:text-[#ff6b35] hover:bg-[#ff6b35]/10 font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/admin/login');
                }}
              >
                <LogIn className="h-5 w-5" />
                <span>Iniciar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}