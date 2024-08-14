/**
 * @param recordList 游戏记录数据
 * @param type 下拉记录表类型 麻将类型、彩色小球类型、红金小球、边框字体同色类型
 * @param className 控制盒子样式，作用外层盒子
 */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import SwitchChannel from '../alertChannel';
import { Img, Icon, OutLink } from '@/components';
import {
  BothColorLine,
  ColorfulLine,
  MajiangLine,
  SingGoldLine,
  TwentyBallLine,
} from '@/pages/gameComponents';
import { GameMgr } from '@/engine/mgr/mgr';
import {
  useGameConfigStore,
  useWSInstanceStore,
  useUserScoreStore,
  useGameTimeStore,
} from '@/mobx';
import { getBallType } from '@/utils/chartRoom';
import { defaultAmount, Obj, pc28, strTimerList } from '@/constants';
import GameTime from '@/components/gameTime';
import TopCom from './topCom';
import { formatDigit } from '@/utils/digit';
import { getGameInfo } from '@/utils/game';
import { useLanguage } from '@/hooks';
// pc28都是一类小球 2801:比特币1分28,2802:台湾宾果28,2803:加拿大28, 2804:加拿大西28 'bothColor'

// 香港六合彩:2903  澳洲六合彩：3402  'colorful'

// 幸运飞艇:2902, 澳洲幸运10:2904 'majiang'

// 澳洲幸运5:2905 'singGold'

// 加拿大PC28:2901 'singRed'

interface TopOperateProps {
  // recordList?: string;
  recordList?: any[];
  isHouse?: boolean;
  type?:
    | 'majiang'
    | 'singRed'
    | 'singGold'
    | 'colorful'
    | 'bothColor'
    | 'twenty';
  className?: string;
  showChannelFun?: Function;
  handleBet?: Function;
}

