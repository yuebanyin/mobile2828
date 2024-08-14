import { CreateObject, CreateArray, CreateArray2, BOOL, BYTE, INT, CSTRING, DWORD, SCORE, Struct, WORD } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';

export namespace CMD_3501 {
  //下注主类型
  export enum emBetMainType {
    BTM_HE = 0, //总和
    BTM_FENBU, //分布
    BTM_RENXUAN, //任选
    BTM_COUNT, //下注类型数目
    BTM_INVALID = 0xff, //无效下注类型
  }

  //下注子类型 - 总和
  export enum emSubBetTypeHe {
    SBTH_DA = 0, //大
    SBTH_XIAO, //小
    SBTH_DAN, //单
    SBTH_SHUANG, //双
    SBTH_DA_DAN, //大单
    SBTH_XIAO_DAN, //小单
    SBTH_DA_SHUANG, //大双
    SBTH_XIAO_SHUANG, //小双
    SBTH_JIN, //金
    SBTH_MU, //木
    SBTH_SHUI, //水
    SBTH_HUO, //火
    SBTH_TU, //土
    SBTH_COUNT, //子类型数目
  }

  //下注子类型 - 分布
  export enum emSubBetTypeFenBu {
    SBTF_JI = 0, //奇
    SBTF_HE, //和
    SBTF_OU, //偶
    SBTF_SHANG, //上
    SBTF_ZHONG, //中
    SBTF_XIA, //下
    SBTF_COUNT, //子类型数目
  }

  //下注子类型 - 任选
  export enum emSubBetTypeRenXuan {
    SBTR_XUAN1 = 0, //任选一-【自选】【1】
    SBTR_XUAN2, //任选二-【自选】【2】
    SBTR_XUAN3, //任选三-【自选】【3】
    SBTR_XUAN4, //任选四-【自选】【4】
    SBTR_XUAN5, //任选五-【自选】【5】
    SBTR_COUNT, //子类型数目
  }

  export const emBetSubTypeNames = ['emSubBetTypeHe', 'emSubBetTypeFenBu', 'emSubBetTypeRenXuan'];

  //区域限制类型
  export enum emLimitType {
    LT_H_DA = 0, //总和-大
    LT_H_XIAO, //总和-小
    LT_H_DAN, //总和-单
    LT_H_SHUANG, //总和-双
    LT_H_DA_DAN, //总和-大单
    LT_H_XIAO_DAN, //总和-小单
    LT_H_DA_SHUANG, //总和-大双
    LT_H_XIAO_SHUANG, //总和-小双
    LT_H_JIN, //总和-金
    LT_H_MU, //总和-木
    LT_H_SHUI, //总和-水
    LT_H_HUO, //总和-火
    LT_H_TU, //总和-土
    LT_F_JI, //分布-奇
    LT_F_HE, //分布-和
    LT_F_OU, //分布-偶
    LT_F_SHANG, //分布-上
    LT_F_ZHONG, //分布-中
    LT_F_XIA, //分布-下
    LT_R_XUAN1, //任选-任选一
    LT_R_XUAN2, //任选-任选二
    LT_R_XUAN3, //任选-任选三
    LT_R_XUAN4, //任选-任选四
    LT_R_XUAN5, //任选-任选五
    LT_COUNT, //区域限制类型数目
    LT_INVALID = 0xff, //无效区域限制类型
  }

  //倍数类型
  export enum emMultipleType {
    MT_H_DA = 0, //总和-大
    MT_H_XIAO, //总和-小
    MT_H_DAN, //总和-单
    MT_H_SHUANG, //总和-双
    MT_H_DA_DAN, //总和-大单
    MT_H_XIAO_DAN, //总和-小单
    MT_H_DA_SHUANG, //总和-大双
    MT_H_XIAO_SHUANG, //总和-小双
    MT_H_JIN, //总和-金
    MT_H_MU, //总和-木
    MT_H_SHUI, //总和-水
    MT_H_HUO, //总和-火
    MT_H_TU, //总和-土
    MT_F_JI, //分布-奇
    MT_F_HE, //分布-和
    MT_F_OU, //分布-偶
    MT_F_SHANG, //分布-上
    MT_F_ZHONG, //分布-中
    MT_F_XIA, //分布-下
    MT_R_XUAN1, //任选-任选一
    MT_R_XUAN2, //任选-任选二
    MT_R_XUAN3, //任选-任选三
    MT_R_XUAN3_3, //任选-任选三中三
    MT_R_XUAN4, //任选-任选四
    MT_R_XUAN4_3, //任选-任选四中三
    MT_R_XUAN4_4, //任选-任选四中四
    MT_R_XUAN5, //任选-任选五
    MT_R_XUAN5_4, //任选-任选五中四
    MT_R_XUAN5_5, //任选-任选五中五
    MT_COM_HE, //通用-和局
    MT_COUNT, //倍数限制类型数目
    MT_INVALID = 0xffff, //无效倍数类型
  }

