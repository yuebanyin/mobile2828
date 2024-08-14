import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecordDetail, RecordDetailSub } from '@/components';
import { formatDigit } from '@/utils/tools';
import { useLanguage } from '@/hooks';

// async function mockFetch(req: { type: number; startTime: string; endTime: string }) {
//   console.log('🚀 ~ file: index.tsx:8 ~ mockFetch ~ req:', req);
//   const Data = [
//     {
//       DateTime: '2021-08-22 09:43:06',
//       ValidBetScore: '72.44',
//       WinLoseScore: '2.35',
//       RewardScore: '1.34',
//       BetRatio: '11',
//     },
//     {
//       DateTime: '2021-08-28 09:11:01',
//       ValidBetScore: '62.64',
//       WinLoseScore: '21.12',
//       RewardScore: '9.14',
//       BetRatio: '12',
//     },
//     {
//       DateTime: '2021-08-29 09:21:01',
//       ValidBetScore: '2.44',
//       WinLoseScore: '0.05',
//       RewardScore: '0.04',
//       BetRatio: '13',
//     },
//   ];
//   return {
//     Code: 210,
//     Message: 'Success',
//     Data,
//     Count: 0,
//   };
// }

// type RebateDetailDto = {
//   DateTime: string;
//   ValidBetScore: string;
//   WinLoseScore: string;
//   RewardScore: string;
//   BetRatio?: string;
// };

/**
 * 会员返水 -返水详情
 *
 * 有两种返水详情数据，pc28和其他投注，pc28多一个组合占比是数据展示，使用type区分
 *
 * type为1是pc28投注，type为2是其他投注
 *
 * 请求数据需要一个时间端字段，原是长连接解析的数据，需要修改
 *
 * @returns
 */
const RebateDetail = () => {
  const { state } = useLocation();
  const { formatMsg } = useLanguage();

  // TODO 2023-04-20 18:06:34 时间暂时不做处理
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState(0);
  const [tableRes, setTableRes] = useState(null);

  useEffect(() => {
    if (!tableRes) {
      if (state) {
        if (state.type === 1) {
          setTableRes([
            ...state?.list?.map((it) => ({ ...it, BetRatio: `${it.Rate}%` })),
          ]);
        } else {
          setTableRes([...state?.list.map((it) => ({ ...it }))]);
        }
        if (state.list?.length > 0) {
          setTotal(state.list[0].TotalRewardScore);
        }
        let tmpTitle = state.type === 1 ? 'PC28' : formatMsg('otherBetting');
        if (state.st) {
          const [ymd] = state.st.split(' ');
          if (ymd) {
            const [, m, d] = ymd.split('-');
            tmpTitle += `(${m}-${d}${formatMsg('zhi')}`;
          } else {
            tmpTitle += `(--${formatMsg('zhi')}`;
          }
        }
        if (state.nt) {
          const [ymd] = state.nt.split(' ');
          if (ymd) {
            const [, m, d] = ymd.split('-');
            tmpTitle += `${m}-${d})`;
          } else {
            tmpTitle += '--)';
          }
        }
        setTitle(tmpTitle);
      }
    }
  }, [tableRes, state, formatMsg]);

  const buildTableTip = () => (
    <RecordDetailSub title={title}>
      <div>
        <span>{formatMsg('amountTo')}</span>
        <span>{total}</span>
      </div>
    </RecordDetailSub>
  );
  const buildTable1 = () => {
    const headerData = {
      DateId: `${formatMsg('date')}`,
      ValidBetScore: `${formatMsg('validBet')}`,
      WinLoseScore: `${formatMsg('winOrLose')}`,
      RewardScore: `${formatMsg('backwater')}`,
      BetRatio: `${formatMsg('portProportion')}`,
    };
    const dataKeys = [
      'DateId',
      'ValidBetScore',
      'WinLoseScore',
      'RewardScore',
      'BetRatio',
    ];
    const dataRowFlex = [3, 2, 2, 2, 2];
    return (
      <div className='bg-main m-t-20'>
        {buildTableTip()}
        <RecordDetail
          divider
          dataKeys={dataKeys}
          dataRowFlex={dataRowFlex}
          data={headerData}
        />
        {tableRes &&
          tableRes.map((r, i) => {
            r.ValidBetScore = formatDigit(r.ValidBetScore);
            r.WinLoseScore = formatDigit(r.WinLoseScore);
            r.RewardScore = formatDigit(r.RewardScore);
            return (
              <RecordDetail
                divider
                key={i || r.DateId}
                dataKeys={dataKeys}
                dataRowFlex={dataRowFlex}
                data={r}
              />
            );
          })}
      </div>
    );
  };

  const buildTable2 = () => {
    const headerData = {
      DateId: `${formatMsg('date')}`,
      TotalValidBetScore: `${formatMsg('validBet')}`,
      WinScore: `${formatMsg('winOrLose')}`,
      TotalRewardScore: `${formatMsg('rebate')}`,
    };
    const dataKeys = [
      'DateId',
      'TotalValidBetScore',
      'WinScore',
      'TotalRewardScore',
    ];
    const dataRowFlex = [4, 3, 3, 3];
    return (
      <div className='bg-main m-t-20'>
        {buildTableTip()}
        <RecordDetail
          divider
          dataKeys={dataKeys}
          dataRowFlex={dataRowFlex}
          data={headerData}
        />
        {tableRes &&
          tableRes.map((r, i) => {
            r.TotalValidBetScore = formatDigit(r.TotalValidBetScore);
            r.WinScore = formatDigit(r.WinScore);
            r.TotalRewardScore = formatDigit(r.TotalRewardScore);
            return (
              <RecordDetail
                divider
                key={i || r.DateId}
                dataKeys={dataKeys}
                dataRowFlex={dataRowFlex}
                data={r}
              />
            );
          })}
      </div>
    );
  };

  return <>{state?.type === 1 ? buildTable1() : buildTable2()}</>;
};

export default RebateDetail;

