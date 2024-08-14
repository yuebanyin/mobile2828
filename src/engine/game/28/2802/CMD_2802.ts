import { BYTE, CSTRING, CreateArray, CreateArray2, CreateObject, DWORD, SCORE, Struct, WORD, WSTRING } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';

export namespace CMD_2802 {
  //下注主类型
  export enum emBetMainType {
    BTM_TE = 0, //特码
    BTM_DING_1, //第一球
    BTM_DING_2, //第二球
    BTM_DING_3, //第三球
    BTM_COUNT = 4, //下注类型数目
    BTM_INVALID = 0xff, //无效下注类型
  }

  //下注子类型 - 特码
  export enum emSubBetTypeTeMa {
    SBTT_NUM = 0, //数字-【自选】【1】
    SBTT_DA, //大
    SBTT_XIAO, //小
    SBTT_DAN, //单
    SBTT_SHUANG, //双
    SBTT_DA_DAN, //大单
    SBTT_XIAO_DAN, //小单
    SBTT_DA_SHUANG, //大双
    SBTT_XIAO_SHUANG, //小双
    SBTT_JIDA, //极大
    SBTT_JIXIAO, //极小
    SBTT_HONG, //红波
    SBTT_LAN, //蓝波
    SBTT_LV, //绿波
    SBTT_SHUNZI, //顺子
    SBTT_BAOZI, //豹子
    SBTT_DUIZI, //对子
    SBTT_LONG, //龙
    SBTT_HU, //虎
    SBTT_HE, //和
    SBTT_COUNT = 20, //子类型数目
  }

  //下注子类型 - 定位球
  export enum emSubBetTypeDingWei {
    SBTD_NUM = 0, //数字-【自选】【1】
    SBTD_DA, //大
    SBTD_XIAO, //小
    SBTD_DAN, //单
    SBTD_SHUANG, //双
    SBTD_COUNT = 5, //子类型数目
  }

  //区域限制类型
  export enum emLimitType {
    LT_TE_NUM_0 = 0, //特码数字0
    //...
    LT_TE_NUM_27 = 27, //特码数字27

    LT_TE_DA = 28, //特码大
    //...
    LT_TE_LV = 40, //特码绿波

    LT_D1_NUM_0 = 41, //定位球1数字0
    //...
    LT_D1_SHUANG = 54, //定位球1双

    LT_D2_NUM_0 = 55, //定位球2数字0
    //...
    LT_D2_SHUANG = 68, //定位球2双

    LT_D3_NUM_0 = 69, //定位球3数字0
    //...
    LT_D3_SHUANG = 82, //定位球3双

    LT_TE_SHUNZI = 83, //特码顺子
    //...
    LT_TE_HE = 88, //特码和

    LT_COUNT = 89, //区域限制类型数目
    LT_INVALID = 0xff, //无效区域限制类型
  }

  //倍数类型
  export enum emMultipleType {
    MT_T_0 = 0, //特码-0、27
    MT_T_1, //特码-1、26
    MT_T_2, //特码-2、25
    MT_T_3, //特码-3、24
    MT_T_4, //特码-4、23
    MT_T_5, //特码-5、22
    MT_T_6, //特码-6、21
    MT_T_7, //特码-7、20
    MT_T_8, //特码-8、19
    MT_T_9, //特码-9、18
    MT_T_10, //特码-10、17
    MT_T_11, //特码-11、16
    MT_T_12, //特码-12、15
    MT_T_13, //特码-13、14
    MT_T_DA, //特码-大
    MT_T_XIAO, //特码-小
    MT_T_DAN, //特码-单
    MT_T_SHUANG, //特码-双
    MT_T_DA_DAN, //特码-大单
    MT_T_XIAO_DAN, //特码-小单
    MT_T_DA_SHUANG, //特码-大双
    MT_T_XIAO_SHUANG, //特码-小双
    MT_T_JIDA, //特码-极大
    MT_T_JIXIAO, //特码-极小
    MT_T_HONG, //特码-红波
    MT_T_LAN, //特码-蓝波
    MT_T_LV, //特码-绿波
    MT_T_SHUNZI, //特码-顺子
    MT_T_BAOZI, //特码-豹子
    MT_T_DUIZI, //特码-对子
    MT_T_LONG, //特码-龙
    MT_T_HU, //特码-虎
    MT_T_HE, //特码-和
    MT_T_DA_S, //特码-大（14）
    MT_T_XIAO_S, //特码-小（13）
    MT_T_DAN_S, //特码-单（13）
    MT_T_SHUANG_S, //特码-双（14）
    MT_T_XIAO_DAN_S, //特码-小单（13）
    MT_T_DA_SHUANG_S, //特码-大双（14）
    MT_D1_DIAN, //定位球1-单点
    MT_D1_DA, //定位球1-大
    MT_D1_XIAO, //定位球1-小
    MT_D1_DAN, //定位球1-单
    MT_D1_SHUANG, //定位球1-双
    MT_D2_DIAN, //定位球2-单点
    MT_D2_DA, //定位球2-大
    MT_D2_XIAO, //定位球2-小
    MT_D2_DAN, //定位球2-单
    MT_D2_SHUANG, //定位球2-双
    MT_D3_DIAN, //定位球3-单点
    MT_D3_DA, //定位球3-大
    MT_D3_XIAO, //定位球3-小
    MT_D3_DAN, //定位球3-单
    MT_D3_SHUANG, //定位球3-双
    MT_COUNT = 54, //倍数限制类型数目
    MT_INVALID = 0xff, //无效区域限制类型
  }

