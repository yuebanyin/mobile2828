import { CreateObject, CreateArray, CreateArray2, BOOL, BYTE, INT, CSTRING, DWORD, SCORE, Struct, WORD } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';

export namespace CMD_3402 {
  //下注主类型
  export enum emBetMainType {
    BTM_TE = 0, //特码
    BTM_ZHENG_1, //正码1
    BTM_ZHENG_2, //正码2
    BTM_ZHENG_3, //正码3
    BTM_ZHENG_4, //正码4
    BTM_ZHENG_5, //正码5
    BTM_ZHENG_6, //正码6
    BTM_ZHENG, //正码
    BTM_HE, //总和
    BTM_SE_BO, //色波
    BTM_TE_TOU_WEI, //特头尾数
    BTM_ZHENG_TE_WEI, //正特尾
    BTM_XIAO, //生肖
    BTM_ZONG_XIAO, //总肖
    BTM_HE_XIAO, //合肖
    BTM_SHENG_XIAO_LIAN, //生肖连
    BTM_LIAN_MA, //连码
    BTM_WEI_SHU_LIAN, //尾数连
    BTM_QUAN_BU_ZHONG, //全不中
    BTM_WU_XING, //五行
    BTM_COUNT, //下注类型数目
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
    SBTT_HE_DA, //合大
    SBTT_HE_XIAO, //合小
    SBTT_HE_DAN, //合单
    SBTT_HE_SHUANG, //合双
    SBTT_WEI_DA, //尾大
    SBTT_WEI_XIAO, //尾小
    SBTT_COUNT, //子类型数目
  }

  //下注子类型 - 正码1-6
  export enum emSubBetTypeZhengNum {
    SBTZN_NUM = 0, //数字-【自选】【1】
    SBTZN_DA, //大
    SBTZN_XIAO, //小
    SBTZN_DAN, //单
    SBTZN_SHUANG, //双
    SBTZN_HE_DA, //合大
    SBTZN_HE_XIAO, //合小
    SBTZN_HE_DAN, //合单
    SBTZN_HE_SHUANG, //合双
    SBTZN_WEI_DA, //尾大
    SBTZN_WEI_XIAO, //尾小
    SBTZN_HONG, //红波
    SBTZN_LAN, //蓝波
    SBTZN_LV, //绿波
    SBTZN_COUNT, //子类型数目
  }

  //下注子类型 - 正码
  export enum emSubBetTypeZheng {
    SBTZ_NUM = 0, //数字-【自选】【1】
    SBTZ_COUNT, //子类型数目
  }

  //下注子类型 - 总和
  export enum emSubBetTypeHe {
    SBTH_DA = 0, //大
    SBTH_XIAO, //小
    SBTH_DAN, //单
    SBTH_SHUANG, //双
    SBTH_COUNT, //子类型数目
  }

  //下注子类型 - 色波
  export enum emSubBetTypeSeBo {
    SBTB_HONG = 0, //红
    SBTB_LAN, //蓝
    SBTB_LV, //绿
    SBTB_HONG_DA, //红-大
    SBTB_HONG_XIAO, //红-小
    SBTB_HONG_DAN, //红-单
    SBTB_HONG_SHUANG, //红-双
    SBTB_HONG_DA_DAN, //红-大单
    SBTB_HONG_XIAO_DAN, //红-小单
    SBTB_HONG_DA_SHUANG, //红-大双
    SBTB_HONG_XIAO_SHUANG, //红-小双
    SBTB_LAN_DA, //蓝-大
    SBTB_LAN_XIAO, //蓝-小
    SBTB_LAN_DAN, //蓝-单
    SBTB_LAN_SHUANG, //蓝-双
    SBTB_LAN_DA_DAN, //蓝-大单
    SBTB_LAN_XIAO_DAN, //蓝-小单
    SBTB_LAN_DA_SHUANG, //蓝-大双
    SBTB_LAN_XIAO_SHUANG, //蓝-小双
    SBTB_LV_DA, //绿-大
    SBTB_LV_XIAO, //绿-小
    SBTB_LV_DAN, //绿-单
    SBTB_LV_SHUANG, //绿-双
    SBTB_LV_DA_DAN, //绿-大单
    SBTB_LV_XIAO_DAN, //绿-小单
    SBTB_LV_DA_SHUANG, //绿-大双
    SBTB_LV_XIAO_SHUANG, //绿-小双
    SBTB_COUNT, //子类型数目
  }

  //下注子类型 - 特头尾数
  export enum emSubBetTypeTeTouWei {
    SBTTTW_TOU = 0, //头数-【自选】【1】
    SBTTTW_WEI, //尾数-【自选】【1】
    SBTTTW_COUNT, //子类型数目
  }

  //下注子类型 - 正特尾
  export enum emSubBetTypeZTW {
    SBTZTW_NUM = 0, //数字-【自选】【1】
    SBTZTW_COUNT, //子类型数目
  }

  //生肖类型
  export enum emXiaoType {
    XT_SHU, //鼠
    XT_NIU, //牛
    XT_HU, //虎
    XT_TU, //兔
    XT_LONG, //龙
    XT_SHE, //蛇
    XT_MA, //马
    XT_YANG, //羊
    XT_HOU, //猴
    XT_JI, //鸡
    XT_GOU, //狗
    XT_ZHU, //猪
    XT_COUNT = 12, //生肖类型数目
    XT_INVALID = 0xff, //无效生肖
  }

