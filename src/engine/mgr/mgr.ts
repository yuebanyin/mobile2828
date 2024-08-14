/**
 * @description: 游戏全局管理
 */

import { BYTE } from '../base/basetype';
import { CMD_2801 } from '../game/28/2801/CMD_2801';
import { CMD_2901 } from '../game/pc/2901/CMD_2901';
import { CMD_2902 } from '../game/pc/2902/CMD_2902';
import { CMD_2903 } from '../game/pc/2903/CMD_2903';
import { CMD_2904 } from '../game/pc/2904/CMD_2904';
import { CMD_2905 } from '../game/pc/2905/CMD_2905';
import { CMD_3102 } from '../game/pc/3102/CMD_3102';
import { CMD_3202 } from '../game/pc/3202/CMD_3202';
import { CMD_3203 } from '../game/pc/3203/CMD_3203';
import { CMD_3402 } from '../game/pc/3402/CMD_3402';
import { CMD_3501 } from '../game/pc/3501/CMD_3501';

export namespace GameMgr {
  /**
   * @description: 房间等级配置
   * @return {*}
   */
  export const mapRoomLevelName = new Map<number, string>([
    [1, '普通房'],
    [2, '贵宾厅'],
    [3, '高赔率'],
  ]);

  // 2801-2804 和 2901都是同一个游戏玩法
  export const map28MainType = new Map<number, string>([
    [CMD_2801.emBetMainType.BTM_TE, 'TE'],
    [CMD_2801.emBetMainType.BTM_DING_1, 'DING_1'],
    [CMD_2801.emBetMainType.BTM_DING_2, 'DING_2'],
    [CMD_2801.emBetMainType.BTM_DING_3, 'DING_3'],
  ]);

  export const map28SubType = new Map<number, string>([
    [CMD_2801.emSubBetTypeTeMa.SBTT_DA, 'DA'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_XIAO, 'XIAO'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_DAN, 'DAN'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_SHUANG, 'SHUANG'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_DA_DAN, 'DA_DAN'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_XIAO_DAN, 'XIAO_DAN'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_DA_SHUANG, 'DA_SHUANG'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_XIAO_SHUANG, 'XIAO_SHUANG'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_JIDA, 'JIDA'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_JIXIAO, 'JIXIAO'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_HONG, 'HONG'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_LAN, 'LAN'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_LV, 'LV'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_SHUNZI, 'SHUNZI'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_BAOZI, 'BAOZI'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_DUIZI, 'DUIZI'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_LONG, 'LONG'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_HU, 'HU'],
    [CMD_2801.emSubBetTypeTeMa.SBTT_HE, 'HE'],
  ]);

  export const map28SubDwqType = new Map<number, string>([
    [CMD_2801.emSubBetTypeDingWei.SBTD_DA, 'DA'],
    [CMD_2801.emSubBetTypeDingWei.SBTD_XIAO, 'XIAO'],
    [CMD_2801.emSubBetTypeDingWei.SBTD_DAN, 'DAN'],
    [CMD_2801.emSubBetTypeDingWei.SBTD_SHUANG, 'SHUANG'],
  ]);

  export const map28ResultType = new Map<number, string>([
    [CMD_2801.emResultType.RT_DA, 'DA'],
    [CMD_2801.emResultType.RT_XIAO, 'XIAO'],
    [CMD_2801.emResultType.RT_DAN, 'DAN'],
    [CMD_2801.emResultType.RT_SHUANG, 'SHUANG'],
    [CMD_2801.emResultType.RT_JI_DA, 'JIDA'],
    [CMD_2801.emResultType.RT_JI_XIAO, 'JIXIAO'],
    [CMD_2801.emResultType.RT_JI_WU, 'WU_JI_ZHI'],
    [CMD_2801.emResultType.RT_BO_HONG, 'HONG'],
    [CMD_2801.emResultType.RT_BO_LAN, 'LAN'],
    [CMD_2801.emResultType.RT_BO_LV, 'LV'],
    [CMD_2801.emResultType.RT_SHUNZI, 'SHUNZI'],
    [CMD_2801.emResultType.RT_BAOZI, 'BAOZI'],
    [CMD_2801.emResultType.RT_DUIZI, 'DUIZI'],
    [CMD_2801.emResultType.RT_ZASAN, 'ZA_SAN_WU_PAI'],
    [CMD_2801.emResultType.RT_LONG, 'LONG'],
    [CMD_2801.emResultType.RT_HU, 'HU'],
    [CMD_2801.emResultType.RT_HE, 'HE'],
  ]);

