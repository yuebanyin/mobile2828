import { memo } from 'react';
import { Obj } from '@/constants';
import { ColorfulBall } from '../colorfulBall';

interface BothColorLineProps {
  item?: Obj;
  GameResult?: string | string[];
  classBox?: string;
  classBall?: string;
}
export const BothColorLine = memo((props: BothColorLineProps) => {
  const {
 item, GameResult, classBox, classBall 
} = props;
  return (
    <div className={`d-f ai-c ${classBox}`}>
      <ColorfulBall className={classBall} text={item ? item.cbTableCard[1].value : GameResult[1]} type='normal' />
      <div className='t-small-title m-r-10 font-w-bold'>+</div>
      <ColorfulBall className={classBall} text={item ? item.cbTableCard[2].value : GameResult[2]} type='normal' />
      <div className='t-small-title m-r-10 font-w-bold'>+</div>
      <ColorfulBall className={classBall} text={item ? item.cbTableCard[3].value : GameResult[3]} type='normal' />
      <div className='t-small-title m-r-10 font-w-bold'>=</div>
      <ColorfulBall className={classBall} text={item ? item.cbTableCard[0].value : GameResult[0]} type='wordBorder' />
    </div>
  );
});
