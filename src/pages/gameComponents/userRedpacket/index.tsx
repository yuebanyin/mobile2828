/**
 * ChatMessage 聊天消息组件
 * @param chatType 消息类型
 * @returns
 */
import i18n from 'i18next';
import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './index.module.scss';
import { Obj } from '@/constants';
import redPacketPng from '@/assets/image/common/red-packet.png';
import bigRedpacketPng from '@/assets/image/common/big-red-packet.png';
import openRedpacketPng from '@/assets/image/common/open-redpacket.png';
import redpacketListPng from '@/assets/image/common/redpack-list.png';
import redpacketMorePng from '@/assets/image/common/redpacket-more.png';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { Dialog, Img, Icon, BgImg, Avatar } from '@/components';
import { useWSInstanceStore } from '@/mobx';
import { divide, isArray, formatDate } from '@/utils/tools';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import topRedpacketPng from '@/assets/image/common/top-redpacket.png';
import { useLanguage, useLimitBtn } from '@/hooks';

interface UserRedPacketProps {
  dwHongBaoID: Obj;
  szTitle: Obj;
  wRewardCount: Obj;
  szNickName?: Obj;
  onClick?: Function;
  cbFaceID?: Obj;
  dwGameID?: Obj;
  cFaceUrl?: Obj;
  isTop?: boolean;
}

interface RedpacketBigImgProps {
  ws: CtrlChat;
  param: any;
  onCancel?: Function;
  title?: string;
}

/**
 * RedpacketBigImg 点击小红包弹出的大红包弹窗
 * @param ws ws ws 实例
 * @param param 打开红包的长链参数
 * @param onCancel 全局弹窗的关闭函数
 * @returns 弹窗的主体dom节点
 */
const RedpacketBigImg = observer(
  (
    props: RedpacketBigImgProps &
      Pick<UserRedPacketProps, 'cbFaceID' | 'szNickName' | 'cFaceUrl'>
  ) => {
    const { onCancel, param, ws, cbFaceID, cFaceUrl, szNickName, title } =
      props;
    const { formatMsg } = useLanguage();

    const [isClick, setIsClick] = useState(false);
    const { redpacketData } = useWSInstanceStore();

    useEffect(() => {
      if (redpacketData?.status !== 99) {
        onCancel && onCancel();
      }
    }, [redpacketData?.status, onCancel]);

    return (
      <div className={`m-0-30 p-r ${styles['red-box']}`}>
        <Img
          className={styles['big-redpacket-png']}
          src={bigRedpacketPng}
          isNoTheme
          isImgLayzed={false}
        />
        <div
          className={`p-a left-0 right-0 ${styles['redpacket-avatar-info']}`}
        >
          <div className='d-f ai-c jc-c'>
            <Avatar
              className={styles['avatar']}
              avatorId={cbFaceID?.value}
              avatorUrl={cFaceUrl?.value}
            />
            <div className='wds-sm-title color-white m-0-30'>
              {szNickName?.value}
              {formatMsg('sendRedPacket')}
            </div>
          </div>
          <div className={`${styles['all-score']} wds-h1 ta-c m-t-30`}>
            {title}
          </div>
        </div>
        <Img
          onClick={() => {
            if (isClick) return;
            ws?.userReceiveRedPacket(param);
            setIsClick(true);
          }}
          className={`${
            styles['open-redpacket-png']
          } p-a zi-small w-160 h-160 ${isClick ? 'ani-scaleY' : ''}`}
          src={openRedpacketPng}
          isNoTheme
          isImgLayzed={false}
        />
        <Icon
          onClick={() => {
            onCancel && onCancel();
          }}
          className={`m-t-20 d-b color-white m-0-auto ${styles['red-close']}`}
          name='circle-close'
        />
      </div>
    );
  }
);

