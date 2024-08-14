import { common } from '@/engine/cmd/common/CMD_COMMON';
import {
  CreateObject,
  CreateArray,
  CreateArray2,
  BOOL,
  BYTE,
  INT,
  CSTRING,
  DWORD,
  SCORE,
  Struct,
  WORD,
} from '@/engine/base/basetype';
export namespace CMD_3102 {
  ////////////////////////////////////////////////////////////////////////////////////

  //下注主类型
  export enum emBetMainType {
    BTM_RANK_1 = 0, //冠军
    BTM_RANK_2, //亚军
    BTM_RANK_3, //第三名
    BTM_RANK_4, //第四名
    BTM_RANK_5, //第五名
    BTM_RANK_6, //第六名
    BTM_RANK_7, //第七名
    BTM_RANK_8, //第八名
    BTM_RANK_9, //第九名
    BTM_RANK_10, //第十名
    BTM_SUM, //冠亚军和
    BTM_COM, //冠亚军组合
    BTM_COUNT, //下注类型数目
    BTM_INVALID = 0xff, //无效下注类型
  }

  //下注子类型 - 排名
  //下注子类型 - 冠军-第十名
  export enum emBetTypeRank {
    SBTR_NUM = 0, //数字-【自选】【1】
    SBTR_DA, //大
    SBTR_XIAO, //小
    SBTR_DAN, //单
    SBTR_SHUANG, //双
    SBTR_LONG, //龙
    SBTR_HU, //虎
    SBTR_COUNT, //子类型数目
  }

  //下注子类型 - 冠亚军和
  export enum emBetTypeSum {
    SBTS_NUM = 0, //数字-【自选】【1】
    SBTS_DA, //大
    SBTS_XIAO, //小
    SBTS_DAN, //单
    SBTS_SHUANG, //双
    SBTS_COUNT, //子类型数目
  }

  //下注子类型 - 冠亚军组合
  export enum emBetTypeCom {
    SBTC_NUM = 0, //数字-【自选】【2】
    SBTC_COUNT, //子类型数目
  }

  // 抛出子类型的名称
  export const emBetSubTypeNames = [
    'emBetTypeRank',
    'emBetTypeSum',
    'emBetTypeCom',
  ];

  //区域限制类型
  export enum emLimitType {
    LT_RANK_1 = 0, //冠军
    LT_RANK_2, //亚军
    LT_RANK_3, //第三名
    LT_RANK_4, //第四名
    LT_RANK_5, //第五名
    LT_RANK_6, //第六名
    LT_RANK_7, //第七名
    LT_RANK_8, //第八名
    LT_RANK_9, //第九名
    LT_RANK_10, //第十名
    LT_RANK_DA_XIAO, //排名大小
    LT_RANK_DAN_SHUANG, //排名单双
    LT_RANK_LONG_HU, //排名龙虎
    LT_SUM_NUM, //冠亚军和-数字
    LT_SUM_DA_XIAO, //冠亚军和-大小
    LT_SUM_DAN_SHUANG, //冠亚军和-单双
    LT_COM_ALL, //冠亚军组合
    LT_COUNT, //区域限制类型数目
    LT_INVALID = 0xff, //无效区域限制类型
  }

