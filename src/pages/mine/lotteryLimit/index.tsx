import { useCallback, useEffect, useState } from 'react';
import { Cell, CellGroup } from '@/components';
import { getLotteryLimitGame } from '@/services';
import { useGlobalStore } from '@/mobx';

type LotteryLimitGameDto = {
  Key: string;
  Value: number;
  Expand?: LotteryLimitGameDto;
};

/**
 * 彩种限额
 * @returns
 */
const LotteryLimit = () => {
  const [gameRes, setGameRes] = useState<LotteryLimitGameDto[]>([]);
  const { changeState } = useGlobalStore();

  const loadData = useCallback(() => {
    changeState('isLoading', true);
    getLotteryLimitGame()
      .then((res: any) => {
        console.log(res);
        if (res.Code === 210 && res.Data) {
          setGameRes(() => res.Data);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  const clickItem = (res: LotteryLimitGameDto) => {
    console.log(res);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <CellGroup className='m-t-30'>
        {gameRes.map((r, i) => (
          <Cell key={r.Value} title={r.Key} href={`/mine/lotteryLimit/info?key=${r.Key}`} isDivider={i !== gameRes.length - 1} onClick={() => clickItem(r)} />
        ))}
      </CellGroup>
    </>
  );
};

export default LotteryLimit;