  //下注子类型 - 生肖
  export enum emSubBetTypeXiao {
    SBTX_TE = 0, //特肖-【自选】【1】
    SBTX_ZHENG, //正肖-【自选】【1】
    SBTX_YI, //一肖-【自选】【1】
    SBTX_TE_BEN, //特肖-本年-【自选】【1】
    SBTX_ZHENG_BEN, //正肖-本年-【自选】【1】
    SBTX_YI_BEN, //一肖-本年-【自选】【1】
    SBTX_XIAO_TIAN, //特天肖
    SBTX_XIAO_DI, //特地肖
    SBTX_XIAO_QIAN, //特前肖
    SBTX_XIAO_HOU, //特后肖
    SBTX_XIAO_JIA, //特家肖
    SBTX_XIAO_YE, //特野肖
    SBTX_COUNT, //子类型数目
  }

  //下注子类型 - 总肖
  export enum emSubBetTypeZongXiao {
    SBTZX_SHU = 0, //总肖数-【自选】【1】
    SBTZX_DAN, //总肖-单
    SBTZX_SHUANG, //总肖-双
    SBTZX_COUNT, //子类型数目
  }

  //下注子类型 - 合肖
  export enum emSubBetTypeHeXiao {
    SBTHX_ZHONG_2 = 0, //二肖中-【自选】【2】
    SBTHX_ZHONG_3, //三肖中-【自选】【3】
    SBTHX_ZHONG_4, //四肖中-【自选】【4】
    SBTHX_ZHONG_5, //五肖中-【自选】【5】
    SBTHX_ZHONG_6, //六肖中-【自选】【6】
    SBTHX_ZHONG_7, //七肖中-【自选】【7】
    SBTHX_ZHONG_8, //八肖中-【自选】【8】
    SBTHX_ZHONG_9, //九肖中-【自选】【9】
    SBTHX_ZHONG_10, //十肖中-【自选】【10】
    SBTHX_ZHONG_11, //十一肖中-【自选】【11】
    SBTHX_ZHONG_2_BEN, //二肖中-本年-【自选】【2】
    SBTHX_ZHONG_3_BEN, //三肖中-本年-【自选】【3】
    SBTHX_ZHONG_4_BEN, //四肖中-本年-【自选】【4】
    SBTHX_ZHONG_5_BEN, //五肖中-本年-【自选】【5】
    SBTHX_ZHONG_6_BEN, //六肖中-本年-【自选】【6】
    SBTHX_ZHONG_7_BEN, //七肖中-本年-【自选】【7】
    SBTHX_ZHONG_8_BEN, //八肖中-本年-【自选】【8】
    SBTHX_ZHONG_9_BEN, //九肖中-本年-【自选】【9】
    SBTHX_ZHONG_10_BEN, //十肖中-本年-【自选】【10】
    SBTHX_ZHONG_11_BEN, //十一肖中-本年-【自选】【11】
    SBTHX_COUNT, //子类型数目
  }

  //下注子类型 - 生肖连
  export enum emSubBetTypeSXL {
    SBTSXL_ZHONG_2 = 0, //二肖连中-【自选】【2】
    SBTSXL_ZHONG_3, //三肖连中-【自选】【3】
    SBTSXL_ZHONG_4, //四肖连中-【自选】【4】
    SBTSXL_ZHONG_5, //五肖连中-【自选】【5】
    SBTSXL_ZHONG_2_BEN, //二肖连中-本年-【自选】【2】
    SBTSXL_ZHONG_3_BEN, //三肖连中-本年-【自选】【3】
    SBTSXL_ZHONG_4_BEN, //四肖连中-本年-【自选】【4】
    SBTSXL_ZHONG_5_BEN, //五肖连中-本年-【自选】【5】
    SBTSXL_COUNT, //子类型数目
  }

  //下注子类型 - 连码
  export enum emSubBetTypeLianMa {
    SBTL_SI_QUAN = 0, //四全中-【自选】【4】
    SBTL_SAN_QUAN, //三全中-【自选】【3】
    SBTL_SAN_ER, //三中二-【自选】【3】
    SBTL_ER_QUAN, //二全中-【自选】【2】
    SBTL_ER_TE, //二中特-【自选】【2】
    SBTL_TE_CHUAN, //特串-【自选】【2】
    SBTL_COUNT, //子类型数目
  }

  //下注子类型 - 尾数连
  export enum emSubBetTypeWSL {
    SBTWSL_ZHONG_2 = 0, //二尾连中-【自选】【2】
    SBTWSL_ZHONG_3, //三尾连中-【自选】【3】
    SBTWSL_ZHONG_4, //四尾连中-【自选】【4】
    SBTWSL_ZHONG_5, //五尾连中-【自选】【5】
    SBTWSL_ZHONG_2_0, //二尾连中-含0尾-【自选】【2】
    SBTWSL_ZHONG_3_0, //三尾连中-含0尾-【自选】【3】
    SBTWSL_ZHONG_4_0, //四尾连中-含0尾-【自选】【4】
    SBTWSL_ZHONG_5_0, //五尾连中-含0尾-【自选】【5】
    SBTWSL_COUNT, //子类型数目
  }

  //下注子类型 - 全不中
  export enum emSubBetTypeQBZ {
    SBTQBZ_5 = 0, //五不中-【自选】【5】
    SBTQBZ_6, //六不中-【自选】【6】
    SBTQBZ_7, //七不中-【自选】【7】
    SBTQBZ_8, //八不中-【自选】【8】
    SBTQBZ_9, //九不中-【自选】【9】
    SBTQBZ_10, //十不中-【自选】【10】
    SBTQBZ_11, //十一不中-【自选】【11】
    SBTQBZ_12, //十二不中-【自选】【12】
    SBTQBZ_COUNT, //子类型数目
  }

