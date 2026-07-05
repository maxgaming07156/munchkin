import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Catch potential React 19 issues during development
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    // Allow personal photographs stored in the project
    localPatterns: [
      {
        pathname: '/images/**',
      },
    ],
  },

  // Turbopack: Next.js 16 uses Turbopack by default
  // GLSL files (.glsl, .vert, .frag) are handled natively by Turbopack
  // No additional configuration needed
  turbopack: {},

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key:   'X-Frame-Options',
            value: 'DENY',
          },
          {
            key:   'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key:   'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key:   'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
