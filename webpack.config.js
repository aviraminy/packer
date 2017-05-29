const { resolve } = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    widgetA: 'widgetA',
    widgetB: 'widgetB',
    vendor: ['react', 'react-dom']
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'packer'
  },
   resolve:{
     mainFields: ["module", "main"],
     extensions: ['.js', '.json', '.jsx']
   },

  module: {
    rules: [{
      test: /.jsx?$/,
      include: function(modulePath) {
        if (modulePath.indexOf("widgetA") >= 0 || modulePath.indexOf("widgetB") >= 0) {
          console.log("Buble:", modulePath);
          return true;
        }
        return false;
      },

      loader: 'babel-loader',
      options: {
        presets: [['env', { modules: false }], 'react']
      }
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['widgetA', 'widgetB']
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new HtmlPlugin(),

    new BundleAnalyzerPlugin()
  ]
};
