import { memo } from 'react';
import { Obj } from '@/constants';
import { ColorfulBall } from '../colorfulBall';

interface TwentyBallLineProps {
  item?: Obj;
  GameResult?: string | string[];
  classBox?: string;
  classBall?: string;
}
export const TwentyBallLine = memo((props: TwentyBallLineProps) => {
  const {
 item, GameResult, classBox, classBall 
} = props;

  return (
    <div>
      <div className={`d-f ai-c ${classBox}`}>
        <ColorfulBall text={item ? item.cbTableCard[0].value : GameResult[0]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[1].value : GameResult[1]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[2].value : GameResult[2]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[3].value : GameResult[3]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[4].value : GameResult[4]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[5].value : GameResult[5]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[6].value : GameResult[6]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[7].value : GameResult[7]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[8].value : GameResult[8]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[9].value : GameResult[9]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-blue`} type='normal' />
      </div>
      <div className={`d-f ai-c ${classBox}`}>
        <ColorfulBall text={item ? item.cbTableCard[10].value : GameResult[10]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[11].value : GameResult[11]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[12].value : GameResult[12]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[13].value : GameResult[13]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[14].value : GameResult[14]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[15].value : GameResult[15]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[16].value : GameResult[16]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[17].value : GameResult[17]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[18].value : GameResult[18]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
        <ColorfulBall text={item ? item.cbTableCard[19].value : GameResult[19]} className={`${classBall} w-62 h-62 t-40 m-r-6 color-game-ball-red`} type='normal' />
      </div>
    </div>
  );
});
