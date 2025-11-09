/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allows any path from this domain
      },
    ],
  },
  // Define redirects for old URLs
  async redirects() {
    return [
      // FIX: Redirects the base /project path to /blog
      {
        source: '/project',
        destination: '/blog',
        permanent: true, // 301 Permanent Redirect
      },

{
        source: '/f',
        destination: '/blog',
        permanent: true, // 301 Permanent Redirect
      },


      // EXISTING: Redirects all content from /project/* to /blog/*
      {
        source: '/project/:slug',
        destination: '/blog/:slug',
        permanent: true, // 301 Permanent Redirect
      },
      
      // EXISTING: Handles the specific old URL structure from /f/
      {
        source: '/f/introduction-to-my-jazz-a-seamless-transition-from-classical-to-groovy-musi',
        destination: '/blog/introduction-to-my-jazz-a-seamless-transition-from-classical-to-groovy-musi',
        permanent: true, 
      },
    ];
  },
};

module.exports = nextConfig;