  /**
   * @description: 获取主下注类型描述
   * @return {*}
   */
  export function GetGame28BetMainType(mType: number): string {
    if (map28MainType.has(mType)) return map28MainType.get(mType);
    return '';
  }

  /**
   * @description: 2801-2901获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame28BetSubType(
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    if (mType === CMD_2801.emBetMainType.BTM_TE) {
      //自选数字
      if (sType === CMD_2801.emSubBetTypeTeMa.SBTT_NUM) {
        return NumberByteDesc(num);
      }
      return map28SubType.get(sType);
    } else if (
      mType >= CMD_2801.emBetMainType.BTM_DING_1 &&
      mType <= CMD_2801.emBetMainType.BTM_DING_3
    ) {
      if (sType === CMD_2801.emSubBetTypeDingWei.SBTD_NUM) {
        return NumberByteDesc(num);
      }
      return map28SubDwqType.get(sType);
    }
    return map28SubType.get(sType);
  }

  /**
   * @description: 获取结果类型
   * @param {number} nResult
   * @return {*}
   */
  export function GetGame28ResultType(nResult: number) {
    if (map28ResultType.has(nResult)) return map28ResultType.get(nResult);
    return '';
  }

  /**
   * @description: 2902获取主区域下注描述
   * @param {number} mType
   * @return {*}
   */
  export function GetGame2902BetMainType(mType: number): string {
    return CMD_2902.GetGameBetMainType(mType);
  }

  /**
   * @description: 2902获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame2902BetSubType(
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    if (
      (mType >= CMD_2902.emBetMainType.BTM_RANK_1 &&
        mType <= CMD_2902.emBetMainType.BTM_RANK_10) ||
      mType === CMD_2902.emBetMainType.BTM_COM
    ) {
      //自选数字
      if (num) {
        if (
          sType === CMD_2902.emBetTypeRank.SBTR_NUM ||
          (mType === CMD_2902.emBetMainType.BTM_COM &&
            sType === CMD_2902.emBetTypeCom.SBTC_NUM)
        ) {
          //自选数字
          return NumberByteDesc(num);
        }
      }
      return CMD_2902.GetGameBetSubRankType(sType);
    } else if (mType === CMD_2902.emBetMainType.BTM_SUM) {
      if (sType === CMD_2902.emBetTypeSum.SBTS_NUM) {
        return NumberByteDesc(num);
      }
      return CMD_2902.GetGameBetSubSumType(sType);
    }
    return '';
  }

  /**
   * @description: 2901获取主区域下注描述
   * @param {number} mType
   * @return {*}
   */
  export function GetGame2903BetMainType(mType: number): string {
    return CMD_2903.GetGameBetMainType(mType);
  }

  /**
   * @description: 2902获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame2903BetSubType(
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    if (
      sType === CMD_2903.emSubBetTypeTeMa.SBTT_NUM &&
      mType !== CMD_2903.emBetMainType.BTM_HE &&
      mType !== CMD_2903.emBetMainType.BTM_LIAN_MA &&
      mType !== CMD_2903.emBetMainType.BTM_TE_XIAO &&
      mType !== CMD_2903.emBetMainType.BTM_YI_XIAO &&
      mType !== CMD_2903.emBetMainType.BTM_BAN_BO
    ) {
      //自选数字
      return NumberByteDesc(num);
    } else if (
      sType > CMD_2903.emSubBetTypeTeMa.SBTT_NUM &&
      mType === CMD_2903.emBetMainType.BTM_TE
    ) {
      return CMD_2903.GetGameBetSubTmType(sType);
    } else if (
      mType >= CMD_2903.emBetMainType.BTM_ZHENG_1 &&
      mType <= CMD_2903.emBetMainType.BTM_ZHENG_6
    ) {
      //正码1-6
      return CMD_2903.GetGameBetSubZmType(sType);
    } else if (mType === CMD_2903.emBetMainType.BTM_HE) {
      //总和
      return CMD_2903.GetGameBetSubZhType(sType);
    } else if (mType === CMD_2903.emBetMainType.BTM_BAN_BO) {
      //半波
      return CMD_2903.GetGameBetSubBbType(sType);
    } else if (
      mType === CMD_2903.emBetMainType.BTM_TE_XIAO ||
      mType === CMD_2903.emBetMainType.BTM_YI_XIAO
    ) {
      //特肖-一肖
      return CMD_2903.GetGameBetSubSxType(sType);
    } else if (mType === CMD_2903.emBetMainType.BTM_LIAN_MA) {
      //连码
      let desc = CMD_2903.GetGameBetSubLmType(sType);
      if (num) {
        return desc + '&' + NumberByteDesc(num);
      }
      return desc;
    } else if (mType === CMD_2903.emBetMainType.BTM_HE_XIAO) {
      //合肖
      return CMD_2903.GetGameBetSubHxType(sType);
    } else if (mType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) {
      //生肖连
      return CMD_2903.GetGameBetSubSxlType(sType);
    } else if (mType === CMD_2903.emBetMainType.BTM_WEI_SHU_LIAN) {
      //尾数连
      return CMD_2903.GetGameBetSubWslType(sType);
    } else if (mType === CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG) {
      //全不中
      return CMD_2903.GetGameBetSubQbzType(sType);
    }
    return '';
  }

  /**
   * @description: 2901获取主区域下注描述
   * @param {number} mType
   * @return {*}
   */
  export function GetGame2904BetMainType(mType: number): string {
    return CMD_2904.GetGameBetMainType(mType);
  }

