/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Configuración simplificada para evitar problemas
  experimental: {
    // Deshabilitar optimizaciones que pueden causar problemas
    optimizeCss: false,
  },
}

module.exports = nextConfig