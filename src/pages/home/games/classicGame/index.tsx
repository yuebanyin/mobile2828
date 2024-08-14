import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGameConfigStore } from '@/mobx';
import { ClassicsTop } from '@/pages/gameComponents/classicsTop';
import ContentBox from './ContentBox';
import { useWsGameChat } from '@/hooks';
import CountTimeS from '../countTimes';
import { BYTE, CreateArray, CreateObject } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { Obj, defaultAmount } from '@/constants';
import { divide, isArray, isNoEmpty, multiply, numSort } from '@/utils/tools';
import {
  handleHXBetInfo,
  getGameMcom,
  handleLianBetInfo,
  saveWSLOdds,
} from '@/utils/game';
import { GameMgr } from '@/engine/mgr/mgr';
import { BetInput } from '@/pages/gameComponents/betInput';
import { getGameConfigInfo, getGameSubTypeMap } from '../../pc28Games';
import { specialNumList } from './constFiles/constCommon';
import { useChangLongBetStore } from '@/mobx/changLongBet';

const ClassicGame = () => {
  const { gameList, gameWsUrl } = useGameConfigStore();

  // 连接ws 实例
  const { gameWs, clear, curGameId, gameRecords, lastPeriod, gameScen, clcc } =
    useWsGameChat({
      isOnlyChatRoom: false,
      gameList,
      gameWsUrl,
    });

  // 长龙组件实例
  const clRef = useRef(null);

  // 动态赔率
  const { moveOdds, initOdds } = useGameConfigStore();

  // 记录用户选中号码的key 该key写在了长龙的mobx中
  const { changeKeyArr } = useChangLongBetStore();

  // 注单的条数
  const [count, setCount] = useState(0);

  // 任选的规格
  const [standNum, setStandNum] = useState({ len: 5, nums: [] });

  // 下注的按钮 dom key
  const [k, setK] = useState(0);

  // 下注组件的实例
  const betInputRef = useRef(null);

  // 获取筹码
  const betChip = useMemo(
    () => gameScen?.stGameConfig?.lBetChip || [],
    [gameScen?.stGameConfig?.lBetChip]
  );

  // 主码
  const mainType = useMemo(
    () => getGameConfigInfo(curGameId, 'emBetMainType'),
    [curGameId]
  );

  // 子码
  const subMainType = useMemo(() => getGameSubTypeMap(curGameId), [curGameId]);

  // 初始化赔率的下标keys对象
  const emmultipObj = getGameConfigInfo(curGameId, 'emMultipleType');

  // 退出是清空数据
  useEffect(() => clear, [clear]);

  // 投注特殊赔率的动态赔率信息的映射（为了弹窗投注信息的展示）
  const tagDynamicMultiple = useMemo(() => {
    let tagDynamicMultiple = CreateArray(
      common.tagDynamicMultiple,
      [common.LEN_SSC_BET_COUNT],
      0,
      true
    );
    tagDynamicMultiple = [];
    return tagDynamicMultiple;
  }, []);

  // 下注的信息
  const placeBetInfo = useMemo(() => {
    const betInfo = CreateObject(common.CMD_C_PlaceBet);
    betInfo.tagCommonBetInfo = [];
    betInfo.tagSpecialMultiple = [];
    betInfo.placeBetHead.cPeriodNumber.value = lastPeriod;
    return betInfo;
  }, [lastPeriod]);

  // 排列组合限制条件
  const getStandNum = (len, numList) => {
    if (len === standNum.len && numList === standNum.nums) {
      console.log('选项数据没有改变');
    }
    setStandNum({ len, nums: numList });
  };

  // 获取当前赔率(纯展示)
  const getItememMultip = useCallback(
    (item: Obj) => {
      // 常规赔率
      let va = '';
      // 动态赔率
      let tva = '';
      // 没有赔率集合、没有初始化赔率信息返回空
      if (!isNoEmpty(emmultipObj) || !isNoEmpty(initOdds)) return <></>;

      // 处理初始化赔率
      if (isNoEmpty(emmultipObj) && isArray(initOdds)) {
        // 保存当前注单的初始化赔率下标
        item.wMultipleID = emmultipObj[item.mutil];
        va =
          `${divide(
            initOdds[emmultipObj[item.mutil]]?.value,
            common.GOLD_RATIO,
            null
          )}` || defaultAmount;
        item.mutilV = va;
        if (item.tMutil) {
          tva = `/${divide(
            initOdds[emmultipObj[item.tMutil]]?.value,
            common.GOLD_RATIO,
            null
          )}`;
          item.mutilTV = [tva.replace('/', '')];
        }
      }
      // 处理动态赔率 (动态赔率替换初始化赔率 置后)
      if (isNoEmpty(emmultipObj) && isArray(moveOdds?.get(lastPeriod))) {
        // 动态赔率遍历替换初始化赔率

        moveOdds?.get(lastPeriod).forEach((moveOddItem) => {
          const cbMainType = moveOddItem.AreaInfo.cbBetMainType.value;
          const cbSubType = moveOddItem.AreaInfo.cbBetSubType.value;
          const cbNum = moveOddItem.AreaInfo?.cbNumber[0].value;
          const cbTwoNum = `${moveOddItem.AreaInfo?.cbNumber[0].value}${moveOddItem.AreaInfo?.cbNumber[1].value}`; // // 2902+3102 冠亚组合 '1-9'
          // 2902+3102 冠亚组合 '1-9'
          const btnArr =
            typeof item?.text === 'string' ? item?.text?.split('-') : item.text;
          // 数字号码球 '00'
          if (Number(item.text) > -1) {
            // 数字号码球 ： 主码、子码、数字号码
            if (
              mainType[item.mainType] === cbMainType &&
              subMainType[item.subTypeName][item.subMainType] === cbSubType &&
              Number(item.text) === cbNum
            ) {
              // 当前动态赔率下标是否是特殊赔率
              if (
                specialNumList(curGameId).includes(
                  moveOddItem.wMultipleID.value
                )
              ) {
                tva = `/${divide(
                  moveOddItem.dwMultiple.value,
                  common.GOLD_RATIO,
                  null
                )}`;
                item.mutilTV = [tva.replace('/', '')];
              } else {
                va = `${divide(
                  moveOddItem.dwMultiple.value,
                  common.GOLD_RATIO,
                  null
                )}`;
                item.mutilV = va;
              }
            }
          } else if (btnArr.length === 2 && Number(btnArr.join('')) > -1) {
            //2902+3102 冠亚组合 '1-9'
            if (
              mainType[item.mainType] === cbMainType &&
              subMainType[item.subTypeName][item.subMainType] === cbSubType &&
              btnArr.join('') === cbTwoNum
            ) {
              // 主码 + 子码 + 连个号码
              // 当前动态赔率下标是否是特殊赔率
              if (
                specialNumList(curGameId).includes(
                  moveOddItem.wMultipleID.value
                )
              ) {
                tva = `/${divide(
                  moveOddItem.dwMultiple.value,
                  common.GOLD_RATIO,
                  null
                )}`;
                item.mutilTV = [tva.replace('/', '')];
              } else {
                va = `${divide(
                  moveOddItem.dwMultiple.value,
                  common.GOLD_RATIO,
                  null
                )}`;
                item.mutilV = va;
              }
            }
          } else if (
            mainType[item.mainType] === cbMainType &&
            subMainType[item.subTypeName][item.subMainType] === cbSubType
          ) {
            // 文字球 匹配主码+子码
            // 当前动态赔率下标是否是特殊赔率
            if (
              specialNumList(curGameId).includes(moveOddItem.wMultipleID.value)
            ) {
              tva = `/${divide(
                moveOddItem.dwMultiple.value,
                common.GOLD_RATIO,
                null
              )}`;
              item.mutilTV = [tva.replace('/', '')];
            } else {
              va = `${divide(
                moveOddItem.dwMultiple.value,
                common.GOLD_RATIO,
                null
              )}`;
              item.mutilV = va;
            }
          }
        });
      }

      console.warn(tva);

      return (
        <span className='wds-sm-con color-red font-w-bolder'>
          {va}
          {curGameId === 2903 ? tva : ''}
        </span>
      );
    },
    [
      curGameId,
      emmultipObj,
      initOdds,
      lastPeriod,
      mainType,
      moveOdds,
      subMainType,
    ]
  );

  const getComBetInfo = useCallback(
    (it, numArr) => {
      const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);
      // 主码
      tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType[it.mainType];
      // 子码
      tagCommonBetInfoItem.AreaInfo.cbBetSubType.value =
        subMainType[it.subTypeName][it.subMainType];
      // ***********自选号码**重点******************
      const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);
      // 数字号码投注
      numArr.forEach((ele, i) => {
        cbNumber[i].value = Number(ele);
      });

      tagCommonBetInfoItem.AreaInfo.cbNumber = cbNumber;
      // 动态赔率的常规赔率
      tagCommonBetInfoItem.dwNormalMultiple.value = +multiply(
        it.mutilV,
        common.GOLD_RATIO,
        null
      );

      // 动态赔率的特殊赔率
      if (isNoEmpty(it.mutilTV) && isArray(it.mutilTV)) {
        it.mutilTV.forEach((number) => {
          // 特殊赔率单条结构体
          const tagDynamicMultipleItem = CreateObject(
            common.tagDynamicMultiple
          );
          tagDynamicMultipleItem.AreaInfo.cbBetMainType.value =
            mainType[it.mainType];
          tagDynamicMultipleItem.AreaInfo.cbBetSubType.value =
            subMainType[it.subTypeName][it.subMainType];
          tagDynamicMultipleItem.AreaInfo.cbNumber = cbNumber;
          tagDynamicMultipleItem.wMultipleID.value = emmultipObj[it.tMutil]; // 特殊赔率的ID;
          tagDynamicMultipleItem.dwMultiple.value = +multiply(
            number,
            common.GOLD_RATIO,
            null
          );
          tagDynamicMultiple.push(tagDynamicMultipleItem);
        });
      }

      placeBetInfo.tagCommonBetInfo.push(tagCommonBetInfoItem);
    },
    [emmultipObj, mainType, placeBetInfo, subMainType, tagDynamicMultiple]
  );

  // 点击单个注
  const handleBetClick = useCallback(
    (it) => {
      console.warn('点击投注aaaa', { it });
      if (!placeBetInfo || !curGameId) return false;
      const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);

      if (it.mode_type === 'plzh') {
        // 排列组合的代码
        if ((isArray(it.numArr) && it.numArr.length < it.len) || !it.numArr) {
          placeBetInfo.tagCommonBetInfo = [];
          placeBetInfo.tagSpecialMultiple = [];
          // 赋值清空
          tagDynamicMultiple.splice(0, tagDynamicMultiple.length);
          return true;
        }
        const res = getGameMcom(it.numArr, it.len) || [];

        // 选中 重新排列 給原地址置空； 取消号码不需要
        placeBetInfo.tagCommonBetInfo = [];
        // 重新排列 完清空
        tagDynamicMultiple.splice(0, tagDynamicMultiple.length);

        res.forEach((numArr) => {
          getComBetInfo(it, numSort(numArr));
        });

        setCount(res.length); // count : 投注条数
        // console.warn(res, placeBetInfo.tagCommonBetInfo, '特殊赔率', tagDynamicMultiple);
        setStandNum((prev) => ({
          ...prev,
          len: prev.len + 1,
        }));

        return true;
      }

      if (it.mode_type === 'hx') {
        placeBetInfo.tagCommonBetInfo = [];
        const betInfoItem = handleHXBetInfo({
          placeBetInfo,
          tagCommonBetInfoItem,
          betInfo: it.numArr,
          mainType: mainType[it.mainType],
          subMainType:
            it.subTypeName && subMainType[it.subTypeName][it.subMainType],
          odds: it.odds,
        });
        if (betInfoItem) {
          placeBetInfo.tagCommonBetInfo = [betInfoItem];
        }
        setStandNum((pre) => ({ ...pre, len: pre.len + 1 }));
        setCount(betInfoItem ? 1 : 0);
        return true;
      }

      if (it.mode_type === 'lian') {
        saveWSLOdds({
          [it.text]: {
            odds: it.mutilV,
            sub: it.subTypeName && subMainType[it.subTypeName][it.subMainType],
          },
        });
        // 生肖连、尾数连 排列组合的代码
        if ((isArray(it.numArr) && it.numArr.length < it.len) || !it.numArr) {
          return true;
        }
        // 排列组合获取单条
        const res = getGameMcom(it.numArr, it.len) || [];

        const betInfo = handleLianBetInfo({
          placeBetInfo,
          betInfo: res,
          mainType: mainType[it.mainType],
          subMainType:
            it.subTypeName && subMainType[it.subTypeName][it.subMainType],
          t: it.text,
        });

        if (betInfo.length) {
          placeBetInfo.tagCommonBetInfo = betInfo;
        }
        setStandNum((pre) => ({ ...pre, len: pre.len + 1 }));
        setCount(placeBetInfo.tagCommonBetInfo.length);
        return true;
      }

      if (it.active) {
        // 主码
        tagCommonBetInfoItem.AreaInfo.cbBetMainType.value =
          mainType[it.mainType];
        // 子码
        tagCommonBetInfoItem.AreaInfo.cbBetSubType.value =
          subMainType[it.subTypeName][it.subMainType];
        // ***********自选号码**重点******************
        const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);
        const num = Number(it.text);
        const btnArr =
          typeof it?.text === 'string' ? it?.text?.split('-') : it.text;
        // 数字号码投注
        if (num > -1) {
          cbNumber[0].value = num;
        } else if (btnArr.length === 2 && Number(btnArr.join('')) > -1) {
          // 2902+3102 冠亚组合 '1-9'
          btnArr.forEach((ele, i) => {
            cbNumber[i].value = Number(ele);
          });
        } else if (Number(it.num) > -1 && it.key.includes('斗牛')) {
          // 斗牛-牛几游戏号码传参
          cbNumber[0].value = it.num;
        }
        console.log(
          `${mainType[it.mainType]}-${
            subMainType[it.subTypeName][it.subMainType]
          }-${cbNumber[0].value}`
        );
        // 添加key
        if (['gyzh'].includes(it.mode_type)) {
          changeKeyArr((preKeys) => [...preKeys, it.text]);
        } else {
          changeKeyArr((preKeys) => [
            ...preKeys,
            `${mainType[it.mainType]}-${
              subMainType[it.subTypeName][it.subMainType]
            }-${cbNumber[0].value}`,
          ]);
        }

        tagCommonBetInfoItem.AreaInfo.cbNumber = cbNumber;
        // 动态赔率的常规赔率
        tagCommonBetInfoItem.dwNormalMultiple.value = +multiply(
          it.mutilV,
          common.GOLD_RATIO,
          null
        );
        // 动态赔率的特殊赔率
        if (isNoEmpty(it.mutilTV) && isArray(it.mutilTV)) {
          it.mutilTV.forEach((number) => {
            // 特殊赔率单条结构体
            const tagDynamicMultipleItem = CreateObject(
              common.tagDynamicMultiple
            );
            tagDynamicMultipleItem.AreaInfo.cbBetMainType.value =
              mainType[it.mainType];
            tagDynamicMultipleItem.AreaInfo.cbBetSubType.value =
              subMainType[it.subTypeName][it.subMainType];
            tagDynamicMultipleItem.AreaInfo.cbNumber = cbNumber;
            tagDynamicMultipleItem.wMultipleID.value = emmultipObj[it.tMutil]; // 特殊赔率的ID;
            tagDynamicMultipleItem.dwMultiple.value = +multiply(
              number,
              common.GOLD_RATIO,
              null
            );
            tagDynamicMultiple.push(tagDynamicMultipleItem);
          });
        }

        placeBetInfo.tagCommonBetInfo.push(tagCommonBetInfoItem);
        setCount((c) => c + 1);
      } else {
        // 取消选中时，要清掉该条数据
        const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);
        const num = Number(it.text);
        const btnArr =
          typeof it?.text === 'string' ? it?.text?.split('-') : it.text;
        // 数字号码投注
        if (num > -1) {
          cbNumber[0].value = num;
        } else if (btnArr.length === 2 && Number(btnArr.join('')) > -1) {
          // 2902+3102 冠亚组合 '1-9'
          btnArr.forEach((ele, i) => {
            cbNumber[i].value = ele;
          });
        } else if (Number(it.num) > -1 && it.key.includes('斗牛')) {
          // 斗牛-牛几游戏号码传参
          cbNumber[0].value = it.num;
        }
        // 删除对应的key
        changeKeyArr((preKeys) => {
          const newKeys = [];
          (preKeys || []).forEach((k) => {
            if (['gyzh'].includes(it.mode_type)) {
              if (k !== it.text) {
                newKeys.push(k);
              }
            } else if (
              k !==
              `${mainType[it.mainType]}-${
                subMainType[it.subTypeName][it.subMainType]
              }-${cbNumber[0].value}`
            ) {
              newKeys.push(k);
            }
          });
          return newKeys;
        });

        const name = GameMgr.GetBetRecordDesc(
          curGameId,
          mainType[it.mainType],
          subMainType[it.subTypeName][it.subMainType],
          cbNumber
        );
        const newUserBetInfo: common.tagCommonBetInfo[] = [];
        placeBetInfo.tagCommonBetInfo.forEach((it, i) => {
          const curName = GameMgr.GetBetRecordDesc(
            curGameId,
            it.AreaInfo.cbBetMainType.value,
            it.AreaInfo.cbBetSubType.value,
            it.AreaInfo.cbNumber
          );
          if (name === curName) {
            newUserBetInfo.push(it);
            placeBetInfo.tagCommonBetInfo.splice(i, 1);
            if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length) {
              tagDynamicMultiple.forEach((its, index) => {
                const tName = GameMgr.GetBetRecordDesc(
                  curGameId,
                  its.AreaInfo.cbBetMainType.value,
                  its.AreaInfo.cbBetSubType.value,
                  its.AreaInfo.cbNumber
                );
                if (tName === curName) {
                  tagDynamicMultiple.splice(index, 1);
                }
              });
            }
          }
        });
        console.log({ tagDynamicMultiple });
        setCount((c) => c - 1);
      }

      return false;
    },
    [
      placeBetInfo,
      curGameId,
      tagDynamicMultiple,
      getComBetInfo,
      mainType,
      subMainType,
      emmultipObj,
      changeKeyArr,
    ]
  );

  // 清除所有选中
  const onClear = useCallback(() => {
    if (typeof betInputRef?.current?.onResetData === 'function') {
      // 清除金额
      betInputRef?.current?.onResetData();
    }
    if (placeBetInfo?.tagCommonBetInfo?.length) {
      placeBetInfo.tagCommonBetInfo = [];
      placeBetInfo.tagSpecialMultiple = [];
    }
    changeKeyArr([]);
    setCount(0);
    saveWSLOdds(null);
    tagDynamicMultiple.length = 0;
    setK((preK) => preK + 1);
  }, [placeBetInfo, tagDynamicMultiple, changeKeyArr]);

  // 真实的下注操作
  const optionBet = useCallback(
    (clData) => {
      if (!gameWs || !lastPeriod) return;
      // 长龙下注
      if (clData && clcc) {
        clData.forEach((betInfo) => {
          // betInfo.placeBetHead.wKindID.value = 2901;
          // betInfo.tagCommonBetClientHead.wBetCount.value = betInfo.tagCommonBetInfo.length;
          // betInfo.tagCommonBetClientHead.wMultipleCount.value = betInfo.tagSpecialMultiple.length;
          // console.log({ betInfo });
          clcc.longDragonBet(betInfo);
        });
        onClear();
        return;
      }
      // 普通下注
      const betInfo = CreateObject(common.CMD_C_PlaceBet);
      betInfo.placeBetHead.cPeriodNumber.value =
        placeBetInfo.placeBetHead.cPeriodNumber.value;
      betInfo.placeBetHead.wBetCount.value =
        placeBetInfo.tagCommonBetInfo.length;
      betInfo.placeBetHead.wMultipleCount.value = tagDynamicMultiple.length;
      const nameMapKey: Obj = {};
      placeBetInfo.tagCommonBetInfo.forEach((it, i) => {
        const codeName = GameMgr.GetBetRecordDesc(
          curGameId,
          it.AreaInfo.cbBetMainType.value,
          it.AreaInfo.cbBetSubType.value,
          it.AreaInfo.cbNumber
        );
        nameMapKey[codeName] = i;
        betInfo.tagCommonBetInfo[i] = CreateObject(common.tagCommonBetInfo);
        betInfo.tagCommonBetInfo[i].AreaInfo.cbBetMainType.value =
          it.AreaInfo.cbBetMainType.value;
        betInfo.tagCommonBetInfo[i].AreaInfo.cbBetSubType.value =
          it.AreaInfo.cbBetSubType.value;
        betInfo.tagCommonBetInfo[i].AreaInfo.cbNumber = [
          ...it.AreaInfo.cbNumber,
        ];
        betInfo.tagCommonBetInfo[i].dwNormalMultiple.value =
          it.dwNormalMultiple.value;
        betInfo.tagCommonBetInfo[i].lBetScore.value = it.lBetScore.value;
        return it;
      });
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
        betInfo.tagSpecialMultiple = newTagSpecialMultiple;
        // 赋值完清空
        tagDynamicMultiple.splice(0, tagDynamicMultiple.length);
      } else {
        betInfo.tagSpecialMultiple = [];
      }
      gameWs.userBetScore(betInfo as any);
      onClear();
    },
    [
      gameWs,
      lastPeriod,
      clcc,
      placeBetInfo.placeBetHead.cPeriodNumber.value,
      placeBetInfo.tagCommonBetInfo,
      tagDynamicMultiple,
      onClear,
      curGameId,
    ]
  );

  return (
    <>
      <CountTimeS />
      <div className='df-aic-jcc flex-1 fd-c o-none'>
        <ClassicsTop
          gameType={curGameId}
          curPeriodNumber={lastPeriod}
          gameRecords={gameRecords}
        />
        <ContentBox
          ik={k}
          getStandNum={getStandNum}
          curGameId={curGameId}
          curPeriodNumber={lastPeriod}
          getItememMultip={getItememMultip}
          handleBetClick={handleBetClick}
          onClear={onClear}
          gameWs={gameWs}
          clRef={clRef}
          cbCurrXiao={gameScen?.cbCurrXiao?.value}
        />
        <BetInput
          ref={betInputRef}
          betCount={count}
          onBetClick={optionBet}
          betChip={betChip}
          betPeriod={lastPeriod}
          tagCommonBetInfo={placeBetInfo.tagCommonBetInfo}
          tagDynamicMultiple={tagDynamicMultiple}
          curGameId={curGameId}
          onClear={onClear}
          stPlaceBetFunction={clRef.current?.sendJetton}
          standNum={standNum}
        />
      </div>
    </>
  );
};

export default observer(ClassicGame);
