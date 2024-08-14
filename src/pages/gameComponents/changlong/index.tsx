/**
 * 长龙组件开发
 */
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, toastText } from '@/components';
import { LongDragonRoute, NetData } from '@/engine/ctrl/NetRoute';
import { ChidrenItem } from './chidrenItem';
import { Obj } from '@/constants';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { CMD_Game } from '@/engine/cmd/game/CMD_Game';
import { CreateObject } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { useGameTimeStore } from '@/mobx';
import { GameMgr } from '@/engine/mgr/mgr';
import { useLanguage } from '@/hooks';

interface ChangLongProps {
  gameWs: any;
  ik: number;
  ref?: any;
}

const perirods = [
  { periods: 2, key: '2' },
  { periods: 3, key: '3' },
  { periods: 6, key: '6' },
  { periods: 8, key: '8' },
  { periods: 10, key: '10' },
  { periods: 12, key: '12' },
];

// const sortType = Object.freeze({
//   1: {
//     text: '按时间',
//     key: '1',
//   },
//   2: {
//     text: '按期数',
//     key: '2',
//   },
// });

export const ChangLong = forwardRef((props: ChangLongProps, ref) => {
  const { t } = useTranslation();
  const { gameWs, ik } = props;
  const { changeBetInfoArr, changeNumKeyArr, filterBetInfo } =
    useChangLongBetStore();
  const { getCurPeridId } = useGameTimeStore();
  const { formatMsg } = useLanguage();
  // 控制期号弹框是否展示
  const [show, setShow] = useState(false);
  // 展示当前选中的期
  const [periods, setPeriods] = useState(perirods[0]?.periods);
  // 筛选条件（时间|期数）
  // const [type, setType] = useState(sortType[1].key);
  // 赔率信息
  const [odds, setOdds] = useState<Obj>({});
  // 区域信息
  const [areaInfo, setAreaInfo] = useState([]);
  // 历史记录
  const [history, sethistory] =
    useState<common.tagSSCChangLongInfoRecord>(null);

  // 区域清除时判断是否有选中的号码
  const delAreaInfo = useCallback(
    (info) => {
      const { wKindID, cbChangLongMainType } = info;
      const betArr = GameMgr.CLSubTypeMap(
        wKindID.value,
        cbChangLongMainType.value,
        null,
        true
      );
      console.log({ betArr }, wKindID.value, cbChangLongMainType.value);
      filterBetInfo(wKindID.value, betArr);
    },
    [filterBetInfo]
  );

  // 数据清空
  const onResetData = useCallback(() => {
    changeBetInfoArr(null);
    changeNumKeyArr([]);
  }, [changeBetInfoArr, changeNumKeyArr]);

  // 长龙网络逻辑 {NetData} msg
  const longDragonNetMessage = useCallback(
    (msg: NetData) => {
      switch (msg.dateType) {
        case LongDragonRoute.areaInfo: {
          console.warn('长龙区域信息', msg.data);
          setAreaInfo((pre) => {
            const newArea = [...pre];
            // 判断是否是初始化
            if (newArea.length === 0) {
              (msg.data as any[]).forEach((it) => {
                if (it?.wKindID?.value !== 2906 && it.wSeriesCount.value >= 2) {
                  newArea.push(it);
                }
              });
            } else {
              // 循环新增的区域信息，判断是否是已有的，已有的替换，没有的新增
              (msg.data as any[]).forEach((it) => {
                if (it?.wKindID?.value !== 2906 && it.wSeriesCount.value >= 2) {
                  const idx = newArea.findIndex(
                    (its) =>
                      its.cbChangLongMainType.value ===
                        it.cbChangLongMainType.value &&
                      its.cbChangLongSubType.value ===
                        it.cbChangLongSubType.value &&
                      its.wKindID.value === it.wKindID.value
                  );
                  if (idx > -1) {
                    newArea.splice(idx, 1, it);
                  } else {
                    newArea.push(it);
                  }
                }
              });
            }
            return newArea;
          });
          break;
        }
        case LongDragonRoute.removeareaInfo: {
          console.warn('长龙移除区域', msg.data);
          delAreaInfo(msg.data);
          setAreaInfo((preArea) => {
            const newArea = [...preArea];
            const idx = newArea.findIndex(
              (it) =>
                it.wKindID?.value === (msg.data as any)?.wKindID?.value &&
                it.cbChangLongMainType?.value ===
                  (msg.data as any)?.cbChangLongMainType?.value
            );
            if (idx > -1) {
              newArea.splice(idx, 1);
            }

            return newArea;
          });
          break;
        }
        case LongDragonRoute.multInfo:
          {
            console.log('长龙赔率信息', msg.data);
            const oddsObj: Obj = {};
            (msg.data as any[]).forEach((o) => {
              oddsObj[
                `${o.wKindID}-${o.cbChangLongMainType}-${o.cbChangLongSubType}`
              ] = o;
            });
            setOdds(oddsObj);
          }
          break;
        case LongDragonRoute.ldRecord:
          console.log('长龙游戏记录:', msg.data);
          sethistory(msg.data as common.tagSSCChangLongInfoRecord);
          break;
        case LongDragonRoute.betInfo:
          console.log('长龙下注信息:', msg.data);
          break;
        case LongDragonRoute.ldClose:
          console.log('长龙游戏关闭:', msg.data);
          onResetData();
          toastText(formatMsg('CL_GAME_CLOSE'));
          break;
        case LongDragonRoute.betSuccess:
          console.log('长龙游戏成功:', msg.data);
          toastText(formatMsg('long-link-1'));
          onResetData();
          break;
        case LongDragonRoute.betFaild:
          console.log('长龙游戏失败:', msg.data);
          onResetData();
          toastText(`${msg.data}`);
          break;
        default:
      }
    },
    [onResetData, formatMsg, delAreaInfo]
  );

  useEffect(() => {
    if (gameWs) {
      gameWs.loginLongDragon();
      gameWs.queryLongDragonBetInfo();
      gameWs.dispatcherDragon(longDragonNetMessage);
    }
  }, [gameWs, longDragonNetMessage]);

  useEffect(() => {
    onResetData();
  }, [ik, onResetData]);

  useEffect(
    () => () => {
      // 组件卸载清空长龙下注信息
      onResetData();
    },
    [onResetData]
  );

  // 按钮点击事件,这里组合以及删除下注信息
  const handleBtnClick = useCallback(
    (info) => {
      const { active, gameId, mainType, odds, subMainType, tOdds, oddID } =
        info;
      console.log({ gameId });
      const numKey = `${gameId}-${mainType}-${subMainType}`;
      const pId = getCurPeridId(gameId, null);

      if (active) {
        // 选中的场景
        changeNumKeyArr((preN) => [...preN, numKey]);
        // 增加长龙下注信息
        changeBetInfoArr((betInfo: CMD_Game.CMD_GR_SSCCL_PlaceBet[]) => {
          if (!betInfo) {
            betInfo = [];
          }
          if (
            betInfo.length &&
            betInfo.find((it) => it.placeBetHead.wKindID.value === gameId)
          ) {
            // 如果已经有该游戏的其他号码
            betInfo.map((it: CMD_Game.CMD_GR_SSCCL_PlaceBet) => {
              if (it.placeBetHead.wKindID.value === gameId) {
                it.tagCommonBetClientHead.wBetCount.value += 1;
                // 注单信息
                const tagCommonBetInfoItem = CreateObject(
                  common.tagCommonBetInfo
                );
                tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType;
                tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = subMainType;
                tagCommonBetInfoItem.dwNormalMultiple.value = odds;
                it.tagCommonBetInfo.push(tagCommonBetInfoItem);
                if (tOdds > 0) {
                  it.tagCommonBetClientHead.wMultipleCount.value += 1;
                  const tagSpecialMultipleItem = CreateObject(
                    common.tagSpecialMultiple
                  );
                  tagSpecialMultipleItem.dwMultiple.value = tOdds;
                  tagSpecialMultipleItem.wBetIndex.value =
                    it.tagCommonBetInfo.length - 1;
                  tagSpecialMultipleItem.wID.value = oddID;
                  it.tagSpecialMultiple.push(tagSpecialMultipleItem);
                }
              }
              return it;
            });
            return betInfo;
          }
          // 没有该游戏的号码
          const clBetInfo = CreateObject(CMD_Game.CMD_GR_SSCCL_PlaceBet);
          clBetInfo.tagCommonBetInfo = [];
          clBetInfo.tagSpecialMultiple = [];
          // 长龙特殊头部
          clBetInfo.placeBetHead.wKindID.value = gameId;
          // 通用头部
          clBetInfo.tagCommonBetClientHead.cPeriodNumber.value = pId;
          clBetInfo.tagCommonBetClientHead.wBetCount.value = 1;
          // 注单信息
          const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);
          tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType;
          tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = subMainType;
          tagCommonBetInfoItem.dwNormalMultiple.value = odds;
          clBetInfo.tagCommonBetInfo.push(tagCommonBetInfoItem);

          // 特殊赔率的处理
          if (tOdds > 0) {
            clBetInfo.tagCommonBetClientHead.wMultipleCount.value = 1;
            const tagSpecialMultipleItem = CreateObject(
              common.tagSpecialMultiple
            );
            tagSpecialMultipleItem.dwMultiple.value = tOdds;
            tagSpecialMultipleItem.wBetIndex.value = 0;
            tagSpecialMultipleItem.wID.value = oddID;
            clBetInfo.tagSpecialMultiple.push(tagSpecialMultipleItem);
          }
          betInfo.push(clBetInfo);
          return betInfo;
        });
      } else {
        // 取消选中的场景
        changeNumKeyArr((preN) => [...preN.filter((n) => n !== numKey)]);
        // 删除mbox 中的下注信息
        changeBetInfoArr((betInfo: CMD_Game.CMD_GR_SSCCL_PlaceBet[]) => {
          if (!betInfo) return null;
          let idx;
          let itemInfo = CreateObject(CMD_Game.CMD_GR_SSCCL_PlaceBet);
          itemInfo.tagCommonBetInfo = [];
          itemInfo.tagSpecialMultiple = [];
          betInfo.forEach((it: CMD_Game.CMD_GR_SSCCL_PlaceBet, i) => {
            if (it.placeBetHead.wKindID.value === gameId) {
              idx = i;
              let index;
              if (it.tagCommonBetClientHead.wBetCount.value > 1) {
                itemInfo.placeBetHead.wKindID.value = gameId;
                itemInfo.tagCommonBetClientHead.cPeriodNumber.value = pId;

                it.tagCommonBetInfo.forEach(
                  (its: common.tagCommonBetInfo, i) => {
                    if (
                      its.AreaInfo.cbBetMainType.value !== mainType ||
                      its.AreaInfo.cbBetSubType.value !== subMainType
                    ) {
                      itemInfo.tagCommonBetInfo.push(its);
                    } else {
                      index = i;
                    }
                  }
                );
                itemInfo.tagCommonBetClientHead.wBetCount.value =
                  itemInfo.tagCommonBetInfo.length;
              } else {
                itemInfo = null;
              }
              if (it.tagCommonBetClientHead.wMultipleCount.value > 1) {
                // 特殊赔率的处理
                it.tagSpecialMultiple.forEach(
                  (item: common.tagSpecialMultiple) => {
                    if (item.wBetIndex.value < index) {
                      itemInfo.tagSpecialMultiple.push(item);
                    } else if (item.wBetIndex.value > index) {
                      item.wBetIndex.value -= 1;
                      itemInfo.tagSpecialMultiple.push(item);
                    }
                  }
                );
                itemInfo.tagCommonBetClientHead.wMultipleCount.value =
                  itemInfo.tagSpecialMultiple.length;
              }
            }
          });
          betInfo.splice(idx, 1);
          if (itemInfo) {
            betInfo.push(itemInfo);
          }
          console.warn({ itemInfo });
          return betInfo.length > 0 ? betInfo : null;
        });
      }
    },
    [changeBetInfoArr, getCurPeridId, changeNumKeyArr]
  );

  // 控制期数弹框展示
  const handlePeriods = (e: any, info?: any) => {
    e.stopPropagation();
    if (info?.periods && info?.periods !== periods) {
      setPeriods(info.periods);
      onResetData();
    }
    setShow((s) => !s);
  };

  // // 排序（期数|时间）
  // const handleSortType = () => {
  //   if (type !== sortType[1].key) {
  //     setType(sortType[1].key);
  //   } else {
  //     setType(sortType[2].key);
  //   }
  // };

  const sendJetton = () => {};

  useImperativeHandle(ref, () => ({
    onResetData,
    sendJetton,
  }));

  return (
    <div className='m-l-30 m-t-30 m-r-20 wds-sm color-con-ass'>
      <div className='ai-c d-f'>
        <div>{t('displayOpen')}</div>
        <div
          className='h-60 d-f ai-c jc-sb m-l-12 m-r-12 p-r br-10 bg-body b-1 bc-split'
          onClick={handlePeriods}
        >
          <div className='w-100 ta-c'>{periods}</div>
          <div className='h-60 o-none b-l-1 bc-split'>
            <Icon name='triangle-down color-primary-text' />
          </div>
          <div
            style={{ display: show ? 'block' : 'none' }}
            className='p-a bg-body top-70 p-t-30 p-b-30 p-l-20 p-r-20 ta-c br-10 zi-large'
          >
            {perirods.map((it) => (
              <div
                onClick={(e) => handlePeriods(e, it)}
                className={`p-l-50 p-r-50 p-t-20 p-b-20 ${
                  periods === it.periods && 'color-primary'
                }`}
                key={it.key}
              >
                {it.periods}
              </div>
            ))}
          </div>
        </div>
        <div>{t('longQueue')}</div>
        {/* <div className='d-f ai-c color-blue m-l-10' onClick={handleSortType}>
          {sortType[type].text}
          <Img className='w-24 h-40' src={arrow} isNoTheme />
        </div> */}
      </div>
      <div className='d-g row-gap-30 m-t-30 o-none'>
        {areaInfo &&
          areaInfo
            .filter((info: any) => info.wSeriesCount.value >= periods)
            .map((it, i) => (
              <ChidrenItem
                handleBtnClick={handleBtnClick}
                oddsObj={odds}
                key={
                  0 ||
                  `${it.cbChangLongMainType.value}-${it.cbChangLongSubType.value}-${it.wKindID.value}-${i}`
                }
                gameWs={gameWs}
                history={history}
                {...it}
              />
            ))}
      </div>
    </div>
  );
});
