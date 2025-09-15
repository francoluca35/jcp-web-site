// Configuración de optimización de rendimiento y Core Web Vitals
export const performanceConfig = {
  // Objetivos de Core Web Vitals
  coreWebVitals: {
    LCP: 2.5, // Largest Contentful Paint (segundos)
    FID: 100, // First Input Delay (milisegundos)
    CLS: 0.1, // Cumulative Layout Shift
    FCP: 1.8, // First Contentful Paint (segundos)
    TTFB: 600, // Time to First Byte (milisegundos)
    INP: 200 // Interaction to Next Paint (milisegundos)
  },

  // Configuración de imágenes
  imageOptimization: {
    formats: ['webp', 'avif'],
    quality: 85,
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    placeholder: 'blur',
    loading: 'lazy'
  },

  // Recursos críticos para preload
  criticalResources: [
    {
      href: '/Assets/logo.png',
      as: 'image',
      type: 'image/png'
    },
    {
      href: '/Assets/logo.webp',
      as: 'image',
      type: 'image/webp'
    },
    {
      href: '/data/modernProducts.json',
      as: 'fetch',
      crossOrigin: 'anonymous'
    },
    {
      href: '/data/productCatalog.json',
      as: 'fetch',
      crossOrigin: 'anonymous'
    }
  ],

  // Configuración de caché
  cacheConfig: {
    static: {
      maxAge: 31536000, // 1 año
      immutable: true
    },
    dynamic: {
      maxAge: 86400, // 1 día
      sMaxAge: 86400
    },
    api: {
      maxAge: 300, // 5 minutos
      sMaxAge: 300
    }
  },

  // Configuración de compresión
  compression: {
    gzip: true,
    brotli: true,
    minify: {
      html: true,
      css: true,
      js: true
    }
  },

  // Configuración de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: '50px',
    placeholder: true
  },

  // Configuración de service worker
  serviceWorker: {
    enabled: true,
    cacheFirst: [
      '/Assets/',
      '/data/',
      '/Document/'
    ],
    networkFirst: [
      '/api/',
      '/catalog',
      '/blog'
    ]
  },

  // Configuración de bundle splitting
  bundleSplitting: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all'
    },
    common: {
      name: 'common',
      minChunks: 2,
      chunks: 'all'
    }
  },

  // Configuración de preconnect
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ],

  // Configuración de DNS prefetch
  dnsPrefetch: [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//www.google-analytics.com',
    '//www.googletagmanager.com'
  ],

  // Configuración de resource hints
  resourceHints: {
    preload: [
      '/Assets/logo.png',
      '/Assets/logo.webp'
    ],
    prefetch: [
      '/catalog',
      '/blog'
    ]
  },

  // Configuración de monitoreo
  monitoring: {
    webVitals: true,
    performanceObserver: true,
    longTasks: true,
    layoutShifts: true,
    firstInput: true
  },

  // Configuración de optimización de CSS
  cssOptimization: {
    criticalCSS: true,
    purgeCSS: true,
    minify: true,
    autoprefixer: true
  },

  // Configuración de optimización de JavaScript
  jsOptimization: {
    minify: true,
    treeShaking: true,
    deadCodeElimination: true,
    codeSplitting: true
  }
};

// Función para generar meta tags de rendimiento
export const generatePerformanceMetaTags = () => {
  return [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
      name: 'theme-color',
      content: '#1a1a1a'
    },
    {
      name: 'color-scheme',
      content: 'light dark'
    },
    {
      httpEquiv: 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      httpEquiv: 'X-Content-Type-Options',
      content: 'nosniff'
    },
    {
      httpEquiv: 'X-Frame-Options',
      content: 'DENY'
    },
    {
      httpEquiv: 'X-XSS-Protection',
      content: '1; mode=block'
    }
  ];
};

// Función para generar preload links
export const generatePreloadLinks = () => {
  return performanceConfig.criticalResources.map(resource => ({
    rel: 'preload',
    href: resource.href,
    as: resource.as,
    type: resource.type,
    crossOrigin: resource.crossOrigin
  }));
};

// Función para generar preconnect links
export const generatePreconnectLinks = () => {
  return performanceConfig.preconnect.map(domain => ({
    rel: 'preconnect',
    href: domain,
    crossOrigin: 'anonymous'
  }));
};

// Función para generar DNS prefetch links
export const generateDnsPrefetchLinks = () => {
  return performanceConfig.dnsPrefetch.map(domain => ({
    rel: 'dns-prefetch',
    href: domain
  }));
};

export default performanceConfig;
