import { DataBuffer } from '@/engine/base/databuffer';
import {
  BYTE,
  CSTRING,
  CreateArray,
  CreateObject,
  DWORD,
  SCORE,
  Struct,
  WORD,
} from '../../base/basetype';
import i18n from 'i18next';

export namespace common {
  // 验证码
  export const COMPILATIO: string = 'F31A3F6F-3615-4788-90E2-0E34A33D7BD5';

  export const LEN_MD5: number = 33; //MD5最大长度

  export const LEN_SIGN: number = 33; //签名最大长度

  export const LEN_TOKEN: number = 33; //Token最大长度

  export const LEN_GUID: number = 37; //GUID最大长度

  export const LEN_MACHINE_ID: number = 33; //序列长度

  export const LEN_NICKNAME: number = 33; //昵称最大长度

  export const LEN_USER_CHAT: number = 128; //聊天长度

  export const LEN_SSC_BET_COUNT: number = 300; //单次最大下注数目

  export const MAX_ISSUE_LEN: number = 20; //期号长度

  export const MDM_KN_COMMAND: number = 0; //内核主命令

  export const SUB_KN_DETECT_SOCKET: number = 1; //检测命令

  export const SUB_KN_IP_SOCKET: number = 2; //发送地址

  export const SUB_KN_VALIDATE_SOCKET: number = 3; //验证命令

  export const SUB_KN_SHUT_DOWN_SOCKET: number = 2; //关闭命令

  export const SUB_KN_VALIDATE_SOCKET_WEB: number = 5; //验证码

  export const MDM_DATAKIND: number = 0; //是否映射

  export const MAX_SSC_RESULT_COUNT: number = 100; //SSC记录最大数量

  export const MAX_SSC_TABLE_CARD_COUNT: number = 20; //SSC游戏结果最大数量

  export const MAX_SSC_NUMBER_COUNT: number = 12; //SSC自选号码最大数量

  export const MAX_SSC_RESULT_TYPE_COUNT: number = 50; //SSC开奖结果类型最大数量

  export const MAX_SSC_FOLLOW: number = 1440; //预测号码最大自动跟注数

  export const MAX_SSC_CHANG_LONG_SUB_COUNT: number = 3; //SSC长龙子类型最大数量

  export const MAX_SSC_CHANG_LONG_RECORD_COUNT: number = 50; //SSC长龙记录最大数量

  export const GOLD_RATIO: number = 10000; //金币比例

  export const MAX_FORECAST_EXPERT: number = 20; // 预测号码最大专家人数
  export const MAX_FORECAST_COUNT: number = 10; //预测号码最大数量

  // C++下系统时间结构体
  export class SYSTEMTIME extends Struct {
    wYear = CreateObject(WORD); //主类型
    wMonth = CreateObject(WORD); //主类型
    wDayOfWeek = CreateObject(WORD); //主类型
    wDay = CreateObject(WORD); //主类型
    wHour = CreateObject(WORD); //主类型
    wMinute = CreateObject(WORD); //主类型
    wSecond = CreateObject(WORD); //主类型
    wMilliseconds = CreateObject(WORD); //主类型

    format(fmt: string = 'yyyy-MM-dd hh:mm:ss'): string {
      const o = {
        'M+': this.wMonth.value, //月
        'd+': this.wDay.value, //日
        'h+': this.wYear.value, //小时
        'm+': this.wMinute.value, //分
        's+': this.wSecond.value, //秒
        'q+': Math.floor((this.wMonth.value + 3) / 3), //季度
        S: this.wMilliseconds.value, //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.wYear.value + '').substr(4 - RegExp.$1.length)
        );
      for (const k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
      return fmt;
    }
  }

  // 游戏通用下注头部（期号）
  export class tagCommonBetClientHead extends Struct {
    cPeriodNumber = CreateObject(CSTRING, MAX_ISSUE_LEN); // 期号
    wBetCount = CreateObject(WORD); // 注单数
    wMultipleCount = CreateObject(WORD); // 特殊赔率数
  }

  // 通用下注区域信息
  export class tagCommonAreaInfo extends Struct {
    cbBetMainType = CreateObject(BYTE); //主类型
    cbBetSubType = CreateObject(BYTE); //子类型
    cbNumber = CreateArray(BYTE, [MAX_SSC_NUMBER_COUNT]); //自选号码
  }

  //通用下注信息
  export class tagCommonBetInfo extends Struct {
    AreaInfo = CreateObject(tagCommonAreaInfo); // 下注区域
    lBetScore = CreateObject(SCORE); //下注金额
    dwNormalMultiple = CreateObject(DWORD); //校验常规赔率
  }

