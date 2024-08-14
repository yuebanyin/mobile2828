import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@/components';
import {
  BothColorLine,
  ColorfulLine,
  MajiangLine,
  SingGoldLine,
  TwentyBallLine,
} from '@/pages/gameComponents';
import { getBallType } from '@/utils/chartRoom';
import AWindow from '../../../awindow';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage, useNavigation } from '@/hooks';
import { pc28GameKindId } from '.';
import { useGameTimeStore } from '@/mobx';
import { openRepeatExpire } from '../../../Expire';
import { gamesShowTime } from '@/constants';

export interface RecordItemDto {
  KindId?: number;
  GameResult?: string;
  PeriodId?: string;
  ResultType?: string[];
}

const OpenTrendItem = (props: RecordItemDto) => {
  const { KindId, GameResult, PeriodId, ResultType } = props;
  const { formatMsg } = useLanguage();
  const { gameTimeMap } = useGameTimeStore();
  const navigate = useNavigation();
  // 游戏判断显示球
  const type = useMemo(() => getBallType(KindId), [KindId]);
  // 历史开奖
  const handleRecords = (e: any, KindId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      '🚀 ~ file: openTrendItem.tsx:40 ~ handleRecords ~ KindId:',
      KindId
    );
    navigate(`/home/lotteryTrend/gamesFifty?origin=home&gameId=${KindId}`);
  };
  // 走势图表
  const handleChart = (e: any, KindId: number) => {
    // FIXME 2023-09-26 11:36:36 只有28系列才有走势图表
    e.preventDefault();
    e.stopPropagation();
    navigate(`/home/lotteryTrend/trendCharts?gameId=${KindId}`);
  };
  // 立即投注
  const handleBet = (e: any, KindId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (gameTimeMap[KindId] === formatMsg('notOpen')) {
      const msg = `${AWindow.GameTypeList[KindId]}
      ${formatMsg('gameSaleTime')}
      ${gamesShowTime[KindId]}`;
      openRepeatExpire({ msg, isGameTips: true });
    } else if (pc28GameKindId.includes(KindId)) {
      navigate(`/home/gameOption?gameId=${KindId}`, { replace: true });
    } else {
      navigate(`/home/classic?gameId=${KindId}`, { replace: true });
    }
  };
  const findResultDes = useCallback(
    (index: number) => GameMgr.GetResultDesc(KindId, Number(ResultType[index])),
    [KindId, ResultType]
  );
  return (
    <div className='m-b-10 bg-body' onClick={(e) => handleRecords(e, KindId)}>
      <div className='d-f jc-sb p-30-50-0'>
        <div>
          <div className='d-f'>
            <div className='w-min-300 p-r-30 t-small-title font-w-bold'>
              {AWindow.GameTypeList[KindId]}
            </div>
            <div className='m-r-20 t-main'>
              <span>{formatMsg('di')}</span>
              <span className='color-red'>{PeriodId || ''}</span>
              <span>{formatMsg('qi')}</span>
            </div>
          </div>
          {type === 'colorful' && (
            <div>
              <ColorfulLine
                classBox='m-t-30'
                GameResult={GameResult.split(',')}
              />
              <div className='d-f ai-c'>
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(21))}
                </div>
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(22))}
                </div>
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(23))}
                </div>
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(24))}
                </div>
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(25))}
                </div>
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(26))}
                </div>
                <div className='m-r-30' />
                <div className='w-72 h-72 df-aic-jcc m-r-10'>
                  {formatMsg(findResultDes(27))}
                </div>
              </div>
            </div>
          )}
          {/* {type === 'singRed' && <SingRedLine classBox='m-30-0' GameResult={GameResult.split(',')} />} */}
          {type === 'singGold' && (
            <SingGoldLine
              classBox='m-30-0'
              GameResult={GameResult.split(',')}
            />
          )}
          {type === 'majiang' && (
            <MajiangLine classBox='m-30-0' GameResult={GameResult.split(',')} />
          )}
          {type === 'bothColor' && (
            <BothColorLine
              classBox='m-30-0'
              GameResult={GameResult.split(',')}
            />
          )}
          {type === 'twenty' && (
            <TwentyBallLine
              classBox='m-30-0'
              GameResult={GameResult.split(',')}
            />
          )}
        </div>
        <div className='d-f ai-c'>
          <Icon className='t-h1' name='rect-right' />
        </div>
      </div>
      <div className='d-f h-100 w-full t-small-title'>
        <div
          className='b-r-t-1 bc-grey w-320 df-aic-jcc color-con-ass'
          onClick={(e) => handleRecords(e, KindId)}
        >
          {formatMsg('historyLottery')}
        </div>
        <div
          className={`b-r-t-1 bc-grey w-320 df-aic-jcc color-con-ass ${
            type === 'bothColor' ? '' : 'd-n'
          }`}
          onClick={(e) => handleChart(e, KindId)}
        >
          {formatMsg('trendChart')}
        </div>
        <div
          className='b-t-1 bc-grey df-aic-jcc color-primary flex-1'
          onClick={(e) => handleBet(e, KindId)}
        >
          {formatMsg('betNow')}
        </div>
      </div>
    </div>
  );
};

export default observer(OpenTrendItem);
