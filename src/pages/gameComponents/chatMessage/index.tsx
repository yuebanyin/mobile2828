/**
 * ChatMessage 聊天消息组件
 * @param chatType 消息类型
 * @returns
 */
import { memo, useEffect, useMemo, useRef } from 'react';
import { Button, Img, Dialog } from '@/components';
import { CMD_Chat } from '@/engine/cmd/chat/CMD_Chat';
import styles from './index.module.scss';
import {
  isArray,
  omit,
  divide,
  formatDigit,
  isNoEmpty,
  noFormatDigit,
  formatNumber,
} from '@/utils/tools';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { GameMgr } from '@/engine/mgr/mgr';
import BetDialogCard from '../betDialogCard';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { GameName } from '../gameName';
import AvatarShow from '../chatMsgAvatar';
import ChatMsgText from '../chatMsgText';
import UserRedPacket from '../userRedpacket';
import { useLanguage, useLimitBtn } from '@/hooks';
import { CreateObject, CreateArray } from '@/engine/base/basetype';
import { Obj } from '@/constants';

interface ChatMessageProps {
  wsExample: CtrlChat;
  odds: common.tagDynamicMultiple[];
  setOdds: Function;
  data: {
    recordType: CMD_Chat.emCRSRecordType | 99;
    [key: string]: any;
  };
  onClick?: Function;
  srcollBottoms?: Function;
}

/**
 * Betting 处理聊天消息用户投注
 */
