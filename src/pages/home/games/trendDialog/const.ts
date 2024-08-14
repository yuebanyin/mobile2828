import { CMD_2901 } from '@/engine/game/pc/2901/CMD_2901';
import { CMD_2902 } from '@/engine/game/pc/2902/CMD_2902';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { CMD_2905 } from '@/engine/game/pc/2905/CMD_2905';
import { CMD_3202 } from '@/engine/game/pc/3202/CMD_3202';
import { CMD_3501 } from '@/engine/game/pc/3501/CMD_3501';
// 表格的title 是公共的
export const ballType = [
  {
    title: '号码',
    key: 1,
  },
  {
    title: '大小',
    key: 2,
  },
  {
    title: '单双',
    key: 3,
  },
];

// 走势表格的表头每个游戏也有差距
export const tableTitles2901 = [
  {
    title: '期数',
    key: 1,
  },
  {
    title: '1球',
    key: 2,
    dx: CMD_2901.emResultPosType.RPT_D1_DX,
    ds: CMD_2901.emResultPosType.RPT_D1_DS,
  },
  {
    title: '2球',
    key: 3,
    dx: CMD_2901.emResultPosType.RPT_D2_DX,
    ds: CMD_2901.emResultPosType.RPT_D2_DS,
  },
  {
    title: '3球',
    key: 4,
    dx: CMD_2901.emResultPosType.RPT_D3_DX,
    ds: CMD_2901.emResultPosType.RPT_D3_DS,
  },
  {
    title: 'TE',
    key: 5,
    dx: CMD_2901.emResultPosType.RPT_T_DX,
    ds: CMD_2901.emResultPosType.RPT_T_DS,
  },
];

export const tableTitles2902 = [
  {
    title: '期数',
    key: 1,
  },
  {
    title: '一',
    key: 2,
    dx: CMD_2902.emResultPosType.RPT_R1_DX,
    ds: CMD_2902.emResultPosType.RPT_R1_DS,
  },
  {
    title: '二',
    key: 3,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 1,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 1,
  },
  {
    title: '三',
    key: 4,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 2,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 2,
  },
  {
    title: '四',
    key: 5,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 3,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 3,
  },
  {
    title: '五',
    key: 6,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 4,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 4,
  },
  {
    title: '六',
    key: 7,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 5,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 5,
  },
  {
    title: '七',
    key: 8,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 6,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 6,
  },
  {
    title: '八',
    key: 9,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 7,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 7,
  },
  {
    title: '九',
    key: 10,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 8,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 8,
  },
  {
    title: '十',
    key: 11,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 9,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 9,
  },
];

export const tableTitles2905 = [
  {
    title: '期数',
    key: 1,
  },
  {
    title: 'DING_1',
    key: 2,
    dx: CMD_2905.emResultPosType.RPT_D1_DX,
    ds: CMD_2905.emResultPosType.RPT_D1_DS,
  },
  {
    title: 'DING_2',
    key: 3,
    dx: CMD_2905.emResultPosType.RPT_D2_DX,
    ds: CMD_2905.emResultPosType.RPT_D2_DS,
  },
  {
    title: 'DING_3',
    key: 4,
    dx: CMD_2905.emResultPosType.RPT_D3_DX,
    ds: CMD_2905.emResultPosType.RPT_D3_DS,
  },
  {
    title: 'QIU_4',
    key: 5,
    dx: CMD_2905.emResultPosType.RPT_D4_DX,
    ds: CMD_2905.emResultPosType.RPT_D4_DS,
  },
  {
    title: 'QIU_5',
    key: 6,
    dx: CMD_2905.emResultPosType.RPT_D5_DX,
    ds: CMD_2905.emResultPosType.RPT_D5_DS,
  },
  {
    title: 'DOU_NIU',
    key: 7,
  },
];
export const tableTitles3202 = [
  {
    title: '期数',
    key: 1,
  },
  {
    title: 'DING_1',
    key: 2,
    dx: CMD_3202.emResultPosType.RPT_D1_DX,
    ds: CMD_3202.emResultPosType.RPT_D1_DS,
  },
  {
    title: 'DING_2',
    key: 3,
    dx: CMD_3202.emResultPosType.RPT_D2_DX,
    ds: CMD_3202.emResultPosType.RPT_D2_DS,
  },
  {
    title: 'DING_3',
    key: 4,
    dx: CMD_3202.emResultPosType.RPT_D3_DX,
    ds: CMD_3202.emResultPosType.RPT_D3_DS,
  },
  {
    title: 'QIU_4',
    key: 5,
    dx: CMD_3202.emResultPosType.RPT_D4_DX,
    ds: CMD_3202.emResultPosType.RPT_D4_DS,
  },
  {
    title: 'QIU_5',
    key: 6,
    dx: CMD_3202.emResultPosType.RPT_D5_DX,
    ds: CMD_3202.emResultPosType.RPT_D5_DS,
  },
];

