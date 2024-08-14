import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import i18n from 'i18next';
import { useLocation, useOutlet } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { observer } from 'mobx-react-lite';
import {
  useChangeTheme,
  useNavigation,
  useWsMsg,
  useSetInterval,
  useLanguage,
} from '@/hooks';
import Header from './header';
import Footer from './footer';
import AutoAnnoPopup from './autoAnnoPopup';
import {
  getGameInfoItem,
  getGameLevelList,
  getGameList,
  getGameSwitchConfig,
  getGameTime,
  getHomeTypeGames,
  getUserScoreInfo,
} from '@/services';
import {
  useGameConfigStore,
  useGameTimeStore,
  useGeneralStore,
  useGlobalStore,
  useUserInfoStore,
  useUserScoreStore,
} from '@/mobx';
import { isArray, formatCDT, ssSetItem, ssGetItem } from '@/utils/tools';
import { strTimerList } from '@/constants';
import CountTimeAudio from './audio';
import GlobalReward from '@/pages/mine/reward/globalReward';
import PreloadImg from './PreloadImg';
import { openRepeatExpire } from '../Expire';

export type GameTimeTypeDto = {
  GameId: number;
  Date: string;
  RoundSeconds: number;
  ClosedSeconds: number;
  PeriodId: string;
  EndPeriodId: string;
  PeriodDate: string;
};

// const ANIMATION_MAP = {
//   PUSH: 'forward',
//   POP: 'back',
// };

