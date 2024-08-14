import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
 Img, Icon, BgImg, Dialog 
} from '@/components';
import bgPng from '@/assets/image/common/redpacket/bg_001.png';
import redpacketPng from '@/assets/image/common/redpacket/bg_006.png';
import recordBthPng from '@/assets/image/common/redpacket/btn_hbjl.png';
import playRuleBtn from '@/assets/image/common/redpacket/btn_guiz.png';
import styles from './index.module.scss';
import { useGlobalStore, useWSInstanceStore } from '@/mobx';
import { divide } from '@/utils/digit';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { openHallRedpacketRule } from './PlayRule';

const HallRedpack = observer(({ onCancel }: any) => {
  const { globalRedPacketState, globalRedPacketSuccess } = useWSInstanceStore();
  const { navigation } = useGlobalStore();

  console.log({ globalRedPacketState, globalRedPacketSuccess });

  // 计算金额
  const score = useMemo(() => {
    if (!globalRedPacketState) {
      return '0.00';
    }
    if (globalRedPacketState?.bReceiveStatus?.value === 0) {
      // 未领取
      return divide(globalRedPacketSuccess?.value, common.GOLD_RATIO);
    }
    // 已领取
    return divide(globalRedPacketState?.lRewardScore?.value, common.GOLD_RATIO);
  }, [globalRedPacketState, globalRedPacketSuccess]);

  const goBack = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const goPlayRule = useCallback(() => {
    openHallRedpacketRule();
    setTimeout(() => {
      onCancel && onCancel();
    }, 10);
  }, [onCancel]);

  const goRedpacketHistory = useCallback(() => {
    navigation('/mine/reward');
    onCancel && onCancel();
  }, [navigation, onCancel]);

  return (
    <BgImg url={bgPng} isNoTheme className={`p-r w-full h-full o-none ${styles['hall-redpacket']}`}>
      <div className='h-150 d-f ai-c m-l-30 jc-sb'>
        <Icon onClick={goBack} className={`${styles['goback']}`} name='rect-left' />
        <div className='h-150' />
        <Img onClick={goPlayRule} className={styles['play-rule-bth']} src={playRuleBtn} isNoTheme />
      </div>
      <div className='p-r'>
        <Img className={`${styles['redpack-bg']} w-full`} src={redpacketPng} isNoTheme />
        <div className={`w-full p-a zi-mini ${styles['redpacket-score-box']}`}>
          <div className={`${styles['redpacket-score']} m-0-auto ta-c font-w-bolder`}>{score}</div>
        </div>
        <div className={`w-full p-a zi-mini ${styles['record-bth-box']}`}>
          <Img onClick={goRedpacketHistory} className={`${styles['record-bth']} m-0-auto`} src={recordBthPng} isNoTheme />
        </div>
      </div>
    </BgImg>
  );
});

// 打开弹窗
export const openHallRedpacket = () => {
  Dialog.confirm({
    isFooter: false,
    isTitle: false,
    bodyClassname: `${styles['redpacket-body']} w-full h-full`,
    contentCls: 'w-full h-full',
    children: <HallRedpack />,
  });
};
