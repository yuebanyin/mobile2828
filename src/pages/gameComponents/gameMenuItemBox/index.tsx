/**
 * GameMenuItemBox 游戏菜单子项
 * @param text 游戏名
 * @param typeText 游戏状态提示文字
 * @param status 游戏状态 ‘on’:'时间'，‘end’:未开盘
 * @param onClick 按钮的点击事件
 * @param isActive 选中游戏项
 * @param className 控制盒子样式，作用外层盒子
 */

import { observer } from 'mobx-react-lite';
import { memo, useCallback, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import GameTime from '@/components/gameTime';
import { gamesShowTime, Obj, pc28 } from '@/constants';
import { useGameConfigStore } from '@/mobx';
import { openRepeatExpire } from '../../../Expire';
import { useLanguage } from '@/hooks';
// import { getGameInfo } from '@/utils/game';
// import { isArray } from '@/utils/tools';

interface GameMenuItemBoxProps {
  text?: string;
  isActive?: boolean;
  boxClass?: string;
  className?: string;
  onChose?: Function;
  key?: number;
  id?: number | string;
}
interface SmallGameBoxProps {
  item?: Obj; // 传入游戏对象项
  onHallChose: Function; // 大厅选择游戏
  compareId: number; // 实时游戏id
  mergeClassName: string; // 子游戏样式类名
}
export const SmallGameBox = memo((props: SmallGameBoxProps) => {
  const { item, mergeClassName, onHallChose, compareId } = props;
  const [timeCon, setTimeCon] = useState();
  const { formatMsg } = useLanguage();

  //获取时间
  const getTimer = useCallback((timeItem?) => {
    setTimeCon(timeItem);
  }, []);

  // 切换游戏 回调函数
  const handleChoseGameItem = useCallback(() => {
    console.log('手动切换游戏', { ...item });
    if (timeCon === formatMsg('notOpen')) {
      const msg = `${item.KindName}${formatMsg('gameSaleTime')}${
        gamesShowTime[item.KindId]
      }`;
      openRepeatExpire({ msg, isGameTips: true });
      return '';
    }
    if (onHallChose) {
      onHallChose(item);
    }
    return '';
  }, [item, onHallChose, timeCon, formatMsg]);

  return (
    <div
      className={`${mergeClassName} ${
        item.KindId === compareId ? 'bg-menu-item-bg' : ''
      }`}
      onClick={handleChoseGameItem}
    >
      <div className='color-primary-text m-b-10'>
        {item.KindName}
        {/* {formatMsg(item.KindId)} */}
      </div>
      <GameTime gameId={item.KindId} transfCon={getTimer} />
    </div>
  );
});

const GameMenuItemBox = observer((props: GameMenuItemBoxProps) => {
  const { className, isActive, id, onChose, boxClass = '' } = props;
  const { gameList, gameActiveId } = useGameConfigStore();

  const [params] = useSearchParams();
  const { pathname } = useLocation();
  const kindId = params.get('gameId');
  // const initGameId = getGameConfig({ key: pathKey })?.KindId; // 进入的游戏聊天室

  const compareId = useMemo(() => {
    if (pathname.includes('chat')) {
      return gameActiveId;
    }
    return Number(kindId);
  }, [gameActiveId, kindId, pathname]);

  const mergeClassName = useMemo(() => {
    let csn = 'br-10 df-aic-jcc fd-c bg-main wds-sm-con';
    if (isActive) {
      csn = `${csn} bg-menu-item-bg`;
    }
    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [className, isActive]);

  return (
    <>
      {id === 'hot' && (
        <div className={`${boxClass} d-f flex-w`}>
          {gameList &&
            gameList
              .filter((it) => pc28.includes(it.KindId))
              .map((its) => (
                <SmallGameBox
                  key={`${`hot${its.KindId}`}`}
                  mergeClassName={mergeClassName}
                  compareId={compareId}
                  item={its}
                  onHallChose={onChose}
                />
              ))}
        </div>
      )}
      {id === 'pc28' && (
        <div className={`${boxClass} d-f flex-w`}>
          {gameList &&
            gameList
              .filter((it) => pc28.includes(it.KindId))
              .map((its) => (
                <SmallGameBox
                  key={its.KindId}
                  mergeClassName={mergeClassName}
                  compareId={compareId}
                  item={its}
                  onHallChose={onChose}
                />
              ))}
        </div>
      )}
      {id === 'classic' && (
        <div className={`${boxClass} d-f flex-w`}>
          {gameList &&
            gameList
              .filter((it) => !pc28.includes(it.KindId))
              .map((item) => (
                <SmallGameBox
                  key={item.KindId}
                  mergeClassName={mergeClassName}
                  compareId={compareId}
                  item={item}
                  onHallChose={onChose}
                />
              ))}
        </div>
      )}
    </>
  );
});

export default GameMenuItemBox;

