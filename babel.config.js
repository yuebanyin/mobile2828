module.exports = {
  presets: [['@babel/preset-typescript', { allowNamespaces: true }], ['@babel/preset-react', { runtime: 'automatic' }], ['@babel/preset-env']],
  plugins: [
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    // [
    //   'import',
    //   {
    //     libraryName: '@nutui/nutui-react',
    //     libraryDirectory: 'dist/esm',
    //     style: true,
    //     camel2DashComponentName: false,
    //   },
    //   'nutui-react',
    // ],
  ],
};

