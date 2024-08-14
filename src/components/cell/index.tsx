/**
 * Cell 是一个复合组件
 * @param type desc 单纯描述处理 normal 带有>箭头 noicon 无图标带箭头
 * @param size Cell 大小 small-100px  middle-150px large-220px
 * @param borderRadius 是否带圆角
 * @param titleClassName title需要修改的样式
 * @param title 标题显示--或左侧描述同用一个
 * @param icon 当传值为字符串时当为url
 * @param iconClassName 左侧图标样式修改
 * @param className Cell样式修改
 * @param rightSolt 自定义右侧插槽
 * @param rightDesc 右侧描述文字
 * @param rightDescClassName 右侧描述文字样式修改
 * @param isShowRight 是否显示右侧
 * @param isDivider 是否带下划线
 * @param href 跳转的路由
 */

import { memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import './index.scss';
import { Icon } from '../icon';
import { Img } from '../img';
import { OutLink } from '../outLink';

interface CellProps {
  type?: 'desc' | 'normal' | 'noicon';
  size?: 'small' | 'middle' | 'large';
  borderRadius?: '10' | '20' | '30' | '50' | '80'; //是否带圆角
  titleClassName?: string;
  title?: string | ReactNode;
  icon?: string | ReactNode;
  iconClassName?: string;
  className?: string;
  rightSolt?: ReactNode;
  arrowShow?: boolean;
  arrowType?: 'left' | 'top' | 'right' | 'down';
  arrowClassName?: string;
  rightDesc?: string;
  rightDescClassName?: string;
  isShowRight?: boolean;
  dividerFull?: boolean;
  isDivider?: boolean;
  href?: string;
  isPromise?: boolean;
  onClick?: Function;
  linkType?: number;
  target?: string;
}

export const Cell = memo((props: CellProps) => {
  const {
    type = 'normal',
    size = 'middle',
    borderRadius,
    titleClassName,
    title,
    icon,
    iconClassName,
    className,
    isShowRight = true,
    rightSolt,
    arrowShow = false,
    arrowType = 'right',
    arrowClassName,
    rightDesc,
    rightDescClassName,
    dividerFull = false,
    isDivider = true,
    href = '',
    linkType,
    target,
    isPromise,
    onClick,
  } = props;
  // 异步请求时判断是否点击过
  const isClick = useRef(false);
  //组合主体样式
  const mergeClassName = useMemo(() => {
    const csnstart = 'bx-cell';
    let csn = csnstart;
    //没有图片的情况下直接用noicon样式
    csn = icon ? `${csn}-${type}` : `${csn}-noicon`;
    csn = type === 'desc' ? `${csn}-left` : `${csn}`;
    csn = `${csn} bx-cell-${size}`;

    //只存在title的情况下切换
    csn = type === 'desc' ? `${csn} bx-cell-small` : csn;
    csn = `${csn} ${className || ''}`;
    const br = borderRadius ? `bx-cell-${borderRadius}` : '';
    return `${csnstart} ${br} ${csn}`;
  }, [className, type, size, icon, borderRadius]);

  //左边图标
  const imgNode = useMemo(() => {
    if (icon) {
      if (typeof icon === 'string') {
        return (
          <Img
            className={`bx-cell-icon ${iconClassName || ''}`}
            src={icon as string}
          />
        );
      }
      return icon as ReactNode;
    }
    return '';
  }, [icon, iconClassName]);

  //标题或描述
  const titleNode = useMemo(() => {
    if (title) {
      if (typeof title === 'string') {
        if (type === 'desc') {
          return (
            <div className={`bx-desc-text ${titleClassName || ''}`}>
              {title}
            </div>
          );
        }
        return <div className={`text ${titleClassName || ''}`}>{title}</div>;
      }
      return title as ReactNode;
    }
    return '';
  }, [titleClassName, title, type]);

  //右边插糟
  const arrowSolt = useMemo(
    () => (
      <div className={`bx-arrow ${arrowClassName || ''}`}>
        {rightDesc ? (
          <div className={rightDescClassName || ''}>{rightDesc}</div>
        ) : (
          <Icon name={`rect-${arrowType}`} />
        )}
      </div>
    ),
    [rightDesc, rightDescClassName, arrowType, arrowClassName]
  );

  //右边插糟
  const rightNodeSolt = useMemo(() => {
    if (isShowRight) {
      if (rightSolt) {
        if (arrowShow) {
          return (
            <>
              {rightSolt}
              {arrowSolt}
            </>
          );
        }
        return rightSolt;
      }
      return arrowSolt;
    }
    return '';
  }, [rightSolt, isShowRight, arrowSolt, arrowShow]);

  // 控制点击处理
  const handleClick = useCallback(
    (e: any) => {
      // 异步请求时如果点击了还未得到响应就控制按钮不再让点击
      if (isClick.current) return;
      if (typeof onClick === 'function') {
        if (isPromise) {
          isClick.current = true;
          new Promise((resolve) => {
            onClick(e, resolve);
          }).finally(() => {
            isClick.current = false;
          });
        } else {
          onClick(e);
        }
      }
    },
    [onClick, isPromise]
  );

  const cellNode = useMemo(() => {
    if (onClick && typeof onClick === 'function') {
      return (
        <div className={mergeClassName} onClick={handleClick}>
          {imgNode}
          <div className='bx-cell-c'>
            <div className='bx-cell-content'>
              {titleNode}
              {rightNodeSolt}
            </div>
            {isDivider ? (
              <div
                className={`bx-cell-dvd ${
                  icon || dividerFull ? '' : 'bx-dvd-l-50'
                }`}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      );
    }
    return (
      <div className={mergeClassName}>
        {imgNode}
        <div className='bx-cell-c'>
          <div className='bx-cell-content'>
            {titleNode}
            {rightNodeSolt}
          </div>
          {isDivider ? (
            <div
              className={`bx-cell-dvd ${
                icon || dividerFull ? '' : 'bx-dvd-l-50'
              }`}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }, [
    onClick,
    mergeClassName,
    imgNode,
    titleNode,
    rightNodeSolt,
    isDivider,
    icon,
    dividerFull,
    handleClick,
  ]);

  //主体显示
  const rootNode = useMemo(() => {
    if (type === 'desc') {
      return cellNode;
    }
    if (href === null || href === undefined) {
      return cellNode;
    }

    return (
      <OutLink
        type={linkType || -2}
        href={href}
        target={(target || '_blank') as any}
      >
        {cellNode}
      </OutLink>
    );
  }, [type, href, linkType, target, cellNode]);

  return <>{rootNode}</>;
});
