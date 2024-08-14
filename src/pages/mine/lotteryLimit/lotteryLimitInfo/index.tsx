import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLotteryLimitGame, getLotteryLimitInfo } from '@/services';
import { Icon, Picker, Table, TableColumnProps } from '@/components';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

type LotteryLimitGameDto = {
  Key: string;
  Value: number;
  Expand?: LotteryLimitGameDto;
};

type LotteryLimitInfoDto = {
  TypeName: string;
  SingleNoteMin: number;
  SingleNoteMax: number;
  SingleNoLimit: number;
  MaxtermBetLimit: number;
};

/**
 * 彩种限额游戏详情
 * @returns
 */
const LotteryLimitInfo = () => {
  const [searchParam] = useSearchParams();
  const [gameKey, setGameKey] = useState<string>(searchParam.get('key'));
  const [gameRes, setGameRes] = useState<LotteryLimitGameDto[]>([]);
  const [gameInfoRes, setGameInfoRes] = useState<LotteryLimitInfoDto[]>([]);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    getLotteryLimitGame()
      .then((res: any) => {
        if (res.Code === 210 && res.Data) {
          setGameRes(() => res.Data);
          const gameDto = res.Data.find(
            (r) => r.Key === searchParam.get('key')
          );
          getLotteryLimitInfo({ Id: gameDto.Value })
            .then((res: any) => {
              console.log(res);
              if (res.Code === 210 && res.Data) {
                setGameInfoRes(() => res.Data);
              }
            })
            .catch(() => {})
            .finally(() => {
              changeState('isLoading', false);
            });
        }
      })
      .catch(() => {
        changeState('isLoading', false);
      });
  }, [searchParam, changeState]);

  const pickerList = useMemo(
    () => gameRes.map((r) => ({ text: r.Key, value: r.Value })),
    [gameRes]
  );

  const columns: TableColumnProps[] = [
    {
      title: `${formatMsg('project')}`,
      key: 'TypeName',
      align: 'c',
      tbClassName: 'w-156 h-120 va-m ws-no',
    },
    {
      title: `${formatMsg('minimumBet')}`,
      key: 'SingleNoteMin',
      align: 'c',
      tbClassName: 'w-160 h-120 va-m ws-no',
    },
    {
      title: `${formatMsg('singleNoteLimit')}`,
      key: 'SingleNoteMax',
      align: 'c',
      tbClassName: 'w-160 h-120 va-m ws-no',
    },
    {
      title: `${formatMsg('haoQuota')}`,
      key: 'SingleNoLimit',
      align: 'c',
      tbClassName: 'w-230 h-120 va-m ws-no',
    },
    {
      title: `${formatMsg('itemLimit')}`,
      key: 'MaxtermBetLimit',
      align: 'c',
      tbClassName: 'w-160 h-120 va-m ws-no',
    },
  ];

  const buildSn = useCallback(
    () => (
      <div className='w-full h-100 ta-c m-b-30 d-f df-r ai-c jc-c bg-body'>
        <span>{gameKey}</span>
        <Icon name='triangle-down' />
      </div>
    ),
    [gameKey]
  );

  const onConfirmGame = (gameKey: string) => {
    setGameKey(gameKey);
    const gameDto = gameRes.find((r) => r.Key === gameKey);
    changeState('isLoading', true);
    getLotteryLimitInfo({ Id: gameDto.Value })
      .then((res: any) => {
        console.log(res);
        if (res.Code === 210 && res.Data) {
          setGameInfoRes(() => res.Data);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  };

  return (
    <>
      <div className='flex-n'>
        {pickerList.length > 0 && (
          <Picker
            listData={pickerList}
            placeholder={formatMsg('selectColor')}
            sourceNode={buildSn}
            onConfirm={(item) => onConfirmGame([item].flat().shift().text)}
            labelClassName='pl-50'
          />
        )}
      </div>
      <div className='flex-1 o'>
        <Table
          isBodyTopBordered
          headerClassName='h-140'
          columns={columns}
          data={gameInfoRes}
        />
      </div>
    </>
  );
};

export default memo(LotteryLimitInfo);

