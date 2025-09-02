import { useState, useEffect } from 'react';
import Image from 'next/image';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Fallback para imágenes que fallan
  const handleError = () => {
    setError(true);
  };

  // Manejar carga exitosa
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Si hay error, mostrar placeholder
  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Imagen no disponible</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
      
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

// Componente específico para el logo optimizado con fallbacks automáticos
export function OptimizedLogo({ className = '', priority = true }) {
  return (
    <picture>
      {/* AVIF para navegadores modernos (mejor compresión) */}
      <source 
        srcSet="/Assets/logo.avif" 
        type="image/avif"
      />
      {/* WebP para navegadores compatibles */}
      <source 
        srcSet="/Assets/logo.webp" 
        type="image/webp"
      />
      {/* PNG optimizado como fallback */}
      <OptimizedImage
        src="/Assets/logo_optimized.png"
        alt="JCP Logo"
        width={180}
        height={180}
        className={className}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </picture>
  );
}

// Componente Picture con fallbacks automáticos para cualquier imagen
export function PictureWithFallbacks({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  ...props
}) {
  // Extraer nombre del archivo sin extensión
  const baseName = src.replace(/\.[^/.]+$/, '');
  const extension = src.split('.').pop().toLowerCase();
  
  // Solo aplicar fallbacks si es una imagen PNG o JPG
  if (!['png', 'jpg', 'jpeg'].includes(extension)) {
    return (
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...props}
      />
    );
  }

  return (
    <picture>
      {/* AVIF para navegadores modernos */}
      <source 
        srcSet={`${baseName}.avif`} 
        type="image/avif"
      />
      {/* WebP para navegadores compatibles */}
      <source 
        srcSet={`${baseName}.webp`} 
        type="image/webp"
      />
      {/* Imagen original como fallback */}
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...props}
      />
    </picture>
  );
}
