/**
 * 此组件用于 生肖（特、一、合、连）、半波、尾数连
 */
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useGlobalStore } from '@/mobx';
import { ColorfulBall } from '@/pages/gameComponents';
// import { teXiaoNum } from '@/constants';
import styles from './index.module.scss';
import { isArray } from '@/utils/tools';
import { useLanguage } from '@/hooks';

interface SXButtonProps {
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
  numList?: number[];
}

export const SXButton = memo((props: SXButtonProps) => {
  const {
    onChange,
    isActive = null,
    title,
    numList,
    bottomTitle,
    index,
  } = props;
  const { audioCKRef } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const [activeId, setActiveId] = useState(false);

  // const newSXNum = teXiaoNum
  //   .slice(0, cbCurrXiao + 1)
  //   .reverse()
  //   .concat(teXiaoNum.slice(cbCurrXiao + 1).reverse());

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
        const ret = onChange({
          active: !activeId,
          title,
          bottomTitle,
          index,
        });
        if (ret) {
          setActiveId(!activeId);
        }
      }
    },
    [audioCKRef, onChange, activeId, title, bottomTitle, index]
  );

  return (
    <div
      className={`p-t-20 p-b-20 br-20 m-b-30 ${mergeClassName}`}
      onClick={clickItem}
    >
      <div className='d-f jc-c'>
        {isArray(numList) &&
          numList.map((n) => (
            <ColorfulBall
              key={n}
              className='m-r-10'
              text={`${n}`}
              type='wordColorful'
            />
          ))}
      </div>
      <div className='m-t-20 df-aic-jcc'>
        <div className='t-small m-r-20 font-w-bold'>
          {formatMsg(`${title}`)}
        </div>
        {bottomTitle && (
          <div className='color-game-ball-red t-small font-w-bold'>
            @{bottomTitle}
          </div>
        )}
      </div>
    </div>
  );
});
