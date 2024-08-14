import { Obj } from '@/constants';
import { isArray, isNoEmpty, multiply } from './tools';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { BYTE, CreateArray, CreateObject } from '@/engine/base/basetype';
import { curyearsx } from '@/pages/home/games/classicGame/constFiles/constCommon';
import { GameMgr } from '@/engine/mgr/mgr';

/**
 * @description 获取游戏信息、房间信息
 * @param list 游戏列表 
 * @param gameId 游戏id
 * @param roomId 房间id
 * @param listFrom 游戏列表来源 (gameList、HomeTypeGame)
 * @returns 返回当前游戏信息、房间列表、房间信息
 */
export const getGameInfo = (list: any[], gameId: string | number, roomId?: string | number, listFrom?: string) => {
  let gameInfo: Obj = {};
  let roomList: any[] = [];
  let fieldInfo: Obj = {};
  let homeTypeGameInfo: Obj = {};
  
  if (listFrom === 'HomeTypeGames') {
    if (isArray(list) && gameId) {
      list.forEach((item: any) => {
        isArray(item?.GameList) && item.GameList.forEach((it: any) => {
          if (it?.GameId === Number(gameId)) {
            homeTypeGameInfo = it;
          }
        });
      }); 
    } 
  } else if (isArray(list) && gameId) {
      gameInfo = list.find((it) => it.KindId === Number(gameId));
      if (![2801, 2802, 2803, 2804].includes(Number(gameId))) {
        fieldInfo = gameInfo?.Field[0];
      } else {
        fieldInfo = (gameInfo?.Field || []).find((item) => item.FieldId === Number(roomId));
      }
      roomList = gameInfo?.Field;
    } 
  
  return {
    gameInfo,
    roomList,
    fieldInfo,
    homeTypeGameInfo,
  };
};

/**
 * 求：组合C(m, n)，m为上标，n为下标。m选n的所有项
 * m {必传} 原始数据
 * n {必传} 当前项还需元素的个数
 * currentIndex 当前索引
 * choseArr 当前项的部分元素集合（不是完整项，是生成完整项的一个中间状态）
 * result 所有项的结果结合
 * 例如 var arr1 = ['a', 'b', 'c', 'd'];  console.log('arr1111', getGameMcom(arr1, 2))
 */
export const getGameMcom = (m, n, currentIndex = 0, choseArr = [], result = []) => {
  const mLen = m.length;
  // 可选数量小于项所需元素的个数，则递归终止
  if (currentIndex + n > mLen) {
    return false;
  }
  for (let i = currentIndex; i < mLen; i += 1) {
    // n === 1的时候，说明choseArr在添加一个元素，就能生成一个新的完整项了。
    // debugger
    if (n === 1) {
      // 再增加一个元素就能生成一个完整项，再加入到结果集合中
      result.push([...choseArr, m[i]]);
      // 继续下一个元素生成一个新的完整项
      i + 1 < mLen && getGameMcom(m, n, i + 1, choseArr, result);
      break;
    }
    // 执行到这，说明n > 2，choseArr还需要两个以上的元素，才能生成一个新的完整项。则递归，往choseArr添加元素
    getGameMcom(m, n - 1, i + 1, [...choseArr, m[i]], result);
  }
  return result;
};

interface ParamProps {
  placeBetInfo: common.CMD_C_PlaceBet;
  tagCommonBetInfoItem: common.tagCommonBetInfo;
  betInfo: any[];
  mainType: number;
  subMainType: number;
  odds: number | string;
}
export const handleHXBetInfo = (params: ParamProps): common.tagCommonBetInfo => {
  const {
 placeBetInfo, tagCommonBetInfoItem, betInfo, mainType, subMainType, odds 
} = params;
  //
  if (!placeBetInfo || !tagCommonBetInfoItem) return null;
  // 每次进来先清空原数据
  placeBetInfo.tagCommonBetInfo = [];
  console.warn({
    betInfo,
    subMainType,
    odds,
  });
  // 如果下注信息为空，就置为空
  if (betInfo.length > 0) {
    const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);
    tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType;
    tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = subMainType;
    // 自选号码赋值
    betInfo
      .sort((pre, cur) => pre.idx - cur.idx)
      .forEach((info, i) => {
        cbNumber[i].value = info.idx;
      });
    tagCommonBetInfoItem.AreaInfo.cbNumber = cbNumber;
    tagCommonBetInfoItem.dwNormalMultiple.value = multiply(odds, common.GOLD_RATIO, null);
    return tagCommonBetInfoItem;
  }
  return null;
};

