import { BYTE, CSTRING, CreateArray, CreateArray2, CreateObject, DWORD, SCORE, Struct, WSTRING } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';

export namespace CMD_3203 {
  //下注主类型
  export enum emBetMainType {
    BTM_HE = 0, //总和
    BTM_DING_1, //第一球
    BTM_DING_2, //第二球
    BTM_DING_3, //第三球
    BTM_DING_4, //第四球
    BTM_DING_5, //第五球
    BTM_SAN_QIAN, //前三
    BTM_SAN_ZHONG, //中三
    BTM_SAN_HOU, //后三
    BTM_NIU, //斗牛
    BTM_COUNT = 10, //下注类型数目
    BTM_INVALID = 0xff, //无效下注类型
  }

  //下注子类型 - 总和
  export enum emSubBetTypeZongHe {
    SBTH_DA = 0, //大
    SBTH_XIAO, //小
    SBTH_DAN, //单
    SBTH_SHUANG, //双
    SBTH_LONG, //龙
    SBTH_HU, //虎
    SBTH_HE, //和
    SBTH_COUNT, //子类型数目
  }

  //下注子类型 - 定位球
  export enum emSubBetTypeDingWei {
    SBTD_NUM = 0, //数字-【自选】【1】
    SBTD_DA, //大
    SBTD_XIAO, //小
    SBTD_DAN, //单
    SBTD_SHUANG, //双
    SBTD_COUNT, //子类型数目
  }

  //下注子类型 - 前/中/后三
  export enum emSubBetTypeSanZhang {
    SBTS_ZA = 0, //杂六
    SBTS_BAN, //半顺
    SBTS_SHUN, //顺子
    SBTS_BAO, //豹子
    SBTS_DUI, //对子
    SBTS_COUNT, //子类型数目
  }

  //下注子类型 - 斗牛
  export enum emSubBetTypeDouNiug {
    SBTN_NUM = 0, //点数（无牛-牛牛）-【自选】【1】
    SBTN_DA, //大
    SBTN_XIAO, //小
    SBTN_DAN, //单
    SBTN_SHUANG, //双
    SBTN_GAO, //高牌
    SBTN_DUI_1, //一对
    SBTN_DUI_2, //两对
    SBTN_TIAO_3, //三条
    SBTN_SHUN, //顺子
    SBTN_HULU, //葫芦
    SBTN_TIAO_4, //四条
    SBTN_TIAO_5, //五条
    SBTN_COUNT, //子类型数目
  }

  // 抛出子类型的名称
  export const emBetSubTypeNames = ['emSubBetTypeZongHe', 'emSubBetTypeDingWei', 'emSubBetTypeSanZhang', 'emSubBetTypeDouNiug'];

  //区域限制类型
  export enum emLimitType {
    LT_H_DX, //总和-大小
    LT_H_DS, //总和-单双
    LT_H_LHH, //总和-龙虎和
    LT_D1_DIAN, //第一球-单点
    LT_D1_DX, //第一球-大小
    LT_D1_DS, //第一球-单双
    LT_D2_DIAN, //第二球-单点
    LT_D2_DX, //第二球-大小
    LT_D2_DS, //第二球-单双
    LT_D3_DIAN, //第三球-单点
    LT_D3_DX, //第三球-大小
    LT_D3_DS, //第三球-单双
    LT_D4_DIAN, //第四球-单点
    LT_D4_DX, //第四球-大小
    LT_D4_DS, //第四球-单双
    LT_D5_DIAN, //第五球-单点
    LT_D5_DX, //第五球-大小
    LT_D5_DS, //第五球-单双
    LT_SAN_QIAN, //前三
    LT_SAN_ZHONG, //中三
    LT_SAN_HOU, //后三
    LT_NIU_DIAN, //斗牛-点数（无牛-牛牛）
    LT_NIU_DX, //斗牛-大小
    LT_NIU_DS, //斗牛-单双
    LT_NIU_SH, //斗牛-梭哈（高牌-五条）
    LT_COUNT = 25, //区域限制类型数目
    LT_INVALID = 0xff, //无效区域限制类型
  }