  //开奖结果位置类型
  export enum emResultPosType {
    RPT_H_DX = 0, //总和-大小
    RPT_H_DS, //总和-单双
    RPT_H_WUXING, //总和-五行
    RPT_F_JHO, //分布-奇和偶
    RPT_F_SZX, //分布-上中下
    RPT_COUNT, //结果位置类型数目
    RPT_INVALID = 0xff, //无效结果位置类型
  }

  //开奖结果类型
  export enum emResultType {
    RT_DA = 0, //大
    RT_XIAO, //小
    RT_DAN, //单
    RT_SHUANG, //双
    RT_JIN, //金
    RT_MU, //木
    RT_SHUI, //水
    RT_HUO, //火
    RT_TU, //土
    RT_JI, //奇
    RT_HE, //和
    RT_OU, //偶
    RT_SHANG, //上
    RT_ZHONG, //中
    RT_XIA, //下
    RT_COM_HE, //和局
    RT_INVALID = 0xff, //无效开奖结果类型
  }

  //长龙主类型
  export enum emChangLongMainType {
    CLMT_H_DX = 0, //总和-大小
    CLMT_H_DS, //总和-单双
    CLMT_F_JHO, //分布-奇和偶
    CLMT_F_SZX, //分布-上中下
    CLMT_COUNT, //长龙主类型数目
    CLMT_INVALID = 0xff, //无效长龙主类型
  }

  //长龙子类型 - 总和-大小
  export enum emChangLongSubTypeHeDX {
    CLST_HDX_DA = 0, //大
    CLST_HDX_XIAO, //小
  }

  //长龙子类型 - 总和-单双
  export enum emChangLongSubTypeHeDS {
    CLST_HDS_DAN, //单
    CLST_HDS_SHUANG, //双
  }

  //长龙子类型 - 分布-奇和偶
  export enum emChangLongSubTypeFenBuJHO {
    CLST_FJHO_JI, //奇
    CLST_FJHO_HE, //和
    CLST_FJHO_OU, //偶
  }

  //长龙子类型 - 分布-上中下
  export enum emChangLongSubTypeFenBuSZX {
    CLST_FSZX_SHANG, //上
    CLST_FSZX_ZHONG, //中
    CLST_FSZX_XIA, //下
  }

  export const GAME_SCENE_FREE: number = 0; //等待开始

  export const GAME_SCENE_BET: number = 100; //下注状态

  export const GAME_SCENE_WAIT: number = 101; //封盘状态

  export const MAX_NUMBER_COUNT: number = 5; //最大自选号码数目

  export const LEN_SINGLE_BET_SUB: number = emSubBetTypeHe.SBTH_COUNT; //最大子类型长度(单一区域)

  export const COUNT_OF_CARS: number = 20; //开奖结果

  export const MAX_SEND_HISTORY: number = 50; //开奖记录

  export const JETTON_COUNT: number = 9; //筹码档位数目

  export const MAX_MUTEX_SUBTYPE_COUNT: number = 4; //最大互斥子区域数目

  export const SUB_CHANG_LONG_INVALID: number = 0xff; //无效长龙子类型

  export const MAX_SUB_CHANG_LONG_COUNT: number = 3; //最大长龙子类型数目

  export const LEN_NUMBER: number = 1; //最大开奖数值数量

  export const MAX_DYNAMIC_MULTIPLE_COUNT: number = 0xff; //最大动态赔率档位

  export const SOURCE_DATA_COUNT: number = 20; //源数据数量

  export const MAX_SOURCE_DATA_LEN: number = 2; //源数据长度

  export const MAX_ROBOT_BET_COUNT: number = 5; //单笔下注最大数量

  export const MAX_ROBOT_BET_ITEM_COUNT: number = 16; //下注组合最大数量

