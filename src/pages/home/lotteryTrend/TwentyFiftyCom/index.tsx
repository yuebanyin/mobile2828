import { memo, useMemo, useState } from 'react';
import { TwentyBallLine } from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
import { ColorResultTypeNumber } from '@/pages/gameComponents/colorResultType';
import { useLanguage } from '@/hooks';

interface GoldRecordsProps {
  GameResult?: string;
  PeriodId?: string;
  ResultType?: any[];
  Date?: string;
  sumRes?: number;
  curGameId?: number;
}
const typeTitle = [
  { id: 0, title: '和值', key: 'sumValue' },
  { id: 1, title: '大小', key: 'DA_XIAO' },
  { id: 2, title: '单双', key: 'DAN_SHUANG' },
  { id: 3, title: '五行', key: 'WU_HANG' },
  { id: 4, title: '奇偶和', key: 'JI_OU_HE' },
  { id: 5, title: '上中下', key: 'SHANG_ZHONG_XIA' },
];
const GoldGamesTitle = [
  { id: 0, title: '总和', key: 'SUM' },
  { id: 1, title: '号码分布', key: 'numberDistribution' },
];

const TwentyFiftyRecords = (props: GoldRecordsProps) => {
  const { PeriodId, GameResult, Date, ResultType, sumRes } = props;
  const { formatMsg } = useLanguage();

  const resultTypeSpan = useMemo(() => {
    // FIXME 2023-09-26 15:36:13 统一处理转移和染色
    const spanList = ResultType.map((r) => {
      const value = GameMgr.GetResultDesc(3501, parseInt(r));
      console.log('🚀 ~ file: index.tsx:32 ~ spanList ~ value:', value);
      return <ColorResultTypeNumber value={parseInt(r)} />;
    });
    return spanList;
  }, [ResultType]);

  const [more, setMore] = useState(true);

  // 展示下拉框
  const handleShow = () => {
    setMore(!more);
  };

  return (
    <div className='m-b-2' onClick={handleShow}>
      <div className='p-30 bg-body'>
        <div className='d-f jc-sb'>
          <div>
            <span className='t-small-title font-w-bold m-r-30'>{`${PeriodId}期`}</span>
            <span className='t-small'>{Date}</span>
          </div>
          <div className='h-50 ta-c bg-main p-2-20'>
            <span>{`${formatMsg('sumValue')}  ${sumRes} `}</span>
            <span>,</span>
            <span
              className={`m-r-10 ${
                Number(ResultType[0]) === 0
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >
              {`${formatMsg(
                GameMgr.GetResultDesc(3501, Number(ResultType[0]))
              )}`}
            </span>
            <span>,</span>
            <span
              className={`${
                Number(ResultType[1]) === 2
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >
              {`${formatMsg(
                GameMgr.GetResultDesc(3501, Number(ResultType[1]))
              )}`}
            </span>
          </div>
        </div>
        <div className='d-f jc-c'>
          <TwentyBallLine classBox='m-t-30' GameResult={GameResult} />
        </div>
        <div className='d-f jc-end'>
          <div className='d-f p-l-50 p-t-30 p-r-50'>
            <div className='w-10 h-10 m-r-10 br-10 bg-con-ass' />
            <div className='w-10 h-10 m-r-10 br-10 bg-con-ass' />
            <div className='w-10 h-10 br-10 bg-con-ass' />
          </div>
        </div>
      </div>
      <div
        className={`d-f fd-c flex-1 t-small trans-h ${
          more ? 'h-0 o-none' : 'h-210'
        }`}
      >
        <div className='d-f bg-records-title'>
          {GoldGamesTitle.map((item) => (
            <div
              key={item.id}
              className={`color-records-col ws-no p-16-0 ta-c ${
                item.id > 0 ? 'flex-3' : 'flex-4'
              } `}
            >
              {/* {item.title} */}
              {formatMsg(item.key)}
            </div>
          ))}
        </div>
        <div className='d-f bg-alternate'>
          {typeTitle.map((item) => (
            <div
              key={item.id}
              className={`color-records-col ws-no p-16-0 ta-c ${
                item.id > 4 ? 'flex-3' : 'flex-2'
              } `}
            >
              {/* {item.title} */}
              {formatMsg(item.key)}
            </div>
          ))}
        </div>
        <div className='d-f'>
          <div className='color-records-col ws-no p-16-0 ta-c flex-2'>
            {sumRes}
          </div>
          {[...resultTypeSpan].map((item, i) => (
            <div
              key={item.key || `${i}`}
              className={`color-records-col ws-no p-16-0 ta-c ${
                i > 3 ? 'flex-3' : 'flex-2'
              } `}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TwentyFiftyRecords);

