import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
// import { ChatInput } from '@/pages/gameComponents';
// import GameRoomMessage from './gameRoomMessage';
// import GameOperateTop from './gameOperate';
import { useLanguage, useWsGameChat } from '@/hooks';
import { CMD_2801 } from '@/engine/game/28/2801/CMD_2801';
import { CMD_2802 } from '@/engine/game/28/2802/CMD_2802';
import { CMD_2803 } from '@/engine/game/28/2803/CMD_2803';
import { CMD_2804 } from '@/engine/game/28/2804/CMD_2804';
import { CMD_2901 } from '@/engine/game/pc/2901/CMD_2901';
import { CMD_2902 } from '@/engine/game/pc/2902/CMD_2902';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { CMD_2904 } from '@/engine/game/pc/2904/CMD_2904';
import { CMD_2905 } from '@/engine/game/pc/2905/CMD_2905';
import { CMD_3102 } from '@/engine/game/pc/3102/CMD_3102';
import { CMD_3202 } from '@/engine/game/pc/3202/CMD_3202';
import { CMD_3203 } from '@/engine/game/pc/3203/CMD_3203';
import { CMD_3501 } from '@/engine/game/pc/3501/CMD_3501';
import { CMD_3402 } from '@/engine/game/pc/3402/CMD_3402';
import { Game2801 } from '@/engine/game/28/2801/Index';
import { Game2802 } from '@/engine/game/28/2802/Index';
import { Game2803 } from '@/engine/game/28/2803/Index';
import { Game2804 } from '@/engine/game/28/2804/Index';
import { Game2901 } from '@/engine/game/pc/2901/Index';
import { Game2902 } from '@/engine/game/pc/2902/Index';
import { Game2903 } from '@/engine/game/pc/2903/Index';
import { Game2904 } from '@/engine/game/pc/2904/Index';
import { Game2905 } from '@/engine/game/pc/2905/Index';
// import RecordList from './recordList';
import { Obj } from '@/constants';
import { useCountDownTime } from '@/pages/gameComponents/countDownTime';
import { useGameConfigStore, useGlobalStore } from '@/mobx';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { Game3102 } from '@/engine/game/pc/3102/Index';
import { Game3202 } from '@/engine/game/pc/3202/Index';
import { Game3203 } from '@/engine/game/pc/3203/Index';
import { Game3501 } from '@/engine/game/pc/3501/Index';
import { Game3402 } from '@/engine/game/pc/3402/Index';

// 游戏实例
// export type GameWsInstanceType = Game2801 | Game2802 | Game2803 | Game2804 | Game2901 | Game2902 | Game2903 | Game2904 | Game2905 | Game3102 | Game3202;
export type GameWsInstanceType =
  | Game2802
  | Game2801
  | Game2803
  | Game2804
  | Game2901
  | Game2902
  | Game2903
  | Game2904
  | Game2905
  | Game3102
  | Game3202
  | Game3203
  | Game3501
  | Game3402;
// 游戏场景配置类型
export interface GameScenType
  extends CMD_2801.CMD_S_GameScene,
    CMD_2802.CMD_S_GameScene,
    CMD_2803.CMD_S_GameScene,
    CMD_2804.CMD_S_GameScene,
    CMD_2901.CMD_S_GameScene,
    CMD_2902.CMD_S_GameScene,
    CMD_2903.CMD_S_GameScene,
    CMD_2904.CMD_S_GameScene,
    CMD_2905.CMD_S_GameScene,
    CMD_3102.CMD_S_GameScene,
    CMD_3501.CMD_S_GameScene,
    CMD_3402.CMD_S_GameScene {}

// 游戏
export type GameBetType = common.CMD_C_PlaceBet;

// const list = ['开发和服务于移动 Web 界面的企业级产品', '1开发和服务于移动 Web 界面的企业级产品'];

// 获取对应游戏类
export const gameBetClass = (curGameId: number) => {
  switch (curGameId) {
    case 2801:
      return new CMD_2801.CMD_C_PlaceBet();
    case 2802:
      return new CMD_2802.CMD_C_PlaceBet();
    case 2803:
      return new CMD_2803.CMD_C_PlaceBet();
    case 2804:
      return new CMD_2804.CMD_C_PlaceBet();
    default:
      return null;
  }
};

// 获取对应游戏的赔率
export const getGameConfigInfo = (curGameId: number, key: string) => {
  switch (curGameId) {
    case 2801:
      return CMD_2801[key];
    case 2802:
      return CMD_2802[key];
    case 2803:
      return CMD_2803[key];
    case 2804:
      return CMD_2804[key];
    case 2901:
      return CMD_2901[key];
    case 2902:
      return CMD_2902[key];
    case 2903:
      return CMD_2903[key];
    case 2904:
      return CMD_2904[key];
    case 2905:
      return CMD_2905[key];
    case 3102:
      return CMD_3102[key];
    case 3202:
      return CMD_3202[key];
    case 3203:
      return CMD_3203[key];
    case 3501:
      return CMD_3501[key];
    case 3402:
      return CMD_3402[key];
    default:
      return null;
  }
};

