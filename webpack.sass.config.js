var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry:  __dirname + "/src/app.scss",
  output: {
    path: __dirname,
    filename: "bundle.css"
  },
  module: {
    loaders: [
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'sass-loader'
        }
    ]
  },
  node: {
        fs: "empty" // avoids error messages
    },
  resolve: {
    extensions: ['.scss']
  },
  externals: [],
  plugins: [],
};
