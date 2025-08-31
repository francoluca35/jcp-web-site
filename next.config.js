/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable static generation for Netlify
  experimental: {
    appDir: true,
  },
  // Handle form submissions
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/.netlify/functions/:path*',
      },
    ]
  },
}

module.exports = nextConfig