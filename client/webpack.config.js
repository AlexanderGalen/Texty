const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // have webpack generate my html
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Texty - Text editor'
      }),
      // set up service worker
      new InjectManifest({
        swSrc: './src/js/src-sw.js',
        swDest: 'service-worker.js',
      }),
      // have webpack generate a manifest.json file
      new WebpackPwaManifest({
        name: 'Texty',
        short_name: 'Texty',
        description: 'Simple online/offline web text editor',
        background_color: '#272822',
        theme_color: '#272822',
        start_url: './',
        publicPath: './',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
