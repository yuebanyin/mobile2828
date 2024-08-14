import {
 ReactNode, useEffect, useMemo, useState, useCallback, forwardRef, useImperativeHandle 
} from 'react';
import { BaseReactHtml } from '@/constants';
import { CTransition } from '../transition';
import { Icon } from '../icon';
import './index.scss';

interface PopupProps extends BaseReactHtml {
  title?: ReactNode;
  titleClassName?: string;
  iconName?: string;
  isIcon?: boolean;
  isTitle?: boolean;
  sourceNode?: ReactNode | Function;
  contentClassName?: string;
  visible?: boolean;
  isPromise?: boolean;
  onClose?: Function;
  direction?: 'right' | 'bottom';
  isScroll?: boolean;
  sourceNodeCls?: string;
}

export const Popup = forwardRef((props: PopupProps, ref) => {
  const {
    children,
    contentClassName,
    visible,
    direction = 'right',
    sourceNode,
    className,
    onClose,
    title = '12',
    titleClassName,
    iconName,
    isIcon = true,
    isTitle = true,
    isScroll = true,
    sourceNodeCls,
  } = props;
  const [open, setOpen] = useState(false);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    if (typeof visible === 'boolean') {
      setOpen(visible);
    }
  }, [visible]);

  const mergeBodyClassName = useMemo(() => {
    let csn = 'bx-popup-content';
    if (isScroll) {
      csn = `${csn} o-y`;
    }
    csn = `${csn} bx-popup-content-${direction} ${contentClassName || ''}`;
    return csn;
  }, [direction, contentClassName, isScroll]);

  const mergeClassName = useMemo(() => {
    let csn = 'bx-popup full-screen-center w-full h-full d-f flex-1 bg-mask bs-primary';
    if (direction === 'right') {
      csn = `${csn} jc-end`;
    } else if (direction === 'bottom') {
      csn = `${csn} ai-end`;
    }
    if (className) {
      csn = `${csn} ${className}`;
    }
    if (isIn) {
      csn = `${csn} ani-opacity`;
    } else {
      csn = `${csn} ani-opacity-no`;
    }
    return csn;
  }, [direction, className, isIn]);

  // 阻止默认事件
  const handleBodyClick = useCallback((e) => {
    e?.stopPropagation();
    e?.preventDefault();
  }, []);

  // 关闭弹层
  const handleClick = useCallback(() => {
    setIsIn(false);
    if (typeof onClose === 'function') onClose();
  }, [onClose]);

  // 抛出关闭的方法
  useImperativeHandle(ref, () => ({
    onClose: handleClick,
  }));

  const tClassName = useMemo(() => {
    let csn = 'd-f ai-c jc-sb bx-popup-title';
    if (titleClassName) {
      csn = `${csn} ${titleClassName}`;
    }
    return csn;
  }, [titleClassName]);

  return (
    <>
      {open && (
        <div className={mergeClassName} onClick={handleClick}>
          <CTransition timeout={500} in={isIn} classNames={`bx-${direction}`} onExited={() => setOpen(false)}>
            <div className={mergeBodyClassName} onClick={handleBodyClick}>
              {isTitle && (
                <div className={tClassName}>
                  <div />
                  {title}
                  {isIcon && <Icon onClick={handleClick} name={iconName || 'close'} />}
                </div>
              )}
              {children}
            </div>
          </CTransition>
        </div>
      )}
      <span
        className={sourceNodeCls}
        onClick={() => {
          setOpen(true);
          setIsIn(true);
        }}
      >
        {typeof sourceNode === 'function' ? sourceNode(isIn) : sourceNode}
      </span>
    </>
  );
});
