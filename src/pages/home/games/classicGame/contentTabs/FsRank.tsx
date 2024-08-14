import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import { Obj } from '@/constants';
import styles from '../index.module.scss';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export interface FsCodeProps {
  curPeriodNumber: string;
  childrenData: Obj;
  className: string;
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  tabList: any[];
  wordLine?: number;
}

export const FsRank = observer((props: FsCodeProps) => {
  const {
    curPeriodNumber,
    childrenData,
    className,
    getItememMultip,
    handleBetClick,
    ik,
    tabList,
    wordLine,
    curGameId,
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

  return (
    <div className={className}>
      {tabList.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => {
                const getCls = () =>
                  `${
                    ['DAN', 'HU', '05', '10'].includes(item.text)
                      ? ''
                      : 'm-r-10'
                  } m-b-30 ${
                    styles[`w-pr-${Number(item.text) >= 0 ? '5' : wordLine}`]
                  }`;
                return (
                  <NumberButton
                    onChange={(o) => handleBetClick({ ...o, ...item })}
                    bottomTitle={getItememMultip(item)}
                    key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                    title={item.text}
                    topType={item.topType as any}
                    className={getCls()}
                    ballType='nb'
                    isActive={(keyArr || []).includes(
                      `${mainType[item.mainType]}-${
                        subMainType[item.subTypeName][item.subMainType]
                      }-${Number(item.text) > -1 ? Number(item.text) : 255}`
                    )}
                  />
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
});
