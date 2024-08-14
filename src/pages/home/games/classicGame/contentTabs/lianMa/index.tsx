/**
 * 连码专用细节点
 * 数字最多只能选10个
 * 不能低于标题个数（例如4全中，最少要选4个）
 * 切换模式之前选中清空
 */
import { memo, useCallback, useEffect, useState } from 'react';
import { SingleNumBtn } from '@/pages/gameComponents';
// import styles from './index.module.scss';
import { Obj } from '@/constants';
// import { getGameMcom } from '@/utils/game';
import { getNumArray } from '../../constFiles/constCommon';
import { useGameConfigStore } from '@/mobx';
import { toastText } from '@/components';
import { useLanguage } from '@/hooks';

// 背景色：bg-gdt-foc
interface LianMaProps {
  ik?: number;
  curPeriodNumber: string;
  renBtnCls?: string;
  childrenData?: Obj | any[];
  getItememMultip?: Function;
  handleBetClick?: Function;
  onClear: Function;
  curGameId?: string | number;
  getStandNum?: Function;
  tabList?: any[];
}

const tipObj = Object.freeze({
  0: { t: 'SI_QUAN_ZHOGN_MIN_4', min: 4 },
  1: { t: 'SAN_QUAN_ZHOGN_MIN_3', min: 3 },
  2: { t: 'SAN_ZHOGN_ER_MIN_3', min: 3 },
  3: { t: 'ER_QUAN_ZHOGN_MIN_2', min: 2 },
  4: { t: 'ER_ZHOGN_TE_MIN_2', min: 2 },
  5: { t: 'TE_CHUAN_MIN_2', min: 2 },
});

export const LianMa = memo((props: LianMaProps) => {
  const {
    ik,
    childrenData,
    getItememMultip,
    handleBetClick,
    tabList = [],
  } = props;

  const { formatMsg } = useLanguage();

  const [activeObj, setActiveObj] = useState({
    activeId: 0,
    key: '四全中',
    lianMaItem:
      {
        ...childrenData[tabList[0].listKey][0],
        tMutil: childrenData[tabList[0].listKey][0].child[1]?.tMutil || '',
        mutilV: childrenData[tabList[0].listKey][0].child[0]?.mutilV || '',
        mutilTV: childrenData[tabList[0].listKey][0].child[1]?.mutilTV || '',
      } || {},
  });
  const { setBetLenTip } = useGameConfigStore();

  const [numArr, setNumList] = useState([]); // 存取选中数字

  useEffect(() => {
    if (tipObj[`${activeObj.activeId}`].min > numArr.length) {
      setBetLenTip(tipObj[activeObj.activeId].t);
    } else {
      setBetLenTip(null);
    }
    return () => {
      setBetLenTip(null);
    };
  }, [activeObj.activeId, numArr.length, setBetLenTip]);

  useEffect(() => {}, [ik]);

  useEffect(
    () => () => {
      setBetLenTip(null);
    },
    [setBetLenTip]
  );

  const handleClickLianMa = (item: Obj, i: number) => {
    if (i === activeObj.activeId) {
      return false;
    }
    setNumList([]);
    setActiveObj({
      activeId: i,
      key: item.text,
      lianMaItem:
        {
          ...childrenData[tabList[0].listKey][i],
          tMutil: childrenData[tabList[0].listKey][i].child[1]?.tMutil || '',
          mutilV: childrenData[tabList[0].listKey][i].child[0]?.mutilV || '',
          mutilTV: childrenData[tabList[0].listKey][i].child[1]?.mutilTV || '',
        } || null,
    });
    return '';
  };

  // 选择号码球
  const handleChange = useCallback(
    (o, item) => {
      // console.warn({ o });
      // 如果已经选择了10个号码，并且当前还是新选中的号码就提示
      if (numArr.length >= 10 && o.active) {
        toastText(formatMsg('MAX_10'));
      } else {
        o.cb();
        // getItememMultip 入口页无法监控到 动态赔率moveOdds 实时更新
        getItememMultip(activeObj.lianMaItem);
        const newArr = numArr.includes(o.title)
          ? [...numArr.filter((it) => it !== o.title)]
          : [...numArr, o.title];
        setNumList(newArr);
        handleBetClick({
          ...activeObj.lianMaItem,
          ...o,
          item,
          numArr: newArr,
          len: tipObj[`${activeObj.activeId}`].min,
          mode_type: 'plzh',
        });
      }
    },
    [
      activeObj.activeId,
      activeObj.lianMaItem,
      formatMsg,
      getItememMultip,
      handleBetClick,
      numArr,
    ]
  );

  return (
    <div className='m-t-30 m-l-30 m-r-30 p-b-220 o-y h-full'>
      {tabList.map((it, i) => (
        <div key={`${i + 1}`}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='bg-body m-b-30 d-g col-3'>
            {childrenData[it.listKey].map((item, i) => (
              <div
                className={`b-1 bc-grey df-fdc ai-c jc-sb p-20 ${
                  i === activeObj.activeId ? 'bg-gdt-foc' : ''
                }`}
                onClick={() => handleClickLianMa(item, i)}
                key={`${item.key + i}`}
              >
                <div className='t-40 font-w-bold'>{formatMsg(item?.text)}</div>
                <div className='df-aic-jcc m-t-10'>
                  {item?.child?.map((it) => (
                    <div
                      key={0 || `${it.text}-${i}-${ik}`}
                      className='t-30 m-r-4'
                    >
                      <span>{formatMsg(it.text)}</span>
                      {getItememMultip(it)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className='d-g col-5'>
        {getNumArray().map((item) => (
          <SingleNumBtn
            key={`${+item + 1 + activeObj.key}`}
            title={item}
            className='m-b-30'
            ballType='wordColorful'
            onChange={(o) => handleChange(o, item)}
          />
        ))}
      </div>
    </div>
  );
});
