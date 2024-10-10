/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'https://restmark.by/api',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http', // для локал девеломпента
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'restmark.by',
        pathname: '/uploads/**', // для мастера
      },
    ],
  },
}

export default nextConfig
