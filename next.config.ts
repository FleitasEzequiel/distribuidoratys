import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xjbifzftvlakgoyrnxrz.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
    minimumCacheTTL: 3600
  },

  cacheComponents: true,
  logging: {
    "fetches": {
      fullUrl: true
    }
  },


  /* config options here */
};

export default nextConfig;