  //倍数类型
  export enum emMultipleType {
    MT_RANK1_1 = 0, //冠军-1
    MT_RANK1_2, //冠军-2
    MT_RANK1_3, //冠军-3
    MT_RANK1_4, //冠军-4
    MT_RANK1_5, //冠军-5
    MT_RANK1_6, //冠军-6
    MT_RANK1_7, //冠军-7
    MT_RANK1_8, //冠军-8
    MT_RANK1_9, //冠军-9
    MT_RANK1_10, //冠军-10
    MT_RANK2_1, //亚军-1
    MT_RANK2_2, //亚军-2
    MT_RANK2_3, //亚军-3
    MT_RANK2_4, //亚军-4
    MT_RANK2_5, //亚军-5
    MT_RANK2_6, //亚军-6
    MT_RANK2_7, //亚军-7
    MT_RANK2_8, //亚军-8
    MT_RANK2_9, //亚军-9
    MT_RANK2_10, //亚军-10
    MT_RANK3_1, //第三名-1
    MT_RANK3_2, //第三名-2
    MT_RANK3_3, //第三名-3
    MT_RANK3_4, //第三名-4
    MT_RANK3_5, //第三名-5
    MT_RANK3_6, //第三名-6
    MT_RANK3_7, //第三名-7
    MT_RANK3_8, //第三名-8
    MT_RANK3_9, //第三名-9
    MT_RANK3_10, //第三名-10
    MT_RANK4_1, //第四名-1
    MT_RANK4_2, //第四名-2
    MT_RANK4_3, //第四名-3
    MT_RANK4_4, //第四名-4
    MT_RANK4_5, //第四名-5
    MT_RANK4_6, //第四名-6
    MT_RANK4_7, //第四名-7
    MT_RANK4_8, //第四名-8
    MT_RANK4_9, //第四名-9
    MT_RANK4_10, //第四名-10
    MT_RANK5_1, //第五名-1
    MT_RANK5_2, //第五名-2
    MT_RANK5_3, //第五名-3
    MT_RANK5_4, //第五名-4
    MT_RANK5_5, //第五名-5
    MT_RANK5_6, //第五名-6
    MT_RANK5_7, //第五名-7
    MT_RANK5_8, //第五名-8
    MT_RANK5_9, //第五名-9
    MT_RANK5_10, //第五名-10
    MT_RANK6_1, //第六名-1
    MT_RANK6_2, //第六名-2
    MT_RANK6_3, //第六名-3
    MT_RANK6_4, //第六名-4
    MT_RANK6_5, //第六名-5
    MT_RANK6_6, //第六名-6
    MT_RANK6_7, //第六名-7
    MT_RANK6_8, //第六名-8
    MT_RANK6_9, //第六名-9
    MT_RANK6_10, //第六名-10
    MT_RANK7_1, //第七名-1
    MT_RANK7_2, //第七名-2
    MT_RANK7_3, //第七名-3
    MT_RANK7_4, //第七名-4
    MT_RANK7_5, //第七名-5
    MT_RANK7_6, //第七名-6
    MT_RANK7_7, //第七名-7
    MT_RANK7_8, //第七名-8
    MT_RANK7_9, //第七名-9
    MT_RANK7_10, //第七名-10
    MT_RANK8_1, //第八名-1
    MT_RANK8_2, //第八名-2
    MT_RANK8_3, //第八名-3
    MT_RANK8_4, //第八名-4
    MT_RANK8_5, //第八名-5
    MT_RANK8_6, //第八名-6
    MT_RANK8_7, //第八名-7
    MT_RANK8_8, //第八名-8
    MT_RANK8_9, //第八名-9
    MT_RANK8_10, //第八名-10
    MT_RANK9_1, //第九名-1
    MT_RANK9_2, //第九名-2
    MT_RANK9_3, //第九名-3
    MT_RANK9_4, //第九名-4
    MT_RANK9_5, //第九名-5
    MT_RANK9_6, //第九名-6
    MT_RANK9_7, //第九名-7
    MT_RANK9_8, //第九名-8
    MT_RANK9_9, //第九名-9
    MT_RANK9_10, //第九名-10
    MT_RANK10_1, //第十名-1
    MT_RANK10_2, //第十名-2
    MT_RANK10_3, //第十名-3
    MT_RANK10_4, //第十名-4
    MT_RANK10_5, //第十名-5
    MT_RANK10_6, //第十名-6
    MT_RANK10_7, //第十名-7
    MT_RANK10_8, //第十名-8
    MT_RANK10_9, //第十名-9
    MT_RANK10_10, //第十名-10
    MT_RANK_DA, //排名-大
    MT_RANK_XIAO, //排名-小
    MT_RANK_DAN, //排名-单
    MT_RANK_SHUANG, //排名-双
    MT_RANK_LONG, //排名-龙
    MT_RANK_HU, //排名-虎
    MT_SUM_3, //冠亚军和-3
    MT_SUM_4, //冠亚军和-4
    MT_SUM_5, //冠亚军和-5
    MT_SUM_6, //冠亚军和-6
    MT_SUM_7, //冠亚军和-7
    MT_SUM_8, //冠亚军和-8
    MT_SUM_9, //冠亚军和-9
    MT_SUM_10, //冠亚军和-10
    MT_SUM_11, //冠亚军和-11
    MT_SUM_12, //冠亚军和-12
    MT_SUM_13, //冠亚军和-13
    MT_SUM_14, //冠亚军和-14
    MT_SUM_15, //冠亚军和-15
    MT_SUM_16, //冠亚军和-16
    MT_SUM_17, //冠亚军和-17
    MT_SUM_18, //冠亚军和-18
    MT_SUM_19, //冠亚军和-19
    MT_SUM_DA, //冠亚军和-大
    MT_SUM_XIAO, //冠亚军和-小
    MT_SUM_DAN, //冠亚军和-单
    MT_SUM_SHUANG, //冠亚军和-双
    MT_COM_ALL, //冠亚军组合
    MT_COUNT, //倍数类型数目
    MT_INVALID = 0xff, //无效倍数类型
  }

