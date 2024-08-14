import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Game2801 } from '@/engine/game/28/2801/Index';
import { Game2802 } from '@/engine/game/28/2802/Index';
import { Game2803 } from '@/engine/game/28/2803/Index';
import { Game2804 } from '@/engine/game/28/2804/Index';
import { Game2901 } from '@/engine/game/pc/2901/Index';
import { Game2902 } from '@/engine/game/pc/2902/Index';
import { Game2903 } from '@/engine/game/pc/2903/Index';
import { Game2904 } from '@/engine/game/pc/2904/Index';
import { Game2905 } from '@/engine/game/pc/2905/Index';
import { Game3102 } from '@/engine/game/pc/3102/Index';
import { Game3202 } from '@/engine/game/pc/3202/Index';
import { Game3203 } from '@/engine/game/pc/3203/Index';
import { Game3501 } from '@/engine/game/pc/3501/Index';
import { Game3402 } from '@/engine/game/pc/3402/Index';
import { useGlobalStore, useUserInfoStore, useWSInstanceStore } from '@/mobx';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { useHandleRoomMsg } from './useHandleRoomMsg';
import { useGetSystemInfo } from './useGetSystemInfo';
import { getGameInfo } from '@/utils/game';
import { pc28 } from '@/constants';

export type GameWsClass =
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

interface Props {
  gameList: any[];
  isOnlyChatRoom: boolean;
  gameWsUrl: string;
  chatWsUrl?: string;
}

export const useWsGameChat = ({
  gameList,
  isOnlyChatRoom,
  gameWsUrl,
  chatWsUrl,
}: Props) => {
  const { changeGeneralState } = useWSInstanceStore();
  const gameWsRef = useRef<GameWsClass>(null);
  const chatWsRef = useRef<CtrlChat>(null);
  const { token, gameId: chatGameId } = useUserInfoStore();
  const { changeState } = useGlobalStore();
  const [searchParam] = useSearchParams();
  const kindId = searchParam.get('gameId');
  const roomId = searchParam.get('houseId');
  const [webkitId] = useGetSystemInfo();

  // 获取房间信息和当前游戏id
  const { gameInfo, fieldInfo } = useMemo(
    () => getGameInfo(gameList, kindId, roomId),
    [gameList, kindId, roomId]
  );

  const {
    gameNetMessage,
    ChatRoomeMessage,
    gameChatMessage,
    gameChatRoomMsg,
    ...rest
  } = useHandleRoomMsg(gameInfo?.KindId);

  useEffect(
    () => () => {
      console.log('=====================', '组件卸载了');
      // 游戏服关闭
      if (gameWsRef.current) {
        gameWsRef.current?.Close();
        gameWsRef.current = null;
      }
      // 聊天服关闭
      if (chatWsRef.current) {
        chatWsRef.current.Close();
        changeGeneralState('chatws', null);
        chatWsRef.current = null;
      }
    },
    [changeGeneralState]
  );

  useEffect(() => {
    if (
      !isOnlyChatRoom &&
      gameWsUrl &&
      gameInfo?.KindId &&
      fieldInfo?.Room?.ServerPort &&
      webkitId
    ) {
      // 拼接长链的连接 10001 10004 10007 10010 ws://192.168.3.117:10013
      // const url: string = `ws://192.168.3.117:${fieldInfo?.Room?.ServerPort}`; // 北丐自测
      const url: string = `${gameWsUrl}${fieldInfo?.Room?.ServerPort}`;
      console.log({ url }, 'gameId', kindId);
      // 实例化长链
      // switch (Number(kindId)) {
      gameWsRef.current?.Close();
      switch (gameInfo?.KindId) {
        case 2801:
          gameWsRef.current = new Game2801(url, webkitId);
          break;
        case 2802:
          gameWsRef.current = new Game2802(url, webkitId);
          break;
        case 2803:
          gameWsRef.current = new Game2803(url, webkitId);
          break;
        case 2804:
          gameWsRef.current = new Game2804(url, webkitId);
          break;
        case 2901:
          gameWsRef.current = new Game2901(url, webkitId);
          break;
        case 2902:
          gameWsRef.current = new Game2902(url, webkitId);
          break;
        case 2903:
          gameWsRef.current = new Game2903(url, webkitId);
          break;
        case 2904:
          gameWsRef.current = new Game2904(url, webkitId);
          break;
        case 2905:
          gameWsRef.current = new Game2905(url, webkitId);
          break;
        case 3102:
          gameWsRef.current = new Game3102(url, webkitId);
          break;
        case 3202:
          gameWsRef.current = new Game3202(url, webkitId);
          break;
        case 3203:
          gameWsRef.current = new Game3203(url, webkitId);
          break;
        case 3501:
          gameWsRef.current = new Game3501(url, webkitId);
          break;
        case 3402:
          gameWsRef.current = new Game3402(url, webkitId);
          break;
        default:
          break;
      }
      if (gameWsRef.current) {
        // 实例化成功后传入消息的回调，并开启链接
        gameWsRef.current.dispatcherCall(gameNetMessage, gameChatMessage);
        // token: '0dc131b81a534991abeae90cdbe724a3', gameId: 86869826
        gameWsRef.current.connect({ token, gameId: chatGameId });
        // gameWsRef.current.connect({ token, gameId: chatGameId });
      }
    }
  }, [
    token,
    gameChatMessage,
    gameNetMessage,
    isOnlyChatRoom,
    chatGameId,
    gameWsUrl,
    webkitId,
    gameInfo?.KindId,
    fieldInfo?.Room?.ServerPort,
    kindId,
  ]);

  // 有聊天室的处理： PC28 + 大厅
  useEffect(() => {
    if (!chatWsUrl || !webkitId) return () => {};
    // 如果有直接清除
    if (chatWsRef.current) {
      chatWsRef.current.Close();
      changeGeneralState('chatws', null);
      chatWsRef.current = null;
    }
    if (
      isOnlyChatRoom ||
      (!isOnlyChatRoom && pc28.includes(gameInfo?.KindId))
    ) {
      changeState('isLoading', true);
      // 如果只是聊天室中或者 在游戏聊天室中并且是pc28 游戏中
      chatWsRef.current = new CtrlChat(chatWsUrl, webkitId);
      if (isOnlyChatRoom) {
        chatWsRef.current.connect({ token, gameId: chatGameId });
        chatWsRef.current.dispatcherCall(ChatRoomeMessage);
      } else {
        chatWsRef.current.connect({
          token,
          gameId: chatGameId,
          kindId: gameInfo?.KindId,
          serverId: fieldInfo?.Room?.ServerId,
        });
        chatWsRef.current.dispatcherCall(gameChatRoomMsg);
      }
      changeGeneralState('chatws', chatWsRef.current);
    }
    return () => {
      // 切换页面时关闭
      // if (chatWsRef.current) {
      //   chatWsRef.current.Close();
      //   changeGeneralState('chatws', null);
      //   chatWsRef.current = null;
      // }
    };
  }, [
    token,
    changeGeneralState,
    ChatRoomeMessage,
    gameChatRoomMsg,
    isOnlyChatRoom,
    chatGameId,
    chatWsUrl,
    webkitId,
    changeState,
    gameInfo?.KindId,
    fieldInfo?.Room?.ServerId,
  ]);

  return {
    gameWs: gameWsRef.current,
    chatWs: chatWsRef.current,
    curGameId: gameInfo?.KindId,
    roomInfo: fieldInfo?.Room,
    ...rest,
  };
};
