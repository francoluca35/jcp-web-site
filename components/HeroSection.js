import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroSection() {
  // Array de imágenes para desktop - fácil de expandir agregando más rutas aquí
  const images = [
    "/Assets/home.png",
    "/Assets/home2.png",
    "/Assets/home3.png",
    // "/Assets/home4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cambiar imagen automáticamente cada 5 segundos solo en desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section 
      id="inicio" 
      className="relative -mt-2 min-h-screen flex items-center justify-center overflow-hidden lg:bg-[#1a1a1a]"
    >
      {/* Imagen para móvil y tablet - visible solo hasta lg (1024px) */}
      <div 
        className="absolute inset-0 w-full h-screen lg:hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/Assets/home-mobile.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />

      {/* Carrusel de imágenes para desktop - visible solo desde lg (1024px) */}
      <div className="absolute inset-0 w-full h-screen hidden lg:block">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Fondo maquinarias industriales ${index + 1}`}
            className={`absolute inset-0 w-full h-screen object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/70 lg:bg-black/40"></div>

      {/* Contenido centrado */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-black/55 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none rounded-2xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Título principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
          <span className="text-white drop-shadow-lg block mb-2">Fabricación de Máquinas</span>
          <span className="block">
            <span className="text-white drop-shadow-lg">& </span>
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent drop-shadow-lg">Repuestos para Panadería</span>
          </span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-base sm:text-xl md:text-2xl text-white/95 mb-6 sm:mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto font-medium">
          Más de 50 años dedicados a la fabricación de máquinas y repuestos para panaderías argentinas.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-bold px-8 py-4 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 text-lg"
            onClick={() => window.location.href = '/catalog'}
          >
            VER CATÁLOGO
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
         
        </div>
        </div>
      </div>
    </section>
  );
}