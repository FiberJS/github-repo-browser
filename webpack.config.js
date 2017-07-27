var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry:  __dirname + "/src/app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader?presets[]=es2015'
        },
        {
          test: /\.js$/,
          include: /node_modules\/framework-concept/,
          loader: 'babel-loader?presets[]=es2015'
        },
        {
          test: /\.js$/,
          include: /node_modules\/PatchIt/,
          loader: 'babel-loader?presets[]=es2015'
        },
        {
          test: /\.html$/,
          loader: 'html-loader?attrs=false',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          loader: ExtractTextPlugin.extract('sass-loader')
        }
    ]
  },
  node: {
        fs: "empty" // avoids error messages
    },
  resolve: {
    extensions: ['.scss', '.js', '.html'],
    alias: {
      flight: path.resolve(__dirname, 'node_modules/framework-concept/flight'),
      PatchIt: path.resolve(__dirname, 'node_modules/PatchIt'),
      components: path.resolve(__dirname, 'src/components'),
      domain: path.resolve(__dirname, 'src/domain'),
      events: path.resolve(__dirname, 'src/events'),
      namespace: path.resolve(__dirname, 'src/namespace'),
      repositories: path.resolve(__dirname, 'src/repositories'),
    }
  },
  externals: [
  ],
  plugins: [
    new ExtractTextPlugin('bundle.css', {
        allChunks: true
    })
  ],
};
