/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Remove experimental features that might cause issues
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  // },
  // Remove rewrites as they don't work with static export
  // Netlify Forms handles form submissions automatically
}

module.exports = nextConfig