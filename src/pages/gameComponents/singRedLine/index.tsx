import { memo } from 'react';
import { Obj } from '@/constants';
import { SingleColorBall } from '../singleColorBall';

interface SingRedLineProps {
  item?: Obj;
  GameResult?: string | string[];
  classBox?: string;
  classBall?: string;
}

export const SingRedLine = memo((props: SingRedLineProps) => {
  const {
 item, GameResult, classBox, classBall 
} = props;
  return (
    <div className={`d-f ai-c ${classBox}`}>
      <SingleColorBall text={item ? item.cbTableCard[1].value : GameResult[1]} bgColor='singRed' className={classBall} />
      <div className='t-small-title m-r-10 font-w-bold'>+</div>
      <SingleColorBall text={item ? item.cbTableCard[2].value : GameResult[2]} bgColor='singRed' className={classBall} />
      <div className='t-small-title m-r-10 font-w-bold'>+</div>
      <SingleColorBall text={item ? item.cbTableCard[3].value : GameResult[3]} bgColor='singRed' className={classBall} />
      <div className='t-small-title m-r-10 font-w-bold'>=</div>
      <SingleColorBall text={item ? item.cbTableCard[0].value : GameResult[0]} bgColor='singRed' className={classBall} />
    </div>
  );
});