  /**
   * @description: 2902获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame2904BetSubType(
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    if (
      mType >= CMD_2904.emBetMainType.BTM_RANK_1 &&
      mType <= CMD_2904.emBetMainType.BTM_RANK_10
    ) {
      if (sType === CMD_2904.emBetTypeRank.SBTR_NUM) {
        return NumberByteDesc(num);
      }
      return CMD_2904.GetGameBetSubRankType(sType);
    } else {
      if (sType === CMD_2904.emBetTypeRank.SBTR_NUM) {
        return NumberByteDesc(num);
      }
      return CMD_2904.GetGameBetSubSumType(sType);
    }
  }

  /**
   * @description: 2901获取主区域下注描述
   * @param {number} mType
   * @return {*}
   */
  export function GetGame2905BetMainType(mType: number): string {
    return CMD_2905.GetGameBetMainType(mType);
  }

  /**
   * @description: 2902获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame2905BetSubType(
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    if (mType === CMD_2905.emBetMainType.BTM_HE) {
      return CMD_2905.GetGameBetSubZhType(sType);
    } else if (
      mType >= CMD_2905.emBetMainType.BTM_DING_1 &&
      mType <= CMD_2905.emBetMainType.BTM_DING_5
    ) {
      if (sType === CMD_2905.emSubBetTypeDingWei.SBTD_NUM) {
        return NumberByteDesc(num);
      }
      return CMD_2905.GetGameBetSubDwqType(sType);
    } else if (
      mType >= CMD_2905.emBetMainType.BTM_SAN_QIAN &&
      mType <= CMD_2905.emBetMainType.BTM_SAN_HOU
    ) {
      return CMD_2905.GetGameBetSubQzhType(sType);
    } else if (mType === CMD_2905.emBetMainType.BTM_NIU) {
      if (sType === CMD_2905.emSubBetTypeDouNiug.SBTN_NUM) {
        return NumberByteDesc(num);
      }
      return CMD_2905.GetGameBetSubDnType(sType);
    }
    return '';
  }

  /**
   * @description: NumberByte数组转换
   * @param {Array} num
   * @return {*}
   */
  export function NumberByteDesc(num: Array<any>): string {
    let desc = '';
    for (let i = 0; i < num.length; i++) {
      if (num[i] instanceof BYTE) {
        if (num[i].value === 255) {
          break;
        }
      } else {
        if (num[i] === 255) {
          break;
        }
      }
      if (!num[i]) {
        break;
      }

      desc += num[i].toString();
      desc += ',';
    }
    return desc.length > 0 ? desc.substring(0, desc.length - 1) : '';
  }

  /**
   * @description: 获取游戏主区域下注描述
   * @return {*}
   */
  export function GetGameBetMainType(kindId: number, mType: number): string {
    switch (kindId) {
      case 2801: // 2801_比特币1分28
      case 2802: // 2802_台湾宾果1分28
      case 2803: // 2802_台湾宾果1分28
      case 2804: // 2804_加拿大西1分28
      case 2901: // 2901_加拿大
        return GetGame28BetMainType(mType);
      case 2902: //2902_幸运飞艇
      case 3102:
        return GetGame2902BetMainType(mType);
      case 2903: //香港6合彩
        return GetGame2903BetMainType(mType);
      case 2904: //2904_澳洲幸运10
        return GetGame2904BetMainType(mType);
      case 2905: //2904_澳洲幸运5
      case 3202: //2904_斯洛伐克幸运5
      case 3203: //2904_加拿大幸运5
        return GetGame2905BetMainType(mType);
      case 3501: //3501_加拿大快乐8
        return CMD_3501.GetGame3501BetMainType(mType);
      case 3402: //3402_澳洲六合彩
        return CMD_3402.GetGame3402BetMainType(mType);
    }
    return '';
  }

