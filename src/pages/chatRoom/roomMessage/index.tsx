import { memo, useCallback, useRef, useState } from 'react';
import { ChatMessage } from '@/pages/gameComponents';
import { Img, OutLink } from '@/components';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { isArray } from '@/utils/tools';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { useWSInstanceStore } from '@/mobx';
import UserRedpacket from '@/pages/gameComponents/userRedpacket';
import styles from './index.module.scss';

interface RoomMessageProps {
  data: any;
  wsExample: CtrlChat;
  // msgBtmRef: RefObject<HTMLDivElement>;
  // srcollBottom: Function;
  odds: common.tagDynamicMultiple[];
  setOdds: Function;
  topRedpacket: any[];
  clearMsg?: Function;
}

const RoomMessage = memo((props: RoomMessageProps) => {
  const { data, wsExample, odds, setOdds, topRedpacket, clearMsg } = props;
  const { saveRedpackData } = useWSInstanceStore();
  // 是否置底部
  const [isBt, setIsBt] = useState(true);
  const msgBtmRef = useRef<HTMLDivElement>(null);

  const msgBoxRef = useRef<HTMLDivElement>(null);

  // 抢红包
  const msgItemClick = useCallback(
    (item: CMD_Chat.CMD_CRS_C_PlaceBet & { recordType: number }) => (param) => {
      // 如果有ws实例才执行下面逻辑
      if (wsExample) {
        if ([3, 4].includes(item?.recordType)) {
          // 查询红包的状态
          wsExample.queryRedPacketState(param);
          saveRedpackData('id', param.value);
        } else if (item?.recordType === 99) {
          // console.log({ param });
          // const betInfo = new CMD_Chat.CMD_CRS_C_PlaceBet();
          // betInfo.cPeriodNumber = item.cPeriodNumber;
          // betInfo.wKindID = item.wKindID;
          // betInfo.wServerID = item.wServerID;
          // betInfo.tagUserBetInfo = param;
          // 确认跟注逻辑
          wsExample.userBetScore(param);
        }
      }
    },
    [wsExample, saveRedpackData]
  );

  // 滚动到底部
  const srcollBottoms = useCallback(
    (isOwner: boolean, iot?: number) => {
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
    },
    [msgBtmRef]
  );

  // 监听滚动条的位置，处理置底的按钮显隐逻辑
  const handleScroll = (e) => {
    if (!e) return;
    if (
      e?.target?.scrollTop + e?.target?.clientHeight <
        e?.target?.scrollHeight &&
      isBt
    ) {
      // 盒子滚动距离顶部的高度+盒子可视高度小于盒子的滚动总高度时，此时不在最底部
      setIsBt(false);
    }
    if (
      e?.target?.scrollTop + e?.target?.clientHeight ===
        e?.target?.scrollHeight &&
      !isBt
    ) {
      setIsBt(true);
    }
  };

  // 进入跟单计划
  const goDocumentary = () => {
    // 进入跟单计划
  };

  return (
    <div className='d-f flex-1 p-r o-none'>
      <Img
        src='/chatroom/gdjv.png'
        className='p-a icon-185 right-0 bottom-half zi-mini d-n'
        onClick={goDocumentary}
      />
      <div className={`p-a zi-mini ${styles['pf-box-png']}`}>
        {!isBt && (
          <Img
            onClick={() =>
              msgBtmRef?.current?.scrollIntoView({ behavior: 'auto' })
            }
            src='/chatroom/down-drop.png'
            className={`${styles['down-drop']} ani-opa-tslY-100`}
          />
        )}
        <Img
          onClick={clearMsg as any}
          src='/chatroom/clear-record.png'
          className={`${styles['clear-record']}`}
        />
        <OutLink href='/serCenter'>
          <Img
            src='/chatroom/service-1.png'
            className={`${styles['service-1']}`}
          />
        </OutLink>
      </div>
      <div
        onScroll={handleScroll}
        ref={msgBoxRef}
        className='d-f flex-1 fd-c o-y p-l-50 p-r-50 p-b-30 p-r'
      >
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
            <ChatMessage
              srcollBottoms={srcollBottoms}
              odds={odds}
              setOdds={setOdds}
              wsExample={wsExample}
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
    </div>
  );
});

export default RoomMessage;
