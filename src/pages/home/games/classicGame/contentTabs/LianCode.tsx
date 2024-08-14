/**
 * 生肖连、尾数连
 * ? 连 下限就是？个号码
 * 最对选7个号码
 */
import { memo, useEffect, useState } from 'react';
import { Obj } from '@/constants';
import { isArray } from '@/utils/tools';
import { SXButton } from '@/pages/gameComponents';
import { zbz, defaultSltTitles } from '../constFiles/constCommon';
import { toastText } from '@/components';
import { useGameConfigStore } from '@/mobx';
import { useLanguage } from '@/hooks';

interface LianCodeProps {
  tabList: { title: string; key: string; listKey: string }[];
  curPeriodNumber: string;
  childrenData: Obj | any[];
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  className?: string;
  boxClassName?: string;
  subBetTypeMap?: Obj; // 字码对应关系
  subTitles?: Obj[];
  idx?: number; // title 下标
  getMul?: Function;
}

const tipObj = Object.freeze({
  2: { t: 'MIN_2', min: 2 },
  3: { t: 'MIN_3', min: 3 },
  4: { t: 'MIN_4', min: 4 },
  5: { t: 'MIN_5', min: 5 },
});

export const LianCode = memo((props: LianCodeProps) => {
  const {
    tabList,
    childrenData,
    handleBetClick,
    getItememMultip,
    curPeriodNumber,
    ik,
    subTitles,
    idx,
    getMul,
  } = props;

  const { setBetLenTip } = useGameConfigStore();
  const { formatMsg } = useLanguage();

  // 中或不中
  const [zKey, setZKey] = useState('z');
  // title
  const [xtItem, setXTItem] = useState<Obj>(defaultSltTitles[idx]);
  // 记录选择几个
  const [numArr, setNumArr] = useState([]);

  useEffect(() => {
    console.warn(numArr.length);
    if (numArr.length < tipObj[xtItem.key].min) {
      setBetLenTip(`${xtItem.t}&${tipObj[xtItem.key].t}`);
    } else {
      setBetLenTip(null);
    }
  }, [xtItem, numArr.length, setBetLenTip]);

  useEffect(() => {
    setXTItem(defaultSltTitles[idx]);
    setNumArr([]);
  }, [ik, idx]);

  useEffect(
    () => () => {
      setBetLenTip(null);
    },
    [setBetLenTip]
  );

  return (
    <div className='m-t-30 m-l-30 m-r-30 p-b-220 o-y h-full'>
      {tabList.map((it, i) => (
        <div key={`${i + 1}`}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='d-g col-2'>
            {zbz.map((itz) => (
              <div
                key={itz.key}
                onClick={() => {
                  if (itz.key !== zKey) {
                    // 中不中切换
                    setZKey(itz.key);
                    setNumArr([]);
                    handleBetClick({
                      mode_type: 'lian',
                      numArr: [],
                    });
                  }
                }}
                className={`d-f jc-c ai-c h-100 ${
                  itz.key === zKey ? 'bg-gdt-foc' : 'bg-body'
                }`}
              >
                {formatMsg(itz.text)}
              </div>
            ))}
          </div>
          <div className={`d-g col-${subTitles.length} m-t-30 m-b-30`}>
            {subTitles.map((its) => (
              <div
                onClick={() => {
                  setXTItem(its);
                  setNumArr([]);
                  handleBetClick({
                    mode_type: 'lian',
                    numArr: [],
                  });
                }}
                className={`p-20 b-1 bc-grey ta-c ${
                  its.key === xtItem?.key ? 'bg-gdt-foc' : 'bg-body'
                }`}
                key={its.key + ik}
              >
                {formatMsg(its.t)}
              </div>
            ))}
          </div>
          <div className='d-g col-2 col-gap-20'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => {
                // 赔率组装
                const subTObj = getMul({
                  z: zKey,
                  l: xtItem?.key,
                  t: item.text,
                });
                item.subMainType = subTObj.subMainType;
                item.mutil = subTObj.mutil;
                return (
                  <SXButton
                    numList={item.numList}
                    onChange={(o) => {
                      if (
                        !numArr.includes(o.title) &&
                        numArr.length === 7 &&
                        o.active
                      ) {
                        // 已经选中了7条 并且当前任然是选中的未选中状态的号码则直接出提示
                        toastText(formatMsg('DAGN_QIAN_MAX_7'));
                        return false;
                      }

                      const newNumArr = numArr.some((its) => its.t === o.title)
                        ? [...numArr.filter((its) => its.t !== o.title)]
                        : [...numArr, { t: o.title, idx: item.idx }];

                      setNumArr(newNumArr);
                      return handleBetClick({
                        ...o,
                        ...item,
                        numArr: newNumArr,
                        mode_type: 'lian',
                        len: xtItem?.key,
                      });
                    }}
                    key={
                      0 ||
                      `${curPeriodNumber}-${it.key}-${i}-${ik}-${zKey}-${xtItem?.key}`
                    }
                    title={item.text}
                    bottomTitle={getItememMultip(item)}
                    className={`m-b-30 ${item.cls}`}
                    index={i}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
});
