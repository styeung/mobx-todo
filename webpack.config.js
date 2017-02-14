module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
     path: __dirname + '/build',
     publicPath: '/assets',
     filename: 'bundle.js',
     libraryTarget: 'var',
     library: 'Todo',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
