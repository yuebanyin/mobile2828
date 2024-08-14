import { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RectButton } from '@/pages/gameComponents';
import { isArray } from '@/utils/tools';
import type { SpecialCodeProps } from './SpecialCode';
import styles from '../index.module.scss';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export const QuickRectCodeGroup = observer(
  (
    props: Omit<SpecialCodeProps, 'childrenData'> & {
      onClear: Function;
      tabRes?: any[];
    }
  ) => {
    const {
      curPeriodNumber,
      className,
      getItememMultip,
      handleBetClick,
      ik,
      onClear,
      tabRes = [],
      curGameId,
    } = props;
    const [actKey, setActKey] = useState(tabRes[0]);
    const { formatMsg } = useLanguage();

    // 选中的号码key
    const { keyArr } = useChangLongBetStore();

    // 主码
    const mainType = useMemo(
      () => getGameConfigInfo(curGameId, 'emBetMainType'),
      [curGameId]
    );

    // 子码
    const subMainType = useMemo(
      () => getGameSubTypeMap(curGameId),
      [curGameId]
    );

    const handleTitleClick = useCallback(
      (r: any) => {
        setActKey(() => r);
        if (onClear) onClear();
      },
      [onClear]
    );
    return (
      <div className={className}>
        <div className={`${styles['g-wrapper']}`}>
          {tabRes.map((r) => (
            <div
              key={r.title}
              className={
                r.title === actKey.title
                  ? `${styles['g-active']}`
                  : `${styles['g-normal']}`
              }
              onClick={() => handleTitleClick(r)}
            >
              {formatMsg(r.title)}
            </div>
          ))}
        </div>
        <div className='d-f flex-w'>
          {isArray(actKey.list) &&
            actKey.list.map((item, i) => (
              <RectButton
                isActive={(keyArr || []).includes(
                  `${mainType[item.mainType]}-${
                    subMainType[item.subTypeName][item.subMainType]
                  }-${Number(item.text) > -1 ? Number(item.text) : 255}`
                )}
                onClick={(o) => handleBetClick({ ...o, ...item })}
                key={0 || `${curPeriodNumber}-${actKey.key}-${i}-${ik}`}
                text={item.text}
                type={item.type as any}
                className={item.cls}
                multipleValue={getItememMultip(item)}
              />
            ))}
        </div>
      </div>
    );
  }
);

// export default memo(QuickRectCodeGroup);

