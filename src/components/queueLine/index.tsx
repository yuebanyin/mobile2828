/**
 * QueueLine 对横向左右分布的小盒子
 * @param isBtn 是否是有按钮类型
 * @param imgClass 左图片上的样式类名
 * @param style 盒子的style样式
 * @param size 组件盒子尺寸
 * @param className 盒子上样式类型
 * @param id 队列盒子的id
 * @param text 盒子左侧展示的文案内容
 * @param src 图片地址
 * @param number 按钮类型展示的客服电话号码
 * @param isBtnText 右侧按钮类型展示文案
 * @param iconType 右侧icon类型
 * @param onItemClick 按钮上绑定的点击事件
 */
import { memo, useMemo } from 'react';
import { Button } from '../button';
import { Icon } from '../icon';
import { Img } from '../img';
import './index.scss';

interface QueueLineProps {
  isBtn?: boolean;
  imgClass?: string;
  style?: Record<string, string>;
  size?: 'small' | 'middle' | 'large' | 'mini';
  onItemClick?: Function;
  onBtnClick?: Function;
  className?: string;
  id?: string | number;
  text?: string;
  src?: string;
  number?: string | number;
  isBtnText?: string;
  iconType?: string;
}

export const QueueLine = memo((props: QueueLineProps) => {
  const {
    isBtn = false,
    style,
    className,
    imgClass,
    number,
    isBtnText,
    text,
    src,
    iconType,
    size = 'middle',
    onItemClick,
    onBtnClick,
  } = props;
  // 合并class样式
  const mergeClassName = useMemo(() => {
    let csn = `queueLine queueLine-${size} `;
    if (className) {
      csn = `${csn} ${className}`;
    }

    return csn;
  }, [className, size]);

  // 盒子或按钮绑定的点击事件
  const handleChoseItem = (item?: any) => {
    // item.stopPropagation();
    if (isBtn) {
      item.preventDefault();
      item.stopPropagation();
    }
    console.log('盒子或按钮绑定的点击事件', item);
    onItemClick && onItemClick(item);
  };

  // 合并style样式
  const mergeStyle = useMemo(
    () => ({
      ...style,
    }),
    [style]
  );

  return (
    <div
      className={mergeClassName}
      style={mergeStyle}
      onClick={handleChoseItem}
    >
      <div className='df-aic-jcc'>
        <div className={`${isBtn ? 'm-r-20' : 'm-r-50'} df-aic-jcc`}>
          <Img
            className={`${
              isBtn ? 'avatar-server' : 'img-pay-methods'
            } ${imgClass}`}
            src={src}
            isNoTheme
            alt=''
          />
        </div>
        <div className={`${isBtn ? 'wds-sm-title' : 'wds-h2'}`}>
          <div>{text}</div>
          {number ? <div className='m-t-18'>{number}</div> : ''}
        </div>
      </div>
      {isBtn ? (
        <div className='df-aic-jcc'>
          <Button
            className='w-258 h-90'
            size='small'
            text={isBtnText}
            onClick={() => {
              onBtnClick && onBtnClick();
            }}
          />
        </div>
      ) : (
        <div className='df-aic-jcc'>
          <Icon className='t-h2' name={iconType} />
        </div>
      )}
    </div>
  );
});
