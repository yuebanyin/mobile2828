import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useGameConfigStore } from '@/mobx';
import RoomMessage from './roomMessage';
import { ChatInput } from '@/pages/gameComponents';
import TopOperate from './topOperate';
import { useNavigation, useWsGameChat } from '@/hooks';
import Notice from './Notice';

// 经典彩游戏路由映射
const classicMapRouter = {
  2901: '/home/classic?gameId=2901',
  2902: '/home/classic?gameId=2902',
  2903: '/home/classic?gameId=2903',
  2904: '/home/classic?gameId=2904',
  2905: '/home/classic?gameId=2905',
  3102: '/home/classic?gameId=3102',
  3202: '/home/classic?gameId=3202',
  3203: '/home/classic?gameId=3203',
};

const ChatInputFoot = observer((props: any) => {
  const { chatWs, handleBet } = props;

  return <ChatInput handleBet={handleBet} wsExample={chatWs} />;
});

const ChatRoom = observer(() => {
  const { gameList, gameWsUrl, chatWsUrl, gameActiveId, fieldId } =
    useGameConfigStore();
  const navigation = useNavigation();

  const {
    msg,
    gameRecords,
    odds,
    setOdds,
    chatWs,
    clear,
    topRedpacket,
    setMsg,
  } = useWsGameChat({
    isOnlyChatRoom: true,
    gameList,
    gameWsUrl,
    chatWsUrl,
  });

  // 游戏配置
  const { initGameConfig } = useGameConfigStore();

  // 投注按钮
  const handleBet = useCallback(() => {
    if (`${gameActiveId}`.indexOf('28') !== -1) {
      // pc 28 游戏跳转
      navigation(`/home/pc28?gameId=${gameActiveId}&houseId=${fieldId}`);
    } else {
      // 经典彩游戏跳转
      navigation(classicMapRouter[gameActiveId]);
    }
  }, [gameActiveId, fieldId, navigation]);

  // 清除本地聊条记录
  const clearMsg = useCallback(() => {
    setMsg([]);
  }, [setMsg]);

  // 退出聊天室时清除所有聊天相关数据
  useEffect(
    () => () => {
      clear();
      initGameConfig();
    },
    [clear, initGameConfig]
  );

  return (
    <>
      <Notice />
      <TopOperate recordList={gameRecords} handleBet={handleBet} />
      <RoomMessage
        clearMsg={clearMsg}
        topRedpacket={topRedpacket}
        odds={odds}
        setOdds={setOdds}
        wsExample={chatWs}
        data={msg}
      />
      <ChatInputFoot chatWs={chatWs} handleBet={handleBet} />
    </>
  );
});

export default ChatRoom;

