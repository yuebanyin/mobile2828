import {
  BYTE,
  CSTRING,
  CreateArray,
  CreateArray2,
  CreateObject,
  DWORD,
  SCORE,
  Struct,
  WSTRING,
} from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';

export namespace CMD_2903 {
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
    BTM_BAN_BO, //半波
    BTM_TE_XIAO, //特肖
    BTM_YI_XIAO, //一肖
    BTM_ZHENG_TE_WEI, //正特尾
    BTM_LIAN_MA, //连码
    BTM_HE_XIAO, //合肖
    BTM_SHENG_XIAO_LIAN, //生肖连
    BTM_WEI_SHU_LIAN, //尾数连
    BTM_QUAN_BU_ZHONG, //全不中
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
    SBTT_HE_DAN, //合单
    SBTT_HE_SHUANG, //合双
    SBTT_WEI_DA, //尾大
    SBTT_WEI_XIAO, //尾小
    SBTT_HONG, //红波
    SBTT_LAN, //蓝波
    SBTT_LV, //绿波
    SBTT_COUNT, //子类型数目
  }

  //下注子类型 - 正码1-6
  export enum emSubBetTypeZhengNum {
    SBTZN_NUM = 0, //数字-【自选】【1】
    SBTZN_DA, //大
    SBTZN_XIAO, //小
    SBTZN_DAN, //单
    SBTZN_SHUANG, //双
    SBTZN_HE_DAN, //合单
    SBTZN_HE_SHUANG, //合双
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

  //下注子类型 - 半波
  export enum emSubBetTypeBanBo {
    SBTB_HONG_DA = 0, //红-大
    SBTB_HONG_XIAO, //红-小
    SBTB_HONG_DAN, //红-单
    SBTB_HONG_SHUANG, //红-双
    SBTB_LAN_DA, //蓝-大
    SBTB_LAN_XIAO, //蓝-小
    SBTB_LAN_DAN, //蓝-单
    SBTB_LAN_SHUANG, //蓝-双
    SBTB_LV_DA, //绿-大
    SBTB_LV_XIAO, //绿-小
    SBTB_LV_DAN, //绿-单
    SBTB_LV_SHUANG, //绿-双
    SBTB_COUNT, //子类型数目
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

  //下注子类型 - 正特尾
  export enum emSubBetTypeZTW {
    SBTZTW_NUM = 0, //数字-【自选】【1】
    SBTZTW_COUNT, //子类型数目
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

  //下注子类型 - 合肖
  export enum emSubBetTypeHeXiao {
    SBTHX_ZHONG_1 = 0, //一肖中-【自选】【1】
    SBTHX_ZHONG_2, //二肖中-【自选】【2】
    SBTHX_ZHONG_3, //三肖中-【自选】【3】
    SBTHX_ZHONG_4, //四肖中-【自选】【4】
    SBTHX_ZHONG_5, //五肖中-【自选】【5】
    SBTHX_ZHONG_6, //六肖中-【自选】【6】
    SBTHX_ZHONG_7, //七肖中-【自选】【7】
    SBTHX_ZHONG_8, //八肖中-【自选】【8】
    SBTHX_ZHONG_9, //九肖中-【自选】【9】
    SBTHX_ZHONG_10, //十肖中-【自选】【10】
    SBTHX_BU_ZHONG_2, //二肖不中-【自选】【2】
    SBTHX_BU_ZHONG_3, //三肖不中-【自选】【3】
    SBTHX_BU_ZHONG_4, //四肖不中-【自选】【4】
    SBTHX_BU_ZHONG_5, //五肖不中-【自选】【5】
    SBTHX_BU_ZHONG_6, //六肖不中-【自选】【6】
    SBTHX_BU_ZHONG_7, //七肖不中-【自选】【7】
    SBTHX_BU_ZHONG_8, //八肖不中-【自选】【8】
    SBTHX_BU_ZHONG_9, //九肖不中-【自选】【9】
    SBTHX_BU_ZHONG_10, //十肖不中-【自选】【10】
    SBTHX_COUNT, //子类型数目
  }

  //下注子类型 - 生肖连
  export enum emSubBetTypeSXL {
    SBTSXL_ZHONG_2 = 0, //二肖连中-【自选】【2】
    SBTSXL_ZHONG_3, //三肖连中-【自选】【3】
    SBTSXL_ZHONG_4, //四肖连中-【自选】【4】
    SBTSXL_ZHONG_5, //五肖连中-【自选】【5】
    SBTSXL_BU_ZHONG_2, //二肖连不中-【自选】【2】
    SBTSXL_BU_ZHONG_3, //三肖连不中-【自选】【3】
    SBTSXL_BU_ZHONG_4, //四肖连不中-【自选】【4】
    SBTSXL_BU_ZHONG_5, //五肖连不中-【自选】【5】
    SBTSXL_ZHONG_2_BEN, //二肖连中-本年-【自选】【2】
    SBTSXL_ZHONG_3_BEN, //三肖连中-本年-【自选】【3】
    SBTSXL_ZHONG_4_BEN, //四肖连中-本年-【自选】【4】
    SBTSXL_ZHONG_5_BEN, //五肖连中-本年-【自选】【5】
    SBTSXL_BU_ZHONG_2_BEN, //二肖连不中-本年-【自选】【2】
    SBTSXL_BU_ZHONG_3_BEN, //三肖连不中-本年-【自选】【3】
    SBTSXL_BU_ZHONG_4_BEN, //四肖连不中-本年-【自选】【4】
    SBTSXL_BU_ZHONG_5_BEN, //五肖连不中-本年-【自选】【5】
    SBTSXL_COUNT, //子类型数目
  }

  //下注子类型 - 尾数连
  export enum emSubBetTypeWSL {
    SBTWSL_ZHONG_2 = 0, //二尾连中-【自选】【2】
    SBTWSL_ZHONG_3, //三尾连中-【自选】【3】
    SBTWSL_ZHONG_4, //四尾连中-【自选】【4】
    SBTWSL_BU_ZHONG_2, //二尾连不中-【自选】【2】
    SBTWSL_BU_ZHONG_3, //三尾连不中-【自选】【3】
    SBTWSL_BU_ZHONG_4, //四尾连不中-【自选】【4】
    SBTWSL_ZHONG_2_0, //二尾连中-含0尾-【自选】【2】
    SBTWSL_ZHONG_3_0, //三尾连中-含0尾-【自选】【3】
    SBTWSL_ZHONG_4_0, //四尾连中-含0尾-【自选】【4】
    SBTWSL_BU_ZHONG_2_0, //二尾连不中-含0尾-【自选】【2】
    SBTWSL_BU_ZHONG_3_0, //三尾连不中-含0尾-【自选】【3】
    SBTWSL_BU_ZHONG_4_0, //四尾连不中-含0尾-【自选】【4】
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

  // 抛出子类型的名称
  export const emBetSubTypeNames = [
    'emSubBetTypeTeMa',
    'emSubBetTypeZhengNum',
    'emSubBetTypeZheng',
    'emSubBetTypeHe',
    'emSubBetTypeBanBo',
    'emXiaoType',
    'emSubBetTypeZTW',
    'emSubBetTypeLianMa',
    'emSubBetTypeHeXiao',
    'emSubBetTypeSXL',
    'emSubBetTypeWSL',
    'emSubBetTypeQBZ',
  ];

  //区域限制类型
  export enum emLimitType {
    LT_TE_NUM = 0, //特码-数字
    LT_TE_DA_XIAO, //特码-大小
    LT_TE_DAN_SHUANG, //特码-单双
    LT_TE_HE_DAN_SHUANG, //特码-合数单双
    LT_TE_WEI_DA_XIAO, //特码-尾数大小
    LT_TE_BO, //特码-波段
    LT_ZN_NUM, //正码1-6-数字
    LT_ZN_DA_XIAO, //正码1-6-大小
    LT_ZN_DAN_SHUANG, //正码1-6-单双
    LT_ZN_HE_DAN_SHUANG, //正码1-6-合数单双
    LT_ZN_BO, //正码1-6-波段
    LT_ZHENG_NUM, //正码-数字
    LT_HR_DA_XIAO, //总和-大小
    LT_HE_DAN_SHUANG, //总和-单双
    LT_BAN_BO, //半波
    LT_TE_XIAO, //特肖
    LT_YI_XIAO, //一肖
    LT_ZHENG_TE_WEI, //正特尾
    LT_L_SI_QUAN, //连码-四全中
    LT_L_SAN_QUAN, //连码-三全中
    LT_L_SAN_ER, //连码-三中二
    LT_L_ER_QUAN, //连码-二全中
    LT_L_ER_TE, //连码-二中特
    LT_L_TE_CHUAN, //连码-特串
    LT_HE_XIAO, //合肖
    LT_SXL_ZHONG_2, //生肖连-二肖连中
    LT_SXL_ZHONG_3, //生肖连-三肖连中
    LT_SXL_ZHONG_4, //生肖连-四肖连中
    LT_SXL_ZHONG_5, //生肖连-五肖连中
    LT_SXL_BU_ZHONG_2, //生肖连-二肖连不中
    LT_SXL_BU_ZHONG_3, //生肖连-三肖连不中
    LT_SXL_BU_ZHONG_4, //生肖连-四肖连不中
    LT_SXL_BU_ZHONG_5, //生肖连-五肖连不中
    LT_WSL_ZHONG_2, //尾数连-二尾连中
    LT_WSL_ZHONG_3, //尾数连-三尾连中
    LT_WSL_ZHONG_4, //尾数连-四尾连中
    LT_WSL_BU_ZHONG_2, //尾数连-二尾连不中
    LT_WSL_BU_ZHONG_3, //尾数连-三尾连不中
    LT_WSL_BU_ZHONG_4, //尾数连-四尾连不中
    LT_QUAN_BU_ZHONG, //全不中
    LT_COUNT = 40, //区域限制类型数目
    LT_INVALID = 0xff, //无效区域限制类型
  }

  //倍数类型
  export enum emMultipleType {
    MT_TE_NUM, //特码-数字  0
    MT_TE_DA, //特码-大 1
    MT_TE_XIAO, //特码-小 2
    MT_TE_DAN, //特码-单 3
    MT_TE_SHUANG, //特码-双 4
    MT_TE_HE_DAN, //特码-合单 5
    MT_TE_HE_SHUANG, //特码-合双 6
    MT_TE_WEI_DA, //特码-尾大 7
    MT_TE_WEI_XIAO, //特码-尾小 8
    MT_TE_HONG, //特码-红波 9
    MT_TE_LAN, //特码-蓝波 10
    MT_TE_LV, //特码-绿波  11
    MT_ZN_NUM, //正码1-6-数字  12
    MT_ZN_DA, //正码1-6-大  13
    MT_ZN_XIAO, //正码1-6-小  14
    MT_ZN_DAN, //正码1-6-单  15
    MT_ZN_SHUANG, //正码1-6-双  16
    MT_ZN_HE_DAN, //正码1-6-合单  17
    MT_ZN_HE_SHUANG, //正码1-6-合双  18
    MT_ZN_HONG, //正码1-6-红波  19
    MT_ZN_LAN, //正码1-6-蓝波  20
    MT_ZN_LV, //正码1-6-绿波  21
    MT_ZHENG_NUM, //正码-数字  22
    MT_HE_DA, //总和-大  23
    MT_HE_XIAO, //总和-小  24
    MT_HE_DAN, //总和-单  25
    MT_HE_SHUANG, //总和-双  26
    MT_B_HONG_DA, //半波-红-大  27
    MT_B_HONG_XIAO, //半波-红-小  28
    MT_B_HONG_DAN, //半波-红-单  29
    MT_B_HONG_SHUANG, //半波-红-双  30
    MT_B_LAN_DA, //半波-蓝-大  31
    MT_B_LAN_XIAO, //半波-蓝-小 32
    MT_B_LAN_DAN, //半波-蓝-单  33
    MT_B_LAN_SHUANG, //半波-蓝-双  34
    MT_B_LV_DA, //半波-绿-大  35
    MT_B_LV_XIAO, //半波-绿-小   36
    MT_B_LV_DAN, //半波-绿-单  37
    MT_B_LV_SHUANG, //半波-绿-双  38
    MT_TX_SHU, //特肖-鼠  39
    MT_TX_NIU, //特肖-牛 40
    MT_TX_HU, //特肖-虎  41
    MT_TX_TU, //特肖-兔 42
    MT_TX_LONG, //特肖-龙  43
    MT_TX_SHE, //特肖-蛇  44
    MT_TX_MA, //特肖-马  45
    MT_TX_YANG, //特肖-羊  46
    MT_TX_HOU, //特肖-猴  47
    MT_TX_ZI, //特肖-鸡 48
    MT_TX_GOU, //特肖-狗 49
    MT_TX_ZHU, //特肖-猪 50
    MT_YX_SHU, //一肖-鼠 51
    MT_YX_NIU, //一肖-牛 52
    MT_YX_HU, //一肖-虎 53
    MT_YX_TU, //一肖-兔 54
    MT_YX_LONG, //一肖-龙 55
    MT_YX_SHE, //一肖-蛇 51
    MT_YX_MA, //一肖-马 52
    MT_YX_YANG, //一肖-羊 53
    MT_YX_HOU, //一肖-猴 54
    MT_YX_ZI, //一肖-鸡 55
    MT_YX_GOU, //一肖-狗 56
    MT_YX_ZHU, //一肖-猪 57
    MT_ZTW_0, //正特尾-0 58
    MT_ZTW_1, //正特尾-1 59
    MT_ZTW_2, //正特尾-2 60
    MT_ZTW_3, //正特尾-3 61
    MT_ZTW_4, //正特尾-4 62
    MT_ZTW_5, //正特尾-5 63
    MT_ZTW_6, //正特尾-6 64
    MT_ZTW_7, //正特尾-7 65
    MT_ZTW_8, //正特尾-8 66
    MT_ZTW_9, //正特尾-9 67
    MT_L_SI_QUAN, //连码-四全中 68
    MT_L_SAN_QUAN, //连码-三全中 69
    MT_L_SAN_ER, //连码-三中二 70
    MT_L_ER_QUAN, //连码-二全中 71
    MT_L_ER_TE, //连码-二中特 72
    MT_L_TE_CHUAN, //连码-特串 73
    MT_L_SAN_ER_SAN, //连码-三中二之中三 74
    MT_L_ER_TE_ER, //连码-二中特之中二 75
    MT_HE_ZHONG_1, //合肖-一肖中 76
    MT_HE_ZHONG_2, //合肖-二肖中 77
    MT_HE_ZHONG_3, //合肖-三肖中 78
    MT_HE_ZHONG_4, //合肖-四肖中 79
    MT_HE_ZHONG_5, //合肖-五肖中 80
    MT_HE_ZHONG_6, //合肖-六肖中 81
    MT_HE_ZHONG_7, //合肖-七肖中 82
    MT_HE_ZHONG_8, //合肖-八肖中 83
    MT_HE_ZHONG_9, //合肖-九肖中 84
    MT_HE_ZHONG_10, //合肖-十肖中 85
    MT_HE_BU_ZHONG_2, //合肖-二肖不中 86
    MT_HE_BU_ZHONG_3, //合肖-三肖不中 87
    MT_HE_BU_ZHONG_4, //合肖-四肖不中 88
    MT_HE_BU_ZHONG_5, //合肖-五肖不中 89
    MT_HE_BU_ZHONG_6, //合肖-六肖不中 90
    MT_HE_BU_ZHONG_7, //合肖-七肖不中 91
    MT_HE_BU_ZHONG_8, //合肖-八肖不中 92
    MT_HE_BU_ZHONG_9, //合肖-九肖不中 93
    MT_HE_BU_ZHONG_10, //合肖-十肖不中 94
    MT_SXL_ZHONG_2, //生肖连-二肖连中 95
    MT_SXL_ZHONG_3, //生肖连-三肖连中 96
    MT_SXL_ZHONG_4, //生肖连-四肖连中 97
    MT_SXL_ZHONG_5, //生肖连-五肖连中 98
    MT_SXL_BU_ZHONG_2, //生肖连-二肖连不中 99
    MT_SXL_BU_ZHONG_3, //生肖连-三肖连不中 100
    MT_SXL_BU_ZHONG_4, //生肖连-四肖连不中 101
    MT_SXL_BU_ZHONG_5, //生肖连-五肖连不中 102
    MT_SXL_ZHONG_2_BEN, //生肖连-二肖连中-本年 103
    MT_SXL_ZHONG_3_BEN, //生肖连-三肖连中-本年 104
    MT_SXL_ZHONG_4_BEN, //生肖连-四肖连中-本年 105
    MT_SXL_ZHONG_5_BEN, //生肖连-五肖连中-本年 106
    MT_SXL_BU_ZHONG_2_BEN, //生肖连-二肖连不中-本年 107
    MT_SXL_BU_ZHONG_3_BEN, //生肖连-三肖连不中-本年 108
    MT_SXL_BU_ZHONG_4_BEN, //生肖连-四肖连不中-本年 109
    MT_SXL_BU_ZHONG_5_BEN, //生肖连-五肖连不中-本年 110
    MT_WSL_ZHONG_2, //尾数连-二尾连中 111
    MT_WSL_ZHONG_3, //尾数连-三尾连中 112
    MT_WSL_ZHONG_4, //尾数连-四尾连中 113
    MT_WSL_BU_ZHONG_2, //尾数连-二尾连不中 114
    MT_WSL_BU_ZHONG_3, //尾数连-三尾连不中 115
    MT_WSL_BU_ZHONG_4, //尾数连-四尾连不中 116
    MT_WSL_ZHONG_2_0, //尾数连-二尾连中-含0尾 117
    MT_WSL_ZHONG_3_0, //尾数连-三尾连中-含0尾 118
    MT_WSL_ZHONG_4_0, //尾数连-四尾连中-含0尾 119
    MT_WSL_BU_ZHONG_2_0, //尾数连-二尾连不中-含0尾 120
    MT_WSL_BU_ZHONG_3_0, //尾数连-三尾连不中-含0尾 121
    MT_WSL_BU_ZHONG_4_0, //尾数连-四尾连不中-含0尾 122
    MT_QBZ_5, //全不中-五不中 123
    MT_QBZ_6, //全不中-六不中 124
    MT_QBZ_7, //全不中-七不中 125
    MT_QBZ_8, //全不中-八不中 126
    MT_QBZ_9, //全不中-九不中 127
    MT_QBZ_10, //全不中-十不中 128
    MT_QBZ_11, //全不中-十一不中 129
    MT_QBZ_12, //全不中-十二不中 130
    MT_COUNT, //倍数类型数目
    MT_INVALID, //无效倍数类型
  }

  //倍数类型
  export enum emMultipleTypeEx {
    MT_TE_NUM = 0, //特码-数字
    MT_TE_DA, //特码-大
    MT_TE_XIAO, //特码-小
    MT_TE_DAN, //特码-单
    MT_TE_SHUANG, //特码-双
    MT_TE_HE_DAN, //特码-合单
    MT_TE_HE_SHUANG, //特码-合双
    MT_TE_WEI_DA, //特码-尾大
    MT_TE_WEI_XIAO, //特码-尾小
    MT_TE_HONG, //特码-红波
    MT_TE_LAN, //特码-蓝波
    MT_TE_LV, //特码-绿波
    MT_ZN_NUM, //正码1-6-数字
    MT_ZN_DA, //正码1-6-大
    MT_ZN_XIAO, //正码1-6-小
    MT_ZN_DAN, //正码1-6-单
    MT_ZN_SHUANG, //正码1-6-双
    MT_ZN_HE_DAN, //正码1-6-合单
    MT_ZN_HE_SHUANG, //正码1-6-合双
    MT_ZN_HONG, //正码1-6-红波
    MT_ZN_LAN, //正码1-6-蓝波
    MT_ZN_LV, //正码1-6-绿波
    MT_ZHENG_NUM, //正码-数字
    MT_HE_DA, //总和-大
    MT_HE_XIAO, //总和-小
    MT_HE_DAN, //总和-单
    MT_HE_SHUANG, //总和-双
    MT_B_HONG_DA, //半波-红-大
    MT_B_HONG_XIAO, //半波-红-小
    MT_B_HONG_DAN, //半波-红-单
    MT_B_HONG_SHUANG, //半波-红-双
    MT_B_LAN_DA, //半波-蓝-大
    MT_B_LAN_XIAO, //半波-蓝-小
    MT_B_LAN_DAN, //半波-蓝-单
    MT_B_LAN_SHUANG, //半波-蓝-双
    MT_B_LV_DA, //半波-绿-大
    MT_B_LV_XIAO, //半波-绿-小
    MT_B_LV_DAN, //半波-绿-单
    MT_B_LV_SHUANG, //半波-绿-双
    MT_TX_SHU = 39, //特肖-鼠
    //...
    MT_TX_ZHU = 50, //特肖-猪
    MT_YX_SHU = 51, //一肖-鼠
    //...
    MT_YX_ZHU = 62, //一肖-猪
    MT_ZTW_0 = 63, //正特尾-0
    //...
    MT_ZTW_9 = 72, //正特尾-9
    MT_L_SI_QUAN, //连码-四全中
    MT_L_SAN_QUAN, //连码-三全中
    MT_L_SAN_ER, //连码-三中二
    MT_L_ER_QUAN, //连码-二全中
    MT_L_ER_TE, //连码-二中特
    MT_L_TE_CHUAN, //连码-特串
    MT_L_SAN_ER_SAN, //连码-三中二之中三
    MT_L_ER_TE_ER, //连码-二中特之中二
    MT_HE_ZHONG_1 = 81, //合肖-一肖中
    //...
    MT_HE_ZHONG_10 = 90, //合肖-十肖中
    MT_HE_BU_ZHONG_2 = 91, //合肖-二肖不中
    //...
    MT_HE_BU_ZHONG_10 = 99, //合肖-十肖不中
    MT_SXL_ZHONG_2, //生肖连-二肖连中
    MT_SXL_ZHONG_3, //生肖连-三肖连中
    MT_SXL_ZHONG_4, //生肖连-四肖连中
    MT_SXL_ZHONG_5, //生肖连-五肖连中
    MT_SXL_BU_ZHONG_2, //生肖连-二肖连不中
    MT_SXL_BU_ZHONG_3, //生肖连-三肖连不中
    MT_SXL_BU_ZHONG_4, //生肖连-四肖连不中
    MT_SXL_BU_ZHONG_5, //生肖连-五肖连不中
    MT_SXL_ZHONG_2_BEN, //生肖连-二肖连中-本年
    MT_SXL_ZHONG_3_BEN, //生肖连-三肖连中-本年
    MT_SXL_ZHONG_4_BEN, //生肖连-四肖连中-本年
    MT_SXL_ZHONG_5_BEN, //生肖连-五肖连中-本年
    MT_SXL_BU_ZHONG_2_BEN, //生肖连-二肖连不中-本年
    MT_SXL_BU_ZHONG_3_BEN, //生肖连-三肖连不中-本年
    MT_SXL_BU_ZHONG_4_BEN, //生肖连-四肖连不中-本年
    MT_SXL_BU_ZHONG_5_BEN, //生肖连-五肖连不中-本年
    MT_WSL_ZHONG_2, //尾数连-二尾连中
    MT_WSL_ZHONG_3, //尾数连-三尾连中
    MT_WSL_ZHONG_4, //尾数连-四尾连中
    MT_WSL_BU_ZHONG_2, //尾数连-二尾连不中
    MT_WSL_BU_ZHONG_3, //尾数连-三尾连不中
    MT_WSL_BU_ZHONG_4, //尾数连-四尾连不中
    MT_WSL_ZHONG_2_0, //尾数连-二尾连中-含0尾
    MT_WSL_ZHONG_3_0, //尾数连-三尾连中-含0尾
    MT_WSL_ZHONG_4_0, //尾数连-四尾连中-含0尾
    MT_WSL_BU_ZHONG_2_0, //尾数连-二尾连不中-含0尾
    MT_WSL_BU_ZHONG_3_0, //尾数连-三尾连不中-含0尾
    MT_WSL_BU_ZHONG_4_0, //尾数连-四尾连不中-含0尾
    MT_QBZ_5 = 128, //全不中-五不中
    //...
    MT_QBZ_12 = 135, //全不中-十二不中
    MT_COUNT = 136, //倍数类型数目
    MT_INVALID = 0xff, //无效倍数类型
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
    RPT_COUNT = 30, //结果位置类型数目
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
    RT_INVALID = 0xff, //无效开奖结果类型
  }

  //场景状态定义
  export const GAME_SCENE_FREE: number = 0; //等待开始
  export const GAME_SCENE_BET: number = 100; //下注状态
  export const GAME_SCENE_WAIT: number = 101; //封盘状态

  export const SBT_INVALID: number = 0xff; //无效子区域下注类型
  export const INVALID_CARD: number = 0xff; //无效的开奖数值
  export const JETTON_COUNT: number = 9; //筹码档位数目
  export const COUNT_OF_CARS: number = 7; //开奖结果
  export const SOURCE_DATA_COUNT: number = 7; //源数据数量
  export const MAX_SOURCE_DATA_LEN: number = 2; //源数据长度
  export const MAX_BET_COUNT: number = 210; //最大下注数目
  export const MAX_NUMBER_COUNT: number = 12; //最大自选号码数目

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
    //游戏信息
    cbCurrXiao = CreateObject(BYTE); //当前生肖
  }

  //场景切换
  export class CMD_S_SceneChange extends Struct {
    cbSceneStatus = CreateObject(BYTE); //游戏状态
    dwAllSeconds = CreateObject(DWORD); //总时间
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    //游戏信息
    cbCurrXiao = CreateObject(BYTE); //当前生肖
  }

  // 开奖结果
  export class tagRecordInfo extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //期号
    cbTableCard = CreateArray(BYTE, [COUNT_OF_CARS]); //开奖结果
    szSourceData = CreateArray2(
      CSTRING,
      [SOURCE_DATA_COUNT, MAX_SOURCE_DATA_LEN],
      MAX_SOURCE_DATA_LEN
    ); //号源数据
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

  //用户下注
  export class CMD_C_PlaceBet extends Struct {
    cPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //本期期号
    tagUserBetInfo = CreateArray(tagUserBetInfo, [MAX_BET_COUNT], 0, true); //下注信息
  }

  const mapMainType = new Map<number, string>([
    [emBetMainType.BTM_TE, 'TE'],
    [emBetMainType.BTM_ZHENG_1, 'ZM_ONE'],
    [emBetMainType.BTM_ZHENG_2, 'ZM_TWO'],
    [emBetMainType.BTM_ZHENG_3, 'ZM_THREE'],
    [emBetMainType.BTM_ZHENG_4, 'ZM_FOUR'],
    [emBetMainType.BTM_ZHENG_5, 'ZM_FIVE'],
    [emBetMainType.BTM_ZHENG_6, 'ZM_SIX'],
    [emBetMainType.BTM_ZHENG, 'ZM'],
    [emBetMainType.BTM_HE, 'SUM'],
    [emBetMainType.BTM_BAN_BO, 'BB'],
    [emBetMainType.BTM_TE_XIAO, 'TX'],
    [emBetMainType.BTM_YI_XIAO, 'YX'],
    [emBetMainType.BTM_ZHENG_TE_WEI, 'ZTW'],
    [emBetMainType.BTM_LIAN_MA, 'LM'],
    [emBetMainType.BTM_HE_XIAO, 'HX'],
    [emBetMainType.BTM_SHENG_XIAO_LIAN, 'SXL'],
    [emBetMainType.BTM_WEI_SHU_LIAN, 'WSL'],
    [emBetMainType.BTM_QUAN_BU_ZHONG, 'QBZ'],
  ]);

  // 下注子类型 - 特码
  const mapSubTmType = new Map<number, string>([
    [emSubBetTypeTeMa.SBTT_DA, 'DA'],
    [emSubBetTypeTeMa.SBTT_XIAO, 'XIAO'],
    [emSubBetTypeTeMa.SBTT_DAN, 'DAN'],
    [emSubBetTypeTeMa.SBTT_SHUANG, 'SHUANG'],
    [emSubBetTypeTeMa.SBTT_HE_DAN, 'HE_DAN'],
    [emSubBetTypeTeMa.SBTT_HE_SHUANG, 'HE_SHUANG'],
    [emSubBetTypeTeMa.SBTT_WEI_DA, '尾大'],
    [emSubBetTypeTeMa.SBTT_WEI_XIAO, '尾小'],
    [emSubBetTypeTeMa.SBTT_HONG, 'HONG'],
    [emSubBetTypeTeMa.SBTT_LAN, 'LAN'],
    [emSubBetTypeTeMa.SBTT_LV, 'LV'],
  ]);

  // 下注子类型 - 正码1-6
  const mapSubZmType = new Map<number, string>([
    [emSubBetTypeZhengNum.SBTZN_DA, 'DA'],
    [emSubBetTypeZhengNum.SBTZN_XIAO, 'XIAO'],
    [emSubBetTypeZhengNum.SBTZN_DAN, 'DAN'],
    [emSubBetTypeZhengNum.SBTZN_SHUANG, 'SHUANG'],
    [emSubBetTypeZhengNum.SBTZN_HE_DAN, 'HE_DAN'],
    [emSubBetTypeZhengNum.SBTZN_HE_SHUANG, 'HE_SHUANG'],
    [emSubBetTypeZhengNum.SBTZN_HONG, 'HONG'],
    [emSubBetTypeZhengNum.SBTZN_LAN, 'LAN'],
    [emSubBetTypeZhengNum.SBTZN_LV, 'LV'],
  ]);

  // 下注子类型 - 总和
  const mapSubZhType = new Map<number, string>([
    [emSubBetTypeHe.SBTH_DA, 'DA'],
    [emSubBetTypeHe.SBTH_XIAO, 'XIAO'],
    [emSubBetTypeHe.SBTH_DAN, 'DAN'],
    [emSubBetTypeHe.SBTH_SHUANG, 'SHUANG'],
  ]);

  // 下注子类型 - 半波
  const mapSubBbType = new Map<number, string>([
    [emSubBetTypeBanBo.SBTB_HONG_DA, 'HONG_DA'],
    [emSubBetTypeBanBo.SBTB_HONG_XIAO, 'HONG_XIAO'],
    [emSubBetTypeBanBo.SBTB_HONG_DAN, 'HONG_DAN'],
    [emSubBetTypeBanBo.SBTB_HONG_SHUANG, 'HONG_SHUANG'],
    [emSubBetTypeBanBo.SBTB_LAN_DA, 'LAN_DA'],
    [emSubBetTypeBanBo.SBTB_LAN_XIAO, 'LAN_XIAO'],
    [emSubBetTypeBanBo.SBTB_LAN_DAN, 'LAN_DAN'],
    [emSubBetTypeBanBo.SBTB_LAN_SHUANG, 'LAN_SHUANG'],
    [emSubBetTypeBanBo.SBTB_LV_DA, 'LV_DA'],
    [emSubBetTypeBanBo.SBTB_LV_XIAO, 'LV_XIAO'],
    [emSubBetTypeBanBo.SBTB_LV_DAN, 'LV_DAN'],
    [emSubBetTypeBanBo.SBTB_LV_SHUANG, 'LV_SHUANG'],
  ]);

  // 下注子类型 - 生肖
  const mapSubSxType = new Map<number, string>([
    [emXiaoType.XT_SHU, 'SHU'],
    [emXiaoType.XT_NIU, 'NIU'],
    [emXiaoType.XT_HU, 'HU'],
    [emXiaoType.XT_TU, 'TU'],
    [emXiaoType.XT_LONG, 'LONG'],
    [emXiaoType.XT_SHE, 'SHE'],
    [emXiaoType.XT_MA, 'MA'],
    [emXiaoType.XT_YANG, 'YANG'],
    [emXiaoType.XT_HOU, 'HOU'],
    [emXiaoType.XT_JI, 'JI'],
    [emXiaoType.XT_GOU, 'GOU'],
    [emXiaoType.XT_ZHU, 'ZHU'],
  ]);

  // 下注子类型 - 连码
  const mapSubLmType = new Map<number, string>([
    [emSubBetTypeLianMa.SBTL_SI_QUAN, 'SI_QUAN_ZHOGN'],
    [emSubBetTypeLianMa.SBTL_SAN_QUAN, 'SAN_QUAN_ZHOGN'],
    [emSubBetTypeLianMa.SBTL_SAN_ER, 'SAN_ZHOGN_ER'],
    [emSubBetTypeLianMa.SBTL_ER_QUAN, 'ER_QUAN_ZHOGN'],
    [emSubBetTypeLianMa.SBTL_ER_TE, 'ER_ZHONG_TE'],
    [emSubBetTypeLianMa.SBTL_TE_CHUAN, 'TE_CHUAN'],
  ]);

  // 下注子类型 - 合肖
  const mapSubHxType = new Map<number, string>([
    [emSubBetTypeHeXiao.SBTHX_ZHONG_1, 'XIAO_ZHONG_1'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_2, 'XIAO_ZHONG_2'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_3, 'XIAO_ZHONG_3'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_4, 'XIAO_ZHONG_4'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_5, 'XIAO_ZHONG_5'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_6, 'XIAO_ZHONG_6'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_7, 'XIAO_ZHONG_7'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_8, 'XIAO_ZHONG_8'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_9, 'XIAO_ZHONG_9'],
    [emSubBetTypeHeXiao.SBTHX_ZHONG_10, 'XIAO_ZHONG_10'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_2, 'XIAO_BU_ZHONG_2'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_3, 'XIAO_BU_ZHONG_3'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_4, 'XIAO_BU_ZHONG_4'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_5, 'XIAO_BU_ZHONG_5'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_6, 'XIAO_BU_ZHONG_6'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_7, 'XIAO_BU_ZHONG_7'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_8, 'XIAO_BU_ZHONG_8'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_9, 'XIAO_BU_ZHONG_9'],
    [emSubBetTypeHeXiao.SBTHX_BU_ZHONG_10, 'XIAO_BU_ZHONG_10'],
  ]);

  // 下注子类型 - 生肖连
  const mapSubSxlType = new Map<number, string>([
    [emSubBetTypeSXL.SBTSXL_ZHONG_2, 'XIAO_LIAN_ZHONG_2'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_3, 'XIAO_LIAN_ZHONG_3'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_4, 'XIAO_LIAN_ZHONG_4'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_5, 'XIAO_LIAN_ZHONG_5'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_2, 'XIAO_LIAN_BU_ZHONG_2'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_3, 'XIAO_LIAN_BU_ZHONG_3'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_4, 'XIAO_LIAN_BU_ZHONG_4'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_5, 'XIAO_LIAN_BU_ZHONG_5'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_2_BEN, 'XIAO_LIAN_ZHONG_2'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_3_BEN, 'XIAO_LIAN_ZHONG_3'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_4_BEN, 'XIAO_LIAN_ZHONG_4'],
    [emSubBetTypeSXL.SBTSXL_ZHONG_5_BEN, 'XIAO_LIAN_ZHONG_5'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_2_BEN, 'XIAO_LIAN_BU_ZHONG_2'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_3_BEN, 'XIAO_LIAN_BU_ZHONG_3'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_4_BEN, 'XIAO_LIAN_BU_ZHONG_4'],
    [emSubBetTypeSXL.SBTSXL_BU_ZHONG_5_BEN, 'XIAO_LIAN_BU_ZHONG_5'],
  ]);

  // 下注子类型 - 尾数连
  const mapSubWslType = new Map<number, string>([
    [emSubBetTypeWSL.SBTWSL_ZHONG_2, 'WEI_LIAN_ZHONG_2'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_3, 'WEI_LIAN_ZHONG_3'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_4, 'WEI_LIAN_ZHONG_4'],
    [emSubBetTypeWSL.SBTWSL_BU_ZHONG_2, 'WEI_LIAN_BU_ZHONG_2'],
    [emSubBetTypeWSL.SBTWSL_BU_ZHONG_3, 'WEI_LIAN_BU_ZHONG_3'],
    [emSubBetTypeWSL.SBTWSL_BU_ZHONG_4, 'WEI_LIAN_BU_ZHONG_4'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_2_0, 'WEI_LIAN_ZHONG_2'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_3_0, 'WEI_LIAN_ZHONG_3'],
    [emSubBetTypeWSL.SBTWSL_ZHONG_4_0, 'WEI_LIAN_ZHONG_4'],
    [emSubBetTypeWSL.SBTWSL_BU_ZHONG_2_0, 'WEI_LIAN_BU_ZHONG_2'],
    [emSubBetTypeWSL.SBTWSL_BU_ZHONG_3_0, 'WEI_LIAN_BU_ZHONG_3'],
    [emSubBetTypeWSL.SBTWSL_BU_ZHONG_4_0, 'WEI_LIAN_BU_ZHONG_4'],
  ]);

  // 下注子类型 - 全不中
  const mapSubQbzType = new Map<number, string>([
    [emSubBetTypeQBZ.SBTQBZ_5, 'BU_ZHONG_5'],
    [emSubBetTypeQBZ.SBTQBZ_6, 'BU_ZHONG_6'],
    [emSubBetTypeQBZ.SBTQBZ_7, 'BU_ZHONG_7'],
    [emSubBetTypeQBZ.SBTQBZ_8, 'BU_ZHONG_8'],
    [emSubBetTypeQBZ.SBTQBZ_9, 'BU_ZHONG_9'],
    [emSubBetTypeQBZ.SBTQBZ_10, 'BU_ZHONG_10'],
    [emSubBetTypeQBZ.SBTQBZ_11, 'BU_ZHONG_11'],
    [emSubBetTypeQBZ.SBTQBZ_12, 'BU_ZHONG_12'],
  ]);

  // 开奖类型 - 生肖
  const mapResultSxType = new Map<number, string>([
    [emResultType.RT_DA, 'DA'],
    [emResultType.RT_XIAO, 'XIAO'],
    [emResultType.RT_DAN, 'DAN'],
    [emResultType.RT_SHUANG, 'SHUANG'],
    [emResultType.RT_BO_HONG, 'HONG'],
    [emResultType.RT_BO_LAN, 'LAN'],
    [emResultType.RT_BO_LV, 'LV'],
    [emResultType.RT_XIAO_SHU, 'SHU'],
    [emResultType.RT_XIAO_NIU, 'NIU'],
    [emResultType.RT_XIAO_HU, 'HU'],
    [emResultType.RT_XIAO_TU, 'TU'],
    [emResultType.RT_XIAO_LONG, 'LONG'],
    [emResultType.RT_XIAO_SHE, 'SHE'],
    [emResultType.RT_XIAO_MA, 'MA'],
    [emResultType.RT_XIAO_YANG, 'YANG'],
    [emResultType.RT_XIAO_HOU, 'HOU'],
    [emResultType.RT_XIAO_JI, 'JI'],
    [emResultType.RT_XIAO_GOU, 'GOU'],
    [emResultType.RT_XIAO_ZHU, 'ZHU'],
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
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --特码
   * @return {*}
   */
  export function GetGameBetSubTmType(sType: number): string {
    if (mapSubTmType.has(sType)) return mapSubTmType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --正码1-6
   * @return {*}
   */
  export function GetGameBetSubZmType(sType: number): string {
    if (mapSubZmType.has(sType)) return mapSubZmType.get(sType);
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
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --半波
   * @return {*}
   */
  export function GetGameBetSubBbType(sType: number): string {
    if (mapSubBbType.has(sType)) return mapSubBbType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --半波
   * @return {*}
   */
  export function GetGameBetSubSxType(sType: number): string {
    if (mapSubSxType.has(sType)) return mapSubSxType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --连码
   * @return {*}
   */
  export function GetGameBetSubLmType(sType: number): string {
    if (mapSubLmType.has(sType)) return mapSubLmType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --合肖
   * @return {*}
   */
  export function GetGameBetSubHxType(sType: number): string {
    if (mapSubHxType.has(sType)) return mapSubHxType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --生肖连
   * @return {*}
   */
  export function GetGameBetSubSxlType(sType: number): string {
    if (mapSubSxlType.has(sType)) return mapSubSxlType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --尾数连
   * @return {*}
   */
  export function GetGameBetSubWslType(sType: number): string {
    if (mapSubWslType.has(sType)) return mapSubWslType.get(sType);
    return '';
  }

  /**
   * @description: 获取子下注类型描述---如果是自选数字的情况下，根据主区域-加数字即可 --全不中
   * @return {*}
   */
  export function GetGameBetSubQbzType(sType: number): string {
    if (mapSubQbzType.has(sType)) return mapSubQbzType.get(sType);
    return '';
  }
  /**
   * @description: 获取生肖类型
   * @param {number} sType
   * @return {*}
   */
  export function GetGameResult(sType: number): string {
    if (mapResultSxType.has(sType)) return mapResultSxType.get(sType);
    return '';
  }
}