const TopOperate = observer((props?: TopOperateProps) => {
  const { formatMsg } = useLanguage();
  const { recordList = [], handleBet } = props;
  const [house, setHouse] = useState(true);
  const [recordShow, setRecordShow] = useState(false);
  const [topShow, setTopShow] = useState(true);

  const { chatws } = useWSInstanceStore(); // 长链
  const { score } = useUserScoreStore(); //用户金币
  const { gameList, setFieldId, gameActiveId, setHouseLevel, setGameIdMobx } =
    useGameConfigStore(); // 游戏配置

  const [houseOpt, setHouseOpt] = useState({
    cla: 'd-n',
    gameText: formatMsg(String(gameActiveId)),
    houseText: '',
  });

  const { getCurPeridId, countDownConfig } = useGameTimeStore();

  const firstPerid = getCurPeridId(gameActiveId, countDownConfig); // 最新期号

  const type = useMemo(() => getBallType(gameActiveId), [gameActiveId]); // 游戏对应展示小球类型

  const haveHouse = pc28.includes(gameActiveId); // pc28游戏 展示房间等级

  // 进入聊天室时 初始化游戏id为有效id
  useEffect(() => {
    const trueGameId = Object.keys(strTimerList).find(
      (k) =>
        strTimerList[k] !== formatMsg('notOpen') &&
        strTimerList[k] !== formatMsg('underCover')
    );
    setGameIdMobx(Number(trueGameId));
    const curGameName = gameList?.find(
      (item) => item?.KindId === Number(trueGameId)
    );

    if (curGameName?.KindName) {
      setHouseOpt({
        cla: 'd-n',
        houseText: '',
        gameText: curGameName?.KindName,
      });
    }
  }, [setGameIdMobx, formatMsg, gameList]);

  const { gameInfo, roomList: houseList } = useMemo(
    () => getGameInfo(gameList, gameActiveId),
    [gameList, gameActiveId]
  );
  // 展示房间
  const handleShowHouse = () => {
    setHouse(!house);
  };

  // 选择房间
  const handleChoseHouse = (item: Obj) => {
    handleShowHouse();
    setHouseOpt({ ...houseOpt, houseText: item.FieldName });
    if (item?.FieldId) {
      setFieldId(item.FieldId);
      setHouseLevel(item.Level.LevelId);
      chatws.selectGame(gameActiveId, item.Room.ServerId);
    }
  };
  //点击切换游戏按钮  6.19 useCallBack修改
  const handleChangeGame = useCallback(
    ({ className, gameName }: { className?: string; gameName?: string }) => {
      console.log({ gameName, className });
      if (className && gameName) {
        setHouseOpt({ ...houseOpt, cla: className, gameText: gameName });
        return '';
      }
      if (className) {
        setHouseOpt({ ...houseOpt, cla: className });
        return '';
      }
      if (gameName) {
        setHouseOpt({ ...houseOpt, gameText: gameName });
        return '';
      }
      return '';
    },
    [houseOpt]
  );
  // 点击收起展示游戏记录
  const handleShowRecord = () => {
    setRecordShow(!recordShow);
  };

  // 收起展开顶部块
  const handleShowTop = () => {
    setTopShow(!topShow);
    setRecordShow(false);
  };
  // ${topShow ? '' : 'pack-div'}
  return (
    <div className=''>
      <div
        className={`left-0 right-0 h-full-anhead p-f bottom-0 zi-small bg-mask ${
          recordShow ? '' : 'd-n'
        }`}
      />
      <div
        className={`bg-body p-r zi-small ${recordShow ? 'h-auto' : ''} ${
          topShow ? 'm-b-110' : ''
        } `}
      >
        <div
          className={`d-f jc-sb p-0-50 p-t-10 wds-con ${
            topShow ? '' : 'pack-div'
          }`}
        >
          <div className='d-f p-r'>
            <div
              className='df-aic-jcc w-340 h-60 br-10 color-home-login-btn bg-gdt-main'
              onClick={() =>
                handleChangeGame({
                  className: 'd-b',
                })
              }
            >
              <div>
                {/* {houseOpt.gameText} */}
                {houseOpt.gameText || (gameInfo && gameInfo?.KindName)}
              </div>
              <div className='m-l-20 m-t-20 b-23 bc-t-black' />
            </div>

            <div
              className={`w-200 h-60 df-aic-jcc m-l-20 p-r br-10 bg-alternate color-primary ${
                haveHouse ? '' : 'd-n'
              }`}
              onClick={handleShowHouse}
            >
              <div>
                {houseOpt.houseText || (houseList && houseList[0]?.FieldName)}
              </div>
              <div className='m-l-12 m-t-10 b-17 bc-t-orange' />
            </div>
            <div
              className={`p-a w-200 ta-c top-70 left-360 br-10 bg-body bs-sd-house color-con-ass zi-large ${
                house ? 'd-n' : 'd-b'
              }`}
            >
              {houseList.map((item) => (
                <div
                  onClick={() => handleChoseHouse(item)}
                  key={item.FieldId}
                  className='b-b-2 bc-split p-30-20-10 ws-no'
                >
                  {item.FieldName}
                </div>
              ))}
            </div>
          </div>
          <div className='d-f'>
            {pc28.includes(gameActiveId) && (
              <OutLink
                className='w-150 m-r-30 color-white df-aic-jcc br-10 bg-chat-green'
                href={`/home/lotteryTrend/trendCharts?gameId=${gameActiveId}`}
              >
                <Img className='w-40 h-26 m-r-10' src='/chatroom/trend.png' />
                <div>{formatMsg('trend')}</div>
              </OutLink>
            )}
            <div
              className='w-150 color-home-login-btn df-aic-jcc br-10 bg-gdt-main'
              onClick={() => handleBet()}
            >
              <Img
                className='w-36 h-41 color-home-login-btn m-r-10'
                src='/chatroom/followIcon.png'
              />
              <div>{formatMsg('bet')}</div>
            </div>
          </div>
        </div>
        <div
          className={`ai-c p-0-50 wds-sm-con m-t-24 color-primary-text ${
            topShow ? 'd-f' : 'pack-div'
          }`}
        >
          <div className='m-r-20'>
            <span>{formatMsg('di')}</span>
            <span className='color-red'>{String(firstPerid)?.slice(-8)}</span>
            <span>{formatMsg('qi')}</span>
          </div>
          <div className='wds-con'>
            {/* 10:58 */}
            <GameTime
              gameId={gameActiveId}
              timeColorClass='color-primary-text'
            />
          </div>
          <div className={`${topShow ? '' : 'pack-div'}`}>
            <span className='m-l-50 m-r-10'>{formatMsg('allBalance')}:</span>
            <span className='color-red'>
              {formatDigit(score, 2) || defaultAmount}
            </span>
          </div>
          {recordList.length !== 0 ? (
            <div
              className='p-a top-160 right-28 zi-middle'
              onClick={handleShowRecord}
            >
              <Icon className='t-h2' name='rect-down' />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='left-0 right-0 p-a zi-small bg-body br-b-l-40 br-b-r-40 bs-squ2'>
          <div
            className={`o-none w-auto ${
              recordShow ? 'h-auto' : `${type === 'twenty' ? 'h-166' : 'h-110'}`
            } ${topShow ? '' : 'pack-div'}`}
          >
            {type === 'colorful' &&
              recordList?.map((item, i) => (
                <div
                  key={item?.cPeriodNumber.value}
                  className={`h-110 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                    i % 2 === 0 ? '' : 'bg-alternate'
                  }`}
                >
                  <TopCom perNum={item?.cPeriodNumber?.value} />
                  <ColorfulLine item={item} />
                </div>
              ))}
            {type === 'singRed' &&
              recordList?.map((item, i) => (
                <div
                  key={item?.cPeriodNumber.value}
                  className={`h-110 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                    i % 2 === 0 ? '' : 'bg-alternate'
                  }`}
                >
                  <TopCom perNum={item?.cPeriodNumber.value} />
                  {/* <SingRedLine item={item} /> */}
                  <BothColorLine item={item} />
                </div>
              ))}
            {type === 'singGold' &&
              recordList?.map((item, i) => (
                <div
                  key={item?.cPeriodNumber.value}
                  className={`h-110 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                    i % 2 === 0 ? '' : 'bg-alternate'
                  }`}
                >
                  <TopCom perNum={item?.cPeriodNumber.value} />
                  <SingGoldLine item={item} gameId={gameActiveId} />
                </div>
              ))}
            {type === 'majiang' &&
              recordList?.map((item, i) => (
                <div
                  key={item?.cPeriodNumber.value}
                  className={`h-110 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                    i % 2 === 0 ? '' : 'bg-alternate'
                  }`}
                >
                  <TopCom perNum={item?.cPeriodNumber.value} />
                  <MajiangLine item={item} />
                </div>
              ))}
            {type === 'twenty' &&
              recordList?.map((item, i) => (
                <div
                  key={item?.cPeriodNumber.value}
                  className={`h-166 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                    i % 2 === 0 ? '' : 'bg-alternate'
                  }`}
                >
                  <TopCom perNum={item?.cPeriodNumber.value} />
                  <TwentyBallLine item={item} />
                </div>
              ))}
            {type === 'bothColor' &&
              recordList?.map((item, i) => (
                <div
                  key={item?.cPeriodNumber.value}
                  className={`h-110 p-0-50 d-f ai-c wds-sm-con color-primary-text ${
                    i % 2 === 0 ? '' : 'bg-alternate'
                  }`}
                >
                  <TopCom perNum={item?.cPeriodNumber.value} />
                  <BothColorLine item={item} />
                  <div className='wds-h2 font-w-bold'>
                    (
                    <span
                      className={`m-r-10 ${
                        item?.cbResultType[0].value === 0
                          ? 'color-red'
                          : 'color-game-ball-blue'
                      }`}
                    >
                      {formatMsg(
                        GameMgr.GetResultDesc(2801, item?.cbResultType[0].value)
                      )}
                    </span>
                    <span
                      className={`${
                        item?.cbResultType[1].value === 2
                          ? 'color-red'
                          : 'color-game-ball-blue'
                      }`}
                    >
                      {formatMsg(
                        GameMgr.GetResultDesc(2801, item?.cbResultType[1].value)
                      )}
                    </span>
                    )
                  </div>
                </div>
              ))}
          </div>
          <Img
            className='p-a left-0 right-0 w-172 h-48 m-0-auto zi-middle'
            src='/chatroom/chatArrow.png'
            onClick={handleShowTop}
          />
        </div>
        <SwitchChannel showChannel={houseOpt.cla} closeFun={handleChangeGame} />
      </div>
    </div>
  );
});

export default memo(TopOperate);
