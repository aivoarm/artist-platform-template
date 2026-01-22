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
      // 👇 NEW: Allow Spotify Images
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
      // 👇 Add this block for Deezer Images
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '/**',
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
      {
        source: '/f/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },

      // EXISTING: Redirects all content from /project/* to /blog/*
      {
        source: '/project/:slug',
        destination: '/blog/:slug',
        permanent: true, // 301 Permanent Redirect
      },
    ];
  },
};

module.exports = nextConfig;