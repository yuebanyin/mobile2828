import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { defaultTimeOptions, week } from '@/constants';
import type { DefaultTimeOptions } from '@/constants';
import { time } from './time';

dayjs.extend(utc);
dayjs.extend(tz);

type DaysParams = string | number | Date | dayjs.Dayjs | null | undefined;

type JsDate = string | number | Date;

/** 以下是获取UTC0时区的数据 */
const getUTCYear = (d?: JsDate) => new Date(d as JsDate).getUTCFullYear();
const getUTCMonth = (d?: JsDate) => new Date(d as JsDate).getUTCMonth();
const getUTCDay = (d?: JsDate) => new Date(d as JsDate).getUTCDate();
const getUTCHours = (d?: JsDate) => new Date(d as JsDate).getUTCHours();
const getUTCMins = (d?: JsDate) => new Date(d as JsDate).getUTCMinutes();
const getUTCSeconds = (d?: JsDate) => new Date(d as JsDate).getUTCSeconds();

// 获取美国东部时区的时间字符串（默认获取当时）
const getESTDate = (d?: JsDate) => {
  const time = d || new Date();
  return new Date(time).toLocaleString('en-US', defaultTimeOptions as DefaultTimeOptions);
};

/** 以下是美国纽约时间 */
const getESTmmddyyyy = (d?: JsDate) => getESTDate(d).split(' ')[1].replace(',', '');
const getESThms = (d?: JsDate) => getESTDate(d).split(' ')[2];
const getESTYear = (d?: JsDate) => Number(getESTmmddyyyy(d).split('/')[2]);
const getESTMonth = (d?: JsDate) => Number(getESTmmddyyyy(d).split('/')[0]) - 1;
const getESTDay = (d?: JsDate) => Number(getESTmmddyyyy(d).split('/')[1]);
const getESTHours = (is0?: number, d?: JsDate) => {
  let data = Number(getESThms(d).split(':')[0]);
  if (is0 === 0 && Number(data) === 24) {
    data = 0;
  }
  return Number(data);
};
const getESTMins = (d?: JsDate) => Number(getESThms(d).split(':')[1]);
const getESTSeconds = (d?: JsDate) => Number(getESThms(d).split(':')[2]);
// 获取某时间在美国是周几
export const getWeekDay = (d?: JsDate) => {
  const usDay = getESTDate(d).split(' ')[0].replace(',', '');
  return week.findIndex((e: string) => e === usDay);
};

/**
 * isUSDst 判断是否是美东夏令时
 * @returns boolean
 */
export const isUSDst = () => {
  const UTCyear = getUTCYear();
  const UTCmonth = getUTCMonth();
  const UTCdate = getUTCDay();
  const UTChours = getUTCHours();
  const UTCminutes = getUTCMins();
  const UTCseconds = getUTCSeconds();
  const us = +new Date(getESTYear(), getESTMonth(), getESTDay(), getESTHours(0), getESTMins(), getESTSeconds());
  const utc = +new Date(UTCyear, UTCmonth, UTCdate, UTChours, UTCminutes, UTCseconds);
  const timeDiff = (us - utc) / 1000 / 60 / 60;
  if (timeDiff === -5) {
    return false;
  }
  return true;
};

// 定义时间展示的几种格式
const formatTypeObj = {
  _YMDHms: 'YYYY-MM-DD HH:mm:ss',
  _YMDhms: 'YYYY-MM-DD hh:mm:ss',
  _YMD: 'YYYY-MM-DD',
  _YM: 'YYYY-MM',
  _MDHms: 'MM-DD HH:mm:ss',
  _MD: 'MM-DD',
  YMDHms: 'YYYYMMDD HH:mm:ss',
  YMDhms: 'YYYYMMDD hh:mm:ss',
  YMD: 'YYYYMMDD',
  YM: 'YYYYMM',
  MDHms: 'MMDD HH:mm:ss',
  MD: 'MMDD',
  SYMDHms: 'YYYY/MM/DD HH:mm:ss',
  SYMDhms: 'YYYY/MM/DD hh:mm:ss',
  SYMD: 'YYYY/MM/DD',
  SYM: 'YYYY/MM',
  SMDHms: 'MM/DD HH:mm:ss',
  SMD: 'MM/DD',
  Hms: 'HH:mm:ss',
  hms: 'hh:mm:ss',
};

