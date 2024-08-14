const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts', 'tsx', 'jsx'],
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    maxAge: 3600,
  },
  optimization: {
    nodeEnv: 'development',
  },
  devServer: {
    compress: true,
    port: 8081,
    host: '0.0.0.0',
    open: true,
    hot: false, // 热更新
    liveReload: true, // react 插件
    static: false,
    client: {
      logging: 'info',
      // progress: true,
    },
    proxy: {
      '/ApiV1': {
        // target: 'http://192.168.3.222:8080',
        // target: 'https://local-www.ktvstories.com',
        // target: 'https://www.devruyi28.com', // 如意测试网
        target: 'http://111.119.211.207:8080', 
        // target:  'https://h5.ruyi28vip.com', // 如意正式服（一般情况下禁止使用）
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
