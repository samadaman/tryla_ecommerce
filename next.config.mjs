/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
