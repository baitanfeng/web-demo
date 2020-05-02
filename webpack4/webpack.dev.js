const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // 默认是 localhost。如果你希望服务器外部可访问，指定如下
    // host: '0.0.0.0',
    hot: true,
    open: true,
    // https: true

    // 在 localhost:3000 上有后端服务的话，可以这样启用代理
    proxy: {
      // 请求到 /api/users 现在会被代理到请求
      // http://localhost:3000/api/users
      '/api': 'http://localhost:3000',

      // 如果不想始终传递 /api, 则需要重写路径
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        }
      },

      // 实际api地址为 http://www.dell-lee.com/react/api/header.json
      // 目前header.json不可用，但提供了个临时的demo.json
      // 即临时api地址为 http://www.dell-lee.com/react/api/demo.json
      '/react/api': {
        target: 'http://www.dell-lee.com',
        pathRewrite: {
          'header.json': 'demo.json'
        }
      },

      // 默认情况下，不接受运行在HTTPS上，且使用了无效证书的后端服务器
      // 如果你想要接受，修改配置如下
      '/api': {
        target: 'https://other-server.example.com',
        secure: false
      }
    },
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
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
        'style-loader',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = merge(commonConfig, config);