const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const { NODE_ENV, moduleFileExtensions } = require('./constants');

const isEnvDevelopment = NODE_ENV === 'development';
// const isEnvProduction = NODE_ENV === 'production';
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

console.log(NODE_ENV);
module.exports = {
  entry: paths.appIndexJs,
  resolve: {
    extensions: moduleFileExtensions.map((ext) => `.${ext}`),
    alias: {
      src: paths.appSrc,
      components: paths.appSrcComponents,
      utils: paths.appSrcUtils,
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-runtime']],
          },
        },
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: { postcssOptions: { plugins: [['autoprefixer']] } } },
        ],
      },
      {
        test: cssModuleRegex,
        use: [
          isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: { mode: 'local', localIdentName: '[hash:base64:6]' } } },
          { loader: 'postcss-loader', options: { postcssOptions: { plugins: [['autoprefixer']] } } },
        ],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'postcss-loader', options: { postcssOptions: { plugins: [['autoprefixer']] } } },
          'sass-loader',
        ],
      },
      {
        test: sassModuleRegex,
        use: [
          isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: { mode: 'local', localIdentName: '[hash:base64:6]' } } },
          { loader: 'postcss-loader', options: { postcssOptions: { plugins: [['autoprefixer']] } } },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[contenthash][ext]',
        },
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[contenthash][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: paths.appHtml, filename: 'index.html', inject: 'body' })],
};
