// Configuración SEO avanzada para JCP Maquinarias
export const seoConfig = {
  // Información de la empresa
  company: {
    name: "JCP Maquinarias",
    description: "Líderes en maquinaria industrial para panaderías en Argentina. Amasadoras, hornos rotativos, sobadoras y repuestos originales.",
    url: "https://maquinariasjcp.netlify.app",
    logo: "https://maquinariasjcp.netlify.app/Assets/logo.png",
    phone: "+54 11 6396 2947",
    email: "info@maquinariasjcp.com",
    address: {
      country: "AR",
      region: "Buenos Aires"
    },
    foundingDate: "2004",
    industry: "Maquinaria Industrial"
  },

  // Keywords principales por categoría
  keywords: {
    primary: [
      "amasadoras industriales argentina",
      "hornos rotativos panadería",
      "maquinaria panadería argentina",
      "sobadoras martino",
      "repuestos amasadoras"
    ],
    secondary: [
      "amasadoras 50 kg precio",
      "hornos convector industriales",
      "combos equipamiento panadería",
      "guía compra amasadora industrial",
      "especificaciones técnicas maquinaria"
    ],
    longTail: [
      "cómo elegir amasadora industrial para panadería",
      "hornos rotativos vs convector diferencias",
      "repuestos originales maquinaria panadería argentina",
      "instalación amasadoras industriales buenos aires",
      "mantenimiento hornos panadería industrial"
    ]
  },

  // Estructura de URLs optimizada
  urls: {
    home: "/",
    catalog: "/catalog/",
    amasadoras: "/amasadoras-industriales/",
    hornos: "/hornos-industriales/",
    combos: "/combos-soluciones/",
    repuestos: "/repuestos/",
    blog: "/blog/",
    maquinaria: "/maquinaria/"
  },

  // Configuración de metadatos por página
  pages: {
    home: {
      title: "Amasadoras Industriales Argentina | Hornos Panadería | JCP Maquinarias",
      description: "Líderes en amasadoras industriales, hornos rotativos y maquinaria para panaderías en Argentina. Más de 20 años de experiencia. Asesoramiento especializado y repuestos originales garantizados.",
      keywords: "amasadora industrial argentina, hornos rotativos panadería, maquinaria panadería argentina, amasadoras 50 kg, hornos convector industriales, sobadoras martino, repuestos amasadoras, combos equipamiento panadería, guía compra amasadora industrial"
    },
    catalog: {
      title: "Catálogo Amasadoras Industriales | Hornos Rotativos | Sobadoras Martino Argentina",
      description: "Catálogo completo de amasadoras industriales, hornos rotativos, sobadoras Martino y maquinaria para panaderías en Argentina. Especificaciones técnicas detalladas, precios y combos especiales. Asesoramiento técnico gratuito.",
      keywords: "catálogo amasadoras industriales, hornos rotativos argentina, sobadoras martino, amasadoras 50 kg precio, hornos convector panadería, combos equipamiento panadería, especificaciones técnicas maquinaria, guía compra amasadora industrial"
    },
    amasadoras: {
      title: "Amasadoras Industriales Argentina | Guía Completa de Compra | JCP Maquinarias",
      description: "Guía completa para elegir la amasadora industrial ideal. Catálogo de amasadoras de 25kg a 75kg, especificaciones técnicas detalladas, precios y combos especiales. Asesoramiento técnico gratuito en Argentina.",
      keywords: "amasadora industrial argentina, amasadoras 50 kg precio, cómo elegir amasadora industrial, amasadora rápida panadería, especificaciones técnicas amasadora, motor trifásico amasadora, guía compra amasadora industrial, combos amasadora sobadora"
    },
    hornos: {
      title: "Hornos Industriales para Panadería | Rotativos y Convector Argentina | JCP",
      description: "Catálogo completo de hornos industriales para panadería: rotativos, convector y de convección. Capacidades de 50kg a 100kg/h. Especificaciones técnicas detalladas, precios y asesoramiento especializado en Argentina.",
      keywords: "hornos industriales panadería, hornos rotativos argentina, hornos convector industriales, horno panadero 50 kg, especificaciones técnicas hornos, consumo gas horno industrial, guía compra horno panadero, hornos 220v 380v"
    },
    combos: {
      title: "Combos y Soluciones Integrales para Panaderías | JCP Maquinarias",
      description: "Combos completos de equipamiento para panaderías, pizzerías y pastelerías. Soluciones integrales con descuentos especiales, instalación incluida y soporte técnico. Ahorra hasta 16% comprando en combo.",
      keywords: "combos equipamiento panadería, soluciones integrales panadería, combo amasadora horno, equipamiento completo panadería, descuentos maquinaria industrial, instalación incluida panadería"
    },
    repuestos: {
      title: "Repuestos para Maquinaria de Panadería | JCP Maquinarias Argentina",
      description: "Repuestos originales para maquinaria de panadería. Motores, engranajes, rodamientos, sinfines, coronas, quemadores, sondas de temperatura. Envío a todo Argentina. Stock permanente.",
      keywords: "repuestos maquinaria panadería, motores amasadoras, engranajes sobadoras, sinfines coronas, quemadores hornos, repuestos Pauna, repuestos Imepa"
    }
  },

  // Schema.org estructurado
  schema: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "JCP Maquinarias",
      "description": "Líderes en maquinaria industrial para panaderías en Argentina. Amasadoras, hornos rotativos, sobadoras y repuestos originales.",
      "url": "https://maquinariasjcp.netlify.app",
      "logo": "https://maquinariasjcp.netlify.app/Assets/logo.png",
      "telephone": "+54 11 6396 2947",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AR",
        "addressRegion": "Buenos Aires"
      },
      "sameAs": [],
      "foundingDate": "2004",
      "numberOfEmployees": "10-50",
      "industry": "Maquinaria Industrial",
      "knowsAbout": [
        "Amasadoras Industriales",
        "Hornos Rotativos",
        "Sobadoras",
        "Maquinaria Panadería",
        "Repuestos Originales"
      ]
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "JCP Maquinarias",
      "url": "https://maquinariasjcp.netlify.app",
      "description": "Catálogo completo de maquinaria industrial para panaderías en Argentina",
      "publisher": {
        "@type": "Organization",
        "name": "JCP Maquinarias"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://maquinariasjcp.netlify.app/catalog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  },

  // Configuración de Open Graph
  openGraph: {
    siteName: "JCP Maquinarias",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://maquinariasjcp.netlify.app/Assets/logo.png",
        width: 1200,
        height: 630,
        alt: "JCP Maquinarias - Amasadoras Industriales Argentina"
      }
    ]
  },

  // Configuración de Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@jcpmaquinarias",
    creator: "@jcpmaquinarias"
  },

  // Configuración de rendimiento
  performance: {
    // Core Web Vitals targets
    targets: {
      LCP: 2.5, // Largest Contentful Paint
      FID: 100, // First Input Delay
      CLS: 0.1, // Cumulative Layout Shift
      FCP: 1.8, // First Contentful Paint
      TTFB: 600 // Time to First Byte
    },
    
    // Optimizaciones de imágenes
    imageOptimization: {
      formats: ['webp', 'avif'],
      quality: 85,
      sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    },
    
    // Preload de recursos críticos
    criticalResources: [
      '/Assets/logo.png',
      '/Assets/logo.webp',
      '/data/modernProducts.json',
      '/data/productCatalog.json'
    ]
  },

  // Configuración de analytics
  analytics: {
    googleAnalytics: {
      id: "G-XXXXXXXXXX", // Reemplazar con el ID real
      config: {
        send_page_view: true,
        anonymize_ip: true,
        cookie_flags: "SameSite=None;Secure"
      }
    },
    googleTagManager: {
      id: "GTM-XXXXXXX" // Reemplazar con el ID real
    }
  },

  // Configuración de monitoreo
  monitoring: {
    googleSearchConsole: true,
    bingWebmasterTools: true,
    sitemapValidation: true,
    robotsTxtValidation: true
  }
};

export default seoConfig;