  /**
   * @description: 子区域描述
   * @param {number} kindId
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGameBetSubType(
    kindId: number,
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    switch (kindId) {
      case 2801: // 2801_比特币1分28
      case 2802: // 2802_台湾宾果1分28
      case 2803: // 2802_台湾宾果1分28
      case 2804: // 2804_加拿大西1分28
      case 2901: // 2901_加拿大
        return GetGame28BetSubType(mType, sType, num);
      case 2902: //2902_幸运飞艇
      case 3102:
        return GetGame2902BetSubType(mType, sType, num);
      case 2903: //香港6合彩
        return GetGame2903BetSubType(mType, sType, num);
      case 2904: //2904_澳洲幸运10
        return GetGame2904BetSubType(mType, sType, num);
      case 2905: //2904_澳洲幸运5
      case 3202: //2904_斯洛伐克幸运5
      case 3203: //2904_加拿大幸运5
        return GetGame2905BetSubType(mType, sType, num);
      case 3501: //3501_台湾宾果快乐8
        return CMD_3501.GetGame3501BetSubType(mType, sType, num);
      case 3402: //3402_澳洲六合彩
        return CMD_3402.GetGame3402BetSubType(mType, sType, num);
    }
    return '';
  }

  /**
   * @description: 获取游戏记录描述信息
   * @param {number} kindId
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetBetRecordDesc(
    kindId: number,
    mType: number,
    sType: number,
    num?: Array<number | BYTE>
  ): string {
    let desc = GetGameBetMainType(kindId, mType);
    return desc + '&' + GetGameBetSubType(kindId, mType, sType, num);
  }

  /**
   * @description: 获取游戏结果类型描述
   * @param {number} kindId
   * @param {number} nResult
   * @return {*}
   */
  export function GetResultDesc(kindId: number, nResult: number): string {
    switch (kindId) {
      case 2801:
      case 2802:
      case 2803:
      case 2804:
      case 2901:
        return GetGame28ResultType(nResult);
      case 2902:
      case 3102:
        return CMD_2902.GetGameResult(nResult);
      case 2904:
        return CMD_2904.GetGameResult(nResult);
      case 2903:
        return CMD_2903.GetGameResult(nResult);
      case 2905:
      case 3202: //2904_斯洛伐克幸运5
      case 3203: //2904_加拿大幸运5
        return CMD_2905.GetGameDnResultDesc(nResult);
      case 3501: //3501_加拿大快乐8
        return CMD_3501.GetGameResult(nResult);
      case 3402: //3402_澳洲六合彩
        return CMD_3402.GetGameResult(nResult);
    }
    return '';
  }

  /**
   * @description: 根据房间等级获取房间等级名
   * @param {number} level
   * @return {*}
   */
  export function GetRoomLevelName(level: number): string {
    if (mapRoomLevelName.has(level)) return mapRoomLevelName.get(level);
    return '';
  }

  /**
   * @description: 获取澳洲5上期结果描述信息
   * @param {Array} tableCard
   * @param {Array} resultType
   * @return {*}
   */
  export function GetGamePeriodNumberResult(
    tableCard: Array<BYTE>,
    resultType: Array<BYTE>
  ): Array<string> {
    return CMD_2905.GetGamePeriodNumberResult(tableCard, resultType);
  }

  /**
   * @description: 获取当前赔率是否是特殊赔率
   * @param {number} kindId
   * @param {number} oddsIndex
   * @return {*}
   */
  export function IsSpecialOdds(kindId: number, oddsIndex: number): boolean {
    switch (kindId) {
      case 2801:
      case 2802:
      case 2803:
      case 2804:
      case 2901:
        return [
          CMD_2801.emMultipleType.MT_T_DA_S,
          CMD_2801.emMultipleType.MT_T_XIAO_S,
          CMD_2801.emMultipleType.MT_T_DAN_S,
          CMD_2801.emMultipleType.MT_T_SHUANG_S,
          CMD_2801.emMultipleType.MT_T_XIAO_DAN_S,
          CMD_2801.emMultipleType.MT_T_DA_SHUANG_S,
        ].includes(oddsIndex);
      case 2903:
        return [
          CMD_2903.emMultipleType.MT_L_SAN_ER_SAN,
          CMD_2903.emMultipleType.MT_L_ER_TE_ER,
        ].includes(oddsIndex);
      case 2902:
      case 3102:
      // return [CMD_2902.emMultipleType.MT_COM_ALL].includes(oddsIndex);
      case 2904:
      // return [CMD_2904.emMultipleType.MT_COUNT].includes(oddsIndex);
      case 2905:
      case 3202: //2904_斯洛伐克幸运5
      case 3203: //2904_加拿大幸运5
      // return [CMD_2905.emMultipleType.MT_COUNT].includes(oddsIndex);
    }
    return false;
  }
  // 获取对应游戏
  export function GetGameConfigInfo(curGameId: number, key: string) {
    switch (curGameId) {
      case 2801:
      case 2802:
      case 2803:
      case 2804:
      case 2901:
        return CMD_2801[key];
      case 2905:
        return CMD_2905[key];
      case 3102:
        return CMD_3102[key];
      case 3202:
        return CMD_3202[key];
      case 3203:
        return CMD_3203[key];
      case 3501:
        return CMD_3501[key];
      case 3402:
        return CMD_3402[key];
      default:
        return null;
    }
  }

