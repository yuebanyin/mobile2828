/**
 * GameChatMessage 游戏聊天消息组件
 * @param chatType 消息类型
 * @returns
 */
import { memo, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Img, Dialog } from '@/components';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
import styles from './index.module.scss';
import {
  isArray,
  omit,
  divide,
  formatDigit,
  noFormatDigit,
  formatNumber,
} from '@/utils/tools';
import { Obj } from '@/constants';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { GameMgr } from '@/engine/mgr/mgr';
import BetDialogCard from '../betDialogCard';
import AvatarShow from '../chatMsgAvatar';
import ChatMsgText from '../chatMsgText';
// import { CtrlChat } from '@/engine/ctrl/CtrlChat';
// import { GameName } from '../gameName';
import UserRedPacket from '../userRedpacket';
import { SystemDate, SystemMsg } from '../systemTip';
import { CreateObject, CreateArray } from '@/engine/base/basetype';
import { useGameConfigStore } from '@/mobx';
import { useLanguage } from '@/hooks';

interface GameChatMessageProps {
  data: {
    recordType: CMD_Chat.emCRSRecordType | 99 | 88 | 89;
    szPeriodNumber: string;
    [key: string]: any;
  };
  onClick?: Function;
  curGameId: number;
  roomInfo: Obj;
  srcollBottoms?: Function;
}

interface BettingProps extends Omit<GameChatMessageProps, 'data'> {
  tagCommonBetInfo?: common.tagCommonBetInfo[];
  isOwner?: boolean;
  szPeriodNumber?: string;
  tagSpecialMultiple?: common.tagSpecialMultiple[];
}
/**
 * Betting 处理聊天消息用户投注
 */
