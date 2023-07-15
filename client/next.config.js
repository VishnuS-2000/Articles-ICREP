/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:'/journal',
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'drive.google.com','localhost','icrep.cusat.ac.in'],
  },
}


module.exports = nextConfig
