import {
 memo, useCallback, useMemo, useState 
} from 'react';
import { Obj } from '@/constants';
import {
 banbanBo, banBo, seBo, tabListFirst as tabList3402 
} from '../../constFiles/const3402';
import styles from './index.module.scss';
import { TouWeiButton } from '@/pages/gameComponents';

export interface SeBoProps {
  curPeriodNumber: string;
  childrenData: Obj | any[];
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  className?: string;
  titleIdx?: number;
  cbCurrXiao?: number;
}

const seBoTab = [
  {
    title: '色波',
    id: 1,
    list: seBo,
  },
  {
    title: '半波',
    id: 2,
    list: banBo,
  },
  {
    title: '半半波',
    id: 3,
    list: banbanBo,
  },
];

export const SeBo = memo((props: SeBoProps) => {
  const {
 className, curGameId, titleIdx, curPeriodNumber, ik, childrenData, handleBetClick, getItememMultip 
} = props;

  console.log('curPeriodNumber, ik', curPeriodNumber, ik);

  const [activeId, setActiveId] = useState(1);

  const tabList = useMemo(() => {
    switch (curGameId) {
      case 3402:
        return [tabList3402[titleIdx]].flat();
      default:
        return [];
    }
  }, [curGameId, titleIdx]);

  const childList = useMemo(() => {
    switch (activeId) {
      case 1:
        return childrenData['sbArr']?.slice(0, 3);
      case 2:
        return childrenData['sbArr']?.slice(3, 15);
      case 3:
        return childrenData['sbArr']?.slice(15, 27);
      default:
        return [];
    }
  }, [activeId, childrenData]);

  /**
   * i: 任选色波类型按钮
   */
  const getCls = useCallback(
    (id: number) => {
      let csn = 't-40 df-aic-jcc b-r-1 bc-split w-260 h-100';

      if (id === activeId) {
        csn = `${csn} ${styles['nb-bg-active']}`;
      } else {
        csn = `${csn} ${styles['nb-bg-none']}`;
      }
      return csn;
    },
    [activeId]
  );

  // 选择色波类型按钮
  const handleClickType = (item) => {
    if (item.id !== activeId) {
      setActiveId(item.id);
    }
  };
  return (
    <div className={`${className} m-r-10`}>
      {tabList.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>{it.title}</div>
          <div className='d-f m-b-30'>
            {seBoTab.map((item) => (
              <div key={item.id} className={`${getCls(item.id)}`} onClick={() => handleClickType(item)}>
                {item.title}
              </div>
            ))}
          </div>
          <div>
            {childList.map((item, i) => (
              <TouWeiButton
                key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                numList={seBoTab[activeId - 1].list[i]}
                text={item.text}
                onChange={(o) => handleBetClick({ ...o, ...item })}
                bottomTitle={getItememMultip(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
//