// 露珠盘的title 每个游戏不太一样
export const ballTitle2901 = [
  {
    title: 'TE',
    key: 1,
    dx: CMD_2901.emResultPosType.RPT_T_DX,
    ds: CMD_2901.emResultPosType.RPT_T_DS,
  },
  {
    title: 'DING_1',
    key: 2,
    dx: CMD_2901.emResultPosType.RPT_D1_DX,
    ds: CMD_2901.emResultPosType.RPT_D1_DS,
  },
  {
    title: 'DING_2',
    key: 3,
    dx: CMD_2901.emResultPosType.RPT_D2_DX,
    ds: CMD_2901.emResultPosType.RPT_D2_DS,
  },
  {
    title: 'DING_3',
    key: 4,
    dx: CMD_2901.emResultPosType.RPT_D3_DX,
    ds: CMD_2901.emResultPosType.RPT_D3_DS,
  },
];

export const ballTitle2902 = [
  {
    title: 'NUMBER_1',
    key: 1,
    dx: CMD_2902.emResultPosType.RPT_R1_DX,
    ds: CMD_2902.emResultPosType.RPT_R1_DS,
  },
  {
    title: 'NUMBER_2',
    key: 2,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 1,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 1,
  },
  {
    title: 'NUMBER_3',
    key: 3,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 2,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 2,
  },
  {
    title: 'NUMBER_4',
    key: 4,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 3,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 3,
  },
  {
    title: 'NUMBER_5',
    key: 5,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 4,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 4,
  },
  {
    title: 'NUMBER_6',
    key: 6,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 5,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 5,
  },
  {
    title: 'NUMBER_7',
    key: 7,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 6,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 6,
  },
  {
    title: 'NUMBER_8',
    key: 8,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 7,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 7,
  },
  {
    title: 'NUMBER_9',
    key: 9,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 8,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 8,
  },
  {
    title: 'NUMBER_10',
    key: 10,
    dx: CMD_2902.emResultPosType.RPT_R1_DX + 9,
    ds: CMD_2902.emResultPosType.RPT_R1_DS + 9,
  },
];

export const ballTitle2903 = [
  {
    title: 'ZM_1',
    key: 2,
    dx: CMD_2903.emResultPosType.RPT_Z1_DX,
    ds: CMD_2903.emResultPosType.RPT_Z1_DS,
  },
  {
    title: 'ZM_2',
    key: 3,
    dx: CMD_2903.emResultPosType.RPT_Z2_DX,
    ds: CMD_2903.emResultPosType.RPT_Z2_DS,
  },
  {
    title: 'ZM_3',
    key: 4,
    dx: CMD_2903.emResultPosType.RPT_Z3_DX,
    ds: CMD_2903.emResultPosType.RPT_Z3_DS,
  },
  {
    title: 'ZM_4',
    key: 5,
    dx: CMD_2903.emResultPosType.RPT_Z4_DX,
    ds: CMD_2903.emResultPosType.RPT_Z4_DS,
  },
  {
    title: 'ZM_5',
    key: 6,
    dx: CMD_2903.emResultPosType.RPT_Z5_DX,
    ds: CMD_2903.emResultPosType.RPT_Z5_DS,
  },
  {
    title: 'ZM_6',
    key: 7,
    cls: 'flex-1-5',
    dx: CMD_2903.emResultPosType.RPT_Z6_DX,
    ds: CMD_2903.emResultPosType.RPT_Z6_DS,
  },
  {
    title: 'TE',
    key: 1,
    cls: 'flex-1-5',
    dx: CMD_2903.emResultPosType.RPT_T_DX,
    ds: CMD_2903.emResultPosType.RPT_T_DS,
  },
];

