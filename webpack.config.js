var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var directory = 'build';

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  entry: ['./client/index.jsx'],
  output: {
    filename: 'assets/bundle.js',
    path: path.resolve(__dirname, directory)
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['stage-2', 'react', 'es2015']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader?importLoaders=1',
            query: { sourceMap: true }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(gif|png|jpg|svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            query: { limit: 25000 }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(directory),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      favicon: 'client/assets/img/favicon/favicon.ico'
    })
  ]
};
