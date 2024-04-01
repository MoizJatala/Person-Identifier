const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { crypto: require.resolve('crypto-browserify') };
    return config;
  },
};