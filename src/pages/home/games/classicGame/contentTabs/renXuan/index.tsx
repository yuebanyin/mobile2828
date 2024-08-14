import {
 memo, useCallback, useEffect, useMemo, useState 
} from 'react';
import { betNumberList } from '../../constFiles/const3501';
import { SingleNumBtn } from '@/pages/gameComponents';
import styles from './index.module.scss';
import { Obj } from '@/constants';
import { isArray } from '@/utils/tools';
import { getGameMcom } from '@/utils/game';

// 背景色：bg-gdt-foc
interface RenXuanProps {
  ik?: number;
  curPeriodNumber: string;
  renBtnCls?: string;
  title?: string;
  childrenData?: [];
  getItememMultip?: Function;
  handleBetClick?: Function;
  onClear: Function;
  curGameId?: string | number;
  getStandNum?: Function;
}

export const RenXuan = memo((props: RenXuanProps) => {
  const {
 renBtnCls, ik, title = '连码', childrenData = betNumberList[2].list, getItememMultip, getStandNum, onClear, handleBetClick 
} = props;

  const [activeObj, setActiveObj] = useState({ activeId: 0, renXuanItem: {} });

  const [numArr, setNumList] = useState([]); // 存取选中数字
  const [len, setLen] = useState(5); // 任选数长度

  /**
   * @getRenFormatData 格式化按钮数据组合号特殊赔率
   * @param btnData 当前任选按钮包含的数据
   * @returns
   */
  const getRenFormatData = (btnData: Obj) => {
    const tMutil = [];
    if (btnData.child && isArray(btnData.child)) {
      btnData.child.forEach((item) => {
        if (item.tMutil) {
          tMutil.push(item.tMutil);
        }
      });
    }
    return { ...btnData, tMutil, name: btnData.key };
  };

  useEffect(() => {
    setActiveObj({ activeId: 0, renXuanItem: getRenFormatData(betNumberList[2].list[0]) });
  }, []);

  const handleClickRenxuan = (i: number, len?) => {
    if (i === activeObj.activeId) {
      return false;
    }
    if (len) {
      setLen(len);
      getStandNum(len, numArr);
    }
    setActiveObj({ activeId: i, renXuanItem: getRenFormatData(betNumberList[2].list[i]) });
    return '';
  };

  /**
   *
   * @param num 按钮号码
   * @param isAct  选中还是取消
   */
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
      onClear();
      getCombinList.forEach((item) => {
        handleBetClick({ ...activeObj.renXuanItem, text: item });
      });
    }
  }, [activeObj.renXuanItem, getCombinList, handleBetClick, onClear]);

  // 定义80个号码球
  const eightyNums = Array.from({ length: 80 }, (_, index) => index + 1);

  /**
   * i: 任选按钮下标
   */
  const getCls = useCallback(
    (i: number) => {
      let csn = 'b-1 bc-grey';
      if (renBtnCls) {
        csn = `${csn} ${renBtnCls}`;
      }
      if (i > 2) {
        csn = `${csn} w-half d-ib p-20-30`;
      } else {
        csn = `${csn} p-20-30`;
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
      <div className='m-b-30 wds-sm-title color-con-ass'>{title}</div>
      <div className='bg-body m-b-30'>
        {childrenData.map((item, i) => (
          <div className={getCls(i)} onClick={() => handleClickRenxuan(i, item?.len)} key={item.key}>
            <div className='df-aic-jcc t-40 font-w-bold'>{item?.text}</div>
            <div className={`${i === 2 ? 'd-f ai-c jc-sa' : `${i > 2 ? 'df-aic-jcc' : 'df-aic-jcsb'}`}`}>
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
      <div className='d-f flex-w'>
        {eightyNums.map((item) => (
          <SingleNumBtn
            key={`${item + 1}`}
            title={item}
            className={`m-b-30 ${item % 5 === 0 ? '' : 'm-r-20'}`}
            ballClass='color-game-ball-blue'
            getNumArr={getNumArr}
            // onChange={handleBetClick({ ...activeObj.renXuanItem, text: item })}
            onChange={(o) => handleBetClick({ ...o, ...activeObj.renXuanItem })}
          />
        ))}
      </div>
    </div>
  );
});