  //倍数类型
  export enum emMultipleType {
    MT_H_DA = 0, //总和-大
    MT_H_XIAO, //总和-小
    MT_H_DAN, //总和-单
    MT_H_SHUANG, //总和-双
    MT_H_LONG, //总和-龙
    MT_H_HU, //总和-虎
    MT_H_HE, //总和-和
    MT_D1_DIAN, //第一球-单点
    MT_D1_DA, //第一球-大
    MT_D1_XIAO, //第一球-小
    MT_D1_DAN, //第一球-单
    MT_D1_SHUANG, //第一球-双
    MT_D2_DIAN, //第二球-单点
    MT_D2_DA, //第二球-大
    MT_D2_XIAO, //第二球-小
    MT_D2_DAN, //第二球-单
    MT_D2_SHUANG, //第二球-双
    MT_D3_DIAN, //第三球-单点
    MT_D3_DA, //第三球-大
    MT_D3_XIAO, //第三球-小
    MT_D3_DAN, //第三球-单
    MT_D3_SHUANG, //第三球-双
    MT_D4_DIAN, //第四球-单点
    MT_D4_DA, //第四球-大
    MT_D4_XIAO, //第四球-小
    MT_D4_DAN, //第四球-单
    MT_D4_SHUANG, //第四球-双
    MT_D5_DIAN, //第五球-单点
    MT_D5_DA, //第五球-大
    MT_D5_XIAO, //第五球-小
    MT_D5_DAN, //第五球-单
    MT_D5_SHUANG, //第五球-双
    MT_SAN_QIAN_ZA, //前三-杂六
    MT_SAN_QIAN_BAN, //前三-半顺
    MT_SAN_QIAN_SHUN, //前三-顺子
    MT_SAN_QIAN_BAO, //前三-豹子
    MT_SAN_QIAN_DUI, //前三-对子
    MT_SAN_ZHONG_ZA, //中三-杂六
    MT_SAN_ZHONG_BAN, //中三-半顺
    MT_SAN_ZHONG_SHUN, //中三-顺子
    MT_SAN_ZHONG_BAO, //中三-豹子
    MT_SAN_ZHONG_DUI, //中三-对子
    MT_SAN_HOU_ZA, //后三-杂六
    MT_SAN_HOU_BAN, //后三-半顺
    MT_SAN_HOU_SHUN, //后三-顺子
    MT_SAN_HOU_BAO, //后三-豹子
    MT_SAN_HOU_DUI, //后三-对子
    MT_NIU_0 = 47, //斗牛-无牛
    //...
    MT_NIU_10 = 57, //斗牛-牛牛
    MT_NIU_DA, //斗牛-大
    MT_NIU_XIAO, //斗牛-小
    MT_NIU_DAN, //斗牛-单
    MT_NIU_SHUANG, //斗牛-双
    MT_NIU_GAO, //斗牛-高牌
    MT_NIU_DUI_1, //斗牛-一对
    MT_NIU_DUI_2, //斗牛-两对
    MT_NIU_TIAO_3, //斗牛-三条
    MT_NIU_SHUN, //斗牛-顺子
    MT_NIU_HULU, //斗牛-葫芦
    MT_NIU_TIAO_4, //斗牛-四条
    MT_NIU_TIAO_5, //斗牛-五条
    MT_COUNT = 70, //倍数限制类型数目
    MT_INVALID = 0xff, //无效区域限制类型
  }

  //开奖结果位置类型
  export enum emResultPosType {
    RPT_HE_DX = 0, //总和-大小
    RPT_HE_DS, //总和-单双
    RPT_HE_LHH, //总和-龙虎和
    RPT_D1_DX, //定位球1-大小
    RPT_D2_DX, //定位球2-大小
    RPT_D3_DX, //定位球3-大小
    RPT_D4_DX, //定位球4-大小
    RPT_D5_DX, //定位球5-大小
    RPT_D1_DS, //定位球1-单双
    RPT_D2_DS, //定位球2-单双
    RPT_D3_DS, //定位球3-单双
    RPT_D4_DS, //定位球4-单双
    RPT_D5_DS, //定位球5-单双
    RPT_SAN_QIAN, //前三
    RPT_SAN_ZHONG, //中三
    RPT_SAN_HOU, //后三
    RPT_NIU_DIAN, //斗牛-点数（无牛-牛牛）
    RPT_NIU_DX, //斗牛-大小
    RPT_NIU_DS, //斗牛-单双
    RPT_NIU_SH, //斗牛-梭哈（高牌-五条）
    RPT_COUNT = 20, //结果位置类型数目
    RPT_INVALID = 0xff, //无效结果位置类型
  }