// 打开红包领取的弹窗
export const openRedpacketDialog = (
  props: RedpacketBigImgProps &
    Pick<UserRedPacketProps, 'cbFaceID' | 'szNickName' | 'cFaceUrl'>
) => {
  Dialog.confirm({
    isTitle: false,
    isFooter: false,
    btnName: i18n.t('ReceiveRedEnvelope'),
    bodyClassname: styles['body-transpant'],
    children: <RedpacketBigImg {...props} />,
  });
};

interface RedpacketDetailProps {
  dwHongBaoID?: Obj;
  onCancel?: Function;
  id?: number;
  list?: any[];
  clearRedpack?: Function;
  wRewardCount?: Obj;
  ownerScore?: number;
  title?: string;
}

// 红包领取展示
const RedpacketDetail = (
  props: RedpacketDetailProps &
    Pick<
      UserRedPacketProps,
      'cbFaceID' | 'dwGameID' | 'szNickName' | 'cFaceUrl'
    >
) => {
  const { formatMsg } = useLanguage();
  const {
    cbFaceID,
    szNickName,
    cFaceUrl,
    onCancel,
    list,
    wRewardCount,
    ownerScore,
    title,
  } = props;
  console.log(props);
  const { clearRedpack } = useWSInstanceStore();

  // 处理数据找到手气王
  const curList = useMemo(() => {
    if (isArray(list) && list.length) {
      const newList = [];
      if (list.length === 1) {
        list.forEach((it) => {
          newList.push({ ...it, isMax: true });
        });
      } else {
        list.forEach((it) => {
          newList.push({ ...it, isMax: false });
        });
        const maxItem = list.sort(
          (pre, cur) => pre?.lReceiveScore?.value - cur?.lReceiveScore?.value
        )[newList.length - 1];
        newList.forEach((it, i) => {
          if (it?.dwGameID?.value === maxItem?.dwGameID?.value) {
            newList[i].isMax = true;
          }
        });
      }
      return newList;
    }
    return [];
  }, [list]);

  // 红包领取页面关闭
  const handleClose = useCallback(() => {
    onCancel && onCancel();
    clearRedpack && clearRedpack();
  }, [clearRedpack, onCancel]);

  // 获取红包列表单行背景色
  const getItemBg = (index) => {
    // if (isMax) return 'bg-alternate';
    if (index % 2 === 1) return 'bg-int-dark';
    return 'bg-body';
  };

  return (
    <>
      <BgImg
        className={`w-full h-full ${styles['redpacket-list-wrap']} color-white`}
        url={redpacketListPng}
        isNoTheme
      >
        <Icon
          onClick={handleClose}
          name='rect-left'
          className={`color-white wds-con m-0-50 ${styles['redpacket-goback']}`}
        />
        <div className='wds-big-title ta-c'>{title}</div>
        <div className='wds-sm-title ta-c m-42-0-34'>
          {`(${formatMsg('happyOnGrabbing')})`}
        </div>
        <div className='d-f ai-c jc-c'>
          <Avatar
            className={styles['avatar']}
            avatorId={cbFaceID?.value}
            avatorUrl={cFaceUrl?.value}
          />
          <div className='wds-sm-title m-0-30'>
            {szNickName?.value}
            {formatMsg('sendRedPacket')}
          </div>
        </div>
        <div className={`${styles['all-score']} wds-lge-env ta-c m-t-30`}>
          {divide(ownerScore, common.GOLD_RATIO)}
          <span className='wds-sm-title m-0-20'>{formatMsg('yuan')}</span>
        </div>
        <div className='wds-sm-title ta-c m-b-20'>
          {formatMsg('redRecords')}
        </div>
        <div className='bg-incon br-50 br-b-l-0 br-b-r-0 o-none h-full wds-con color-assist'>
          <div className='ta-c m-30-auto'>
            {formatMsg('remainingRed')}（{curList.length}/{wRewardCount?.value}
            ）{formatMsg('individual')}
          </div>
          <div className='o-y'>
            {curList.map((item, i) => (
              <div
                className={`d-f ai-c jc-sb ${
                  styles['redpack-list']
                } ${getItemBg(i)}`}
                key={item?.dwGameID?.value}
              >
                <div className='d-f ai-c'>
                  <Avatar
                    className={styles['avatar']}
                    avatorId={item?.cbFaceID?.value}
                  />
                  <div className='m-l-30'>
                    <div className='color-primary-text wds-con'>
                      {item?.szNickName?.value}
                    </div>
                    <div className='wds-explain-con color-assist m-t-6'>
                      {formatDate(item?.tReceiveDate?.value * 1000, 'Hms')}
                    </div>
                  </div>
                </div>
                <div className='wds-sm-con color-assist'>
                  {formatMsg('grabredEnvelope')}
                </div>
                <div className='d-f fd-c w-260'>
                  <div className='color-red ta-r'>
                    {divide(item?.lReceiveScore?.value, common.GOLD_RATIO)}
                    {formatMsg('yuan')}
                  </div>
                  {item?.isMax && (
                    <div className='color-primary wds-con m-t-16 d-f ai-c jc-end'>
                      <Img
                        className={styles['lager-redpacket-png']}
                        src={redpacketMorePng}
                        isNoTheme
                        isImgLayzed={false}
                      />
                      <span className='m-l-20'>{formatMsg('luckyPlayer')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BgImg>
    </>
  );
};

// 打开红包领取列表的弹窗
const openRedpacketList = (props) => {
  Dialog.confirm({
    isTitle: false,
    isFooter: false,
    bodyClassname: `${styles['redpacket-body']} w-full h-full bg-body o-n`,
    contentCls: 'w-full h-full',
    children: <RedpacketDetail {...props} />,
  });
};

// 用户红包的聊天消息展示
const UserRedPacket = observer((props: UserRedPacketProps) => {
  const { szTitle, onClick, dwHongBaoID, isTop, ...rest } = props;
  const { formatMsg } = useLanguage();
  const { redpacketData, chatws, saveRedpackData } = useWSInstanceStore();
  const { limitBtnFn } = useLimitBtn();

  useEffect(() => {
    // 红包可领取时的弹开弹窗
    if (redpacketData?.id === dwHongBaoID?.value) {
      if (redpacketData?.status === 0) {
        // 红包可领取状态
        openRedpacketDialog({
          ws: chatws,
          param: dwHongBaoID,
          title: szTitle?.value,
          ...rest,
        });
        saveRedpackData('status', 99);
      } else if (redpacketData?.status === 100 && redpacketData?.list) {
        // 打开红包领取列表
        openRedpacketList({
          dwHongBaoID,
          id: redpacketData?.id,
          list: redpacketData?.list,
          ownerScore: redpacketData?.ownerScore,
          title: szTitle?.value,
          ...rest,
        });
        saveRedpackData('status', 101);
      }
    }
  }, [
    chatws,
    dwHongBaoID,
    redpacketData?.status,
    redpacketData?.id,
    redpacketData?.list,
    redpacketData?.ownerScore,
    rest,
    saveRedpackData,
    szTitle?.value,
  ]);

  // 置顶红包
  if (isTop) {
    return (
      <div
        onClick={() =>
          limitBtnFn(
            () => onClick(dwHongBaoID),
            formatMsg('ReceiveRedEnvelope')
          )
        }
        className={`${styles['top-redpacket-item']} wds-con color-red bg-body d-f ai-c jc-sb p-r m-t-10`}
      >
        <Img
          className={`${styles['top-redpacket-img']} p-a`}
          src={topRedpacketPng}
          isNoTheme
        />
        {formatMsg('openRedBag')}
      </div>
    );
  }

  return (
    <span
      onClick={() =>
        limitBtnFn(() => onClick(dwHongBaoID), formatMsg('ReceiveRedEnvelope'))
      }
      className='p-r'
    >
      <div
        className={`${styles['red-packet-title']} p-a ta-c oe color-primary wds-h1`}
      >
        {szTitle?.value}
      </div>
      <Img className={styles['red-packet-img']} src={redPacketPng} isNoTheme />
    </span>
  );
});

export default memo(UserRedPacket);
