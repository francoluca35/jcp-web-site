import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./ui/button";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ImageGallery({ images, productName, mainImageIndex = 0 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(mainImageIndex);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(mainImageIndex);

  // Memoize images array to prevent unnecessary re-renders
  const memoizedImages = useMemo(() => images || [], [images]);

  // Update current image index when mainImageIndex changes
  useEffect(() => {
    setCurrentImageIndex(mainImageIndex);
    setModalImageIndex(mainImageIndex);
  }, [mainImageIndex]);

  // Auto-rotate images every 5 seconds - optimized with useCallback
  useEffect(() => {
    if (memoizedImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % memoizedImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [memoizedImages.length]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % memoizedImages.length);
  }, [memoizedImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + memoizedImages.length) % memoizedImages.length);
  }, [memoizedImages.length]);

  const openModal = useCallback(() => {
    setModalImageIndex(currentImageIndex);
    setIsModalOpen(true);
  }, [currentImageIndex]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const nextModalImage = useCallback(() => {
    setModalImageIndex((prev) => (prev + 1) % memoizedImages.length);
  }, [memoizedImages.length]);

  const prevModalImage = useCallback(() => {
    setModalImageIndex((prev) => (prev - 1 + memoizedImages.length) % memoizedImages.length);
  }, [memoizedImages.length]);

  // Handle keyboard navigation - optimized with useCallback
  const handleKeyDown = useCallback((e) => {
    if (!isModalOpen) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextModalImage();
    } else if (e.key === 'ArrowLeft') {
      prevModalImage();
    }
  }, [isModalOpen, closeModal, nextModalImage, prevModalImage]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!memoizedImages || memoizedImages.length === 0) {
    return (
      <div className="relative aspect-[4/3] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Sin imagen</p>
      </div>
    );
  }

  return (
    <>
      {/* Carrusel de imágenes */}
      <div className="relative aspect-[4/3] overflow-hidden group">
        <ImageWithFallback
          src={memoizedImages[currentImageIndex]}
          alt={`${productName} - Imagen ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
          aria-live="polite"
        />
        
        {/* Overlay con botón de galería */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            onClick={openModal}
            className="opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 transition-all duration-300"
            size="sm"
            aria-label={`Abrir galería de imágenes de ${productName}`}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicadores de imagen */}
        {memoizedImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {memoizedImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Ver imagen ${index + 1} de ${memoizedImages.length}`}
              />
            ))}
          </div>
        )}

        {/* Botones de navegación */}
        {memoizedImages.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
              size="sm"
              aria-label="Ver imagen anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
              size="sm"
              aria-label="Ver siguiente imagen"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Modal de galería */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de imágenes de ${productName}`}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            {/* Botón cerrar */}
            <Button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
              size="sm"
              aria-label="Cerrar galería"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Imagen principal */}
            <div className="relative">
              <ImageWithFallback
                src={memoizedImages[modalImageIndex]}
                alt={`${productName} - Imagen ${modalImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
                loading="eager"
              />
            </div>

            {/* Botones de navegación del modal */}
            {memoizedImages.length > 1 && (
              <>
                <Button
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  size="sm"
                  aria-label="Ver imagen anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  size="sm"
                  aria-label="Ver siguiente imagen"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Contador de imágenes */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {modalImageIndex + 1} / {memoizedImages.length}
            </div>

            {/* Miniaturas */}
            {memoizedImages.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {memoizedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`w-12 h-12 rounded overflow-hidden border-2 transition-all duration-300 ${
                      index === modalImageIndex
                        ? "border-white"
                        : "border-white/30 hover:border-white/60"
                    }`}
                    aria-label={`Ver miniatura ${index + 1} de ${memoizedImages.length}`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
