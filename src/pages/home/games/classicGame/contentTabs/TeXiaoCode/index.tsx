import {
 memo, useCallback, useMemo, useState 
} from 'react';
import { Obj, shengXiao } from '@/constants';
import { tabListFirst as tabList3402 } from '../../constFiles/const3402';
import { TeXiaoButton } from '@/pages/gameComponents/teXiaoButton';
import { isArray } from '@/utils/tools';
import styles from './index.module.scss';

export interface TeXiaoCodeProps {
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
}

export const TeXiaoCode = memo((props: TeXiaoCodeProps) => {
  const {
 className, cbCurrXiao, curGameId, titleIdx, curPeriodNumber, ik, handleBetClick, childrenData, topNode 
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
      let csn = 't-40 df-aic-jcc b-r-1 b-b-1 bc-split p-16-38';

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
          <div className={`${styles['topNodeBtn']} ${topNode ? 'm-b-30' : ''}`}>
            {topNode
              && isArray(childrenData[it.listKey])
              && childrenData[it.listKey].map((item, i) => {
                if (i < childrenData[it.listKey].length / 2) {
                  return (
                    <div className={`${getCls(i)} ${i === 8 ? styles['ten'] : ''} ${i === 9 ? styles['eleven'] : ''}`} onClick={() => handleClickLx(item, i)}>
                      {item.text}
                    </div>
                  );
                }
                return '';
              })}
          </div>
          <div className='d-f flex-w jc-sb'>
            {shengXiao.map((item, i) => (
              <TeXiaoButton onChange={(o) => handleBetClick({ ...o, item })} bottomTitle={11} index={i} key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`} title={item} cbCurrXiao={cbCurrXiao} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