  //下注子类型 - 五行
  export enum emSubBetTypeWuXing {
    SBTWX_JIN = 0, //金
    SBTWX_MU, //木
    SBTWX_SHUI, //水
    SBTWX_HUO, //火
    SBTWX_TU, //土
    SBTWX_COUNT, //子类型数目
  }

  // 下注子类型集合
  export const emBetSubTypeNames = [
    'emSubBetTypeTeMa',
    'emSubBetTypeZhengNum',
    'emSubBetTypeZheng',
    'emSubBetTypeHe',
    'emSubBetTypeSeBo',
    'emSubBetTypeTeTouWei',
    'emSubBetTypeZTW',
    'emXiaoType',
    'emSubBetTypeXiao',
    'emSubBetTypeZongXiao',
    'emSubBetTypeHeXiao',
    'emSubBetTypeSXL',
    'emSubBetTypeLianMa',
    'emSubBetTypeWSL',
    'emSubBetTypeQBZ',
    'emSubBetTypeWuXing',
  ];

  //区域限制类型
  export enum emLimitType {
    LT_TE_NUM = 0, //特码-数字
    LT_TE_DA_XIAO, //特码-大小
    LT_TE_DAN_SHUANG, //特码-单双
    LT_TE_DD_DS, //特码-大单、大双
    LT_TE_XS_XS, //特码-小单、小双
    LT_TE_HE_DA_XIAO, //特码-合数大小
    LT_TE_HE_DAN_SHUANG, //特码-合数单双
    LT_TE_WEI_DA_XIAO, //特码-尾数大小
    LT_ZN_NUM, //正码1-6-数字
    LT_ZN_DA_XIAO, //正码1-6-大小
    LT_ZN_DAN_SHUANG, //正码1-6-单双
    LT_ZN_HE_DA_XIAO, //正码1-6-合数大小
    LT_ZN_HE_DAN_SHUANG, //正码1-6-合数单双
    LT_ZN_WEI_DA_XIAO, //正码1-6-尾数大小
    LT_ZN_BO, //正码1-6-波段
    LT_ZHENG_NUM, //正码-数字
    LT_HR_DA_XIAO, //总和-大小
    LT_HE_DAN_SHUANG, //总和-单双
    LT_BO, //色波-红蓝绿
    LT_BO_BAN, //色波-半波
    LT_BO_BAN_BAN, //色波-半半波
    LT_TTW_TOU, //特头尾数-头数
    LT_TTW_WEI, //特头尾数-尾数
    LT_ZHENG_TE_WEI, //正特尾
    LT_XIAO_TE, //生肖-特肖
    LT_XIAO_ZHENG, //生肖-正肖
    LT_XIAO_YI, //生肖-一肖
    LT_XIAO_TIAN_DI, //生肖-天地肖
    LT_XIAO_QIAN_HOU, //生肖-前后肖
    LT_XIAO_JIA_YE, //生肖-家野肖
    LT_ZX_SHU, //总肖-总肖数
    LT_ZX_DAN_SHUANG, //总肖-单双
    LT_HE_XIAO, //合肖
    LT_SHENG_XIAO_LIAN, //生肖连
    LT_L_SI_QUAN, //连码-四全中
    LT_L_SAN_QUAN, //连码-三全中
    LT_L_SAN_ER, //连码-三中二
    LT_L_ER_QUAN, //连码-二全中
    LT_L_ER_TE, //连码-二中特
    LT_L_TE_CHUAN, //连码-特串
    LT_WEI_SHU_LIAN, //尾数连
    LT_QBZ_5, //全不中-五不中
    LT_QBZ_6, //全不中-六不中
    LT_QBZ_7, //全不中-七不中
    LT_QBZ_8, //全不中-八不中
    LT_QBZ_9, //全不中-九不中
    LT_QBZ_10, //全不中-十不中
    LT_QBZ_11, //全不中-十一不中
    LT_QBZ_12, //全不中-十二不中
    LT_WU_XING, //五行
    LT_COUNT = 50, //区域限制类型数目
    LT_INVALID = 0xff, //无效区域限制类型
  }

