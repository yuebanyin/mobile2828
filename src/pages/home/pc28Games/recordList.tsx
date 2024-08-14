import { memo, useState } from 'react';
import { BothColorLine } from '@/pages/gameComponents';
import { Icon } from '@/components';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage } from '@/hooks';

interface RecordListProps {
  recordData?: any[];
  gameId?: number;
  isShowMore?: boolean;
}

const RecordList = (props: RecordListProps) => {
  const { recordData } = props;
  const [recordShow, setRecordShow] = useState(false);
  const { formatMsg } = useLanguage();
  // const { gameActiveId } = useGameConfigStore(); // 游戏配置

  // 点击收起展示游戏记录
  const handleShowRecord = () => {
    setRecordShow(!recordShow);
  };
  return (
    <div className='p-r'>
      <div
        className={`p-a zi-small left-0 right-0 o-none bg-body ${
          recordShow ? 'h-auto' : 'h-110 m-b-20'
        }`}
      >
        {recordData.length !== 0 ? (
          <div className='p-a top-30 right-50' onClick={handleShowRecord}>
            <Icon className='t-h2' name='rect-down' />
          </div>
        ) : (
          ''
        )}
        <div className={`${recordShow ? 'h-auto' : 'h-110'}`}>
          {recordData?.map((item, i) => (
            <div
              key={`${i + 1}`}
              className={`h-110 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                i % 2 === 0 ? '' : 'bg-alternate'
              }`}
            >
              <div className='m-r-20'>
                <span>{formatMsg('di')}</span>
                <span className='color-red'>
                  {item?.szPeriodNumber?.value?.substring(
                    item.szPeriodNumber.value.length - 8,
                    item.szPeriodNumber.value.length
                  )}
                </span>
                <span>{formatMsg('qi')}</span>
              </div>
              <BothColorLine classBall='w-86 h-86 t-h1' item={item} />
              <div className='wds-h2 font-w-bold'>
                (
                <span
                  className={`m-r-10 ${
                    item?.cbResultType[0]?.value === 0
                      ? 'color-red'
                      : 'color-game-ball-blue'
                  }`}
                >
                  {formatMsg(
                    GameMgr.GetResultDesc(2801, item?.cbResultType[0]?.value)
                  )}
                </span>
                <span
                  className={`${
                    item?.cbResultType[1]?.value === 2
                      ? 'color-red'
                      : 'color-game-ball-blue'
                  }`}
                >
                  {formatMsg(
                    GameMgr.GetResultDesc(2801, item?.cbResultType[1]?.value)
                  )}
                </span>
                )
              </div>
            </div>
          ))}
        </div>
        <div
          className={`zi-mini ${recordShow ? 'p-f w-full h-vh bg-mask' : ''}`}
        />
      </div>
    </div>
  );
};

export default memo(RecordList);
