import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Img,
  OutLink,
  RecordDetail,
  RecordDetailSub,
  Tabs,
} from '@/components';
import { getTimeRange } from '@/utils/dayjs';
import { getBetRewardList } from '@/services';
import { useNavigation, useLanguage } from '@/hooks';
import { useGlobalStore } from '@/mobx';
import { formatDigit } from '@/utils/tools';

// const gameType = {
//   pc28: 'PC28投注',
//   other: '其他投注',
// };

/**
 * 会员返水-主界面
 * @returns
 */
const Rebate = () => {
  const { formatMsg } = useLanguage();
  const tabRes = [
    { id: 0, text: `${formatMsg('yesterdays')}`, query: 'yesterday' },
    { id: 1, text: `${formatMsg('Last_7_Days')}`, query: 'last7days' },
    { id: 2, text: `${formatMsg('Last_15_Days')}`, query: 'last15days' },
    { id: 3, text: `${formatMsg('Last_30_Days')}`, query: 'last30days' },
  ];
  const [table1Res, setTable1Res] = useState([]);
  const [table2Res, setTable2Res] = useState([]);
  const [rewardList, setRewardList] = useState([]);
  const [betList, setBetList] = useState([]);
  const [total1, setTotal1] = useState('0');
  const [total2, setTotal2] = useState('0');
  const [total, setTotal] = useState('0');
  const [todayRate, setTodayRate] = useState('--');
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();

  const recordReq = useRef({
    StartTime: '',
    EndTime: '',
    PageSize: 15,
    PageIndex: 1,
  });

  const onChangePage = (type: number) => {
    const url = '/mine/rebate/detail';
    const tmpState = {
      type,
      st: recordReq.current.StartTime,
      nt: recordReq.current.EndTime,
      list: [],
    };
    if (type === 2) {
      tmpState.list = [
        ...betList.map((it) => ({
          ...it,
          TotalScore: parseFloat(total2 ?? '0.0'),
        })),
      ];
    } else {
      tmpState.list = [
        ...rewardList.map((it) => ({
          ...it,
          TotalScore: parseFloat(total1 ?? '0.0'),
        })),
      ];
    }
    navigate(url, { state: tmpState });
  };
  

  const tapTabItem = useCallback(
    ({ query }) => {
      console.log('🚀 ~ file: index.tsx:55 ~ tapTabItem ~ tapTabItem:');
      const { startTime, endTime } = getTimeRange(query ?? 'yesterday');
      const gameType = {
        pc28: `${formatMsg('PC28Betting')}`,
        other: `${formatMsg('otherBetting')}`,
      };
      recordReq.current.StartTime = startTime;
      recordReq.current.EndTime = endTime;
      recordReq.current.PageIndex = 1;
      changeState('isLoading', true);
      getBetRewardList(recordReq.current)
        .then((res: any) => {
          if (res.Code === 210 && res.Data) {
            setTodayRate(res.Data.Rate === 0 ? '0.00%' : `${res.Data.Rate}%`);
            setRewardList(res.Data.RewardList ?? []);
            setBetList(res.Data.BetList ?? []);
            setTable1Res(
              res.Data.RewardTotal
                ? [{ ...res.Data.RewardTotal, GameType: gameType.pc28 }]
                : [
                    {
                      GameType: gameType.pc28,
                      ValidBetScore: 0.0,
                      WinLoseScore: 0.0,
                      RewardScore: 0.0,
                    },
                  ]
            );
            setTable2Res(
              res.Data.BetTotal
                ? [{ ...res.Data.BetTotal, GameType: gameType.other }]
                : [
                    {
                      GameType: gameType.other,
                      TotalValidBetScore: 0.0,
                      TotalRewardScore: 0.0,
                    },
                  ]
            );
            const total1 = res.Data.RewardTotal
              ? res.Data.RewardTotal?.RewardScore
              : 0.0;
            const total2 = res.Data.BetTotal
              ? res.Data.BetTotal?.TotalRewardScore
              : 0.0;
            setTotal1(total1);
            setTotal2(total2);
            setTotal(total1 + total2);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, formatMsg]
  );

  useEffect(() => {
    tapTabItem({ query: 'yesterday' });
  }, [tapTabItem]);

  const buildTable1 = () => {
    // 负盈利回水
    const headerRes = {
      GameType: `${formatMsg('gameType')}`,
      ValidBetScore: `${formatMsg('validBet')}`,
      WinLoseScore: `${formatMsg('winOrLose')}`,
      RewardScore: `${formatMsg('backwater')}`,
    };
    const dataKeys = [
      'GameType',
      'ValidBetScore',
      'WinLoseScore',
      'RewardScore',
    ];
    const dataRowFlex = [5, 4, 4, 5];
    return (
      <div className='m-t-30' onClick={() => onChangePage(1)}>
        <RecordDetailSub className='h-100' title={formatMsg('negativeCarryBackwater')}>
          <OutLink className='d-f fd-r ai-c' href='/mine/rebate/explan'>
            <Img className='w-47 h-44 m-0-20' src='/mine/icon_geren_018.png' />
            <div className='wds-sm-title'>{formatMsg('backwaterExple')}</div>
          </OutLink>
        </RecordDetailSub>
        <RecordDetail
          className='h-100'
          isHeader
          data={headerRes}
          dataKeys={dataKeys}
          dataRowFlex={dataRowFlex}
        />
        {table1Res.map((r, i) => {
          r.RewardScore = formatDigit(r.RewardScore);
          r.ValidBetScore = formatDigit(r.ValidBetScore);
          r.WinLoseScore = formatDigit(r.WinLoseScore);
          return (
            <RecordDetail
              className='h-100'
              key={i || r}
              data={r}
              dataKeys={dataKeys}
              dataRowFlex={dataRowFlex}
            />
          );
        })}
        <RecordDetailSub className='m-b-30 h-100' title={formatMsg('subtotal')}>
          <div className='color-red'>{formatDigit(total1)}</div>
        </RecordDetailSub>
      </div>
    );
  };

  const buildTable2 = () => {
    // 按投注量返水
    const headerRes = {
      GameType: `${formatMsg('gameType')}`,
      TotalValidBetScore: `${formatMsg('validBet')}`,
      TotalRewardScore: `${formatMsg('backwater')}`,
    };
    const dataKeys = ['GameType', 'TotalValidBetScore', 'TotalRewardScore'];
    const dataRowFlex = [5, 9, 4];
    return (
      <div onClick={() => onChangePage(2)}>
        <RecordDetailSub className='h-100' title={formatMsg('waterAsAccording')} />
        <RecordDetail
          className='h-100'
          isHeader
          data={headerRes}
          dataKeys={dataKeys}
          dataRowFlex={dataRowFlex}
        />
        {table2Res.map((r, i) => {
          r.TotalRewardScore = formatDigit(r.TotalRewardScore);
          r.TotalValidBetScore = formatDigit(r.TotalValidBetScore);
          return (
            <RecordDetail
              className='h-100'
              key={i || r}
              data={r}
              dataKeys={dataKeys}
              dataRowFlex={dataRowFlex}
            />
          );
        })}
        <RecordDetailSub className='m-b-30 h-100' title={formatMsg('subtotal')}>
          <div className='color-red'>{formatDigit(total2)}</div>
        </RecordDetailSub>
      </div>
    );
  };

  return (
    <>
      <Tabs searchList={tabRes} onClick={(r) => tapTabItem(r)} />
      <div className='o-y'>
        {buildTable1()}
        {buildTable2()}
        {/* 总计 */}
        <RecordDetailSub className='m-b-30 h-100' title={formatMsg('amountTo')}>
          <div className='color-red'>{formatDigit(total)}</div>
        </RecordDetailSub>
        {/* 今日投注组合占比率 */}
        <RecordDetailSub className='m-b-30 h-100' title={formatMsg('percentageMix')}>
          <div className='color-red'>{todayRate}</div>
        </RecordDetailSub>
      </div>
    </>
  );
};

export default Rebate;
