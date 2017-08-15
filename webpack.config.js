var path = require('path');
var fs = require('fs');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "bundle.css"
});

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
          test: /\.js$/,
          include: /node_modules\/flow-manager/,
          loader: 'babel-loader?presets[]=es2015'
        },
        {
          test: /\.html$/,
          loader: 'html-loader?attrs=false',
          exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader?attrs=false"
                }, {
                    loader: "sass-loader?attrs=false"
                }],
            })
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
      PatchIt: path.resolve(__dirname, 'node_modules/patchit'),
      FlowManager: path.resolve(__dirname, 'node_modules/flow-manager/src'),
      components: path.resolve(__dirname, 'src/components'),
      domain: path.resolve(__dirname, 'src/domain'),
      events: path.resolve(__dirname, 'src/events/events'),
      namespace: path.resolve(__dirname, 'src/namespace/namespace'),
      pages: path.resolve(__dirname, 'src/pages'),
    }
  },
  externals: [
  ],
  plugins: [
    extractSass
  ],
};
