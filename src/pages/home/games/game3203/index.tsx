import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import {
  useGameConfigStore,
  useGlobalStore,
  useUserInfoStore,
  useUserScoreStore,
} from '@/mobx';
import { GameRoute, NetCommonRoute, NetData } from '@/engine/ctrl/NetRoute';
import { Content } from './Content';
import { BetInput } from '@/pages/gameComponents/betInput';
import { CreateArray, CreateObject, DWORD } from '@/engine/base/basetype';
import { CMD_3203 } from '@/engine/game/pc/3203/CMD_3203';
import { Game3203 } from '@/engine/game/pc/3203/Index';
import { toastText } from '@/components';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { ClassicsTop } from '@/pages/gameComponents/classicsTop';
import { useGetSystemInfo, useLanguage } from '@/hooks';
import CountTimeS from '../countTimes';
import { ButtonDataType, buildTagUserBetInfo } from './rules';
import CtrlGame from '@/engine/ctrl/CtrlGame';
import { getUserScoreInfo } from '@/services';
import { getGameInfo } from '@/utils/game';

/**
 * 加拿大幸运5
 * @returns
 */
function CanadianLuckyFive() {
  const { formatMsg } = useLanguage();
  const { token, gameId } = useUserInfoStore();
  const [gameHandle, setGameHandle] = useState<Game3203>();
  const [gameScene, setGameScene] = useState(
    CreateObject(CMD_3203.CMD_S_GameScene)
  );
  const refContent = useRef(null);
  const refBetInputRef = useRef(null);
  const [gameMultiple, setGameMultiple] = useState(
    CreateArray(DWORD, [CMD_3203.emMultipleType.MT_COUNT])
  );
  const [dyMultiple, setDyMultiple] = useState<common.tagDynamicMultiple[]>([]);
  const [curPeriodNumber, setCurPeriodNumber] = useState<string>('');
  //保存游戏记录
  const [gameRecords, setGameRecords] = useState([]);
  const [count, setCount] = useState(0);
  const [tagUserBetInfo, setTagUserBetInfo] = useState([]);
  // 游戏配置
  const { gameWsUrl, gameList, saveCountTime } = useGameConfigStore();
  const { changeState } = useGlobalStore();
  const [webkitId] = useGetSystemInfo();
  const wsCC = useRef(null);

  const { fieldInfo } = getGameInfo(gameList, 3203);

  /**
   * @description: 网络回调
   * @param {NetData} msg
   * @param {Game2904} cc 第二参数可以拿
   * @return {*}
   */
  const netMessage = useCallback(
    (msg: NetData, cc: Game3203): any => {
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
   *@description 处理开始封盘和开始下注的逻辑
   */
  const sceneChange = useCallback(
    (data: any) => {
      if (data?.cbSceneStatus?.value === 101) {
        // 倒计时结束，时间改为封盘中
        saveCountTime('封盘中');
        refContent.current?.onReset(false);
        refBetInputRef.current?.onResetData();
      } else if (data?.cbSceneStatus?.value === 100) {
        // 重新倒计时
        saveCountTime(data?.dwAllSeconds?.value);
      } else if (data?.cbSceneStatus?.value === 0) {
        // 倒计时结束，时间改为未开盘
        saveCountTime('未开盘');
      }
    },
    [saveCountTime]
  );

  const { changeUserScore } = useUserScoreStore();
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
            const scene = msg.data as CMD_3203.CMD_S_GameScene;
            console.log(
              '🚀 ~ file: index.tsx:58 ~ gameNetMessage ~ scene:',
              scene
            );
            setGameScene(scene);
            setGameMultiple([...scene.stGameConfig.dwMultiple]);
            setDyMultiple(() => []);
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
          const scene1 = msg.data as CMD_3203.CMD_S_GameScene;
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
            ...(msg.data as CMD_3203.CMD_S_DynamicMultiple).stMultipleList,
            ...r,
          ]);
          break;
        case GameRoute.dynamicMultipleFinish:
          console.log('动态赔率下发完成:', msg.data);
          break;
        case GameRoute.userBetSuccess:
          console.log('下注成功:', msg.data);
          setTagUserBetInfo([]);
          setCount(0);
          refContent.current.onReset();
          refBetInputRef.current?.onResetData();
          toastText(`${formatMsg('long-link-1')}`);
          getUserScore();
          break;
        case GameRoute.userBetFaild:
          console.log('下注失败:', msg.data);
          toastText(`${msg.data}`);
          break;
        case GameRoute.gameEnd:
          console.log('游戏结束:', msg.data);
          // eslint-disable-next-line no-case-declarations
          const gameEnd = msg.data as CMD_3203.CMD_S_GameEnd;
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
    [saveCountTime, getUserScore, sceneChange]
  );

  const onChoose = (dataList: ButtonDataType[]) => {
    // FIXME 2023-06-13 11:15:24 此处获取下注信息
    console.log('🚀 ~ onChoose:', dataList);
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
      '🚀 ~ file: index.tsx:181 ~ onChoose ~ dataBetInfoList:',
      dataBetInfoList
    );
    setTagUserBetInfo(dataBetInfoList);
    setCount(dataBetInfoList.length);
  };

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

  // const [params] = useSearchParams();
  // const pathKey = params.get('gameId');
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
      wsCC.current = new Game3203(url, webkitId);
      wsCC.current.dispatcherCall(netMessage, gameNetMessage);
      wsCC.current.connect({ token, gameId });
      // FIXME 2023-09-04 14:47:05 北丐本地服务器地址
      // wsCC.current = new Game2905('ws://192.168.3.117:10021', webkitId);
      // wsCC.current.dispatcherCall(netMessage, gameNetMessage);
      // wsCC.current.connect({ token: '0dc131b81a534991abeae90cdbe724a3', gameId: '59654528' });
    }
    return () => {
      if (wsCC.current) {
        wsCC.current.Close();
        wsCC.current = null;
      }
    };
  }, [token, gameId, url, gameNetMessage, webkitId, netMessage, changeState]);

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
          gameType={3203}
          curPeriodNumber={curPeriodNumber}
          gameRecords={gameRecords}
        />
        <Content
          ref={refContent}
          gameWs={gameHandle}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChoose}
          onChangLongChange={onCLChoose}
        />
        <BetInput
          ref={refBetInputRef}
          tagCommonBetInfo={tagUserBetInfo}
          curGameId={3203}
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

export default observer(CanadianLuckyFive);
