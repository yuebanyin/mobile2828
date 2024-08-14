/**
 * 珠露盘组件
 */
import { memo, useMemo } from 'react';
import { isArray } from '@/utils/tools';
import styles from './index.module.scss';
import { GameMgr } from '@/engine/mgr/mgr';
import { Obj } from '@/constants';
import { useLanguage } from '@/hooks';

interface PearlDewPlateProps {
  colNum?: number; // 列数
  rowNum?: number; // 行数
  size?: 'normal' | 'small' | 'large';
  ballType?: 'ball' | 'circle';
  data?: any[];
  className?: string;
  sortType?: 'order' | 'ballType'; // 球的排序
}

/**
 * 处理不同小球背景颜色
 * @param text 小球的文字
 * @returns {string} 颜色样式
 */
export const handleColor = (text: string) => {
  if (['green', 'HE'].includes(text)) {
    return 'bg-game-ball-green t-small color-white';
  }
  if (['DAN', 'DA', 'LONG', 'red'].includes(text)) {
    return 'bg-game-ball-red t-small color-white';
  }
  return 'bg-game-ball-blue t-small color-white';
};

/**
 *
 * @param data 要处理的数据
 * @param ballIndex 球在结果数组的下标
 * @param gameType 当前游戏ID
 * @param assetKey 球的类型切换（2=大小、1=单双）
 * @returns ballData 当前球类型的数组 fst 单的个数 sec 双的个数 thr 大的个数 fr 小的个数
 */
export const handleBallType = ({
  data,
  posResObj,
  gameType,
  assetKey,
}: {
  data: any[];
  posResObj?: Obj;
  gameType?: number;
  assetKey?: number;
}) => {
  const sigTwoArr = []; // 单双的数组
  const bigSmall = []; // 大小的数组
  // 大小
  data.forEach((it) => {
    try {
      // 获取大小文字
      const dxText = GameMgr.GetResultDesc(
        gameType,
        it.cbResultType[posResObj.dx]?.value
      );
      // 获取单双文字
      const dsText = GameMgr.GetResultDesc(
        gameType,
        it.cbResultType[posResObj.ds]?.value
      );
      sigTwoArr.push(dsText);
      bigSmall.push(dxText);
    } catch (error) {
      console.info(error);
    }
  });

  return {
    ballData: assetKey === 1 ? sigTwoArr : bigSmall,
    fst: sigTwoArr.filter((t) => t === 'DAN').length,
    sec: sigTwoArr.filter((t) => t === 'SHUANG').length,
    thr: bigSmall.filter((t) => t === 'DA').length,
    fr: bigSmall.filter((t) => t === 'XIAO').length,
  };
};

export const PearlDewPlate = memo((props: PearlDewPlateProps) => {
  const {
    size = 'normal',
    rowNum = 6,
    colNum,
    data,
    className,
    sortType = 'order',
    ballType = 'ball',
  } = props;

  const { formatMsg } = useLanguage();

  const newData = useMemo(() => {
    // 先把数据倒叙排列
    const dataArr = [];
    if (!data || !data[0]) return dataArr;
    const d = [...data].reverse();
    if (sortType === 'order') {
      // 空余补null
      for (let i = 0; i < colNum * rowNum; i += 1) {
        if (i % rowNum === 0) {
          // 列头
          if (i < 50) {
            // 循环data
            dataArr.push([d[i]]);
          } else {
            dataArr.push([null]);
          }
        }
        if (i % rowNum !== 0) {
          if (i < 50) {
            dataArr[dataArr.length - 1].push(d[i]);
          } else {
            dataArr[dataArr.length - 1].push(null);
          }
        }
      }
    } else {
      // 长龙、大路
      for (let j = 0, len = d.length; j < len; j += 1) {
        const text = d[j];
        if (j === 0) {
          dataArr.push([text]);
        } else {
          const lastIndexArr = dataArr[dataArr.length - 1];
          if (lastIndexArr.includes(text)) {
            // 如果已经满了就重新起一个新列
            if (lastIndexArr.length === rowNum) {
              dataArr.push([text]);
            } else {
              // 如果相等就添加进去
              lastIndexArr.push(text);
            }
          } else {
            // 如果不相等，就补null，并添加新的空数组
            for (
              let m = 0, lth = rowNum - lastIndexArr.length;
              m < lth;
              m += 1
            ) {
              lastIndexArr.push(null);
            }
            dataArr.push([text]);
          }
        }
      }
      // 最后一个数组不满时，填满
      const lasIndex = rowNum - dataArr[dataArr.length - 1].length;
      if (lasIndex > 0) {
        for (let t = 0; t < lasIndex; t += 1) {
          dataArr[dataArr.length - 1].push(null);
        }
      }
      // 额外加两列
      for (let t = 0; t < rowNum * 2; t += 1) {
        if (t === 0 || t === rowNum) {
          dataArr.push([null]);
        } else {
          dataArr[dataArr.length - 1].push(null);
        }
      }
      // 如果不满一屏，就补满
      const cr = colNum * rowNum - dataArr.length * rowNum;
      if (cr > 0) {
        for (let k = 0; k < cr; k += 1) {
          const lsArr = dataArr[dataArr.length - 1];
          if (lsArr.length === 6) {
            dataArr.push([null]);
          } else {
            lsArr.push(null);
          }
        }
      }
    }
    return dataArr;
  }, [data, colNum, rowNum, sortType]);

  const getBallCls = (text: string) => {
    let cls = '';
    if (ballType === 'ball') {
      cls = handleColor(text);
      if (size === 'small') {
        cls = `${cls} t-30`;
      }
    } else if (['DAN', 'DA', 'LONG', 'red'].includes(text)) {
      cls = 'bc-red t-small';
    } else {
      cls = 'bc-blue t-small';
    }
    return text ? cls : '';
  };

  return (
    <div className={className}>
      {isArray(newData) &&
        newData.map((its, i) => (
          <div key={`${i}` || its}>
            {isArray(its) &&
              its.map((it, j) => (
                <div
                  className={styles[`ball-box-${size}-${ballType}`]}
                  key={`${i}${j}` || it}
                >
                  <div
                    className={`${
                      styles[`ball-${size}-${ballType}`]
                    } br-half ta-c color-white ${getBallCls(it)}`}
                  >
                    {ballType === 'ball' ? formatMsg(it) : ''}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
});
