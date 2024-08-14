import { CMD_2901 } from "@/engine/game/pc/2901/CMD_2901";
import { CMD_CHANGLONG } from "./CMD_CHANGLONG";
import { CMD_2902 } from "@/engine/game/pc/2902/CMD_2902";
import { CMD_2905 } from "@/engine/game/pc/2905/CMD_2905";

export const onCLGetAreaName = (wKindID, cbBetMainType, cbBetSubType, bShowMain, bShowSub)=>{
    let strAreaName = '';
    if (cbBetSubType == 0xFF) {
      return strAreaName;
    }
    if (wKindID == 2901) {
      if (bShowMain) {
        strAreaName = "特码-";
      }
      if (!bShowSub) {
        return strAreaName;
      }
      //特码-大小
      if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_DX0) {
        //大
        if (cbBetSubType == CMD_CHANGLONG.emChangLongSubTypeTeDX_2901.CLST_TDX_DA0) {
          strAreaName += "大";
        }
        //小
        else {
          strAreaName += "小";
        }
      }
      //特码-单双
      else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_DS) {
        //单
        if (cbBetSubType == CMD_CHANGLONG.emChangLongSubTypeTeDS_2901.CLST_TDS_DAN) {
          strAreaName += "单";
        }
        //双
        else {
          strAreaName += "双";
        }
      }
      //特码-波色
      else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_BO) {
        //红
        if (cbBetSubType == CMD_CHANGLONG.emChangLongSubTypeTeBO_2901.CLST_TBO_HONG) {
          strAreaName += "红波";
        }
        //蓝
        else if (cbBetSubType ==
          CMD_CHANGLONG.emChangLongSubTypeTeBO_2901.CLST_TBO_LAN) {
          strAreaName += "蓝波";
        }
        //绿
        else {
          strAreaName += "绿波";
        }
      }
      //特码-龙虎和
      else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_LHH) {
        //龙
        if (cbBetSubType == CMD_CHANGLONG.emChangLongSubTypeTeLHH_2901.CLST_TLHH_LONG) {
          strAreaName += "龙";
        }
        //虎
        else if (cbBetSubType ==
          CMD_CHANGLONG.emChangLongSubTypeTeLHH_2901.CLST_TLHH_HU) {
          strAreaName += "虎";
        }
        //和
        else {
          strAreaName += "和";
        }
      }
    } else if (wKindID == 2902 || wKindID === 3102) {
      const arrType = [
        ["冠军-", "大", "小"],
        ["亚军-", "大", "小"],
        ["第三名-", "大", "小"],
        ["第四名-", "大", "小"],
        ["第五名-", "大", "小"],
        ["第六名-", "大", "小"],
        ["第七名-", "大", "小"],
        ["第八名-", "大", "小"],
        ["第九名-", "大", "小"],
        ["第十名-", "大", "小"],
        ["冠军-", "单", "双"],
        ["亚军-", "单", "双"],
        ["第三名-", "单", "双"],
        ["第四名-", "单", "双"],
        ["第五名-", "单", "双"],
        ["第六名-", "单", "双"],
        ["第七名-", "单", "双"],
        ["第八名-", "单", "双"],
        ["第九名-", "单", "双"],
        ["第十名-", "单", "双"],
        ["冠军-", "龙", "虎"],
        ["亚军-", "龙", "虎"],
        ["第三名-", "龙", "虎"],
        ["第四名-", "龙", "虎"],
        ["第五名-", "龙", "虎"],
        ["冠亚军和-", "大", "小"],
        ["冠亚军和-", "单", "双"],
      ];
      if (bShowMain) {
        strAreaName = arrType[cbBetMainType][0];
      }
      if (!bShowSub) {
        return strAreaName;
      }
      strAreaName += arrType[cbBetMainType][cbBetSubType + 1];
    } else if (wKindID == 2904) {
      const arrType = [
        ["冠军-", "大", "小"],
        ["亚军-", "大", "小"],
        ["第三名-", "大", "小"],
        ["第四名-", "大", "小"],
        ["第五名-", "大", "小"],
        ["第六名-", "大", "小"],
        ["第七名-", "大", "小"],
        ["第八名-", "大", "小"],
        ["第九名-", "大", "小"],
        ["第十名-", "大", "小"],
        ["冠军-", "单", "双"],
        ["亚军-", "单", "双"],
        ["第三名-", "单", "双"],
        ["第四名-", "单", "双"],
        ["第五名-", "单", "双"],
        ["第六名-", "单", "双"],
        ["第七名-", "单", "双"],
        ["第八名-", "单", "双"],
        ["第九名-", "单", "双"],
        ["第十名-", "单", "双"],
        ["冠军-", "龙", "虎"],
        ["亚军-", "龙", "虎"],
        ["第三名-", "龙", "虎"],
        ["第四名-", "龙", "虎"],
        ["第五名-", "龙", "虎"],
        ["冠亚军和-", "大", "小"],
        ["冠亚军和-", "单", "双"],
      ];
      if (bShowMain) {
        strAreaName = arrType[cbBetMainType][0];
      }
      if (!bShowSub) {
        return strAreaName;
      }
      strAreaName += arrType[cbBetMainType][cbBetSubType + 1];
    } else if (wKindID == 2905 || wKindID === 3202 || wKindID === 3203) {
      const arrType = [
        ["总和-", "大", "小"],
        ["总和-", "单", "双"],
        ["总和-", "龙", "虎", "和"],
        ["第一球-", "大", "小"],
        ["第一球-", "单", "双"],
        ["第二球-", "大", "小"],
        ["第二球-", "单", "双"],
        ["第三球-", "大", "小"],
        ["第三球-", "单", "双"],
        ["第四球-", "大", "小"],
        ["第四球-", "单", "双"],
        ["第五球-", "大", "小"],
        ["第五球-", "单", "双"],
      ];



      if (bShowMain) {
        // console.log("🚀 ~ file: common_changlong.ts:167 ~ onCLGetAreaName ~ cbBetMainType:", cbBetMainType)
        strAreaName = arrType[cbBetMainType][0];
        
      }
      if (!bShowSub) {
        return strAreaName;
      }
      strAreaName += arrType[cbBetMainType][cbBetSubType + 1];
    }
    return strAreaName;
}


