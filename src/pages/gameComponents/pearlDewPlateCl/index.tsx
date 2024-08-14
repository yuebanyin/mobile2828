/**
 * 珠露盘组件 长龙专用
 */
import { memo } from 'react';
import { isArray } from '@/utils/tools';
import styles from './index.module.scss';
import { useLanguage } from '@/hooks';

interface PearlDewPlateClProps {
  size?: 'normal' | 'small';
  ballType?: 'ball' | 'circle';
  data?: any[];
  className?: string;
}

export const PearlDewPlateCl = memo((props: PearlDewPlateClProps) => {
  const { size = 'normal', data, className, ballType = 'ball' } = props;
  const { formatMsg } = useLanguage();

  const getBallCls = (text: string) => {
    let cls = '';
    if (ballType === 'ball') {
      // if (['单', '大', '龙'].includes(text)) {
      if (
        [formatMsg('DAN'), formatMsg('DA'), formatMsg('LONG')].includes(text)
      ) {
        cls = 'bg-game-ball-red t-small';
      } else {
        cls = 'bg-game-ball-blue t-small';
      }
      if (size === 'small') {
        cls = `${cls} t-30`;
      }
    } else if (
      [formatMsg('DAN'), formatMsg('DA'), formatMsg('LONG')].includes(text)
    ) {
      cls = 'bc-red t-small';
    } else {
      cls = 'bc-blue t-small';
    }
    return text ? cls : '';
  };

  return (
    <div className={className}>
      {isArray(data) &&
        data.map((its, i) => (
          <div key={`${i}` || its}>
            {isArray(its) &&
              its.map((it, j) => (
                <div
                  className={styles[`ball-box-${size}-${ballType}`]}
                  key={`${i}${j}` || it}
                >
                  <div
                    className={`${
                      styles[`ball-${size}-${ballType}`]
                    } br-half ta-c color-white ${getBallCls(it)}`}
                  >
                    {it}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
});
