module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 750设计标准
      rootValue: 108,
      // 转换成的rem后，保留小数点后几位
      unitPrecision: 5,
      /**
       * 将会被转换的css属性列表，
       * 设置为*表示全部，['*','*position*','!letter-spacing','!font*']
       * *position* 表示所有包含 position 的属性
       * !letter-spacing 表示非 letter-spacing 属性
       * !font* 表示非font-size font-weight ... 等的属性
       * */
      propList: ['*', '!letter-spacing'],
      // 不会被转换的class选择器名，支持正则
      // selectorBlackList: ['.px-'],
      replace: true,
      // 允许在媒体查询中转换`px`
      mediaQuery: false,
      // 小于1px的将不会被转换
      minPixelValue: 1.1,
    },
  },
  autoprefixer: {
    browsers: ['Android >= 4.0', 'iOS >= 7'],
  },
};
