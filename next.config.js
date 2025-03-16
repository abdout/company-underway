/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer2');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = withContentlayer(nextConfig); 