/**
 * 尾数连、生肖连的处理
 * @param params
 * @returns
 */
let objOdds = null; // 保存赔率信息（每次点击按钮都会保存到改对象中，提供给组合真实下注信息时使用）
export const saveWSLOdds = (o) => {
  if (!objOdds) {
    objOdds = {};
  }
  if (!o) {
    objOdds = null;
  } else {
    objOdds = { ...objOdds, ...o };
  }
};
export const handleLianBetInfo = (params: Omit<ParamProps, 'odds' | 'tagCommonBetInfoItem'> & { t?: string }): common.tagCommonBetInfo[] => {
  const {
 placeBetInfo, betInfo, mainType, subMainType, t 
} = params;
  if (!placeBetInfo) {
    objOdds = null;
    return [];
  }
  // 每次进来先清空原数据
  placeBetInfo.tagCommonBetInfo = [];
  console.warn({
    betInfo,
    subMainType,
    objOdds,
    curyearsx,
    t,
  });

  // 如果下注信息为空，就置为空
  if (betInfo.length > 0) {
    let tagCommonBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true);
    tagCommonBetInfo = [];
    betInfo.forEach((nums) => {
      const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);
      const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);

      // 是否是本年或者包含0
      const tkey = Number(t) >= 0 ? '0' : curyearsx;
      // 当条注单需要的子码和赔率对象（objOdds）对应的key
      let curK = tkey;
      const isTS = nums.some((ts) => `${ts.t}` === tkey);
      // 自选号码赋值
      nums
        .sort((pre, cur) => pre.idx - cur.idx)
        .forEach((info, i) => {
          cbNumber[i].value = info.idx;
          if (!isTS && info.t !== tkey) {
            curK = info.t;
          }
        });
      tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType;
      tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = objOdds ? objOdds[curK]?.sub : 0;
      tagCommonBetInfoItem.AreaInfo.cbNumber = cbNumber;
      tagCommonBetInfoItem.dwNormalMultiple.value = Number(multiply(objOdds ? objOdds[curK]?.odds : 0, common.GOLD_RATIO, null));
      tagCommonBetInfo.push(tagCommonBetInfoItem);
    });
    return tagCommonBetInfo;
  }
  return [];
};

/**
 * 
 * @param params 
 */
export const getLimaGameInfo = (params) => {
  const {
 it, numArr, curGameId, mainType, subMainType, emmultipObj, tagDynamicMultiple, placeBetInfo 
} = params;
    const tagCommonBetInfoItem = CreateObject(common.tagCommonBetInfo);
    if (it.active) {
      // 主码
      tagCommonBetInfoItem.AreaInfo.cbBetMainType.value = mainType[it.mainType];
      // 子码
      tagCommonBetInfoItem.AreaInfo.cbBetSubType.value = subMainType[it.subTypeName][it.subMainType];
      // ***********自选号码**重点******************
      const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);
      // 数字号码投注
      numArr.forEach((ele, i) => {
        cbNumber[i].value = Number(ele);
      });

      tagCommonBetInfoItem.AreaInfo.cbNumber = cbNumber;
      // 动态赔率的常规赔率
      tagCommonBetInfoItem.dwNormalMultiple.value = +multiply(it.mutilV, common.GOLD_RATIO, null);
      // 动态赔率的特殊赔率
      if (isNoEmpty(it.mutilTV) && isArray(it.mutilTV)) {
        it.mutilTV.forEach((number) => {
          // 特殊赔率单条结构体
          const tagDynamicMultipleItem = CreateObject(common.tagDynamicMultiple);
          tagDynamicMultipleItem.AreaInfo.cbBetMainType.value = mainType[it.mainType];
          tagDynamicMultipleItem.AreaInfo.cbBetSubType.value = subMainType[it.subTypeName][it.subMainType];
          tagDynamicMultipleItem.AreaInfo.cbNumber = cbNumber;
          tagDynamicMultipleItem.wMultipleID.value = emmultipObj[it.tMutil]; // 特殊赔率的ID;
          tagDynamicMultipleItem.dwMultiple.value = +multiply(number, common.GOLD_RATIO, null);
          tagDynamicMultiple.push(tagDynamicMultipleItem);
        });
      }

      placeBetInfo.tagCommonBetInfo.push(tagCommonBetInfoItem);
    } else {
      // 取消选中时，要清掉该条数据
      const cbNumber = CreateArray(BYTE, [common.MAX_SSC_NUMBER_COUNT]);
      // 数字号码投注
      numArr.forEach((ele, i) => {
        cbNumber[i].value = Number(ele);
      });

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
    }
  };
