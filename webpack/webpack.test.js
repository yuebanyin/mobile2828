// const { merge } = require('webpack-merge');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const path = require('path');
// const baseConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
// const path = require('path');
// const glob = require('glob');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${{ src: path.resolve(__dirname, '../src') }}`, { nodir: true }),
    //   safelist: {
    //     standard: [/^nut-/],
    //     deep: [/css__module__/],
    //   },
    // }),
  ],
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    runtimeChunk: true,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    usedExports: true,
    sideEffects: true,
    minimizer: [
      new CssMinimizerWebpackPlugin({
        parallel: 4,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        parallel: 4,
        extractComments: false,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: false,
            drop_debugger: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 10 * 1024,
      // minChunks: 2,
      cacheGroups: {
        nutuiReact: {
          name: 'nutui-react',
          test: /[\\/]node_modules[\\/]_?@nutui[\\/]nutui-react(.*)/,
          chunks: 'all',
          priority: 7,
          minSize: 0,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          chunks: 'all',
          // enforce: true,
          name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    open: true,
    hot: true,
    liveReload: false,
    static: false,
    client: {
      logging: 'info',
      // progress: true,
    },
    proxy: {
      '/ApiV1': {
        target: 'http://192.168.3.222:8080/', // 内网
        // target: 'https://h5.ruyi28vip.com',
        //https://api.ktvstories.com
        changeOrigin: true,
        // pathRewrite: { '^/ApiV1/': '/Api/' },
      },
      // mockApi: {
      //   target: '',
      //   pathRewrite: {
      //   },
      // },
    },
  },
});
