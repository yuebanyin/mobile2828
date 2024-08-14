/** 此文件放置公用的游戏常量 */
/**
 * 处理复合初始化赔率和动态赔率的逻辑
 * @param {any[]} init
 * @param {Record<string, any[]>} move
 * @returns {Record<string, any[]>}
 */
export const handleOdds = (init, move) => {
  console.warn({ init, move });
  return {};
};

/**
 *
 * @param gameId 当前游戏Id
 * @returns 特殊赔率得下标号码集合
 */
export const specialNumList = (gameId) => {
  let specialNum = [];

  switch (gameId) {
    case 2801:
    case 2802:
    case 2803:
    case 2804:
    case 2901:
      specialNum = [33, 34, 35, 36, 37, 38];
      break;
    case 2903:
      specialNum = [79, 80];
      break;
    case 3402:
      specialNum = [121, 122, 144];
      break;
    case 3501:
      specialNum = [22, 24, 25, 27, 28];
      break;
    default:
      break;
  }
  return specialNum;
};

/**
 * 定义号码球数组
 * @param len 号码球数组的长度
 */
export const getNumArray = (len = 49) =>
  Array.from({ length: len }, (_, index) => {
    if (index < 9) {
      return `0${index + 1}`;
    }
    return index + 1;
  });

/** 中或者不中 */
export const zbz = [
  { key: 'z', text: 'ZHONG' },
  { key: 'bz', text: 'BU_ZHONG' },
];

/** 合肖的title */
export const hxTitle = [
  {
    key: 'ys',
    text: 'YE_SHOU',
    keys: [
      { t: 'SHU', idx: 0 },
      { t: 'HU', idx: 2 },
      { t: 'TU', idx: 3 },
      { t: 'LONG', idx: 4 },
      { t: 'SHE', idx: 5 },
      { t: 'HOU', idx: 8 },
    ],
  },
  {
    key: 'jq',
    text: 'JIA_QIN',
    keys: [
      { t: 'NIU', idx: 1 },
      { t: 'MA', idx: 6 },
      { t: 'YANG', idx: 7 },
      { t: 'JI', idx: 9 },
      { t: 'GOU', idx: 10 },
      { t: 'ZHU', idx: 11 },
    ],
  },
  {
    key: 'l',
    text: 'ZUO',
    keys: [
      { t: 'SHU', idx: 0 },
      { t: 'HU', idx: 2 },
      { t: 'LONG', idx: 4 },
      { t: 'MA', idx: 6 },
      { t: 'HOU', idx: 8 },
      { t: 'GOU', idx: 10 },
    ],
  },
  {
    key: 'r',
    text: 'YOU',
    keys: [
      { t: 'NIU', idx: 1 },
      { t: 'TU', idx: 3 },
      { t: 'SHE', idx: 5 },
      { t: 'YANG', idx: 7 },
      { t: 'JI', idx: 9 },
      { t: 'ZHU', idx: 11 },
    ],
  },
  {
    key: 'qx',
    text: 'QIAN_XIAO',
    keys: [
      { t: 'SHU', idx: 0 },
      { t: 'NIU', idx: 1 },
      { t: 'HU', idx: 2 },
      { t: 'TU', idx: 3 },
      { t: 'LONG', idx: 4 },
      { t: 'SHE', idx: 5 },
    ],
  },
  {
    key: 'hx',
    text: 'HOU_XIAO',
    keys: [
      { t: 'MA', idx: 6 },
      { t: 'YANG', idx: 7 },
      { t: 'HOU', idx: 8 },
      { t: 'JI', idx: 9 },
      { t: 'GOU', idx: 10 },
      { t: 'ZHU', idx: 11 },
    ],
  },
  {
    key: 'tx',
    text: 'TIAN_XIAO',
    keys: [
      { t: 'NIU', idx: 1 },
      { t: 'TU', idx: 3 },
      { t: 'LONG', idx: 4 },
      { t: 'MA', idx: 6 },
      { t: 'HOU', idx: 8 },
      { t: 'ZHU', idx: 11 },
    ],
  },
  {
    key: 'dx',
    text: 'DI_XIAO',
    keys: [
      { t: 'SHU', idx: 0 },
      { t: 'HU', idx: 2 },
      { t: 'SHE', idx: 5 },
      { t: 'YANG', idx: 7 },
      { t: 'JI', idx: 9 },
      { t: 'GOU', idx: 10 },
    ],
  },
];

// 生肖映射用来获取今年生肖
const sxMap = {
  0: 'HOU',
  1: 'JI',
  2: 'GOU',
  3: 'ZHU',
  4: 'SHU',
  5: 'NIU',
  6: 'HU',
  7: 'TU',
  8: 'LONG',
  9: 'SHE',
  10: 'MA',
  11: 'YANG',
};

/**
 * 今年的生肖
 */
export const curyearsx = sxMap[`${new Date().getFullYear() % 12}`];

// 生肖连尾数连默认选中title
export const defaultSltTitles = [
  {
    t: 'XIAO_LIAN_2',
    key: '2',
  },
  {
    t: 'WEI_LIAN_2',
    key: '2',
  },
];
