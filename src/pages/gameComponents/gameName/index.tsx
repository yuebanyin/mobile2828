/**
 * GameName 通过游戏Id 获取游戏名称
 * @param gameId 游戏Id
 */
import { observer } from 'mobx-react-lite';
import { useGameConfigStore } from '@/mobx';
import { getGameInfo } from '@/utils/game';

// 获取游戏名称
export const GameName = observer(({ gameId }: { gameId: number }) => {
  const { gameList } = useGameConfigStore();

  return <div>{getGameInfo(gameList, gameId)?.gameInfo?.KindName}</div>;
});
