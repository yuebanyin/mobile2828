import { CMD_2904 } from '@/engine/game/pc/2904/CMD_2904';

// 所有Rank的按钮
// 注意后五球是没有龙虎按钮的
export const mainTypeAllRank = [
  'NUMBER_1',
  'NUMBER_2',
  'NUMBER_3',
  'NUMBER_4',
  'NUMBER_5',
  'NUMBER_6',
  'NUMBER_7',
  'NUMBER_8',
  'NUMBER_9',
  'NUMBER_10',
].map((title, k) => {
  const listOther = ['DA', 'XIAO', 'DAN', 'SHUANG', 'LONG', 'HU']
    .map((text, i) => ({
      text,
      mutil: CMD_2904.emMultipleType[CMD_2904.emMultipleType.MT_RANK_DA + i],
      key: `${title}-${text}`,
      mainType: CMD_2904.emBetMainType[k],
      subTypeName: CMD_2904.emBetSubTypeNames[0],
      subMainType: CMD_2904.emBetTypeRank[CMD_2904.emBetTypeRank.SBTR_DA + i],
    }))
    .filter(
      (r) =>
        !(
          ['LONG', 'HU'].includes(r.text) &&
          [
            'NUMBER_6',
            'NUMBER_7',
            'NUMBER_8',
            'NUMBER_9',
            'NUMBER_10',
          ].includes(title)
        )
    );
  const listNumber = [...new Array(10).keys()].map((i) => ({
    text: `${i + 1}`,
    mutil: CMD_2904.emMultipleType[k * 10 + 1],
    key: `${title}-${i + 1}`,
    mainType: CMD_2904.emBetMainType[k],
    subTypeName: CMD_2904.emBetSubTypeNames[0],
    subMainType: CMD_2904.emBetTypeRank[CMD_2904.emBetTypeRank.SBTR_NUM],
    type: 'majia',
  }));
  return { key: `${k + 1}`, title, list: [...listOther, ...listNumber] };
});

// 冠亚和的按钮
export const mainTypeSumList = {
  key: `${CMD_2904.emBetMainType.BTM_COUNT}`,
  title: 'NUMBER_1_2_HE',
  list: [
    ...['DA', 'XIAO', 'DAN', 'SHUANG'].map((r, index) => {
      console.log('🚀 ~ file: const2904.ts:38 ~ .map ~ r:', r);
      return {
        text: `GUAN_YA&${r}`,
        mutil:
          CMD_2904.emMultipleType[CMD_2904.emMultipleType.MT_SUM_DA + index],
        key: `冠亚-${r}`,
        mainType: CMD_2904.emBetMainType[CMD_2904.emBetMainType.BTM_SUM],
        subTypeName: CMD_2904.emBetSubTypeNames[1],
        subMainType:
          CMD_2904.emBetTypeSum[CMD_2904.emBetTypeSum.SBTS_DA + index],
      };
    }),
    ...[...new Array(17).keys()].map((i) => {
      console.log('🚀 ~ file: const2904.ts:38 ~ .map ~ i:', i);
      return {
        text: `${i + 3}`,
        mutil: CMD_2904.emMultipleType[CMD_2904.emMultipleType.MT_SUM_3 + i],
        key: `冠亚和-${i + 3}`,
        mainType: CMD_2904.emBetMainType[CMD_2904.emBetMainType.BTM_SUM],
        subTypeName: CMD_2904.emBetSubTypeNames[1],
        subMainType: CMD_2904.emBetTypeSum[CMD_2904.emBetTypeSum.SBTS_NUM],
        cls: i === 16 ? 'w-full' : '',
      };
    }),
  ],
};

// ###################################################内容区
// 两面
export const dualityTab = [
  {
    ...mainTypeSumList,
    title: 'GUAN_YA_HE',
    list: mainTypeSumList.list.filter(
      (r) =>
        r.subMainType !== CMD_2904.emBetTypeSum[CMD_2904.emBetTypeSum.SBTS_NUM]
    ),
  },
  ...mainTypeAllRank.map((r) => ({
    ...r,
    list: r.list.filter(
      (r) =>
        r.subMainType !==
        CMD_2904.emBetTypeRank[CMD_2904.emBetTypeRank.SBTR_NUM]
    ),
  })),
];
// 1-10
export const d1_10Tab = [
  ...mainTypeAllRank.map((r) => ({
    ...r,
    list: r.list.filter(
      (r) =>
        r.subMainType ===
        CMD_2904.emBetTypeRank[CMD_2904.emBetTypeRank.SBTR_NUM]
    ),
  })),
];
// 冠亚和
export const sumTab = [mainTypeSumList];
// 快捷
export const quickTab = mainTypeAllRank.map((r) => ({
  ...r,
  list: r.list.filter(
    (r) =>
      ![
        CMD_2904.emBetTypeRank[CMD_2904.emBetTypeRank.SBTR_LONG],
        CMD_2904.emBetTypeRank[CMD_2904.emBetTypeRank.SBTR_HU],
      ].includes(r.subMainType)
  ),
}));