export const ballTitle2905 = [
  {
    title: 'DING_1',
    key: 1,
    dx: CMD_2905.emResultPosType.RPT_D1_DX,
    ds: CMD_2905.emResultPosType.RPT_D1_DS,
  },
  {
    title: 'DING_2',
    key: 2,
    dx: CMD_2905.emResultPosType.RPT_D2_DX,
    ds: CMD_2905.emResultPosType.RPT_D2_DS,
  },
  {
    title: 'DING_3',
    key: 3,
    dx: CMD_2905.emResultPosType.RPT_D3_DX,
    ds: CMD_2905.emResultPosType.RPT_D3_DS,
  },
  {
    title: 'QIU_4',
    key: 4,
    dx: CMD_2905.emResultPosType.RPT_D4_DX,
    ds: CMD_2905.emResultPosType.RPT_D4_DS,
  },
  {
    title: 'QIU_5',
    key: 5,
    dx: CMD_2905.emResultPosType.RPT_D5_DX,
    ds: CMD_2905.emResultPosType.RPT_D5_DS,
  },
  {
    title: 'DOU_NIU',
    key: 6,
    cls: 'flex-1-5',
    dx: CMD_2905.emResultPosType.RPT_NIU_DX,
    ds: CMD_2905.emResultPosType.RPT_NIU_DS,
  },
];
export const ballTitle3501 = [
  {
    title: 'SUM',
    key: 1,
    dx: CMD_3501.emResultPosType.RPT_H_DX,
    ds: CMD_3501.emResultPosType.RPT_H_DS,
  },
];

export const changlong = [
  {
    title: '长龙排行',
    key: 1,
  },
  {
    title: '最近交易',
    key: 2,
  },
];

export const ballAssetList = [
  {
    one: 'DAN',
    two: 'SHUANG',
    key: 1,
    oneKey: 'fst',
    twoKey: 'sec',
  },
  {
    one: 'DA',
    two: 'XIAO',
    key: 2,
    oneKey: 'thr',
    twoKey: 'fr',
  },
];

/**
 * @param gameId 游戏id
 * @param posIndex 结果对应的数组下标
 * @returns 前缀
 */
