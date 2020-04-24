const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

const devConfig = {
    mode: 'development',
    devtool: 'eval-source-map'
};

module.exports = merge(commonConfig, devConfig);