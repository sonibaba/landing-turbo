import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    CLOUDINARY_CLOUD_NAME: 'dt5bkke6v',
    CLOUDINARY_URL: 'cloudinary://API_KEY:API_SECRET@dt5bkke6v',
  },
  // i18n: {
  //   locales: ['es-MX'],
  //   defaultLocale: 'es-MX',
  // },
  images: {
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
  webpack: config => {
    config.externals = [...config.externals, 'bcrypt']
    return config
  },
}

export default nextConfig
