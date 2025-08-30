/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Para permitir imágenes de Unsplash
    unoptimized: true, // Para desarrollo, optimizar en producción
  },
  trailingSlash: false,
  output: 'standalone', // Para deployment
}

module.exports = nextConfig