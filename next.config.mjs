/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },

   images: { 
     remotePatterns: [
      {
        protocol: "https",
        hostname:"**",
      },
    ],
  },

  reactCompiler: true,
  turbopack: {
rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
       
    },
      
  },
  
};

export default nextConfig;
