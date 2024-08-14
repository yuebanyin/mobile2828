const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ProvidePlugin } = require('webpack');
const path = require('path');

const _resolvePath = (url) => path.resolve(__dirname, url);

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  stats: 'none',
  mode: 'none',
  entry: _resolvePath('../src/main.tsx'),
  output: {
    filename: '[name].[contenthash:10].js',
    chunkFilename: 'chunk.[name].[contenthash:10].js',
    path: _resolvePath('../dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@/': _resolvePath('../src/'),
      '@/constants': _resolvePath('../src/constants/'),
      '@/components': _resolvePath('../src/components/'),
      '@/assets': _resolvePath('../src/assets/'),
      '@/hooks': _resolvePath('../src/hooks/'),
      '@/hoc': _resolvePath('../src/hoc/'),
      '@/layouts': _resolvePath('../src/layouts/'),
      '@/locales': _resolvePath('../src/locales/'),
      '@/mobx': _resolvePath('../src/mobx/'),
      '@/theme': _resolvePath('../src/theme/'),
      '@/pages': _resolvePath('../src/pages/'),
      '@/routes': _resolvePath('../src/routes/'),
      '@/services': _resolvePath('../src/services/'),
      '@/utils': _resolvePath('../src/utils/'),
      '@/engine': _resolvePath('../src/engine/'),
      '@/styles': _resolvePath('../src/styles/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      cache: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:10].css',
      chunkFilename: isDev ? 'css/[id].css' : 'css/chunk.[id].[contenthash:10].css',
      ignoreOrder: true,
    }),
    new ProgressBarPlugin(),
    new LodashModuleReplacementPlugin(),
    new SpeedMeasurePlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public/commonModule', to: './commonModule' },
        { from: 'public/locale', to: './locale' },
      ],
    }),
    new ProvidePlugin({
      process: require.resolve('process/browser'),
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(tsx|jsx|js|ts)$/,
            use: ['babel-loader'],
            include: [/[\\/]node_modules[\\/].pnpm[\\/]@react-spring-web/, _resolvePath('../src')],
            // exclude: [/[\\/]node_modules[\\/]/],
          },
          {
            test: /(\.module).(css|s[ac]ss)$/,
            exclude: [/[\\/]node_modules[\\/]@nutui[\\/]nutui-react/],
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:5]',
                  },
                },
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                },
              },
            ],
          },
          {
            test: /\.(s[ac]ss|css)$/,
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              },
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require.resolve('sass'),
                  additionalData: '@import "@nutui/nutui-react/dist/styles/variables.scss";',
                },
              },
            ],
          },
          {
            test: /\.(png|svg|jpeg|jpg|gif)/,
            exclude: [/[\\/]node_modules[\\/]/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024,
              },
            },
            generator: {
              filename: 'assets/images/[hash][ext][query]',
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[hash][ext][query]',
            },
          },
          {
            test: /\.(mp3|ogg|avi|mp4|wav)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/media/[hash:10][ext][query]',
            },
          },
        ],
      },
    ],
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    vconsole: 'VConsole',
    axios: 'axios',
  },
};
