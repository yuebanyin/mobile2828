import { memo, useCallback, useMemo } from 'react';
import i18n from 'i18next';
import styles from './index.module.scss';
import { IconButton } from '../iconButton';
import { GameMgr } from '@/engine/mgr/mgr';
import TrendDialog from '@/pages/home/games/trendDialog';
import MipaiDialog, { ResultNumber } from '@/pages/home/games/mipaiDialog';
import CountDownTime from '../countDownTime';
import { isArray } from '@/utils/tools';
import { ColorResultTypeNumber } from '../colorResultType';
import { useLanguage } from '@/hooks';

interface ClassicsTopProps {
  gameType?: number; //游戏类型 KindId
  curPeriodNumber?: string; //当前期号
  gameRecords?: any[]; // 游戏结果记录
}

const getGameRoomUrl = (gameId) =>
  `/home/lotteryTrend/gamesFifty?gameId=${gameId}&origin=classic`;

export const ClassicsTop = memo((props: ClassicsTopProps) => {
  const { gameType = 2903, curPeriodNumber, gameRecords } = props;
  const { formatMsg } = useLanguage();

  const periodNumber = useMemo(() => {
    if (
      isArray(gameRecords) &&
      typeof gameRecords[0]?.szPeriodNumber?.value === 'string'
    ) {
      return `${gameRecords[0]?.szPeriodNumber?.value}`;
    }
    return '';
  }, [gameRecords]);

  const numberList = useMemo(() => {
    if (isArray(gameRecords) && isArray(gameRecords[0]?.cbTableCard)) {
      return gameRecords[0]?.cbTableCard;
    }
    return [];
  }, [gameRecords]);

  const resultTypeList = useMemo(() => {
    if (isArray(gameRecords) && isArray(gameRecords[0]?.cbResultType)) {
      return gameRecords[0]?.cbResultType;
    }
    return [];
  }, [gameRecords]);

  const build2905SubResultNumber = useCallback(() => {
    if (gameType !== 2905) return <></>;
    const listStr = GameMgr.GetGamePeriodNumberResult(
      numberList,
      resultTypeList || gameRecords?.at(0)?.cbResultType || []
    );
    return (
      <div className='d-f ai-c jc-start m-t-10 o-x w-808'>
        {listStr.map((item, i) => {
          let name = '';
          if (item.indexOf('&') !== -1) {
            const [s, e] = item.split('&');
            name = `${formatMsg(s)}-${formatMsg(e)}`;
          } else {
            name = formatMsg(item);
          }
          return (
            <div key={`${i}` || item} className={`${styles['az5']} m-r-6`}>
              <div className={styles['az5-txt']}>{name}</div>
            </div>
          );
        })}
      </div>
    );
  }, [gameType, numberList, resultTypeList, gameRecords, formatMsg]);

  const build3501SubResultNumber = useCallback(() => {
    if (gameType !== 3501) return <></>;
    const valList = resultTypeList || gameRecords?.at(0)?.cbResultType || [];
    const listStr = valList.map((r: any) => parseInt(`${r.value}`));
    const sum = numberList
      .map((r: any) => parseInt(`${r.value}`))
      .reduce((p, r) => p + r, 0);
    return (
      <div className='d-f fd-r t-40 m-t-10'>
        <div className='m-r-10'>{i18n.t('sumValue')}:</div>
        <div className='m-0-10 font-w-bold'>{sum}</div>
        <ColorResultTypeNumber
          className='m-0-10 font-w-bold'
          value={listStr[0]}
        />
        <ColorResultTypeNumber
          className='m-0-10 font-w-bold'
          value={listStr[1]}
        />
        <ColorResultTypeNumber
          className='m-0-10 font-w-bold'
          value={listStr[2]}
        />
        <div className='flex-1 m-r-10 ta-r'>
          {i18n.t('numberDistribution')}:
        </div>
        <ColorResultTypeNumber
          className='m-0-10 font-w-bold'
          value={listStr[3]}
        />
        <ColorResultTypeNumber
          className='m-0-10 font-w-bold'
          value={listStr[4]}
        />
      </div>
    );
  }, [gameType, numberList, gameRecords, resultTypeList]);

  const build3402SubResultNumber = useCallback(() => {
    if (gameType !== 3402) return <></>;
    const listStr = gameRecords?.at(0)?.cbResultType.slice(21, 28) || [];
    return (
      <div className='d-f ai-c jc-start m-t-10 o-x w-808'>
        {listStr.map((item, i) => (
          <div key={`${i}` || item} className={`${styles['az5']} m-r-6`}>
            <div className={styles['az5-txt']}>
              {GameMgr.GetResultDesc(3402, Number(item))}
            </div>
          </div>
        ))}
      </div>
    );
  }, [gameType, gameRecords]);

  return (
    <div className='bg-body w-full'>
      <div className='d-f df-c'>
        <div className={`flex-none ${styles['pre-period']}`}>
          <span>{periodNumber ? periodNumber.slice(-4) : '--'}</span>
          <span>{formatMsg('qi')}</span>
        </div>
        <div className={`flex-1 d-f fd-c ${styles['result-content']}`}>
          <div className='d-f'>
            <ResultNumber gameType={gameType} numberList={numberList} />
          </div>
          {build2905SubResultNumber()}
          {build3501SubResultNumber()}
          {build3402SubResultNumber()}
        </div>
      </div>
      <div className='d-f df-r jc-c ai-c p-l-20 p-r-20 p-b-20 t-small'>
        <div className='ta-c color-red w-140'>
          <span>{curPeriodNumber ? curPeriodNumber.slice(-4) : '--'}</span>
          <span>{formatMsg('qi')}</span>
        </div>
        <div className='flex-1 ta-c m-r-20'>
          <CountDownTime isHours={gameType !== 2904} />
        </div>
        <div className='d-f'>
          <MipaiDialog
            gameType={gameType}
            numberList={numberList}
            curPeriodNumber={curPeriodNumber}
            periodNumber={periodNumber}
          />
          <TrendDialog gameType={gameType} data={gameRecords} />
          <IconButton
            url={getGameRoomUrl(gameType)}
            title={formatMsg('history')}
            icon='/home/GameField/ls.png'
          />
        </div>
      </div>
    </div>
  );
});
