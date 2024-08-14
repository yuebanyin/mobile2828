import { MutableRefObject, memo } from 'react';
import { ColorfulBall, Scratch } from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage } from '@/hooks';

interface RecordListProps {
  recordData?: any[];
  gameId?: number;
  isShowMore?: boolean;
  isScratch?: boolean;
  ref?: any;
  canvasRefTwo?: MutableRefObject<HTMLCanvasElement>;
  onBigClear?: Function;
}

const LotResult = memo((props: RecordListProps) => {
  const { recordData, isScratch, canvasRefTwo, onBigClear } = props;
  const { formatMsg } = useLanguage();

  const newPerNum = (perNum) => {
    const perLength = perNum.length;
    if (perLength <= 8) {
      return perNum;
    }
    if (perLength > 8) {
      return perNum.slice(perLength - 8, perLength);
    }
    return perNum;
  };

  return (
    <div className='o-y p-r'>
      {recordData?.map((item, i) => (
        <div className='p-r' key={`${i + 100}`}>
          {isScratch && i === 0 && (
            <div className='p-a w-full h-110 ta-r p-r-30 zi-middle right-0 left-0 top-0'>
              <Scratch
                className='p-r zi-small br-20'
                ref={canvasRefTwo}
                width={690}
                height={110}
                clear={onBigClear}
              />
            </div>
          )}
          <div
            key={`${i + 1}`}
            className={`h-110 p-0-50 df-aic-jcc t-main lh-52  color-primary-text ${
              i % 2 === 0 ? 'bg-alternate' : ''
            }`}
          >
            <div className='m-r-20'>
              <span>{formatMsg('di')}</span>
              <span className='color-red'>
                {newPerNum(item.szPeriodNumber?.value)}
              </span>
              <span>{formatMsg('qi')}</span>
            </div>
            <div className='d-f ai-c'>
              <ColorfulBall
                className='w-86 h-86 t-h1'
                text={item?.cbTableCard[1]?.value}
                type='normal'
              />
              <div className='t--small-title m-r-10 font-w-bold'>+</div>
              <ColorfulBall
                className='w-86 h-86 t-h1'
                text={item?.cbTableCard[2]?.value}
                type='normal'
              />
              <div className='t--small-title m-r-10 font-w-bold'>+</div>
              <ColorfulBall
                className='w-86 h-86 t-h1'
                text={item?.cbTableCard[3]?.value}
                type='normal'
              />
              <div className='t--small-title m-r-10 font-w-bold'>=</div>
              <ColorfulBall
                className='w-86 h-86 t-h1'
                text={item?.cbTableCard[0]?.value}
                type='wordBorder'
              />
            </div>
            <div className='wds-h2 font-w-bold'>
              (
              <span
                className={`m-r-10 ${
                  item.cbResultType[0].value === 0
                    ? 'color-red'
                    : 'color-game-ball-blue'
                }`}
              >
                {formatMsg(
                  GameMgr.GetResultDesc(2801, item.cbResultType[0].value)
                )}
              </span>
              <span
                className={`${
                  item.cbResultType[1].value === 2
                    ? 'color-red'
                    : 'color-game-ball-blue'
                }`}
              >
                {formatMsg(
                  GameMgr.GetResultDesc(2801, item.cbResultType[1].value)
                )}
              </span>
              )
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default LotResult;
