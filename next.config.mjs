/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a1.muscache.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a2.muscache.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
