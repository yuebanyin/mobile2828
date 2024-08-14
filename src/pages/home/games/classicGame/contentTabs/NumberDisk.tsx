import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { isArray } from '@/utils/tools';
import type { SpecialCodeProps } from './SpecialCode';
import { tabListFirst } from '../constFiles/const3102';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export const NumberDisk = observer((props: SpecialCodeProps) => {
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
      {tabListFirst.map((it) => (
        <div key={it.key}>
          <div className='m-b-30 wds-sm-title color-con-ass'>
            {formatMsg(it.title)}
          </div>
          <div className='d-f flex-w'>
            {isArray(childrenData[it.listKey]) &&
              childrenData[it.listKey].map((item, i) => (
                <NumberButton
                  onChange={(o) => handleBetClick({ ...o, ...item })}
                  bottomTitle={getItememMultip(item)}
                  key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                  title={item.text}
                  topType={item.topType as any}
                  className={`${
                    [formatMsg('SHUANG'), '5', '10'].includes(item.text)
                      ? ''
                      : 'm-r-20'
                  } m-b-30 `}
                  ballType='nb'
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

// export default memo(NumberDisk);
