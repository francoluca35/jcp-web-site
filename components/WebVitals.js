import { useEffect } from 'react';

// Función para reportar métricas de Core Web Vitals
const reportWebVitals = (metric) => {
  // En desarrollo, solo loguear
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
    return;
  }

  // En producción, enviar a Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // También enviar a un endpoint personalizado si existe
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).catch(console.error);
  }
};

// Implementación básica de Web Vitals sin dependencias externas
const getCLS = (onPerfEntry) => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            onPerfEntry({
              name: 'CLS',
              value: entry.value,
              id: entry.id,
              delta: entry.value,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement failed:', e);
    }
  }
};

const getFID = (onPerfEntry) => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          onPerfEntry({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            id: entry.id,
            delta: entry.processingStart - entry.startTime,
          });
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement failed:', e);
    }
  }
};

const getFCP = (onPerfEntry) => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            onPerfEntry({
              name: 'FCP',
              value: entry.startTime,
              id: entry.id,
              delta: entry.startTime,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('FCP measurement failed:', e);
    }
  }
};

const getLCP = (onPerfEntry) => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        onPerfEntry({
          name: 'LCP',
          value: lastEntry.startTime,
          id: lastEntry.id,
          delta: lastEntry.startTime,
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement failed:', e);
    }
  }
};

const getTTFB = (onPerfEntry) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        onPerfEntry({
          name: 'TTFB',
          value: navigationEntry.responseStart - navigationEntry.requestStart,
          id: 'ttfb',
          delta: navigationEntry.responseStart - navigationEntry.requestStart,
        });
      }
    } catch (e) {
      console.warn('TTFB measurement failed:', e);
    }
  }
};

// Hook para monitorear Core Web Vitals
export const useWebVitals = () => {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Usar implementación básica
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  }, []);
};

// Componente para monitorear rendimiento
const WebVitals = () => {
  useWebVitals();
  return null;
};

export default WebVitals;