function Layout() {
  const { changeUserScore } = useUserScoreStore(); // 用户金币
  const { clearUserInfo } = useUserInfoStore();
  const {
    setGameList,
    setGameSwitchConfig,
    openGamesId,
    initGamesList,
    setHomeTypeGames,
  } = useGameConfigStore();
  const { changeGameTimeMapState, saveCountDownConfig, isRequest } =
    useGameTimeStore();
  const { changeState, setAllGameList } = useGlobalStore();
  const navigation = useNavigation();
  // const navigationType = useNavigationType();
  const { pathname } = useLocation();
  const { changeGeneralState } = useGeneralStore();
  const [isHost, setIsHost] = useState(false);
  const isGetConfigRef = useRef<boolean>(false);
  const { formatMsg } = useLanguage();
  const i18Language = i18n.language;
  // 大厅ws
  useWsMsg();

  const [timeList, setTimeList] = useState<GameTimeTypeDto[]>([]);
  const currentOutlet = useOutlet();

  const { initTheme } = useChangeTheme();

  console.log({ pathname });
  // 初始化主题色
  useLayoutEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    changeState('navigation', navigation);
  }, [navigation, changeState]);

  useLayoutEffect(() => {
    // 清除旧的域名
    if (!isHost) {
      ssSetItem('api_host', '');
      ssSetItem('config_failed', '');
    }
  }, [isHost]);

  const getConfig = useCallback(() => {
    if (isGetConfigRef.current) return;
    isGetConfigRef.current = true;
    changeState('isLoading', true);
    getGameSwitchConfig()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          if (isArray(res?.Data)) {
            setGameSwitchConfig(res.Data);
            setIsHost(true);
            isGetConfigRef.current = true;
          } else if (!ssGetItem('config_failed')) {
            clearUserInfo();
            ssSetItem('config_failed', 'true');
            navigation('/login');
            openRepeatExpire({
              msg: `${formatMsg('configurationError')}`,
              isGameTips: true,
              confirmText: `${formatMsg('retry')}`,
              cb: () => {
                isGetConfigRef.current = false;
                ssSetItem('config_failed', '');
                getConfig();
              },
            });
          }
        }
      })
      .catch(() => {
        if (!ssGetItem('config_failed')) {
          clearUserInfo();
          ssSetItem('config_failed', 'true');
          navigation('/login');
          openRepeatExpire({
            msg: `${formatMsg('networkReginTest')}`,
            isGameTips: true,
            confirmText: `${formatMsg('retry')}`,
            cb: () => {
              isGetConfigRef.current = false;
              ssSetItem('config_failed', '');
              getConfig();
            },
          });
        }
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, clearUserInfo, navigation, setGameSwitchConfig, formatMsg]);

  //首页启动配置
  useEffect(() => {
    getConfig();
  }, [getConfig]);

  const getHomeTypeGameItem = useCallback((list, gameId) => {
    let gameName = '';
    if (isArray(list) && gameId) {
      list.forEach((item: any) => {
        isArray(item?.GameList) &&
          item.GameList.find((it: any) => {
            if (it?.GameId === Number(gameId)) {
              gameName = it?.GameName;
              return gameName;
            }
            return gameName;
          });
      });
    }
    return gameName;
  }, []);

  const getNewGameList = useCallback(
    (homeGameList?: any[]) => {
      getGameList()
        .then((res: any) => {
          if ((res.Data?.length ?? 0) >= 0) {
            if (isArray(res?.Data)) {
              const newGameList = res.Data?.filter((item) =>
                openGamesId.includes(item.KindId)
              );
              if (homeGameList?.length > 0) {
                const newRes = newGameList.map((it: any) => {
                  const findGameName = getHomeTypeGameItem(
                    homeGameList,
                    it?.KindId
                  );
                  if (findGameName) {
                    it.KindName = findGameName;
                  }
                  return it;
                });
                setGameList(newRes);
              } else {
                setGameList(newGameList);
              }
            }
          }
        })
        .catch(() => {});
    },
    [getHomeTypeGameItem, openGamesId, setGameList]
  );
  // 游戏项配置
  useEffect(() => {
    if (!isHost) return () => {};

    if (i18Language) {
      getHomeTypeGames()
        .then((res: any) => {
          if (res.Code === 210 && res.Data) {
            setHomeTypeGames(res.Data);
            getNewGameList(res.Data);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }

    getGameInfoItem()
      .then((res: any) => {
        if (res?.Data?.length > 0) {
          setAllGameList(res.Data);
        }
      })
      .catch(() => {});
    return initGamesList();
  }, [
    initGamesList,
    changeState,
    setAllGameList,
    getNewGameList,
    setHomeTypeGames,
    isHost,
    i18Language,
  ]);

  //游戏时间接口请求
  useEffect(() => {
    if (isHost) {
      getGameTime()
        .then((res: any) => {
          saveCountDownConfig([...res.Data]);
          setTimeList([...res.Data]);
          Object.keys(strTimerList).forEach((k) => {
            strTimerList[k] = formatMsg('notOpen');
          });
        })
        .catch(() => {});
    }
  }, [saveCountDownConfig, isHost, isRequest, formatMsg]);

  //游戏时间接口请求
  useEffect(() => {
    if (isHost) {
      getGameLevelList()
        .then((res: any) => {
          if (res.Data) changeGeneralState('levelList', res.Data);
        })
        .catch(() => {});

      getUserScoreInfo()
        .then((res: any) => {
          if (res.Data) changeUserScore(res.Data);
        })
        .catch(() => {});
    }
  }, [changeGeneralState, changeUserScore, saveCountDownConfig, isHost]);

  //  全局时间倒计时
  useSetInterval(() => {
    for (let i = 0, len = timeList.length; i < len; i += 1) {
      // 单条游戏倒计时配置
      const timeConfig = timeList[i];
      // 游戏id
      const gameId = timeConfig['GameId'];
      // 封盘中
      if (timeConfig.RoundSeconds === 0) {
        strTimerList[gameId] = formatMsg('underCover');
      } else {
        // debugger;
        // 获取本地时间和第一期的开盘时间差 单位秒
        const nTime =
          Math.floor(new Date().getTime() / 1000) - Number(timeConfig.Date);
        // 当前期号的倒计时剩余时间
        const lCurTime = nTime % timeConfig.RoundSeconds;
        // 计算已经过去了几期
        const nIndex = Math.ceil(nTime / timeConfig.RoundSeconds);
        // 当前期号
        const curPeriod = `${Number(timeConfig.PeriodId) + nIndex}`;

        // 当前期号大于最后的期号（未开盘）
        if (curPeriod > timeConfig.EndPeriodId) {
          strTimerList[gameId] = formatMsg('notOpen');
        } else {
          // 周期秒减去关闭秒
          const lBetTime = timeConfig.RoundSeconds - timeConfig.ClosedSeconds;
          // 2:封盘中
          if (lCurTime > lBetTime) {
            strTimerList[gameId] = formatMsg('underCover');
          } else {
            // 3:进行中
            const cdTime = lBetTime - lCurTime;

            if (cdTime >= 0) {
              // 4:结束
              const tempVal = formatCDT(cdTime, true);
              strTimerList[gameId] = tempVal;
            } else {
              strTimerList[gameId] = formatMsg('underCover');
            }
          }
        }
      }
    }

    changeGameTimeMapState(strTimerList);
  }, 1000);

  return (
    <Fragment key={`layout-${isHost}`}>
      {/* <TransitionGroup className='d-f main-body-page flex-1 fd-c o-none' mode='out-in' childFactory={(child) => cloneElement(child, { classNames: ANIMATION_MAP[navigationType] })}>
        <CSSTransition appear key={routerKey} unmountOnExit timeout={500}> */}
      <div className='d-f main-body-page flex-1 fd-c o-none'>
        <Header />
        <div className='d-f main-body-page bg-main flex-1 fd-c o-y'>
          {currentOutlet}
        </div>
      </div>
      {/* </CSSTransition>
      </TransitionGroup> */}
      <Footer />
      <GlobalReward />
      <AutoAnnoPopup />
      <CountTimeAudio />
      <PreloadImg />
    </Fragment>
  );
}

export default observer(Layout);

