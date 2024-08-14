/**
 * 合肖
 * 中 最少选择一个号码 不中最少选择两个号码
 * 最对选10个
 */
import { memo, useEffect, useState } from 'react';
import { Obj, defaultAmount } from '@/constants';
import { isArray, isNoEmpty } from '@/utils/tools';
import { SXButton } from '@/pages/gameComponents';
import { zbz, hxTitle } from '../constFiles/constCommon';
import { toastText } from '@/components';
import { useGameConfigStore } from '@/mobx';
import { useLanguage } from '@/hooks';

interface HXCodeProps {
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
}

export const HXCode = memo((props: HXCodeProps) => {
  const {
    tabList,
    childrenData,
    handleBetClick,
    getItememMultip,
    curPeriodNumber,
    ik,
    subBetTypeMap,
  } = props;

  const { setBetLenTip } = useGameConfigStore();
  const { formatMsg } = useLanguage();

  // 中或不中
  const [zKey, setZKey] = useState('z');
  // title
  const [xtItem, setXTItem] = useState<Obj>(null);
  // 记录选择几个
  const [numArr, setNumArr] = useState([]);

  useEffect(() => {
    setXTItem(null);
    setNumArr([]);
  }, [ik]);

  useEffect(
    () => () => {
      setBetLenTip(null);
    },
    [setBetLenTip]
  );

  useEffect(() => {
    if (zKey === 'bz' && numArr.length === 1) {
      // setBetLenTip('不中玩法最少选择2项');
      setBetLenTip(formatMsg('chooseAtLeast2'));
    } else {
      setBetLenTip(null);
    }
  }, [zKey, numArr.length, setBetLenTip, formatMsg]);

  // 赔率展示
  const getMultipObj = (key, len) => {
    if (isArray(childrenData[key]) && isNoEmpty(subBetTypeMap)) {
      const obj = subBetTypeMap[`${zKey}${len}`] || {};
      return {
        ...childrenData[key][0],
        mutil: obj?.mul,
        subMainType: obj?.sub,
      };
    }
    return {};
  };

  return (
    <div className='m-t-30 m-l-30 m-r-30 p-b-220 o-y h-full'>
      {tabList.map((it, i) => (
        <div key={`${i + 1}`}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='d-f ai-c jc-sb'>
            <div className='d-f ai-c'>
              {zbz.map((itz) => (
                <div
                  key={itz.key}
                  onClick={() => {
                    if (itz.key !== zKey) {
                      // 中不中切换
                      setZKey(itz.key);
                      setXTItem(null);
                      setNumArr([]);
                      handleBetClick({
                        mode_type: 'hx',
                        numArr: [],
                      });
                    }
                  }}
                  className={`w-230 d-f jc-c ai-c h-100 ${
                    itz.key === zKey ? 'bg-gdt-foc' : 'bg-body'
                  }`}
                >
                  {formatMsg(itz.text)}
                </div>
              ))}
            </div>
            <div className=''>
              {formatMsg('odds')}
              <span className='m-l-10 color-red'>
                {numArr.length === 0 || (numArr.length === 1 && zKey === 'bz')
                  ? defaultAmount
                  : getItememMultip(getMultipObj(it.listKey, numArr.length))}
              </span>
            </div>
          </div>
          <div className='d-g col-4 m-t-30 m-b-30'>
            {hxTitle.map((its) => (
              <div
                onClick={() => {
                  setXTItem(its);
                  setNumArr([...its.keys]);
                  const mo = getMultipObj(it.listKey, 6);
                  getItememMultip(mo);
                  handleBetClick({
                    mode_type: 'hx',
                    numArr: [...its.keys],
                    ...mo,
                    odds: mo.mutilV,
                  });
                }}
                className={`p-20 b-1 bc-grey ta-c ${
                  its.key === xtItem?.key ? 'bg-gdt-foc' : 'bg-body'
                }`}
                key={its.key + ik}
              >
                {formatMsg(its.text)}
              </div>
            ))}
          </div>
          <div className='d-g col-2 col-gap-20'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => (
                <SXButton
                  numList={item.numList}
                  onChange={(o) => {
                    if (
                      !numArr.includes(o.title) &&
                      numArr.length === 10 &&
                      o.active
                    ) {
                      // 已经选中了10条 并且当前任然是选中的未选中状态的号码则直接出提示
                      toastText(`${formatMsg('maxSelectTen')}`);
                      return false;
                    }
                    const newNumArr = numArr.some((its) => its.t === o.title)
                      ? [...numArr.filter((its) => its.t !== o.title)]
                      : [...numArr, { t: o.title, idx: i }];
                    setNumArr(newNumArr);
                    const mo = getMultipObj(it.listKey, newNumArr.length);
                    getItememMultip(mo);
                    return handleBetClick({
                      ...o,
                      ...item,
                      mode_type: 'hx',
                      numArr:
                        zKey === 'bz' && newNumArr.length === 1
                          ? []
                          : newNumArr,
                      ...mo,
                      odds: mo.mutilV,
                    });
                  }}
                  key={
                    0 ||
                    `${curPeriodNumber}-${it.key}-${i}-${ik}-${zKey}-${xtItem?.key}`
                  }
                  title={item.text}
                  isActive={
                    isArray(xtItem?.keys)
                      ? xtItem.keys.some((o) => o.t === item.text)
                      : null
                  }
                  className={`m-b-30 ${item.cls}`}
                  index={i}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
