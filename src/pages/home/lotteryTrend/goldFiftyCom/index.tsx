import { memo, useState } from 'react';
import { SingGoldLine } from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
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
  { id: 1, title: '类型', key: 'type' },
  { id: 2, title: '号码', key: 'HAO_MA' },
  { id: 3, title: '大小', key: 'DA_XIAO' },
  { id: 4, title: '单双', key: 'DAN_SHUANG' },
];
const GoldGamesTitle = [
  { id: 0, title: '总和', key: 'SUM' },
  { id: 1, title: '第一球', key: 'QIU_1' },
  { id: 2, title: '第二球', key: 'QIU_2' },
  { id: 3, title: '第三球', key: 'QIU_3' },
  { id: 4, title: '第四球', key: 'QIU_4' },
  { id: 5, title: '第五球', key: 'QIU_5' },
];

const GoldFiftyRecords = (props: GoldRecordsProps) => {
  const { PeriodId, GameResult, Date, ResultType, sumRes } = props;
  const { formatMsg } = useLanguage();

  const sizeArr = ResultType.slice(0, 1).concat(ResultType.slice(3, 8));
  const sigDouArr = ResultType.slice(1, 2).concat(ResultType.slice(8, 13));

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
          <div className='w-330 h-50 ta-c bg-main p-2-20'>
            <span>{`${formatMsg('SUM')}  ${sumRes} `}</span>
            <span>,</span>
            <span
              className={`m-r-10 ${
                Number(ResultType[0]) === 0
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >
              {`${formatMsg(
                GameMgr.GetResultDesc(2801, Number(ResultType[0]))
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
                GameMgr.GetResultDesc(2801, Number(ResultType[1]))
              )}`}
            </span>
          </div>
        </div>
        <SingGoldLine classBox='jc-c m-30-0' GameResult={GameResult} />
        <div className='d-f jc-end'>
          <div className='d-f p-l-50 p-t-30 p-r-50'>
            <div className='w-10 h-10 m-r-10 br-10 bg-con-ass' />
            <div className='w-10 h-10 m-r-10 br-10 bg-con-ass' />
            <div className='w-10 h-10 br-10 bg-con-ass' />
          </div>
        </div>
      </div>
      <div
        className={`d-f flex-1 t-small trans-h ${
          more ? 'h-0 o-none' : 'h-282'
        }`}
      >
        <div className='w-90 h-282 bg-alternate'>
          {typeTitle.map((it) => (
            <div key={it.id} className='color-primary p-16-10'>
              {/* {it.title} */}
              {formatMsg(it.key)}
            </div>
          ))}
        </div>
        <div className='flex-1 ta-c'>
          <div className='d-f ai-b flex-1 bg-records-title'>
            {GoldGamesTitle.map((item) => (
              <div
                key={item.id}
                className={`color-records-col ws-no p-16-0 ${
                  item.id > 0 ? 'w-168' : 'w-140'
                } `}
              >
                {/* {item.title} */}
                {formatMsg(item.key)}
              </div>
            ))}
          </div>
          <div className='d-f'>
            {[sumRes, ...GameResult].map((item, i) => (
              <div
                key={`${Math.random()}`}
                className={`ws-no p-16-0 b-r-1 ${i > 0 ? 'w-168' : 'w-140'} ${
                  i !== 5 ? 'bc-split' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className='d-f'>
            {sizeArr.map((item, i) => (
              <div
                key={`${Math.random()}`}
                className={`ws-no p-16-0 b-r-1 ${i > 0 ? 'w-168' : 'w-140'} ${
                  i > 0 ? 'w-168' : 'w-140'
                } ${i !== 5 ? 'bc-split' : ''} ${
                  Number(item) === 0 ? 'color-red' : 'color-game-ball-blue'
                }`}
              >
                {formatMsg(GameMgr.GetResultDesc(2905, Number(item)))}
              </div>
            ))}
          </div>
          <div className='d-f'>
            {sigDouArr.map((item, i) => (
              <div
                key={`${Math.random()}`}
                className={`ws-no p-16-0 b-r-1 ${i > 0 ? 'w-168' : 'w-140'} ${
                  i > 0 ? 'w-168' : 'w-140'
                } ${i !== 5 ? 'bc-split' : ''} ${
                  Number(item) === 2 ? 'color-red' : 'color-game-ball-blue'
                }`}
              >
                {formatMsg(GameMgr.GetResultDesc(2905, Number(item)))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GoldFiftyRecords);
