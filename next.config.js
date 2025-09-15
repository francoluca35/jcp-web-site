/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  
  // Optimización de imágenes
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
  },
  
  // Configuraciones experimentales para rendimiento
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    esmExternals: false,
  },
  
  // Compilador optimizado
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  
  // Optimizaciones de rendimiento
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  reactStrictMode: false,
  
  // Configuraciones de build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Headers de seguridad y rendimiento (comentados para export estático)
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //         {
  //           key: 'Referrer-Policy',
  //           value: 'strict-origin-when-cross-origin',
  //         },
  //         {
  //           key: 'Permissions-Policy',
  //           value: 'camera=(), microphone=(), geolocation=()',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/Assets/(.*)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/data/(.*)',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=86400, s-maxage=86400',
  //         },
  //       ],
  //     },
  //   ];
  // },
  
  // Configuración específica para Netlify
  assetPrefix: '',
  basePath: '',
  
  // Configuración para export estático
  trailingSlash: true,
  
  // Optimización de bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Optimización de chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    
    return config;
  },
}

module.exports = nextConfig