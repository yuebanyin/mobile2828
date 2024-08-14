import { useOutletContext } from 'react-router-dom';
import { ChatInput } from '@/pages/gameComponents';
import GameRoomMessage from './gameRoomMessage';
import GameOperateTop from './gameOperate';
import RecordList from './recordList';

const Room = () => {
  const props: any = useOutletContext();
  const {
    lastPeriod,
    gameRecords,
    curGameId,
    topRedpacket,
    roomInfo,
    chatWs,
    gameWs,
    msg,
    gameScen,
  } = props || {};

  return (
    <>
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
      />
    </>
  );
};

export default Room;
