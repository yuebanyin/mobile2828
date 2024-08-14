/**
 * Button 该组件是首页个性化按钮封装
 * @param text 按钮的文字 形式为<Button text='按钮'/> 方式
 * @param children 也可以 <Button>按钮</Button> 注意：该参数和text必须二选一
 * @param type 按钮类别  primary 主按钮 link 多用于弹窗取消确定中的按钮 disabled 禁用状态
 * @param size 按钮大小
 * @param className 需要修改样式可传其他样式来覆盖
 * @param onClick 按钮的点击事件
 * @param isPromise boolean 有异步操作的均需要传入该属性，默认为false
 * @param prefix 自定义前缀按钮
 * @param loading 通过外部控制laoding
 * @param style 按钮的style样式 不建议使用
 */
import {
 memo, useCallback, useEffect, useMemo, useRef, useState 
} from 'react';
import type { ReactNode } from 'react';
import './index.scss';
import { Icon } from '../icon';

interface ButtonProps {
  text?: string;
  children?: ReactNode;
  type?: 'primary' | 'link' | 'disabled' | 'link-dark' | 'hollow' | 'hollow-pri' | 'hollow-d';
  size?: 'small' | 'middle' | 'large' | 'mini' | 'nano' | 'h-nano' | 'h-d-nol';
  className?: string;
  onClick?: Function;
  isPromise?: boolean;
  prefix?: ReactNode;
  loading?: boolean;
  style?: Record<string, string>;
}

export const Button = memo((porps: ButtonProps) => {
  const {
 text, className, onClick, isPromise, type = 'primary', size = 'middle', prefix, children, loading 
} = porps;
  const [isLoading, setIsLoading] = useState(false);

  // 异步请求时判断是否点击过
  const isClick = useRef(false);

  useEffect(() => {
    if (typeof loading === 'boolean') {
      isClick.current = loading;
    }
  }, [loading]);

  const mergeClassName = useMemo(() => {
    let csn = 'bx-button';
    csn = `${csn} bx-button-${type} bx-button-${size} ${className}`;
    if (isLoading || loading) {
      csn = `${csn} bx-button-loading`;
    }
    return csn;
  }, [type, className, isLoading, loading, size]);

  // 控制点击处理
  const handleClick = useCallback(
    (e: any) => {
      // 异步请求时如果点击了还未得到响应就控制按钮不再让点击
      if (isClick.current) return;
      if (typeof onClick === 'function') {
        if (isPromise) {
          setIsLoading(true);
          isClick.current = true;
          new Promise((resolve) => {
            onClick(e, resolve);
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

  // 处理前缀
  const prefixNode = useMemo(() => {
    // 如果有前缀
    if (prefix) {
      return <div className='bx-button-prefix'>{isLoading || loading ? <Icon className='bx-button-prefix-loading' name='loading' /> : prefix}</div>;
    }
    // 如果没有前缀，又是在loading中，就展示loading
    // if (isLoading || loading) {
    //   return (
    //     <div className='bx-button-prefix'>
    //       <Icon className='bx-button-prefix-loading' name='loading' />
    //     </div>
    //   );
    // }
    return '';
  }, [prefix, isLoading, loading]);

  return (
    <button type='button' onClick={handleClick} className={mergeClassName} disabled={Boolean(type === 'disabled')}>
      {prefixNode}
      {text && <div className='bx-button-text'>{text}</div>}
      {children}
    </button>
  );
});
