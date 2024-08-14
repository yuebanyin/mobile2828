/* eslint-disable object-curly-newline */
import { CreateObject, DWORD } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { CMD_3203 } from '@/engine/game/pc/3203/CMD_3203';

export interface ButtonDataType {
  name: string;
  mainType?: number;
  subType?: number;
  number?: number[];
  oddsKey?: number;
  children?: ButtonDataType[];
}

export interface ContentProps {
  gameMultiple?: DWORD[]; // 赔率信息
  dyMultiple?: common.tagDynamicMultiple[]; // 动态赔率信息
  // eslint-disable-next-line no-unused-vars
  onChange?: (types: ButtonDataType[]) => void;
  // eslint-disable-next-line no-unused-vars
  onChangLongChange?: (...args: any) => void;
  gameWs?: any;
}

export interface ItemLayoutProps {
  data: ButtonDataType;
  gameMultiple?: DWORD[]; // 赔率信息
  dyMultiple?: common.tagDynamicMultiple[]; // 动态赔率信息
  // eslint-disable-next-line no-unused-vars
  onChange?: (types: ButtonDataType[]) => void;
}

export function buildTagUserBetInfo(score: number, odds: number, r: ButtonDataType): common.tagCommonBetInfo {
  const temp = CreateObject(common.tagCommonBetInfo);
  temp.AreaInfo.cbBetMainType.value = r.mainType;
  temp.AreaInfo.cbBetSubType.value = r.subType;
  const numberList = r.number || new Array(temp.AreaInfo.cbNumber.length);
  for (let i = 0; i < temp.AreaInfo.cbNumber.length; i += 1) {
    temp.AreaInfo.cbNumber[i].value = numberList[i] === undefined ? 255 : numberList[i];
  }
  temp.lBetScore.value = score * (common.GOLD_RATIO * 1.0);
  temp.dwNormalMultiple.value = odds;
  // temp.dwSpecialMultiple.value = odds;
  return temp;
}

