const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
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
  // devtool: MODE === NODE_ENV.PRODUCTION ? 'source-map' : 'eval-source-map',

  // entry: './src/index.js',
  // entry: path.resolve(__dirname, 'src/index.js'),
  entry: {
    main: './src/index.js',
    list: './src/list.js',
  },

  resolve: {
    // 解析的步骤，先检索有没有js后缀的此文件，若有检索完成，解析文件
    // 若没有，继续检索有没有jsx后缀的此文件，若有检索完成，解析文件
    // 若没有，则检索失败，报未找到此文件的错误
    // 因此，合理的填写扩展名能加快开发速度，过度的填写扩展名会降低解析速度
    extensions: ['.js', '.jsx'],

    alias: {
      'src': path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
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
      filename: 'index.html',
      excludeChunks: ['list']
    }),
    new HtmlWebpackPlugin({
        title: 'webpack4 demo',
        template: './src/index.html',
        filename: 'list.html',
        excludeChunks: ['main']
    }),
    new LodashModuleReplacementPlugin(),
  ],
}