import { memo, useState } from 'react';
import { BothColorLine } from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage } from '@/hooks';

interface PcRecordsProps {
  GameResult?: string;
  PeriodId?: string;
  ResultType?: any[];
  Date?: string;
}
const typeTitle = [
  { id: 1, title: '名次', key: 'MING_CI' },
  { id: 2, title: '号码', key: 'HAO_MA' },
];
const pcGamesTitle = [
  { id: 1, title: '1球', key: 'YI_QIU' },
  { id: 2, title: '2球', key: 'ER_QIU' },
  { id: 3, title: '3球', key: 'SAN_QIU' },
  { id: 4, title: '特码', key: 'TE_MA' },
  { id: 5, title: '大小', key: 'DA_XIAO' },
  { id: 6, title: '单双', key: 'DAN_SHUANG' },
  { id: 7, title: '波色', key: 'BO_SE' },
  { id: 8, title: '极值', key: 'JI_ZHI' },
  { id: 9, title: '顺子/对子/豹子', key: 'SHUN_DUI_BAO' },
];

const PcFiftyRecords = (props: PcRecordsProps) => {
  const { PeriodId, GameResult, Date, ResultType } = props;
  const { formatMsg } = useLanguage();

  const [more, setMore] = useState(true);

  // 第二行号码展示
  const ballRes = [
    { id: 1, value: GameResult[1] },
    { id: 2, value: GameResult[2] },
    { id: 3, value: GameResult[3] },
    { id: 4, value: GameResult[0] },
    {
      id: 5,
      value: GameMgr.GetResultDesc(2801, Number(ResultType[0])),
      cls: `${
        Number(ResultType[0]) === 0 ? 'color-red' : 'color-game-ball-blue'
      }`,
    },
    {
      id: 6,
      value: GameMgr.GetResultDesc(2801, Number(ResultType[1])),
      cls: `${
        Number(ResultType[1]) === 2 ? 'color-red' : 'color-game-ball-blue'
      }`,
    },
    {
      id: 7,
      value: GameMgr.GetResultDesc(2801, Number(ResultType[3])),
      cls: `${
        Number(ResultType[3]) === 7
          ? 'color-red'
          : `${
              Number(ResultType[3]) === 8
                ? 'color-game-ball-blue'
                : 'color-game-ball-green'
            }`
      }`,
    },
    { id: 8, value: GameMgr.GetResultDesc(2801, Number(ResultType[2])) },
    { id: 9, value: GameMgr.GetResultDesc(2801, Number(ResultType[4])) },
  ];

  // 展示下拉框
  const handleShow = () => {
    setMore(!more);
  };

  return (
    <div className='m-b-2'>
      <div className='p-30 bg-body'>
        <div className='d-f jc-sb'>
          <div>
            <span className='t--small-title font-w-bold m-r-30'>{`${PeriodId.slice(
              4
            )}期`}</span>
            <span className='t-small'>{Date}</span>
          </div>
          <div className='w-376 h-50 bg-main p-2-30'>
            <span>{`特码 ${GameResult[0]}`}</span>
            <span
              className={`m-r-10 ${
                Number(ResultType[0]) === 0
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >{` , ${GameMgr.GetResultDesc(2801, Number(ResultType[0]))}`}</span>
            <span
              className={`${
                Number(ResultType[1]) === 2
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >{` , ${GameMgr.GetResultDesc(2801, Number(ResultType[1]))}`}</span>
          </div>
        </div>
        <BothColorLine classBox='jc-c m-30-0' GameResult={GameResult} />
        <div className=' w-44 df-aic-jcsb f-r' onClick={handleShow}>
          <div className='w-10 h-10 br-10 bg-con-ass' />
          <div className='w-10 h-10 br-10 bg-con-ass' />
          <div className='w-10 h-10 br-10 bg-con-ass' />
        </div>
      </div>
      <div
        className={`d-f flex-1 t-small trans-h ${
          more ? 'h-0 o-none' : 'h-140'
        }`}
      >
        <div className='w-90 h-140 bg-alternate'>
          {typeTitle.map((it) => (
            <div key={it.id} className='color-primary p-16-10'>
              {/* {it.title} */}
              {formatMsg(it.key)}
            </div>
          ))}
        </div>
        <div className='flex-1 ta-c'>
          <div className='d-f flex-1 bg-records-title'>
            {pcGamesTitle.map((item) => (
              <div
                key={item.id}
                className={`color-records-col ws-no p-15-0 ${
                  item.id === 9
                    ? 'flex-1'
                    : `${item.id === 8 ? 'w-120' : 'w-86'}`
                }`}
              >
                {/* {item.title} */}
                {formatMsg(item.key)}
              </div>
            ))}
          </div>
          <div className='d-f'>
            {ballRes.map((item) => (
              <div
                key={item.id}
                className={`ws-no p-15-0 b-r-1 ${item?.cls} ${
                  item.id === 9
                    ? 'flex-1'
                    : `bc-split ${item.id === 8 ? 'w-120' : 'w-86'}`
                }`}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PcFiftyRecords);
