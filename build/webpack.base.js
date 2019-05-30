const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const path = require('path')

const version = process.env.VERSION || require('../package.json').version
const author=require('../package.json').author
const isDev = process.env.NODE_ENV !== 'production'
const banner =
  ` * [name] v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.'



console.log(path.resolve(__dirname, isDev?'public':'dist'));
module.exports = {
  mode: isDev?'development':'production',
  entry: {
    'calendar':['./src/module/calendar/index.js'],
    'chatbox':['./src/module/chatbox/index.js'],
    'action-button':['./src/module/action-button/index.js'],

  },

  output: {
    path: path.resolve(__dirname, isDev?'public':'../dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
      }, {
        test: /\.(png|jpg|gif|jpeg|webp)$/,
        use: [{
          loader: 'file-loader',
          options: {},
        }, ]
      }]
    },
  resolve: {
    extensions: ['.js'],
    alias: {
         '@': path.resolve(__dirname, '../src/')
       }
  },
   plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.BannerPlugin({
        banner
      })
    ]

}
