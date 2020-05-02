const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const prodConfig = require('./webpack.prod');

const config = {
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
};

module.exports = merge(prodConfig, config);