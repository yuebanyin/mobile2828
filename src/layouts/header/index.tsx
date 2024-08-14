import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { showSecondaryHeader, secondaryTitle, pc28 } from '@/constants';
import { Header as SecondaryHeader } from '@/components';
import { useGameConfigStore } from '@/mobx';
import { HeaderGames } from './headerGames';
import { getGameInfo } from '@/utils/game';

const Header = observer(() => {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  // const [hosueName, setHouseName] = useState('');
  const { gameList, homeTypeGames } = useGameConfigStore(); // 游戏配置
  const kindId = params.get('gameId');
  // const gameItem = getGameConfig({ key: pathKey });
  const houseId = params?.get('houseId');

  const { fieldInfo } = useMemo(
    () => getGameInfo(gameList, kindId, houseId),
    [gameList, kindId, houseId]
  );

  const { homeTypeGameInfo } = useMemo(
    () => getGameInfo(homeTypeGames, kindId, houseId, 'HomeTypeGames'),
    [homeTypeGames, kindId, houseId]
  );

  const mergeTitleConfig = useMemo(() => {
    if (!pathname) return {};
    let key = '';
    const title = params.get('title');
    const defaultConfig = {
      iconType: 'rect-left',
      type: 'noSpot',
      className: '',
      iconClassName: '',
    };

    // 动态获取标题
    if (
      /^(\/mine\/about\/detail?|\/mine\/announce\/info?|\/mine\/gameRules\/detail?|\/home\/gameOption\/playRule\/|\/mine\/yuebao\/rollInOut)+/.test(
        pathname
      )
    ) {
      return {
        ...defaultConfig,
        title,
      };
    }
    key = pathname.split('/').join('');

    // 发红包的标题背景色修改
    if (key === 'chatroomsendRedpacket') {
      defaultConfig.className = 'bg-main d-f ai-c jc-sb';
    }

    if (['forgetPswfindPsw', 'findwithdrawpsw'].includes(key)) {
      defaultConfig.type = 'findPsw';
    }

    return {
      ...defaultConfig,
      ...secondaryTitle[key],
    };
  }, [pathname, params]);

  if (homeTypeGameInfo?.GameName) {
    return (
      <HeaderGames
        // title={gameInfo?.KindName}
        title={homeTypeGameInfo?.GameName}
        houseText={
          pc28.includes(homeTypeGameInfo?.GameId) ? fieldInfo?.FieldName : ''
        }
      />
    );
  }

  console.log({ mergeTitleConfig });

  if (showSecondaryHeader.test(pathname)) {
    return <SecondaryHeader {...mergeTitleConfig} />;
  }
  return <></>;
});

export default Header;
