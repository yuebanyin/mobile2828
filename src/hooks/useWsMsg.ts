import { useCallback, useEffect } from 'react';
import {
  useGameConfigStore,
  useGameTimeStore,
  useUserInfoStore,
  useUserScoreStore,
  useWSInstanceStore,
} from '@/mobx';
import { MsgRoute, NetCommonRoute, NetData } from '@/engine/ctrl/NetRoute';
import { getUserMail, getUserScoreInfo } from '@/services';
import { useNavigation } from './useAutoNavigation';
import { useUserEmailCountStore } from '@/mobx/userEmail';
import { useGetSystemInfo } from './useGetSystemInfo';
import { openRepeatExpire } from '../Expire';
import { toastText } from '@/components';
import { openHallRedpacketRule } from '@/pages/hallRedpack/PlayRule';
import { useLanguage } from './useLanguage';

export const useWsMsg = () => {
  const {
    msgws,
    createMsgWs,
    logoutMsgHall,
    saveGlobalRedPacketData,
    saveGlobalRedPacketState,
    saveGlobalRedPacketSuccess,
    clearGlobalRedPacketData,
  } = useWSInstanceStore();
  const { msgWsUrl } = useGameConfigStore();
  const { token, gameId, clearUserInfo } = useUserInfoStore();
  const { changeUserScore } = useUserScoreStore();
  const { changeUserEmailCount } = useUserEmailCountStore();
  const { changeRequest } = useGameTimeStore();
  const navigate = useNavigation();
  const [webkitId] = useGetSystemInfo();
  const { formatMsg } = useLanguage();

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
   * @description: 更新邮件数量
   * @param {*} useCallback
   * @return {*}
   */
  const getUserEmailCount = useCallback(() => {
    getUserMail()
      .then((res: any) => {
        let val = 0;
        for (let i = 0; i < res.Data.List.length; i += 1) {
          if (res.Data.List[i].Status === false) {
            val += 1;
          }
        }

        if (val > 0) {
          changeUserEmailCount(val);
        }
      })
      .catch(() => {});
  }, [changeUserEmailCount]);

  const clearOut = useCallback(() => {
    clearUserInfo();
    navigate('/login');
  }, [clearUserInfo, navigate]);

  // 领取红包失败
  const redPacketFail = useCallback(
    (info) => {
      if (
        info?.data?.wMainCmdID?.value === 2 &&
        info?.data?.wSubCmdID?.value === 103
      ) {
        openHallRedpacketRule(true);
        // toastText(info?.data?.szDescribeString?.value || '领取失败');
        const msg = info?.data?.szDescribeString?.value;
        console.log('msgmsgmsgmsg', msg);
        if (typeof msg === 'string') {
          if (msg.includes('parm')) {
            const msgObj = JSON.parse(msg);
            toastText(formatMsg(msgObj?.key, msgObj?.parm));
          } else {
            toastText(msg);
          }
        } else if (typeof msg === 'object') {
          toastText(formatMsg(msg?.key, msg?.parm));
        }
      }
    },
    [formatMsg]
  );

  const msgNetCallback = useCallback(
    (msg: NetData): any => {
      console.log({ msg });
      switch (msg.dateType) {
        case NetCommonRoute.loginSuccess: //data:CMD_CRS_LogonSuccess
          break;
        case NetCommonRoute.systemMessage: //data:CMD_CRS_SystemMessage
          console.log('msg--失败', msg);

          redPacketFail(msg);
          break;
        case NetCommonRoute.webSocketClose:
          console.log('msg--网络关闭');
          clearGlobalRedPacketData();
          break;
        case NetCommonRoute.webSocketReconnect:
          break;
        case NetCommonRoute.onRepeatLogin: //重复登录 BOOL value=1为同设备登录 value=0不同设备登录
          console.log('msg-重复登录', msg);
          openRepeatExpire({ cb: logoutMsgHall });
          break;
        case MsgRoute.kickUser: //用户提出 ---相关说有的连接都退出 --- 同时退出清理当前用户登录状态，清空
          clearOut();
          break;
        case MsgRoute.robRedPacketSuccess: //抢红包成功
          console.log('抢红包成功', msg.data);
          saveGlobalRedPacketSuccess(msg.data);
          getUserScore();
          break;
        case MsgRoute.rechargeSuccess: //充值成功 ---纯粹的通知---客户端需要通过http-api进行更新
        case MsgRoute.refreshUserScore: //刷新用户积分 ---纯粹的通知---客户端需要通过http-api进行更新
          getUserScore();
          break;
        case MsgRoute.newEmail: //新邮件 ---纯粹的通知---客户端需要通过http-api进行更新
          console.log('新邮件 ---纯粹的通知---客户端需要通过http-api进行更新');
          getUserEmailCount();
          break;
        case MsgRoute.regPacketConfig: //新增红包活动或者已有活动在用户登录时下发，同一时间仅有一个活动
          saveGlobalRedPacketData(msg.data);
          break;
        case MsgRoute.regPacketState: //查询自己是否已经领取过奖励
          console.log('查询红包状态', msg.data);
          saveGlobalRedPacketState(msg.data);
          break;
        case MsgRoute.gameState: //时间配置或者游戏维护状态已发送变化，需要重新查询更新
          changeRequest();
          break;
        default:
      }
    },
    [
      clearGlobalRedPacketData,
      logoutMsgHall,
      clearOut,
      saveGlobalRedPacketSuccess,
      getUserScore,
      getUserEmailCount,
      saveGlobalRedPacketData,
      saveGlobalRedPacketState,
      redPacketFail,
      changeRequest,
    ]
  );

  /**
   * @description: 大厅登录
   * @param {*} useCallback
   * @return {*}
   */
  const loginMsgHall = useCallback(() => {
    if (token && msgWsUrl && msgWsUrl.length > 0 && !msgws) {
      // const msgWs = createMsgWs('ws://127.0.0.1:1770', webkitId); // 北丐自测
      const msgWs = createMsgWs(msgWsUrl, webkitId);
      if (msgWs) {
        msgWs.connect({ token, gameId });
        msgWs.dispatcherCall(msgNetCallback);
      }
    }
  }, [createMsgWs, gameId, msgNetCallback, msgWsUrl, msgws, token, webkitId]);

  useEffect(() => {
    loginMsgHall();
  }, [loginMsgHall]);

  return {
    msgWs: msgws,
    loginMsgHall,
  };
};
