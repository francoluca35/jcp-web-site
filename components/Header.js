import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Phone, Mail, Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
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

  // Handle navigation click
  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
                   window.scrollTo({ 
                     top: 0, 
                     behavior: 'smooth' 
                   });
                 }}
                 className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
               >
                 <img 
                   src="Assets/logo.png" 
                   alt="JCP Logo" 
                   className="h-8 lg:h-10 w-auto mr-3"
                 />
               </button>
             </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a 
                href="#inicio" 
                className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1 transform hover:scale-105"
              >
                Inicio
              </a>
              <a 
                href="#maquinas" 
                className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1 transform hover:scale-105"
              >
                Máquinas
              </a>
              <a 
                href="#repuestos" 
                className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1 transform hover:scale-105"
              >
                Repuestos
              </a>
              <a 
                href="#contacto" 
                className="text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-sm border-b-2 border-transparent hover:border-[#ff6b35] pb-1 transform hover:scale-105"
              >
                Contacto
              </a>
            </nav>

            {/* Desktop Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-[#adb5bd]">
                <Phone className="h-4 w-4 text-[#ffd23f]" />
                <span className="font-medium">+54 11 6396 2947</span>
              </div>
              <Button 
                className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                onClick={() => window.location.href = '/catalog'}
              >
                Ver Catalogo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div 
              className="lg:hidden relative"
              onMouseEnter={handleMenuHover}
              onMouseLeave={handleMenuLeave}
            >
              <Button 
                variant="ghost" 
                className="text-white hover:bg-[#ff6b35]/20 p-2 rounded-lg transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
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
          className={`mobile-menu absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onMouseEnter={handleMenuHover}
          onMouseLeave={handleMenuLeave}
        >
          <div className="flex flex-col h-full">
                         {/* Menu Header */}
             <div className="flex items-center justify-between p-6 border-b border-[#ff6b35]/10">
               <button 
                 onClick={() => {
                   setIsMenuOpen(false);
                   window.scrollTo({ 
                     top: 0, 
                     behavior: 'smooth' 
                   });
                 }}
                 className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
               >
                 <img 
                   src="Assets/logo.png" 
                   alt="JCP Logo" 
                   className="h-8 w-auto mr-3"
                 />
                 <span className="text-white font-bold text-lg">JCP</span>
               </button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-[#ff6b35]/20 p-2 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-6">
                                 <button 
                   onClick={() => handleNavClick('inicio')}
                   className="block w-full text-left text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-3 transform hover:translate-x-2"
                 >
                   Inicio
                 </button>
                 <button 
                   onClick={() => handleNavClick('maquinas')}
                   className="block w-full text-left text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-3 transform hover:translate-x-2"
                 >
                   Máquinas
                 </button>
                 <button 
                   onClick={() => handleNavClick('repuestos')}
                   className="block w-full text-left text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-3 transform hover:translate-x-2"
                 >
                   Repuestos
                 </button>
                 <button 
                   onClick={() => handleNavClick('contacto')}
                   className="block w-full text-left text-white hover:text-[#ff6b35] transition-all duration-300 font-medium uppercase tracking-wide text-lg border-l-4 border-transparent hover:border-[#ff6b35] pl-4 py-3 transform hover:translate-x-2"
                 >
                   Contacto
                 </button>
              </div>
            </nav>

                         {/* Mobile Contact Info & CTA */}
             <div className="p-6 border-t border-[#ff6b35]/10 space-y-4">
              <div className="flex items-center space-x-3 text-[#adb5bd]">
                <Phone className="h-5 w-5 text-[#ffd23f]" />
                <span className="font-medium">+54 11 6396 2947</span>
              </div>
                             <Button 
                 className="w-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-0"
                 onClick={() => {
                   setIsMenuOpen(false);
                   window.location.href = '/catalog';
                 }}
               >
                 Ver Catalogo
               </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}