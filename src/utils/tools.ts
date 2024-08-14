// export * from "./dayjs";
import i18n from 'i18next';
import { fullWithUI, REGEXOBJ } from '@/constants';
import { toastText } from '@/components';

export * from './encryption';
export * from './localStorage';
export * from './digit';
export * from './dayjs';

/**
 * handleExcep 处理异常
 */
export const handleExcep = (callback: () => void) => {
  try {
    if (typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    //
  }
};

type OBJ = Record<string, any>;

/**
 * isEmpty 非空判断
 * @param p 要判断的值
 * @return boolean
 */
export const isNoEmpty = (p: any): boolean => {
  // 如果p 是boolean值直接返回
  switch (typeof p) {
    case 'boolean':
      return p;
    case 'object':
      if (p) {
        if (Array.isArray(p)) {
          return !!p.length;
        }
        return !!Object.keys(p).length;
      }
      return false;
    case 'string':
    case 'undefined':
      return !!p;
    case 'number':
      // 为 0 时等于true
      return true;
    default:
      return !!p;
  }
};

/**
 * isObject 判断一个对象是否是对象
 * @param t 要判断的对象
 * @returns boolean
 */
export const isObject = (t: OBJ): boolean => {
  if (t && typeof t === 'object') return true;
  return false;
};

/**
 * isArray 判断是否是数组
 * @param arr 要判断的数组
 * @returns boolean
 */
export const isArray = (arr: any): boolean => Array.isArray(arr);

/**
 * omit 忽略对象中的某一个键值对
 * @param sourceObj 要忽略的源对象
 * @param ignoreKeys 要忽略源对象中key集合
 * @return targetObj 最终返回忽略后的新对象
 */
export const omit = (sourceObj: OBJ, ignoreKeys: string[]) => {
  if (isNoEmpty(sourceObj) && isNoEmpty(ignoreKeys)) {
    const targetObj: OBJ = {};
    Object.keys(sourceObj).forEach((key: string) => {
      if (!ignoreKeys.includes(key)) {
        targetObj[key] = sourceObj[key];
      }
    });
    return targetObj;
  }
  return sourceObj;
};

/**
 * pick 抽出对象中的某一些键值返回一个新的对象
 * @param sourceObj 源对象
 * @param drawOutKeys 要抽出源对象中key集合
 * @return targetObj 最终返回抽出后的新对象
 */
export const pick = (sourceObj: OBJ, drawOutKeys: string[]) => {
  if (isNoEmpty(sourceObj) && isNoEmpty(drawOutKeys)) {
    const targetObj: OBJ = {};
    Object.keys(sourceObj).forEach((key: string) => {
      if (drawOutKeys.includes(key)) {
        targetObj[key] = sourceObj[key];
      }
    });
    return targetObj;
  }
  return sourceObj;
};

/**
 * debounce 防抖函数
 * @param func 需要防抖的函数
 * @param delay 时间
 * @returns
 */
export const debounce = (func: Function, delay: number = 1000) => {
  let timer: any = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (typeof func === 'function') func();
      clearTimeout(timer);
    }, delay);
  };
};

/**
 * throttle 节流函数
 * @param func 需要节流的函数
 * @param delay 时间 毫秒数
 * @returns
 */

export const throttle = (func: Function, delay: number = 1000) => {
  let timer = null;
  let startTime = Date.now();
  return () => {
    const nowTime = Date.now();
    if (timer) clearTimeout(timer);
    if (nowTime - startTime >= delay) {
      if (typeof func === 'function') func();
      startTime = Date.now();
    } else {
      timer = setTimeout(() => {
        if (typeof func === 'function') func();
      }, delay);
    }
  };
};

/**
 * copyText 复制文字的方法
 * @param text 需要复制的文字
 */
export const copyText = (text: string) => {
  if (navigator?.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // toastText('复制成功');
        toastText(`${i18n.t('copySuccess')}`);
      })
      .catch(() => {
        // toastText('复制失败，请重试');
        toastText(`${i18n.t('copyFaileTryAgain')}`);
      });
  } else {
    let textarea: HTMLTextAreaElement | null = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.zIndex = '-1';
    textarea.value = text;
    textarea.select();
    document.execCommand('copy', true);
    // toastText('复制成功');
    toastText(`${i18n.t('copySuccess')}`);
    document.body.removeChild(textarea);
    textarea = null;
  }
};

