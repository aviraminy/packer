const { resolve } = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    widgetA: 'widgetA',
    widgetB: 'widgetB',
    vendors: ['react', 'react-dom']
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'packer'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      // (the commons chunk name)

      //filename: 'commons.js',
      // (the filename of the commons chunk)

      minChunks: 2,
      // (Modules must be shared between 3 entries)

      chunks: ['widgetA', 'widgetB'],
      // (Only use these entries)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity
    }),

    new BundleAnalyzerPlugin()
  ]

};
