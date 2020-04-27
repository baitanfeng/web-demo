const path = require('path');
const CopyrightWebpckPlugin = require('./plugin/copyright-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyrightWebpckPlugin()
  ]
}