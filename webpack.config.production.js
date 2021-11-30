const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [['postcss-preset-env']]
    }
  }
};

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    index: path.resolve(__dirname, 'src/index.tsx')
  },
  output: {
    publicPath: `${process.env.PUBLIC_PATH}`,
    path: path.resolve(__dirname, 'temp/'),
    chunkFilename: 'js/[name]_[chunkhash].chunk.js',
    filename: 'js/[name]_[chunkhash].js'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', PostCSSLoader]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          PostCSSLoader,
          'sass-loader'
        ]
      },
      {
        test: /(\.png|\.jpg|\.gif)$/,
        use: 'url-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].module-[contenthash].css',
      chunkFilename: 'css/[id].module-[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH),
        BUILD_TYPE: JSON.stringify(process.env.BUILD_TYPE),
        API_PREFIX: JSON.stringify(process.env.API_PREFIX)
      }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'temp/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: false
      }
    }),
    new ProgressBarWebpackPlugin()
  ]
};
