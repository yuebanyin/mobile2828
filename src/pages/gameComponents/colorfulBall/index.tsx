/**
 * ColorfulBall 该组件是首页个性化按钮封装
 * @param text 彩色小球的文字 形式为<MajiangBall text='1'/> 方式
 * @param className 需要修改样式可传其他样式来覆盖
 * @param borderColor 小球边框颜色
 * @param isTwoDigits 是否要前补齐0
 * @param type wordColorful:内容彩色(边框白灰\背景色);borderColorful:边框彩色 wordBorder:内容边框同色;
 */

import {
 memo, useEffect, useMemo, useRef 
} from 'react';
import { autoSupplementStart } from '@/utils/tools';
import styles from './index.module.scss';

interface ColorfulBallProps {
  text?: string | number;
  className?: string;
  isTwoDigits?: boolean;
  type?: 'wordColorful' | 'borderColorful' | 'wordBorder' | 'normal' | 'bgColorful' | 'bgGrey';
  getCpos?: Function;
  params?: any;
}

const numMap = {
  red: ['1', '2', '7', '8', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
  blue: ['3', '4', '9', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'],
  green: ['0', '5', '6', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'],
};

export const ColorfulBall = memo((props: ColorfulBallProps) => {
  const {
 text, className, isTwoDigits = false, type, getCpos, params 
} = props;

  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 获取当前坐标
    if (ballRef.current && typeof getCpos === 'function') {
      const cpos = ballRef.current.getBoundingClientRect();
      if (cpos.height) {
        getCpos(cpos, params);
      }
    }
  }, [getCpos, params]);

  //计算数字球的颜色值
  const findColor = (value, compare = (a, b) => a.includes(b.toString())) => Object.keys(numMap).find((k) => compare(numMap[k], value));

  const mergeClassName = useMemo(() => {
    let csn = 'df-aic-jcc bc-grey';

    const getColor = findColor(`${Number(text)}`);
    if (type === 'wordColorful') {
      csn = `${csn} color-game-ball-${getColor}`;
    } else if (type === 'borderColorful') {
      csn = `${csn} color-primary-text bc-${getColor}`;
    } else if (type === 'wordBorder') {
      csn = `${csn} bc-${getColor} color-game-ball-${getColor}`;
    } else if (type === 'normal') {
      csn = `${csn} color-primary-text`;
    } else if (type === 'bgColorful') {
      csn = `${csn} color-white bg-game-ball-${getColor}`;
    } else if (type === 'bgGrey') {
      csn = `${csn} color-white bg-game-ball-grey`;
    }

    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [className, text, type]);

  const showText = useMemo(() => {
    if (isTwoDigits) {
      return autoSupplementStart(text.toString(), 2, '0');
    }
    return text;
  }, [isTwoDigits, text]);

  return (
    <div ref={ballRef} className={`${styles['colorful-ball']} ${mergeClassName}`}>
      {showText}
    </div>
  );
});
