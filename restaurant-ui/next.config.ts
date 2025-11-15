import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'], // thêm domain của bạn ở đây
  },
};

export default nextConfig;