export const onCLGetBtnName = (wKindID, cbBetMainType, cbBetSubType)=>{
  let arrAreaName = [];

  if (cbBetSubType == 0xFF) {
    return ["", ""];
  }
  if (wKindID == 2901) {
    //特码-大小
    if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_DX0) {
      arrAreaName = ["大", "小"];
    }
    //特码-单双
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_DS) {
      arrAreaName = ["单", "双"];
    }
    //特码-波色
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_BO) {
      arrAreaName = ["红波", "蓝波", "绿波"];
    }
    //特码-龙虎和
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2901.CLMT_TE_LHH) {
      arrAreaName = ["龙", "虎", "和"];
    }
  } else if (wKindID == 2902 || wKindID === 3102) {
    //特码-大小
    if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R1_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R2_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R3_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R4_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R5_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R6_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R7_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R8_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R9_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R10_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_SUM_DX) {
      arrAreaName = ["大", "小"];
    }
    //特码-单双
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R1_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R2_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R3_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R4_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R5_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R6_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R7_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R8_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R9_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R10_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_SUM_DS) {
      arrAreaName = ["单", "双"];
    }
    //特码-龙虎和
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R1_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R2_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R3_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R4_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R5_LHH) {
      // arrAreaName = ["龙", "虎", "和"];
      arrAreaName = ["龙", "虎"];
    }
  } else if (wKindID == 2904) {
    //特码-大小
    if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R1_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R2_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R3_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R4_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R5_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R6_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R7_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R8_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R9_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R10_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_SUM_DX) {
      arrAreaName = ["大", "小"];
    }
    //特码-单双
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R1_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R2_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R3_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R4_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R5_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R6_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R7_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R8_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R9_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R10_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_SUM_DS) {
      arrAreaName = ["单", "双"];
    }
    //特码-龙虎和
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R1_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R2_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R3_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R4_LHH ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2902.CLMT_R5_LHH) {
      // arrAreaName = ["龙", "虎", "和"];
      arrAreaName = ["龙", "虎"];
    }
  } else if (wKindID == 2905 || wKindID === 3202 || wKindID === 3203) {
    //特码-大小
    if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_HE_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D1_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D2_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D3_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D4_DX ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D5_DX) {
      arrAreaName = ["大", "小"];
    }
    //特码-单双
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_HE_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D1_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D2_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D3_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D4_DS ||
        cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_D5_DS) {
      arrAreaName = ["单", "双"];
    }
    //特码-龙虎和
    else if (cbBetMainType == CMD_CHANGLONG.emChangLongMainType_2905.CLMT_HE_LHH) {
      arrAreaName = ["龙", "虎", "和"];
    }
  }
  return arrAreaName;
}