  //开奖结果位置类型
  export enum emResultPosType {
    RPT_R1_DX = 0, //冠军-大小
    RPT_R2_DX, //亚军-大小
    RPT_R3_DX, //第三名-大小
    RPT_R4_DX, //第四名-大小
    RPT_R5_DX, //第五名-大小
    RPT_R6_DX, //第六名-大小
    RPT_R7_DX, //第七名-大小
    RPT_R8_DX, //第八名-大小
    RPT_R9_DX, //第九名-大小
    RPT_R10_DX, //第十名-大小
    RPT_R1_DS, //冠军-单双
    RPT_R2_DS, //亚军-单双
    RPT_R3_DS, //第三名-单双
    RPT_R4_DS, //第四名-单双
    RPT_R5_DS, //第五名-单双
    RPT_R6_DS, //第六名-单双
    RPT_R7_DS, //第七名-单双
    RPT_R8_DS, //第八名-单双
    RPT_R9_DS, //第九名-单双
    RPT_R10_DS, //第十名-单双
    RPT_R1_LH, //冠军-龙虎
    RPT_R2_LH, //亚军-龙虎
    RPT_R3_LH, //第三名-龙虎
    RPT_R4_LH, //第四名-龙虎
    RPT_R5_LH, //第五名-龙虎
    RPT_SUM_DX, //冠亚军和-大小
    RPT_SUM_DS, //冠亚军和-单双
    RPT_COUNT, //结果位置类型数目
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
    RT_INVALID = 0xff, //无效开奖结果类型
  }

  //长龙主类型
  export enum emChangLongMainType {
    CLMT_R1_DX = 0, //冠军-大小
    CLMT_R2_DX, //亚军-大小
    CLMT_R3_DX, //第三名-大小
    CLMT_R4_DX, //第四名-大小
    CLMT_R5_DX, //第五名-大小
    CLMT_R6_DX, //第六名-大小
    CLMT_R7_DX, //第七名-大小
    CLMT_R8_DX, //第八名-大小
    CLMT_R9_DX, //第九名-大小
    CLMT_R10_DX, //第十名-大小
    CLMT_R1_DS, //冠军-单双
    CLMT_R2_DS, //亚军-单双
    CLMT_R3_DS, //第三名-单双
    CLMT_R4_DS, //第四名-单双
    CLMT_R5_DS, //第五名-单双
    CLMT_R6_DS, //第六名-单双
    CLMT_R7_DS, //第七名-单双
    CLMT_R8_DS, //第八名-单双
    CLMT_R9_DS, //第九名-单双
    CLMT_R10_DS, //第十名-单双
    CLMT_R1_LH, //冠军-龙虎
    CLMT_R2_LH, //亚军-龙虎
    CLMT_R3_LH, //第三名-龙虎
    CLMT_R4_LH, //第四名-龙虎
    CLMT_R5_LH, //第五名-龙虎
    CLMT_SUM_DX, //冠亚军和-大小
    CLMT_SUM_DS, //冠亚军和-单双
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

  //长龙子类型 - 龙虎
  export enum emChangLongSubTypeLH {
    CLST_LH_LONG, //龙
    CLST_LH_HU, //虎
  }

