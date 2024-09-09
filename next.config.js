/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora ESLint durante la construcción
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    
  },
};

module.exports = nextConfig;