const Betting = memo(
  (
    props: CMD_Chat.CMD_CRS_S_PlaceBetInfo & {
      isOwner?: boolean;
      onClick?: Function;
      wsExample: CtrlChat;
      odds: common.tagDynamicMultiple[];
      setOdds: Function;
    }
  ) => {
    const {
      placeBetHead,
      tagCommonBetInfo,
      isOwner,
      onClick,
      wsExample,
      odds,
      setOdds,
      tagSpecialMultiple,
    } = props;
    const { wKindID, cPeriodNumber, wServerID } = placeBetHead || {};
    const isOpenRef = useRef<boolean>(false);
    const { limitBtnFn } = useLimitBtn();
    const { formatMsg } = useLanguage();

    useEffect(() => {
      // 监听最新赔率获取
      if (isArray(odds) && isNoEmpty(odds) && isOpenRef.current) {
        isOpenRef.current = false;
        const placeBetInfo = new CMD_Chat.CMD_CRS_C_PlaceBet();
        placeBetInfo.placeBetHead.wKindID.value = wKindID.value;
        placeBetInfo.placeBetHead.wServerID.value = wServerID.value;
        placeBetInfo.tagSpecialMultiple = [];
        // 深拷贝数据
        const newUserBetInfo = CreateArray(
          common.tagCommonBetInfo,
          [common.LEN_SSC_BET_COUNT],
          0,
          true
        );
        let tagDynamicMultiple = CreateArray(
          common.tagDynamicMultiple,
          [common.LEN_SSC_BET_COUNT],
          0,
          true
        );
        tagDynamicMultiple = [];
        const nameMapKey: Obj = {};
        const dnmMapName: Obj = {};
        // 处理最新赔率数据结构转换为对象
        odds.forEach((it) => {
          if (GameMgr.IsSpecialOdds(wKindID.value, it.wMultipleID.value)) {
            // 自己要下注的特殊赔率
            const tagDynamicMultipleItem = CreateObject(
              common.tagDynamicMultiple
            );
            tagDynamicMultipleItem.AreaInfo = CreateObject(
              common.tagCommonAreaInfo
            );
            tagDynamicMultipleItem.AreaInfo.cbBetMainType.value =
              it.AreaInfo.cbBetMainType.value;
            tagDynamicMultipleItem.AreaInfo.cbBetSubType.value =
              it.AreaInfo.cbBetSubType.value;
            tagDynamicMultipleItem.AreaInfo.cbNumber = [
              ...it.AreaInfo.cbNumber,
            ];
            tagDynamicMultipleItem.dwMultiple.value = it.dwMultiple.value;
            tagDynamicMultipleItem.wMultipleID.value = it.wMultipleID.value;
            tagDynamicMultiple.push(tagDynamicMultipleItem);
          } else {
            const codeName = GameMgr.GetBetRecordDesc(
              wKindID?.value,
              it.AreaInfo.cbBetMainType.value,
              it.AreaInfo.cbBetSubType.value,
              it.AreaInfo.cbNumber
            );
            dnmMapName[codeName] = it.dwMultiple.value;
          }
        });
        if (isArray(tagCommonBetInfo)) {
          tagCommonBetInfo.forEach((it, i) => {
            const codeName = GameMgr.GetBetRecordDesc(
              wKindID?.value,
              it.AreaInfo.cbBetMainType.value,
              it.AreaInfo.cbBetSubType.value,
              it.AreaInfo.cbNumber
            );
            nameMapKey[codeName] = i;
            newUserBetInfo[i] = CreateObject(common.tagCommonBetInfo);
            newUserBetInfo[i].AreaInfo.cbBetMainType.value =
              it.AreaInfo.cbBetMainType.value;
            newUserBetInfo[i].AreaInfo.cbBetSubType.value =
              it.AreaInfo.cbBetSubType.value;
            newUserBetInfo[i].AreaInfo.cbNumber = [...it.AreaInfo.cbNumber];
            newUserBetInfo[i].dwNormalMultiple.value =
              typeof dnmMapName[codeName] === 'number'
                ? dnmMapName[codeName]
                : it.dwNormalMultiple.value;
            newUserBetInfo[i].lBetScore.value = it.lBetScore.value;
          });
          placeBetInfo.tagCommonBetInfo = newUserBetInfo;
        }
        placeBetInfo.tagCommonBetClientHead.cPeriodNumber.value =
          cPeriodNumber.value;
        placeBetInfo.tagCommonBetClientHead.wBetCount.value =
          tagCommonBetInfo.length;
        Dialog.confirm({
          isTitle: false,
          onlyConfirm: false,
          onClose: () => {
            isOpenRef.current = false;
            setOdds(null);
          },
          onOk: () => {
            if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length > 0) {
              placeBetInfo.tagCommonBetClientHead.wMultipleCount.value =
                tagDynamicMultiple.length;
              const newTagSpecialMultiple = CreateArray(
                common.tagSpecialMultiple,
                [common.LEN_SSC_BET_COUNT],
                0,
                true
              );
              tagDynamicMultiple.forEach((it, i) => {
                const ocodeName = GameMgr.GetBetRecordDesc(
                  wKindID?.value,
                  it.AreaInfo.cbBetMainType.value,
                  it.AreaInfo.cbBetSubType.value,
                  it.AreaInfo.cbNumber
                );
                newTagSpecialMultiple[i] = CreateObject(
                  common.tagSpecialMultiple
                );
                newTagSpecialMultiple[i].dwMultiple.value = it.dwMultiple.value;
                newTagSpecialMultiple[i].wID.value = it.wMultipleID.value;
                newTagSpecialMultiple[i].wBetIndex.value =
                  nameMapKey[ocodeName];
              });
              placeBetInfo.tagSpecialMultiple = newTagSpecialMultiple;
            }
            console.log({ placeBetInfo });
            placeBetInfo.tagCommonBetClientHead.wBetCount.value =
              placeBetInfo.tagCommonBetInfo.length;
            onClick(placeBetInfo);
            isOpenRef.current = false;
            setOdds(null);
          },
          children: (
            <BetDialogCard
              cPeriodNumber={cPeriodNumber}
              tagCommonBetInfo={newUserBetInfo}
              tagDynamicMultiple={tagDynamicMultiple}
              wKindID={wKindID}
            />
          ),
        });
      } else {
        setOdds(null);
        isOpenRef.current = false;
      }
      // 组件销毁回收最新赔率数据
      () => {
        setOdds(null);
        isOpenRef.current = false;
      };
    }, [
      cPeriodNumber,
      odds,
      onClick,
      placeBetHead,
      setOdds,
      tagCommonBetInfo,
      tagSpecialMultiple,
      wKindID,
      wServerID.value,
    ]);

    // 获取总金额
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
      limitBtnFn(() => {
        // 获取赔率
        const queryMeultInfo = new CMD_Chat.CMD_CRS_C_QueryMultInfo();
        queryMeultInfo.wKindID.value = wKindID.value;
        queryMeultInfo.wServerID.value = wServerID.value;
        queryMeultInfo.cPeriodNumber.value = cPeriodNumber.value;
        tagCommonBetInfo.forEach((it, i) => {
          if (it.lBetScore.value > 0) {
            queryMeultInfo.tagCommonAreaInfo[i] = CreateObject(
              common.tagCommonAreaInfo
            );
            queryMeultInfo.tagCommonAreaInfo[i].cbBetMainType.value =
              it.AreaInfo.cbBetMainType.value;
            queryMeultInfo.tagCommonAreaInfo[i].cbBetSubType.value =
              it.AreaInfo.cbBetSubType.value;
            queryMeultInfo.tagCommonAreaInfo[i].cbNumber = [
              ...it.AreaInfo.cbNumber,
            ];
          }
        });
        console.log({ tagCommonBetInfo, queryMeultInfo });
        // 发送消息获取最新赔率
        wsExample.queryMeultInfo(queryMeultInfo);
        // 标识符设置为true
        isOpenRef.current = true;
      }, `${formatMsg('followingNote')}`);
    };

    return (
      <div className={`bg-body o-none ${styles['betting-wrap']}`}>
        <div
          className={`betting-title d-f ai-c jc-sb color-white  p-20-30 ${
            isOwner ? 'bg-gdt-title' : 'bg-gdt-top'
          }`}
        >
          <GameName gameId={wKindID?.value} />
          <div>
            {cPeriodNumber.value}
            {formatMsg('qi')}
          </div>
        </div>
        <div className='p-10-30'>
          {isArray(tagCommonBetInfo) &&
            tagCommonBetInfo.map((it, i) => {
              const codeName = GameMgr.GetBetRecordDesc(
                wKindID?.value,
                it.AreaInfo.cbBetMainType.value,
                it.AreaInfo.cbBetSubType.value,
                it.AreaInfo.cbNumber
              );
              const [main, sub] = codeName.split('&');
              const name = `${formatMsg(main)}-${formatMsg(sub)}`;
              const smArr = tagSpecialMultiple.filter(
                (it) => (it?.wBetIndex as unknown as number) === i
              );
              return (
                <div
                  key={`${codeName + i}`}
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
                      {wKindID?.value === 2903 &&
                        smArr.length > 0 &&
                        smArr.map((it, i) => (
                          <span key={`${i + 1}`}>
                            /
                            {formatNumber(
                              noFormatDigit(
                                divide(
                                  it.dwMultiple.value,
                                  common.GOLD_RATIO,
                                  3
                                )
                              )
                            )}
                          </span>
                        ))}
                    </div>
                    {it.dwNormalMultiple.value || smArr.length > 0 ? (
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

          <div className='d-f ai-c jc-sb m-16-0'>
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
            {!isOwner && (
              <Button
                onClick={openBetDetail}
                className='wds-sm-con w-154 flex-init'
                type='hollow-pri'
                size='h-d-nol'
              >
                {formatMsg('followingTou')}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

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
        className={`wds-con br-30 p-30 o-none ${
          isOwner ? 'bg-primary br-t-r-0' : 'bg-body br-t-l-0'
        }`}
      >
        {cImgMsgUrl?.value && (
          <Img className='m-b-30' src={cImgMsgUrl.value} isNoTheme />
        )}
        {szText?.value}
      </div>
    );
  }
);

export const ChatMessage = memo((props: ChatMessageProps) => {
  const { data, onClick, wsExample, odds, setOdds, srcollBottoms } = props;

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
          srcollBottoms={srcollBottoms}
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
          srcollBottoms={srcollBottoms}
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
        <AvatarShow
          srcollBottoms={srcollBottoms}
          UserInfo={data?.placeBetHead?.UserInfo}
        >
          <Betting
            odds={odds}
            setOdds={setOdds}
            wsExample={wsExample}
            onClick={onClick}
            {...(omit(data, [
              'recordType',
            ]) as CMD_Chat.CMD_CRS_S_PlaceBetInfo & {
              size: any;
              readBuffer: any;
              writeBuffer: any;
            })}
          />
        </AvatarShow>
      );
    default:
      return <></>;
  }
});
