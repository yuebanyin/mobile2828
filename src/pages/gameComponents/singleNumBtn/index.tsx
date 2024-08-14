import {
 ReactNode, useCallback, useEffect, useMemo, useState 
} from 'react';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '@/mobx';
import { ColorfulBall } from '../colorfulBall';
import styles from './index.module.scss';

interface SingleNumBtnProps {
  index?: string | number;
  className?: string;
  ballClass?: string;
  size?: 'small' | 'big' | 'middle' | 'large';
  topType?: 'b' | 'none';
  title: number | string;
  bottomTitle?: number | string | ReactNode;
  onChange?: Function;
  isActive?: boolean;
  data?: object;
  isClBtn?: boolean;
  getNumArr?: Function;
  ballType?: 'wordColorful' | 'borderColorful' | 'wordBorder' | 'normal' | 'bgColorful' | 'bgGrey';
}

export const SingleNumBtn = observer((props: SingleNumBtnProps) => {
  const {
 className, size = 'small', title = 0, isActive = null, ballClass, ballType = 'normal', onChange 
} = props;

  const { audioCKRef } = useGlobalStore();

  const [activeId, setActiveId] = useState(false);

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setActiveId(isActive);
    }
  }, [isActive]);

  const mergeClassName = useMemo(() => {
    let csn = 'df-aic-jcc p-r';
    csn = `${csn} ${styles['nb-bg']} ${styles[size]} ${styles['fs']}`;
    if (className) {
      csn = `${csn} ${className}`;
    }

    if (activeId) {
      csn = `bs-by-foc ${csn} ${styles['nb-bg-active']}`;
    } else {
      csn = `${csn} ${styles['nb-bg-none']}`;
    }
    return csn;
  }, [className, size, activeId]);

  const clickItem = useCallback(
    (e) => {
      e?.stopPropagation();
      if (audioCKRef?.current) {
        audioCKRef.current.currentTime = 0;
        const p = audioCKRef.current.play();
        if (p) {
          p.then(() => {
            audioCKRef.current.play();
          }).catch((e) => console.info(e));
        }
      }
      if (onChange) {
        onChange({ cb: () => setActiveId(!activeId), active: !activeId, title });
      }
    },
    [audioCKRef, onChange, activeId, title]
  );

  return (
    <div className={`${mergeClassName} fd-c`} onClick={clickItem}>
      <ColorfulBall text={title} className={`w-62 h-62 t-40 m-r-6 ${ballClass}`} type={ballType} />
    </div>
  );
});
