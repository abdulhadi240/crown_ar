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
    // Rewrite for paths with a slug (e.g., internet-of-things-training-program12)
    {
      source: '/:city/:id/:slug', // Match URLs like /manchester/safety-mangement/internet-of-things-training-program12
      destination: '/cities/:city/:id/:slug', // Rewrite to /cities/manchester/safety-mangement/internet-of-things-training-program12
    },
    // Rewrite for paths without a slug (e.g., /manchester/safety-mangement/)
    
  ],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
