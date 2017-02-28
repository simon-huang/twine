var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'spec/components', 'app_spec.jsx'),
  output: {
    path: path.resolve(__dirname, 'spec/build'),
    filename: 'specBundle.js'
  },
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: 'source-map'
};



