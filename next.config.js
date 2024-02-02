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
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

// module.exports = {
//   webpack(config) {
//     const fileLoaderRule = config.module.rules.find((rule) =>
//       rule.test?.test?.(".svg")
//     );

//     config.module.rules.push(
//       // Reapply the existing rule, but only for svg imports ending in ?url
//       {
//         ...fileLoaderRule,
//         test: /\.svg$/i,
//         resourceQuery: /url/,
//       },
//       // Convert all other *.svg imports to React components
//       {
//         test: /\.svg$/i,
//         issuer: fileLoaderRule.issuer,
//         resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
//         use: ["@svgr/webpack"],
//       }
//     );

//     fileLoaderRule.exclude = /\.svg$/i;

//     return config;
//   },
//   images: {
//     domains: [
//       "assets.coingecko.com",
//       "images.cointelegraph.com",
//       "www.coindesk.com",
//     ],
//   },
//   reactStrictMode: false,
// };