export namespace CommonArea{
  ///2901长龙
  export const aryCLAreaList_2901 = [
    [
      "特码-大",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_DA,
      4,
      "大",
    ],
    [
      "特码-小",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_XIAO,
      4,
      "小",
    ],
    [
      "特码-单",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_DAN,
      4,
      "单",
    ],
    [
      "特码-双",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_SHUANG,
      4,
      "双",
    ],
    [
      "特码-红波",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_HONG,
      4,
      "红波",
    ],
    [
      "特码-蓝波",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_LAN,
      4,
      "蓝波",
    ],
    [
      "特码-绿波",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_LV,
      4,
      "绿波",
    ],
    [
      "特码-龙",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_LONG,
      3,
      "龙",
    ],
    [
      "特码-虎",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_HU,
      3,
      "虎",
    ],
    [
      "特码-和",
      0xFF,
      CMD_2901.emBetMainType.BTM_TE,
      CMD_2901.emSubBetTypeTeMa.SBTT_HE,
      3,
      "和",
    ],
  ];

  ///2902 长龙
  export const aryCLAreaList_2902 = [
    // ["冠军-", "大", "小"],
    [
      "冠军-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_1,
      CMD_2902.emBetTypeRank.SBTR_DA,
      3,
      "大",
    ],
    [
      "冠军-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_1,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      3,
      "小",
    ],

    // ["亚军-", "大", "小"],
    [
      "亚军-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_2,
      CMD_2902.emBetTypeRank.SBTR_DA,
      3,
      "大",
    ],
    [
      "亚军-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_2,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      3,
      "小",
    ],

    // ["第三名-", "大", "小"],
    [
      "第三名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_3,
      CMD_2902.emBetTypeRank.SBTR_DA,
      3,
      "大",
    ],
    [
      "第三名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_3,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      3,
      "小",
    ],
    // ["第四名-", "大", "小"],
    [
      "第四名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_4,
      CMD_2902.emBetTypeRank.SBTR_DA,
      3,
      "大",
    ],
    [
      "第四名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_4,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      3,
      "小",
    ],
    // ["第五名-", "大", "小"],
    [
      "第五名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_5,
      CMD_2902.emBetTypeRank.SBTR_DA,
      3,
      "大",
    ],
    [
      "第五名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_5,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      3,
      "小",
    ],
    // ["第六名-", "大", "小"],
    [
      "第六名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_6,
      CMD_2902.emBetTypeRank.SBTR_DA,
      4,
      "大",
    ],
    [
      "第六名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_6,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      4,
      "小",
    ],
    // ["第七名-", "大", "小"],
    [
      "第七名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_7,
      CMD_2902.emBetTypeRank.SBTR_DA,
      4,
      "大",
    ],
    [
      "第七名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_7,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      4,
      "小",
    ],
    // ["第八名-", "大", "小"],
    [
      "第八名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_8,
      CMD_2902.emBetTypeRank.SBTR_DA,
      4,
      "大",
    ],
    [
      "第八名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_8,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      4,
      "小",
    ],
    // ["第九名-", "大", "小"],
    [
      "第九名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_9,
      CMD_2902.emBetTypeRank.SBTR_DA,
      4,
      "大",
    ],
    [
      "第九名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_9,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      4,
      "小",
    ],
    // ["第十名-", "大", "小"],
    [
      "第十名-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_10,
      CMD_2902.emBetTypeRank.SBTR_DA,
      4,
      "大",
    ],
    [
      "第十名-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_10,
      CMD_2902.emBetTypeRank.SBTR_XIAO,
      4,
      "小"
    ],
    // ["冠军-", "单", "双"],
    [
      "冠军-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_1,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      3,
      "单",
    ],
    [
      "冠军-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_1,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      3,
      "双",
    ],
    // ["亚军-", "单", "双"],
    [
      "亚军-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_2,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      3,
      "单",
    ],
    [
      "亚军-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_2,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      3,
      "双",
    ],
    // ["第三名-", "单", "双"],
    [
      "第三名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_3,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      3,
      "单",
    ],
    [
      "第三名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_3,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      3,
      "双",
    ],
    // ["第四名-", "单", "双"],
    [
      "第四名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_4,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      3,
      "单",
    ],
    [
      "第四名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_4,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      3,
      "双",
    ],
    // ["第五名-", "单", "双"],
    [
      "第五名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_5,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      3,
      "单",
    ],
    [
      "第五名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_5,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      3,
      "双",
    ],
    // ["第六名-", "单", "双"],
    [
      "第六名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_6,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      4,
      "单",
    ],
    [
      "第六名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_6,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      4,
      "双",
    ],
    // ["第七名-", "单", "双"],
    [
      "第七名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_7,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      4,
      "单",
    ],
    [
      "第七名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_7,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      4,
      "双",
    ],
    // ["第八名-", "单", "双"],
    [
      "第八名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_8,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      4,
      "单",
    ],
    [
      "第八名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_8,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      4,
      "双",
    ],
    // ["第九名-", "单", "双"],
    [
      "第九名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_9,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      4,
      "单",
    ],
    [
      "第九名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_9,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      4,
      "双",
    ],
    // ["第十名-", "单", "双"],
    [
      "第十名-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_10,
      CMD_2902.emBetTypeRank.SBTR_DAN,
      4,
      "单",
    ],
    [
      "第十名-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_10,
      CMD_2902.emBetTypeRank.SBTR_SHUANG,
      4,
      "双",
    ],
    // ["冠军-", "龙", "虎"],
    [
      "冠军-龙",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_1,
      CMD_2902.emBetTypeRank.SBTR_LONG,
      3,
      "龙",
    ],
    [
      "冠军-虎",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_1,
      CMD_2902.emBetTypeRank.SBTR_HU,
      3,
      "虎",
    ],
    // ["亚军-", "龙", "虎"],
    [
      "亚军-龙",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_2,
      CMD_2902.emBetTypeRank.SBTR_LONG,
      3,
      "龙",
    ],
    [
      "亚军-虎",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_2,
      CMD_2902.emBetTypeRank.SBTR_HU,
      3,
      "虎",
    ],
    // ["第三名-", "龙", "虎"],
    [
      "第三名-龙",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_3,
      CMD_2902.emBetTypeRank.SBTR_LONG,
      3,
      "龙",
    ],
    [
      "第三名-虎",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_3,
      CMD_2902.emBetTypeRank.SBTR_HU,
      3,
      "虎",
    ],
    // ["第四名-", "龙", "虎"],
    [
      "第四名-龙",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_4,
      CMD_2902.emBetTypeRank.SBTR_LONG,
      3,
      "龙",
    ],
    [
      "第四名-虎",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_4,
      CMD_2902.emBetTypeRank.SBTR_HU,
      3,
      "虎",
    ],
    // ["第五名-", "龙", "虎"],
    [
      "第五名-龙",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_5,
      CMD_2902.emBetTypeRank.SBTR_LONG,
      3,
      "龙",
    ],
    [
      "第五名-虎",
      0xFF,
      CMD_2902.emBetMainType.BTM_RANK_5,
      CMD_2902.emBetTypeRank.SBTR_HU,
      3,
      "虎",
    ],
    // ["冠亚军和-", "大", "小"],
    [
      "冠亚军和-大",
      0xFF,
      CMD_2902.emBetMainType.BTM_SUM,
      CMD_2902.emBetTypeSum.SBTS_DA,
      4,
      "大",
    ],

    [
      "冠亚军和-小",
      0xFF,
      CMD_2902.emBetMainType.BTM_SUM,
      CMD_2902.emBetTypeSum.SBTS_XIAO,
      4,
      "小",
    ],
    // ["冠亚军和-", "单", "双"],
    [
      "冠亚军和-单",
      0xFF,
      CMD_2902.emBetMainType.BTM_SUM,
      CMD_2902.emBetTypeSum.SBTS_DAN,
      4,
      "单",
    ],
    [
      "冠亚军和-双",
      0xFF,
      CMD_2902.emBetMainType.BTM_SUM,
      CMD_2902.emBetTypeSum.SBTS_SHUANG,
      4,
      "双",
    ],
  ]; 

