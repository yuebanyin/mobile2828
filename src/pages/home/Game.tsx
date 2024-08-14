import { useMemo, memo, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Img, BgImg, toastText } from '@/components';
import styles from './index.module.scss';
import GameTime from '@/components/gameTime';
import { gamesShowTime } from '@/constants';
import { openRepeatExpire } from '../../Expire';
import { useGameConfigStore, useGameTimeStore, useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const themeObj = { blueyellow: 1, blackgold: 2, whiteblue: 3 };

const Game = observer(() => {
  const navigate = useNavigate();
  const { gameTimeMap } = useGameTimeStore();
  const { theme } = useGlobalStore();
  const { homeTypeGames } = useGameConfigStore();
  const [menuList, setMenuList] = useState([]);
  const [menuId, setMenuId] = useState(0);
  const { formatMsg } = useLanguage();

  // 获取首页游戏配置数据
  // useEffect(() => {
  //   getHomeTypeGames()
  //     .then((res: any) => {
  //       if (res.Code === 210 && res.Data) {
  //         setMenuList(res.Data);
  //         setHomeTypeGames(res.Data);
  //       }
  //     })
  //     .catch(() => {})
  //     .finally(() => {
  //       changeState('isLoading', false);
  //     });
  // }, [changeState, setHomeTypeGames]);

  useEffect(() => {
    if (homeTypeGames) {
      setMenuList(homeTypeGames);
    }
  }, [homeTypeGames]);

  const contentList = useMemo(() => {
    if (!Array.isArray(menuList) || menuList.length === 0) {
      return [];
    }
    return menuList.filter((_, i) => i === menuId)[0]?.GameList;
  }, [menuId, menuList]);

  // 游戏跳转分类
  const gamesUrl = useCallback((item: any) => {
    switch (item.GameId) {
      case 2801:
      case 2802:
      case 2803:
      case 2804:
        return '/home/gameOption';
      // return '/home/markSix';
      case 2903:
      case 2901:
      case 2902:
      case 2904:
      case 2905:
      case 3102:
      case 3202:
      case 3203:
      case 3501:
      case 3402:
        return '/home/classic';

      default:
        return 'chatroom';
    }
  }, []);

  // 选择游戏跳转
  const handleChoseGame = (item) => {
    console.log({ item });
    if (gameTimeMap[item.GameId] === formatMsg('notOpen')) {
      const msg = `${item.GameName}${formatMsg('gameSaleTime')}${
        gamesShowTime[item.GameId]
      }`;
      openRepeatExpire({ msg, isGameTips: true });
      return '';
    }
    navigate(`${gamesUrl(item)}?gameId=${item.GameId}`);
    return '';
  };

  return (
    <div className='d-f jc-sb flex-1 o-none bg-home'>
      <div
        className={`d-f jc-sb flex-1 o-none br-50 br-b-l-0 br-b-r-0 ${styles['game-module']}`}
      >
        <div className={`${styles['w-224']} o-y`}>
          {menuList.map((it, i) => {
            const isActive = i === menuId;
            return (
              <BgImg
                key={it.id || i}
                onClick={() => setMenuId(i)}
                url={
                  isActive
                    ? '/home/game-menu-active.png'
                    : '/home/game-menu.png'
                }
                className={`d-f fd-c ai-c jc-s ${styles['game-nav-common']}  ${
                  isActive ? styles['game-nav-act'] : styles['game-nav']
                }`}
              >
                <Img
                  className='w-100 h-100'
                  isNoTheme
                  src={isActive ? it.SelectedIconUrl : it.UnselectedIconUrl}
                />
                <span className={`${styles['m-t--14']} wds-con`}>
                  {it.TypeName}
                </span>
              </BgImg>
            );
          })}
        </div>
        <div className='flex-1 o-y'>
          {contentList?.map((item) =>
            menuId < 2 ? (
              <div
                key={item.GameId}
                id={item.GameId}
                className={`d-f fd-c flex-1 ai-c jc-sb ta-c p-r ${styles['game-content-img']}`}
                onClick={() => handleChoseGame(item)}
              >
                <Img
                  isNoTheme
                  isDefaultBg
                  className={`w-750 ${styles['h-354']}`}
                  src={item?.IconList[themeObj[theme] - 1].IconUrl}
                />
                <div
                  className={`${styles['game-title']} p-a wds-spc-title ta-l font-w-bolder`}
                >
                  {item.GameName}
                </div>
                <div className={`${styles['count-down']} p-a wds-con ta-c`}>
                  <GameTime gameId={item.GameId} />
                </div>
              </div>
            ) : (
              <div
                key={item.GameId}
                id={item.GameId}
                className={`d-f fd-c flex-1 ai-c jc-sb ta-c p-r ${styles['game-content-img']}`}
                onClick={() => toastText(`${formatMsg('gameNoOpen')}`)}
              >
                <Img
                  isNoTheme
                  isDefaultBg
                  className={`w-750 ${styles['h-354']}`}
                  src={item?.IconList[themeObj[theme] - 1].IconUrl}
                />
                <div
                  className={`${styles['game-title']} p-a wds-spc-title ta-l font-w-bolder`}
                >
                  {item.GameName}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
});

export default memo(Game);