  const getName = (oddsIndex: number): string => {
    switch (oddsIndex) {
      case CMD_2801.emMultipleType.MT_T_DA_S:
        return '特码-大';
      case CMD_2801.emMultipleType.MT_T_XIAO_S:
        return '特码-小';
      case CMD_2801.emMultipleType.MT_T_DAN_S:
        return '特码-单';
      case CMD_2801.emMultipleType.MT_T_SHUANG_S:
        return '特码-双';
      case CMD_2801.emMultipleType.MT_T_XIAO_DAN_S:
        return '特码-小单';
      case CMD_2801.emMultipleType.MT_T_DA_SHUANG_S:
        return '特码-大双';
      default:
        return '';
    }
  };

  const getId = (name: string): number => {
    switch (name) {
      case '特码-大':
        return CMD_2801.emMultipleType.MT_T_DA_S;
      case '特码-小':
        return CMD_2801.emMultipleType.MT_T_XIAO_S;
      case '特码-单':
        return CMD_2801.emMultipleType.MT_T_DAN_S;
      case '特码-双':
        return CMD_2801.emMultipleType.MT_T_SHUANG_S;
      case '特码-小单':
        return CMD_2801.emMultipleType.MT_T_XIAO_DAN_S;
      case '特码-大双':
        return CMD_2801.emMultipleType.MT_T_DA_SHUANG_S;
      default:
        return 0;
    }
  };

  // 判断当前 id 是否是特殊赔率返回neme
  export function GetOddsName(curGameId: number, oddsIndex: number): string {
    if (
      [
        CMD_2801.emMultipleType.MT_T_DA_S,
        CMD_2801.emMultipleType.MT_T_XIAO_S,
        CMD_2801.emMultipleType.MT_T_DAN_S,
        CMD_2801.emMultipleType.MT_T_SHUANG_S,
        CMD_2801.emMultipleType.MT_T_XIAO_DAN_S,
        CMD_2801.emMultipleType.MT_T_DA_SHUANG_S,
        CMD_2903.emMultipleType.MT_L_SAN_ER_SAN,
        CMD_2903.emMultipleType.MT_L_ER_TE_ER,
      ].includes(oddsIndex)
    ) {
      switch (curGameId) {
        case 2801:
        case 2802:
        case 2803:
        case 2804:
          return getName(oddsIndex);
        default:
          return null;
      }
    }
    return '';
  }

  // 判断当前 id 是否是特殊赔率返回neme
  export function GetOddsID(curGameId: number, name: string): number {
    switch (curGameId) {
      case 2801:
      case 2802:
      case 2803:
      case 2804:
      case 2901:
        return getId(name);
      default:
        return 0;
    }
  }

  /**
   * 长龙的映射
   * @param curGameId 游戏id
   * @param clM 主码
   * @param clS 子码
   * @param isBets 返回注单名称还是号码数组
   */
  export function CLSubTypeMap(
    curGameId: number,
    clM: number,
    clS: number,
    isBets?: boolean
  ) {
    switch (curGameId) {
      case 2901:
        return CMD_2901.getCLNameOrBets(clM, clS, isBets);
      case 2902:
        return CMD_2902.getCLNameOrBets(clM, clS, isBets);
      case 2904:
        return CMD_2904.getCLNameOrBets(clM, clS, isBets);
      case 2905:
        return CMD_2905.getCLNameOrBets(clM, clS, isBets);
      case 3102:
        return CMD_3102.getCLNameOrBets(clM, clS, isBets);
      case 3202:
        return CMD_3202.getCLNameOrBets(clM, clS, isBets);
      case 3203:
        return CMD_3203.getCLNameOrBets(clM, clS, isBets);
      default:
        return isBets ? [] : '';
    }
  }
}
