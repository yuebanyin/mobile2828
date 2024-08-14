import { observer } from 'mobx-react-lite';
import {
 useCallback, useEffect, useMemo, useRef, useState 
} from 'react';
import { useGameConfigStore } from '@/mobx';
import { ClassicsTop } from '@/pages/gameComponents/classicsTop';
import ContentBox from './ContentBox';
import { useWsGameChat } from '@/hooks';
import CountTimeS from '../countTimes';
import { BYTE, CreateArray, CreateObject } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
// import { useGetPC28TMP } from '@/hooks/useGetPC28TMP';
import { Obj, defaultAmount } from '@/constants';
import {
 divide, formatNumber, isArray, isNoEmpty, noFormatDigit 
} from '@/utils/tools';
import { GameMgr } from '@/engine/mgr/mgr';
import { BetInput } from '@/pages/gameComponents/betInput';
import { getGameConfigInfo, getGameSubTypeMap } from '../../pc28Games';

const ClassicGame = () => {
  const { gameList, gameWsUrl } = useGameConfigStore();

  // 连接ws 实例
  const {
 gameWs, clear, curGameId, gameRecords, lastPeriod, gameScen, clcc 
} = useWsGameChat({
    isOnlyChatRoom: false,
    gameList,
    gameWsUrl,
  });

  // 长龙组件实例
  const clRef = useRef(null);

  // 动态赔率
  const { moveOdds, initOdds } = useGameConfigStore();

  // 注单的条数
  const [count, setCount] = useState(0);

  // 任选的规格
  const [standNum, setStandNum] = useState({ len: 5, nums: [] });

  // 下注的按钮 dom key
  const [k, setK] = useState(0);

  // 下注组件的实例
  const betInputRef = useRef(null);

  // 获取筹码
  const betChip = useMemo(() => gameScen?.stGameConfig?.lBetChip || [], [gameScen?.stGameConfig?.lBetChip]);

  // 主码
  const mainType = useMemo(() => getGameConfigInfo(curGameId, 'emBetMainType'), [curGameId]);

  // 子码
  const subMainType = useMemo(() => getGameSubTypeMap(curGameId), [curGameId]);

  // 动态赔率的映射
  const multipleObj: any = {};
  //   = useGetPC28TMP({
  //   TMP: TMP ? TMP.get(lastPeriod) : null,
  //   // dwMultiple: isTDMFinish ? dwMultiple : dwMultiple,
  //   curGameId,
  // });

  console.log('tttttttttTMP', moveOdds, initOdds);
  // 退出是清空数据
  useEffect(() => clear, [clear]);

  // 投注单条信息
  const tagDynamicMultiple = useMemo(() => {
    let tagDynamicMultiple = CreateArray(common.tagDynamicMultiple, [common.LEN_SSC_BET_COUNT], 0, true);
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

  const getStandNum = (len, numList) => {
    if (len === standNum.len && numList === standNum.nums) {
      console.log('选项数据没有改变');
    }
    setStandNum({ len, nums: numList });
  };

  // 获取当前赔率(纯展示)
  const getItememMultip = useCallback(
    (item: Obj, text: string) => {
      let value = defaultAmount;
      let spcailV = '';
      const emmultipObj = getGameConfigInfo(curGameId, 'emMultipleType'); // 当前游戏倍率
      const dwMultipArr = [];
      if (isNoEmpty(emmultipObj) && isNoEmpty(dwMultipArr)) {
        let va;
        if (multipleObj?.tMapMul && multipleObj?.tMapMul[text]) {
          // FIXME 2023-09-16 14:46:45 2901的动态赔率有事先在赔率规则准备好在multipleObj中，根据 名称-值 一一对应
          va = multipleObj?.tMapMul[text];
        } else {
          // FIXME 2023-09-16 14:46:45 其他游戏的动态赔率原始数据中匹配主区域，子区域，球号，获取当前赔率的下发数据
          const dyOddsInfo = moveOdds?.get(lastPeriod)?.find(({ AreaInfo }) => {
            // FIXME 2023-09-16 15:09:53 主区域比较
            const mainTypeEnum = getGameConfigInfo(curGameId, 'emBetMainType');
            const equalMainType = AreaInfo.cbBetMainType.value === mainTypeEnum[item.mainType];
            // FIXME 2023-09-16 15:09:53 子区域比较
            const subTypeEnum = getGameConfigInfo(curGameId, item.subTypeName);
            const equalSubType = AreaInfo.cbBetSubType.value === subTypeEnum[item.subMainType];
            // FIXME 2023-09-16 15:09:53 数字比较
            const numberList = AreaInfo.cbNumber.map((r) => r.value).filter((r) => r !== 255);
            // FIXME 2023-09-16 15:12:14 下发的数据种没有球号时，则为无需此字段的大小单双等个性化下注，直接比较主子区域即可，
            if (numberList.length === 0) return equalMainType && equalSubType;
            // FIXME 2023-09-16 15:11:52 一般数字按钮回显示一个数，兼容冠亚组合的-隔开，text的显示有-分割两个数字。
            const itemNumber = item.text.split('-');
            const equalNumber = `${numberList}` === `${itemNumber}`; // `${[1]}`===`${["1"]}`
            return equalMainType && equalSubType && equalNumber;
          });
          const odds = dyOddsInfo?.dwMultiple?.value;
          va = odds || dwMultipArr[emmultipObj[item.mutil]]?.value || 0;
        }
        if (va > 0) {
          value = `${divide(va, common.GOLD_RATIO)}`;
        } else {
          value = '0.00';
        }
        if (item.tMutil && dwMultipArr[emmultipObj[item.tMutil]]?.value) {
          spcailV = `/${formatNumber(noFormatDigit(divide(dwMultipArr[emmultipObj[item.tMutil]]?.value, common.GOLD_RATIO)))}`;
        }
      }
      return (
        <span className='wds-sm-con color-red font-w-bolder'>
          {formatNumber(noFormatDigit(value))}
          {spcailV}
        </span>
      );
    },
    [curGameId, lastPeriod, moveOdds, multipleObj.tMapMul]
  );

  // 点击单个注
  const handleBetClick = useCallback(
    (it) => (isAct) => {
      console.log('点击投注aaaa', { it, isAct });
      // debugger;
      if (!placeBetInfo || !curGameId) return false;
      const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);
      if (isAct) {
        const emmultipObj = getGameConfigInfo(curGameId, 'emMultipleType');
        // const dwMultipArr = multipleObj.multiple || [];
        tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType[it.mainType];
        tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = subMainType[it.subTypeName][it.subMainType];
        let nomMul;
        if (multipleObj.tMapMul && multipleObj.tMapMul[it.name]) {
          // FIXME 2023-09-16 14:46:45 2901的动态赔率有事先在赔率规则准备好在multipleObj中，根据 名称-值 一一对应
          nomMul = multipleObj.tMapMul[it.name];
        } else {
          //3501
          // FIXME 2023-09-16 14:46:45 其他游戏的动态赔率原始数据中匹配主区域，子区域，球号，获取当前赔率的下发数据
          // const dyOddsInfo = TMP?.get(lastPeriod)?.find(({ AreaInfo }) => {
          //   // FIXME 2023-09-16 15:09:53 主区域比较
          //   const mainTypeEnum = getGameConfigInfo(curGameId, 'emBetMainType');
          //   const equalMainType = AreaInfo.cbBetMainType.value === mainTypeEnum[it.mainType];
          //   // FIXME 2023-09-16 15:09:53 子区域比较
          //   const subTypeEnum = getGameConfigInfo(curGameId, it.subTypeName);
          //   const equalSubType = AreaInfo.cbBetSubType.value === subTypeEnum[it.subMainType];
          //   // FIXME 2023-09-16 15:09:53 数字比较
          //   const numberList = AreaInfo.cbNumber.map((r) => r.value).filter((r) => r !== 255);
          //   // FIXME 2023-09-16 15:12:14 下发的数据种没有球号时，则为无需此字段的大小单双等个性化下注，直接比较主子区域即可，
          //   if (numberList.length === 0) return equalMainType && equalSubType;
          //   // FIXME 2023-09-16 15:11:52 一般数字按钮回显示一个数，兼容冠亚组合的-隔开，text的显示有-分割两个数字。
          //   const itemNumber = it.text.split('-');
          //   const equalNumber = `${numberList}` === `${itemNumber}`; // `${[1]}`===`${["1"]}`
          //   return equalMainType && equalSubType && equalNumber;
          // });
          // const odds = dyOddsInfo?.dwMultiple?.value;
          // nomMul = odds || dwMultipArr[emmultipObj[it.mutil]]?.value || 0;
        }
        console.log('🚀 ~ file: index.tsx:139 ~ CanadaPc ~ nomMul:', nomMul, multipleObj.tMapMul, multipleObj.tMapMul[it.name], it);

        tagCommonBetInfoItem.dwNormalMultiple.value = nomMul;

        // 投注对象可能是单个号码也可能是一组数字
        const num = isArray(it.text) ? it.text : Number(it.text);

        // 新增逻辑判断 数组： 特殊赔率数组类型
        const newTmutil = [];
        // if (isArray(it.tMutil)) {
        //   newTmutil = it.tMutil;
        // } else if (it.tMutil && typeof dwMultipArr[emmultipObj[it.tMutil]]?.value === 'number') {
        //   newTmutil.push(it.tMutil);
        // }
        // 不走下面逻辑的情况 ： tagDynamicMultiple.length && curGameId === 3501
        if (!(curGameId === 3501 && tagDynamicMultiple.length)) {
          newTmutil.forEach((item) => {
            // 特殊赔率 3501
            const tagDynamicMultipleItem = CreateObject(common.tagDynamicMultiple);
            tagDynamicMultipleItem.AreaInfo.cbBetMainType.value = mainType[it.mainType];
            tagDynamicMultipleItem.AreaInfo.cbBetSubType.value = subMainType[it.subTypeName][it.subMainType];
            // tagDynamicMultipleItem.dwMultiple.value = dwMultipArr[emmultipObj[item]]?.value;
            tagDynamicMultipleItem.wMultipleID.value = emmultipObj[item];
            if (isArray(num)) {
              num.forEach((it, i) => {
                tagDynamicMultipleItem.AreaInfo.cbNumber[i].value = it;
              });
            } else if (num > -1) {
              tagDynamicMultipleItem.AreaInfo.cbNumber[0].value = num;
            }
            tagDynamicMultiple.push(tagDynamicMultipleItem);
          });
        }

        if (isArray(num)) {
          num.forEach((it, i) => {
            tagCommonBetInfoItem.AreaInfo.cbNumber[i].value = it;
          });
        } else if (num > -1) {
          tagCommonBetInfoItem.AreaInfo.cbNumber[0].value = num;
        }
        placeBetInfo.tagCommonBetInfo.push(tagCommonBetInfoItem);
        setCount((c) => c + 1);
      } else {
        // 取消选中时，要清掉该条数据
        const cbNumber = CreateArray(BYTE, [1]);
        const num = Number(it.text);
        if (num > -1) {
          cbNumber[0].value = num;
        }
        const name = GameMgr.GetBetRecordDesc(curGameId, mainType[it.mainType], subMainType[it.subTypeName][it.subMainType], cbNumber);
        const newUserBetInfo: common.tagCommonBetInfo[] = [];
        placeBetInfo.tagCommonBetInfo.forEach((it, i) => {
          const curName = GameMgr.GetBetRecordDesc(curGameId, it.AreaInfo.cbBetMainType.value, it.AreaInfo.cbBetSubType.value, it.AreaInfo.cbNumber);
          if (name === curName) {
            newUserBetInfo.push(it);
            placeBetInfo.tagCommonBetInfo.splice(i, 1);
            if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length) {
              tagDynamicMultiple.forEach((its, index) => {
                const tName = GameMgr.GetBetRecordDesc(curGameId, its.AreaInfo.cbBetMainType.value, its.AreaInfo.cbBetSubType.value, its.AreaInfo.cbNumber);
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

      return true;
    },
    [placeBetInfo, curGameId, multipleObj.tMapMul, mainType, subMainType, tagDynamicMultiple]
  );

  // 清除所有选中
  const onClear = useCallback(
    (isNoUpdateKey?) => {
      if (typeof betInputRef?.current?.onResetData === 'function') {
        // 清除金额
        betInputRef?.current?.onResetData();
      }
      if (placeBetInfo?.tagCommonBetInfo.length) {
        placeBetInfo.tagCommonBetInfo = [];
        placeBetInfo.tagSpecialMultiple = [];
      }
      setCount(0);
      if (isNoUpdateKey) {
        tagDynamicMultiple.splice(0, tagDynamicMultiple.length);
        return;
      }
      setK((preK) => preK + 1);
    },
    [placeBetInfo, tagDynamicMultiple]
  );

  // 真实的下注操作
  const optionBet = useCallback(
    (clData) => {
      if (!gameWs || !lastPeriod) return;
      // 长龙下注
      if (clData && clcc) {
        clData.forEach((betInfo) => {
          betInfo.placeBetHead.wKindID.value = 2901;
          betInfo.tagCommonBetClientHead.wBetCount.value = betInfo.tagCommonBetInfo.length;
          betInfo.tagCommonBetClientHead.wMultipleCount.value = betInfo.tagSpecialMultiple.length;
          console.log({ betInfo });
          clcc.longDragonBet(betInfo);
        });
        return;
      }
      // 普通下注
      const betInfo = CreateObject(common.CMD_C_PlaceBet);
      betInfo.placeBetHead.cPeriodNumber.value = placeBetInfo.placeBetHead.cPeriodNumber.value;
      betInfo.placeBetHead.wBetCount.value = placeBetInfo.tagCommonBetInfo.length;
      betInfo.placeBetHead.wMultipleCount.value = tagDynamicMultiple.length;
      const nameMapKey: Obj = {};
      placeBetInfo.tagCommonBetInfo.forEach((it, i) => {
        const codeName = GameMgr.GetBetRecordDesc(curGameId, it.AreaInfo.cbBetMainType.value, it.AreaInfo.cbBetSubType.value, it.AreaInfo.cbNumber);
        nameMapKey[codeName] = i;
        betInfo.tagCommonBetInfo[i] = CreateObject(common.tagCommonBetInfo);
        betInfo.tagCommonBetInfo[i].AreaInfo.cbBetMainType.value = it.AreaInfo.cbBetMainType.value;
        betInfo.tagCommonBetInfo[i].AreaInfo.cbBetSubType.value = it.AreaInfo.cbBetSubType.value;
        betInfo.tagCommonBetInfo[i].AreaInfo.cbNumber = [...it.AreaInfo.cbNumber];
        betInfo.tagCommonBetInfo[i].dwNormalMultiple.value = it.dwNormalMultiple.value;
        betInfo.tagCommonBetInfo[i].lBetScore.value = it.lBetScore.value;
        return it;
      });
      if (isArray(tagDynamicMultiple) && tagDynamicMultiple.length) {
        const newTagSpecialMultiple = CreateArray(common.tagSpecialMultiple, [common.LEN_SSC_BET_COUNT], 0, true);
        tagDynamicMultiple.forEach((it, i) => {
          const ocodeName = GameMgr.GetBetRecordDesc(curGameId, it.AreaInfo.cbBetMainType.value, it.AreaInfo.cbBetSubType.value, it.AreaInfo.cbNumber);
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

      console.log('🚀 ~ file: index.tsx:222 ~ CanadaPc ~ betInfo:', betInfo);
      gameWs.userBetScore(betInfo as any);
      onClear();
    },
    [gameWs, lastPeriod, clcc, placeBetInfo.placeBetHead.cPeriodNumber.value, placeBetInfo.tagCommonBetInfo, tagDynamicMultiple, onClear, curGameId]
  );

  return (
    <>
      <CountTimeS />
      <div className='df-aic-jcc flex-1 fd-c o-none'>
        <ClassicsTop gameType={curGameId} curPeriodNumber={lastPeriod} gameRecords={gameRecords} />
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
