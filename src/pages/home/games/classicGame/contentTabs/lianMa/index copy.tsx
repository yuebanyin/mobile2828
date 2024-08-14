/**
 * 连码专用细节点
 * 数字最多只能选10个
 * 不能低于标题个数（例如4全中，最少要选4个）
 * 切换模式之前选中清空
 */
import {
 memo, useCallback, useEffect, useMemo, useState 
} from 'react';
import { SingleNumBtn } from '@/pages/gameComponents';
import { tabListFirst as tabList3402 } from '../../constFiles/const3402';
import styles from './index.module.scss';
import { Obj } from '@/constants';
import { getGameMcom } from '@/utils/game';

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
  titleIdx?: number;
  nums?: number;
}

export const LianMa = memo((props: LianMaProps) => {
  const {
 renBtnCls, ik, childrenData, getItememMultip, getStandNum, onClear, handleBetClick, nums, curGameId, titleIdx 
} = props;

  const [activeObj, setActiveObj] = useState({ activeId: 0, lianMaItem: {} });

  const [numArr, setNumList] = useState([]); // 存取选中数字
  const [len, setLen] = useState(5); // 任选数长度

  const tabList = useMemo(() => {
    switch (curGameId) {
      case 3402:
        return [tabList3402[titleIdx]].flat();
      default:
        return [];
    }
  }, [curGameId, titleIdx]);

  useEffect(() => {
    setActiveObj({ activeId: 0, lianMaItem: null });
  }, []);

  const handleClickLianMa = (i: number, len?) => {
    if (i === activeObj.activeId) {
      return false;
    }
    if (len) {
      setLen(len);
      getStandNum(len, numArr);
    }
    setActiveObj({ activeId: i, lianMaItem: null });
    return '';
  };

  // 选中还是取消
  const getNumArr = (num, isAct) => {
    if (isAct) {
      const newList = [...numArr, num];
      setNumList(newList);
      getStandNum(len, newList);
    } else {
      const newList = numArr.filter((i) => i !== num);
      setNumList(newList);
      getStandNum(len, newList);
    }
  };

  // 任选之后排列得可能项
  const getCombinList = useMemo(() => {
    const res = getGameMcom(numArr, len);
    return res;
  }, [len, numArr]);

  // 任选页下注数量
  useEffect(() => {
    if (getCombinList) {
      onClear(true);
      getCombinList.forEach((item) => {
        handleBetClick({ ...activeObj.lianMaItem, text: item })(true);
      });
    }
  }, [activeObj.lianMaItem, getCombinList, handleBetClick, onClear]);

  // 定义号码球
  const numsList = Array.from({ length: nums }, (_, index) => index + 1);

  // i任选按钮下标
  const getCls = useCallback(
    (i: number) => {
      let csn = 'b-1 bc-grey w-half d-ib p-20-30';
      if (renBtnCls) {
        csn = `${csn} ${renBtnCls}`;
      }
      if (i === activeObj.activeId) {
        csn = `${csn} ${styles['nb-bg-active']}`;
      } else {
        csn = `${csn} ${styles['nb-bg-none']}`;
      }
      return csn;
    },
    [activeObj.activeId, renBtnCls]
  );

  return (
    <div className='m-t-30 m-l-30 m-r-30 p-b-220 o-y h-full'>
      {tabList.map((it, i) => (
        <div key={`${i + 1}`}>
          <div className='m-b-30 wds-sm-title color-con-ass'>{it.title}</div>
          <div className='bg-body m-b-30'>
            {childrenData[it.listKey].map((item, i) => (
              <div className={getCls(i)} onClick={() => handleClickLianMa(i, item?.len)} key={`'连码'${item.key + i}`}>
                <div className='df-aic-jcc t-40 font-w-bold'>{item?.text}</div>
                <div className='df-aic-jcc'>
                  {item?.child?.map((it) => (
                    <div key={0 || `${it.text}-${i}-${ik}`}>
                      <span className='t-30 m-r-10'>{it.text}</span>
                      {getItememMultip(it, it.key)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className='d-f flex-w'>
        {numsList.map((item) => (
          <SingleNumBtn
            key={`${item + 1}`}
            title={item}
            className={`m-b-30 ${item % 5 === 0 ? '' : 'm-r-20'}`}
            getNumArr={getNumArr}
            ballType='wordColorful'
            onChange={(o) => handleBetClick({ ...o, item })}
          />
        ))}
      </div>
    </div>
  );
});
