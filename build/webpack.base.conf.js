const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = ({
  entry: path.resolve(__dirname, '../src/main.jsx'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        enforce: "pre",
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.less|\.css$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Study',
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/template.html'),
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'less'],
    }),
  ],
});
