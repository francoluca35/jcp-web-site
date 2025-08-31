/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove rewrites as they don't work with static export
  // Netlify Forms handles form submissions automatically
}

module.exports = nextConfig