  // 通用用户下注
  export class CMD_C_PlaceBet extends Struct {
    placeBetHead = CreateObject(tagCommonBetClientHead);
    tagCommonBetInfo = CreateArray(
      tagCommonBetInfo,
      [LEN_SSC_BET_COUNT],
      0,
      true
    ); // 下注注单信息
    tagSpecialMultiple = CreateArray(
      tagSpecialMultiple,
      [LEN_SSC_BET_COUNT],
      0,
      true
    ); // 下注特殊赔率信息
  }

  // 查询预测专家排名(入参)
  export class CMD_C_ForecastRank extends Struct {
    wPlanID = CreateObject(WORD); // 计划ID
    wAreaID = CreateObject(WORD); // 区域ID
  }

  // SSC开奖预测专家信息
  export class tagSSCForecastExpert extends Struct {
    wExpertID = CreateObject(WORD); //预测专家ID
    wSeriesWinCount = CreateObject(WORD); //连赢局数
    dwWinRate = CreateObject(DWORD); //胜率(万分比)
    lWinScore = CreateObject(SCORE); //总盈亏
  }

  // SSC开奖预测专家状态
  export class tagSSCForecastExpertStatus extends Struct {
    ExpertInfo = CreateObject(tagSSCForecastExpert); // 专家基础信息
    wRankID = CreateObject(WORD); // 专家排行
    cbNumber = CreateArray(BYTE, [MAX_FORECAST_COUNT]); // 预测号码
  }

  // SSC开奖预测排名(跟单计划通用出参)
  export class tagSSCForecastRank extends Struct {
    wCurrRound = CreateObject(WORD); // 当前轮数
    wRoundCount = CreateObject(WORD); // 总轮数
    ExpertList = CreateArray(
      tagSSCForecastExpertStatus,
      [MAX_FORECAST_EXPERT],
      0,
      true
    ); // 专家列表
  }

  /**
   * @description: 通用结构体
   */
  //下注失败信息
  export class tagBetFailInfo extends Struct {
    cbFailType = CreateObject(BYTE); //失败类型
    BetInfo = CreateObject(tagCommonBetInfo);
  }

  //下注限额信息
  export class tagBetFailLimitInfo extends Struct {
    lTotalBetScore = CreateObject(SCORE); //累积下注金额
    lMinScore = CreateObject(SCORE); //单注最小限额
    lMaxScore = CreateObject(SCORE); //单注最大限额
    lAreaScore = CreateObject(SCORE); //单账号限额
    lMainTypeScore = CreateObject(SCORE); //主区域最大下注
  }

  //跟随下注失败信息
  export class tagFollowBetFailInfo extends Struct {
    cbFailType = CreateObject(BYTE); //失败类型
  }

  //赔率区域信息
  export class tagMultipleAreaInfo extends Struct {
    cbBetMainType = CreateObject(BYTE); //主类型
    cbBetSubType = CreateObject(BYTE); //子类型
    cbNumber = CreateArray(BYTE, [2]); //自选号码
  }

  // 特殊赔率
  export class tagSpecialMultiple extends Struct {
    wBetIndex = CreateObject(WORD);
    wID = CreateObject(WORD); // 特殊赔率对应的ID 倍数类型emMultipleType[下标]
    dwMultiple = CreateObject(DWORD); // 特殊赔率的值
  }

  //动态赔率信息
  export class tagDynamicMultiple extends Struct {
    AreaInfo = CreateObject(tagCommonAreaInfo); //区域信息
    wMultipleID = CreateObject(WORD); // 赔率对应的ID
    dwMultiple = CreateObject(DWORD); //赔率(实际赔率=配置值/10000)
  }

  //通用SSC游戏记录
  export class tagCommonSSCRecordInfo extends Struct {
    cPeriodNumber = CreateObject(CSTRING, MAX_ISSUE_LEN);
    cbTableCard = CreateArray(BYTE, [MAX_SSC_TABLE_CARD_COUNT]);
    cbResultType = CreateArray(BYTE, [MAX_SSC_RESULT_TYPE_COUNT]);
  }

  //SSC开奖预测专家位置
  export class tagSSCForecastExpertPos extends Struct {
    wPlanID = CreateObject(WORD); //预测计划ID
    wAreaID = CreateObject(WORD); //预测区域ID
    wExpertID = CreateObject(WORD); //预测专家ID
  }

  //自动跟随下注
  export class tagAutoFollowBet extends Struct {
    cbFollowType = CreateObject(BYTE); //跟注类型
    lBetScore = CreateObject(SCORE); //下注金额
  }

