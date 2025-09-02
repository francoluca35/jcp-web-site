import { useState, useEffect, useRef, useCallback } from 'react';

export function useLazyLoading(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px 0px',
    fallbackDelay = 100,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Desconectar el observer una vez que el elemento es visible
        if (elementRef.current) {
          observer.current?.unobserve(elementRef.current);
        }
      }
    });
  }, []);

  const observer = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.current.observe(elementRef.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  // Simular delay para evitar parpadeo
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, fallbackDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, fallbackDelay]);

  const ref = useCallback((node) => {
    if (node) {
      elementRef.current = node;
    }
  }, []);

  return {
    ref,
    isVisible,
    isLoaded,
  };
}

// Hook específico para imágenes
export function useImageLazyLoading(options = {}) {
  const [imageState, setImageState] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const { threshold = 0.1, rootMargin = '100px' } = options;
  
  const { elementRef, shouldLoad } = useLazyLoading({
    threshold,
    rootMargin,
    once: true
  });

  const handleImageLoad = () => {
    setImageState('loaded');
  };

  const handleImageError = () => {
    setImageState('error');
  };

  return {
    elementRef,
    shouldLoad,
    imageState,
    handleImageLoad,
    handleImageError,
    isLoading: imageState === 'loading',
    isLoaded: imageState === 'loaded',
    hasError: imageState === 'error'
  };
}

// Hook para lazy loading de componentes
export function useComponentLazyLoading(options = {}) {
  const { threshold = 0.1, rootMargin = '50px', delay = 100 } = options;
  
  const { elementRef, shouldLoad } = useLazyLoading({
    threshold,
    rootMargin,
    once: true,
    delay
  });

  return {
    elementRef,
    shouldLoad
  };
}

// Hook para lazy loading de videos
export function useVideoLazyLoading(options = {}) {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  
  const { elementRef, shouldLoad } = useLazyLoading({
    threshold,
    rootMargin,
    once: true
  });

  const [videoState, setVideoState] = useState('waiting'); // 'waiting' | 'loading' | 'playing' | 'error'

  const handleVideoLoad = () => {
    setVideoState('loading');
  };

  const handleVideoCanPlay = () => {
    setVideoState('playing');
  };

  const handleVideoError = () => {
    setVideoState('error');
  };

  return {
    elementRef,
    shouldLoad,
    videoState,
    handleVideoLoad,
    handleVideoCanPlay,
    handleVideoError,
    isWaiting: videoState === 'waiting',
    isLoading: videoState === 'loading',
    isPlaying: videoState === 'playing',
    hasError: videoState === 'error'
  };
}
