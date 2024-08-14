import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';

//子区域
export const onGetBetSubDes = (cbBetMainType, cbBetSubType) => {
  let desIndex = '';
  if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE) {
    if (cbBetSubType === 0) {
      desIndex = '数字';
    } else if (cbBetSubType === 1) {
      desIndex = '大';
    } else if (cbBetSubType === 2) {
      desIndex = '小';
    } else if (cbBetSubType === 3) {
      desIndex = '单';
    } else if (cbBetSubType === 4) {
      desIndex = '双';
    } else if (cbBetSubType === 5) desIndex = '合单';
    else if (cbBetSubType === 6) desIndex = '合双';
    else if (cbBetSubType === 7) desIndex = '尾大';
    else if (cbBetSubType === 8) desIndex = '尾小';
    else if (cbBetSubType === 9) desIndex = '红波';
    else if (cbBetSubType === 10) desIndex = '蓝波';
    else if (cbBetSubType === 11) {
      desIndex = '绿波';
    }
  } else if (cbBetMainType >= CMD_2903.emBetMainType.BTM_ZHENG_1
    && cbBetMainType <= CMD_2903.emBetMainType.BTM_ZHENG_6) {
    if (cbBetSubType === 0) desIndex = '数字';
    else if (cbBetSubType === 1) desIndex = '大';
    else if (cbBetSubType === 2) desIndex = '小';
    else if (cbBetSubType === 3) desIndex = '单';
    else if (cbBetSubType === 4) desIndex = '双';
    else if (cbBetSubType === 5) desIndex = '合单';
    else if (cbBetSubType === 6) desIndex = '合双';
    else if (cbBetSubType === 7) desIndex = '红波';
    else if (cbBetSubType === 8) desIndex = '蓝波';
    else if (cbBetSubType === 9) desIndex = '绿波';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG) {
    desIndex = '数字';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_HE) {
    if (cbBetSubType === 0) desIndex = '大';
    else if (cbBetSubType === 1) desIndex = '小';
    else if (cbBetSubType === 2) desIndex = '单';
    else if (cbBetSubType === 3) desIndex = '双';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_BAN_BO) { //半波
    if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DAN) desIndex = '红单';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_SHUANG) desIndex = '红双';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DA) desIndex = '红大';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_XIAO) desIndex = '红小';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DAN) desIndex = '蓝单';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_SHUANG) desIndex = '蓝双';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DA) desIndex = '蓝大';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_XIAO) desIndex = '蓝小';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_DAN) desIndex = '绿单';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_SHUANG) desIndex = '绿双';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_DA) desIndex = '绿大';
    else if (cbBetSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_XIAO) desIndex = '绿小';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) { //特肖
    if (cbBetSubType === CMD_2903.emXiaoType.XT_SHU) desIndex = '鼠';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_NIU) desIndex = '牛';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_HU) desIndex = '虎';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_TU) desIndex = '兔';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_LONG) desIndex = '龙';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_SHE) desIndex = '蛇';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_MA) desIndex = '马';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_YANG) desIndex = '羊';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_HOU) desIndex = '猴';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_JI) desIndex = '鸡';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_GOU) desIndex = '狗';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_ZHU) desIndex = '猪';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) { //一肖
    if (cbBetSubType === CMD_2903.emXiaoType.XT_SHU) desIndex = '鼠';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_NIU) desIndex = '牛';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_HU) desIndex = '虎';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_TU) desIndex = '兔';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_LONG) desIndex = '龙';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_SHE) desIndex = '蛇';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_MA) desIndex = '马';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_YANG) desIndex = '羊';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_HOU) desIndex = '猴';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_JI) desIndex = '鸡';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_GOU) desIndex = '狗';
    else if (cbBetSubType === CMD_2903.emXiaoType.XT_ZHU) desIndex = '猪';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_ZHENG_TE_WEI) { //正特尾
    desIndex = '数字';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_LIAN_MA) { //连码
    if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SI_QUAN) desIndex = '四全中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_QUAN) desIndex = '三全中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_ER) desIndex = '三中二';
    else if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_QUAN) desIndex = '二全中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_TE) desIndex = '二中特';
    else if (cbBetSubType === CMD_2903.emSubBetTypeLianMa.SBTL_TE_CHUAN) desIndex = '特串';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_HE_XIAO) { //合肖
    if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_1) desIndex = '一肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_2) desIndex = '二肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_3) desIndex = '三肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_4) desIndex = '四肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_5) desIndex = '五肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_6) desIndex = '六肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_7) desIndex = '七肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_8) desIndex = '八肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_9) desIndex = '九肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_10) desIndex = '十肖中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_2) desIndex = '二肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_3) desIndex = '三肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_4) desIndex = '四肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_5) desIndex = '五肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_6) desIndex = '六肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_7) desIndex = '七肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_8) desIndex = '八肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_9) desIndex = '九肖不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_10) desIndex = '十肖不中';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) { //生肖连
    if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2) desIndex = '二肖连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3) desIndex = '三肖连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4) desIndex = '四肖连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5) desIndex = '五肖连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2) desIndex = '二肖连不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3) desIndex = '三肖连不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4) desIndex = '四肖连不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5) desIndex = '五肖连不中';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_WEI_SHU_LIAN) { //尾数连
    if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2) desIndex = '二尾连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3) desIndex = '三尾连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4) desIndex = '四尾连中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2) desIndex = '二尾连不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3) desIndex = '三尾连不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4) desIndex = '四尾连不中';
  } else if (cbBetMainType === CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG) { //全不中
    if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_5) desIndex = '五不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_6) desIndex = '六不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_7) desIndex = '七不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_8) desIndex = '八不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_9) desIndex = '九不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_10) desIndex = '十不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_11) desIndex = '十一不中';
    else if (cbBetSubType === CMD_2903.emSubBetTypeQBZ.SBTQBZ_12) desIndex = '十二不中';
  }
  return desIndex;
};

