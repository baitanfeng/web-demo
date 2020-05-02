const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name]_[contenthash].js',
    chunkFilename: '[name]_[contenthash].js',

    // publicPath: 'https://cdn.example.com/',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.(scss|sass)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    // 块/模块分割
    splitChunks: {
      chunks: 'all', // 同步代码和异步代码都进行分割
      // minSize: 0, // 0意思就是只要块大于0KB，就进行分割，也即一定会进行分割
      minSize: 20480, // 只在块大于20KB时，才会进行分割
      maxSize: 102400, // 尝试进行每块最大为100KB的分割，若能分割就分割，若不能分割就不分割
      // maxSize: 0, // 0意思就是对需要分割的块，尝试进行每块最大为0KB的分割，也即一定不会进行再分
      name: false,

      // 分割同步代码时会按如下规则去分割
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // filename: 'vendors.js',
          enforce: true
        },
        default: {
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css',
      chunkFilename: '[id]_[hash].css'
    }),
  ]
};

module.exports = merge(commonConfig, config);