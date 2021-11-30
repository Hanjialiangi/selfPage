const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    index: path.resolve(__dirname, 'src/index.tsx')
  },
  output: {
    publicPath: '/dist/js/',
    path: path.resolve(__dirname, 'dist/js'),
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styleModules': path.resolve(__dirname, 'src/styles/modules'),
      '@src': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /(\.png|\.jpg|\.gif)$/,
        use: 'url-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH),
        BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE),
        API_PREFIX: JSON.stringify(process.env.API_PREFIX)
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    publicPath: '/dist/js/',
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8000',
        target: ' http://ding-wuhou.yugoo.com',
        changeOrigin: true
      }
    }
  }
};
