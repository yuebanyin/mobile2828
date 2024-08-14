/**
 * hooks-useSetInterval
 * @params callback 需要定时执行的操作
 * @params delay 间隔时间，默认是3s
 */
import { useCallback, useEffect, useRef } from 'react';

type Callback = () => void | undefined;

export const useSetInterval = (callback: Callback, delay = 3000) => {
  const savedCallback = useRef<Callback>();
  const timerRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    // 内部定义ref接收外部传入的函数
    savedCallback.current = callback;
  });

  // 清除
  const clearTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  }, []);

  useEffect(() => {
    // 用一个普通函数包裹下
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    timerRef.current = setInterval(tick, delay);
    return clearTimer;
  }, [clearTimer, delay]);

  return { clearTimer };
};
