import { useCallback, useMemo, useRef, useState } from 'react';
import {
  GameRoute,
  NetCommonRoute,
  NetData,
  ChatRoute,
} from '@/engine/ctrl/NetRoute';
import { Game2801 } from '@/engine/game/28/2801/Index';
import { toastText } from '@/components';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
// import { GameMgr } from '@/engine/mgr/mgr';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import {
  useGameConfigStore,
  useWSInstanceStore,
  useUserScoreStore,
  useGlobalStore,
} from '@/mobx';
import { formatDate } from '@/utils/dayjs';
import { getUserScoreInfo } from '@/services';
import CtrlGame from '@/engine/ctrl/CtrlGame';
import type { GameScenType } from '@/pages/home/pc28Games';
import { useLanguage } from './useLanguage';

export const useHandleRoomMsg = (curKindId?: number) => {
  const { formatMsg } = useLanguage();
  // 房间内的消息保存
  const [msg, setMsg] = useState<any[]>([]);
  //保存游戏记录
  const [gameRecords, setGameRecords] = useState([]);
  // 最新赔率
  const [odds, setOdds] = useState<common.tagDynamicMultiple[]>(null);

  // 是否有聊天室
  const isChat = useMemo(
    () => [2801, 2802, 2803, 2804].includes(curKindId),
    [curKindId]
  );

  // 长隆长链示例
  const [clcc, setClcc] = useState(null);

  // 是否登录完成
  const isLoginRef = useRef(false);

  // 获取游戏配置
  const [gameScen, setGameScen] = useState<GameScenType>(null);

  // 最新期号
  const [lastPeriod, setLastPeriod] = useState('');

  // 置顶红包
  const [topRedpacket, setTopRedpacket] = useState(null);

  const [forecastRank, setForecastRank] = useState(null);

  const { saveRedpackData } = useWSInstanceStore();
  const { changeState } = useGlobalStore();
  const {
    saveCountTime,
    saveDwMultiple,
    saveTdMultiple,
    setRedpacketConfig,
    initGameConfig,
    changeTDMStatus,
  } = useGameConfigStore();
  const { changeUserScore } = useUserScoreStore();

  // 保存红包配置
  const saveRedpacketConfig = useCallback(
    (msg) => {
      console.log(msg);
      setRedpacketConfig('isVisible', true);
      setRedpacketConfig('redPackScore', msg?.lMaxScore?.value);
      setRedpacketConfig('redPackHour', msg?.wDurationHour?.value);
      setRedpacketConfig('redPackCount', msg?.wMaxCount?.value);
    },
    [setRedpacketConfig]
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
   * 红包领取状态提示
   * HBRT_OK = 0, 可以领取
   * HBRT_E_STOCK = 1, 您来晚了
   * HBRT_E_REPEAT = 2, 您已经领取过了
   * HBRT_E_UNKNOW = 3, 系统错误
   * HBRT_E_UNKNOW = 100 领取成功（该状态为前端自定义）
   * */
  const openRedpacket = useCallback(
    (status) => {
      if (status === 1) {
        toastText(`${formatMsg('S-C-HB-15')}`);
      } else if (status === 2) {
        // toastText('您已经领取过了');
      } else if (status === 3) {
        toastText(`${formatMsg('S-C-HB-17')}`);
      }
      // 保存红包状态
      saveRedpackData('status', status);
    },
    [saveRedpackData, formatMsg]
  );

  // 领取成功保存金额和自定义状态
  const editRedpacketStatus = useCallback(
    (value) => {
      saveRedpackData('status', 100);
      saveRedpackData('ownerScore', value);
    },
    [saveRedpackData]
  );

  // 红包领取成功（排行）
  const successOpenRedpacket = useCallback(
    (list) => {
      saveRedpackData('list', list);
    },
    [saveRedpackData]
  );

  /**
   * @description: 网络回调
   * @param {NetData} msg
   * @param {Game2801} cc 第二参数可以拿
   * @return {*}
   */
  const gameNetMessage = useCallback(
    (msg: NetData, cc: Game2801): any => {
      switch (msg.dateType) {
        case NetCommonRoute.loginSuccess: //data:CMD_CRS_LogonSuccess
          console.log('游戏服登录成功', msg.data);
          cc.postGameScene();
          setClcc(cc);
          isChat &&
            setMsg((preMsg) => [
              { text: formatDate(new Date(), '_YMDHms'), recordType: 89 },
              { tipKey: 'GetInto', recordType: 89 },
              ...preMsg,
            ]);
          break;
        case NetCommonRoute.systemMessage: //data:CMD_CRS_SystemMessage
          console.log(msg.data);
          break;
        case NetCommonRoute.webSocketClose:
          console.log('网络关闭');
          break;
        case NetCommonRoute.webSocketReconnect:
          console.log('重连失败');
          break;
        case NetCommonRoute.onRepeatLogin: //重复登录 BOOL value=1为同设备登录 value=0不同设备登录
          console.log('game-重复登录', msg);
          break;
        default:
      }
    },
    [isChat]
  );

  /**
   * @description 获取不同游戏的场景配置
   */
  const gameScenConfig = useCallback(
    (data) => {
      switch (curKindId) {
        case 2801:
          console.log('场景配置:', data);
          break;

        default:
          break;
      }
    },
    [curKindId]
  );

  /**
   *@description 处理开始封盘和开始下注的逻辑
   */
  const sceneChange = useCallback(
    (data: any) => {
      setLastPeriod((data as GameScenType)?.szPeriodNumber.value);
      if (data?.cbSceneStatus?.value === 101) {
        // 倒计时结束，时间改为封盘中
        saveCountTime(formatMsg('underCover'));
        // 开始封盘
        isChat &&
          setMsg((preMsg) => [
            ...preMsg,
            {
              tipKey: 'SealingStart',
              recordType: 88,
              title: formatMsg('closeNews'),
              // title: '封盘消息',
              period: (data as GameScenType)?.szPeriodNumber.value,
            },
            {
              tipKey: 'SealingIng',
              recordType: 88,
              title: formatMsg('closeNews'),
              // title: '封盘消息',
              period: (data as GameScenType)?.szPeriodNumber.value,
            },
          ]);
      } else if (data?.cbSceneStatus?.value === 100) {
        // 重新倒计时
        saveCountTime(data?.dwAllSeconds?.value);
        saveTdMultiple('', [], true);
        changeTDMStatus(false);
        // 开始下注
        isChat &&
          setMsg((preMsg) => [
            ...preMsg,
            {
              tipKey: 'Startbet',
              recordType: 88,
              title: formatMsg('StartBets'),
              period: (data as GameScenType)?.szPeriodNumber.value,
              text: `${formatMsg('StartBets')}!`,
            },
          ]);
      } else if (data?.cbSceneStatus?.value === 0) {
        // 倒计时结束，时间改为未开盘
        saveCountTime(formatMsg('notOpen'));
      }
    },
    [saveCountTime, saveTdMultiple, changeTDMStatus, isChat, formatMsg]
  );

  /**
   * @description 处理游戏结束时，添加游戏开奖记录，以及保存消息中
   */
  const handleGameEnd = useCallback(
    (data: any) => {
      setGameRecords((preRed) => [{ ...data?.stRecordInfo }, ...preRed]);
      let text = '';
      const resArr = (data as any)?.stRecordInfo?.cbTableCard || [];
      if (resArr.length) {
        text = `${resArr[1]?.value} + ${resArr[2]?.value} + ${resArr[3]?.value} = ${resArr[0]?.value}`;
      }
      isChat &&
        setMsg((preMsg) => [
          ...preMsg,
          {
            tipKey: 'Lottery',
            recordType: 88,
            title: formatMsg('lotteryResults'),
            period: data?.stRecordInfo?.szPeriodNumber?.value,
            text,
          },
        ]);
    },
    [isChat, formatMsg]
  );

  /**
   * @description: 游戏网络逻辑-2801
   * @param {NetData} msg
   * @param {Game2801} cc
   * @return {*}
   */
  const gameChatMessage = useCallback(
    (msg: NetData, wsG: CtrlGame) => {      
      switch (msg.dateType) {
        case GameRoute.refreshBaseConfig:
          console.log('刷新配置:', msg.data);
          saveDwMultiple((msg?.data as any)?.dwMultiple);
          break;
        case GameRoute.gameSceneState:
          console.log('场景状态:', msg.data);
          break;
        case GameRoute.gameScenConfig:
          {
            console.log('游戏场景配置:', msg.data);
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
            gameScenConfig(msg?.data);
            setGameScen(msg?.data as GameScenType);
            saveDwMultiple(
              (msg?.data as GameScenType)?.stGameConfig?.dwMultiple
            );
            setLastPeriod((msg?.data as GameScenType)?.szPeriodNumber.value);
          }
          break;
        case GameRoute.sceneChange:
          console.log('期数场景切换:', msg.data); //切换到下期下注处理
          sceneChange(msg?.data);
          break;
        case GameRoute.historyRecord:
          console.log('开奖记录:', msg.data);
          setGameRecords(msg.data as any[]);
          break;
        case GameRoute.dynamicMultiple:
          console.log('动态赔率:', msg.data);
          saveTdMultiple(
            (msg.data as any)?.szPeriodNumber?.value,
            (msg.data as any)?.stMultipleList
          );
          break;
        case GameRoute.dynamicMultipleFinish:
          console.log('动态赔率下发完成:', msg?.data);
          changeTDMStatus(true);
          break;
        case GameRoute.userBetInfo:
          console.log('用户下注信息:', msg.data);
          // 使用这种方式主要解决拿不到期号的问题
          isChat &&
            setLastPeriod((p) => {
              setMsg((preMsg) => [
                ...preMsg,
                { ...msg.data, szPeriodNumber: p, recordType: 99 },
              ]);
              return p;
            });
          break;
        case GameRoute.userBetSuccess:
          console.log('下注成功:', msg.data);
          // 用户下注成功需要重新过去当前的余额
          getUserScore();
          toastText(`${formatMsg('long-link-1')}`);
          break;
        case GameRoute.userBetFaild:
          console.log('下注失败:', msg.data);
          toastText(msg?.data);
          break;
        case GameRoute.forecastRank:
          console.log('查询预测专家排名', msg.data);
          setForecastRank(msg.data);
          break;
        case GameRoute.gameEnd:
          console.log('游戏结束:', msg.data);
          handleGameEnd(msg?.data);
          break;
        default:
      }
    },
    [
      saveCountTime,
      gameScenConfig,
      sceneChange,
      handleGameEnd,
      saveDwMultiple,
      saveTdMultiple,
      getUserScore,
      changeTDMStatus,
      isChat,
      formatMsg
    ]
  );

  // 管理员删除消息 dwGameID  lMessageID
  const delMsg = useCallback((msgItem) => {
    setMsg((preMsg) => {
      const newMsg = [];
      preMsg.forEach((it) => {
        if (
          it?.data?.UserInfo?.dwGameID?.value !== msgItem?.dwGameID?.value ||
          it?.data?.lMessageID?.value !== msgItem?.lMessageID?.value
        ) {
          newMsg.push(it);
        }
      });
      return newMsg;
    });
  }, []);

  /**
   * gameChatRoomMsg 游戏聊天室中，连接聊天ws时收到的消息
   */
  const gameChatRoomMsg = useCallback(
    (msg: NetData) => {
      console.log('游戏信息出口', msg);
      
      switch (msg.dateType) {
        // case NetCommonRoute.systemMessage: //data:CMD_Chat.CMD_CRS_SystemMessage
        //   console.log('11111111111111111111', (msg.data as CMD_Chat.CMD_CRS_SystemMessage).szDescribeString.value);
        //   toastText(
        //     (msg.data as CMD_Chat.CMD_CRS_SystemMessage).szDescribeString.value
        //   );
        //   break;
        case NetCommonRoute.systemMessage: { 
          const msgObj = JSON.parse((msg.data as CMD_Chat.CMD_CRS_SystemMessage).szDescribeString.value);
          toastText(formatMsg(msgObj?.key, msgObj?.parm));
          console.log(msgObj);
          break;
        }
        case NetCommonRoute.loginFinish:
          isLoginRef.current = true;
          console.log('登录完成++');
          changeState('isLoading', false);
          break;
        case NetCommonRoute.webSocketClose:
          console.log('网络关闭');
          isLoginRef.current = false;
          changeState('isLoading', false);
          break;
        case NetCommonRoute.webSocketReconnect:
          console.log('重连失败');
          break;
        case NetCommonRoute.onRepeatLogin: //重复登录 BOOL value=1为同设备登录 value=0不同设备登录
          console.log('chat-重复登录', msg);
          break;
        case ChatRoute.historyRecord: //每个聊天记录都需要本地内存记录起来，针对管理员进行数据删除管理 根据lMessageID进行删除 data:CMD_Chat.CMD_CRS_S_ChatRoomRecord
          console.log('聊天记录', msg.data);
          setMsg((preMsg) => [...preMsg.concat(msg.data as any[])]);
          break;
        case ChatRoute.liveChat: //即时聊天信息
          console.log('实时聊天消息', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          break;
        case ChatRoute.deleteMessage: //管理员删除消息，需要将界面上对应的聊天消息删除 data:CMD_Chat.CMD_CRS_S_DeleteMessage
          console.log('管理员删除消息', msg.data);
          delMsg(msg.data);
          break;
        case ChatRoute.managerMessage: //管理员在后台手动发送消息 data:CMD_Chat.CMD_CRS_S_ManagerMessage
          console.log('管理员发送消息', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          break;
        case ChatRoute.gameRecord: //游戏记录
          console.log('游戏记录', msg.data as common.tagCommonSSCRecordInfo);
          setGameRecords(msg.data as any[]);
          break;
        case ChatRoute.onNoticeMessage: //系统公告更新，需要主动查询最新公告内容
          console.log('系统公告更新', msg.data);
          break;
        case ChatRoute.winBroadcast: //推送游戏内满足条件的赢分消息
          console.log('赢分广播', msg.data);
          break;
        case ChatRoute.sysRedPacketInfo: //系统红包配置信息
          console.log('系统红包', msg.data);
          if (isLoginRef.current) {
            // 登录完成之后，系统红包才可以添加到聊天信息中
            setMsg((preMsg) => [...preMsg, msg.data]);
          }
          if ((msg?.data as any)?.data?.bTop?.value === 1) {
            // 登录完成之前，如果系统红包是置顶的，单独保存数据
            setTopRedpacket((preR) => {
              if (preR) {
                preR.unshift(msg.data);
                return [msg.data, ...preR];
              }
              return [msg.data];
            });
          }
          break;
        case ChatRoute.userRedPacketInfo: //用户红包配置信息
          console.log('用户红包', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          break;
        case ChatRoute.sysRedPacketState: //系统红包取消置顶时下发
          console.log('系统红包状态', msg.data);
          // 收到取消置顶的红包时
          setTopRedpacket((data: []) => {
            if (data && data.length) {
              return [
                ...data.filter(
                  (it: any) =>
                    it?.data?.BaseInfo?.dwHongBaoID?.value !==
                    (msg?.data as any)?.value
                ),
              ];
            }
            return null;
          });
          break;
        case ChatRoute.receiveRedPacketSuccess: //领取红包-奖励结果
          console.log('红包领取成功', msg.data);
          editRedpacketStatus((msg?.data as any)?.value);
          break;
        case ChatRoute.receiveRedPacketRank: //红包领取排行
          console.log('红包排行', msg.data);
          successOpenRedpacket(msg.data);
          break;
        case ChatRoute.qureyRedPacketState: //红包领取状态
          console.log('红包领取状态', msg.data);
          openRedpacket((msg?.data as any)?.value);
          break;
        case ChatRoute.qureyRedPacketConfig: //查询发送红包配置
          console.log('查询发送红包配置', msg.data);
          saveRedpacketConfig(msg.data);
          break;
        default:
          break;
      }
    },
    [
      changeState,
      editRedpacketStatus,
      successOpenRedpacket,
      openRedpacket,
      saveRedpacketConfig,
      delMsg,
      formatMsg
    ]
  );

  /**
   * @description: 聊天室内容网络回调
   * @param {NetData} msg
   * @param {Game2801} cc 第二参数可以拿
   * @return {*}
   */
  const ChatRoomeMessage = useCallback(
    (msg: NetData, cc: CtrlChat): any => {
      switch (msg.dateType) {
        case NetCommonRoute.loginSuccess: //data:CMD_Chat.CMD_CRS_LogonSuccess
          console.log(msg.data);
          //设置默认选择的游戏
          cc.selectGame(2801, 1);
          // cc.sendRebPacket(1, 1, '恭喜发财，万事如意');
          break;
        case NetCommonRoute.loginFinish:
          isLoginRef.current = true;
          console.log('登录完成++');
          changeState('isLoading', false);
          break;
        // case NetCommonRoute.systemMessage: //data:CMD_Chat.CMD_CRS_SystemMessage
        //   toastText(
        //     (msg.data as CMD_Chat.CMD_CRS_SystemMessage).szDescribeString.value
        //   );
        //   console.log(msg.data);
        //   break;
        case NetCommonRoute.systemMessage: { 
          const msgObj = JSON.parse((msg.data as CMD_Chat.CMD_CRS_SystemMessage).szDescribeString.value);
          toastText(formatMsg(msgObj.key, msgObj?.parm));
          console.log(msg.data, msgObj);
          break;
        }
        case NetCommonRoute.webSocketClose:
          console.log('网络关闭');
          isLoginRef.current = false;
          changeState('isLoading', false);
          break;
        case NetCommonRoute.webSocketReconnect:
          console.log('重连失败');
          break;
        case NetCommonRoute.onRepeatLogin: //重复登录 BOOL value=1为同设备登录 value=0不同设备登录
          console.log('chat-重复登录', msg);
          break;
        case ChatRoute.historyRecord: //每个聊天记录都需要本地内存记录起来，针对管理员进行数据删除管理 根据lMessageID进行删除 data:CMD_Chat.CMD_CRS_S_ChatRoomRecord
          console.log('聊天记录', msg.data);
          setMsg((preMsg) => [...preMsg.concat(msg.data as any[])]);
          break;
        case ChatRoute.liveChat: //即时聊天信息
          console.log('实时聊天消息', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          break;
        case ChatRoute.deleteMessage: //管理员删除消息，需要将界面上对应的聊天消息删除 data:CMD_Chat.CMD_CRS_S_DeleteMessage
          console.log('管理员删除消息', msg.data);
          delMsg(msg.data);
          break;
        case ChatRoute.managerMessage: //管理员在后台手动发送消息 data:CMD_Chat.CMD_CRS_S_ManagerMessage
          console.log('管理员发送消息', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          break;
        case ChatRoute.userBetRecord: //用户下注记录 -- 自己下注记录--需要区分判断
          // console.log('用户下注记录', msg.data);
          setMsg((preMsg) => [...preMsg, { ...msg.data, recordType: 99 }]);
          break;
        case ChatRoute.betMultInfo: //下注赔率信息
          console.log('下注赔率信息', msg.data);
          setOdds(msg.data as common.tagDynamicMultiple[]);
          break;
        case ChatRoute.betSuccess: //下注成功
          console.log('下注成功', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          // 用户下注成功需要重新过去当前的余额
          getUserScore();
          break;
        case ChatRoute.betFaild: //下注失败
          console.log('下注失败', msg.data);
          toastText(msg.data);
          break;
        case ChatRoute.gameRecord: //游戏记录
          console.log('游戏记录', msg.data as common.tagCommonSSCRecordInfo);
          setGameRecords(msg.data as any[]);
          break;
        case ChatRoute.onNoticeMessage: //系统公告更新，需要主动查询最新公告内容
          console.log('系统公告更新', msg.data);
          break;
        case ChatRoute.winBroadcast: //推送游戏内满足条件的赢分消息
          console.log('赢分广播', msg.data);
          break;
        case ChatRoute.sysRedPacketInfo: //系统红包配置信息
          console.log('系统红包', msg.data);
          if (isLoginRef.current) {
            // 登录完成之后，系统红包才可以添加到聊天信息中
            setMsg((preMsg) => [...preMsg, msg.data]);
          }
          if ((msg?.data as any)?.data?.bTop?.value === 1) {
            // 登录完成之前，如果系统红包是置顶的，单独保存数据
            setTopRedpacket((preR) => {
              if (preR) {
                preR.unshift(msg.data);
                return [msg.data, ...preR];
              }
              return [msg.data];
            });
          }
          break;
        case ChatRoute.userRedPacketInfo: //用户红包配置信息
          console.log('用户红包', msg.data);
          setMsg((preMsg) => [...preMsg, msg.data]);
          break;
        case ChatRoute.sysRedPacketState: //系统红包取消置顶时下发
          console.log('系统红包状态', msg.data);
          // 收到取消置顶的红包时
          setTopRedpacket((data: []) => {
            if (data && data.length) {
              return [
                ...data.filter(
                  (it: any) =>
                    it?.data?.BaseInfo?.dwHongBaoID?.value !==
                    (msg?.data as any)?.value
                ),
              ];
            }
            return null;
          });
          break;
        case ChatRoute.receiveRedPacketSuccess: //领取红包-奖励结果
          console.log('红包领取成功', msg.data);
          editRedpacketStatus((msg?.data as any)?.value);
          break;
        case ChatRoute.receiveRedPacketRank: //红包领取排行
          console.log('红包排行', msg.data);
          successOpenRedpacket(msg.data);
          break;
        case ChatRoute.qureyRedPacketState: //红包领取状态
          console.log('红包领取状态', msg.data);
          openRedpacket((msg?.data as any)?.value);
          break;
        case ChatRoute.qureyRedPacketConfig: //查询发送红包配置
          console.log('查询发送红包配置', msg.data);
          saveRedpacketConfig(msg.data);
          break;
        default:
          break;
      }
    },
    [
      changeState,
      getUserScore,
      editRedpacketStatus,
      successOpenRedpacket,
      openRedpacket,
      saveRedpacketConfig,
      delMsg,
      formatMsg,
    ]
  );

  const clear = useCallback(() => {
    setMsg(null);
    setGameRecords(null);
    setOdds(null);
    setGameScen(null);
    setLastPeriod(null);
    setTopRedpacket(null);
    initGameConfig();
  }, [initGameConfig]);

  return {
    lastPeriod,
    gameNetMessage,
    gameChatMessage,
    ChatRoomeMessage,
    gameChatRoomMsg,
    msg,
    gameRecords,
    odds,
    gameScen,
    topRedpacket,
    setOdds,
    setMsg,
    clear,
    clcc,
    forecastRank,
  };
};
