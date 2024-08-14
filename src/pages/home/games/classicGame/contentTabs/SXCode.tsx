import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { SXButton } from '@/pages/gameComponents';
import { isArray } from '@/utils/tools';
import { Obj } from '@/constants';
import styles from '../index.module.scss';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export interface SXCodeProps {
  tabList: { title: string; key: string; listKey: string }[];
  curPeriodNumber: string;
  childrenData: Obj | any[];
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  className?: string;
  boxClassName?: string;
  titleIdx?: number;
}

export const SXCode = observer((props: SXCodeProps) => {
  const {
    curPeriodNumber,
    childrenData,
    className,
    boxClassName,
    getItememMultip,
    handleBetClick,
    ik,
    tabList,
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
    <div className={`p-r-20 ${className}`}>
      {tabList.map((it, i) => (
        <div key={`${i + 1}`}>
          {it.title && (
            <div className='m-b-30 wds-sm-title color-con-ass'>
              {formatMsg(it.title)}
            </div>
          )}
          <div className={`${styles['sx-grid-box']} ${boxClassName}`}>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => (
                <SXButton
                  numList={item.numList}
                  onChange={(o) =>
                    handleBetClick({ ...o, ...item, mode_type: 'sx' })
                  }
                  bottomTitle={getItememMultip(item)}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  className={`m-b-30 ${item.cls}`}
                  index={i}
                  isActive={(keyArr || []).includes(
                    `${mainType[item.mainType]}-${
                      subMainType[item.subTypeName][item.subMainType]
                    }-${Number(item.text) > -1 ? Number(item.text) : 255}`
                  )}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});