const Betting = observer((props: BettingProps) => {
  const {
    tagCommonBetInfo,
    tagSpecialMultiple,
    isOwner,
    curGameId,
    szPeriodNumber,
    onClick,
  } = props;

  const { moveOdds } = useGameConfigStore();
  const { formatMsg } = useLanguage();

  const totalValue = useMemo(() => {
    let tv = 0;
    if (isArray(tagCommonBetInfo)) {
      tagCommonBetInfo.forEach((it) => {
        if (it.lBetScore.value > 0) {
          tv += it.lBetScore.value / common.GOLD_RATIO;
        }
      });
    }
    return formatDigit(tv);
  }, [tagCommonBetInfo]);

  // 打开跟注的弹窗
  const openBetDetail = () => {
    // 深拷贝注单数据
    const newTagCommonBetInfo = CreateArray(
      common.tagCommonBetInfo,
      [common.LEN_SSC_BET_COUNT],
      0,
      true
    );
    // 深拷贝特殊赔率数据
    let tagDynamicMultiple = CreateArray(
      common.tagDynamicMultiple,
      [common.LEN_SSC_BET_COUNT],
      0,
      true
    );
    tagDynamicMultiple = [];
    const placeBetInfo = CreateObject(common.CMD_C_PlaceBet);
    placeBetInfo.placeBetHead.cPeriodNumber.value = szPeriodNumber;
    const nameMapKey: Obj = {};

    if (isArray(tagSpecialMultiple) && tagSpecialMultiple.length > 0) {
      // 复制特殊赔率
      tagSpecialMultiple.forEach((it) => {
        const tagDynamicMultipleItem = CreateObject(common.tagDynamicMultiple);
        tagDynamicMultipleItem.AreaInfo.cbBetMainType.value =
          tagCommonBetInfo[it.wBetIndex.value].AreaInfo.cbBetMainType.value;
        tagDynamicMultipleItem.AreaInfo.cbBetSubType.value =
          tagCommonBetInfo[it.wBetIndex.value].AreaInfo.cbBetSubType.value;
        tagDynamicMultipleItem.AreaInfo.cbNumber = [
          ...tagCommonBetInfo[it.wBetIndex.value].AreaInfo.cbNumber,
        ];
        tagDynamicMultipleItem.dwMultiple.value = it.dwMultiple.value;
        tagDynamicMultipleItem.wMultipleID.value = it.wID.value;
        tagDynamicMultiple.push(tagDynamicMultipleItem);
      });
    }

    // 常规赔率的动态赔率
    const oddsObj: Obj = {};

    if (isArray(moveOdds?.get(szPeriodNumber))) {
      moveOdds
        ?.get(szPeriodNumber)
        .forEach((its: common.tagDynamicMultiple) => {
          if (GameMgr.IsSpecialOdds(curGameId, its.wMultipleID.value)) {
            // 动态赔率中的特殊赔率
            tagDynamicMultiple.forEach((it) => {
              if (it.wMultipleID.value === its.wMultipleID.value) {
                it.dwMultiple.value = its.dwMultiple.value;
              }
            });
          } else {
            // 动态赔率中的常规赔率
            const codeName = GameMgr.GetBetRecordDesc(
              curGameId,
              its.AreaInfo.cbBetMainType.value,
              its.AreaInfo.cbBetSubType.value,
              its.AreaInfo.cbNumber
            );
            oddsObj[codeName] = its.dwMultiple.value;
          }
        });
    }
    if (isArray(tagCommonBetInfo)) {
      tagCommonBetInfo.forEach((it, i) => {
        const codeName = GameMgr.GetBetRecordDesc(
          curGameId,
          it.AreaInfo.cbBetMainType.value,
          it.AreaInfo.cbBetSubType.value,
          it.AreaInfo.cbNumber
        );
        nameMapKey[codeName] = i;
        newTagCommonBetInfo[i] = CreateObject(common.tagCommonBetInfo);
        newTagCommonBetInfo[i].AreaInfo.cbBetMainType.value =
          it.AreaInfo.cbBetMainType.value;
        newTagCommonBetInfo[i].AreaInfo.cbBetSubType.value =
          it.AreaInfo.cbBetSubType.value;
        newTagCommonBetInfo[i].AreaInfo.cbNumber = [...it.AreaInfo.cbNumber];
        newTagCommonBetInfo[i].dwNormalMultiple.value =
          oddsObj[codeName] || it.dwNormalMultiple.value;
        newTagCommonBetInfo[i].lBetScore.value = it.lBetScore.value;
      });
    }
    Dialog.confirm({
      isTitle: false,
      onlyConfirm: false,
      onOk: () => {
        placeBetInfo.tagCommonBetInfo = newTagCommonBetInfo;
        placeBetInfo.placeBetHead.wBetCount.value = newTagCommonBetInfo.length;
        placeBetInfo.placeBetHead.wMultipleCount.value =
          tagDynamicMultiple.length;
        if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length) {
          const newTagSpecialMultiple = CreateArray(
            common.tagSpecialMultiple,
            [common.LEN_SSC_BET_COUNT],
            0,
            true
          );
          tagDynamicMultiple.forEach((it, i) => {
            const ocodeName = GameMgr.GetBetRecordDesc(
              curGameId,
              it.AreaInfo.cbBetMainType.value,
              it.AreaInfo.cbBetSubType.value,
              it.AreaInfo.cbNumber
            );
            newTagSpecialMultiple[i] = CreateObject(common.tagSpecialMultiple);
            newTagSpecialMultiple[i].dwMultiple.value = it.dwMultiple.value;
            newTagSpecialMultiple[i].wID.value = it.wMultipleID.value;
            newTagSpecialMultiple[i].wBetIndex.value = nameMapKey[ocodeName];
          });
          placeBetInfo.tagSpecialMultiple = newTagSpecialMultiple;
        } else {
          placeBetInfo.tagSpecialMultiple = [];
        }
        onClick(placeBetInfo);
      },
      children: (
        <BetDialogCard
          cPeriodNumber={{ value: szPeriodNumber } as any}
          tagCommonBetInfo={newTagCommonBetInfo}
          tagDynamicMultiple={tagDynamicMultiple}
          wKindID={{ value: curGameId }}
        />
      ),
    });
  };

  return (
    <div className={`bg-body o-none ${styles['betting-wrap']}`}>
      <div
        className={`betting-title d-f ai-c jc-sb color-white p-20-30 ${
          isOwner ? 'bg-gdt-title' : 'bg-gdt-top'
        }`}
      >
        <div>
          {szPeriodNumber}
          {formatMsg('qi')}
        </div>
        {!isOwner && (
          <Button
            onClick={openBetDetail}
            className={`wds-sm-con flex-init ${styles['bet-icon-btn']}`}
            type='hollow-pri'
            size='h-d-nol'
          >
            <div className={`${styles['bet-icon']} m-r-10`}>
              <div>✔</div>
            </div>
            {formatMsg('followingTou')}
          </Button>
        )}
      </div>
      <div className='p-10-30'>
        {isArray(tagCommonBetInfo) &&
          tagCommonBetInfo.map((it, i) => {
            const codeName = GameMgr.GetBetRecordDesc(
              curGameId,
              it.AreaInfo.cbBetMainType.value,
              it.AreaInfo.cbBetSubType.value,
              it.AreaInfo.cbNumber
            );
            const [main, sub] = codeName.split('&');
            const name = `${formatMsg(main)}-${formatMsg(sub)}`;
            const tsm = tagSpecialMultiple.filter(
              (its) => its.wBetIndex.value === i
            );
            return (
              <div
                key={codeName}
                className='wds-sm-con d-f ai-c jc-sb p-20-0 b-b-1 bc-split'
              >
                <div className='color-primary-text'>{name}</div>
                <div className='d-f ai-c jc-end'>
                  <div className='color-red'>
                    {it.dwNormalMultiple.value
                      ? formatNumber(
                          noFormatDigit(
                            divide(
                              it.dwNormalMultiple.value,
                              common.GOLD_RATIO,
                              3
                            )
                          )
                        )
                      : ''}
                    {curGameId === 2903 &&
                      tsm.length > 0 &&
                      tsm.map((its, index) => (
                        <span key={0 || index}>
                          /
                          {formatNumber(
                            noFormatDigit(
                              divide(its.dwMultiple.value, common.GOLD_RATIO, 3)
                            )
                          )}
                        </span>
                      ))}
                  </div>
                  {it.dwNormalMultiple.value || tsm.length > 0 ? (
                    <span className='m-0-10'>x</span>
                  ) : (
                    ''
                  )}
                  <div className='color-primary'>
                    ￥
                    {formatNumber(
                      noFormatDigit(
                        divide(it.lBetScore.value, common.GOLD_RATIO)
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        <div className='d-f ai-c jc-end m-16-0'>
          <div>
            {formatMsg('beted')}
            <span className='m-0-10 color-red'>
              {isArray(tagCommonBetInfo) && tagCommonBetInfo.length}
            </span>
            {formatMsg('totalAll')}:
            <span className='color-red'>
              ￥{formatNumber(noFormatDigit(totalValue))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * AdminText 管理员消息
 */
const AdminText = memo(
  (
    props: Omit<CMD_Chat.CMD_CRS_S_ManagerMessage, 'UserInfo'> & {
      isOwner?: boolean;
    }
  ) => {
    const { isOwner, cImgMsgUrl, szText } = props;
    return (
      <div
        className={`wds-con br-30 p-30 ${
          isOwner ? 'bg-primary br-t-r-0' : 'bg-body br-t-l-0'
        }`}
      >
        {cImgMsgUrl?.value && (
          <Img className='m-b-30 ' src={cImgMsgUrl.value} isNoTheme />
        )}
        {szText?.value}
      </div>
    );
  }
);

export const GameChatMessage = memo((props: GameChatMessageProps) => {
  const { data, onClick, curGameId, roomInfo, srcollBottoms } = props;

  switch (data.recordType) {
    case CMD_Chat.emCRSRecordType.CRSRT_MANAGER_MSG: // 管理员消息
      return (
        <AvatarShow
          srcollBottoms={srcollBottoms}
          cFaceUrl={data?.data?.cFaceUrl}
          szNickName={data?.data?.szNickName}
        >
          <AdminText
            {...(omit(data?.data, [
              'cFaceUrl',
              'szNickName',
            ]) as CMD_Chat.CMD_CRS_S_ManagerMessage & {
              size: any;
              readBuffer: any;
              writeBuffer: any;
            })}
          />
        </AvatarShow>
      );
    case CMD_Chat.emCRSRecordType.CRSRT_SYS_HB: // 系统红包
      return (
        <AvatarShow
          UserInfo={
            {
              cbFaceID: { value: 11 },
              dwGameID: data?.data?.dwGameID,
              szNickName: data?.data?.BaseInfo?.szNickName,
            } as any
          }
        >
          <UserRedPacket
            cFaceUrl={data?.data?.cFaceUrl}
            cbFaceID={{ value: 11 }}
            dwGameID={data?.data?.dwGameID}
            szNickName={data?.data?.BaseInfo?.szNickName}
            onClick={onClick}
            {...data?.data?.BaseInfo}
          />
        </AvatarShow>
      );
    case CMD_Chat.emCRSRecordType.CRSRT_USER_CHAT: // 用户聊天（文字以及表情包）
      return (
        <AvatarShow
          srcollBottoms={srcollBottoms}
          UserInfo={data?.data?.UserInfo}
        >
          <ChatMsgText
            {...(omit(data?.data, [
              'recordType',
              'UserInfo',
            ]) as CMD_Chat.CMD_CRS_S_UserChat & {
              size: any;
              readBuffer: any;
              writeBuffer: any;
            })}
          />
        </AvatarShow>
      );
    case CMD_Chat.emCRSRecordType.CRSRT_USER_HB: // 用户红包
      return (
        <AvatarShow
          UserInfo={
            {
              cbFaceID: data?.data?.cbFaceID,
              dwGameID: data?.data?.dwGameID,
              szNickName: data?.data?.BaseInfo?.szNickName,
            } as any
          }
        >
          <UserRedPacket
            cFaceUrl={data?.data?.cFaceUrl}
            cbFaceID={data?.data?.cbFaceID}
            dwGameID={data?.data?.dwGameID}
            szNickName={data?.data?.BaseInfo?.szNickName}
            onClick={onClick}
            {...data?.data?.BaseInfo}
          />
        </AvatarShow>
      );
    case 99: // 投注
      return (
        <AvatarShow srcollBottoms={srcollBottoms} UserInfo={data?.placeBetHead}>
          <Betting
            onClick={onClick}
            curGameId={curGameId}
            roomInfo={roomInfo}
            {...omit(data, ['recordType'])}
          />
        </AvatarShow>
      );
    case 89:
      return <SystemDate text={data?.text} tipKey={data?.tipKey} />;
    case 88: // 系统消息
      return (
        <SystemMsg
          srcollBottoms={srcollBottoms}
          text={data?.text}
          tipKey={data?.tipKey}
          title={data?.title}
          period={data?.period}
        />
      );
    default:
      return <></>;
  }
});
