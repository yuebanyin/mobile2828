import { useCallback } from 'react';
import {
  useNavigate as useAutoNavigate,
  NavigateOptions,
} from 'react-router-dom';
import {
  useGlobalStore,
  useUserInfoStore,
  useUserScoreStore,
  useWSInstanceStore,
} from '@/mobx';
import { noSignAceRouter, ykIceR } from '@/constants';
import { toastText } from '@/components';
import { logout } from '@/services';
import { useLanguage } from '@/hooks';

export const useNavigation = () => {
  const autoNavigate = useAutoNavigate();
  const { token, isVisitor, clearUserInfo, isTest } = useUserInfoStore();
  const { clearUserScore } = useUserScoreStore();
  const { logoutMsgHall } = useWSInstanceStore();
  const { changeState, isLoading } = useGlobalStore();
  const { formatMsg } = useLanguage();
  const navigate = useCallback(
    (p, option?: NavigateOptions, href?: string) => {
      if (!token && !noSignAceRouter.test(p)) {
        // 未登录的路由权限
        navigate('/login');
        return;
      }
      if (isVisitor && ykIceR.test(p) && !isLoading) {
        // 试玩登录
        // 试玩账号没有权限额度情况下登出再跳登入页
        // debugger;
        console.log('跳转 show data', isVisitor, p, option, href);
        changeState('isLoading', true);
        logout()
          .then(() => {})
          .catch(() => {})
          .finally(() => {
            // toastText(ykNRTip);
            toastText(`${formatMsg('officialLogin')}`);
            clearUserInfo();
            clearUserScore();
            logoutMsgHall();
            navigate('/login');
            changeState('isLoading', false);
          });

        return;
      }
      // debugger;
      if (isTest && ['/mine/audit'].includes(p)) {
        toastText(`${formatMsg('accountNotOpen')}`);
        return;
      }
      if (href) {
        const w = window.open('about:_blank');
        if (w) w.location.href = href;
      } else {
        autoNavigate(p, option);
      }
    },
    [
      token,
      isVisitor,
      isLoading,
      isTest,
      changeState,
      clearUserInfo,
      clearUserScore,
      logoutMsgHall,
      autoNavigate,
      formatMsg
    ]
  );

  return navigate;
};

/**
 * @description 主要用于按钮（非路由跳转时使用）
 *
 */
export const useLimitBtn = () => {
  const { token, isVisitor } = useUserInfoStore();
  const navigate = useAutoNavigate();
  const { formatMsg } = useLanguage();

  // 权限控制的函数
  const limitBtnFn = useCallback(
    (cb: Function, btnName?: string) => {
      // 未登录时的按钮权限控制
      if (
        !token &&
        // ['注单', '发送', '红包', '跟注', '投注', '领取红包'].includes(btnName)
        [formatMsg('beted'), formatMsg('send'), formatMsg('redPacket'), formatMsg('followingNote'), formatMsg('bet'), formatMsg('ReceiveRedEnvelope')].includes(btnName)
      ) {
        navigate('/login');
        return;
      }
      // if (isVisitor && ['发送', '红包', '领取红包'].includes(btnName)) {
      if (isVisitor && [formatMsg('send'), formatMsg('redPacket'), formatMsg('ReceiveRedEnvelope')].includes(btnName)) {
        // 游客登录
        // toastText(ykNRTip);
        toastText(`${formatMsg('officialLogin')}`);

        return;
      }

      typeof cb === 'function' && cb();
    },
    [token, isVisitor, navigate, formatMsg]
  );

  return { limitBtnFn };
};

/**
 * @description 主要用于弹窗
 *
 */
export const useLimitDialog = () => {
  const { token, isVisitor } = useUserInfoStore();
  const { navigation } = useGlobalStore();
  const { formatMsg } = useLanguage();

  // 权限控制的函数
  const limitDialogFn = useCallback(
    (cb: Function, dialogName?: string) => {
      // 未登录时的按钮权限控制
      if (
        !token &&
        // ['注单', '发送', '红包', '跟注', '投注', '领取红包'].includes(dialogName)
        [formatMsg('beted'), formatMsg('send'), formatMsg('redPacket'), formatMsg('followingNote'), formatMsg('bet'), formatMsg('ReceiveRedEnvelope')].includes(dialogName)
      ) {
        typeof navigation === 'function' && navigation('/login');
        return;
      }
      if (isVisitor && [formatMsg('send'), formatMsg('redPacket'), formatMsg('ReceiveRedEnvelope')].includes(dialogName)) {
        // 游客登录
        // toastText(ykNRTip);
        toastText(`${formatMsg('officialLogin')}`);
        
        return;
      }

      typeof cb === 'function' && cb();
    },
    [token, isVisitor, navigation, formatMsg]
  );

  return { limitDialogFn };
};
