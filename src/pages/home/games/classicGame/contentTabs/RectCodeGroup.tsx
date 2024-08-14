import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RectButton } from '@/pages/gameComponents';
import { isArray } from '@/utils/tools';
import type { SpecialCodeProps } from './SpecialCode';
import { Icon } from '@/components';
import { getGameConfigInfo, getGameSubTypeMap } from '../../../pc28Games';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { useLanguage } from '@/hooks';

export const RectCodeGroup = observer(
  (
    props: Omit<SpecialCodeProps, 'childrenData'> & { isTitle?: boolean } & {
      tabRes?: any[];
    }
  ) => {
    const {
      curPeriodNumber,
      className,
      getItememMultip,
      handleBetClick,
      ik,
      isTitle = true,
      tabRes = [],
      curGameId,
    } = props;
    const [showIds, setShowIds] = useState([]);

    // 选中的号码key
    const { keyArr } = useChangLongBetStore();
    const { formatMsg } = useLanguage();

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

    const handleTitleClick = (id: number) => {
      if (showIds.includes(id)) {
        setShowIds(showIds.filter((it) => it !== id));
      } else {
        setShowIds([...showIds, id]);
      }
    };

    // 获取自选号码对应的第一位
    const getNumber = (it) => {
      // 处理斗牛的场景
      if (typeof it.num === 'number') {
        return it.num;
      }
      return Number(it.text) > -1 ? Number(it.text) : 255;
    };

    return (
      <div className={className}>
        {tabRes.map((it, idx) => (
          <div key={it.key}>
            {isTitle && (
              <div className='wds-con color-primary-text p-16-0 ta-c p-r b-b-1 bc-split'>
                {formatMsg(it.title)}
                <Icon
                  onClick={() => handleTitleClick(idx)}
                  className='p-a right-30 top-8'
                  name='rect-down'
                />
              </div>
            )}
            {!showIds.includes(idx) && (
              <div className='d-f flex-w'>
                {isArray(it.list) &&
                  it.list.map((item, i) => (
                    <RectButton
                      isActive={(keyArr || []).includes(
                        `${mainType[item.mainType]}-${
                          subMainType[item.subTypeName][item.subMainType]
                        }-${getNumber(item)}`
                      )}
                      onClick={(o) => handleBetClick({ ...o, ...item })}
                      key={0 || `${curPeriodNumber}-${it.key}-${i}-${ik}`}
                      text={item.text}
                      type={item.type as any}
                      className={item.cls}
                      multipleValue={getItememMultip(item)}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

// export default memo(RectCodeGroup);
