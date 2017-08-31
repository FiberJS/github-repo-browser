var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "bundle.css"
});


module.exports = function(config) {
  config.set({

    files: [
      // all files ending in "test"
      'test/**/*.spec.js'
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha', 'expect'],

    preprocessors: {
      // only specify one entry point
      // and require all tests in there
      'test/**/*.spec.js': ['webpack']
    },

    // reporters: ['spec'],

    webpack: {
      // webpack configuration
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
      resolve: {
        extensions: ['.scss', '.js', '.html'],
        alias: {
          fiber: path.resolve(__dirname, 'node_modules/framework-concept/src'),
          PatchIt: path.resolve(__dirname, 'node_modules/PatchIt'),
          FlowManager: path.resolve(__dirname, 'node_modules/flow-manager/src'),
          components: path.resolve(__dirname, 'src/components'),
          domain: path.resolve(__dirname, 'src/domain'),
          events: path.resolve(__dirname, 'src/events/events'),
          namespace: path.resolve(__dirname, 'src/namespace/namespace'),
          pages: path.resolve(__dirname, 'src/pages'),
        }
      },
      plugins: [
        extractSass
      ]
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    customLaunchers: {
      chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      },
      sauce_chrome_win: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'windows'
      }
    },

    plugins: [
        require("karma-chrome-launcher"),
        require("karma-webpack"),
        require("karma-mocha"),
        require("karma-expect"),
    ],

    browsers: ['Chrome']
  });
};
