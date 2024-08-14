import { memo } from 'react';
import { Obj } from '@/constants';
import { ColorfulBall } from '../colorfulBall';

interface ColorfulLineProps {
  item?: Obj;
  GameResult?: string | string[];
  classBox?: string;
  classBall?: string;
}
export const ColorfulLine = memo((props: ColorfulLineProps) => {
  const {
 item, GameResult, classBox, classBall 
} = props;

  return (
    <div className={`d-f ai-c ${classBox}`}>
      <ColorfulBall text={item ? item.cbTableCard[0].value : GameResult[0]} className={classBall} type='borderColorful' />
      <ColorfulBall text={item ? item.cbTableCard[1].value : GameResult[1]} className={classBall} type='borderColorful' />
      <ColorfulBall text={item ? item.cbTableCard[2].value : GameResult[2]} className={classBall} type='borderColorful' />
      <ColorfulBall text={item ? item.cbTableCard[3].value : GameResult[3]} className={classBall} type='borderColorful' />
      <ColorfulBall text={item ? item.cbTableCard[4].value : GameResult[4]} className={classBall} type='borderColorful' />
      <ColorfulBall text={item ? item.cbTableCard[5].value : GameResult[5]} className={classBall} type='borderColorful' />
      <div className='t-small-title m-r-10 font-w-bold'>+</div>
      <ColorfulBall text={item ? item.cbTableCard[6].value : GameResult[6]} className={classBall} type='borderColorful' />
    </div>
  );
});
