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
  KindId?: number;
  curGameId?: number;
}
const typeTitle = [
  { id: 1, title: '名次', key: 'MING_CI' },
  { id: 2, title: '号码', key: 'HAO_MA' },
  { id: 3, title: '大小', key: 'DA_XIAO' },
  { id: 4, title: '单双', key: 'DAN_SHUANG' },
];
const GoldGamesTitle = [
  { id: 0, title: '万', key: 'WAN' },
  { id: 1, title: '千', key: 'QIAN_NUM' },
  { id: 2, title: '佰', key: 'BAI' },
  { id: 3, title: '拾', key: 'SHI' },
  { id: 4, title: '个', key: 'GE' },
  { id: 5, title: '总和', key: 'SUM' },
  { id: 6, title: '前三', key: 'QIANSAN' },
  { id: 7, title: '中三', key: 'ZHOGN_SAN' },
  { id: 8, title: '后三', key: 'HOUSAN' },
  { id: 9, title: '龙虎', key: 'LONG_HU' },
];

const GoldFiftySecRecords = (props: GoldRecordsProps) => {
  const { PeriodId, GameResult, Date, ResultType, sumRes, KindId } = props;
  const { formatMsg } = useLanguage();

  const sizeArr = ResultType.slice(3, 8).concat(ResultType.slice(0, 1));
  const sigDouArr = ResultType.slice(8, 13).concat(ResultType.slice(1, 2));
  const sumArr = ResultType.slice(13, 16).concat(ResultType.slice(2, 3));

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
            <span className='t-small-title font-w-bold m-r-30'>
              {`${PeriodId.slice(-8)}期`}
            </span>
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
          more ? 'h-0 o-none' : 'h-290'
        }`}
      >
        <div className='w-90 h-290 bg-alternate'>
          {typeTitle.map((it) => (
            <div key={it.id} className='color-primary p-16-10'>
              {/* {it.title} */}
              {formatMsg(it.key)}
            </div>
          ))}
        </div>
        <div className='flex-1 ta-c'>
          <div className='d-f ai-b flex-1 bg-records-title'>
            {GoldGamesTitle.map((item, i) => (
              <div
                key={item.id}
                className={`color-records-col ws-no p-16-0 ${
                  i > 5 ? 'w-120' : 'w-78'
                } `}
              >
                {/* {item.title} */}
                {formatMsg(item.key)}
              </div>
            ))}
          </div>
          <div className='d-f flex-1'>
            <div>
              <div className='d-f'>
                {[...GameResult, sumRes].map((item, i) => (
                  <div
                    key={`${Math.random()}`}
                    className={`ws-no p-16-0 b-r-1 w-78 ${
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
                    className={`ws-no p-16-0 b-r-1 w-78 ${
                      i !== 5 ? 'bc-split' : ''
                    } ${
                      Number(item) === 0 ? 'color-red' : 'color-game-ball-blue'
                    }`}
                  >
                    {formatMsg(GameMgr.GetResultDesc(KindId, Number(item)))}
                  </div>
                ))}
              </div>
              <div className='d-f'>
                {sigDouArr.map((item, i) => (
                  <div
                    key={`${Math.random()}`}
                    className={`ws-no p-16-0 b-r-1 w-78 ${
                      i !== 5 ? 'bc-split' : ''
                    } ${
                      Number(item) === 2 ? 'color-red' : 'color-game-ball-blue'
                    }`}
                  >
                    {formatMsg(GameMgr.GetResultDesc(KindId, Number(item)))}
                  </div>
                ))}
              </div>
            </div>
            <div className='d-f flex-1 ta-c'>
              {sumArr.map((item) => (
                <div
                  key={`${Math.random()}`}
                  className='ws-no df-aic-jcc p-16-0 b-l-1 w-120 bc-split'
                >
                  {formatMsg(GameMgr.GetResultDesc(KindId, Number(item)))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(GoldFiftySecRecords);
