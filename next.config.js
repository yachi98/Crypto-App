/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "assets.coingecko.com",
      "images.cointelegraph.com",
      "www.coindesk.com",
      "coin-images.coingecko.com",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