  export const MAX_ROBOT_BET_SCORE_COUNT: number = 50; //下注金额配置数量

  export class tagMultipleDeduct extends Struct {
    lBetScoreUnit = CreateObject(SCORE); //总投注每满足N递减赔率(可重复)
    dwDeductMultiple = CreateObject(DWORD); //赔率递减单位(实际赔率=配置值/10000)
  }
  export class tagRecordInfo extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //期号
    cbTableCard = CreateArray(BYTE, [COUNT_OF_CARS]); //开奖结果
    szSourceData = CreateArray2(CSTRING, [SOURCE_DATA_COUNT, MAX_SOURCE_DATA_LEN], MAX_SOURCE_DATA_LEN); //号源数据
    cbResultType = CreateArray(BYTE, [emResultPosType.RPT_COUNT]); //结果类型
    stRequestTime = CreateObject(common.SYSTEMTIME); //号源抓取时间
  }
  export class tagRobotConfig extends Struct {
    nBetProbability = CreateObject(INT); //单个机器人下注概率（万分比）
    wAreaCount = CreateObject(WORD); //下注区域组合数量
    BetArea = CreateArray2(common.tagCommonAreaInfo, [MAX_ROBOT_BET_ITEM_COUNT, MAX_ROBOT_BET_COUNT]); //下注区域组合配置
    lMinBetScore = CreateObject(SCORE); //最小下注金额
    lMaxBetScore = CreateObject(SCORE); //最大下注金额
    lUnitBetScore = CreateObject(SCORE); //下注金额单元
    bAllowAdvanceBet = CreateObject(BOOL); //是否允许提前下注
  }

  export const SUB_S_SCENE_CHANGE: number = 100; //场景切换

  export const SUB_S_PLACE_JETTON: number = 101; //用户下注

  export const SUB_S_PLACE_JETTON_SUCCESS: number = 102; //下注成功

  export const SUB_S_PLACE_JETTON_FAILURE: number = 103; //下注失败

  export const SUB_S_GAME_END: number = 104; //游戏结束

  export const SUB_S_HISTORY: number = 105; //游戏记录

  export const SUB_S_ROBOT_CONFIG: number = 106; //机器人配置

  export const SUB_S_UPDATE_CONFIG: number = 107; //配置刷新

  export const SUB_S_DYNAMIC_MULTIPLE: number = 108; //动态赔率

  export const SUB_S_DYNAMIC_MULTIPLE_END: number = 109; //动态赔率发送结束

  export const SUB_S_QUERY_ALLIN: number = 110; //查询AllIn信息

  export class tagBaseConfig extends Struct {
    lBetChip = CreateArray(SCORE, [JETTON_COUNT]); //下注按钮数值
    lLimitScore = CreateArray2(SCORE, [emLimitType.LT_COUNT, 4]); //区域限额(最小/单注/单号/区域)
    dwMultiple = CreateArray(DWORD, [emMultipleType.MT_COUNT]); //常规区域倍数(赔率=配置值/10000)
  }
  export class CMD_S_GameScene extends Struct {
    dwTimeLeave = CreateObject(DWORD); //剩余时间
    dwAllSeconds = CreateObject(DWORD); //总时间
    dwTrunSeconds = CreateObject(DWORD); //每轮时间
    dwValidSeconds = CreateObject(DWORD); //投注时间
    stGameConfig = CreateObject(tagBaseConfig); //基础配置
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
  }
  export class CMD_S_SceneChange extends Struct {
    cbSceneStatus = CreateObject(BYTE); //游戏状态
    dwAllSeconds = CreateObject(DWORD); //总时间
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
  }
  export class CMD_S_QueryAllInInfo extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    lMaxBetScore = CreateObject(SCORE); //最大可下注
  }
  export class CMD_S_GameEnd extends Struct {
    stRecordInfo = CreateObject(tagRecordInfo); //结束信息
  }
  export class CMD_S_DynamicMultiple extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    stMultipleList = CreateArray(common.tagDynamicMultiple, [100]); //动态赔率
  }
  export const SUB_C_PLACE_JETTON: number = 1; //用户下注

  export const SUB_C_QUERY_ALLIN: number = 2; //查询AllIn信息

  // 3501 主码映射描述
  export const map3501MainType = new Map<number, string>([
    [CMD_3501.emBetMainType.BTM_HE, '总和'],
    [CMD_3501.emBetMainType.BTM_FENBU, '分布'],
    [CMD_3501.emBetMainType.BTM_RENXUAN, '任选'],
    [CMD_3501.emBetMainType.BTM_COUNT, '下注类型条目'],
  ]);

  /**
   * @description: 获取主下注类型描述
   * @return {*}
   */
  export function GetGame3501BetMainType(mType: number): string {
    if (map3501MainType.has(mType)) return map3501MainType.get(mType);
    return '';
  }

  // 下注子类型 - 总和
  const mapSumType = new Map<number, string>([
    [emSubBetTypeHe.SBTH_DA, '大'],
    [emSubBetTypeHe.SBTH_XIAO, '小'],
    [emSubBetTypeHe.SBTH_DAN, '单'],
    [emSubBetTypeHe.SBTH_SHUANG, '双'],
    [emSubBetTypeHe.SBTH_DA_DAN, '大单'],
    [emSubBetTypeHe.SBTH_XIAO_DAN, '小单'],
    [emSubBetTypeHe.SBTH_DA_SHUANG, '大双'],
    [emSubBetTypeHe.SBTH_XIAO_SHUANG, '小双'],
    [emSubBetTypeHe.SBTH_JIN, '金'],
    [emSubBetTypeHe.SBTH_MU, '木'],
    [emSubBetTypeHe.SBTH_SHUI, '水'],
    [emSubBetTypeHe.SBTH_HUO, '火'],
    [emSubBetTypeHe.SBTH_TU, '土'],
  ]);

  // 下注子类型 - 分布
  const mapFenBuType = new Map<number, string>([
    [emSubBetTypeFenBu.SBTF_JI, '奇'],
    [emSubBetTypeFenBu.SBTF_HE, '和'],
    [emSubBetTypeFenBu.SBTF_OU, '偶'],
    [emSubBetTypeFenBu.SBTF_SHANG, '上'],
    [emSubBetTypeFenBu.SBTF_ZHONG, '中'],
    [emSubBetTypeFenBu.SBTF_XIA, '下'],
  ]);

  // 下注子类型 - 任选
  const mapRenXuanType = new Map<number, string>([
    [emSubBetTypeRenXuan.SBTR_XUAN1, '任选一'],
    [emSubBetTypeRenXuan.SBTR_XUAN2, '任选二'],
    [emSubBetTypeRenXuan.SBTR_XUAN3, '任选三'],
    [emSubBetTypeRenXuan.SBTR_XUAN4, '任选四'],
    [emSubBetTypeRenXuan.SBTR_XUAN5, '任选五'],
  ]);

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
   * @description: 3501获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame3501BetSubType(mType: number, sType: number, num?: Array<number | BYTE>): string {
    if (mType === CMD_3501.emBetMainType.BTM_HE) {
      //总和
      return mapSumType.get(sType);
    } else if (mType === CMD_3501.emBetMainType.BTM_FENBU) {
      return mapFenBuType.get(sType);
    } else if (mType === CMD_3501.emBetMainType.BTM_RENXUAN) {
      let desc = mapRenXuanType.get(sType);
      if (num) {
        return (desc += NumberByteDesc(num));
      }
    }
    return mapRenXuanType.get(sType);
  }

  // 开奖结果映射
  const mapResultType = new Map<number, string>([
    [emResultType.RT_DA, '大'],
    [emResultType.RT_XIAO, '小'],
    [emResultType.RT_DAN, '单'],
    [emResultType.RT_SHUANG, '双'],
    [emResultType.RT_JIN, '金'],
    [emResultType.RT_MU, '木'],
    [emResultType.RT_SHUI, '水'],
    [emResultType.RT_HUO, '火'],
    [emResultType.RT_TU, '土'],
    [emResultType.RT_JI, '奇'],
    [emResultType.RT_HE, '和'],
    [emResultType.RT_OU, '偶'],
    [emResultType.RT_SHANG, '上'],
    [emResultType.RT_ZHONG, '中'],
    [emResultType.RT_XIA, '下'],
    [emResultType.RT_COM_HE, '和局'],
  ]);
  /**
   * @description: 获取按钮title按钮
   * @param {number} sType
   * @return {*}
   */
  export function GetGameResult(sType: number): string {
    if (mapResultType.has(sType)) return mapResultType.get(sType);
    return '';
  }
}

