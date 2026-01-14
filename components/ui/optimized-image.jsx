import React from 'react';
import { useLazyLoading } from './use-lazy-loading';

export function OptimizedImage({
  src,
  alt,
  className = '',
  style = {},
  loading = 'lazy',
  priority = false,
  sizes = '100vw',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==',
  blurDataURL,
  ...props
}) {
  const { ref, isVisible, isLoaded } = useLazyLoading({
    threshold: priority ? 0 : 0.1,
    rootMargin: priority ? '0px' : '50px 0px',
    fallbackDelay: priority ? 0 : 100,
  });

  // Filtrar props válidas para elementos img
  const validImgProps = Object.keys(props).reduce((acc, key) => {
    // Solo incluir props que son válidas para elementos img
    const validProps = ['width', 'height', 'onLoad', 'onError', 'onClick', 'onMouseEnter', 'onMouseLeave'];
    if (validProps.includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});

  // Si es prioritario, cargar inmediatamente
  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading="eager"
        decoding="sync"
        {...validImgProps}
      />
    );
  }

  // Si no está visible, mostrar placeholder
  if (!isVisible) {
    return (
      <div
        ref={ref}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={style}
        aria-label={alt}
      />
    );
  }

  // Si está visible pero no cargado, mostrar placeholder con imagen
  if (!isLoaded) {
    return (
      <div
        ref={ref}
        className={`relative ${className}`}
        style={style}
      >
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          aria-hidden="true"
        />
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
          loading={loading}
          decoding="async"
          onLoad={(e) => {
            e.target.style.opacity = '1';
          }}
          {...validImgProps}
        />
      </div>
    );
  }

  // Imagen completamente cargada
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      sizes={sizes}
      {...validImgProps}
    />
  );
}

// Componente específico para el logo optimizado con fallbacks automáticos
export function OptimizedLogo({ className = '', priority = true }) {
  return (
    <picture>
      {/* AVIF para navegadores modernos (mejor compresión) */}
      <source 
        srcSet="/Assets/logojcp.png" 
        type="image/avif"
      />
      {/* WebP para navegadores compatibles */}
      <source 
        srcSet="/Assets/logojcp.png" 
        type="image/webp"
      />
      {/* PNG optimizado como fallback */}
      <OptimizedImage
        src="/Assets/logojcp2.png"
        alt="JCP Logo"
        width={180}
        height={53}
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
