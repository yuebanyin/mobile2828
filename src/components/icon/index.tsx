/**
 * Icon icon组件
 * @param name 要展示的图标名称
 * @param isPromise boolean 有异步操作的均需要传入该属性，默认为false
 * @param onClick icon 点击事件
 * @param outLoading 外层控制icon的loading状态
 */
import {
 useCallback, useMemo, useRef, useState, memo, useEffect 
} from 'react';
import { Icon as NutIcon, IconProps } from '@nutui/nutui-react';
import './index.scss';

export type IconType<T> = {
  [P in keyof T]?: T[P];
};

type AutoIconType = {
  // name: IconProps['name'];
  classLoadingName?: string;
  onClick?: Function;
  isPromise?: boolean;
  outLoading?: boolean;
};

export const Icon = memo((props: IconType<Omit<IconProps, 'onClick'>> & AutoIconType) => {
  const {
 name, isPromise, onClick, className, classLoadingName, outLoading, ...rest 
} = props;
  const [isLoading, setIsLoading] = useState(false);

  // 异步请求时判断是否点击过
  const isClick = useRef(false);

  // 外部控制loading 状态
  useEffect(() => {
    if (typeof outLoading === 'boolean' && outLoading !== isLoading) {
      isClick.current = outLoading;
      setIsLoading(outLoading);
    }
  }, [isLoading, outLoading]);

  // 控制点击处理
  const handleClick = useCallback(
    (e: any) => {
      // 异步请求时如果点击了还未得到响应就控制按钮不再让点击
      if (isClick.current) return;
      if (typeof onClick === 'function') {
        if (isPromise) {
          setIsLoading(true);
          isClick.current = true;
          new Promise((resolve, reject) => {
            onClick(e, resolve, reject);
          }).finally(() => {
            isClick.current = false;
            setIsLoading(false);
          });
        } else {
          onClick(e);
        }
      }
    },
    [onClick, isPromise]
  );

  // 合并样式
  const mergeClassName = useMemo(() => {
    if (isLoading && isPromise) {
      if (classLoadingName) {
        return `main-icon-loading ${classLoadingName}`;
      }
      return 'main-icon-loading';
    }
    if (className) {
      return `main-icon ${className}`;
    }
    return 'main-icon';
  }, [isLoading, isPromise, className, classLoadingName]);

  // 处理icon loading时展示
  const mergeName = useMemo(() => {
    if (isLoading && isPromise) {
      return 'loading';
    }
    return name;
  }, [isPromise, isLoading, name]);

  return (
    <span>
      <NutIcon name={mergeName} className={mergeClassName} onClick={handleClick} {...rest} />
    </span>
  );
});
