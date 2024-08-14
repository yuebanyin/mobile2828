/* eslint-disable object-curly-newline */
import { CreateObject, DWORD } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { CMD_3102 } from '@/engine/game/pc/3102/CMD_3102';

export interface ButtonDataType {
  name: string;
  mainType?: number;
  subType?: number;
  number?: number[];
  oddsKey?: number;
  children?: ButtonDataType[];
  key?: string | number;
}

export interface ContentProps {
  gameMultiple?: DWORD[]; // 赔率信息
  dyMultiple?: common.tagDynamicMultiple[]; // 动态赔率信息
  // eslint-disable-next-line no-unused-vars
  onChange?: (types: ButtonDataType[]) => void;
  // eslint-disable-next-line no-unused-vars
  onChangLongChange?: (...args: any) => void;
  gameWs?: any;
  ik: number;
  curGameId: number;
  curPeriodNumber: string;
  getItememMultip: Function;
  handleBetClick: Function;
  onClear: Function;
  clRef?: any;
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

export const szpButton: ButtonDataType[] = [
  {
    name: '冠军',
    key: 1,
    mainType: CMD_3102.emBetMainType.BTM_RANK_1,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_1;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK1_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0a-${i}` };
    }),
  },
  {
    name: '亚军',
    key: 2,
    mainType: CMD_3102.emBetMainType.BTM_RANK_2,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_2;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK2_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0b-${i}` };
    }),
  },
  {
    name: '第三名',
    key: 3,
    mainType: CMD_3102.emBetMainType.BTM_RANK_3,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_3;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK3_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0c-${i}` };
    }),
  },
  {
    name: '第四名',
    key: 4,
    mainType: CMD_3102.emBetMainType.BTM_RANK_4,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_4;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK4_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0d-${i}` };
    }),
  },
  {
    name: '第五名',
    key: 5,
    mainType: CMD_3102.emBetMainType.BTM_RANK_5,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_5;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK5_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0e-${i}` };
    }),
  },
  {
    name: '第六名',
    key: 6,
    mainType: CMD_3102.emBetMainType.BTM_RANK_6,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_6;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK6_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0f-${i}` };
    }),
  },
  {
    name: '第七名',
    key: 7,
    mainType: CMD_3102.emBetMainType.BTM_RANK_7,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_7;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK7_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0g-${i}` };
    }),
  },
  {
    name: '第八名',
    key: 8,
    mainType: CMD_3102.emBetMainType.BTM_RANK_8,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_8;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK8_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0h-${i}` };
    }),
  },
  {
    name: '第九名',
    key: 9,
    mainType: CMD_3102.emBetMainType.BTM_RANK_9,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_9;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK9_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0i-${i}` };
    }),
  },
  {
    name: '第十名',
    key: 10,
    mainType: CMD_3102.emBetMainType.BTM_RANK_10,
    children: [...new Array(10).keys()].map((r, i) => {
      const mainType = CMD_3102.emBetMainType.BTM_RANK_10;
      const subType = CMD_3102.emBetTypeRank.SBTR_NUM;
      const number = [r + 1];
      const oddsKey = CMD_3102.emMultipleType.MT_RANK10_1 + r;
      return { name: `${r + 1}`, mainType, subType, number, oddsKey, key: `0j-${i}` };
    }),
  },
];

export const lmButton: ButtonDataType[] = [
  {
    name: '冠亚军和',
    key: 11,
    mainType: CMD_3102.emBetMainType.BTM_SUM,
    children: [
      { name: '冠亚大', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_DA, oddsKey: CMD_3102.emMultipleType.MT_SUM_DA, key: '0k-1' },
      { name: '冠亚小', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_XIAO, oddsKey: CMD_3102.emMultipleType.MT_SUM_XIAO, key: '0k-2' },
      { name: '冠亚单', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_DAN, oddsKey: CMD_3102.emMultipleType.MT_SUM_DAN, key: '0k-3' },
      { name: '冠亚双', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_SUM_SHUANG, key: '0k-4' },
    ],
  },
  {
    name: '冠军',
    key: 12,
    mainType: CMD_3102.emBetMainType.BTM_RANK_1,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0l-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0l-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0l-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0l-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0l-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0l-6' },
    ],
  },
  {
    name: '亚军',
    key: 13,
    mainType: CMD_3102.emBetMainType.BTM_RANK_2,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0m-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0m-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0m-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0m-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0m-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0m-6' },
    ],
  },
  {
    name: '第三名',
    key: 14,
    mainType: CMD_3102.emBetMainType.BTM_RANK_3,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0n-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0n-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0n-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0n-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0n-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0n-6' },
    ],
  },
  {
    name: '第四名',
    key: 15,
    mainType: CMD_3102.emBetMainType.BTM_RANK_4,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0o-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0o-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0o-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0o-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0o-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0o-6' },
    ],
  },
  {
    name: '第五名',
    key: 16,
    mainType: CMD_3102.emBetMainType.BTM_RANK_5,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0p-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0p-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0p-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0p-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0p-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0p-6' },
    ],
  },
  {
    name: '第六名',
    key: 17,
    mainType: CMD_3102.emBetMainType.BTM_RANK_6,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0q-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0q-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0q-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0q-4' },
    ],
  },
  {
    name: '第七名',
    key: 18,
    mainType: CMD_3102.emBetMainType.BTM_RANK_7,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0r-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0r-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0r-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0r-4' },
    ],
  },
  {
    name: '第八名',
    key: 19,
    mainType: CMD_3102.emBetMainType.BTM_RANK_8,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0s-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0s-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0s-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0s-4' },
    ],
  },
  {
    name: '第九名',
    key: 20,
    mainType: CMD_3102.emBetMainType.BTM_RANK_9,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0t-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0t-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0t-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0t-4' },
    ],
  },
  {
    name: '第十名',
    key: 21,
    mainType: CMD_3102.emBetMainType.BTM_RANK_10,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0u-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0u-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0u-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0u-4' },
    ],
  },
];

export const gyhButton: ButtonDataType[] = [
  {
    name: '冠亚军和',
    key: 22,
    mainType: CMD_3102.emBetMainType.BTM_SUM,
    children: [
      { name: '冠亚大', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_DA, oddsKey: CMD_3102.emMultipleType.MT_SUM_DA, key: '0v-1' },
      { name: '冠亚小', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_XIAO, oddsKey: CMD_3102.emMultipleType.MT_SUM_XIAO, key: '0v-2' },
      { name: '冠亚单', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_DAN, oddsKey: CMD_3102.emMultipleType.MT_SUM_DAN, key: '0v-3' },
      { name: '冠亚双', mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_SUM_SHUANG, key: '0v-4' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3, key: '0v-5' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 1, key: '0v-6' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 2, key: '0v-7' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 3, key: '0v-8' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 4, key: '0v-9' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 5, key: '0v-10' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 6, key: '0v-11' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 7, key: '0v-12' },
      { name: '11', number: [11], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 8, key: '0v-13' },
      { name: '12', number: [12], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 9, key: '0v-14' },
      { name: '13', number: [13], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 10, key: '0v-15' },
      { name: '14', number: [14], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 11, key: '0v-16' },
      { name: '15', number: [15], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 12, key: '0v-17' },
      { name: '16', number: [16], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 13, key: '0v-18' },
      { name: '17', number: [17], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 14, key: '0v-19' },
      { name: '18', number: [18], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_3 + 15, key: '0v-20' },
      { name: '19', number: [19], mainType: CMD_3102.emBetMainType.BTM_SUM, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_SUM_19, key: '0v-21' },
    ],
  },
  {
    name: '冠军',
    key: 23,
    mainType: CMD_3102.emBetMainType.BTM_RANK_1,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0w-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0w-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0w-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0w-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0w-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0w-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1, key: '0w-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 1, key: '0w-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 2, key: '0w-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 3, key: '0w-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 4, key: '0w-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 5, key: '0w-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 6, key: '0w-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 7, key: '0w-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 8, key: '0w-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 9, key: '0w-16' },
    ],
  },
  {
    name: '亚军',
    key: 24,
    mainType: CMD_3102.emBetMainType.BTM_RANK_2,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0x-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0x-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0x-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0x-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0x-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0x-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1, key: '0x-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 1, key: '0x-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 2, key: '0x-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 3, key: '0x-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 4, key: '0x-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 5, key: '0x-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 6, key: '0x-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 7, key: '0x-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 8, key: '0x-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 9, key: '0x-16' },
    ],
  },
];

export const gyzhButtom: ButtonDataType[] = [
  {
    name: '冠亚组合',
    key: 25,
    mainType: CMD_3102.emBetMainType.BTM_COM,
    children: [...new Array(10).keys()]
      .map((r1, j) => {
        const arr = [...new Array(9 - r1).keys()];
        return arr.map((r2, i) => {
          const name = `${r1 + 1}-${r2 + 1 + r1 + 1}`;
          const mainType = CMD_3102.emBetMainType.BTM_COM;
          const subType = CMD_3102.emBetTypeCom.SBTC_NUM;
          const oddsKey = CMD_3102.emMultipleType.MT_COM_ALL;
          const number = [r1 + 1, r2 + 1 + r1 + 1];
          return { name, mainType, subType, number, oddsKey, key: `0y-${i}-${j}` };
        });
      })
      .flat(),
  },
];

export const d1to5Button: ButtonDataType[] = [
  {
    name: '冠军',
    key: 26,
    mainType: CMD_3102.emBetMainType.BTM_RANK_1,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '0z-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '0z-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '0z-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '0z-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '0z-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '0z-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1, key: '0z-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 1, key: '0z-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 2, key: '0z-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 3, key: '0z-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 4, key: '0z-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 5, key: '0z-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 6, key: '0z-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 7, key: '0z-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 8, key: '0z-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_1, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK1_1 + 9, key: '0z-16' },
    ],
  },
  {
    name: '亚军',
    key: 27,
    mainType: CMD_3102.emBetMainType.BTM_RANK_2,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1a-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1a-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1a-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1a-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '1a-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '1a-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1, key: '1a-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 1, key: '1a-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 2, key: '1a-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 3, key: '1a-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 4, key: '1a-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 5, key: '1a-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 6, key: '1a-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 7, key: '1a-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 8, key: '1a-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_2, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK2_1 + 9, key: '1a-16' },
    ],
  },
  {
    name: '第三名',
    key: 28,
    mainType: CMD_3102.emBetMainType.BTM_RANK_3,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1b-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1b-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1b-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1b-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '1b-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '1b-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1, key: '1b-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 1, key: '1b-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 2, key: '1b-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 3, key: '1b-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 4, key: '1b-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 5, key: '1b-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 6, key: '1b-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 7, key: '1b-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 8, key: '1b-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_3, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK3_1 + 9, key: '1b-16' },
    ],
  },
  {
    name: '第四名',
    key: 29,
    mainType: CMD_3102.emBetMainType.BTM_RANK_4,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1c-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1c-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1c-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1c-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '1c-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '1c-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1, key: '1c-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 1, key: '1c-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 2, key: '1c-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 3, key: '1c-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 4, key: '1c-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 5, key: '1c-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 6, key: '1c-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 7, key: '1c-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 8, key: '1c-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_4, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK4_1 + 9, key: '1c-16' },
    ],
  },
  {
    name: '第五名',
    key: 30,
    mainType: CMD_3102.emBetMainType.BTM_RANK_5,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1d-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1d-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1d-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1d-4' },
      { name: '龙', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_LONG, oddsKey: CMD_3102.emMultipleType.MT_RANK_LONG, key: '1d-5' },
      { name: '虎', mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeRank.SBTR_HU, oddsKey: CMD_3102.emMultipleType.MT_RANK_HU, key: '1d-6' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1, key: '1d-7' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 1, key: '1d-8' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 2, key: '1d-9' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 3, key: '1d-10' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 4, key: '1d-11' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 5, key: '1d-12' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 6, key: '1d-13' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 7, key: '1d-14' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 8, key: '1d-15' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_5, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_1 + 9, key: '1d-16' },
    ],
  },
];

export const d6to10Button: ButtonDataType[] = [
  {
    name: '第六名',
    key: 31,
    mainType: CMD_3102.emBetMainType.BTM_RANK_6,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1e-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1e-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1e-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1e-4' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1, key: '1e-5' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 1, key: '1e-6' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 2, key: '1e-7' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 3, key: '1e-8' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 4, key: '1e-9' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 5, key: '1e-10' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 6, key: '1e-11' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 7, key: '1e-12' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 8, key: '1e-13' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_6, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK6_1 + 9, key: '1e-14' },
    ],
  },
  {
    name: '第七名',
    key: 32,
    mainType: CMD_3102.emBetMainType.BTM_RANK_7,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1f-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1f-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1f-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1f-4' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1, key: '1f-5' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 1, key: '1f-6' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 2, key: '1f-7' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 3, key: '1f-8' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 4, key: '1f-9' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 5, key: '1f-10' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 6, key: '1f-11' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 7, key: '1f-12' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 8, key: '1f-13' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_7, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK7_1 + 9, key: '1f-14' },
    ],
  },
  {
    name: '第八名',
    key: 33,
    mainType: CMD_3102.emBetMainType.BTM_RANK_8,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1g-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1g-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1g-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1g-4' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1, key: '1g-5' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 1, key: '1g-6' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 2, key: '1g-7' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 3, key: '1g-8' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 4, key: '1g-9' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 5, key: '1g-10' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 6, key: '1g-11' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 7, key: '1g-12' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 8, key: '1g-13' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_8, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK8_1 + 9, key: '1g-14' },
    ],
  },
  {
    name: '第九名',
    key: 34,
    mainType: CMD_3102.emBetMainType.BTM_RANK_9,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1h-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1h-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1h-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1h-4' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1, key: '1h-5' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 1, key: '1h-6' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 2, key: '1h-7' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 3, key: '1h-8' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 4, key: '1h-9' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 5, key: '1h-10' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 6, key: '1h-11' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 7, key: '1h-12' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 8, key: '1h-13' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_9, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK9_1 + 9, key: '1h-14' },
    ],
  },
  {
    name: '第十名',
    key: 35,
    mainType: CMD_3102.emBetMainType.BTM_RANK_10,
    children: [
      { name: '大', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_DA, oddsKey: CMD_3102.emMultipleType.MT_RANK_DA, key: '1i-1' },
      { name: '小', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_XIAO, oddsKey: CMD_3102.emMultipleType.MT_RANK_XIAO, key: '1i-2' },
      { name: '单', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_DAN, oddsKey: CMD_3102.emMultipleType.MT_RANK_DAN, key: '1i-3' },
      { name: '双', mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeRank.SBTR_SHUANG, oddsKey: CMD_3102.emMultipleType.MT_RANK_SHUANG, key: '1i-4' },
      { name: '1', number: [1], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1, key: '1i-5' },
      { name: '2', number: [2], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 1, key: '1i-6' },
      { name: '3', number: [3], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 2, key: '1i-7' },
      { name: '4', number: [4], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 3, key: '1i-8' },
      { name: '5', number: [5], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 4, key: '1i-9' },
      { name: '6', number: [6], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 5, key: '1i-10' },
      { name: '7', number: [7], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 6, key: '1i-11' },
      { name: '8', number: [8], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 7, key: '1i-12' },
      { name: '9', number: [9], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK10_1 + 8, key: '1i-13' },
      { name: '10', number: [10], mainType: CMD_3102.emBetMainType.BTM_RANK_10, subType: CMD_3102.emBetTypeSum.SBTS_NUM, oddsKey: CMD_3102.emMultipleType.MT_RANK5_10 + 9, key: '1i-14' },
    ],
  },
];

export function getOddsKey(mainType: number, subType: number, number: number[]): number {
  switch (mainType) {
    case CMD_3102.emBetMainType.BTM_RANK_1:
    case CMD_3102.emBetMainType.BTM_RANK_2:
    case CMD_3102.emBetMainType.BTM_RANK_3:
    case CMD_3102.emBetMainType.BTM_RANK_4:
    case CMD_3102.emBetMainType.BTM_RANK_5:
    case CMD_3102.emBetMainType.BTM_RANK_6:
    case CMD_3102.emBetMainType.BTM_RANK_7:
    case CMD_3102.emBetMainType.BTM_RANK_8:
    case CMD_3102.emBetMainType.BTM_RANK_9:
    case CMD_3102.emBetMainType.BTM_RANK_10:
      if (subType === CMD_3102.emBetTypeRank.SBTR_NUM) {
        // 冠军-第10名的投注数字
        return number[0] - 1 + mainType * 10;
      }
      if (subType === CMD_3102.emBetTypeRank.SBTR_DA) {
        // 冠军-第10名的投注大
        return CMD_3102.emMultipleType.MT_RANK_DA;
      }
      if (subType === CMD_3102.emBetTypeRank.SBTR_XIAO) {
        // 冠军-第10名的投注小
        return CMD_3102.emMultipleType.MT_RANK_XIAO;
      }
      if (subType === CMD_3102.emBetTypeRank.SBTR_DAN) {
        // 冠军-第10名的投注单
        return CMD_3102.emMultipleType.MT_RANK_DAN;
      }
      if (subType === CMD_3102.emBetTypeRank.SBTR_SHUANG) {
        // 冠军-第10名的投注双
        return CMD_3102.emMultipleType.MT_RANK_SHUANG;
      }
      if (subType === CMD_3102.emBetTypeRank.SBTR_LONG) {
        // 冠军-第10名的投注龙
        return CMD_3102.emMultipleType.MT_RANK_LONG;
      }
      if (subType === CMD_3102.emBetTypeRank.SBTR_HU) {
        // 冠军-第10名的投注虎
        return CMD_3102.emMultipleType.MT_RANK_HU;
      }
      break;
    case CMD_3102.emBetMainType.BTM_SUM:
      if (subType === CMD_3102.emBetTypeSum.SBTS_NUM) {
        // 冠军和的投注数字
        return CMD_3102.emMultipleType.MT_SUM_3 + number[0] - 3;
      }
      if (subType === CMD_3102.emBetTypeSum.SBTS_DA) {
        // 冠军和的投注大
        return CMD_3102.emMultipleType.MT_SUM_DA;
      }
      if (subType === CMD_3102.emBetTypeSum.SBTS_XIAO) {
        // 冠军和的投注小
        return CMD_3102.emMultipleType.MT_SUM_XIAO;
      }
      if (subType === CMD_3102.emBetTypeSum.SBTS_DAN) {
        // 冠军和的投注单
        return CMD_3102.emMultipleType.MT_SUM_DAN;
      }
      if (subType === CMD_3102.emBetTypeSum.SBTS_SHUANG) {
        // 冠军和的投注双
        return CMD_3102.emMultipleType.MT_SUM_SHUANG;
      }
      break;
    case CMD_3102.emBetMainType.BTM_COM:
      if (subType === CMD_3102.emBetTypeCom.SBTC_NUM) {
        // 冠军和的投注组合数字
        return CMD_3102.emMultipleType.MT_COM_ALL;
      }
      break;
    default:
      break;
  }
  return CMD_3102.emMultipleType.MT_INVALID;
}
