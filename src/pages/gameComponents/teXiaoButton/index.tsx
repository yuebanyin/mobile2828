import {
 memo, ReactNode, useCallback, useEffect, useMemo, useState 
} from 'react';
import { useGlobalStore } from '@/mobx';
import { ColorfulBall } from '@/pages/gameComponents';
import { teXiaoNum } from '@/constants';
import styles from './index.module.scss';

interface TeXiaoButtonProps {
  index?: string | number;
  className?: string;
  size?: 'small' | 'big' | 'middle' | 'large';
  topType?: 'b' | 'none';
  title: number | string | Array<number | string>;
  ballType?: 'wcf' | 'bc' | 'wb' | 'nb' | 'none';
  bottomTitle?: number | string | ReactNode;
  onChange?: Function;
  isActive?: boolean;
  data?: object;
  isClBtn?: boolean;
  cbCurrXiao?: number;
  isTwoDigits?: boolean;
}

export const TeXiaoButton = memo((props: TeXiaoButtonProps) => {
  const {
 onChange, isActive = null, cbCurrXiao, title, index, isTwoDigits, bottomTitle 
} = props;
  const { audioCKRef } = useGlobalStore();

  const [activeId, setActiveId] = useState(false);

  const newTeXiaoNum = teXiaoNum
    .slice(0, cbCurrXiao + 1)
    .reverse()
    .concat(teXiaoNum.slice(cbCurrXiao + 1).reverse());

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setActiveId(isActive);
    }
  }, [isActive]);

  const mergeClassName = useMemo(() => {
    let csn = '';
    if (activeId) {
      csn = `bs-by-foc ${csn} ${styles['nb-bg-active']}`;
    } else {
      csn = `${csn} ${styles['nb-bg-none']}`;
    }
    return csn;
  }, [activeId]);

  const clickItem = useCallback(
    (e) => {
      e?.stopPropagation();
      // 点击音效
      if (audioCKRef?.current) {
        audioCKRef.current.currentTime = 0;
        const p = audioCKRef.current.play();
        if (p) {
          p.then(() => {
            audioCKRef.current.play();
          }).catch((e) => console.info(e));
        }
      }
      if (onChange && typeof onChange === 'function') {
        const ret = onChange(!activeId, title, bottomTitle, index);
        if (ret) {
          setActiveId(!activeId);
        }
      }
    },
    [audioCKRef, onChange, activeId, title, bottomTitle, index]
  );

  return (
    <div className={`gameBox-mid-396 p-10 br-20 m-b-30 ${mergeClassName}`} onClick={clickItem}>
      <div className='d-f jc-sb'>
        {newTeXiaoNum[index]?.map((itNum) => (
          <ColorfulBall key={itNum} className='m-r-0' isTwoDigits={isTwoDigits} text={itNum.toString()} type='wordColorful' />
        ))}
      </div>
      <div className='m-t-20 df-aic-jcc'>
        <div className='t-small m-r-20 font-w-bold'>{title}</div>
        <div className='color-game-ball-red t-small'>{bottomTitle || '@5.57'}</div>
      </div>
    </div>
  );
});