export const getMultype = (cbMainType, cbSubType, bSpecial, cbAreaInfoNumber, value, cbCurrXiao) => {
  //特码
  if (cbMainType === CMD_2903.emBetMainType.BTM_TE) {
    //数字
    if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_NUM) {
      if (Number(value) === Number(cbAreaInfoNumber[0].value)) {
        return cbAreaInfoNumber[0].value;
      }
    }

    if (cbSubType > CMD_2903.emSubBetTypeTeMa.SBTT_NUM && cbSubType <= CMD_2903.emSubBetTypeTeMa.SBTT_WEI_XIAO) {
      return CMD_2903.emMultipleType.MT_TE_NUM + cbSubType - CMD_2903.emSubBetTypeTeMa.SBTT_NUM;
    }
    //红
    if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_HONG) {
      return CMD_2903.emMultipleType.MT_TE_HONG;
    }
    //蓝
    if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_LAN) {
      return CMD_2903.emMultipleType.MT_TE_LAN;
    }
    //绿
    if (cbSubType === CMD_2903.emSubBetTypeTeMa.SBTT_LV) {
      return CMD_2903.emMultipleType.MT_TE_LV;
    }
    return -1;
  } if (cbMainType >= CMD_2903.emBetMainType.BTM_ZHENG_1 && cbMainType <= CMD_2903.emBetMainType.BTM_ZHENG_6) {
    //正码1-6
    if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM) {
      if (Number(value) === Number(cbAreaInfoNumber[0])) {
        return cbAreaInfoNumber[0];
      }
    }
    if (cbSubType > CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM && cbMainType <= CMD_2903.emSubBetTypeZhengNum.SBTZN_HE_SHUANG) {
      //大小单双合单合双
      return CMD_2903.emMultipleType.MT_ZN_NUM + cbSubType - CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM;
    }
    //红
    if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_HONG) {
      return CMD_2903.emMultipleType.MT_ZN_HONG;
    }
    //蓝
    if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_LAN) {
      return CMD_2903.emMultipleType.MT_ZN_LAN;
    }
    //绿
    if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_LV) {
      return CMD_2903.emMultipleType.MT_ZN_LV;
    }
    return -1;
  } if (cbMainType === CMD_2903.emBetMainType.BTM_ZHENG) {
    /////正码
    //数字
    if (cbSubType === CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM) {
      if (cbSubType === CMD_2903.emSubBetTypeZheng.SBTZ_NUM) {
        //数字
        if (Number(value) === Number(cbAreaInfoNumber[0])) {
          return cbAreaInfoNumber[0];
        }
        return -1;
      }
    }
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_HE) {
    /////正码BTM_HE
    if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_DA) {
      //总大
      return CMD_2903.emMultipleType.MT_HE_DA;
    }
    if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_XIAO) {
      //总小
      return CMD_2903.emMultipleType.MT_HE_XIAO;
    }
    if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_DAN) {
      //总单
      return CMD_2903.emMultipleType.MT_HE_DAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeHe.SBTH_SHUANG) {
      //总双
      return CMD_2903.emMultipleType.MT_HE_SHUANG;
    }
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_BAN_BO) {
    //半波
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DA) {
      //红-大
      return CMD_2903.emMultipleType.MT_B_HONG_DA;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_XIAO) {
      //红-小
      return CMD_2903.emMultipleType.MT_B_HONG_XIAO;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DAN) {
      //红-单
      return CMD_2903.emMultipleType.MT_B_HONG_DAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_HONG_SHUANG) {
      //红-双
      return CMD_2903.emMultipleType.MT_B_HONG_SHUANG;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DA) {
      //蓝-大
      return CMD_2903.emMultipleType.MT_B_LAN_DA;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_XIAO) {
      //蓝-小
      return CMD_2903.emMultipleType.MT_B_LAN_XIAO;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DAN) {
      //蓝-单
      return CMD_2903.emMultipleType.MT_B_LAN_DAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LAN_SHUANG) {
      //蓝-双
      return CMD_2903.emMultipleType.MT_B_LAN_SHUANG;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_DA) {
      //绿-大
      return CMD_2903.emMultipleType.MT_B_LV_DA;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_XIAO) {
      //绿-小
      return CMD_2903.emMultipleType.MT_B_LV_XIAO;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_DAN) {
      //绿-单
      return CMD_2903.emMultipleType.MT_B_LV_DAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeBanBo.SBTB_LV_SHUANG) {
      //绿-双
      return CMD_2903.emMultipleType.MT_B_LV_SHUANG;
    }
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_TE_XIAO) {
    //特肖
    return CMD_2903.emMultipleType.MT_TX_SHU + cbSubType - CMD_2903.emXiaoType.XT_SHU;
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_YI_XIAO) {
    //一肖
    return CMD_2903.emMultipleType.MT_YX_SHU + cbSubType - CMD_2903.emXiaoType.XT_SHU;
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_ZHENG_TE_WEI) {
    //正特尾
    return CMD_2903.emMultipleType.MT_ZTW_0 + cbAreaInfoNumber[0] + CMD_2903.emSubBetTypeZTW.SBTZTW_NUM;
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_LIAN_MA) {
    //连码
    if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SI_QUAN) {
      //四全中
      return CMD_2903.emMultipleType.MT_L_SI_QUAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_QUAN) {
      //三全中
      return CMD_2903.emMultipleType.MT_L_SAN_QUAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_SAN_ER) {
      //三中二
      if (bSpecial) {
        return CMD_2903.emMultipleType.MT_L_SAN_ER_SAN;
      }
      return CMD_2903.emMultipleType.MT_L_SAN_ER;
    }
    if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_QUAN) {
      //二全中
      return CMD_2903.emMultipleType.MT_L_ER_QUAN;
    }
    if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_ER_TE) {
      //二中特
      if (bSpecial) {
        return CMD_2903.emMultipleType.MT_L_ER_TE_ER;
      }
      return CMD_2903.emMultipleType.MT_L_ER_TE;
    }
    if (cbSubType === CMD_2903.emSubBetTypeLianMa.SBTL_TE_CHUAN) {
      //特串
      return CMD_2903.emMultipleType.MT_L_TE_CHUAN;
    }
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_HE_XIAO) {
    //合肖
    return CMD_2903.emMultipleType.MT_HE_ZHONG_1 + cbSubType - CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_1;
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN) {
    //生肖连
    let isCurXiao = false;
    for (let i = 0; i < cbAreaInfoNumber.length; i += 1) {
      if (cbAreaInfoNumber[i] === cbCurrXiao) {
        isCurXiao = true;
        break;
      }
    }
    if (isCurXiao) {
      // mutilelist.current[cbSubType + CMD_2903.emMultipleType.MT_SXL_ZHONG_2_BEN].value = dwCurMultiple;
      if (cbAreaInfoNumber.length === 1) return -1;
    }
    return cbSubType + CMD_2903.emMultipleType.MT_SXL_ZHONG_2;
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_WEI_SHU_LIAN) {
    //尾数连
    let isZeroValue = false;
    for (let i = 0; i < cbAreaInfoNumber.length; i += 1) {
      if (cbAreaInfoNumber[i] === 0) {
        isZeroValue = true;
        break;
      }
    }
    if (isZeroValue) {
      // mutilelist.current[cbSubType + CMD_2903.emMultipleType.MT_WSL_ZHONG_2_0].value = dwCurMultiple;
      if (cbAreaInfoNumber.length === 1) return -1;
    }

    return cbSubType + CMD_2903.emMultipleType.MT_WSL_ZHONG_2;
  } else if (cbMainType === CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG) {
    //全不中
    return cbSubType + CMD_2903.emMultipleType.MT_QBZ_5;
  }
  return -1;
};


