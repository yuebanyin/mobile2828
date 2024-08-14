/**
 * MajiangBall 该组件是首页个性化按钮封装
 * @param text 麻将块的文字 形式为<MajiangBall text='1'/> 方式
 * @param className 需要修改样式可传其他样式来覆盖
 */

import { memo, useMemo } from 'react';
import styles from './index.module.scss';

interface MajiangProps {
  text: string | number;
  className?: string;
}

// 控制颜色
const numMap = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

export const MajiangBall = memo((props: MajiangProps) => {
  const { text, className } = props;

  const mergeClassName = useMemo(() => {
    let csn = 'df-aic-jcc';
    csn = `${csn} bg-squ-${numMap[text]}`;

    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [className, text]);

  return (
    <div className={`${styles['majiang-ball']} ${mergeClassName}`}>{text}</div>
  );
});