  //倍数类型
  export enum emMultipleType {
    MT_TE_NUM = 0, //特码-数字
    MT_TE_DA, //特码-大
    MT_TE_XIAO, //特码-小
    MT_TE_DAN, //特码-单
    MT_TE_SHUANG, //特码-双
    MT_TE_DA_DAN, //特码-大单
    MT_TE_XIAO_DAN, //特码-小单
    MT_TE_DA_SHUANG, //特码-大双
    MT_TE_XIAO_SHUANG, //特码-小双
    MT_TE_HE_DA, //特码-合大
    MT_TE_HE_XIAO, //特码-合小
    MT_TE_HE_DAN, //特码-合单
    MT_TE_HE_SHUANG, //特码-合双
    MT_TE_WEI_DA, //特码-尾大
    MT_TE_WEI_XIAO, //特码-尾小
    MT_ZN_NUM = 15, //正码1-6-数字
    MT_ZN_DA, //正码1-6-大
    MT_ZN_XIAO, //正码1-6-小
    MT_ZN_DAN, //正码1-6-单
    MT_ZN_SHUANG, //正码1-6-双
    MT_ZN_HE_DA, //正码1-6-合大
    MT_ZN_HE_XIAO, //正码1-6-合小
    MT_ZN_HE_DAN, //正码1-6-合单
    MT_ZN_HE_SHUANG, //正码1-6-合双
    MT_ZN_WEI_DA, //正码1-6-尾大
    MT_ZN_WEI_XIAO, //正码1-6-尾小
    MT_ZN_HONG, //正码1-6-红波
    MT_ZN_LAN, //正码1-6-蓝波
    MT_ZN_LV, //正码1-6-绿波
    MT_ZHENG_NUM = 29, //正码-数字
    MT_HE_DA = 30, //总和-大
    MT_HE_XIAO, //总和-小
    MT_HE_DAN, //总和-单
    MT_HE_SHUANG, //总和-双
    MT_BO_HONG = 34, //色波-红
    MT_BO_LAN, //色波-蓝
    MT_BO_LV, //色波-绿
    MT_BO_HONG_DA = 37, //色波-红-大
    MT_BO_HONG_XIAO, //色波-红-小
    MT_BO_HONG_DAN, //色波-红-单
    MT_BO_HONG_SHUANG, //色波-红-双
    MT_BO_HONG_DA_DAN, //色波-红-大单
    MT_BO_HONG_XIAO_DAN, //色波-红-小单
    MT_BO_HONG_DA_SHUANG, //色波-红-大双
    MT_BO_HONG_XIAO_SHUANG, //色波-红-小双
    MT_BO_LAN_DA = 45, //色波-蓝-大
    MT_BO_LAN_XIAO, //色波-蓝-小
    MT_BO_LAN_DAN, //色波-蓝-单
    MT_BO_LAN_SHUANG, //色波-蓝-双
    MT_BO_LAN_DA_DAN, //色波-蓝-大单
    MT_BO_LAN_XIAO_DAN, //色波-蓝-小单
    MT_BO_LAN_DA_SHUANG, //色波-蓝-大双
    MT_BO_LAN_XIAO_SHUANG, //色波-蓝-小双
    MT_BO_LV_DA = 53, //色波-绿-大
    MT_BO_LV_XIAO, //色波-绿-小
    MT_BO_LV_DAN, //色波-绿-单
    MT_BO_LV_SHUANG, //色波-绿-双
    MT_BO_LV_DA_DAN, //色波-绿-大单
    MT_BO_LV_XIAO_DAN, //色波-绿-小单
    MT_BO_LV_DA_SHUANG, //色波-绿-大双
    MT_BO_LV_XIAO_SHUANG, //色波-绿-小双
    MT_TTW_TOU_0 = 61, //特头尾数-0头
    MT_TTW_TOU_1_4, //特头尾数-1-4头
    MT_TTW_WEI_0, //特头尾数-0尾
    MT_TTW_WEI_1_9, //特头尾数-1-9尾
    MT_ZTW_0 = 65, //正特尾-0
    MT_ZTW_1_9, //正特尾-1-9
    MT_TX = 67, //特肖
    MT_ZX, //正肖
    MT_YX, //一肖
    MT_TX_BEN, //特肖-本年
    MT_ZX_BEN, //正肖-本年
    MT_YX_BEN, //一肖-本年
    MT_TX_TIAN, //特天肖
    MT_TX_DI, //特地肖
    MT_TX_QIAN, //特前肖
    MT_TX_HOU, //特后肖
    MT_TX_JIA, //特家肖
    MT_TX_YE, //特野肖
    MT_ZX_SHU_2 = 79, //总肖数-2
    MT_ZX_SHU_3, //总肖数-3
    MT_ZX_SHU_4, //总肖数-4
    MT_ZX_SHU_5, //总肖数-5
    MT_ZX_SHU_6, //总肖数-6
    MT_ZX_SHU_7, //总肖数-7
    MT_ZX_DAN, //总肖-单
    MT_ZX_SHUANG, //总肖-双
    MT_HE_ZHONG_2 = 87, //合肖-二肖中
    //...
    MT_HE_ZHONG_11 = 96, //合肖-十一肖中
    MT_HE_ZHONG_2_BEN = 97, //合肖-二肖中-本年
    //...
    MT_HE_ZHONG_11_BEN = 106, //合肖-十一肖中-本年
    MT_SXL_ZHONG_2 = 107, //生肖连-二肖连中
    MT_SXL_ZHONG_3, //生肖连-三肖连中
    MT_SXL_ZHONG_4, //生肖连-四肖连中
    MT_SXL_ZHONG_5, //生肖连-五肖连中
    MT_SXL_ZHONG_2_BEN, //生肖连-二肖连中-本年
    MT_SXL_ZHONG_3_BEN, //生肖连-三肖连中-本年
    MT_SXL_ZHONG_4_BEN, //生肖连-四肖连中-本年
    MT_SXL_ZHONG_5_BEN, //生肖连-五肖连中-本年
    MT_L_SI_QUAN = 115, //连码-四全中
    MT_L_SAN_QUAN, //连码-三全中
    MT_L_SAN_ER, //连码-三中二
    MT_L_ER_QUAN, //连码-二全中
    MT_L_ER_TE, //连码-二中特
    MT_L_TE_CHUAN, //连码-特串
    MT_L_SAN_ER_SAN, //连码-三中二之中三
    MT_L_ER_TE_ER, //连码-二中特之中二
    MT_WSL_ZHONG_2 = 123, //尾数连-二尾连中
    MT_WSL_ZHONG_3, //尾数连-三尾连中
    MT_WSL_ZHONG_4, //尾数连-四尾连中
    MT_WSL_ZHONG_5, //尾数连-五尾连中
    MT_WSL_ZHONG_2_0, //尾数连-二尾连中-含0尾
    MT_WSL_ZHONG_3_0, //尾数连-三尾连中-含0尾
    MT_WSL_ZHONG_4_0, //尾数连-四尾连中-含0尾
    MT_WSL_ZHONG_5_0, //尾数连-五尾连中-含0尾
    MT_QBZ_5 = 131, //全不中-五不中
    //...
    MT_QBZ_12 = 138, //全不中-十二不中
    MT_WX_JIN = 139, //五行-金
    MT_WX_MU, //五行-木
    MT_WX_SHUI, //五行-水
    MT_WX_HUO, //五行-火
    MT_WX_TU, //五行-土
    MT_COM_HE = 144, //通用-和局
    MT_COUNT = 145, //倍数类型数目
    MT_INVALID = 0xffff, //无效倍数类型
  }

