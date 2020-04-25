const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const NODE_ENV = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
};
const MODE = NODE_ENV.PRODUCTION;

process.env.NODE_ENV = MODE;

const config = {
  mode: MODE,

  // 对于生产环境
  // --(none) (省略devtool选项) - 不生成source map。这是一个不错的选择
  // --source-map - 整个source-map作为一个单独的文件生成，
  //   它为bundle添加了一个引用注释，以便开发工具知道在哪里可以找到它
  //   你应该将你的服务器配置为不允许普通用户访问source map文件
  // 对于开发环境
  // --eval - 此选项会非常快的构建，主要缺点是，由于会映射到转换后的代码，
  //   而不是映射到原始代码（没有从loader中获取source map），
  //   所以不能正确显示行数
  // --eval-source-map - 初始化source map时比较慢，但是会在重新构建时提供比较快的速度，
  //   并且生成实际的文件，行数能够正确映射，因为会映射到原始代码中，
  //   它会生成用于开发环境的最佳品质的source map
  devtool: MODE === NODE_ENV.PRODUCTION ? 'source-map' : 'eval-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    // 默认是 localhost。如果你希望服务器外部可访问，指定如下
    host: '0.0.0.0',
    // hot: true,
    // open: true,
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

      // 默认情况下，不接受运行在HTTPS上，且使用了无效证书的后端服务器
      // 如果你想要接受，修改配置如下
      '/api': {
        target: 'https://other-server.example.com',
        secure: true
      }
    },
  },

  // entry: './src/index.js',
  // entry: path.resolve(__dirname, 'src/index.js'),
  entry: {
    main: './src/index.js',
    // another: './src/another.js',
  },

  output: {
    filename: MODE === NODE_ENV.PRODUCTION ? '[name]_[contenthash].js' : '[name].js',
    // filename: '[id]_[chunkhash].js',
    chunkFilename: MODE === NODE_ENV.PRODUCTION ? '[name]_[contenthash].js' : '[name].js',

    // path: path.resolve(__dirname, 'dist'),
    // publicPath: 'https://cdn.example.com',
    // publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.(jpg|png|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          // name: '[name]_[hash:7].[ext]',
          name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[name]_[hash].[ext]';
              // return '[path][name].[ext]?[hash]';
            }
            return '[hash].[ext]'
            // return '[sha512:hash:base64:7].[ext]';
          },

          // outputPath: 'images',
          outputPath(url, resourcePath, context) {
            // console.log(url, resourcePath, context)
            if (/\\font\\/.test(resourcePath)) {
              return `font/${url}`
            }
            return `images/${url}`;
          },

          limit: 4096,
        }
      }
    }]
  },
  // plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),

    // HtmlWebpackPlugin 会在打包结束后，自动生成一个html文件
    // 并把打包生成的js自动引入到这个html文件中
    new HtmlWebpackPlugin({
      title: 'webpack4 demo',
      template: './src/index.html',
    }),
    // new HtmlWebpackPlugin({
    //     title: 'webpack4 demo',
    //     template: './src/index.html',
    //     filename: 'test.html'
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin(),
  ],
  optimization: {
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
  }
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(config, prodConfig);
  } else {
    return merge(config, devConfig);
  }
}