  //开奖结果类型
  export enum emResultType {
    RT_DA = 0, //大
    RT_XIAO, //小
    RT_DAN, //单
    RT_SHUANG, //双
    RT_LONG, //龙
    RT_HU, //虎
    RT_HE, //和
    RT_ZALIU, //杂六
    RT_BANSHUN, //半顺
    RT_SHUNZI, //顺子
    RT_BAOZI, //豹子
    RT_DUIZI, //对子
    RT_NIU_0, //斗牛-无牛
    RT_NIU_1, //斗牛-牛一
    RT_NIU_2, //斗牛-牛二
    RT_NIU_3, //斗牛-牛三
    RT_NIU_4, //斗牛-牛四
    RT_NIU_5, //斗牛-牛五
    RT_NIU_6, //斗牛-牛六
    RT_NIU_7, //斗牛-牛七
    RT_NIU_8, //斗牛-牛八
    RT_NIU_9, //斗牛-牛九
    RT_NIU_10, //斗牛-牛牛
    RT_NIU_DA, //斗牛-大
    RT_NIU_XIAO, //斗牛-小
    RT_NIU_DAN, //斗牛-单
    RT_NIU_SHUANG, //斗牛-双
    RT_NIU_GAO, //斗牛-高牌
    RT_NIU_DUI_1, //斗牛-一对
    RT_NIU_DUI_2, //斗牛-两对
    RT_NIU_TIAO_3, //斗牛-三条
    RT_NIU_SHUN, //斗牛-顺子
    RT_NIU_HULU, //斗牛-葫芦
    RT_NIU_TIAO_4, //斗牛-四条
    RT_NIU_TIAO_5, //斗牛-五条
    RT_INVALID = 0xff, //无效开奖结果类型
  }

  //长龙主类型
  export enum emChangLongMainType {
    CLMT_HE_DX = 0, //总和-大小
    CLMT_HE_DS, //总和-单双
    CLMT_HE_LHH, //总和-龙虎和
    CLMT_D1_DX, //第一球-大小
    CLMT_D1_DS, //第一球-单双
    CLMT_D2_DX, //第二球-大小
    CLMT_D2_DS, //第二球-单双
    CLMT_D3_DX, //第三球-大小
    CLMT_D3_DS, //第三球-单双
    CLMT_D4_DX, //第四球-大小
    CLMT_D4_DS, //第四球-单双
    CLMT_D5_DX, //第五球-大小
    CLMT_D5_DS, //第五球-单双
    CLMT_COUNT, //长龙主类型数目
    CLMT_INVALID = 0xff, //无效长龙主类型
  }

  //长龙子类型 - 大小
  export enum emChangLongSubTypeDX {
    CLST_DX_DA = 0, //大
    CLST_DX_XIAO, //小
  }

  //长龙子类型 - 单双
  export enum emChangLongSubTypeDS {
    CLST_DS_DAN, //单
    CLST_DS_SHUANG, //双
  }

  //长龙子类型 - 龙虎和
  export enum emChangLongSubTypeLHH {
    CLST_LHH_LONG, //龙
    CLST_LHH_HU, //虎
    CLST_LHH_HE, //和
  }

