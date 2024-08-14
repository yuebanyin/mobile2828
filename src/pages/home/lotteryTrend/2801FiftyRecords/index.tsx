import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import { getSscHistoryRecordList } from '@/services';
import PcFiftyRecords from '../pcFiftyCom';
import MajinagFifty from '../majiangFiftyCom';
import MarkSixFiftyCom from '../markSixFiftyCom';
import GoldFiftyCom from '../goldFiftyCom';
import GoldFiftySecRecords from '../goldFiftySecCom';
import { openRepeatExpire } from '../../../../Expire';
import { Button } from '@/components';
import { gamesShowTime } from '@/constants';
import { useNavigation, useLanguage } from '@/hooks';
import { useGameTimeStore, useGlobalStore } from '@/mobx';
import { pc28GameKindId } from '..';
import TwentyFiftyCom from '../TwentyFiftyCom';
import AWindow from '../../../../awindow';

const BitcoinFifty = () => {
  const [params] = useSearchParams();
  const reqId = parseInt(params.get('gameId'));
  const originFrom = params.get('origin');
  console.log('🚀 ~ file: index.tsx:17 ~ BitcoinFifty ~ reqId:', reqId);
  const navigate = useNavigation();
  const [gamesRecord, setGamesRecord] = useState([]);
  const { changeState } = useGlobalStore();
  const { gameTimeMap } = useGameTimeStore();
  const { formatMsg } = useLanguage();
  useEffect(() => {
    changeState('isLoading', true);
    getSscHistoryRecordList({ Id: reqId })
      .then((res: any) => {
        if (res.Code === 210 && res.Data) {
          if (
            reqId === 2905 ||
            reqId === 3202 ||
            reqId === 3203 ||
            reqId === 3501
          ) {
            const newRes = res.Data.map((item: any) => {
              const sum = Number(
                Object.values(item.GameResult.split(',')).reduce(
                  (a, b) => Number(a) + Number(b)
                )
              );
              const newItem = {
                ...item,
                GameResult: item.GameResult.split(','),
                Date: item.Date.slice(5),
                sumRes: sum,
              };
              return newItem;
            });
            setGamesRecord(newRes || []);
          } else {
            const newRes = res.Data.map((item: any) => {
              const newItem = {
                ...item,
                GameResult: item.GameResult.split(','),
                Date: item.Date.slice(5),
                curGameId: reqId,
              };
              return newItem;
            });
            setGamesRecord(newRes || []);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, reqId]);

  // 去购彩按钮效果
  const handleBet = (KindId: number) => {
    console.log('🚀 ~ file: index.tsx:57 ~ handleBet ~ reqId:', reqId);
    if (gameTimeMap[KindId] === '未开盘') {
      const msg = `${AWindow.GameTypeList[KindId]}${formatMsg('gameSaleTime')}${
        gamesShowTime[KindId]
      }`;
      openRepeatExpire({ msg, isGameTips: true });
    } else if (pc28GameKindId.includes(KindId)) {
      navigate(`/home/gameOption?gameId=${KindId}`, { replace: true });
    } else {
      navigate(`/home/classic?gameId=${KindId}`, { replace: true });
    }
  };

  return (
    <div>
      {gamesRecord.map((item) => {
        if ([2801, 2802, 2803, 2804, 2901].includes(reqId)) {
          return (
            <PcFiftyRecords key={item.PeriodId} {...item} KindId={reqId} />
          );
        }
        if ([2902, 2904, 3102].includes(reqId)) {
          return <MajinagFifty key={item.PeriodId} {...item} KindId={reqId} />;
        }
        if ([2903, 3402].includes(reqId)) {
          return (
            <MarkSixFiftyCom key={item.PeriodId} {...item} KindId={reqId} />
          );
        }
        if ([2905].includes(reqId)) {
          return <GoldFiftyCom key={item.PeriodId} {...item} KindId={reqId} />;
        }
        if ([3202, 3203].includes(reqId)) {
          return (
            <GoldFiftySecRecords key={item.PeriodId} {...item} KindId={reqId} />
          );
        }
        if ([3501].includes(reqId)) {
          return (
            <TwentyFiftyCom key={item.PeriodId} {...item} KindId={reqId} />
          );
        }
        return <></>;
      })}
      {originFrom === 'home' ? (
        <Button
          className='w-940 h-138 br-540 df-aic-jcc t-h1 bg-gdt-main color--home-login-btn p-f bottom-50 right-0 left-0 m-0-auto'
          onClick={() => handleBet(reqId)}
        >
          {formatMsg('goBuyColor')}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default observer(BitcoinFifty);
