/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = (phase, { defaultConfig, nextConfig }) => {
  return {
    ...defaultConfig,

    images: {
      domains: ["ipfs.infura.io"],
    },
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          path: false,
          os: false,
          net: false,
          crypto: require.resolve("crypto-browserify"),
          querystring: require.resolve("query-string"),
          stream: false,
          https: false,
          http: false,
        },
      };
      return config;
    },
  };
};
