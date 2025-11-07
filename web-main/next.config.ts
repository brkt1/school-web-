import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Enable standalone output for Docker
  
  // Proxy API requests to backend to avoid CORS issues
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
    
    // Remove trailing slash from backendUrl if present
    const cleanBackendUrl = backendUrl.replace(/\/+$/, '');
    
    return [
      {
        source: '/api/:path*',
        destination: `${cleanBackendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