  //开奖结果位置类型
  export enum emResultPosType {
    RPT_T_DX = 0, //特码-大小
    RPT_Z1_DX, //正码1-大小
    RPT_Z2_DX, //正码2-大小
    RPT_Z3_DX, //正码3-大小
    RPT_Z4_DX, //正码4-大小
    RPT_Z5_DX, //正码5-大小
    RPT_Z6_DX, //正码6-大小
    RPT_T_DS, //特码-单双
    RPT_Z1_DS, //正码1-单双
    RPT_Z2_DS, //正码2-单双
    RPT_Z3_DS, //正码3-单双
    RPT_Z4_DS, //正码4-单双
    RPT_Z5_DS, //正码5-单双
    RPT_Z6_DS, //正码6-单双
    RPT_T_BO, //特码-色波
    RPT_Z1_BO, //正码1-色波
    RPT_Z2_BO, //正码2-色波
    RPT_Z3_BO, //正码3-色波
    RPT_Z4_BO, //正码4-色波
    RPT_Z5_BO, //正码5-色波
    RPT_Z6_BO, //正码6-色波
    RPT_T_XIAO, //特码-生肖
    RPT_Z1_XIAO, //正码1-生肖
    RPT_Z2_XIAO, //正码2-生肖
    RPT_Z3_XIAO, //正码3-生肖
    RPT_Z4_XIAO, //正码4-生肖
    RPT_Z5_XIAO, //正码5-生肖
    RPT_Z6_XIAO, //正码6-生肖
    RPT_HE_DX, //总和-大小
    RPT_HE_DS, //总和-单双
    RPT_WU_XING, //五行
    RPT_COUNT = 31, //结果位置类型数目
    // RPT_COUNT = 30,                 //结果位置类型数目
    RPT_INVALID = 0xff, //无效结果位置类型
  }

  //开奖结果类型
  export enum emResultType {
    RT_DA = 0, //大
    RT_XIAO, //小
    RT_DAN, //单
    RT_SHUANG, //双
    RT_BO_HONG, //红波
    RT_BO_LAN, //蓝波
    RT_BO_LV, //绿波
    RT_XIAO_SHU, //生肖-鼠
    RT_XIAO_NIU, //生肖-牛
    RT_XIAO_HU, //生肖-虎
    RT_XIAO_TU, //生肖-兔
    RT_XIAO_LONG, //生肖-龙
    RT_XIAO_SHE, //生肖-蛇
    RT_XIAO_MA, //生肖-马
    RT_XIAO_YANG, //生肖-羊
    RT_XIAO_HOU, //生肖-猴
    RT_XIAO_JI, //生肖-鸡
    RT_XIAO_GOU, //生肖-狗
    RT_XIAO_ZHU, //生肖-猪
    RT_WX_JIN, //五行-金
    RT_WX_MU, //五行-木
    RT_WX_SHUI, //五行-水
    RT_WX_HUO, //五行-火
    RT_WX_TU, //五行-土
    RT_INVALID = 0xff, //无效开奖结果类型
  }

  export const GAME_SCENE_FREE: number = 0; //等待开始

  export const GAME_SCENE_BET: number = 100; //下注状态

  export const GAME_SCENE_WAIT: number = 101; //封盘状态

  export const MAX_NUMBER_COUNT: number = 12; //最大自选号码数目

  // export const LEN_SINGLE_BET_SUB: number = emSubBetTypeHe.SBTH_COUNT; //最大子类型长度(单一区域)

  export const COUNT_OF_CARS: number = 7; //开奖结果

  export const MAX_SEND_HISTORY: number = 50; //开奖记录

  export const JETTON_COUNT: number = 9; //筹码档位数目

  export const MAX_MUTEX_SUBTYPE_COUNT: number = 4; //最大互斥子区域数目

  export const SUB_CHANG_LONG_INVALID: number = 0xff; //无效长龙子类型

  export const MAX_SUB_CHANG_LONG_COUNT: number = 3; //最大长龙子类型数目

  export const LEN_NUMBER: number = 1; //最大开奖数值数量

  export const MAX_DYNAMIC_MULTIPLE_COUNT: number = 0xff; //最大动态赔率档位

  export const SOURCE_DATA_COUNT: number = 7; //源数据数量

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