  // 长龙的映射关系
  export const subTypeMap = new Map<number, any>([
    [
      emChangLongMainType.CLMT_HE_DX,
      [
        { title: '大', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_DA, clSubMainType: emChangLongSubTypeDX.CLST_DX_DA, oddID: emMultipleType.MT_H_DA },
        { title: '小', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_XIAO, clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO, oddID: emMultipleType.MT_H_XIAO },
      ],
    ],
    [
      emChangLongMainType.CLMT_HE_DS,
      [
        { title: '单', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_DAN, clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN, oddID: emMultipleType.MT_H_DAN },
        { title: '双', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_SHUANG, clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG, oddID: emMultipleType.MT_H_SHUANG },
      ],
    ],
    [
      emChangLongMainType.CLMT_HE_LHH,
      [
        { title: '龙', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_LONG, clSubMainType: emChangLongSubTypeLHH.CLST_LHH_LONG, oddID: emMultipleType.MT_H_LONG },
        { title: '虎', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_HU, clSubMainType: emChangLongSubTypeLHH.CLST_LHH_HU, oddID: emMultipleType.MT_H_HU },
        { title: '和', mainType: emBetMainType.BTM_HE, subMainType: emSubBetTypeZongHe.SBTH_HE, clSubMainType: emChangLongSubTypeLHH.CLST_LHH_HE, oddID: emMultipleType.MT_H_HE },
      ],
    ],
    [
      emChangLongMainType.CLMT_D1_DX,
      [
        { title: '大', mainType: emBetMainType.BTM_DING_1, subMainType: emSubBetTypeDingWei.SBTD_DA, clSubMainType: emChangLongSubTypeDX.CLST_DX_DA, oddID: emMultipleType.MT_D1_DA },
        { title: '小', mainType: emBetMainType.BTM_DING_1, subMainType: emSubBetTypeDingWei.SBTD_XIAO, clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO, oddID: emMultipleType.MT_D1_XIAO },
      ],
    ],
    [
      emChangLongMainType.CLMT_D2_DX,
      [
        { title: '大', mainType: emBetMainType.BTM_DING_2, subMainType: emSubBetTypeDingWei.SBTD_DA, clSubMainType: emChangLongSubTypeDX.CLST_DX_DA, oddID: emMultipleType.MT_D2_DA },
        { title: '小', mainType: emBetMainType.BTM_DING_2, subMainType: emSubBetTypeDingWei.SBTD_XIAO, clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO, oddID: emMultipleType.MT_D2_XIAO },
      ],
    ],
    [
      emChangLongMainType.CLMT_D3_DX,
      [
        { title: '大', mainType: emBetMainType.BTM_DING_3, subMainType: emSubBetTypeDingWei.SBTD_DA, clSubMainType: emChangLongSubTypeDX.CLST_DX_DA, oddID: emMultipleType.MT_D3_DA },
        { title: '小', mainType: emBetMainType.BTM_DING_3, subMainType: emSubBetTypeDingWei.SBTD_XIAO, clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO, oddID: emMultipleType.MT_D3_XIAO },
      ],
    ],
    [
      emChangLongMainType.CLMT_D4_DX,
      [
        { title: '大', mainType: emBetMainType.BTM_DING_4, subMainType: emSubBetTypeDingWei.SBTD_DA, clSubMainType: emChangLongSubTypeDX.CLST_DX_DA, oddID: emMultipleType.MT_D4_DA },
        { title: '小', mainType: emBetMainType.BTM_DING_4, subMainType: emSubBetTypeDingWei.SBTD_XIAO, clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO, oddID: emMultipleType.MT_D4_XIAO },
      ],
    ],
    [
      emChangLongMainType.CLMT_D5_DX,
      [
        { title: '大', mainType: emBetMainType.BTM_DING_5, subMainType: emSubBetTypeDingWei.SBTD_DA, clSubMainType: emChangLongSubTypeDX.CLST_DX_DA, oddID: emMultipleType.MT_D5_DA },
        { title: '小', mainType: emBetMainType.BTM_DING_5, subMainType: emSubBetTypeDingWei.SBTD_XIAO, clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO, oddID: emMultipleType.MT_D5_XIAO },
      ],
    ],
    [
      emChangLongMainType.CLMT_D1_DS,
      [
        { title: '单', mainType: emBetMainType.BTM_DING_1, subMainType: emSubBetTypeDingWei.SBTD_DAN, clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN, oddID: emMultipleType.MT_D1_DAN },
        { title: '双', mainType: emBetMainType.BTM_DING_1, subMainType: emSubBetTypeDingWei.SBTD_SHUANG, clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG, oddID: emMultipleType.MT_D1_SHUANG },
      ],
    ],
    [
      emChangLongMainType.CLMT_D2_DS,
      [
        { title: '单', mainType: emBetMainType.BTM_DING_2, subMainType: emSubBetTypeDingWei.SBTD_DAN, clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN, oddID: emMultipleType.MT_D2_DAN },
        { title: '双', mainType: emBetMainType.BTM_DING_2, subMainType: emSubBetTypeDingWei.SBTD_SHUANG, clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG, oddID: emMultipleType.MT_D2_SHUANG },
      ],
    ],
    [
      emChangLongMainType.CLMT_D3_DS,
      [
        { title: '单', mainType: emBetMainType.BTM_DING_3, subMainType: emSubBetTypeDingWei.SBTD_DAN, clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN, oddID: emMultipleType.MT_D3_DAN },
        { title: '双', mainType: emBetMainType.BTM_DING_3, subMainType: emSubBetTypeDingWei.SBTD_SHUANG, clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG, oddID: emMultipleType.MT_D3_SHUANG },
      ],
    ],
    [
      emChangLongMainType.CLMT_D4_DS,
      [
        { title: '单', mainType: emBetMainType.BTM_DING_4, subMainType: emSubBetTypeDingWei.SBTD_DAN, clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN, oddID: emMultipleType.MT_D4_DAN },
        { title: '双', mainType: emBetMainType.BTM_DING_4, subMainType: emSubBetTypeDingWei.SBTD_SHUANG, clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG, oddID: emMultipleType.MT_D4_SHUANG },
      ],
    ],
    [
      emChangLongMainType.CLMT_D5_DS,
      [
        { title: '单', mainType: emBetMainType.BTM_DING_5, subMainType: emSubBetTypeDingWei.SBTD_DAN, clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN, oddID: emMultipleType.MT_D5_DAN },
        { title: '双', mainType: emBetMainType.BTM_DING_5, subMainType: emSubBetTypeDingWei.SBTD_SHUANG, clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG, oddID: emMultipleType.MT_D5_SHUANG },
      ],
    ],
  ]);

