const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.js?[hash]',
      path: path.resolve(__dirname, 'docs'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(options.mode === 'production'),
      }),
    ],
  };
};
