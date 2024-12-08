/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backendbatd.clinstitute.co.uk',
        port: '',
      },
    ],
  },
   rewrites: async () => [
    {
      source: '/:city/:id/:slug', // Match the original URL structure
      destination: '/cities/:city/:id/:slug', // Map it to the new URL structure
    },
   
  ],
};

export default nextConfig;
