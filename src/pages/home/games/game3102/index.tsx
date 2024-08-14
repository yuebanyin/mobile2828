import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import {
  useGameConfigStore,
  useUserInfoStore,
  useUserScoreStore,
  useGlobalStore,
} from '@/mobx';
import { GameRoute, NetCommonRoute, NetData } from '@/engine/ctrl/NetRoute';
import { BetInput } from '@/pages/gameComponents/betInput';
import { CreateArray, CreateObject, DWORD } from '@/engine/base/basetype';
import { Game3102 } from '@/engine/game/pc/3102/Index';
import { CMD_3102 } from '@/engine/game/pc/3102/CMD_3102';
import { toastText } from '@/components';
import { ClassicsTop } from '@/pages/gameComponents/classicsTop';
import { ButtonDataType, buildTagUserBetInfo } from './rules';
import CountTimeS from '../countTimes';
import { useGetSystemInfo, useLanguage } from '@/hooks';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import CtrlGame from '@/engine/ctrl/CtrlGame';
import { getUserScoreInfo } from '@/services';
import { getGameInfo } from '@/utils/game';
import { Content } from './Content';

function BitcoinRacing() {
  const { formatMsg } = useLanguage();
  const { token, gameId } = useUserInfoStore();
  const [gameHandle, setGameHandle] = useState<Game3102>();
  const [gameScene, setGameScene] = useState(
    CreateObject(CMD_3102.CMD_S_GameScene)
  );
  const refContent = useRef(null);
  const refBetInputRef = useRef(null);
  const [gameMultiple, setGameMultiple] = useState(
    CreateArray(DWORD, [CMD_3102.emMultipleType.MT_COUNT])
  );
  const [dyMultiple, setDyMultiple] = useState<common.tagDynamicMultiple[]>([]);
  const [curPeriodNumber, setCurPeriodNumber] = useState<string>('');
  //保存游戏记录
  const [gameRecords, setGameRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [tagUserBetInfo, setTagUserBetInfo] = useState<
    common.tagCommonBetInfo[]
  >([]);
  const { gameWsUrl, gameList, saveCountTime } = useGameConfigStore(); // 游戏配置
  const { changeState } = useGlobalStore();
  const [webkitId] = useGetSystemInfo();
  const { changeUserScore } = useUserScoreStore();
  const wsCC = useRef(null);

  const { fieldInfo } = getGameInfo(gameList, 3102);

  /**
   *@description 处理开始封盘和开始下注的逻辑
   */
  const sceneChange = useCallback(
    (data: any) => {
      if (data?.cbSceneStatus?.value === 101) {
        // 倒计时结束，时间改为封盘中
        saveCountTime(`${formatMsg('underCover')}`);
        refContent.current?.onReset(false);
        refBetInputRef.current?.onResetData();
      } else if (data?.cbSceneStatus?.value === 100) {
        // 重新倒计时
        saveCountTime(data?.dwAllSeconds?.value);
      } else if (data?.cbSceneStatus?.value === 0) {
        // 倒计时结束，时间改为未开盘
        saveCountTime(`${formatMsg('notOpen')}`);
      }
    },
    [saveCountTime]
  );

  /**
   * @description: 更新用户金额
   * @param {*} useCallback
   * @return {*}
   */
  const getUserScore = useCallback(() => {
    getUserScoreInfo()
      .then((res: any) => {
        if (res.Data) changeUserScore(res.Data);
      })
      .catch(() => {});
  }, [changeUserScore]);

  /**
   * @description: 网络回调
   * @param {NetData} msg
   * @param {Game3102} cc 第二参数可以拿
   * @return {*}
   */
  const netMessage = useCallback(
    (msg: NetData, cc: Game3102): any => {
      switch (msg.dateType) {
        case NetCommonRoute.loginSuccess: //data:CMD_CRS_LogonSuccess
          console.log(msg.data);
          cc.postGameScene();
          setGameHandle(cc);
          changeState('isLoading', false);
          break;
        case NetCommonRoute.systemMessage: //data:CMD_CRS_SystemMessage
          console.log(msg.data);
          break;
        case NetCommonRoute.webSocketClose:
          console.log('网络关闭');
          changeState('isLoading', false);
          break;
        case NetCommonRoute.webSocketReconnect:
          console.log('重连失败');
          break;
        default:
      }
    },
    [changeState]
  );

  /**
   * @description: 游戏网络逻辑
   * @param {NetData} msg
   * @param {Game2904} cc
   * @return {*}
   */
  const gameNetMessage = useCallback(
    (msg: NetData, wsG: CtrlGame) => {
      switch (msg.dateType) {
        case GameRoute.refreshBaseConfig:
          console.log('刷新配置:', msg.data);
          break;
        case GameRoute.gameSceneState:
          console.log('场景状态:', msg.data);
          break;
        case GameRoute.gameScenConfig:
          {
            console.log('场景配置:', msg.data);
            const scene = msg.data as CMD_3102.CMD_S_GameScene;
            console.log(
              '🚀 ~ file: index.tsx:58 ~ gameNetMessage ~ scene:',
              scene
            );
            setGameScene(scene);
            setDyMultiple(() => []);
            setGameMultiple([...scene.stGameConfig.dwMultiple]);
            setCurPeriodNumber(scene.szPeriodNumber.value);
            // 0 未开始 100 下注 101 封盘
            const sts = wsG.getGameSceneState();
            console.log({ sts });
            let ct = (msg?.data as any)?.dwTimeLeave?.value;
            if (sts === 0) {
              ct = '未开盘';
            } else if (sts === 101) {
              ct = '封盘中';
            }
            saveCountTime(ct);
          }
          break;
        case GameRoute.sceneChange:
          console.log('场景切换:', msg.data); //切换到下期下注处理
          // eslint-disable-next-line no-case-declarations
          const scene1 = msg.data as CMD_3102.CMD_S_GameScene;
          setCurPeriodNumber(scene1.szPeriodNumber.value);
          sceneChange(msg?.data);
          setDyMultiple(() => []);
          break;
        case GameRoute.historyRecord:
          console.log('开奖记录:', msg.data);
          // eslint-disable-next-line no-case-declarations
          setGameRecords(msg.data as any[]);
          break;
        case GameRoute.dynamicMultiple:
          console.log('动态赔率:', msg.data);
          setDyMultiple((r) => [
            ...(msg.data as CMD_3102.CMD_S_DynamicMultiple).stMultipleList,
            ...r,
          ]);
          break;
        case GameRoute.dynamicMultipleFinish:
          console.log('动态赔率下发完成:', msg.data);
          break;
        case GameRoute.userBetSuccess:
          console.log('下注成功:', msg.data);
          // eslint-disable-next-line no-use-before-define
          setTagUserBetInfo([]);
          setCount(0);
          refContent.current.onReset();
          refBetInputRef.current?.onResetData();
          toastText(`${formatMsg('long-link-1')}`);
          getUserScore();
          break;
        case GameRoute.userBetFaild:
          console.log('下注失败:', msg.data);
          // eslint-disable-next-line no-use-before-define
          toastText(`${msg.data}`);
          break;
        case GameRoute.gameEnd:
          console.log('游戏结束:', msg.data);
          // eslint-disable-next-line no-case-declarations
          const gameEnd = msg.data as CMD_3102.CMD_S_GameEnd;
          setCurPeriodNumber(
            (parseInt(gameEnd.stRecordInfo.szPeriodNumber.value) + 1).toString()
          );
          setDyMultiple(() => []);
          setGameRecords((preRed) => [
            { ...(msg?.data as any)?.stRecordInfo },
            ...preRed,
          ]);
          break;
        default:
      }
    },
    [saveCountTime, sceneChange, getUserScore]
  );

  const onChoose = (dataList: ButtonDataType[]) => {
    // FIXME 2023-06-13 11:15:24 此处获取下注信息
    console.log('🚀 ~ file: index.tsx:171 ~ onChoose ~ dataList:', dataList);
    if (dataList.length < 0) return;
    const dataBetInfoList = dataList.map((r) => {
      const dyOddsInfo = dyMultiple.find(({ AreaInfo }) => {
        const equalMainType = AreaInfo.cbBetMainType.value === r.mainType;
        const equalSubType = AreaInfo.cbBetSubType.value === r.subType;
        const numberList = AreaInfo.cbNumber
          .map((r) => r.value)
          .filter((r) => r !== 255);
        if (numberList.length === 0) return equalMainType && equalSubType;
        const equalNumber = `${numberList}` === `${r.number}`;
        return equalMainType && equalSubType && equalNumber;
      });
      const odds =
        dyOddsInfo?.dwMultiple?.value || gameMultiple[r.oddsKey].value;
      return buildTagUserBetInfo(0, odds, r);
    });
    console.log(
      '🚀 ~ file: index.tsx:183 ~ onChoose ~ dataBetInfoList:',
      dataBetInfoList
    );
    setTagUserBetInfo(dataBetInfoList);
    setCount(dataBetInfoList.length);
  };

  // // 投注单条信息
  // const tagDynamicMultiple = useMemo(() => {
  //   let tagDynamicMultiple = CreateArray(common.tagDynamicMultiple, [common.LEN_SSC_BET_COUNT], 0, true);
  //   tagDynamicMultiple = [];
  //   return tagDynamicMultiple;
  // }, []);

  // // 下注的信息
  // const placeBetInfo = useMemo(() => {
  //   const betInfo = CreateObject(common.CMD_C_PlaceBet);
  //   betInfo.tagCommonBetInfo = [];
  //   betInfo.tagSpecialMultiple = [];
  //   betInfo.placeBetHead.cPeriodNumber.value = curPeriodNumber;
  //   return betInfo;
  // }, [curPeriodNumber]);

  // // 点击单个注
  // const handleBetClick = useCallback(
  //   (it) => (isAct) => {

  //   },
  //   []
  // );

  const onCLChoose = (
    _isActive: any,
    _title: string,
    _bottomTitle: any,
    data: string | any[]
  ) => {
    if (_title === '长龙') {
      setCount(data.length);
      return true;
    }
    return false;
  };

  const url = useMemo(() => {
    if (fieldInfo?.Room?.ServerPort) {
      return gameWsUrl + fieldInfo?.Room?.ServerPort;
    }
    return null;
  }, [fieldInfo, gameWsUrl]);

  useEffect(() => {
    if (url && webkitId && !wsCC?.current) {
      console.log(url, token, gameId);
      changeState('isLoading', true);
      wsCC.current = new Game3102(url, webkitId);
      wsCC.current.dispatcherCall(netMessage, gameNetMessage);
      wsCC.current.connect({ token, gameId });
      // FIXME 2023-09-04 14:47:05 北丐本地服务器地址
      // wsCC.current = new Game2905('ws://192.168.3.117:10019', webkitId);
      // wsCC.current.dispatcherCall(netMessage, gameNetMessage);
      // wsCC.current.connect({ token: '0dc131b81a534991abeae90cdbe724a3', gameId: '59654528' });
    }
    return () => {
      if (wsCC.current) {
        wsCC.current.Close();
        wsCC.current = null;
      }
    };
  }, [token, gameId, url, gameNetMessage, webkitId, changeState, netMessage]);

  // 投注
  const handleBet = useCallback(
    (info, betPeriod) => {
      if (gameHandle && info) {
        if (betPeriod === null) {
          for (let index = 0; index < info.length; index += 1) {
            console.log('longDragonBet+++++++++++++++', info[index]);
            gameHandle.longDragonBet(info[index]);
          }
        }
        return;
      }
      const newInfo = CreateObject(common.CMD_C_PlaceBet);
      newInfo.placeBetHead.cPeriodNumber.value = curPeriodNumber;
      newInfo.tagCommonBetInfo = tagUserBetInfo;
      newInfo.placeBetHead.wBetCount.value = tagUserBetInfo.length;
      newInfo.tagSpecialMultiple = [];
      newInfo.placeBetHead.wMultipleCount.value = 0;
      console.log('🚀 ~ file: index.tsx:274 ~ newInfo:', newInfo);
      gameHandle.userBetScore(newInfo);
    },
    [gameHandle, tagUserBetInfo, curPeriodNumber]
  );

  return (
    <>
      <CountTimeS />
      <div className='df-aic-jcc flex-1 fd-c o-none'>
        <ClassicsTop
          gameType={3102}
          curPeriodNumber={curPeriodNumber}
          gameRecords={gameRecords}
        />
        <Content
          ref={refContent}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChoose}
          onChangLongChange={onCLChoose}
          gameWs={gameHandle}
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
        <BetInput
          ref={refBetInputRef}
          tagCommonBetInfo={tagUserBetInfo}
          curGameId={3102}
          betPeriod={curPeriodNumber}
          betCount={count}
          betChip={gameScene.stGameConfig.lBetChip}
          onBetClick={handleBet}
          onClear={() => refContent.current?.onReset(false)}
          stPlaceBetFunction={refContent.current?.sendJetton}
        />
      </div>
    </>
  );
}

export default observer(BitcoinRacing);