  // 主码映射
  export const mainTypeMpa = new Map([
    [emChangLongMainType.CLMT_HE_DX, '总和'],
    [emChangLongMainType.CLMT_HE_DS, '总和'],
    [emChangLongMainType.CLMT_HE_LHH, '总和'],
    [emChangLongMainType.CLMT_D1_DX, '第一球'],
    [emChangLongMainType.CLMT_D1_DS, '第一球'],
    [emChangLongMainType.CLMT_D2_DX, '第二球'],
    [emChangLongMainType.CLMT_D2_DS, '第二球'],
    [emChangLongMainType.CLMT_D3_DX, '第三球'],
    [emChangLongMainType.CLMT_D3_DS, '第三球'],
    [emChangLongMainType.CLMT_D4_DX, '第四球'],
    [emChangLongMainType.CLMT_D4_DS, '第四球'],
    [emChangLongMainType.CLMT_D5_DX, '第五球'],
    [emChangLongMainType.CLMT_D5_DS, '第五球'],
  ]);

  // 获取注单名称 clM 主码 clS 子码 isBetArr 是否只要号码数组
  export const getCLNameOrBets = (clM: number, clS: number, isBetArr?: boolean) => {
    if (isBetArr) {
      return subTypeMap.get(clM) || [];
    }
    if (subTypeMap.has(clM)) {
      return `${mainTypeMpa.get(clM)}-${subTypeMap.get(clM).find((it) => it.clSubMainType === clS)?.title}`;
    }
    return '';
  };

  //场景状态定义
  export const GAME_SCENE_FREE: number = 0; //等待开始
  export const GAME_SCENE_BET: number = 100; //下注状态
  export const GAME_SCENE_WAIT: number = 101; //封盘状态

