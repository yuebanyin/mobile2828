/**
 * SingleColorBall 该组件是单色小球组件
 * @param text 彩色小球的文字 形式为<MajiangBall text='1'/> 方式
 * @param className 需要修改样式可传其他样式来覆盖
 * @param bgColor 小球背景颜色
 * @param isTwoDigits 是否要前补齐0
 */

import { memo, useMemo } from 'react';
import { autoSupplementStart } from '@/utils/tools';
import styles from './index.module.scss';

interface SingleColorProps {
  text: string|number;
  className?: string;
  bgColor?: 'singRed' | 'singGold';
  isTwoDigits?: boolean;
}

export const SingleColorBall = memo((props: SingleColorProps) => {
  const {
 text, className, bgColor = 'singRed', isTwoDigits = false 
} = props;

  const mergeClassName = useMemo(() => {
    let csn = 'df-aic-jcc';
    csn = `${csn} ${bgColor}`;
    if (bgColor === 'singRed') {
      csn = `${csn} bg-squ-eight`;
    } else if (bgColor === 'singGold') {
      csn = `${csn} bg-gdt-main`;
    }
    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [bgColor, className]);

  const showText = useMemo(() => {
    if (isTwoDigits) {
      return autoSupplementStart(text, 2, '0');
    }
    return text;
  }, [isTwoDigits, text]);

  return <div className={`${styles['singleColor-ball']} ${mergeClassName}`}>{showText}</div>;
});
