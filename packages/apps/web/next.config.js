const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const withTM = require('next-transpile-modules')([
  '@fybf/shared.ui',
  '@fybf/shared.services',
  '@fybf/shared.theme',
  '@fybf/shared.types',
]);

require('dotenv').config({
  path: './.env',
});

module.exports = withPlugins([withTM, withPWA], {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  pageExtensions: [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
    'tsx',
    'ts',
    'jsx',
    'js',
  ],
  env: {
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    IMAGEKIT_FOLDER: process.env.IMAGEKIT_FOLDER,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
  },
  images: {
    domains: ['cdn.pixabay.com'],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/app/spots',
        permanent: true,
      },
    ];
  },
});