  // 长龙的映射关系
  export const subTypeMap = new Map<number, any>([
    [
      emChangLongMainType.CLMT_R1_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_1,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_1,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R2_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_2,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_2,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R3_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_3,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_3,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R4_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_4,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_4,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R5_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_5,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_5,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R6_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_6,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_6,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R7_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_7,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_7,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R8_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_8,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_8,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R9_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_9,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_9,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R10_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_RANK_10,
          subMainType: emBetTypeRank.SBTR_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_RANK_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_RANK_10,
          subMainType: emBetTypeRank.SBTR_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_RANK_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R1_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_1,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_1,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R2_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_2,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_2,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R3_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_3,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_3,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R4_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_4,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_4,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R5_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_5,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_5,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R6_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_6,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_6,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R7_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_7,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_7,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R8_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_8,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_8,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R9_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_9,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_9,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R10_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_RANK_10,
          subMainType: emBetTypeRank.SBTR_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_RANK_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_RANK_10,
          subMainType: emBetTypeRank.SBTR_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_RANK_SHUANG,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R1_LH,
      [
        {
          title: 'LONG',
          mainType: emBetMainType.BTM_RANK_1,
          subMainType: emBetTypeRank.SBTR_LONG,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_LONG,
          oddID: emMultipleType.MT_RANK_LONG,
        },
        {
          title: 'HU',
          mainType: emBetMainType.BTM_RANK_1,
          subMainType: emBetTypeRank.SBTR_HU,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_HU,
          oddID: emMultipleType.MT_RANK_HU,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R2_LH,
      [
        {
          title: 'LONG',
          mainType: emBetMainType.BTM_RANK_2,
          subMainType: emBetTypeRank.SBTR_LONG,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_LONG,
          oddID: emMultipleType.MT_RANK_LONG,
        },
        {
          title: 'HU',
          mainType: emBetMainType.BTM_RANK_2,
          subMainType: emBetTypeRank.SBTR_HU,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_HU,
          oddID: emMultipleType.MT_RANK_HU,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R3_LH,
      [
        {
          title: 'LONG',
          mainType: emBetMainType.BTM_RANK_3,
          subMainType: emBetTypeRank.SBTR_LONG,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_LONG,
          oddID: emMultipleType.MT_RANK_LONG,
        },
        {
          title: 'HU',
          mainType: emBetMainType.BTM_RANK_3,
          subMainType: emBetTypeRank.SBTR_HU,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_HU,
          oddID: emMultipleType.MT_RANK_HU,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R4_LH,
      [
        {
          title: 'LONG',
          mainType: emBetMainType.BTM_RANK_4,
          subMainType: emBetTypeRank.SBTR_LONG,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_LONG,
          oddID: emMultipleType.MT_RANK_LONG,
        },
        {
          title: 'HU',
          mainType: emBetMainType.BTM_RANK_4,
          subMainType: emBetTypeRank.SBTR_HU,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_HU,
          oddID: emMultipleType.MT_RANK_HU,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_R5_LH,
      [
        {
          title: 'LONG',
          mainType: emBetMainType.BTM_RANK_5,
          subMainType: emBetTypeRank.SBTR_LONG,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_LONG,
          oddID: emMultipleType.MT_RANK_LONG,
        },
        {
          title: 'HU',
          mainType: emBetMainType.BTM_RANK_5,
          subMainType: emBetTypeRank.SBTR_HU,
          clSubMainType: emChangLongSubTypeLH.CLST_LH_HU,
          oddID: emMultipleType.MT_RANK_HU,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_SUM_DX,
      [
        {
          title: 'DA',
          mainType: emBetMainType.BTM_SUM,
          subMainType: emBetTypeSum.SBTS_DA,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_DA,
          oddID: emMultipleType.MT_SUM_DA,
        },
        {
          title: 'XIAO',
          mainType: emBetMainType.BTM_SUM,
          subMainType: emBetTypeSum.SBTS_XIAO,
          clSubMainType: emChangLongSubTypeDX.CLST_DX_XIAO,
          oddID: emMultipleType.MT_SUM_XIAO,
        },
      ],
    ],
    [
      emChangLongMainType.CLMT_SUM_DS,
      [
        {
          title: 'DAN',
          mainType: emBetMainType.BTM_SUM,
          subMainType: emBetTypeSum.SBTS_DAN,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_DAN,
          oddID: emMultipleType.MT_SUM_DAN,
        },
        {
          title: 'SHUANG',
          mainType: emBetMainType.BTM_SUM,
          subMainType: emBetTypeSum.SBTS_SHUANG,
          clSubMainType: emChangLongSubTypeDS.CLST_DS_SHUANG,
          oddID: emMultipleType.MT_SUM_SHUANG,
        },
      ],
    ],
  ]);

  // 主码映射
  export const mainTypeMpa = new Map([
    [emChangLongMainType.CLMT_R1_DX, 'NUMBER_1'],
    [emChangLongMainType.CLMT_R1_DS, 'NUMBER_1'],
    [emChangLongMainType.CLMT_R1_LH, 'NUMBER_1'],
    [emChangLongMainType.CLMT_R2_DX, 'NUMBER_2'],
    [emChangLongMainType.CLMT_R2_DS, 'NUMBER_2'],
    [emChangLongMainType.CLMT_R2_LH, 'NUMBER_2'],
    [emChangLongMainType.CLMT_R3_DX, 'NUMBER_3'],
    [emChangLongMainType.CLMT_R3_DS, 'NUMBER_3'],
    [emChangLongMainType.CLMT_R3_LH, 'NUMBER_3'],
    [emChangLongMainType.CLMT_R4_DX, 'NUMBER_4'],
    [emChangLongMainType.CLMT_R4_DS, 'NUMBER_4'],
    [emChangLongMainType.CLMT_R4_LH, 'NUMBER_4'],
    [emChangLongMainType.CLMT_R5_DX, 'NUMBER_5'],
    [emChangLongMainType.CLMT_R5_DS, 'NUMBER_5'],
    [emChangLongMainType.CLMT_R5_LH, 'NUMBER_5'],
    [emChangLongMainType.CLMT_R6_DX, 'NUMBER_6'],
    [emChangLongMainType.CLMT_R6_DS, 'NUMBER_6'],
    [emChangLongMainType.CLMT_R7_DX, 'NUMBER_7'],
    [emChangLongMainType.CLMT_R7_DS, 'NUMBER_7'],
    [emChangLongMainType.CLMT_R8_DX, 'NUMBER_8'],
    [emChangLongMainType.CLMT_R8_DS, 'NUMBER_8'],
    [emChangLongMainType.CLMT_R9_DX, 'NUMBER_9'],
    [emChangLongMainType.CLMT_R9_DS, 'NUMBER_9'],
    [emChangLongMainType.CLMT_R10_DX, 'NUMBER_10'],
    [emChangLongMainType.CLMT_R10_DS, 'NUMBER_10'],
    [emChangLongMainType.CLMT_SUM_DX, 'NUMBER_1_2_HE'],
    [emChangLongMainType.CLMT_SUM_DS, 'NUMBER_1_2_HE'],
  ]);

  // 获取注单名称 clM 主码 clS 子码 isBetArr 是否只要号码数组
  export const getCLNameOrBets = (
    clM: number,
    clS: number,
    isBetArr?: boolean
  ) => {
    if (isBetArr) {
      return subTypeMap.get(clM) || [];
    }
    if (subTypeMap.has(clM)) {
      return `${mainTypeMpa.get(clM)}&${
        subTypeMap.get(clM).find((it) => it.clSubMainType === clS)?.title
      }`;
    }
    return '';
  };

  ////////////////////////////////////////////////////////////////////////////////////

  export const GAME_SCENE_FREE: number = 0; //等待开始

  export const GAME_SCENE_BET: number = 100; //下注状态

  export const GAME_SCENE_WAIT: number = 101; //封盘状态

  export const MAX_NUMBER_COUNT: number = 2; //最大自选号码数目

  export const MAX_BET_COUNT: number = 216; //最大下注数目

  export const LEN_SINGLE_BET_SUB: number = emBetTypeRank.SBTR_COUNT; //最大子类型长度

  export const SBT_INVALID: number = 0xff; //无效子区域下注类型

  export const NUMBER_INVALID: number = 0xff; //无效自选号码

  export const COUNT_OF_CARS: number = 10; //开奖结果

  export const INVALID_CARD: number = 0xff; //无效的开奖数值

  export const LEN_NUMBER: number = 20; //开奖数值数量

  export const MAX_SEND_HISTORY: number = 50; //开奖记录

  export const JETTON_COUNT: number = 9; //筹码档位数目

  export const MAX_DYNAMIC_MULTIPLE_COUNT: number = 0xff; //最大动态赔率档位

  export const MAX_MUTEX_SUBTYPE_COUNT: number = 2; //最大互斥子区域数目

  export const SUB_CHANG_LONG_INVALID: number = 0xff; //无效长龙子类型

  export const MAX_SUB_CHANG_LONG_COUNT: number = 2; //最大长龙子类型数目

  export const MAX_PRE_RESULT_COUNT: number = 200; //预生成开奖结果数量

  export const SOURCE_DATA_COUNT: number = 3; //源数据数量

  export const MAX_SOURCE_DATA_LEN: number = 64; //源数据长度

  export const MAX_ROBOT_BET_COUNT: number = 5; //单笔下注最大数量

  export const MAX_ROBOT_BET_ITEM_COUNT: number = 16; //下注组合最大数量

  export const MAX_ROBOT_BET_SCORE_COUNT: number = 50; //下注金额配置数量

  export class tagMultipleDeduct extends Struct {
    lBetScoreUnit = CreateObject(SCORE); //总投注每满足N递减赔率(可重复)
    dwDeductMultiple = CreateObject(DWORD); //赔率递减单位(实际赔率=配置值/10000)
  }
  export class tagUserBetAreaInfo extends Struct {
    cbBetMainType = CreateObject(BYTE); //主类型
    cbBetSubType = CreateObject(BYTE); //子类型
    cbNumber = CreateArray(BYTE, [MAX_NUMBER_COUNT]); //自选号码
  }
  export class tagUserBetInfo extends Struct {
    cbBetMainType = CreateObject(BYTE); //主类型
    cbBetSubType = CreateObject(BYTE); //子类型
    cbNumber = CreateArray(BYTE, [MAX_NUMBER_COUNT]); //自选号码
    lBetScore = CreateObject(SCORE); //下注金额
    dwNormalMultiple = CreateObject(DWORD); //校验常规赔率
    dwSpecialMultiple = CreateObject(DWORD); //校验特殊赔率
  }
  export class tagRecordInfo extends Struct {
    szPeriodNumber = CreateObject(CSTRING, common.MAX_ISSUE_LEN); //期号
    cbTableCard = CreateArray(BYTE, [COUNT_OF_CARS]); //开奖结果
    // szSourceData = CreateArray2(CSTRING,SOURCE_DATA_COUNT,MAX_SOURCE_DATA_LEN)//号源数据
    szSourceData = CreateArray2(
      CSTRING,
      [SOURCE_DATA_COUNT, MAX_SOURCE_DATA_LEN],
      MAX_SOURCE_DATA_LEN
    ); //号源数据
    cbResultType = CreateArray(BYTE, [emResultPosType.RPT_COUNT]); //结果类型
    stRequestTime = CreateObject(common.SYSTEMTIME); //号源抓取时间
  }
  export class tagPreRecordInfo extends Struct {
    cbTableCard = CreateArray(BYTE, [COUNT_OF_CARS]); //开奖结果
    szSourceData = CreateArray2(
      CSTRING,
      SOURCE_DATA_COUNT,
      MAX_SOURCE_DATA_LEN
    ); //号源数据
  }
  export class tagRobotConfig extends Struct {
    nBetProbability = CreateObject(INT); //单个机器人下注概率（万分比）
    wAreaCount = CreateObject(WORD); //下注区域组合数量
    BetArea = CreateArray2(tagUserBetAreaInfo, [
      MAX_ROBOT_BET_ITEM_COUNT,
      MAX_ROBOT_BET_COUNT,
    ]); //下注区域组合配置
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
}