  export const SBT_INVALID: number = 0xff; //无效子区域下注类型
  export const INVALID_CARD: number = 0xff; //无效的开奖数值
  export const JETTON_COUNT: number = 9; //筹码档位数目
  export const COUNT_OF_CARS: number = 5; //开奖结果
  export const SOURCE_DATA_COUNT: number = 20; //源数据数量
  export const MAX_SOURCE_DATA_LEN: number = 2; //源数据长度
  export const MAX_BET_COUNT: number = 115; //最大下注数目
  export const MAX_NUMBER_COUNT: number = 1; //最大自选号码数目

  //服务端命令
  export const SUB_S_SCENE_CHANGE: number = 100; //场景切换
  export const SUB_S_PLACE_JETTON: number = 101; //用户下注
  export const SUB_S_PLACE_JETTON_SUCCESS: number = 102; //下注成功
  export const SUB_S_PLACE_JETTON_FAILURE: number = 103; //下注失败
  export const SUB_S_GAME_END: number = 104; //游戏结束
  export const SUB_S_HISTORY: number = 105; //游戏记录
  export const SUB_S_ROBOT_CONFIG: number = 106; //机器人配置
  export const SUB_S_UPDATE_CONFIG: number = 107; //配置刷新
  export const SUB_S_DYNAMIC_MULTIPLE: number = 108; //动态赔率
  export const SUB_S_DYNAMIC_MULTIPLE_FINISH: number = 109; //动态赔率下发完成
  export const SUB_S_FORECAST_INFO: number = 110; //专家预测信息

  //客户端请求命令
  export const SUB_C_PLACE_JETTON: number = 1; //用户下注

  //基础配置
  export class tagBaseConfig extends Struct {
    lBetChip = CreateArray(SCORE, [JETTON_COUNT]); //下注按钮数值
    lLimitScore = CreateArray2(SCORE, [emLimitType.LT_COUNT, 4]); //区域限额(最小/单注/单号/区域)
    dwMultiple = CreateArray(DWORD, [emMultipleType.MT_COUNT]); //常规区域倍数(赔率=配置值/10000)
  }

  //游戏场景
  export class CMD_S_GameScene extends Struct {
    dwTimeLeave = CreateObject(DWORD); //剩余时间
    dwAllSeconds = CreateObject(DWORD); //总时间
    dwTrunSeconds = CreateObject(DWORD); //每轮时间
    dwValidSeconds = CreateObject(DWORD); //投注时间
    stGameConfig = CreateObject(tagBaseConfig); //基础配置
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
  }

  //场景切换
  export class CMD_S_SceneChange extends Struct {
    cbSceneStatus = CreateObject(BYTE); //游戏状态
    dwAllSeconds = CreateObject(DWORD); //总时间
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
  }

