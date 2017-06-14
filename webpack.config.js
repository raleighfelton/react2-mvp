var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var directory = 'build';

var config = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  entry: ['./client/index.jsx'],
  output: {
    filename: 'bundle.js',
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
              presets: ['es2015', 'react', 'stage-2']
            }
          }
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
    new CopyWebpackPlugin([
      { from: 'client/assets/img/favicon' }
    ]),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.bail = true;
  config.profile = false;
  config.devtool = 'source-map';

  config.module.rules = config.module.rules.concat([
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader?importLoaders=1',
            query: { minimize: true }
          },
          'postcss-loader'
        ]
      })
    },
  ]);

  config.plugins = config.plugins.concat([
    new CompressionPlugin(),
    new ExtractTextPlugin('assets/styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      output: {
        comments: false
      }
    })
  ]);
} else {
  config.module.rules = config.module.rules.concat([
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
    }
  ]);
}

module.exports = config;
