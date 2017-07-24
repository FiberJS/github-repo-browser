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
          loader: 'babel?presets[]=es2015'
        },
        {
          test: /\.js$/,
          include: /node_modules\/framework-concept/,
          loader: 'babel?presets[]=es2015'
        },
        {
          test: /\.js$/,
          include: /node_modules\/PatchIt/,
          loader: 'babel?presets[]=es2015'
        },
        {
            test: /\.html$/,
            loader: 'html',
            exclude: /node_modules/
        }
    ]
  },
  node: {
        fs: "empty" // avoids error messages
    },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.html'],
    alias: {
      flight: 'node_modules/framework-concept/flight',
      PatchIt: 'node_modules/PatchIt',
      components: 'src/components',
      domain: 'src/domain',
      events: 'src/events',
      namespace: 'src/namespace',
      repositories: 'src/repositories',
    }
  },
  externals: [
  ],
  plugins: [
  ],
};