export const getMultipleData = (value, multType, multTypeSpecial, cbBetMainType, cbBetSubType, mutile, dynamicList, cbCurrXiao) => {
  const itemValue = mutile[multType].value;


  if (dynamicList.length > 0) {
    const tempObj = { dwNormalMultiple: 0, dwSpecialMultiple: 0, value };
    for (let i = 0; i < dynamicList.length; i += 1) {
      const areaInfo = dynamicList[i].AreaInfo;
      const dwCurMultiple = dynamicList[i].dwMultiple.value;
      const cbMainType = areaInfo.cbBetMainType.value;
      const cbSubType = areaInfo.cbBetSubType.value;
      // const bSpecial = dynamicList[i].bSpecial.value;
      const bSpecial = false;
      const cbAreaInfoNumber = areaInfo.cbNumber;

      let tempVal = -1;
      if ((cbBetMainType === cbMainType) && (cbBetSubType === cbSubType)) {
        tempVal = getMultype(cbMainType, cbSubType, bSpecial, cbAreaInfoNumber, value, cbCurrXiao);
      }

      if (tempVal !== -1) {
        if (bSpecial) {
          tempObj['dwNormalMultiple'] = itemValue;
          tempObj['dwSpecialMultiple'] = dwCurMultiple;
        } else {
          tempObj['dwNormalMultiple'] = dwCurMultiple;
          tempObj['dwSpecialMultiple'] = 0;
        }
        break;
      }
    }
    if (tempObj['dwNormalMultiple'] !== 0) {
      return tempObj;
    }
  }
  
  if (multTypeSpecial) {
    return {
      dwNormalMultiple: itemValue, dwSpecialMultiple: mutile[multTypeSpecial].value, value, multTypeSpecial
    };
  }
  return {
    dwNormalMultiple: itemValue, dwSpecialMultiple: 0, value, multTypeSpecial: 0
  };
};


