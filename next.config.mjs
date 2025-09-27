/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization for better performance
    unoptimized: false,
    // Add domains if you're loading images from external sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Improve performance with these settings
  reactStrictMode: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize performance
  experimental: {
    // Disabled CSS optimization to avoid build errors
    // optimizeCss: true,
    // Improve memory usage
    optimizePackageImports: [
      'framer-motion',
      'gsap',
      'lucide-react',
      '@radix-ui/react-icons',
    ],
  },
}

export default nextConfig
