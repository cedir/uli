import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false,
};

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: path.resolve(__dirname, 'src/js/main'),
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),


    // TODO: y esto??
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
        }),
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint',
                exclude: [
                    /node_modules/,
                    path.join(__dirname, 'src/js/app/layout/inspinia'),
                    path.join(__dirname, 'src/js/app/layout/pace.min'),
                    path.join(__dirname, 'src/js/app/layout/footable/footable.all.min'),
                ],
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel'],
            },
            {
                test: /(\.css)$/,
                loaders: ['style', 'css'],
            },
            {
                test: /(\.less)$/,
                loaders: ['style', 'css', 'less'],
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?prefix=font/&limit=5000',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml',
            },
            {
                test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/png',
            },
            {
                test: /\.(jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/jpeg',
            },
        ],
    },
};

