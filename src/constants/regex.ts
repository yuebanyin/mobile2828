/**
 * regexObj 正则表达式的定义
 * 所有的正则表达式均写在此处，方便后期维护
 */
const REGEXOBJ = {
  // 4-11 位数字或者字母
  NUMBER_OR_LETTER_4_11: /^[a-z|A-Z|0-9]{4,11}$/,
  // 8-12 位数字或者字母
  NUMBER_OR_LETTER_8_12: /^[a-z|A-Z|0-9]{8,12}$/,
  // 6-12 位数字或者字母
  NUMBER_OR_LETTER_6_12: /^[a-z|A-Z|0-9]{6,12}$/,
  // 2-8 位汉字、数字或者字母
  CHINESENUMBERORLETTER_2_8: /^[a-z|A-Z|0-9|\u4e00-\u9fa5]{2,8}$/,
  // 2-20 位汉字或者字母
  CHINESEORLETTER_2_20: /^[a-z|A-Z|\u4e00-\u9fa5]{2,20}$/,
  // 6-11 位数字[\u4e00-\u9fa5]
  NUMBER_6_11: /^1[0-9]{5,10}$/,
  // 5位数字
  NUMBER_5: /^[0-9]{5}$/,
  // 6-11 位数字[\u4e00-\u9fa5]
  PHONE_6_11: /^[0-9]{6,11}$/,
  // 银行卡号
  BANKNUMBER_LETTER_10_20: /^[1-9]([0-9]{9,19})$/,
  // QQ号
  QQ: /^[1-9]([0-9]{4,10})$/,
  // weChat
  WECHAT: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
  // 外链路由
  OUTLINK: /^((http|https|ftp|rtsp|mms)?:\/\/)/,
  // 手机号码
  PHONE_NUM: /^1[3-9]\d{9}$/,
  // 手机端
  // DEVICE_TYPE: /(Win32|Win64|Mac)/i,
  DEVICE_TYPE:
    /(Android|webOS|iPhone|iPod|BlackBerry|ios|Windows Phone|Phone|IOS)/i,
  // 纯数字
  NUMBER: /^[0-9]+$/,
  // 带有小数点数字
  NUMBERSPOIT: /^([+-]?)?\d+(\.\d*)?$/,
  // 数字千分位
  FORMATDIGIT: /\B(?=(\d{3})+(?!\d))/g,
  // 数字千分位反替换
  NOFORMATDIGIT: /\$\s?|([,|W]*)/g,
};

export { REGEXOBJ };
