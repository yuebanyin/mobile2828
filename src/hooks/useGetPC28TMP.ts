// import { useMemo } from 'react';
// import { isArray } from '@/utils/tools';
// import { Obj } from '@/constants';
// import { common } from '@/engine/cmd/common/CMD_COMMON';
// import { GameMgr } from '@/engine/mgr/mgr';
// import { CreateArray, CreateObject, DWORD } from '@/engine/base/basetype';
// import { useGameConfigStore } from '@/mobx';

// interface Props {
//   TMP: common.tagDynamicMultiple[];
//   dwMultiple: any[];
//   curGameId: number;
// }

// export const useGetPC28TMP = ({ TMP, dwMultiple, curGameId }: Props) => {
//   const { initOdds, trendsMultiple, isTDMFinish } = useGameConfigStore();

//   console.log({ initOdds, trendsMultiple, isTDMFinish });

//   // 处理动态赔率可能会有多个的场景
//   const gets = (o: Obj, id: number, v: string) => {
//     let s;
//     if (isArray(o?.s)) {
//       if (o.s.find((it) => it.id === id)) {
//         s = [{ v, id }];
//       } else {
//         s = [...o.s, { v, id }];
//       }
//     } else {
//       s = [{ v, id }];
//     }
//     return {
//       ...o,
//       s,
//     };
//   };

//   // 动态赔率的映射
//   const multipleObj = useMemo(() => {
//     // TMP: 动态赔率 数组
//     const trendsMultiple = TMP ? [...TMP] : [];

//     if (dwMultiple.length > 0) {
//       // 获得相应游戏的赔率信息
//       const emmultipObj = GameMgr.GetGameConfigInfo(curGameId, 'emMultipleType');
//       // 克隆 赔率数组
//       const newDwMultiple = CreateArray(DWORD, [emmultipObj?.MT_COUNT]);
//       for (let i = 0, len = dwMultiple.length; i < len; i += 1) {
//         newDwMultiple[i] = CreateObject(DWORD);
//         newDwMultiple[i].value = dwMultiple[i].value;
//       }
//       const tMapMul: Obj = {};
//       const nameMapMul: Obj = {};
//       const len = trendsMultiple?.length || 0;

