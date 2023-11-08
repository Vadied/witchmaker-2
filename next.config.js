/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    
    config.resolve.fallback = {
      "mongodb-client-encryption": false ,
      "aws4": false
    };

    return config;
  },
};

module.exports = nextConfig;
