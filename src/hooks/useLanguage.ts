import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { valueArr, normalArr, rateArr, transArr, twoParmArr } from '@/constants';
// t('newKey', { goLogin: t('bankName') }) // 插值法
// t('newKey', { goLogin: '123123' }) // 插值法

export const useLanguage = () => {
  const { t } = useTranslation();
  const formatMsg = useCallback(
    (key: string, parm?: any[]) => {
      // {key: value} //聊天室未开放！
      if (valueArr.includes(key)) {
        return t(key);
      }
      // 由于网络异常，请您稍后重试！[【1】]
      if (normalArr.includes(key)) {
        return t(key, { keyCode: parm[0] });
      }
      // 当日打码量不足【1:I】
      if (rateArr.includes(key)) {
        return t(key, { rateNum: parm[0] / 10000 });
      }
      // 游戏等级未达到【1:F】
      if (transArr.includes(key)) {
        return t(key, { tarnsText: t(parm[0]) });
      }
      // 【1】----【2】
      if (twoParmArr.includes(key)) {
        return t(key, { parm1: parm[0], parm2: parm[1] });
      }
      return t(key);
    },
    [t]
  );
  return { formatMsg };
};
