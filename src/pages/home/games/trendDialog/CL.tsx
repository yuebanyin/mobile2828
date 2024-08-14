import { memo } from 'react';
import { GameMgr } from '@/engine/mgr/mgr';
import { gameBetName } from './const';
import { CMD_2801 } from '@/engine/game/28/2801/CMD_2801';
import { useLanguage } from '@/hooks';

interface CLProps {
  renData: any[];
  gameType: number;
}

const CL = memo((props: CLProps) => {
  const { renData, gameType } = props;
  const { formatMsg } = useLanguage();
  return (
    <div className='d-f flex-1 fd-c o-y'>
      {renData
        .filter(({ v }) => v !== CMD_2801.emResultType.RT_JI_WU)
        .map((it, i) => (
          <div
            key={it.i}
            className={`${
              i % 2 === 0 ? 'bg-alternate' : 'bg-body'
            } d-f ai-c p-16-0 wds-sm-con`}
          >
            <div className='flex-1 ta-c'>
              {`${formatMsg(gameBetName(gameType, it.i))}-${formatMsg(
                GameMgr.GetResultDesc(gameType, it.v)
              )}`}
            </div>
            <div className='flex-1 ta-c'>
              {it.len}
              {formatMsg('qi')}
            </div>
          </div>
        ))}
    </div>
  );
});

export default CL;
