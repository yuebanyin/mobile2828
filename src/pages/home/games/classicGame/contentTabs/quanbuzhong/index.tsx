import { memo, useCallback, useEffect, useState } from 'react';
import { Obj } from '@/constants';
import { isArray, numSort } from '@/utils/tools';
import styles from './index.module.scss';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { toastText } from '@/components';
import { useGameConfigStore } from '@/mobx';
import { useLanguage } from '@/hooks';

export interface QuanbuProps {
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
  nums?: number;
  tabList?: any[];
}

const tipObj = Object.freeze({
  0: {
    t: 'WU_BU_ZHONG_MAX_7',
    b: 'WU_BU_ZHONG_MIN_5',
    len: 5,
    max: 7,
  },
  1: {
    t: 'LIU_BU_ZHONG_MAX_8',
    b: 'LIU_BU_ZHONG_MIN_6',
    len: 6,
    max: 8,
  },
  2: {
    t: 'QI_BU_ZHONG_MAX_9',
    b: 'QI_BU_ZHONG_MIN_7',
    len: 7,
    max: 9,
  },
  3: {
    t: 'BA_BU_ZHONG_MAX_10',
    b: 'BA_BU_ZHONG_MIN_8',
    len: 8,
    max: 10,
  },
  4: {
    t: 'JIU_BU_ZHONG_MAX_11',
    b: 'JIU_BU_ZHONG_MIN_9',
    len: 9,
    max: 11,
  },
  5: {
    t: 'SHI_BU_ZHONG_MAX_12',
    b: 'SHI_BU_ZHONG_MIN_10',
    len: 10,
    max: 12,
  },
  6: {
    t: 'SHIYI_BU_ZHONG_MAX_12',
    b: 'SHIYI_BU_ZHONG_MIN_11',
    len: 11,
    max: 13,
  },
  7: {
    t: 'SHIER_BU_ZHONG_MAX_12',
    b: 'SHIER_BU_ZHONG_MIN_12',
    len: 12,
    max: 14,
  },
});

export const Quanbu = memo((props: QuanbuProps) => {
  const {
    className,
    childrenData,
    getItememMultip,
    handleBetClick,
    topNode,
    nums,
    tabList = [],
    curPeriodNumber,
    ik,
  } = props;

  const { setBetLenTip } = useGameConfigStore();
  const { formatMsg } = useLanguage();

  const [numArr, setNumList] = useState([]); // 存取选中数字

  const [activeObj, setActiveObj] = useState({
    activeId: 0,
    qbzItem: { ...childrenData[tabList[0].listKey][0] } || {},
  });

  useEffect(() => {
    if (numArr.length < tipObj[activeObj.activeId].len) {
      setBetLenTip(`${tipObj[activeObj.activeId].b}`);
    } else {
      setBetLenTip(null);
    }
  }, [numArr.length, setBetLenTip, activeObj.activeId]);

  // 定义号码球
  const numsList = Array.from({ length: nums }, (_, index) => index + 1);

  /**
   * i: 任选全不中按钮
   */
  const getCls = useCallback(
    (i: number) => {
      let csn = 't-40 df-aic-jcc b-r-1 b-b-1 bc-split';

      if (i === activeObj.activeId) {
        csn = `${csn} ${styles['nb-bg-active']}`;
      } else {
        csn = `${csn} ${styles['nb-bg-none']}`;
      }
      return csn;
    },
    [activeObj.activeId]
  );

  const handleClickQbz = (item, i) => {
    if (i !== activeObj.activeId) {
      setNumList([]);
      setActiveObj({ activeId: i, qbzItem: item });
    }
  };

  useEffect(
    () => () => {
      setBetLenTip(null);
    },
    [setBetLenTip]
  );

  return (
    <div className={`${className} m-r-10`}>
      {tabList.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className={`d-f flex-w m-b-30 ${topNode ? 'm-b-30' : ''}`}>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => (
                <div
                  key={item.mutil}
                  className={`h-80 w-200 ${getCls(i)}`}
                  onClick={() => handleClickQbz(item, i)}
                >
                  {formatMsg(item.text)}
                </div>
              ))}
          </div>
          <div className='d-g col-5'>
            {numsList.map((item, i) => (
              <NumberButton
                key={
                  0 ||
                  `${curPeriodNumber}-${it.key}-${i}-${ik}-${activeObj.activeId}`
                }
                title={item}
                className='m-b-30'
                isClBtn
                bottomTitle={getItememMultip(activeObj.qbzItem)}
                onChange={(o) => {
                  console.warn({ o });
                  // 如果已经选择了10个号码，并且当前还是新选中的号码就提示
                  if (
                    numArr.length >= tipObj[`${activeObj.activeId}`].max &&
                    o.active
                  ) {
                    toastText(formatMsg(tipObj[activeObj.activeId].t));
                    return false;
                  }
                  const newArr = numArr.includes(o.title)
                    ? [...numArr.filter((it) => it !== o.title)]
                    : [...numArr, o.title];
                  setNumList(numSort(newArr));
                  handleBetClick({
                    ...activeObj.qbzItem,
                    ...o,
                    item,
                    numArr: numSort(newArr),
                    len: tipObj[`${activeObj.activeId}`].len,
                    mode_type: 'plzh',
                  });
                  return true;
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
//