  //游戏场景
  export class CMD_S_GameScene extends Struct {
    dwTimeLeave = CreateObject(DWORD); //剩余时间
    dwAllSeconds = CreateObject(DWORD); //总时间
    dwTrunSeconds = CreateObject(DWORD); //每轮时间
    dwValidSeconds = CreateObject(DWORD); //投注时间
    stGameConfig = CreateObject(tagBaseConfig); //基础配置
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    cbCurrXiao = CreateObject(BYTE); //本年生肖
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

  // 3402 主码映射描述
  export const map3402MainType = new Map<number, string>([
    [CMD_3402.emBetMainType.BTM_TE, '特码'],
    [CMD_3402.emBetMainType.BTM_ZHENG_1, '正码1'],
    [CMD_3402.emBetMainType.BTM_ZHENG_2, '正码2'],
    [CMD_3402.emBetMainType.BTM_ZHENG_3, '正码3'],
    [CMD_3402.emBetMainType.BTM_ZHENG_4, '正码4'],
    [CMD_3402.emBetMainType.BTM_ZHENG_5, '正码5'],
    [CMD_3402.emBetMainType.BTM_ZHENG_6, '正码6'],
    [CMD_3402.emBetMainType.BTM_ZHENG, '正码'],
    [CMD_3402.emBetMainType.BTM_HE, '总和'],
    [CMD_3402.emBetMainType.BTM_SE_BO, '色波'],
    [CMD_3402.emBetMainType.BTM_TE_TOU_WEI, '特头尾数'],
    [CMD_3402.emBetMainType.BTM_ZHENG_TE_WEI, '正特尾'],
    [CMD_3402.emBetMainType.BTM_XIAO, '生肖'],
    [CMD_3402.emBetMainType.BTM_ZONG_XIAO, '总肖'],
    [CMD_3402.emBetMainType.BTM_HE_XIAO, '合肖'],
    [CMD_3402.emBetMainType.BTM_SHENG_XIAO_LIAN, '生肖连'],
    [CMD_3402.emBetMainType.BTM_LIAN_MA, '连码'],
    [CMD_3402.emBetMainType.BTM_WEI_SHU_LIAN, '尾数连'],
    [CMD_3402.emBetMainType.BTM_QUAN_BU_ZHONG, '全不中'],
    [CMD_3402.emBetMainType.BTM_WU_XING, '五行'],
    [CMD_3402.emBetMainType.BTM_COUNT, '下注类型数目'],
  ]);