type FORMAT_TYPE = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD hh:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD HH:mm:ss' | 'MM-DD' | 'YYYY/MM/DD HH:mm:ss';

type FORMAT_TYPE_PARAM = 'YMDHms' | 'YMDhms' | 'YMD' | 'YM' | 'MDHms' | 'MD' | '_YMDHms' | '_YMD' | 'hms' | 'Hms';

type DateUnit = 'day' | 'week' | 'month' | 'year';

const getFormat = (type: FORMAT_TYPE_PARAM = 'YMDHms'): FORMAT_TYPE => formatTypeObj[type] as FORMAT_TYPE;

/**
 * formatDate 格式化时间
 * @param date 需要格式化的时间，可以不传，默认为当天
 * @param formType 需要展示的时间格式，可以不传，默认是年月日时分秒
 * @returns 返回格式化后的字符串
 */
const formatDate = (date?: DaysParams, formType?: FORMAT_TYPE_PARAM) => dayjs(date).format(getFormat(formType));

/**
 * 可展示对应时区
 * @param date 时间戳
 */
const formatTZDate = (date?: number, timezone?: string, formType?: FORMAT_TYPE_PARAM) => dayjs.unix(date).tz(timezone).format(getFormat(formType));

/**
 * getUSATime 获取某个时间再转美东的时间
 * @param d 需要转换成美东的时间
 * @param formType 要展示什么格式
 * @returns string 最终格式化后的时间
 */
export const getUSATime = (d?: JsDate, type: FORMAT_TYPE = 'YYYY-MM-DD HH:mm:ss'): string => {
  const t = d || new Date();
  // 默认24小时制，这里可修改为12小时制
  if (type.indexOf('hms') !== -1) {
    defaultTimeOptions.hour12 = true;
  }
  // 获取美东时间字符串
  const timeStr = new Date(t).toLocaleString('en-US', defaultTimeOptions as DefaultTimeOptions);
  // 数组分割获取年月日、时分秒
  const [, mdy, hms] = timeStr.split(' ');
  let time = '';
  // 获取年月日
  if (type.indexOf('YYYY-MM-DD') !== -1) {
    const [m, day, y] = mdy.split('/');
    time = `${y.slice(0, 4)}-${m}-${day}`;
  } else if (type.indexOf('YYYYMMDD') !== -1) {
    const [m, day, y] = mdy.split('/');
    time = `${y.slice(0, 4)}${m}${day}`;
  }
  // 获取时分秒
  if (type.indexOf('HH:mm:ss') !== -1 || type.indexOf('hh:mm:ss') !== -1) {
    time = `${time} ${hms}`;
  }
  return time;
};

/**
 * getBeiJingTime 获取某个时间再转北京的时间 (对标: getUSATime)
 * @param d 需要转换成北京的时间
 * @param formType 要展示什么格式
 * @returns string 最终格式化后的时间
 */
export const getBeiJingTime = (d?: JsDate, type: FORMAT_TYPE = 'YYYY-MM-DD HH:mm:ss'): string => {
  const t = d || new Date();
  // 默认24小时制，这里可修改为12小时制
  if (type.indexOf('hms') !== -1) {
    defaultTimeOptions.hour12 = true;
  }
  // 获取东八区时间字符串
  const timeStr = new Date(t).toLocaleString('zh-CN');
  // 数组分割获取年月日、时分秒
  const [mdy, hms] = timeStr.split(' ');
  let time = '';
  // 获取年月日
  if (type.indexOf('YYYY-MM-DD') !== -1) {
    const [y, m, day] = mdy.split('/');
    time = `${y}-${m}-${day}`;
  } else if (type.indexOf('YYYYMMDD') !== -1) {
    const [y, m, day] = mdy.split('/');
    time = `${y}${m}${day}`;
  }
  // 获取时分秒
  if (type.indexOf('HH:mm:ss') !== -1 || type.indexOf('hh:mm:ss') !== -1) {
    time = `${time} ${hms}`;
  }

  console.log('东八区时间', time);
  return time;
};