//       for (let i = 0; i < len; i += 1) {
//         const tagDynamicMultipleItem: common.tagDynamicMultiple = trendsMultiple[i];
//         const curName = GameMgr.GetBetRecordDesc(
//           curGameId,
//           tagDynamicMultipleItem?.AreaInfo?.cbBetMainType?.value,
//           tagDynamicMultipleItem?.AreaInfo?.cbBetSubType?.value,
//           tagDynamicMultipleItem?.AreaInfo?.cbNumber
//         );
//         console.log('peilvvvvvvvvvvvvvvv', curGameId, curName, tagDynamicMultipleItem, TMP);
//         if (GameMgr.IsSpecialOdds(curGameId, tagDynamicMultipleItem.wMultipleID.value)) {
//           // 特殊赔率的动态赔率
//           // switch (curName) {
//           //   case '特码-大':
//           //     nameMapMul[curName] = gets(nameMapMul[curName], emmultipObj?.MT_T_DA_S, tagDynamicMultipleItem?.dwMultiple?.value);
//           //     newDwMultiple[emmultipObj?.MT_T_DA_S].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     break;
//           //   case '特码-小':
//           //     nameMapMul[curName] = gets(nameMapMul[curName], emmultipObj?.MT_T_XIAO_S, tagDynamicMultipleItem?.dwMultiple?.value);
//           //     newDwMultiple[emmultipObj?.MT_T_XIAO_S].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     break;
//           //   case '特码-单':
//           //     nameMapMul[curName] = gets(nameMapMul[curName], emmultipObj?.MT_T_DAN_S, tagDynamicMultipleItem?.dwMultiple?.value);
//           //     newDwMultiple[emmultipObj?.MT_T_DAN_S].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     break;
//           //   case '特码-双':
//           //     nameMapMul[curName] = gets(nameMapMul[curName], emmultipObj?.MT_T_SHUANG_S, tagDynamicMultipleItem?.dwMultiple?.value);
//           //     newDwMultiple[emmultipObj?.MT_T_SHUANG_S].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     break;
//           //   case '特码-小单':
//           //     nameMapMul[curName] = gets(nameMapMul[curName], emmultipObj?.MT_T_XIAO_DAN_S, tagDynamicMultipleItem?.dwMultiple?.value);
//           //     newDwMultiple[emmultipObj?.MT_T_XIAO_DAN_S].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     break;
//           //   case '特码-大双':
//           //     nameMapMul[curName] = gets(nameMapMul[curName], emmultipObj?.MT_T_DA_SHUANG_S, tagDynamicMultipleItem?.dwMultiple?.value);
//           //     newDwMultiple[emmultipObj?.MT_T_DA_SHUANG_S].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     break;
//           //   default:
//           //     break;
//           // }
//         } else {
//           // 普通赔率的动态赔率
//           // switch (curName) {
//           //   case '特码-0':
//           //   case '特码-27':
//           //   case '特码-1':
//           //   case '特码-26':
//           //   case '特码-2':
//           //   case '特码-25':
//           //   case '特码-3':
//           //   case '特码-24':
//           //   case '特码-4':
//           //   case '特码-23':
//           //   case '特码-5':
//           //   case '特码-22':
//           //   case '特码-6':
//           //   case '特码-21':
//           //   case '特码-7':
//           //   case '特码-20':
//           //   case '特码-8':
//           //   case '特码-19':
//           //   case '特码-9':
//           //   case '特码-18':
//           //   case '特码-10':
//           //   case '特码-17':
//           //   case '特码-11':
//           //   case '特码-16':
//           //   case '特码-12':
//           //   case '特码-15':
//           //   case '特码-13':
//           //   case '特码-14':
//           //   // case '特码-28':
//           //     tMapMul[curName] = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-大':
//           //     newDwMultiple[emmultipObj?.MT_T_DA].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       ...nameMapMul[curName],
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-小':
//           //     newDwMultiple[emmultipObj?.MT_T_XIAO].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       ...nameMapMul[curName],
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-单':
//           //     newDwMultiple[emmultipObj?.MT_T_DAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       ...nameMapMul[curName],
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-双':
//           //     newDwMultiple[emmultipObj?.MT_T_SHUANG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       ...nameMapMul[curName],
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-大单':
//           //     newDwMultiple[emmultipObj?.MT_T_DA_DAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-小单':
//           //     newDwMultiple[emmultipObj?.MT_T_XIAO_DAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       ...nameMapMul[curName],
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-大双':
//           //     newDwMultiple[emmultipObj?.MT_T_DA_SHUANG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       ...nameMapMul[curName],
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-小双':
//           //     newDwMultiple[emmultipObj?.MT_T_XIAO_SHUANG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-极大':
//           //     newDwMultiple[emmultipObj?.MT_T_JIDA].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-极小':
//           //     newDwMultiple[emmultipObj?.MT_T_JIXIAO].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-红波':
//           //     newDwMultiple[emmultipObj?.MT_T_HONG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-蓝波':
//           //     newDwMultiple[emmultipObj?.MT_T_LAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-绿波':
//           //     newDwMultiple[emmultipObj?.MT_T_LV].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-顺子':
//           //     newDwMultiple[emmultipObj?.MT_T_SHUNZI].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-豹子':
//           //     newDwMultiple[emmultipObj?.MT_T_BAOZI].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '特码-对子':
//           //     newDwMultiple[emmultipObj?.MT_T_DUIZI].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第一球-0':
//           //   case '第一球-1':
//           //   case '第一球-2':
//           //   case '第一球-3':
//           //   case '第一球-4':
//           //   case '第一球-5':
//           //   case '第一球-6':
//           //   case '第一球-7':
//           //   case '第一球-8':
//           //   case '第一球-9':
//           //     tMapMul[curName] = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第一球-大':
//           //     newDwMultiple[emmultipObj?.MT_D1_DA].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第一球-小':
//           //     newDwMultiple[emmultipObj?.MT_D1_XIAO].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第一球-单':
//           //     newDwMultiple[emmultipObj?.MT_D1_DAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第一球-双':
//           //     newDwMultiple[emmultipObj?.MT_D1_SHUANG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第二球-0':
//           //   case '第二球-1':
//           //   case '第二球-2':
//           //   case '第二球-3':
//           //   case '第二球-4':
//           //   case '第二球-5':
//           //   case '第二球-6':
//           //   case '第二球-7':
//           //   case '第二球-8':
//           //   case '第二球-9':
//           //     tMapMul[curName] = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第二球-大':
//           //     newDwMultiple[emmultipObj?.MT_D2_DA].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第二球-小':
//           //     newDwMultiple[emmultipObj?.MT_D2_XIAO].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第二球-单':
//           //     newDwMultiple[emmultipObj?.MT_D2_DAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第二球-双':
//           //     newDwMultiple[emmultipObj?.MT_D2_SHUANG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第三球-0':
//           //   case '第三球-1':
//           //   case '第三球-2':
//           //   case '第三球-3':
//           //   case '第三球-4':
//           //   case '第三球-5':
//           //   case '第三球-6':
//           //   case '第三球-7':
//           //   case '第三球-8':
//           //   case '第三球-9':
//           //     tMapMul[curName] = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第三球-大':
//           //     newDwMultiple[emmultipObj?.MT_D3_DA].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第三球-小':
//           //     newDwMultiple[emmultipObj?.MT_D3_XIAO].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第三球-单':
//           //     newDwMultiple[emmultipObj?.MT_D3_DAN].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   case '第三球-双':
//           //     newDwMultiple[emmultipObj?.MT_D3_SHUANG].value = tagDynamicMultipleItem?.dwMultiple?.value;
//           //     nameMapMul[curName] = {
//           //       n: tagDynamicMultipleItem?.dwMultiple?.value,
//           //     };
//           //     break;
//           //   default:
//           //     break;
//           // }
//         }
//       }
//       return {
//         multiple: newDwMultiple,
//         tMapMul,
//         nameMapMul,
//       };
//     }
//     return {
//       multiple: dwMultiple,
//       tMapMul: {},
//       nameMapMul: {},
//     };
//   }, [TMP, dwMultiple, curGameId]);

//   return multipleObj;
// };
