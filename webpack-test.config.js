var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'spec/components', 'app_spec.jsx'),
  output: {
    path: path.resolve(__dirname, 'spec/build'),
    filename: 'specBundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src/app'),
          path.resolve(__dirname, 'spec/components')
        ],
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map'
};



