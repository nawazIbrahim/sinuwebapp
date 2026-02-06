/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
      {
        protocol: 'http',
        hostname: 'www.digilink.com',
      },
      {
        protocol: 'http',
        hostname: 'www.data.com',
      },
    ],
  },
};

module.exports = nextConfig;