/**
 * getUTCBeiJingTime 获取某个时间再转北京的时间 (对标: getUTCTime)
 * @param d 需要转换成北京的时间
 * @param bend  是否结尾时间
 * @returns string 最终格式化后的时间
 */
export const getUTCBeiJingTime = (d?: JsDate, bend?: boolean): string => {
  let time = '';
  try {
    const t = d || new Date();
    const type = 'YYYY-MM-DD HH:mm:ss';
    // 默认24小时制，这里可修改为12小时制
    if (type.indexOf('hms') !== -1) {
      defaultTimeOptions.hour12 = true;
    }
    // 获取东八区时间字符串
    const timeStr = new Date(t).toLocaleString('zh-CN');
    // 数组分割获取年月日、时分秒
    const [mdy] = timeStr.split(' ');

    // 获取年月日
    if (type.indexOf('YYYY-MM-DD') !== -1) {
      const [y, m, day] = mdy.split('/');
      time = `${y}-${m}-${day}`;
    } else if (type.indexOf('YYYYMMDD') !== -1) {
      const [y, m, day] = mdy.split('/');
      time = `${y}${m}${day}`;
    }
    const start = '00:00:00';
    const end = '23:59:59';
    // 获取时分秒
    if (type.indexOf('HH:mm:ss') !== -1 || type.indexOf('hh:mm:ss') !== -1) {
      time = `${time} ${bend !== null && bend ? end : start}`;
    }
  } catch (error) {
    console.log(error);
  }
  return time;
};

export const getUTCTime = (d?: JsDate, bend?: boolean): string => {
  let time = '';
  try {
    const t = d || new Date();
    const type = 'YYYY-MM-DD HH:mm:ss';
    // 默认24小时制，这里可修改为12小时制
    if (type.indexOf('hms') !== -1) {
      defaultTimeOptions.hour12 = true;
    }
    // 获取美东时间字符串
    const timeStr = new Date(t).toLocaleString('en-US', defaultTimeOptions as DefaultTimeOptions);
    // 数组分割获取年月日、时分秒
    const [, mdy] = timeStr.split(' ');

    // 获取年月日
    if (type.indexOf('YYYY-MM-DD') !== -1) {
      const [m, day, y] = mdy.split('/');
      time = `${y.slice(0, 4)}-${m}-${day}`;
    } else if (type.indexOf('YYYYMMDD') !== -1) {
      const [m, day, y] = mdy.split('/');
      time = `${y.slice(0, 4)}${m}${day}`;
    }
    const start = '00:00:00';
    const end = '23:59:59';
    // 获取时分秒
    if (type.indexOf('HH:mm:ss') !== -1 || type.indexOf('hh:mm:ss') !== -1) {
      time = `${time} ${bend !== null && bend ? end : start}`;
    }
  } catch (error) {
    console.log(error);
  }
  return time;
};

/**
 * getMinusDate 获取以某个日期开始之前的日期
 * @param n 要减去几个单位
 * @param date 以改天为基点，默认是当天
 * @param dateUnit 要减去的单位，默认是天
 * @param formType 最终展示的格式，默认是 YYYY-MM-DD
 * @returns 返回减去后的日期字符串
 */
const getMinusDate = (n: number, date?: DaysParams, dateUnit?: DateUnit, formType?: FORMAT_TYPE_PARAM) => dayjs(date)
    .subtract(n, dateUnit || 'day')
    .format(formType || 'YMD');

/**
 * getAddDate 获取以某个日期开始之后的日期
 * @param n 要增加几个单位
 * @param date 以改天为基点，默认是当天
 * @param dateUnit 要增加的单位，默认是天
 * @param formType 最终展示的格式，默认是 YYYY-MM-DD
 * @returns 返回增加后的日期字符串
 */
const getAddDate = (n: number, date?: DaysParams, dateUnit?: DateUnit, formType?: FORMAT_TYPE_PARAM) => dayjs(date)
    .add(n, dateUnit || 'day')
    .format(formType || 'YMD');

/**
 * isTimeBefore 判断m 是否在n之前
 * @param m
 * @param n
 * @returns boolean
 */
