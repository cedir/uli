import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'inline-source-map',  // cheap-module-eval-source-map --> cory lo usa, probar si anda mejor o investigar.
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/js/main')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
    })
  ],
  module: {
    preLoaders: [
      // Javascript
      { 
        test: /\.jsx?$/,
        loader: 'eslint',
        // include: path.join(__dirname, 'src/js/estudio'),
        exclude: [
          /node_modules/,
          path.join(__dirname, 'src/js/app/layout/inspinia'),
          path.join(__dirname, 'src/js/app/layout/footable/footable.all.min'),
        ]
      }
    ],
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /(\.less)$/, loaders: ['style', 'css', 'less']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/png'},
      {test: /\.(jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/jpeg'}
    ]
  }
};

