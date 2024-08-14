import { memo, useEffect, useState } from 'react';
import { getSscRecordList } from '@/services';
import OpenTrendItem from './openTrendItem';
import { useGlobalStore } from '@/mobx';

// 这里是总的游戏记录 且排除 澳洲PC28 ：2906
export const noShowGameKindId = [2906];
// 游戏路径映射
export const pc28GameKindId = [2801, 2802, 2803, 2804];

const LotteryTrend = () => {
  const [gamesRecord, setGamesRecord] = useState();
  const { changeState } = useGlobalStore();

  useEffect(() => {
    changeState('isLoading', true);
    getSscRecordList()
      .then((res: any) => {
        console.log('最新记录条目', res.Data);
        if (res.Code === 210 && res.Data) {
          const newResData = res.Data?.filter((item) => !noShowGameKindId.includes(item?.kindId || ''));
          setGamesRecord(newResData || []);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  return (
    <div>
      {(gamesRecord || []).map((item) => (
        <OpenTrendItem key={item?.KindId} {...item} />
      ))}
    </div>
  );
};

export default memo(LotteryTrend);