const isTimeBefore = (m: DaysParams, n: DaysParams) => dayjs(m).isBefore(dayjs(n));

/**
 * isTimeAfter 判断m 是否在n之后
 * @param m
 * @param n
 * @returns boolean
 */
const isTimeAfter = (m: DaysParams, n: DaysParams) => dayjs(m).isAfter(dayjs(n));

/**
 * isTimeBefore 判断m n 是否是同一时间
 * @param m
 * @param n
 * @returns boolean
 */
const isTimeSame = (m: DaysParams, n: DaysParams) => dayjs(m).isSame(dayjs(n));

export type TimeRangeKey =
  | 'today' // 今日
  | 'yesterday' // 昨日
  | 'lastWeek' // 近一周
  | 'last7days' // 近7日
  | 'halfMonth' // 近2周
  | 'last15days' // 近15日
  | 'last30days' // 近30日
  | 'lastMonth' // 近一月
  | 'lastQuarter' // 近一季度
  | 'nearlyHalfAYear' // 近半年
  | 'lastYear' // 近一年
  | 'all'; // 不限时间

// 如意项目全局美东时间修改成东八区时间：
//getTimeRange 方法内 getUTCTime-----> getUTCBeiJingTime; getUSATime-----------> getBeiJingTime

/**
 * timeRange 时间范围
 * @param key 某个时间区间的key
 */
const getTimeRange = (key: TimeRangeKey) => {
  switch (key) {
    case 'all':
      return {
        startTime: '2000-01-01 00:00:00',
        endTime: '2999-12-31 23:59:59',
      };
    case 'today':
      return {
        startTime: getUTCBeiJingTime(dayjs().startOf('d').format(formatTypeObj.SYMDHms)),
        endTime: getUTCBeiJingTime(dayjs().startOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'yesterday':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(1, 'day').endOf('d').format(formatTypeObj.SYMDHms)),
        endTime: getUTCBeiJingTime(dayjs().subtract(1, 'day').endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'lastWeek':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(1, 'week').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms), true),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'last7days':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(7, 'day').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms), true),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'halfMonth':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(2, 'week').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms)),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'last15days':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(15, 'day').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms), true),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'last30days':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(30, 'day').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms), true),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'lastMonth':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(1, 'month').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms)),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'lastQuarter':
      return {
        startTime: getUTCBeiJingTime(dayjs().subtract(3, 'month').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms), false),
        endTime: getUTCBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms), true),
      };
    case 'nearlyHalfAYear':
      return {
        startTime: getBeiJingTime(dayjs().subtract(6, 'month').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms)),
        endTime: getBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms)),
      };
    case 'lastYear':
      return {
        startTime: getBeiJingTime(dayjs().subtract(1, 'year').add(1, 'day').startOf('d')
.format(formatTypeObj.SYMDHms)),
        endTime: getBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms)),
      };
    default:
      return {
        startTime: getBeiJingTime(dayjs().startOf('d').format(formatTypeObj.SYMDHms)),
        endTime: getBeiJingTime(dayjs().endOf('d').format(formatTypeObj.SYMDHms)),
      };
  }
};

const getDateDurationCurrent = (choseTime: any) => {
  const isBefore = isTimeBefore(choseTime, new Date());
  if (isBefore) {
    return 0;
  }
  const nowDate = new Date();
  const choseDate = new Date(choseTime);
  // const cha = choseDate.getTime() - nowDate.getTime()
  // const durationDays = parseInt((cha / (24*60*60*1000)).toString())
  const durationDays = dayjs(choseDate).diff(dayjs(nowDate), 'day');
  return durationDays;
};

const getSubDateDay = (start: Date, end: Date): number => {
  const strEnd = time.format(end, 'yyyy-MM-dd');
  const strStart = time.format(start, 'yyyy-MM-dd');
  return dayjs(strEnd).diff(strStart, 'day');
};

export {
 formatDate, getMinusDate, getAddDate, isTimeBefore, isTimeAfter, isTimeSame, getTimeRange, getDateDurationCurrent, getSubDateDay, formatTZDate 
};