// 获取对应游戏的子码
export const getGameSubTypeMap = (curGameId: number) => {
  const obj = {};
  let ComCMD;
  switch (curGameId) {
    case 2801:
    case 2802:
    case 2803:
    case 2804:
    case 2901:
      ComCMD = CMD_2801;
      break;
    case 2902:
      ComCMD = CMD_2902;
      break;
    case 2903:
      ComCMD = CMD_2903;
      break;
    case 2904:
      ComCMD = CMD_2904;
      break;
    case 2905:
      ComCMD = CMD_2905;
      break;
    case 3102:
      ComCMD = CMD_3102;
      break;
    case 3202:
      ComCMD = CMD_3202;
      break;
    case 3203:
      ComCMD = CMD_3203;
      break;
    case 3501:
      ComCMD = CMD_3501;
      break;
    case 3402:
      ComCMD = CMD_3402;
      break;
    default:
      break;
  }
  if (ComCMD?.emBetSubTypeNames?.length > 0) {
    ComCMD.emBetSubTypeNames.forEach((key) => {
      obj[key] = ComCMD[key];
    });
  }
  return obj;
};

const CountTimeBox = observer((props: any) => {
  const { formatMsg } = useLanguage();
  const { setMsg, lastPeriod } = props;
  const { countTime } = useGameConfigStore();
  const { audioCTRef } = useGlobalStore();

  // 插入聊天记录
  const insertSystemMsg = useCallback(
    (t: string | number, systemTip: Obj) => {
      if (!lastPeriod) return;
      if (t === systemTip.CountDownTime3) {
        setMsg((preMsg) => [
          ...preMsg,
          {
            tipKey: 'CountDownContent3',
            recordType: 88,
            title: formatMsg('systemNews'),
            // title: '系统消息',
            period: lastPeriod,
          },
        ]);
      } else if (t === systemTip.CountDownTime2) {
        setMsg((preMsg) => [
          ...preMsg,
          {
            tipKey: 'CountDownContent2',
            recordType: 88,
            // title: '系统消息',
            title: formatMsg('systemNews'),
            period: lastPeriod,
          },
        ]);
      } else if (t === systemTip.CountDownTime1) {
        setMsg((preMsg) => [
          ...preMsg,
          {
            tipKey: 'CountDownContent1',
            recordType: 88,
            // title: '系统消息',
            title: formatMsg('systemNews'),
            period: lastPeriod,
          },
        ]);
      }
    },
    [lastPeriod, setMsg, formatMsg]
  );

  // 处理倒计时的逻辑
  useCountDownTime(insertSystemMsg);

  const handleClick = useCallback(() => {
    if (!audioCTRef?.current) return;
    audioCTRef.current.currentTime = 0;
    const p = audioCTRef.current.play();
    if (p) {
      p.then(() => {
        audioCTRef.current.play();
      }).catch((e) => {
        console.info(e);
      });
    }
  }, [audioCTRef]);

  useEffect(() => {
    // 打开倒计时音效
    if (
      (countTime || countTime === 0) &&
      Number(countTime) <= 10 &&
      audioCTRef?.current &&
      typeof audioCTRef.current.play === 'function'
    ) {
      handleClick();
    }
    // 关闭倒计时音效
    if (!(Number(countTime) <= 10) && audioCTRef?.current) {
      audioCTRef.current.pause();
    }
  }, [audioCTRef, countTime, handleClick]);

  return <></>;
});

const GameChatRoom = observer(() => {
  const { gameList, gameWsUrl, chatWsUrl } = useGameConfigStore();

  const {
    msg,
    chatWs,
    gameWs,
    clear,
    curGameId,
    roomInfo,
    gameRecords,
    lastPeriod,
    gameScen,
    setMsg,
    topRedpacket,
    forecastRank,
  } = useWsGameChat({
    isOnlyChatRoom: false,
    gameList,
    gameWsUrl,
    chatWsUrl,
  });

  // 退出pc28游戏聊天室时清除所有相关状态
  useEffect(() => clear, [clear]);

  return (
    <>
      <Outlet
        context={{
          msg,
          chatWs,
          gameWs,
          clear,
          curGameId,
          roomInfo,
          gameRecords,
          lastPeriod,
          gameScen,
          setMsg,
          topRedpacket,
          forecastRank,
        }}
      />
      <CountTimeBox lastPeriod={lastPeriod} setMsg={setMsg} />
      {/* <CountTimeBox lastPeriod={lastPeriod} setMsg={setMsg} />
      <div className='bg-body'>
        <GameOperateTop
          newPeriod={lastPeriod}
          recordData={gameRecords}
          curGameId={curGameId}
        />
        <RecordList recordData={gameRecords?.slice(0, 10)} />
      </div>
      <GameRoomMessage
        topRedpacket={topRedpacket}
        curGameId={curGameId}
        roomInfo={roomInfo}
        wsExample={chatWs}
        gameWs={gameWs}
        data={msg}
      />
      <ChatInput
        isGame
        curGameId={curGameId}
        gameScen={gameScen}
        betPeriod={lastPeriod}
        gameWs={gameWs}
        wsExample={chatWs}
      /> */}
    </>
  );
});

export default GameChatRoom;

