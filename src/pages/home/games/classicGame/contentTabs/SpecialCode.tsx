import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import { Obj } from '@/constants';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import styles from '../index.module.scss';

import { tabListFirst as tabList2901 } from '../constFiles/const2901';
import { tabListFirst as tabList2903 } from '../constFiles/const2903';
import { tabListFirst as tabList3501 } from '../constFiles/const3501';
import { tabListFirst as tabList3402 } from '../constFiles/const3402';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export interface SpecialCodeProps {
  curPeriodNumber: string;
  childrenData: Obj | any[];
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  className?: string;
  titleIdx?: number;
}

export const SpecialCode = observer((props: SpecialCodeProps) => {
  const {
    curPeriodNumber,
    childrenData,
    className,
    getItememMultip,
    handleBetClick,
    ik,
    curGameId,
    titleIdx,
  } = props;

  // 选中的号码key
  const { keyArr } = useChangLongBetStore();
  const { formatMsg } = useLanguage();

  // 主码
  const mainType = useMemo(
    () => getGameConfigInfo(curGameId, 'emBetMainType'),
    [curGameId]
  );

  // 子码
  const subMainType = useMemo(() => getGameSubTypeMap(curGameId), [curGameId]);

  const tabList: any = useMemo(() => {
    switch (curGameId) {
      case 2901:
        return tabList2901;
      case 2903:
        return [tabList2903[titleIdx]];
      case 3501:
        return tabList3501;
      case 3402:
        return [tabList3402[titleIdx]].flat();
      default:
        return [];
    }
  }, [curGameId, titleIdx]);

  // 格式化号码按钮分布样式
  /**
   *
   * @param i 元素下标
   * @param item 展示子项包含对象
   * @param fatherTitle 类别标题
   * @returns
   */
  const getCls = useCallback(
    (
      gameId: number,
      fatherTitle: string,
      i: number,
      item: { text: string }
    ) => {
      switch (gameId) {
        case 3402:
          if (!(Number(item.text) >= 0)) {
            if ((i + 1) % 4 !== 0) {
              return `m-r-20 ${styles['bet-item-mid']}`;
            }
            return `${styles['bet-item-mid']}`;
          }
          if ((i + 1) % 5 !== 0) {
            return 'm-r-20';
          }
          return '';

        default:
          if (
            formatMsg(fatherTitle) === formatMsg('SUM') ||
            formatMsg(fatherTitle) === formatMsg('distributed')
          ) {
            if (formatMsg(item.text) === formatMsg('ou')) {
              return 'm-r-90';
            }
            return 'm-r-20';
          }
          if ((i + 1) % 5 !== 0) {
            return 'm-r-20';
          }
          return '';
      }
    },
    [formatMsg]
  );

  return (
    <div className={className}>
      {tabList.map((it, i) => (
        <div key={`${i + 1}`}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => (
                <NumberButton
                  size={`${curGameId === 3501 ? 'big' : 'small'}`}
                  onChange={(o) => handleBetClick({ ...o, ...item })}
                  bottomTitle={getItememMultip(item)}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  topType={item.topType as any}
                  ballType={it.ballType || 'wcf'}
                  isActive={(keyArr || []).includes(
                    `${mainType[item.mainType]}-${
                      subMainType[item.subTypeName][item.subMainType]
                    }-${Number(item.text) > -1 ? Number(item.text) : 255}`
                  )}
                  className={`m-b-30 ${getCls(curGameId, it.title, i, item)}`}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