  /**
   * @description: 获取主下注类型描述
   * @return {*}
   */
  export function GetGame3402BetMainType(mType: number): string {
    if (map3402MainType.has(mType)) return map3402MainType.get(mType);
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

  // 下注子类型 - 特码
  const mapTmType = new Map<number, string>([
    [emSubBetTypeTeMa.SBTT_DA, '大'],
    [emSubBetTypeTeMa.SBTT_XIAO, '小'],
    [emSubBetTypeTeMa.SBTT_DAN, '单'],
    [emSubBetTypeTeMa.SBTT_SHUANG, '双'],
    [emSubBetTypeTeMa.SBTT_DA_DAN, '大单'],
    [emSubBetTypeTeMa.SBTT_XIAO_DAN, '小单'],
    [emSubBetTypeTeMa.SBTT_DA_SHUANG, '大双'],
    [emSubBetTypeTeMa.SBTT_XIAO_SHUANG, '小双'],
    [emSubBetTypeTeMa.SBTT_HE_DA, '合大'],
    [emSubBetTypeTeMa.SBTT_HE_XIAO, '合小'],
    [emSubBetTypeTeMa.SBTT_HE_DAN, '合单'],
    [emSubBetTypeTeMa.SBTT_HE_SHUANG, '合双'],
    [emSubBetTypeTeMa.SBTT_WEI_DA, '尾大'],
    [emSubBetTypeTeMa.SBTT_WEI_XIAO, '尾小'],
  ]);

  // 下注子类型 - 正码1-6
  const mapZmSixType = new Map<number, string>([
    [emSubBetTypeZhengNum.SBTZN_DA, '大'],
    [emSubBetTypeZhengNum.SBTZN_XIAO, '小'],
    [emSubBetTypeZhengNum.SBTZN_DAN, '单'],
    [emSubBetTypeZhengNum.SBTZN_SHUANG, '双'],
    [emSubBetTypeZhengNum.SBTZN_HE_DA, '合大'],
    [emSubBetTypeZhengNum.SBTZN_HE_XIAO, '合小'],
    [emSubBetTypeZhengNum.SBTZN_HE_DAN, '合单'],
    [emSubBetTypeZhengNum.SBTZN_HE_SHUANG, '合双'],
    [emSubBetTypeZhengNum.SBTZN_WEI_DA, '尾大'],
    [emSubBetTypeZhengNum.SBTZN_WEI_XIAO, '尾小'],
    [emSubBetTypeZhengNum.SBTZN_HONG, '红波'],
    [emSubBetTypeZhengNum.SBTZN_LAN, '蓝波'],
    [emSubBetTypeZhengNum.SBTZN_LV, '绿波'],
  ]);

  // 下注子类型 - 正码
  const mapZmType = new Map<number, string>([[emSubBetTypeZheng.SBTZ_NUM, '数字-【自选】']]);

  // 下注子类型 - 总和
  const mapSumType = new Map<number, string>([
    [emSubBetTypeHe.SBTH_DA, '总大'],
    [emSubBetTypeHe.SBTH_XIAO, '总小'],
    [emSubBetTypeHe.SBTH_DAN, '总单'],
    [emSubBetTypeHe.SBTH_SHUANG, '总双'],
  ]);
  // 下注子类型 - 色波
  const mapSbType = new Map<number, string>([
    [emSubBetTypeSeBo.SBTB_HONG, '红'],
    [emSubBetTypeSeBo.SBTB_LAN, '蓝'],
    [emSubBetTypeSeBo.SBTB_LV, '绿'],
    [emSubBetTypeSeBo.SBTB_HONG_DA, '红大'],
    [emSubBetTypeSeBo.SBTB_HONG_XIAO, '红小'],
    [emSubBetTypeSeBo.SBTB_HONG_DAN, '红单'],
    [emSubBetTypeSeBo.SBTB_HONG_SHUANG, '红-双'],
    [emSubBetTypeSeBo.SBTB_HONG_DA_DAN, '红大单'],
    [emSubBetTypeSeBo.SBTB_HONG_XIAO_DAN, '红小单'],
    [emSubBetTypeSeBo.SBTB_HONG_DA_SHUANG, '红大双'],
    [emSubBetTypeSeBo.SBTB_HONG_XIAO_SHUANG, '红小双'],
    [emSubBetTypeSeBo.SBTB_LAN_DA, '蓝大'],
    [emSubBetTypeSeBo.SBTB_LAN_XIAO, '蓝小'],
    [emSubBetTypeSeBo.SBTB_LAN_DAN, '蓝单'],
    [emSubBetTypeSeBo.SBTB_LAN_SHUANG, '蓝双'],
    [emSubBetTypeSeBo.SBTB_LAN_DA_DAN, '蓝大单'],
    [emSubBetTypeSeBo.SBTB_LAN_XIAO_DAN, '蓝小单'],
    [emSubBetTypeSeBo.SBTB_LAN_DA_SHUANG, '蓝大双'],
    [emSubBetTypeSeBo.SBTB_LAN_XIAO_SHUANG, '蓝小双'],
    [emSubBetTypeSeBo.SBTB_LV_DA, '绿大'],
    [emSubBetTypeSeBo.SBTB_LV_XIAO, '绿小'],
    [emSubBetTypeSeBo.SBTB_LV_DAN, '绿单'],
    [emSubBetTypeSeBo.SBTB_LV_SHUANG, '绿双'],
    [emSubBetTypeSeBo.SBTB_LV_DA_DAN, '绿大单'],
    [emSubBetTypeSeBo.SBTB_LV_XIAO_DAN, '绿小单'],
    [emSubBetTypeSeBo.SBTB_LV_DA_SHUANG, '绿大双'],
    [emSubBetTypeSeBo.SBTB_LV_XIAO_SHUANG, '绿小双'],
  ]);

  // 下注子类型 - 特头尾数
  const mapTtwsType = new Map<number, string>([]);
  // 下注子类型 - 正特尾
  const mapZtwType = new Map<number, string>([]);

  //下注子类型 - 生肖
  const mapSxType = new Map<number, string>([
    [emSubBetTypeXiao.SBTX_TE, '特肖'],
    [emSubBetTypeXiao.SBTX_ZHENG, '正肖'],
    [emSubBetTypeXiao.SBTX_YI, '一肖'],
    [emSubBetTypeXiao.SBTX_TE_BEN, '特肖本年'],
    [emSubBetTypeXiao.SBTX_ZHENG_BEN, '正肖本年'],
    [emSubBetTypeXiao.SBTX_YI_BEN, '一肖本年'],
    [emSubBetTypeXiao.SBTX_XIAO_TIAN, '特天肖'],
    [emSubBetTypeXiao.SBTX_XIAO_DI, '特地肖'],
    [emSubBetTypeXiao.SBTX_XIAO_QIAN, '特前肖'],
    [emSubBetTypeXiao.SBTX_XIAO_HOU, '特后肖'],
    [emSubBetTypeXiao.SBTX_XIAO_JIA, '特家肖'],
    [emSubBetTypeXiao.SBTX_XIAO_YE, '特野肖'],
  ]);
  //下注子类型 - 总肖
  const mapZxType = new Map<number, string>([
    [emSubBetTypeZongXiao.SBTZX_SHU, '总肖数'],
    [emSubBetTypeZongXiao.SBTZX_DAN, '总肖单'],
    [emSubBetTypeZongXiao.SBTZX_SHUANG, '总肖双'],
  ]);
  //下注子类型 - 合肖
  const mapHxType = new Map<number, string>([
    [emSubBetTypeHeXiao.SBTHX_ZHONG_2, '二肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_3, '三肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_4, '四肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_5, '五肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_6, '六肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_7, '七肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_8, '八肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_9, '九肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_10, '十肖中'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_11, '十一肖中'],

    [emSubBetTypeHeXiao.SBTHX_ZHONG_2_BEN, '二肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_3_BEN, '三肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_4_BEN, '四肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_5_BEN, '五肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_6_BEN, '六肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_7_BEN, '七肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_8_BEN, '八肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_9_BEN, '九肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_10_BEN, '十肖中-本年'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_11_BEN, '十一肖中-本年'],
  ]);

  //下注子类型 - 生肖连
  const mapSxlType = new Map<number, string>([
    [emSubBetTypeSXL.SBTSXL_ZHONG_2, '二肖连中'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_3, '三肖连中'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_4, '四肖连中'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_5, '五肖连中'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_2_BEN, '二肖连中本年'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_3_BEN, '三肖连中本年'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_4_BEN, '四肖连中本年'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_5_BEN, '五肖连中本年'],
  ]);

  //下注子类型 - 连码
  const mapLmType = new Map<number, string>([
    [emSubBetTypeLianMa.SBTL_SI_QUAN, '四全中'],
    [emSubBetTypeLianMa.SBTL_SAN_QUAN, '三全中'],
    [emSubBetTypeLianMa.SBTL_SAN_ER, '三中二'],
    [emSubBetTypeLianMa.SBTL_ER_QUAN, '二全中'],
    [emSubBetTypeLianMa.SBTL_ER_TE, '二中特'],
    [emSubBetTypeLianMa.SBTL_TE_CHUAN, '特串'],
  ]);
  //下注子类型 - 尾数连
  const mapWslType = new Map<number, string>([
    [emSubBetTypeWSL.SBTWSL_ZHONG_2, '二尾连中'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_3, '三尾连中'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_4, '四尾连中'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_5, '五尾连中'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_2_0, '二尾连中-含0尾'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_3_0, '三尾连中-含0尾'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_4_0, '四尾连中-含0尾'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_5_0, '五尾连中-含0尾'],
  ]);
  //下注子类型 - 全不中
  const mapQbzType = new Map<number, string>([
    [emSubBetTypeQBZ.SBTQBZ_5, '五不中'],
    [emSubBetTypeQBZ.SBTQBZ_6, '六不中'],
    [emSubBetTypeQBZ.SBTQBZ_7, '七不中'],
    [emSubBetTypeQBZ.SBTQBZ_8, '八不中'],
    [emSubBetTypeQBZ.SBTQBZ_9, '九不中'],
    [emSubBetTypeQBZ.SBTQBZ_10, '十不中'],
    [emSubBetTypeQBZ.SBTQBZ_11, '十一不中'],
    [emSubBetTypeQBZ.SBTQBZ_12, '十二不中'],
  ]);
  //下注子类型 - 五行
  const mapWhType = new Map<number, string>([
    [emSubBetTypeWuXing.SBTWX_JIN, '金'],
    [emSubBetTypeWuXing.SBTWX_MU, '木'],
    [emSubBetTypeWuXing.SBTWX_SHUI, '水'],
    [emSubBetTypeWuXing.SBTWX_HUO, '火'],
    [emSubBetTypeWuXing.SBTWX_TU, '土'],
  ]);
  /**
   * @description: 3402获取子区域下注描述
   * @param {number} mType
   * @param {number} sType
   * @param {Array} num
   * @return {*}
   */
  export function GetGame3402BetSubType(mType: number, sType: number, num?: Array<number | BYTE>): string {
    console.log('');
    const zmSixArr = [
      CMD_3402.emBetMainType.BTM_ZHENG_1,
      CMD_3402.emBetMainType.BTM_ZHENG_2,
      CMD_3402.emBetMainType.BTM_ZHENG_3,
      CMD_3402.emBetMainType.BTM_ZHENG_4,
      CMD_3402.emBetMainType.BTM_ZHENG_5,
      CMD_3402.emBetMainType.BTM_ZHENG_6,
    ];
    if (mType === CMD_3402.emBetMainType.BTM_TE) {
      //特码
      if (sType === CMD_3402.emSubBetTypeTeMa.SBTT_NUM) {
        //自选数字
        return NumberByteDesc(num);
      }
      return mapTmType.get(sType);
    } else if (mType === CMD_3402.emBetMainType.BTM_HE) {
      return mapSumType.get(sType);
      // 总和
    } else if (mType === CMD_3402.emBetMainType.BTM_XIAO) {
      // 生肖
      let desc = mapSxType.get(sType);
      if (num) {
        return (desc += NumberByteDesc(num));
      }
    } else if (zmSixArr.includes(mType)) {
      // 正码1~6
      return mapZmSixType.get(sType);
    } else if (mType === CMD_3402.emBetMainType.BTM_ZONG_XIAO) {
      // 总肖
      console.log('总肖', 'num', num);
      return mapZxType.get(sType);
    }
  }
  // 开奖结果映射
  const mapResultType = new Map<number, string>([
    [emResultType.RT_DA, '大'],
    [emResultType.RT_XIAO, '小'],
    [emResultType.RT_DAN, '单'],
    [emResultType.RT_SHUANG, '双'],
    [emResultType.RT_BO_HONG, '红波'],
    [emResultType.RT_BO_LAN, '蓝波'],
    [emResultType.RT_BO_LV, '绿波'],
    [emResultType.RT_XIAO_SHU, '鼠'],
    [emResultType.RT_XIAO_NIU, '牛'],
    [emResultType.RT_XIAO_HU, '虎'],
    [emResultType.RT_XIAO_TU, '兔'],
    [emResultType.RT_XIAO_LONG, '龙'],
    [emResultType.RT_XIAO_SHE, '蛇'],
    [emResultType.RT_XIAO_MA, '马'],
    [emResultType.RT_XIAO_YANG, '羊'],
    [emResultType.RT_XIAO_HOU, '猴'],
    [emResultType.RT_XIAO_JI, '鸡'],
    [emResultType.RT_XIAO_GOU, '狗'],
    [emResultType.RT_XIAO_ZHU, '猪'],
    [emResultType.RT_WX_JIN, '金'],
    [emResultType.RT_WX_MU, '木'],
    [emResultType.RT_WX_SHUI, '水'],
    [emResultType.RT_WX_HUO, '火'],
    [emResultType.RT_WX_TU, '土'],
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