  //自动跟随下注开始
  export class tagAutoFollowBetStart extends Struct {
    ExpertPos = CreateObject(tagSSCForecastExpertPos); //专家位置
    cStartPeriod = CreateObject(CSTRING, MAX_ISSUE_LEN); //起始期号
    wBetCount = CreateObject(WORD); //下注期数
    BetInfo = CreateArray(tagAutoFollowBet, [MAX_SSC_FOLLOW], 0, true); //跟注信息
  }

  //SSC长龙信息Item
  export class tagSSCChangLongInfoItem extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    cbChangLongMainType = CreateObject(BYTE); //长龙主类型
    cbChangLongSubType = CreateObject(BYTE); //长龙子类型
    cPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //期号
    wSeriesCount = CreateObject(WORD); //连开期数
  }
  //SSC长龙信息Mult
  export class tagSSCChangLongInfoMult extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    cbChangLongMainType = CreateObject(BYTE); //长龙主类型
    cbChangLongSubType = CreateObject(BYTE); //长龙子类型
    dwNormalMultiple = CreateObject(DWORD); //常规赔率
    dwSpecialMultiple = CreateObject(DWORD); //特殊赔率
  }
  //SSC长龙信息Record
  export class tagSSCChangLongInfoRecord extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    cbChangLongMainType = CreateObject(BYTE); //长龙主类型
    wCount = CreateArray(WORD, [MAX_SSC_CHANG_LONG_SUB_COUNT]); //累开期数
    cbType = CreateArray(BYTE, [MAX_SSC_CHANG_LONG_RECORD_COUNT]); //游戏记录
  }
  //SSC长龙信息Bet
  export class tagSSCChangLongInfoBet extends Struct {
    wKindID = CreateObject(WORD); //游戏ID
    cbChangLongMainType = CreateObject(BYTE); //长龙主类型
    lBetScore = CreateArray(SCORE, [MAX_SSC_CHANG_LONG_SUB_COUNT]); //下注信息
  }

  // 聊天类型
  export enum ChatType {
    Talk, //聊天
    Image, //图片
    LookID, //表情id
  }

  // 聊天下注类型
  export enum ChatBetType {
    Self,
    All,
  }

  // 聊天下注类型
  export enum ChatNotifyStatus {
    Off,
    On,
  }

  //下注失败类型
  export enum emBetFailType {
    BFT_NULL = 0,
    BFT_SCORE, //金币不足
    BFT_TYPE, //类型错误
    BFT_NOT_BET, //不在下注阶段
    BFT_PERIOD, //期号错误
    BFT_DISABLE, //禁用区域
    BFT_LIMIT_NULL, //下注限额-未知错误
    BFT_LIMIT_MIN, //下注限额-单注最小
    BFT_LIMIT_MAX, //下注限额-单注最大
    BFT_LIMIT_AREA, //下注限额-单区域
    BFT_LIMIT_MAIN, //下注限额-主区域
    BFT_RATE_ERROR,
    ///比例錯誤
    BFT_MUTEX,
    ///区域互斥
  }

  // 开奖预测计划类型(pc28游戏通用)
  export enum emForecastPlanType {
    FPT_5 = 0, // 5码计划
    FPT_6, // 6码计划
    FPT_7, // 7码计划
    FPT_8, // 8码计划
    FPT_COUNT = 4, // 预测计划总数
    FPT_INVALID = 0xff, // 无效开奖预测计划类型
  }

  // 计划类型数组
  export const planTypes = [
    {
      value: emForecastPlanType.FPT_5,
      text: `${i18n.t('wu_ma_plan')}`,
      name: '5码',
      length: 5,
    },
    {
      value: emForecastPlanType.FPT_6,
      text: `${i18n.t('liu_ma_plan')}`,
      name: '6码',
      length: 6,
    },
    {
      value: emForecastPlanType.FPT_7,
      text: `${i18n.t('qi_ma_plan')}`,
      name: '7码',
      length: 7,
    },
    {
      value: emForecastPlanType.FPT_8,
      text: `${i18n.t('ba_ma_plan')}`,
      name: '8码',
      length: 8,
    },
  ];

  // 开奖预测区域类型(pc28游戏通用)
  export enum emForecastAreaType {
    FAT_D1 = 0, // 第一球
    FAT_D2, // 第二球
    FAT_D3, // 第三球
    FAT_COUNT = 3, //预测区域总数
    FAT_INVALID = 0xff, //无效开奖预测区域类型
  }
  // 区域类型数组
  export const areaTypes = [
    { value: emForecastPlanType.FPT_5, text: `${i18n.t('location_one')}` },
    { value: emForecastPlanType.FPT_6, text: `${i18n.t('location_two')}` },
    { value: emForecastPlanType.FPT_7, text: `${i18n.t('location_three')}` },
  ];

  /**
   * @description:
   * @param {*} cbFailType
   * @return {*}
   */
  export function GamePlaceJettonFail(cbFailType): string {
    var strFailDesc = '';
    //金币不足
    if (cbFailType === emBetFailType.BFT_SCORE) {
      strFailDesc = `${i18n.t('notGlobe')}`;
    }
    //下注类型错误
    else if (cbFailType === emBetFailType.BFT_TYPE) {
      strFailDesc = `${i18n.t('areaFaile')}`;
    }
    //不在下注阶段
    else if (cbFailType === emBetFailType.BFT_NOT_BET) {
      strFailDesc = `${i18n.t('issueClosed')}`;
    }
    //期号错误
    else if (cbFailType === emBetFailType.BFT_PERIOD) {
      strFailDesc = `${i18n.t('issueOver')}`;
    }
    //区域禁用
    else if (cbFailType === emBetFailType.BFT_DISABLE) {
      strFailDesc = `${i18n.t('areaDisabled')}`;
    }
    //区域互斥
    else if (cbFailType === emBetFailType.BFT_MUTEX) {
      strFailDesc = `${i18n.t('areaReject')}`;
    }
    //比例校验错误！
    else if (cbFailType === emBetFailType.BFT_RATE_ERROR) {
      strFailDesc = `${i18n.t('oddChangeReplaceBet')}`;
    }
    return strFailDesc;
  }

  /**
   * @description:
   * @param {tagBetFailLimitInfo} bet
   * @return {*}
   */
  export function GameBetFaild(
    cbFailType: number,
    bet: tagBetFailLimitInfo
  ): string {
    let strFailDesc = '';
    switch (cbFailType) {
      case emBetFailType.BFT_LIMIT_MIN:
        strFailDesc += `${i18n.t('singleMin')}:${
          bet.lMinScore.isLong()
            ? bet.lMinScore.value.div(GOLD_RATIO).toString()
            : bet.lMinScore.value / GOLD_RATIO
        }`;
        break;
      case emBetFailType.BFT_LIMIT_MAX:
        strFailDesc += `${i18n.t('singleMax')}:${
          bet.lMaxScore.isLong()
            ? bet.lMaxScore.value.div(GOLD_RATIO).toString()
            : bet.lMaxScore.value / GOLD_RATIO
        }`;
        break;
      case emBetFailType.BFT_LIMIT_AREA:
        strFailDesc = `${i18n.t('sumBetAmount')}:${
          bet.lTotalBetScore.isLong()
            ? bet.lTotalBetScore.value.div(GOLD_RATIO).toString()
            : bet.lTotalBetScore.value / GOLD_RATIO
        }\n`;
        strFailDesc += `${i18n.t('singleAccountBet')}:${
          bet.lAreaScore.isLong()
            ? bet.lAreaScore.value.div(GOLD_RATIO).toString()
            : bet.lAreaScore.value / GOLD_RATIO
        }`;
        break;
      case emBetFailType.BFT_LIMIT_MAIN:
        strFailDesc = `${i18n.t('sumBetAmount')}:${
          bet.lTotalBetScore.isLong()
            ? bet.lTotalBetScore.value.div(GOLD_RATIO).toString()
            : bet.lTotalBetScore.value / GOLD_RATIO
        }\n`;
        strFailDesc += `${i18n.t('areaQuota')}:${
          bet.lMainTypeScore.isLong()
            ? bet.lMainTypeScore.value.div(GOLD_RATIO).toString()
            : bet.lMainTypeScore.value / GOLD_RATIO
        }`;
        break;
      default:
        strFailDesc = `${i18n.t('betFailed')}`;
        break;
    }
    return strFailDesc;
  }

  /**
   * @description: 统一获取下注错误提示
   * @param {DataBuffer} data
   * @return {*}
   */
  export function GetBetFaildDesc(data: DataBuffer): string {
    let betFaild = data.toStruct(tagBetFailInfo); //下注失败统一处理
    let strBetFaildTip = '';
    if (
      betFaild.cbFailType.value >= emBetFailType.BFT_LIMIT_NULL &&
      betFaild.cbFailType.value <= emBetFailType.BFT_LIMIT_MAIN
    ) {
      //自己构造
      let betFaildLimitInfo = data.toStruct(tagBetFailLimitInfo);
      strBetFaildTip = GameBetFaild(
        betFaild.cbFailType.value,
        betFaildLimitInfo
      );
    } else {
      strBetFaildTip = GamePlaceJettonFail(betFaild.cbFailType.value);
    }
    return strBetFaildTip;
  }

  /**
   * @description: 生成Guid
   * @return {*}
   */
  export function Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
