import { memo } from 'react';
import { Obj } from '@/constants';
import { MajiangBall } from '../majiangBall';

interface MajiangLineProps {
  item?: Obj;
  GameResult?: string | string[];
  classBox?: string;
  classBall?: string;
}
export const MajiangLine = memo((props: MajiangLineProps) => {
  const {
 item, GameResult, classBox, classBall 
} = props;

  return (
    <div className={`d-f ai-c ${classBox}`}>
      <MajiangBall text={item ? item.cbTableCard[0].value : GameResult[0]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[1].value : GameResult[1]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[2].value : GameResult[2]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[3].value : GameResult[3]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[4].value : GameResult[4]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[5].value : GameResult[5]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[6].value : GameResult[6]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[7].value : GameResult[7]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[8].value : GameResult[8]} className={`m-r-6 ${classBall}`} />
      <MajiangBall text={item ? item.cbTableCard[9].value : GameResult[9]} className={`m-r-6 ${classBall}`} />
    </div>
  );
});
