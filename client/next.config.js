/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:'/journal',
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'drive.google.com'],
  },
}


module.exports = nextConfig