export const gameBetName = (gameId, posIndex) => {
  let preFix = '';
  if ([2901, 2801, 2802, 2803, 2804].includes(gameId)) {
    switch (posIndex) {
      case CMD_2901.emResultPosType.RPT_T_DX:
      case CMD_2901.emResultPosType.RPT_T_DS:
      case CMD_2901.emResultPosType.RPT_T_JIZHI:
      case CMD_2901.emResultPosType.RPT_T_BO:
      case CMD_2901.emResultPosType.RPT_T_PAIXING:
      case CMD_2901.emResultPosType.RPT_T_LHH:
        preFix = 'TE';
        break;
      case CMD_2901.emResultPosType.RPT_D1_DX:
      case CMD_2901.emResultPosType.RPT_D1_DS:
        preFix = 'DING_1';
        break;
      case CMD_2901.emResultPosType.RPT_D2_DX:
      case CMD_2901.emResultPosType.RPT_D2_DS:
        preFix = 'DING_2';
        break;
      case CMD_2901.emResultPosType.RPT_D3_DX:
      case CMD_2901.emResultPosType.RPT_D3_DS:
        preFix = 'DING_3';
        break;
      default:
        break;
    }
  } else if (gameId === 2902 || gameId === 2904 || gameId === 3102) {
    switch (posIndex) {
      case CMD_2902.emResultPosType.RPT_R1_DX:
      case CMD_2902.emResultPosType.RPT_R1_DS:
      case CMD_2902.emResultPosType.RPT_R1_LH:
        preFix = 'NUMBER_1';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 1:
      case CMD_2902.emResultPosType.RPT_R1_DS + 1:
      case CMD_2902.emResultPosType.RPT_R1_LH + 1:
        preFix = 'NUMBER_2';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 2:
      case CMD_2902.emResultPosType.RPT_R1_DS + 2:
      case CMD_2902.emResultPosType.RPT_R1_LH + 2:
        preFix = 'NUMBER_3';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 3:
      case CMD_2902.emResultPosType.RPT_R1_DS + 3:
      case CMD_2902.emResultPosType.RPT_R1_LH + 3:
        preFix = 'NUMBER_4';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 4:
      case CMD_2902.emResultPosType.RPT_R1_DS + 4:
      case CMD_2902.emResultPosType.RPT_R5_LH:
        preFix = 'NUMBER_5';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 5:
      case CMD_2902.emResultPosType.RPT_R1_DS + 5:
        preFix = 'NUMBER_6';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 6:
      case CMD_2902.emResultPosType.RPT_R1_DS + 6:
        preFix = 'NUMBER_7';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 7:
      case CMD_2902.emResultPosType.RPT_R1_DS + 7:
        preFix = 'NUMBER_8';
        break;
      case CMD_2902.emResultPosType.RPT_R1_DX + 8:
      case CMD_2902.emResultPosType.RPT_R1_DS + 8:
        preFix = 'NUMBER_9';
        break;
      case CMD_2902.emResultPosType.RPT_R10_DX:
      case CMD_2902.emResultPosType.RPT_R10_DS:
        preFix = 'NUMBER_10';
        break;
      case CMD_2902.emResultPosType.RPT_SUM_DX:
      case CMD_2902.emResultPosType.RPT_SUM_DS:
        preFix = 'NUMBER_1_2_HE';
        break;
      default:
        break;
    }
  } else if (gameId === 2903 || gameId === 3402) {
    switch (posIndex) {
      case CMD_2903.emResultPosType.RPT_T_DX:
      case CMD_2903.emResultPosType.RPT_T_DS:
      case CMD_2903.emResultPosType.RPT_T_XIAO:
      case CMD_2903.emResultPosType.RPT_T_BO:
        preFix = 'TE';
        break;
      case CMD_2903.emResultPosType.RPT_Z1_DX:
      case CMD_2903.emResultPosType.RPT_Z1_DS:
      case CMD_2903.emResultPosType.RPT_Z1_BO:
      case CMD_2903.emResultPosType.RPT_Z1_XIAO:
        preFix = 'ZM_1';
        break;
      case CMD_2903.emResultPosType.RPT_Z2_DX:
      case CMD_2903.emResultPosType.RPT_Z2_DS:
      case CMD_2903.emResultPosType.RPT_Z2_BO:
      case CMD_2903.emResultPosType.RPT_Z2_XIAO:
        preFix = 'ZM_2';
        break;
      case CMD_2903.emResultPosType.RPT_Z3_DX:
      case CMD_2903.emResultPosType.RPT_Z3_DS:
      case CMD_2903.emResultPosType.RPT_Z3_BO:
      case CMD_2903.emResultPosType.RPT_Z3_XIAO:
        preFix = 'ZM_3';
        break;
      case CMD_2903.emResultPosType.RPT_Z4_DX:
      case CMD_2903.emResultPosType.RPT_Z4_DS:
      case CMD_2903.emResultPosType.RPT_Z4_BO:
      case CMD_2903.emResultPosType.RPT_Z4_XIAO:
        preFix = 'ZM_4';
        break;
      case CMD_2903.emResultPosType.RPT_Z5_DX:
      case CMD_2903.emResultPosType.RPT_Z5_DS:
      case CMD_2903.emResultPosType.RPT_Z5_BO:
      case CMD_2903.emResultPosType.RPT_Z5_XIAO:
        preFix = 'ZM_5';
        break;
      case CMD_2903.emResultPosType.RPT_Z6_DX:
      case CMD_2903.emResultPosType.RPT_Z6_DS:
      case CMD_2903.emResultPosType.RPT_Z6_BO:
      case CMD_2903.emResultPosType.RPT_Z6_XIAO:
        preFix = 'ZM_6';
        break;
      case CMD_2903.emResultPosType.RPT_HE_DX:
      case CMD_2903.emResultPosType.RPT_HE_DS:
        preFix = 'SUM';
        break;
      default:
        break;
    }
  } else if (gameId === 2905 || gameId === 3202 || gameId === 3203) {
    switch (posIndex) {
      case CMD_2905.emResultPosType.RPT_NIU_DIAN:
      case CMD_2905.emResultPosType.RPT_NIU_DX:
      case CMD_2905.emResultPosType.RPT_NIU_DS:
      case CMD_2905.emResultPosType.RPT_NIU_SH:
        preFix = 'DOU_NIU';
        break;
      case CMD_2905.emResultPosType.RPT_SAN_QIAN:
        preFix = 'QIANSAN';
        break;
      case CMD_2905.emResultPosType.RPT_SAN_ZHONG:
        preFix = 'ZHOGN_SAN';
        break;
      case CMD_2905.emResultPosType.RPT_SAN_HOU:
        preFix = 'HOUSAN';
        break;
      case CMD_2905.emResultPosType.RPT_HE_DX:
      case CMD_2905.emResultPosType.RPT_HE_DS:
      case CMD_2905.emResultPosType.RPT_HE_LHH:
        preFix = 'SUM';
        break;
      case CMD_2905.emResultPosType.RPT_D1_DX:
      case CMD_2905.emResultPosType.RPT_D1_DS:
        preFix = 'DING_1';
        break;
      case CMD_2905.emResultPosType.RPT_D2_DX:
      case CMD_2905.emResultPosType.RPT_D2_DS:
        preFix = 'DING_2';
        break;
      case CMD_2905.emResultPosType.RPT_D3_DX:
      case CMD_2905.emResultPosType.RPT_D3_DS:
        preFix = 'DING_3';
        break;
      case CMD_2905.emResultPosType.RPT_D4_DX:
      case CMD_2905.emResultPosType.RPT_D4_DS:
        preFix = 'QIU_4';
        break;
      case CMD_2905.emResultPosType.RPT_D5_DX:
      case CMD_2905.emResultPosType.RPT_D5_DS:
        preFix = 'QIU_5';
        break;
      default:
        break;
    }
  }
  return preFix;
};

