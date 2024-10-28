import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    CLOUDINARY_CLOUD_NAME: 'dt5bkke6v',
    CLOUDINARY_URL: 'cloudinary://API_KEY:API_SECRET@dt5bkke6v',
  },
  distDir: 'out',
  // i18n: {
  //   locales: ['es-MX'],
  //   defaultLocale: 'es-MX',
  // },
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: './src/assets/*',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dt5bkke6v/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        pathname: '/embed/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/huastecanetwork/image/**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/huastecanetwork/image/**',
      },
    ],
  },
}

export default nextConfig