export const zhButton: ButtonDataType[] = [
  {
    name: '第一球',
    mainType: CMD_3203.emBetMainType.BTM_DING_1,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D1_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D1_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D1_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D1_SHUANG },
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
    ],
  },
  {
    name: '第二球',
    mainType: CMD_3203.emBetMainType.BTM_DING_2,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D2_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D2_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D2_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D2_SHUANG },
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
    ],
  },
  {
    name: '第三球',
    mainType: CMD_3203.emBetMainType.BTM_DING_3,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D3_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D3_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D3_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D3_SHUANG },
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
    ],
  },
  {
    name: '第四球',
    mainType: CMD_3203.emBetMainType.BTM_DING_4,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D4_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D4_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D4_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D4_SHUANG },
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
    ],
  },
  {
    name: '第五球',
    mainType: CMD_3203.emBetMainType.BTM_DING_5,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D5_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D5_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D5_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D5_SHUANG },
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
    ],
  },
  {
    name: '总和-龙虎',
    mainType: CMD_3203.emBetMainType.BTM_HE,
    children: [
      { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
      { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
      { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
      { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
      { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
      { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
      { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
    ],
  },
  {
    name: '前三',
    mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
    children: [
      { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
      { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
      { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
      { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
      { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
    ],
  },
  {
    name: '中三',
    mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
    children: [
      { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
      { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
      { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
      { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
      { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
    ],
  },
  {
    name: '后三',
    mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
    children: [
      { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
      { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
      { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
      { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
      { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
    ],
  },
];

export const szpButton: ButtonDataType[] = [
  {
    name: '第一球',
    mainType: CMD_3203.emBetMainType.BTM_DING_1,
    children: [
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
    ],
  },
  {
    name: '第二球',
    mainType: CMD_3203.emBetMainType.BTM_DING_2,
    children: [
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
    ],
  },
  {
    name: '第三球',
    mainType: CMD_3203.emBetMainType.BTM_DING_3,
    children: [
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
    ],
  },
  {
    name: '第四球',
    mainType: CMD_3203.emBetMainType.BTM_DING_4,
    children: [
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
    ],
  },
  {
    name: '第五球',
    mainType: CMD_3203.emBetMainType.BTM_DING_5,
    children: [
      { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
      { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
    ],
  },
  {
    name: '前三',
    mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
    children: [
      { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
      { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
      { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
      { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
      { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
    ],
  },
  {
    name: '中三',
    mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
    children: [
      { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
      { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
      { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
      { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
      { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
    ],
  },
  {
    name: '后三',
    mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
    children: [
      { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
      { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
      { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
      { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
      { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
    ],
  },
];

export const lmButton: ButtonDataType[] = [
  {
    name: '第一球',
    mainType: CMD_3203.emBetMainType.BTM_DING_1,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D1_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D1_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D1_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D1_SHUANG },
    ],
  },
  {
    name: '第二球',
    mainType: CMD_3203.emBetMainType.BTM_DING_2,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D2_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D2_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D2_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D2_SHUANG },
    ],
  },
  {
    name: '第三球',
    mainType: CMD_3203.emBetMainType.BTM_DING_3,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D3_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D3_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D3_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D3_SHUANG },
    ],
  },
  {
    name: '第四球',
    mainType: CMD_3203.emBetMainType.BTM_DING_4,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D4_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D4_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D4_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D4_SHUANG },
    ],
  },
  {
    name: '第五球',
    mainType: CMD_3203.emBetMainType.BTM_DING_5,
    children: [
      { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D5_DA },
      { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D5_XIAO },
      { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D5_DAN },
      { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D5_SHUANG },
    ],
  },
  {
    name: '总和-龙虎',
    mainType: CMD_3203.emBetMainType.BTM_HE,
    children: [
      { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
      { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
      { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
      { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
      { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
      { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
      { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
    ],
  },
];

export const ballButton: ButtonDataType[] = [
  {
    name: '第一球',
    mainType: CMD_3203.emBetMainType.BTM_DING_1,
    children: [
      {
        name: '球号',
        mainType: CMD_3203.emBetMainType.BTM_DING_1,
        children: [
          { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D1_DA },
          { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D1_XIAO },
          { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D1_DAN },
          { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D1_SHUANG },
          { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
          { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_1, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D1_DIAN },
        ],
      },
      {
        name: '总和-龙虎',
        mainType: CMD_3203.emBetMainType.BTM_HE,
        children: [
          { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
          { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
          { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
          { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
          { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
          { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
          { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
        ],
      },
      {
        name: '前三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '中三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '后三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
    ],
  },
  {
    name: '第二球',
    mainType: CMD_3203.emBetMainType.BTM_DING_2,
    children: [
      {
        name: '球号',
        mainType: CMD_3203.emBetMainType.BTM_DING_2,
        children: [
          { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D2_DA },
          { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D2_XIAO },
          { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D2_DAN },
          { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D2_SHUANG },
          { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
          { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_2, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D2_DIAN },
        ],
      },
      {
        name: '总和-龙虎',
        mainType: CMD_3203.emBetMainType.BTM_HE,
        children: [
          { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
          { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
          { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
          { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
          { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
          { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
          { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
        ],
      },
      {
        name: '前三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '中三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '后三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
    ],
  },
  {
    name: '第三球',
    mainType: CMD_3203.emBetMainType.BTM_DING_3,
    children: [
      {
        name: '球号',
        mainType: CMD_3203.emBetMainType.BTM_DING_3,
        children: [
          { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D3_DA },
          { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D3_XIAO },
          { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D3_DAN },
          { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D3_SHUANG },
          { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
          { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_3, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D3_DIAN },
        ],
      },
      {
        name: '总和-龙虎',
        mainType: CMD_3203.emBetMainType.BTM_HE,
        children: [
          { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
          { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
          { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
          { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
          { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
          { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
          { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
        ],
      },
      {
        name: '前三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '中三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '后三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
    ],
  },
  {
    name: '第四球',
    mainType: CMD_3203.emBetMainType.BTM_DING_4,
    children: [
      {
        name: '球号',
        mainType: CMD_3203.emBetMainType.BTM_DING_4,
        children: [
          { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D4_DA },
          { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D4_XIAO },
          { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D4_DAN },
          { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D4_SHUANG },
          { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
          { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_4, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D4_DIAN },
        ],
      },
      {
        name: '总和-龙虎',
        mainType: CMD_3203.emBetMainType.BTM_HE,
        children: [
          { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
          { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
          { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
          { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
          { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
          { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
          { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
        ],
      },
      {
        name: '前三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '中三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '后三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
    ],
  },
  {
    name: '第五球',
    mainType: CMD_3203.emBetMainType.BTM_DING_5,
    children: [
      {
        name: '球号',
        mainType: CMD_3203.emBetMainType.BTM_DING_5,
        children: [
          { name: '大', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DA, oddsKey: CMD_3203.emMultipleType.MT_D5_DA },
          { name: '小', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_XIAO, oddsKey: CMD_3203.emMultipleType.MT_D5_XIAO },
          { name: '单', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_DAN, oddsKey: CMD_3203.emMultipleType.MT_D5_DAN },
          { name: '双', mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_D5_SHUANG },
          { name: '0', number: [0], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '1', number: [1], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '2', number: [2], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '3', number: [3], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '4', number: [4], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '5', number: [5], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '6', number: [6], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '7', number: [7], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '8', number: [8], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
          { name: '9', number: [9], mainType: CMD_3203.emBetMainType.BTM_DING_5, subType: CMD_3203.emSubBetTypeDingWei.SBTD_NUM, oddsKey: CMD_3203.emMultipleType.MT_D5_DIAN },
        ],
      },
      {
        name: '总和-龙虎',
        mainType: CMD_3203.emBetMainType.BTM_HE,
        children: [
          { name: '总和大', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DA, oddsKey: CMD_3203.emMultipleType.MT_H_DA },
          { name: '总和小', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_XIAO, oddsKey: CMD_3203.emMultipleType.MT_H_XIAO },
          { name: '总和单', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_DAN, oddsKey: CMD_3203.emMultipleType.MT_H_DAN },
          { name: '总和双', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_SHUANG, oddsKey: CMD_3203.emMultipleType.MT_H_SHUANG },
          { name: '龙', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_LONG, oddsKey: CMD_3203.emMultipleType.MT_H_LONG },
          { name: '虎', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HU, oddsKey: CMD_3203.emMultipleType.MT_H_HU },
          { name: '和', mainType: CMD_3203.emBetMainType.BTM_HE, subType: CMD_3203.emSubBetTypeZongHe.SBTH_HE, oddsKey: CMD_3203.emMultipleType.MT_H_HE },
        ],
      },
      {
        name: '前三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_QIAN, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '中三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_ZHONG, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
      {
        name: '后三',
        mainType: CMD_3203.emBetMainType.BTM_SAN_HOU,
        children: [
          { name: '豹子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAO, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAO },
          { name: '顺子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN },
          { name: '对子', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_DUI, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_DUI },
          { name: '半顺', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_BAN, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_BAN },
          { name: '杂六', mainType: CMD_3203.emBetMainType.BTM_SAN_HOU, subType: CMD_3203.emSubBetTypeSanZhang.SBTS_ZA, oddsKey: CMD_3203.emMultipleType.MT_SAN_QIAN_ZA },
        ],
      },
    ],
  },
];

export function getOddsKey(mainType: number, subType: number, number: number[]): number {
  console.log({ mainType, subType, number });
  switch (mainType) {
    case CMD_3203.emBetMainType.BTM_HE:
      // 总和投注大-小-单-双-龙-虎-和
      return subType;
    case CMD_3203.emBetMainType.BTM_DING_1:
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_NUM) {
        // 单点
        return CMD_3203.emMultipleType.MT_D1_DIAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DA) {
        // 大
        return CMD_3203.emMultipleType.MT_D1_DA;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_XIAO) {
        // 小
        return CMD_3203.emMultipleType.MT_D1_XIAO;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DAN) {
        // 单
        return CMD_3203.emMultipleType.MT_D1_DAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG) {
        // 双
        return CMD_3203.emMultipleType.MT_D1_SHUANG;
      }
      break;
    case CMD_3203.emBetMainType.BTM_DING_2:
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_NUM) {
        // 单点
        return CMD_3203.emMultipleType.MT_D2_DIAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DA) {
        // 大
        return CMD_3203.emMultipleType.MT_D2_DA;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_XIAO) {
        // 小
        return CMD_3203.emMultipleType.MT_D2_XIAO;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DAN) {
        // 单
        return CMD_3203.emMultipleType.MT_D2_DAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG) {
        // 双
        return CMD_3203.emMultipleType.MT_D2_SHUANG;
      }
      break;
    case CMD_3203.emBetMainType.BTM_DING_3:
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_NUM) {
        // 单点
        return CMD_3203.emMultipleType.MT_D3_DIAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DA) {
        // 大
        return CMD_3203.emMultipleType.MT_D3_DA;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_XIAO) {
        // 小
        return CMD_3203.emMultipleType.MT_D3_XIAO;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DAN) {
        // 单
        return CMD_3203.emMultipleType.MT_D3_DAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG) {
        // 双
        return CMD_3203.emMultipleType.MT_D3_SHUANG;
      }
      break;
    case CMD_3203.emBetMainType.BTM_DING_4:
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_NUM) {
        // 单点
        return CMD_3203.emMultipleType.MT_D4_DIAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DA) {
        // 大
        return CMD_3203.emMultipleType.MT_D4_DA;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_XIAO) {
        // 小
        return CMD_3203.emMultipleType.MT_D4_XIAO;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DAN) {
        // 单
        return CMD_3203.emMultipleType.MT_D4_DAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG) {
        // 双
        return CMD_3203.emMultipleType.MT_D4_SHUANG;
      }
      break;
    case CMD_3203.emBetMainType.BTM_DING_5:
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_NUM) {
        // 单点
        return CMD_3203.emMultipleType.MT_D5_DIAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DA) {
        // 大
        return CMD_3203.emMultipleType.MT_D5_DA;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_XIAO) {
        // 小
        return CMD_3203.emMultipleType.MT_D5_XIAO;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_DAN) {
        // 单
        return CMD_3203.emMultipleType.MT_D5_DAN;
      }
      if (subType === CMD_3203.emSubBetTypeDingWei.SBTD_SHUANG) {
        // 双
        return CMD_3203.emMultipleType.MT_D5_SHUANG;
      }
      break;
    case CMD_3203.emBetMainType.BTM_SAN_QIAN:
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_ZA) {
        // 前三-杂六
        return CMD_3203.emMultipleType.MT_SAN_QIAN_ZA;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_BAN) {
        // 前三-半顺
        return CMD_3203.emMultipleType.MT_SAN_QIAN_BAN;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN) {
        // 前三-顺子
        return CMD_3203.emMultipleType.MT_SAN_QIAN_SHUN;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_BAO) {
        // 前三-豹子
        return CMD_3203.emMultipleType.MT_SAN_QIAN_BAO;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_DUI) {
        // 前三-对子
        return CMD_3203.emMultipleType.MT_SAN_QIAN_DUI;
      }
      break;
    case CMD_3203.emBetMainType.BTM_SAN_ZHONG:
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_ZA) {
        // 中三-杂六
        return CMD_3203.emMultipleType.MT_SAN_ZHONG_ZA;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_BAN) {
        // 中三-半顺
        return CMD_3203.emMultipleType.MT_SAN_ZHONG_BAN;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN) {
        // 中三-顺子
        return CMD_3203.emMultipleType.MT_SAN_ZHONG_SHUN;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_BAO) {
        // 中三-豹子
        return CMD_3203.emMultipleType.MT_SAN_ZHONG_BAO;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_DUI) {
        // 中三-对子
        return CMD_3203.emMultipleType.MT_SAN_ZHONG_DUI;
      }
      break;
    case CMD_3203.emBetMainType.BTM_SAN_HOU:
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_ZA) {
        // 后三-杂六
        return CMD_3203.emMultipleType.MT_SAN_HOU_ZA;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_BAN) {
        // 后三-半顺
        return CMD_3203.emMultipleType.MT_SAN_HOU_BAN;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_SHUN) {
        // 后三-顺子
        return CMD_3203.emMultipleType.MT_SAN_HOU_SHUN;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_BAO) {
        // 后三-豹子
        return CMD_3203.emMultipleType.MT_SAN_HOU_BAO;
      }
      if (subType === CMD_3203.emSubBetTypeSanZhang.SBTS_DUI) {
        // 后三-对子
        return CMD_3203.emMultipleType.MT_SAN_HOU_DUI;
      }
      break;
    case CMD_3203.emBetMainType.BTM_NIU:
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_NUM) {
        // 斗牛-点数
        return CMD_3203.emMultipleType.MT_NIU_0 + number[0];
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_DA) {
        // 斗牛-大
        return CMD_3203.emMultipleType.MT_NIU_DA;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_XIAO) {
        // 斗牛-小
        return CMD_3203.emMultipleType.MT_NIU_XIAO;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_DAN) {
        // 斗牛-单
        return CMD_3203.emMultipleType.MT_NIU_DAN;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_SHUANG) {
        // 斗牛-双
        return CMD_3203.emMultipleType.MT_NIU_SHUANG;
      }

      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_GAO) {
        // 斗牛-高牌
        return CMD_3203.emMultipleType.MT_NIU_GAO;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_DUI_1) {
        // 斗牛-一对
        return CMD_3203.emMultipleType.MT_NIU_DUI_1;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_DUI_2) {
        // 斗牛-两对
        return CMD_3203.emMultipleType.MT_NIU_DUI_2;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_TIAO_3) {
        // 斗牛-三条
        return CMD_3203.emMultipleType.MT_NIU_TIAO_3;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_SHUN) {
        // 斗牛-顺子
        return CMD_3203.emMultipleType.MT_NIU_SHUN;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_TIAO_4) {
        // 斗牛-葫芦
        return CMD_3203.emMultipleType.MT_NIU_TIAO_4;
      }
      if (subType === CMD_3203.emSubBetTypeDouNiug.SBTN_TIAO_5) {
        // 斗牛-五条
        return CMD_3203.emMultipleType.MT_NIU_TIAO_5;
      }
      break;
    default:
      break;
  }
  return CMD_3203.emMultipleType.MT_INVALID;
}