  // 开奖结果
  export class tagRecordInfo extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //期号
    cbTableCard = CreateArray(BYTE, [COUNT_OF_CARS]); //开奖结果
    szSourceData = CreateArray2(CSTRING, [SOURCE_DATA_COUNT, MAX_SOURCE_DATA_LEN], MAX_SOURCE_DATA_LEN); //号源数据
    cbResultType = CreateArray(BYTE, [emResultPosType.RPT_COUNT]); //结果类型
    stRequestTime = CreateObject(common.SYSTEMTIME); //号源抓取时间
  }

  // 游戏结果
  export class CMD_S_GameEnd extends Struct {
    stRecordInfo = CreateObject(tagRecordInfo); //结束信息
  }

  // 动态赔率
  export class CMD_S_DynamicMultiple extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    stMultipleList = CreateArray(common.tagDynamicMultiple, [100], 0, true); //动态赔率
  }
  // 下注信息
  export class tagUserBetInfo extends Struct {
    cbBetMainType = CreateObject(BYTE); //主类型
    cbBetSubType = CreateObject(BYTE); //子类型
    cbNumber = CreateArray(BYTE, [MAX_NUMBER_COUNT]); //自选号码
    lBetScore = CreateObject(SCORE); //下注金额
    dwNormalMultiple = CreateObject(DWORD); //校验常规赔率
    dwSpecialMultiple = CreateObject(DWORD); //校验特殊赔率
  }

  //用户下注
  export class CMD_S_PlaceBet extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    cbFaceID = CreateObject(BYTE); //头像标识
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //用户昵称
    tagUserBetInfo = CreateArray(tagUserBetInfo, [MAX_BET_COUNT], 0, true); //下注信息
  }

  const mapMainType = new Map<number, string>([
    [emBetMainType.BTM_HE, '总和'],
    [emBetMainType.BTM_DING_1, '第一球'],
    [emBetMainType.BTM_DING_2, '第二球'],
    [emBetMainType.BTM_DING_3, '第三球'],
    [emBetMainType.BTM_DING_4, '第四球'],
    [emBetMainType.BTM_DING_5, '第五球'],
    [emBetMainType.BTM_SAN_QIAN, '前三'],
    [emBetMainType.BTM_SAN_ZHONG, '中三'],
    [emBetMainType.BTM_SAN_HOU, '后三'],
    [emBetMainType.BTM_NIU, '斗牛'],
  ]);

  // 下注子类型 - 总和
  const mapSubZhType = new Map<number, string>([
    [emSubBetTypeZongHe.SBTH_DA, '大'],
    [emSubBetTypeZongHe.SBTH_XIAO, '小'],
    [emSubBetTypeZongHe.SBTH_DAN, '单'],
    [emSubBetTypeZongHe.SBTH_SHUANG, '双'],
    [emSubBetTypeZongHe.SBTH_LONG, '龙'],
    [emSubBetTypeZongHe.SBTH_HU, '虎'],
    [emSubBetTypeZongHe.SBTH_HE, '和'],
  ]);

  // 下注子类型 - 定位球
  const mapSubDwqType = new Map<number, string>([
    [emSubBetTypeDingWei.SBTD_DA, '大'],
    [emSubBetTypeDingWei.SBTD_XIAO, '小'],
    [emSubBetTypeDingWei.SBTD_DAN, '单'],
    [emSubBetTypeDingWei.SBTD_SHUANG, '双'],
  ]);

  // 下注子类型 - 前/中/后三
  const mapSubQzhType = new Map<number, string>([
    [emSubBetTypeSanZhang.SBTS_ZA, '杂六'],
    [emSubBetTypeSanZhang.SBTS_BAN, '半顺'],
    [emSubBetTypeSanZhang.SBTS_SHUN, '顺子'],
    [emSubBetTypeSanZhang.SBTS_BAO, '豹子'],
    [emSubBetTypeSanZhang.SBTS_DUI, '对子'],
  ]);

  // 下注子类型 - 斗牛
  const mapSubDnType = new Map<number, string>([
    [emSubBetTypeDouNiug.SBTN_DA, '大'],
    [emSubBetTypeDouNiug.SBTN_XIAO, '小'],
    [emSubBetTypeDouNiug.SBTN_DAN, '单'],
    [emSubBetTypeDouNiug.SBTN_SHUANG, '双'],
    [emSubBetTypeDouNiug.SBTN_GAO, '高牌'],
    [emSubBetTypeDouNiug.SBTN_DUI_1, '一对'],
    [emSubBetTypeDouNiug.SBTN_DUI_2, '两对'],
    [emSubBetTypeDouNiug.SBTN_TIAO_3, '三条'],
    [emSubBetTypeDouNiug.SBTN_SHUN, '顺子'],
    [emSubBetTypeDouNiug.SBTN_HULU, '葫芦'],
    [emSubBetTypeDouNiug.SBTN_TIAO_4, '四条'],
    [emSubBetTypeDouNiug.SBTN_TIAO_5, '五条'],
  ]);

  const mapResultDesc = new Map<number, string>([
    [emResultType.RT_DA, '大'],
    [emResultType.RT_XIAO, '小'],
    [emResultType.RT_DAN, '单'],
    [emResultType.RT_SHUANG, '双'],
    [emResultType.RT_LONG, '龙'],
    [emResultType.RT_HU, '虎'],
    [emResultType.RT_HE, '和'],
    [emResultType.RT_ZALIU, '杂六'],
    [emResultType.RT_BANSHUN, '半顺'],
    [emResultType.RT_SHUNZI, '顺子'],
    [emResultType.RT_BAOZI, '豹子'],
    [emResultType.RT_DUIZI, '对子'],
    [emResultType.RT_NIU_0, '无牛'],
    [emResultType.RT_NIU_1, '牛一'],
    [emResultType.RT_NIU_2, '牛二'],
    [emResultType.RT_NIU_3, '牛三'],
    [emResultType.RT_NIU_4, '牛四'],
    [emResultType.RT_NIU_5, '牛五'],
    [emResultType.RT_NIU_6, '牛六'],
    [emResultType.RT_NIU_7, '牛七'],
    [emResultType.RT_NIU_8, '牛八'],
    [emResultType.RT_NIU_9, '牛九'],
    [emResultType.RT_NIU_10, '牛牛'],
    [emResultType.RT_NIU_DA, '大'],
    [emResultType.RT_NIU_XIAO, '小'],
    [emResultType.RT_NIU_DAN, '单'],
    [emResultType.RT_NIU_SHUANG, '双'],
    [emResultType.RT_NIU_GAO, '高牌'],
    [emResultType.RT_NIU_DUI_1, '一对'],
    [emResultType.RT_NIU_DUI_2, '两对'],
    [emResultType.RT_NIU_TIAO_3, '三条'],
    [emResultType.RT_NIU_SHUN, '顺子'],
    [emResultType.RT_NIU_HULU, '葫芦'],
    [emResultType.RT_NIU_TIAO_4, '四条'],
    [emResultType.RT_NIU_TIAO_5, '五条'],
  ]);

  /**
   * @description: 获取主下注类型描述
   * @return {*}
   */
  export function GetGameBetMainType(mType: number): string {
    if (mapMainType.has(mType)) return mapMainType.get(mType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --总和
   * @return {*}
   */
  export function GetGameBetSubZhType(sType: number): string {
    if (mapSubZhType.has(sType)) return mapSubZhType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --定位球
   * @return {*}
   */
  export function GetGameBetSubDwqType(sType: number): string {
    if (mapSubDwqType.has(sType)) return mapSubDwqType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --前/中/后三
   * @return {*}
   */
  export function GetGameBetSubQzhType(sType: number): string {
    if (mapSubQzhType.has(sType)) return mapSubQzhType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --斗牛
   * @return {*}
   */
  export function GetGameBetSubDnType(sType: number): string {
    if (mapSubDnType.has(sType)) return mapSubDnType.get(sType);
    return '';
  }

  /**
   * @description: 获取结果描述
   * @param {number} sRsultType
   * @return {*}
   */
  export function GetGameDnResultDesc(sRsultType: number): string {
    if (mapResultDesc.has(sRsultType)) return mapResultDesc.get(sRsultType);
    return '';
  }

  /**
   * @description: 游戏内上期数据结果描述列表
   * @param {Array} list
   * @return {*}
   */
  export function GetGamePeriodNumberResult(tableCard: Array<BYTE>, resultType: Array<BYTE>): Array<string> {
    const listStr = new Array<string>();
    if (tableCard.length === 0 || resultType.length === 0) return listStr;
    let allSum = 0;
    for (let index = 0; index < tableCard.length; index++) {
      const element = tableCard[index];
      if (element.value !== 255) {
        allSum += element.value;
      }
    }
    listStr.push(allSum.toString());
    listStr.push(GetGameDnResultDesc(resultType[emResultPosType.RPT_HE_DX].value));
    listStr.push(GetGameDnResultDesc(resultType[emResultPosType.RPT_HE_DS].value));
    listStr.push(GetGameDnResultDesc(resultType[emResultPosType.RPT_HE_LHH].value));
    listStr.push(GetGameDnResultDesc(resultType[emResultPosType.RPT_NIU_DIAN].value));
    listStr.push(GetGameDnResultDesc(resultType[emResultPosType.RPT_NIU_SH].value));
    listStr.push('前-' + GetGameDnResultDesc(resultType[emResultPosType.RPT_SAN_QIAN].value));
    listStr.push('中-' + GetGameDnResultDesc(resultType[emResultPosType.RPT_SAN_ZHONG].value));
    listStr.push('后-' + GetGameDnResultDesc(resultType[emResultPosType.RPT_SAN_HOU].value));
    return listStr;
  }
}

