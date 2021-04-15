const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const config = require('./config');

module.exports = (env, options) => {
  const product = process.env.PRODUCT || 'ttd';
  const currentConfig = config[product];

  return {
    entry: './src/index.js',
    output: {
      filename: `${product}.js?[hash]`,
      path: path.resolve(__dirname, `docs/${product}`),
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
        FB_APIKEY: JSON.stringify(currentConfig.firebase.apiKey),
        FB_AUTHDOMAIN: JSON.stringify(currentConfig.firebase.authDomain),
        FB_DATABASEURL: JSON.stringify(currentConfig.firebase.databaseURL),
        FB_PROJECTID: JSON.stringify(currentConfig.firebase.projectId),
        FB_STORAGEBUCKET: JSON.stringify(currentConfig.firebase.storageBucket),
        FB_MESSAGINGSENDERID: JSON.stringify(
          currentConfig.firebase.messagingSenderId,
        ),
        QUESTIONSPERDAY: JSON.stringify(currentConfig.questionsPerDay),
      }),
    ],
  };
};
