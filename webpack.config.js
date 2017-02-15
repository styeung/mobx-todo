var path = require('path');

module.exports = {
  context: __dirname + '/app',
  entry: {
    'app/build/bundle': './index.js',
    'test/build/bundle': '../test/index.js'
  },
  output: {
     path: __dirname + '/',
     publicPath: '/assets',
     filename: '[name].js',
     libraryTarget: 'var',
     library: 'Todo',
  },
  resolve: {
    modules: [
      path.resolve('./app'),
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  }
};
