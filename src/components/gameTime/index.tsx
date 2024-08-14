/**
 * GameTime 获取游戏时间状态
 * @param gameId 游戏ID
 */

import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useGameTimeStore } from '@/mobx/gameTime';
import { useLanguage } from '@/hooks';

type DataType = {
  gameId: number;
  timeColorClass?: string;
  className?: string;
  isShowDesc?: boolean;
  descClassName?: string;
  transfCon?: Function;
};

const GameTime = observer((props: DataType) => {
  const {
    className,
    isShowDesc = false,
    descClassName,
    gameId,
    timeColorClass,
    transfCon,
  } = props;
  const { formatMsg } = useLanguage();

  const { gameTimeMap } = useGameTimeStore();
  const spanRef = useRef<HTMLSpanElement>(null);

  const countTime = gameTimeMap[gameId];

  useEffect(() => {
    if (countTime && spanRef?.current) {
      spanRef.current.innerText = countTime;
    }
    if (transfCon) {
      transfCon(countTime);
    }
  }, [gameTimeMap, countTime, transfCon, gameId]);

  const getColor = (str: string) => {
    if (str === formatMsg('underCover')) {
      return 'color-red';
    }

    if (str === formatMsg('notOpen') || str === formatMsg('protect')) {
      return 'color-green';
    }
    if (className) {
      return className;
    }
    return `${timeColorClass || 'color-primary'}`;
  };

  const getDesc = (str: string) => {
    if (isShowDesc) {
      const strRes = ![
        formatMsg('underCover'),
        formatMsg('notOpen'),
        formatMsg('protect'),
      ].includes(str);
      if (strRes) return formatMsg('close');
    }
    return '';
  };

  ///返回当前游戏的时间状态
  if (isShowDesc) {
    return (
      <div className='d-f ai-c jc-sb w-full br-30'>
        <span className={`color-con-ass ${descClassName || ''}`}>
          {getDesc(gameTimeMap[gameId])}
        </span>
        <span ref={spanRef} className={getColor(gameTimeMap[gameId])} />
      </div>
    );
  }
  return <span ref={spanRef} className={getColor(gameTimeMap[gameId])} />;
});

export default GameTime;

