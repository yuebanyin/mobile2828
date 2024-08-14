import { memo, useState } from 'react';
import { ColorfulLine, FiveEleBall } from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage } from '@/hooks';

interface MarkSixRecordsProps {
  GameResult?: string;
  PeriodId?: string;
  ResultType?: any[];
  Date?: string;
  sumRes?: number; // 调整： 香港六合彩不显示总和
  curGameId?: number;
}
const typeTitle = [
  { id: 1, title: '名次', key: 'MING_CI' },
  { id: 2, title: '号码', key: 'HAO_MA' },
  { id: 3, title: '生肖', key: 'SHENG_XIAO' },
  { id: 4, title: '波色', key: 'BO_SE' },
];
const MarkSixGamesTitle = [
  { id: 0, title: '正码一', key: 'ZM_1' },
  { id: 1, title: '正码二', key: 'ZM_2' },
  { id: 2, title: '正码三', key: 'ZM_3' },
  { id: 3, title: '正码四', key: 'ZM_4' },
  { id: 4, title: '正码五', key: 'ZM_5' },
  { id: 5, title: '正码六', key: 'ZM_6' },
  { id: 6, title: '特码', key: 'TE_MA' },
  // { id: 7, title: '总和' },
];

const MarkSixFiftyRecords = (props: MarkSixRecordsProps) => {
  const { PeriodId, GameResult, Date, ResultType, curGameId } = props;
  const { formatMsg } = useLanguage();

  const numBall = GameResult.slice(1).concat(GameResult.slice(0, 1)); //  调整特码
  const zodiacArr = ResultType.slice(21, 28); // 生肖组

  const colorWaveArr = ResultType.slice(14, 21); // 色波组
  // const colorWaveArr = ResultType.slice(14, 21).concat(ResultType.slice(29, 30)); // 色波组

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
              {`${PeriodId.slice(4)}期`}
            </span>
            <span className='t-small'>{Date}</span>
          </div>
          <div className='h-50 ta-c bg-main p-2-20 d-f ai-c'>
            <span>{`${formatMsg('TE_MA')}  ${GameResult[0]} `}</span>
            <span>,</span>
            <span
              className={`m-r-10 ${
                Number(ResultType[0]) === 0
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >
              {`${formatMsg(
                GameMgr.GetResultDesc(curGameId, Number(ResultType[0]))
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
                GameMgr.GetResultDesc(curGameId, Number(ResultType[1]))
              )}`}
            </span>
            {curGameId === 3402 && (
              <>
                <span>,</span>
                {/* <span>{` ${GameMgr.GetResultDesc(curGameId, Number(ResultType[30]))}`}</span> */}
                <span>
                  <FiveEleBall
                    className='w-40 h-40 t-30 lh-46'
                    resultNum={Number(ResultType[30])}
                  />
                </span>
              </>
            )}
          </div>
        </div>
        <ColorfulLine classBox='jc-c m-30-0' GameResult={numBall} />
        <div className='d-f ai-b jc-c'>
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[21]))
            )}
          </div>
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[22]))
            )}
          </div>
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[23]))
            )}
          </div>
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[24]))
            )}
          </div>
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[25]))
            )}
          </div>
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[26]))
            )}
          </div>
          <div className=' m-r-30' />
          <div className='w-72 h-72 df-aic-jcc m-r-10'>
            {formatMsg(
              GameMgr.GetResultDesc(curGameId, Number(ResultType[27]))
            )}
          </div>
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
        className={`d-f flex-1 t-small trans-h ${
          more ? 'h-0 o-none' : 'h-282'
        }`}
      >
        <div className='w-90 h-282 bg-alternate'>
          {typeTitle.map((it) => (
            <div key={it.id} className='color-primary p-15-10'>
              {/* {it.title} */}
              {formatMsg(it.key)}
            </div>
          ))}
        </div>
        <div className='flex-1 ta-c'>
          <div className='d-f flex-1 bg-records-title'>
            {MarkSixGamesTitle.map((item) => (
              <div
                key={item.id}
                className={`t-30 color-records-col ws-no p-15-0  ${
                  item.id !== 6 ? 'w-140' : 'flex-1'
                } `}
              >
                {/* {item.title} */}
                {formatMsg(item.key)}
              </div>
            ))}
          </div>
          <div className='d-f ai-c'>
            {[...numBall].map((item, i) => (
              <div
                key={`${Math.random()}`}
                className={`ws-no p-15-0  b-r-1 ${
                  i !== 6 ? 'w-140' : 'flex-1'
                } ${i !== 6 ? 'bc-split' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className='d-f ai-c'>
            {zodiacArr.map((item, i) => (
              <div
                key={`${Math.random()}`}
                className={`ws-no p-15-0  b-r-1 ${
                  i !== 6 ? 'w-140' : 'flex-1'
                } ${i !== 6 ? 'bc-split' : ''} `}
              >
                {formatMsg(GameMgr.GetResultDesc(curGameId, Number(item)))}
              </div>
            ))}
          </div>
          <div className='d-f ai-c'>
            {colorWaveArr.map((item, i) => (
              <div
                key={`${Math.random()}`}
                className={`ws-no p-15-0  b-r-1 ${
                  i !== 6 ? 'w-140' : 'flex-1'
                } ${i !== 6 ? 'bc-split' : ''} ${
                  Number(item) === 4
                    ? 'color-red'
                    : `${
                        Number(item) === 5
                          ? 'color-game-ball-blue'
                          : 'color-game-ball-green'
                      }`
                }`}
              >
                {formatMsg(GameMgr.GetResultDesc(curGameId, Number(item)))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MarkSixFiftyRecords);
