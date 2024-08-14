import { Drag } from '@nutui/nutui-react';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import redPacket from '@/assets/image/common/redpacket/btn_redPacket_02.png';
import closeBtn from '@/assets/image/common/redpacket/closeBtn.png';
import { Img, toastText } from '@/components';
import styles from './index.module.scss';
import { useGameConfigStore, useWSInstanceStore } from '@/mobx';
import { useSetInterval, useLanguage } from '@/hooks';
import { CMD_Msg } from '@/engine/cmd/msg/CMD_Msg';
import { openHallRedpacket } from '@/pages/hallRedpack';
import { getGameInfo } from '@/utils/game';

/**
 * 活动红包-全局浮窗显示
 * @returns
 */
const GlobalReward = () => {
  const { formatMsg } = useLanguage();
  // 红包信息组
  const { grShowScene, grShowDate, grReceiveDate, grpReceiveNow, grpCheckNow } =
    useWSInstanceStore();
  const { gameList } = useGameConfigStore();
  const location = useLocation();
  const [params] = useSearchParams();
  // 当前时间/定时器/领取时间组
  const [dateNow, setDateNow] = useState<number>(0);
  // 是否展示此浮窗
  const [viewShow, setViewShow] = useState<boolean>(true);
  const { clearTimer } = useSetInterval(() => setDateNow(Date.now()), 1000);

  const receiveDateNow = useMemo<number[]>(
    () => grReceiveDate.map((r) => dateNow - r * 1000),
    [dateNow, grReceiveDate]
  );

  // 提示文字-倒计时
  const tips = useMemo<string>(() => {
    if (receiveDateNow[0] < 0) {
      const temp = new Date(0 - receiveDateNow[0]).toISOString();
      return temp.split('T').pop().split('.').shift() || '';
    }
    return `${formatMsg('openImmediately')}`;
  }, [receiveDateNow, formatMsg]);

  // 领取判断
  const canReceive = useMemo<boolean>(
    () => receiveDateNow[0] > 0 && receiveDateNow[1] < 0,
    [receiveDateNow]
  );

  // 路由信息判断是否展示
  const routeShow = useMemo(() => {
    // 首页路由标识-2
    if (location.pathname === '/home') return grShowScene.includes(-1);
    // 聊天室路由标识-1
    if (location.pathname === '/chatroom') return grShowScene.includes(-2);
    // 经典彩
    if (location.pathname === '/home/classic') {
      const gameId =
        getGameInfo(gameList, params.get('gameId'))?.fieldInfo?.FieldId ||
        '-1000000001';
      return grShowScene.includes(gameId);
    }
    // 其他房间路由标识判断
    const houseId = parseInt(params.get('houseId') || '-1000000001');
    return grShowScene.includes(houseId);
  }, [location.pathname, grShowScene, params, gameList]);

  const timeShow = useMemo(() => {
    const temp = grShowDate.map((r) => r * 1000);
    return temp[0] <= dateNow && dateNow <= temp[1];
  }, [dateNow, grShowDate]);

  // 浮窗展示条件合并
  const isShow = useMemo<boolean>(
    () => viewShow && routeShow && timeShow,
    [viewShow, routeShow, timeShow]
  );

  useEffect(
    () => () => {
      clearTimer();
    },
    [clearTimer]
  );

  const clickImg = useCallback(() => {
    if (tips !== formatMsg('openImmediately')) {
      toastText(`${formatMsg('activityNoOpen')}`);
      return;
    }

    if (!canReceive) {
      toastText(`${formatMsg('activityNoEnd')}`);
      return;
    }
    grpCheckNow((status: CMD_Msg.tagHongBaoUserStatus) => {
      console.log('🚀 ~ file: index.tsx:87 ~ grpCheckNow:', status);
      if (status.bReceiveStatus.value === 1) {
        openHallRedpacket();
        return;
      }
      grpReceiveNow((success: any) => {
        console.log('🚀 ~ file: index.tsx:93 ~ grpReceiveNow:', success);
        toastText(`${formatMsg('BonusMsg2')}`);
        openHallRedpacket();
      });
    });
  }, [tips, canReceive, grpCheckNow, grpReceiveNow, formatMsg]);

  const clickClose = useCallback(() => {
    setViewShow(() => false);
  }, []);

  return (
    <>
      {isShow && (
        <Drag
          className={`${styles['global-reward-drag']}`}
          boundary={{
            top: 50,
            left: 5,
            bottom: 50,
            right: 5,
          }}
        >
          {isShow ? (
            <div className={`${styles['global-reward-view']}`}>
              <Img
                onClick={clickImg}
                isNoTheme
                className={`${styles['global-reward-img']}`}
                src={redPacket}
              />
              <Img
                onClick={clickClose}
                isNoTheme
                className={`${styles['global-reward-close']}`}
                src={closeBtn}
              />
              <div className={`${styles['global-reward-tip']} t-30`}>
                {tips}
              </div>
            </div>
          ) : (
            <div className={`${styles['global-reward-view']}`} />
          )}
        </Drag>
      )}
    </>
  );
};

export default observer(GlobalReward);