/**
 * @param data 历史开奖记录
 * @returns 处理后的长龙数据
 */
export const handleClData = (data) => {
  let cldMap: Map<number, any>;
  const arr = [];
  try {
    // 循环数据找出长龙排行
    for (let i = 0, len = data.length; i < len; i += 1) {
      // 外层循环 data
      const itemData = data[i]?.cbResultType || [];
      for (let j = 0, jlen = itemData.length; j < jlen; j += 1) {
        const v = itemData[j].value;
        // 内层循环 cbResultType 结果类型
        if (i === 0) {
          if (!cldMap) {
            cldMap = new Map();
            cldMap.set(-1, 0);
          }
          cldMap.set(j, {
            v,
            len: 1,
            flag: false,
            i: j,
          });
        } else {
          const cldo = cldMap && cldMap.get(j);
          if (!cldo || cldo?.flag) {
            // 已经断层
            continue;
          } else if (cldo.v === v) {
            // 如果保存的v和当前的v相等就len+1
            cldMap.set(j, {
              v,
              len: cldo.len + 1,
              flag: false,
              i: j,
            });
          } else {
            if (cldo.len > 1) {
              cldMap.set(j, {
                v: cldo.v,
                len: cldo.len,
                flag: true,
                i: j,
              });
            } else {
              // 删除
              cldMap.delete(j);
            }
            cldMap.set(-1, cldMap.get(-1) + 1);
            if (cldMap.get(-1) === jlen) {
              i = len;
            }
          }
        }
      }
    }

    if (cldMap && cldMap.size > 1) {
      cldMap.forEach((it) => {
        if (it?.len > 1) {
          arr.push(it);
        }
      });
    }
  } catch (error) {
    console.info(error);
  }
  return arr.sort((pre, cur) => cur.len - pre.len);
};
