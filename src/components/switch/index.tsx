/**
 * Switch 该组件是开关按钮封装
 * @param size 开关按钮大小
 * @param className 需要修改样式可传其他样式来覆盖
 * @param onClick 开关按钮的点击事件
 * @param isPromise boolean 有异步操作的均需要传入该属性，默认为false
 * @param prefix 自定义前缀按钮
 * @param afterfix
 * @param style 按钮的style样式 不建议使用
 */
import {
 memo, useCallback, useEffect, useMemo, useRef, useState 
} from 'react';
import type { ReactNode } from 'react';
import './index.scss';
import { Icon } from '../icon';

interface SwitchProps {
  size?: 'small' | 'middle' | 'large';
  className?: string;
  onClick?: Function;
  isCheck?:boolean;
  isPromise?: boolean;
  prefix?: ReactNode;
  afterfix?: ReactNode;
  style?: Record<string, string>;
}

export const Switch = memo((porps: SwitchProps) => {
  const {
 className, onClick, isPromise, size = 'middle', prefix, afterfix, isCheck = null 
} = porps;
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);

  // 异步请求时判断是否点击过
  const isClick = useRef(false);

  useEffect(() => {
    if (typeof isCheck === 'boolean') {
      setActive(isCheck);
    }
  }, [isCheck]);

  const mergeClassName = useMemo(() => {
    let csn = 'bx-switch';
    csn = `${csn} bx-switch-${size} ${className}`;
    if (active) {
      csn = `${csn} bx-switch-${size}-active`;
    }
    if (isLoading) {
      csn = `${csn} bx-switch-loading`;
    }
    return csn;
  }, [className, isLoading, size, active]);

  // 控制点击处理
  const handleClick = useCallback(() => {
    // 异步请求时如果点击了还未得到响应就控制按钮不再让点击
    if (isClick.current) return;
    if (typeof onClick === 'function') {
      if (isPromise) {
        setIsLoading(true);
        isClick.current = true;
        new Promise((resolve, reject) => {
          setActive((t) => {
            onClick(!t, resolve, reject);
            return t;
          });
        })
          .then(() => {
            setActive((t) => !t);
          })
          .catch(() => {
            // 此处不做操作
          })
          .finally(() => {
            isClick.current = false;
            setIsLoading(false);
          });
      } else {
        setActive((t) => {
          onClick(!t);
          return !t;
        });
      }
    }
  }, [onClick, isPromise]);

  return (
    <button type='button' onClick={handleClick} className={mergeClassName} disabled={isLoading}>
      {prefix}
      <div className='bx-switch-button'>{isLoading && <Icon className='bx-switch-prefix-loading' name='loading' />}</div>
      {afterfix}
    </button>
  );
});
