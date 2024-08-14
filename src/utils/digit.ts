import BigNumber from 'bignumber.js';
import { defaultAmount, REGEXOBJ } from '@/constants';

type NumParams = number | string;

/**
 * 不设置保留小数位数
 * @param d 需要处理数
 * @returns 处理后的数
 */
export const formatNumber = (d: NumParams) => {
  let n: NumParams = defaultAmount;
  if (REGEXOBJ.NUMBERSPOIT.test(`${d}`)) {
    const [s, e] = `${d}`.split('.');
    if (e?.length) {
      n = `${s}.${Number(e)}`;
    } else {
      n = s;
    }
  }
  return n;
};

/**
 * formatDigit 截取两位小数并设置千分位
 * @param d 需要处理的数字或者字符串类型的数字内容
 * @param dec 保留几位小数，默认是2位
 * @returns number defaultAmount
 */
export const formatDigit = (d: NumParams, dec: number = 2): NumParams => {
  // 默认等于横岗
  let n: NumParams = defaultAmount;
  // 判断d的范围才进行格式化操作
  if (REGEXOBJ.NUMBERSPOIT.test(`${d}`)) {
    let zFh = false;
    if (d.toString().indexOf('+') === 0) {
      zFh = true;
      d = d.toString().substring(1, d.toString().length);
    }
    const tmp = parseFloat(d.toString());
    let bQw = false;
    if (tmp >= 1000000 || tmp <= -1000000) {
      bQw = true;
      d = (tmp / 10000.0).toFixedEx(2);
      d = zFh ? `+${d}` : d;
    }
    const [s, e] = `${d}`.split('.');
    const len: number = e?.length || 0;
    const sta = s.replace(REGEXOBJ.FORMATDIGIT, ',');
    if (dec === 0) {
      n = sta;
    } else if (len > dec) {
      n = `${sta}.${e.slice(0, dec)}`;
    } else if (len === dec) {
      n = `${sta}.${e}`;
    } else {
      const arrZone = new Array(dec - len).fill(0).join('');
      n = `${sta}.${e || ''}${arrZone}`;
    }
    if (bQw) {
      n += 'W';
    }
  }
  return n;
};

/**
 * noFormatDigit 去掉千分位
 * @param d 需要处理的数字或者字符串类型的数字内容
 * @returns
 */
export const noFormatDigit = (d: NumParams) => {
  // 默认等于横岗
  let n: number | null = null;
  n = Number(`${d}`.replace(REGEXOBJ.NOFORMATDIGIT, ''));
  if (`${d}`.indexOf('W') !== -1) {
    return n * 10000;
  }
  return n;
};

/**
 * sum 两数之和
 * @param m 需要求和的数之一
 * @param n 需要求和的数之一
 * @param dec 最终返回的数需要保留几位小数
 * @returns 返回两数之和并且是保留位数之后的值
 */
export const sum = (m: NumParams, n: NumParams, dec: number | null = 2): NumParams => {
  let s: NumParams = defaultAmount;
  // 两个参数都有值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    s = BigNumber.sum(m, n).toString();
  }
  // m 有值，n无值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && !REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    s = m;
  }
  // m 无值，n有值
  if (!REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    s = n;
  }
  if (typeof dec !== 'number') {
    return s;
  }
  return formatDigit(s, dec);
};

/**
 * minus 两数之差
 * @param m 被减数
 * @param n 减数
 * @param dec 最终返回的数需要保留几位小数
 * @returns 返回两数之差并且是保留位数之后的值
 */
export const minus = (m: NumParams, n: NumParams, dec: number | null = 2): NumParams => {
  let mis: NumParams = defaultAmount;
  // 两个参数都有值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    let x: null | BigNumber = new BigNumber(m);
    mis = x.minus(n).toString();
    x = null;
  }
  // m 有值，n无值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && !REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    mis = m;
  }
  // m 无值，n有值
  if (!REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    mis = n;
  }
  if (typeof dec !== 'number') {
    return mis;
  }
  return formatDigit(mis, dec);
};

/**
 * multiply 两数之积
 * @param m 被乘数
 * @param n 乘数
 * @param dec 最终返回的数需要保留几位小数
 * @returns 返回两数之积并且是保留位数之后的值
 */
export const multiply = (m: NumParams, n: NumParams, dec: number | null = 2): NumParams => {
  let mul: NumParams = defaultAmount;
  // 两个参数都有值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    let x: null | BigNumber = new BigNumber(m);
    mul = x.times(n).toString();
    x = null;
  }
  // m 有值，n无值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && !REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    mul = m;
  }
  // m 无值，n有值
  if (!REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    mul = n;
  }
  if (typeof dec !== 'number') {
    return mul;
  }
  return formatDigit(mul, dec);
};

/**
 * divide 两数之商
 * @param m 被除数
 * @param n 除数
 * @param dec 最终返回的数需要保留几位小数
 * @returns 返回两数之商并且是保留位数之后的值
 */
export const divide = (m: NumParams, n: NumParams, dec: number | null = 2): NumParams => {
  let div: NumParams = defaultAmount;
  // 两个参数都有值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    let x: null | BigNumber = new BigNumber(m);
    div = x.div(n).toString();
    x = null;
  }
  // m 有值，n无值
  if (REGEXOBJ.NUMBERSPOIT.test(`${m}`) && !REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    div = m;
  }
  // m 无值，n有值
  if (!REGEXOBJ.NUMBERSPOIT.test(`${m}`) && REGEXOBJ.NUMBERSPOIT.test(`${n}`)) {
    div = n;
  }
  if (typeof dec !== 'number') {
    return div;
  }
  return formatDigit(div, dec);
};

/**
 * topoint 百分比转小数
 * @param percent 百分比入参
 * @returns
 */
export const toPoint = (percent: string) => {
  const res = Number(percent.replace('%', '')) / 100;
  return res;
};

/**
 * 
 * @param arr 需要排序的数字数组
 * @returns 
 */
export const numSort = (arr:any[]) => { 
  const newArr = arr.sort((a, b) => a - b);
  return newArr;
};
