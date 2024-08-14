import i18n from 'i18next';
import { valueArr, normalArr, rateArr, transArr, twoParmArr } from '@/constants';

// t('newKey', { goLogin: t('bankName') }) // 插值法
// t('newKey', { goLogin: '123123' }) // 插值法

export const getFormatMsg = (key: string, parm?: any[]) => {
  console.log(key, parm);
  // {key: value} //聊天室未开放！
  if (valueArr.includes(key)) {
    return i18n.t(key);
  }
  // 由于网络异常，请您稍后重试！[【1】]
  if (normalArr.includes(key)) {
    return i18n.t(key, { keyCode: parm[0] });
  }
  // 当日打码量不足【1:I】
  if (rateArr.includes(key)) {
    return i18n.t(key, { rateNum: parm[0] / 10000 });
  }
  // 游戏等级未达到【1:F】
  if (transArr.includes(key)) {
    return i18n.t(key, { tarnsText: i18n.t(parm[0]) });
  }
  // 【1】----【2】
  if (twoParmArr.includes(key)) {
    return i18n.t(key, { parm1: parm[0], parm2: parm[1] });
  }
  return i18n.t(key);
}; 