  //开奖结果位置类型
  export enum emResultPosType {
    RPT_T_DX = 0, //特码-大小
    RPT_T_DS, //特码-单双
    RPT_T_JIZHI, //特码-极值
    RPT_T_BO, //特码-色波
    RPT_T_PAIXING, //特码-牌型（顺子、豹子、对子、杂三）
    RPT_T_LHH, //特码-龙虎和
    RPT_D1_DX, //定位球1-大小
    RPT_D2_DX, //定位球2-大小
    RPT_D3_DX, //定位球3-大小
    RPT_D1_DS, //定位球1-单双
    RPT_D2_DS, //定位球2-单双
    RPT_D3_DS, //定位球3-单双
    RPT_COUNT = 12, //结果位置类型数目
    RPT_INVALID = 0xff, //无效结果位置类型
  }

  //开奖结果类型
  export enum emResultType {
    RT_DA = 0, //大
    RT_XIAO, //小
    RT_DAN, //单
    RT_SHUANG, //双
    RT_JI_DA, //极大
    RT_JI_XIAO, //极小
    RT_JI_WU, //无极值
    RT_BO_HONG, //红波
    RT_BO_LAN, //蓝波
    RT_BO_LV, //绿波
    RT_SHUNZI, //顺子
    RT_BAOZI, //豹子
    RT_DUIZI, //对子
    RT_ZASAN, //杂三(无牌型)
    RT_LONG, //龙
    RT_HU, //虎
    RT_HE, //和
    RT_INVALID = 0xff, //无效开奖结果类型
  }

  //场景状态定义
  export const GAME_SCENE_FREE: number = 0; //等待开始
  export const GAME_SCENE_BET: number = 100; //下注状态
  export const GAME_SCENE_WAIT: number = 101; //封盘状态

  export const SBT_INVALID: number = 0xff; //无效子区域下注类型
  export const INVALID_CARD: number = 0xff; //无效的开奖数值
  export const JETTON_COUNT: number = 9; //筹码档位数目
  export const COUNT_OF_CARS: number = 4; //开奖结果
  export const SOURCE_DATA_COUNT: number = 20; //源数据数量
  export const MAX_SOURCE_DATA_LEN: number = 2; //源数据长度
  export const MAX_BET_COUNT: number = 89; //最大下注数目
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

  // pc 28 游戏通用头部
  export class CMD_S_PlaceBetHead extends Struct {
    dwGameID = CreateObject(DWORD); //GameID
    cbFaceID = CreateObject(BYTE); //头像标识
    szNickName = CreateObject(WSTRING, common.LEN_NICKNAME); //用户昵称
    cPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); // 期号
    wBetCount = CreateObject(WORD); // 注单数
    wMultipleCount = CreateObject(WORD); // 特殊赔率数
  }

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
    placeBetHead = CreateObject(CMD_S_PlaceBetHead);
    tagCommonBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true); // 下注注单信息
    tagSpecialMultiple = CreateArray(common.tagSpecialMultiple, [common.LEN_SSC_BET_COUNT], 0, true); // 下注动态赔率信息
  }

  //用户下注
  export class CMD_C_PlaceBet extends Struct {
    placeBetHead = CreateObject(CMD_S_PlaceBetHead);
    tagCommonBetInfo = CreateArray(common.tagCommonBetInfo, [common.LEN_SSC_BET_COUNT], 0, true); // 下注注单信息
    tagSpecialMultiple = CreateArray(common.tagSpecialMultiple, [common.LEN_SSC_BET_COUNT], 0, true); // 下注动态赔率信息
  }
}
