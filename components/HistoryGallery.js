import React, { useState } from 'react';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X, Camera } from "lucide-react";

export function HistoryGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Array de imágenes de la historia - puedes agregar más imágenes aquí
  const images = [
    { src: "/Assets/galpon.jpeg", alt: "Fabricación de maquinarias" },
    { src: "/Assets/about.jpg", alt: "Equipo de trabajo JCP" },
    { src: "/Assets/home2.png", alt: "Maquinaria en producción" },
    { src: "/Assets/home3.png", alt: "Taller de fabricación" },
    { src: "/Assets/maquina.jpeg", alt: "Maquinaria en producción" },
    { src: "/Assets/maquina2.jpeg", alt: "Taller de fabricación" },
    { src: "/Assets/maquina3.jpeg", alt: "Taller de fabricación" },
    { src: "/Assets/maquina4.jpeg", alt: "Taller de fabricación" },
    { src: "/Assets/maquinarias/amasadora.jpg", alt: "Amasadora industrial" },
    { src: "/Assets/maquinarias/horno-rotativo.png", alt: "Horno rotativo industrial" },
    { src: "/Assets/maquinarias/Mazcladora.jpg", alt: "Mezcladora industrial" },
    { src: "/Assets/maquinarias/sobadora.jpg", alt: "Sobadora industrial" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.29 PM (1).jpeg", alt: "Maquinaria industrial en taller" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.29 PM (2).jpeg", alt: "Maquinaria industrial en producción" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.29 PM.jpeg", alt: "Detalle de maquinaria industrial" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.31 PM.jpeg", alt: "Maquinaria en línea de producción" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.38 PM (1).jpeg", alt: "Maquinaria industrial en planta" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.38 PM (2).jpeg", alt: "Equipamiento industrial en planta" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.38 PM (3).jpeg", alt: "Maquinaria industrial instalada" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.38 PM.jpeg", alt: "Maquinaria industrial en uso" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.41 PM.jpeg", alt: "Maquinaria industrial en taller" },
    { src: "/Assets/maquinarias/WhatsApp Image 2026-01-10 at 6.14.44 PM.jpeg", alt: "Maquinaria industrial en showroom" },
    { src: "/Assets/repuesto.jpeg", alt: "Maquinaria industrial en showroom" },
    { src: "/Assets/1.jpeg", alt: "Maquinaria industrial en showroom" },
    { src: "/Assets/2.jpeg", alt: "Maquinaria industrial en showroom" }
  ];

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const visibleImages = showAll ? images : images.slice(0, 8);

  return (
    <section id="historia" className="py-16 lg:py-20 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffd23f] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ff6b35]/10 to-[#ffd23f]/10 rounded-full px-6 py-3 mb-6 border border-[#ff6b35]/20">
            <Camera className="h-5 w-5 text-[#ff6b35] mr-2" />
            <span className="text-[#1a1a1a] font-bold uppercase tracking-wide">Galería</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#1a1a1a] mb-4">
            Un Poco de Nuestra
            <span className="block bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] bg-clip-text text-transparent">Historia</span>
          </h2>
        </div>

        {/* Grid Uniforme - 4 columnas, 2 filas */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] aspect-square"
              onClick={() => openImage(image)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        {images.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] hover:from-[#ff5722] hover:to-[#ffcc02] text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              aria-label={showAll ? "Ver menos fotos" : "Ver más fotos"}
            >
              {showAll ? "Ver menos fotos" : "Ver más fotos"}
            </button>
          </div>
        )}
      </div>

      {/* Modal de imagen ampliada */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[1000000] flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-[#ff6b35] transition-colors duration-200 z-10 bg-black/50 rounded-full p-2"
            aria-label="Cerrar imagen"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="max-w-7xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
