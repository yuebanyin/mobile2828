import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import { Obj } from '@/constants';
import styles from '../index.module.scss';
import { tabListSecond } from '../constFiles/const3102';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export interface CodeProps {
  curPeriodNumber: string;
  childrenData: Obj;
  className: string;
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
}

export const DoubleDisk = observer((props: CodeProps) => {
  const {
    curPeriodNumber,
    childrenData,
    className,
    getItememMultip,
    handleBetClick,
    ik,
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
      {tabListSecond.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => {
                const getCls = () => {
                  if (it.title === 'NUMBER_1_2_HE') {
                    return `${
                      ['GUAN_YA_SHUANG', 'DAN', 'HU'].includes(item.text)
                        ? ''
                        : 'm-r-20'
                    } m-b-30 ${styles['bet-item-mid']}`;
                  }
                  return `m-r-20 m-b-30 br-20 bc-split font-w-bolder t-small-title wds-sm-con p-r ${
                    styles['h-item-box']
                  } ${
                    styles[
                      `w-pr-${childrenData[it.listKey].length > 5 ? '3' : '4'}`
                    ]
                  }`;
                };
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

// export default memo(DoubleDisk);
