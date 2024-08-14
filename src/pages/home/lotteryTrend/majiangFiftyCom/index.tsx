import { memo, useState } from 'react';
import { MajiangLine } from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage } from '@/hooks';

interface MajiangRecordsProps {
  KindId?: number;
  GameResult?: string;
  PeriodId?: string;
  ResultType?: any[];
  Date?: string;
  curGameId?: number;
}
const typeTitle = [
  { id: 1, title: '名次', key: 'MING_CI' },
  { id: 2, title: '号码', key: 'HAO_MA' },
  { id: 3, title: '大小', key: 'DA_XIAO' },
  { id: 4, title: '单双', key: 'DAN_SHUANG' },
  { id: 5, title: '龙虎', key: 'LONG_HU' },
];
const mjGamesTitle = [
  { id: 1, title: '冠军', key: 'NUMBER_1' },
  { id: 2, title: '亚军', key: 'NUMBER_2' },
  { id: 3, title: '第三名', key: 'NUMBER_3' },
  { id: 4, title: '第四名', key: 'NUMBER_4' },
  { id: 5, title: '第五名', key: 'NUMBER_5' },
  { id: 6, title: '第六名', key: 'NUMBER_6' },
  { id: 7, title: '第七名', key: 'NUMBER_7' },
  { id: 8, title: '第八名', key: 'NUMBER_8' },
  { id: 9, title: '第九名', key: 'NUMBER_9' },
  { id: 10, title: '第十名', key: 'NUMBER_10' },
];

const MajinagFiftyCom = (props: MajiangRecordsProps) => {
  const { PeriodId, GameResult, Date, ResultType, KindId } = props;

  const [more, setMore] = useState(true);
  const { formatMsg } = useLanguage();

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
          <div className='w-376 h-50 ta-c bg-main p-2-20 ws-no'>
            <span>
              {`${formatMsg('GUAN_YA_HE')} ${
                Number(GameResult[0]) + Number(GameResult[1])
              }`}
            </span>
            <span>,</span>
            <span
              className={`m-r-10 ${
                Number(ResultType[25]) === 0
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >
              {`${formatMsg(
                GameMgr.GetResultDesc(KindId, Number(ResultType[25]))
              )}`}
            </span>
            <span>,</span>
            <span
              className={`${
                Number(ResultType[26]) === 2
                  ? 'color-red'
                  : 'color-game-ball-blue'
              }`}
            >
              {`${formatMsg(
                GameMgr.GetResultDesc(KindId, Number(ResultType[26]))
              )}`}
            </span>
          </div>
        </div>
        <MajiangLine classBox='jc-c m-30-0' GameResult={GameResult} />
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
          more ? 'h-0 o-none' : 'h-348'
        }`}
      >
        <div className='w-90 h-348 bg-alternate'>
          {typeTitle.map((it) => (
            <div key={it.id} className='color-primary p-15-10'>
              {/* {it.title} */}
              {formatMsg(it.key)}
            </div>
          ))}
        </div>
        <div className='flex-1 ta-c'>
          <div className='d-f ai-b flex-1 bg-records-title'>
            {mjGamesTitle.map((item) => (
              <div
                key={item.id}
                className={`t-30 color-records-col ws-no p-15-0 ${
                  item.id > 2 ? 'w-105' : 'w-70'
                }`}
              >
                {/* {item.title} */}
                {formatMsg(item.key)}
              </div>
            ))}
          </div>
          <div className='d-f ai-c'>
            {Object.values(GameResult).map((item, i) => (
              <div
                key={item}
                className={`ws-no p-15-0 b-r-1 ${i !== 9 ? 'bc-split' : ''} ${
                  i + 1 > 2 ? 'w-105' : 'w-70'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className='d-f ai-c'>
            {Object.values(GameResult).map((item, i) => (
              <div
                key={item}
                className={`ws-no p-15-0 b-r-1 ${i !== 9 ? 'bc-split' : ''} ${
                  i + 1 > 2 ? 'w-105' : 'w-70'
                } ${
                  Number(ResultType[i]) === 0
                    ? 'color-red'
                    : 'color-game-ball-blue'
                }`}
              >
                {formatMsg(
                  GameMgr.GetResultDesc(KindId, Number(ResultType[i]))
                )}
              </div>
            ))}
          </div>
          <div className='d-f ai-c'>
            {Object.values(GameResult).map((item, i) => (
              <div
                key={item}
                className={`ws-no p-15-0 b-r-1 ${i !== 9 ? 'bc-split' : ''} ${
                  i + 1 > 2 ? 'w-105' : 'w-70'
                } ${
                  Number(ResultType[i + 10]) === 2
                    ? 'color-red'
                    : 'color-game-ball-blue'
                }`}
              >
                {formatMsg(
                  GameMgr.GetResultDesc(KindId, Number(ResultType[i + 10]))
                )}
              </div>
            ))}
          </div>
          <div className='d-f ai-b'>
            {ResultType.slice(20, 25).map((item, i) => (
              <div
                key={`${i * Math.random()}`}
                className={`ws-no p-15-0 b-r-1 ${i !== 9 ? 'bc-split' : ''} ${
                  i + 1 > 2 ? 'w-105' : 'w-70'
                } ${Number(item) === 4 ? 'color-red' : 'color-game-ball-blue'}`}
              >
                {formatMsg(GameMgr.GetResultDesc(KindId, Number(item)))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MajinagFiftyCom);
