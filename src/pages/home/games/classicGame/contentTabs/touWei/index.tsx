import { useCallback, useMemo, useState } from 'react';
import { isArray } from '@/utils/tools';
import { lwArr, tabListFirst as tabList3402 } from '../../constFiles/const3402';
import { Obj } from '@/constants';
import { TouWeiButton } from '@/pages/gameComponents';
import styles from './index.module.scss';

export interface TouWeiProps {
  curPeriodNumber: string;
  childrenData: Obj | any[];
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  className?: string;
  titleIdx?: number;
  cbCurrXiao?: number;
  topNode?: boolean;
  numList?: any[];
}

export const TouWei = (props: TouWeiProps) => {
  const {
 className, curGameId, titleIdx, childrenData, numList, handleBetClick, topNode = false, curPeriodNumber, ik 
} = props;
  const [activeId, setActiveId] = useState(0);

  const tabList = useMemo(() => {
    switch (curGameId) {
      case 3402:
        return [tabList3402[titleIdx]].flat();
      default:
        return [];
    }
  }, [curGameId, titleIdx]);

  /**
   * i: 任选连肖按钮
   */
  const getCls = useCallback(
    (i: number) => {
      let csn = 't-40 df-aic-jcc b-r-1 bc-split p-16-38';

      if (i === activeId) {
        csn = `${csn} ${styles['nb-bg-active']}`;
      } else {
        csn = `${csn} ${styles['nb-bg-none']}`;
      }
      return csn;
    },
    [activeId]
  );

  const handleClickLx = (item, i) => {
    if (i !== activeId) {
      console.log('item::', item);
      setActiveId(i);
    }
  };

  return (
    <div className={`${className} m-r-10`}>
      {tabList.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>{it.title}</div>
          <div className={`d-f ${topNode ? ' m-b-30' : ''}`}>
            {topNode
              && isArray(childrenData[it.listKey])
              && childrenData[it.listKey].map((item, i) => {
                if (i < childrenData[it.listKey].length / 2) {
                  return (
                    <div className={getCls(i)} key={`头尾${i + 1}`} onClick={() => handleClickLx(item, i)}>
                      {item.text}
                    </div>
                  );
                }
                return '';
              })}
          </div>
          <div className='d-f flex-w'>
            {topNode
              ? lwArr.map((item, i) => <TouWeiButton key={`${i + 19}`} onChange={(o) => handleBetClick({ ...o, item })} numList={numList[i]} text={item} />)
              : childrenData[it.listKey].map((item, i) => (
                <TouWeiButton key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`} onChange={(o) => handleBetClick({ ...o, ...item })} numList={numList[i]} text={item.text} />
                ))}
          </div>
        </div>
      ))}
    </div>
  );
};
