const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
const common = require('./webpack.common');

const PUERTO = 3000;

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './src',
        port: PUERTO,
        historyApiFallback: true,
        overlay: true,
    },
    plugins: [
        new ESLintPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ],
    stats: 'minimal',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
});
