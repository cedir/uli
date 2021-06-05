const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const PUERTO = 3000;

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './src',
        compress: true,
        port: PUERTO,
    },
});
