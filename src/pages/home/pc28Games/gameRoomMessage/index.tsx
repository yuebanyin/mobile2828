import { useRef, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { GameChatMessage } from '@/pages/gameComponents';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { isArray } from '@/utils/tools';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
import type { GameWsInstanceType } from '..';
import { Obj } from '@/constants';
import { useWSInstanceStore } from '@/mobx';
import UserRedpacket from '@/pages/gameComponents/userRedpacket';
import styles from './index.module.scss';
import { Img } from '@/components';
import { useNavigation } from '@/hooks';

interface GameRoomMessageProps {
  data: any;
  wsExample: CtrlChat;
  gameWs: GameWsInstanceType;
  curGameId: number;
  roomInfo: Obj;
  topRedpacket: any[];
}

const GameRoomMessage = memo((props: GameRoomMessageProps) => {
  const { data, wsExample, curGameId, roomInfo, gameWs, topRedpacket } = props;
  const { pathname, search } = useLocation();
  const navigation = useNavigation();

  const { saveRedpackData } = useWSInstanceStore();
  const msgBoxRef = useRef<HTMLDivElement>(null);

  const msgBtmRef = useRef<HTMLDivElement>(null);

  // 抢红包
  const msgItemClick = useCallback(
    (item: CMD_Chat.CMD_CRS_C_PlaceBet & { recordType: number }) => (param) => {
      // 如果有ws实例才执行下面逻辑
      if (wsExample) {
        if ([3, 4].includes(item?.recordType)) {
          // 查询红包的状态
          wsExample.queryRedPacketState(param);
          saveRedpackData('id', param.value);
        }
      }
      // 游戏下注
      if (gameWs) {
        if (item?.recordType === 99) {
          console.log({ param });
          // 确认跟注逻辑
          gameWs.userBetScore(param);
        }
      }
    },
    [wsExample, gameWs, saveRedpackData]
  );

  // 滚动到底部
  const srcollBottoms = useCallback((isOwner: boolean, iot?: number) => {
    if (msgBtmRef?.current) {
      // 消息聊天室的盒子可以滚动的最大距离
      const msgOH = msgBoxRef.current.offsetHeight;

      // 消息聊天室盒子距离顶部的滚动距离
      const boxST = msgBoxRef.current.scrollTop;

      if (iot - boxST <= msgOH + 10) {
        // 当前是在底部时
        setTimeout(() => {
          msgBtmRef?.current?.scrollIntoView({ behavior: 'auto' });
        }, 10);
      }

      // 将该dom滚动到可视区域
      if (isOwner) {
        // 如果自己发的消息就置底部
        setTimeout(() => {
          msgBtmRef?.current?.scrollIntoView({ behavior: 'auto' });
        }, 10);
      }
    }
  }, []);

  // 跳转到跟单计划
  const goDocumentary = () => {
    navigation(`${pathname}/followupplan${search}`);
  };

  return (
    <div
      ref={msgBoxRef}
      className={`d-f flex-1 o-y fd-c p-l-50 p-r-50 p-b-30 ${styles['room-box']}`}
    >
      <Img
        src='/chatroom/gdjv.png'
        className='p-f icon-185 right-0 bottom-half zi-mini d-n'
        onClick={goDocumentary}
      />
      {topRedpacket && isArray(topRedpacket) && (
        <div className={`p-f zi-middle right-0 ${styles['top-redpacket']}`}>
          {topRedpacket.map((item, i) => (
            <UserRedpacket
              key={`${i + 1}`}
              isTop
              cFaceUrl={item?.data?.cFaceUrl}
              cbFaceID={item?.data?.cbFaceID}
              dwGameID={item?.data?.dwGameID}
              szNickName={item?.data?.BaseInfo?.szNickName}
              onClick={msgItemClick(item)}
              {...item?.data?.BaseInfo}
            />
          ))}
        </div>
      )}
      {isArray(data) &&
        data.map((it, index) => (
          <GameChatMessage
            srcollBottoms={srcollBottoms}
            roomInfo={roomInfo}
            curGameId={curGameId}
            onClick={msgItemClick(it)}
            key={`${index}` || it.id}
            data={it}
          />
        ))}
      <div
        style={{ clear: 'both', height: '1px', width: '100%' }}
        ref={msgBtmRef}
      />
    </div>
  );
});

export default GameRoomMessage;
