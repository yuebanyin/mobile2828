import { memo } from 'react';
import { Obj } from '@/constants';
import { SingleColorBall } from '../singleColorBall';
import { GameMgr } from '@/engine/mgr/mgr';

interface SingGoldLineProps {
  item?: Obj;
  gameId?: number;
  GameResult?: string | string[];
  classBox?: string;
  classBall?: string;
}

export const SingGoldLine = memo((props: SingGoldLineProps) => {
  const {
 item, GameResult, gameId, classBox, classBall 
} = props;
  return (
    <div className={`d-f ai-c ${classBox}`}>
      <SingleColorBall text={item ? item.cbTableCard[0].value : GameResult[0]} bgColor='singGold' className={classBall} />
      <SingleColorBall text={item ? item.cbTableCard[1].value : GameResult[1]} bgColor='singGold' className={classBall} />
      <SingleColorBall text={item ? item.cbTableCard[2].value : GameResult[2]} bgColor='singGold' className={classBall} />
      <SingleColorBall text={item ? item.cbTableCard[3].value : GameResult[3]} bgColor='singGold' className={classBall} />
      <SingleColorBall text={item ? item.cbTableCard[4].value : GameResult[4]} bgColor='singGold' className={classBall} />
      {item && gameId === 2905 ? <div className='w-100 h-60 m-l-70 df-aic-jcc wds-sm-con b-2 br-10 bc-primary color-primary'>{GameMgr.GetResultDesc(gameId, item.cbResultType[16].value)}</div> : ''}
    </div>
  );
});
