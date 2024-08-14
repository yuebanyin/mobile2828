import {
 memo, ReactNode, useCallback, useEffect, useMemo, useState 
} from 'react';
import { useGlobalStore } from '@/mobx';
import { ColorfulBall } from '@/pages/gameComponents';
import styles from './index.module.scss';

interface TouWeiButtonProps {
  index?: string | number;
  className?: string;
  ballType?: 'wcf' | 'bc' | 'wb' | 'nb' | 'none';
  bottomTitle?: number | string | ReactNode;
  onChange?: Function;
  isActive?: boolean;
  text?: string;
  numList?: any[];
  isClBtn?: boolean;
}

export const TouWeiButton = memo((props: TouWeiButtonProps) => {
  const {
 onChange, isActive = null, text, numList 
} = props;
  const { audioCKRef } = useGlobalStore();

  const [activeId, setActiveId] = useState(false);

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
        // const ret = onChange(!activeId, title, bottomTitle, index);
        const ret = true;
        if (ret) {
          setActiveId(!activeId);
        }
      }
    },
    [audioCKRef, onChange, activeId]
  );

  return (
    <div className={`w-794 m-b-30 p-20 br-20 ${mergeClassName}`} onClick={clickItem}>
      <div className='d-f ai-c'>
        <div className='m-r-20 ta-c'>
          <div className='t-44'>{text}</div>
          <div className='t-34 m-t-10 color-red'>{1 + 3.45}</div>
        </div>
        <div className='d-f flex-w'>
          {numList?.map((itNum, idx) => (
            <ColorfulBall key={itNum} className={`${idx === numList.length - 1 ? 'm-r-0' : 'm-r-6'}`} text={itNum.toString()} type='wordColorful' />
          ))}
        </div>
      </div>
    </div>
  );
});
