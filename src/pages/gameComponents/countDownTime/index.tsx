import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useGameConfigStore } from '@/mobx';
import { useSetInterval } from '@/hooks';
import { BaseReactHtml } from '@/constants';

export const useCountDownTime = (cb?: Function) => {
  const { countTime, saveCountTime, systemTip } = useGameConfigStore();

  const { clearTimer } = useSetInterval(() => {
    if (typeof countTime === 'number') {
      saveCountTime(null, (preT) => {
        typeof cb === 'function' && cb(preT - 1, systemTip);
        if (preT > 0) {
          return preT - 1;
        }
        return preT;
      });
    }
  }, 1000);

  useEffect(() => clearTimer, [clearTimer]);
};

interface CountDownTimeProps extends BaseReactHtml {
  isHours?: boolean;
}

// 格式化倒计时的时间
const formatCDT = (t: string | number, isHours?: boolean) => {
  if (typeof t === 'number') {
    // 获取秒
    const s = t % 60;
    const m = Math.floor(t / 60) % 60;
    const h = Math.floor(t / 3600) % 24;

    if (isHours) {
      return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${
        s > 9 ? s : `0${s}`
      }`;
    }
    return `${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`;
  }
  return t;
};

// 处理样式
const getCls = (t: string | number) => {
  // 封盘中或者小于10的时候字体为红色
  if (typeof t === 'string' || t <= 10) {
    return 'color-red';
  }
  return '';
};

const CountDownTime = observer((props: CountDownTimeProps) => {
  const { countTime } = useGameConfigStore();
  const { className, isHours } = props;

  return (
    <span className={`${getCls(countTime)} ${className}`}>
      {formatCDT(countTime, isHours)}
    </span>
  );
});

export default CountDownTime;
