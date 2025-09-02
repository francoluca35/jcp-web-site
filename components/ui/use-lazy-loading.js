import { useState, useEffect, useRef } from 'react';

export function useLazyLoading(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);
  
  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
    delay = 0
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Aplicar delay si se especifica
          if (delay > 0) {
            setTimeout(() => {
              setIsLoaded(true);
            }, delay);
          } else {
            setIsLoaded(true);
          }
          
          // Desconectar observer si solo queremos que se ejecute una vez
          if (once) {
            observer.disconnect();
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, delay]);

  return {
    elementRef,
    isVisible,
    isLoaded,
    shouldLoad: isVisible || isLoaded
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