/**
 * getRandomNumber 获取随机数
 * @param dight 获取几位数
 */
export const getRandomNumber = (dight = 4) => {
  const num = ['0', '2', '3', '4', '5', '6', '7', '8', '9'];
  let code = '';
  for (let i = 0; i < dight; i += 1) {
    // const element = array[index];
    const index = Math.floor(Math.random() * (num.length - 1));
    code += num[index];
  }
  return code;
};

/**
 * uipxtodevicepx UI设计稿的尺寸计算为当前设备的尺寸
 * @param p UI设计稿的尺寸
 */
export const uipxtodevicepx = (p: string | number) => {
  const px = parseInt(`${p}`, 10);
  const devicepx = parseInt(`${(px / fullWithUI) * window?.flexible?.rem}`, 10);
  return devicepx;
};

//--------------以下偏向于业务的方法---------------

/**
 * autoSupplementStart 自动补充
 * @param val 处理值
 * @param num 位数
 * @param type 补充的类型
 * @returns
 */
export const autoSupplementStart = (val, num, type) => val.toString().padStart(num, type);
export const autoSupplementEnd = (val, num, type) => val.toString().padEnd(num, type);

/**
 * @description: 动态解析KindTip描述处理
 * @return {*}
 */
export const getContentDesc = (content: string) => {
  if (content) {
    if (content.length === 0) return [];
    const tmp = content.split('\n');
    const list = [];
    for (let index = 0; index < tmp.length; index += 1) {
      list.push({ text: tmp[index], id: index + 1 });
    }
    return list;
  }
  return [];
};
/**
 * @description: 动态解析KindTip描述处理
 * @return {*}
 */
export const getTipsDesc = (content: string) => {
  if (content) {
    if (content.length === 0) return { title: '', list: [] };
    const tmp = content.split('\n');
    const list = [];
    for (let index = 1; index < tmp.length; index += 1) {
      list.push({ text: tmp[index], id: index + 1 });
    }
    return { title: tmp.length ? tmp[0] : '', list };
  }
  return { title: '', list: [] };
};

/**
 * 获取设备信息
 * @returns {
 *   deviceInfo 设备信息
 *   systemVer 系统信息
 *   clientKind 设备对应id
 * }
 */
export function getDeviceInfo() {
  const u = navigator?.userAgent;
  let version = '';
  const isMobile = !!navigator?.platform?.match(REGEXOBJ.DEVICE_TYPE);
  let deviceId;
  if (u.indexOf('Mac OS X') > -1) {
    // ios
    const regStr_saf = /OS [\d._]*/gi;
    const verinfo = u.match(regStr_saf);
    version = `IOS${`${verinfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')}`;
    deviceId = isMobile ? 32 : 66;
  } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android
    version = `Android${u.substr(u.indexOf('Android') + 8, u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8)}`;
    deviceId = isMobile ? 16 : 65;
  } else if (u.indexOf('BB10') > -1) {
    // 黑莓bb10系统
    version = `blackberry${u.substr(u.indexOf('BB10') + 5, u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5)}`;
    deviceId = isMobile ? 16 : 65;
  } else if (u.indexOf('IEMobile') > -1) {
    // windows phone
    version = `winphone${u.substr(u.indexOf('IEMobile') + 9, u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9)}`;
    deviceId = isMobile ? 16 : 65;
  } else {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('windows nt 5.0') > -1) {
      version = 'Windows 2000';
    } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
      version = 'Windows XP';
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {
      version = 'Windows Vista';
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      version = 'Windows 7';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
      version = 'Windows 8';
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {
      version = 'Windows 8.1';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
      version = 'Windows 10';
    } else {
      version = 'Unknown';
    }
    deviceId = 64;
  }
  return {
    deviceInfo: isMobile ? u : '', // pc网页端不传设备信息
    systemVer: version,
    clientKind: deviceId,
  };
}

/**
 * 格式化倒计时的时间
 * @param t 时间
 * @param isHours
 * @returns
 */
export const formatCDT = (t: string | number, isHours?: boolean) => {
  if (typeof t === 'number') {
    // 获取秒
    const s = t % 60;
    const m = Math.floor(t / 60) % 60;
    const h = Math.floor(t / 3600) % 24;

    if (isHours) {
      return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
    }
    return `${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
  }
  return t;
};
