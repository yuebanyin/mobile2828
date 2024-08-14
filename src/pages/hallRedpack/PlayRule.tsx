import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Img, Icon, BgImg, Dialog } from '@/components';
import bgPng from '@/assets/image/common/redpacket/bg_002.png';
import contentPng from '@/assets/image/common/redpacket/bg_003.png';
import titleBgPng from '@/assets/image/common/redpacket/bg_005.png';
import styles from './index.module.scss';
import { useGeneralStore, useWSInstanceStore } from '@/mobx';
import { divide } from '@/utils/digit';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { formatTZDate } from '@/utils/dayjs';
import { openHallRedpacket } from '.';
import { useLanguage } from '@/hooks';

const PlayRule = observer(({ onCancel, isFailed }: any) => {
  const { globalRedPacketData } = useWSInstanceStore();
  const { levelList } = useGeneralStore();
  const { formatMsg } = useLanguage();

  console.log({ globalRedPacketData });

  // 参与条件
  const tjArr = useMemo(() => {
    const arr = [];
    if (!globalRedPacketData) {
      return arr;
    }
    if (globalRedPacketData?.lValidBetScore.value !== 0) {
      arr.push(
        `${formatMsg('codingOnTheDay')}${divide(
          globalRedPacketData?.lValidBetScore.value,
          common.GOLD_RATIO
        )}`
      );
    }
    if (globalRedPacketData?.lUserScore.value !== 0) {
      arr.push(
        `${formatMsg('DTaccountOnTheDay')}${divide(
          globalRedPacketData?.lUserScore.value,
          common.GOLD_RATIO
        )}`
      );
    }
    if (globalRedPacketData?.lPayScore.value !== 0) {
      arr.push(
        `${formatMsg('rechargeOnTheDay')}${divide(
          globalRedPacketData?.lPayScore.value,
          1
        )}`
      );
    }
    if (globalRedPacketData?.cbGameLevel.value !== 0) {
      arr.push(
        `${formatMsg('levelOnTheDay')}${
          levelList.find(
            (it) => it.Value === globalRedPacketData?.cbGameLevel.value
          )?.Key
        }`
      );
    }
    return arr;
  }, [globalRedPacketData, levelList, formatMsg]);

  const timerange = useMemo(() => {
    if (
      !globalRedPacketData?.stReceiveStartDate?.value ||
      !globalRedPacketData?.stReceiveEndDate?.value
    ) {
      return '';
    }
    return `${formatMsg('EastEighthDistrictTime')}
    ${formatTZDate(
      globalRedPacketData?.stReceiveStartDate?.value,
      'PRC',
      '_YMDHms'
    )}
    ${formatMsg('zhi')}
    ${formatTZDate(
      globalRedPacketData?.stReceiveEndDate?.value,
      'PRC',
      '_YMDHms'
    )}`;
  }, [
    globalRedPacketData?.stReceiveEndDate?.value,
    globalRedPacketData?.stReceiveStartDate?.value,
    formatMsg,
  ]);

  const goBack = useCallback(() => {
    if (isFailed) {
      onCancel && onCancel();
    } else {
      openHallRedpacket();
      setTimeout(() => {
        onCancel && onCancel();
      }, 10);
    }
  }, [isFailed, onCancel]);

  return (
    <BgImg
      url={bgPng}
      isNoTheme
      className={`p-r w-full h-full o-none ${styles['hall-redpacket']}`}
    >
      <div className='h-150 d-f ai-c m-0-30'>
        <Icon onClick={goBack} className={styles['goback']} name='rect-left' />
      </div>
      <div
        className={`m-l-50 m-r-50 zi-mini bg-body br-30 p-50 ${styles['content']}`}
      >
        <div className='ta-c wds-h1 p-b-50'>{formatMsg('ActivityRules')}</div>
        <div className='m-b-40'>
          <div className='d-f p-10-0 wds-con'>
            <div>
              <BgImg
                url={titleBgPng}
                isNoTheme
                className={`m-r-40 ${styles['title-item']}`}
              >
                {formatMsg('ActivityTime')}
              </BgImg>
            </div>
            <div className='flex-1'>{timerange}</div>
          </div>
          <div className='d-f wds-con'>
            <div>
              <BgImg
                url={titleBgPng}
                isNoTheme
                className={`m-r-40 ${styles['title-item']}`}
              >
                {formatMsg('conditionsOfParticipation')}
              </BgImg>
            </div>
            <div className='flex-1  wds-con'>
              {tjArr.map((it, i) => (
                <div className='m-t-10' key={i || it}>
                  {it}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Img src={contentPng} isNoTheme />
      </div>
    </BgImg>
  );
});

// 打开弹窗
export const openHallRedpacketRule = (isFailed?: boolean) => {
  Dialog.confirm({
    isFooter: false,
    isTitle: false,
    bodyClassname: `${styles['redpacket-body']} w-full h-full`,
    contentCls: 'w-full h-full',
    children: <PlayRule isFailed={isFailed} />,
  });
};