  ///2905 长龙
  export const aryCLAreaList_2905 = [
    //总和-大小
    [
      "总和-大",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_DA,
      2,
      "大",
    ],
    [
      "总和-小",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_XIAO,
      2,
      "小",
    ],
    //总和-单双
    [
      "总和-单",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_DAN,
      2,
      "单",
    ],
    [
      "总和-双",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_SHUANG,
      2,
      "双",
    ],
    //总和-龙虎和
    [
      "总和-龙",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_LONG,
      2,
      "龙",
    ],
    [
      "总和-虎",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_HU,
      2,
      "虎",
    ],
    [
      "总和-和",
      0xFF,
      CMD_2905.emBetMainType.BTM_HE,
      CMD_2905.emSubBetTypeZongHe.SBTH_HE,
      2,
      "和",
    ],
    //第一球-大小
    [
      "第一球-大",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_1,
      CMD_2905.emSubBetTypeDingWei.SBTD_DA,
      2,
      "大",
    ],
    [
      "第一球-小",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_1,
      CMD_2905.emSubBetTypeDingWei.SBTD_XIAO,
      2,
      "小",
    ],
    //第一球-单双
    [
      "第一球-单",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_1,
      CMD_2905.emSubBetTypeDingWei.SBTD_DAN,
      2,
      "单",
    ],
    [
      "第一球-双",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_1,
      CMD_2905.emSubBetTypeDingWei.SBTD_SHUANG,
      2,
      "双",
    ],
    //第二球-大小
    [
      "第二球-大",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_2,
      CMD_2905.emSubBetTypeDingWei.SBTD_DA,
      2,
      "大",
    ],
    [
      "第二球-小",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_2,
      CMD_2905.emSubBetTypeDingWei.SBTD_XIAO,
      2,
      "小",
    ],
    //第二球-单双
    [
      "第二球-单",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_2,
      CMD_2905.emSubBetTypeDingWei.SBTD_DAN,
      2,
      "单",
    ],
    [
      "第二球-双",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_2,
      CMD_2905.emSubBetTypeDingWei.SBTD_SHUANG,
      2,
      "双",
    ],
    //第三球-大小
    [
      "第三球-大",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_3,
      CMD_2905.emSubBetTypeDingWei.SBTD_DA,
      2,
      "大",
    ],
    [
      "第三球-小",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_3,
      CMD_2905.emSubBetTypeDingWei.SBTD_XIAO,
      2,
      "小",
    ],
    //第三球-单双
    [
      "第三球-单",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_3,
      CMD_2905.emSubBetTypeDingWei.SBTD_DAN,
      2,
      "单",
    ],
    [
      "第三球-双",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_3,
      CMD_2905.emSubBetTypeDingWei.SBTD_SHUANG,
      2,
      "双",
    ],
    //第四球-大小
    [
      "第四球-大",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_4,
      CMD_2905.emSubBetTypeDingWei.SBTD_DA,
      2,
      "大",
    ],
    [
      "第四球-小",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_4,
      CMD_2905.emSubBetTypeDingWei.SBTD_XIAO,
      2,
      "小",
    ],
    //第四球-单双
    [
      "第四球-单",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_4,
      CMD_2905.emSubBetTypeDingWei.SBTD_DAN,
      2,
      "单",
    ],
    [
      "第四球-双",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_4,
      CMD_2905.emSubBetTypeDingWei.SBTD_SHUANG,
      2,
      "双",
    ],
    //第五球-大小
    [
      "第五球-大",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_5,
      CMD_2905.emSubBetTypeDingWei.SBTD_DA,
      2,
      "大",
    ],
    [
      "第五球-小",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_5,
      CMD_2905.emSubBetTypeDingWei.SBTD_XIAO,
      2,
      "小",
    ],
    //第五球-单双
    [
      "第五球-单",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_5,
      CMD_2905.emSubBetTypeDingWei.SBTD_DAN,
      2,
      "单",
    ],
    [
      "第五球-双",
      0xFF,
      CMD_2905.emBetMainType.BTM_DING_5,
      CMD_2905.emSubBetTypeDingWei.SBTD_SHUANG,
      2,
      "双",
    ],
  ];
}