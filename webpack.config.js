const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  mode: 'development',
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'deploy'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new DotenvPlugin({
      path: './.env',
      sample: './.env.default'
    })
  ]
};
