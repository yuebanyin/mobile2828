/**
 * 长龙游戏下注信息
 */
import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { CMD_Game } from '@/engine/cmd/game/CMD_Game';
import { CreateObject } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';

export class ChangLongBetState {
  constructor() {
    makeAutoObservable(this);
    this.changeBetInfoArr = this.changeBetInfoArr.bind(this);
    this.changeNumKeyArr = this.changeNumKeyArr.bind(this);
    this.changeKeyArr = this.changeKeyArr.bind(this);
    this.filterBetInfo = this.filterBetInfo.bind(this);
    this.delGameBet = this.delGameBet.bind(this);
  }

  // 选中的号码, 游戏id 主码 子码拼接值
  numKeyArr: string[] = [];

  // 常规游戏 选中的号码, 游戏id 主码 子码拼接值
  keyArr: string[] = [];

  // 下注信息
  betInfoArr: CMD_Game.CMD_GR_SSCCL_PlaceBet[];

  // 是否发生改变
  isChange: boolean;

  // 处理封盘的逻辑
  delGameIds: number[] = [];

  // 常规游戏选中号码的key
  changeKeyArr(numArr) {
    if (typeof numArr === 'function') {
      this.keyArr = numArr(this.keyArr);
    } else {
      this.keyArr = numArr;
    }
  }

  changeNumKeyArr(numArr) {
    if (typeof numArr === 'function') {
      this.numKeyArr = numArr(this.numKeyArr);
    } else {
      this.numKeyArr = numArr;
    }
  }

  // 保存下注信息
  changeBetInfoArr(betInfoArr) {
    if (typeof betInfoArr === 'function') {
      this.betInfoArr = betInfoArr(this.betInfoArr);
    } else {
      this.betInfoArr = betInfoArr;
    }
    this.isChange = !this.isChange;
  }

  // 移除区域时删除对应选中的号码
  filterBetInfo(gameId: number, betArr: any[]) {
    console.log({ gameId, betArr, numKeyArr: this.numKeyArr });
    if (!this.betInfoArr || !gameId || !betArr) return;
    if (betArr) {
      betArr.forEach((info) => {
        const numKey = `${gameId}-${info.mainType}-${info.subMainType}`;
        const idx = this.numKeyArr.findIndex((its) => its === numKey);
        if (idx > -1) {
          // 删除对应的选中号码
          this.numKeyArr.splice(idx, 1);

          this.changeBetInfoArr((betInfo: CMD_Game.CMD_GR_SSCCL_PlaceBet[]) => {
            if (!betInfo) return null;
            let idx;
            let itemInfo = CreateObject(CMD_Game.CMD_GR_SSCCL_PlaceBet);
            itemInfo.tagCommonBetInfo = [];
            itemInfo.tagSpecialMultiple = [];
            betInfo.forEach((it: CMD_Game.CMD_GR_SSCCL_PlaceBet, i) => {
              if (it.placeBetHead.wKindID.value === gameId) {
                idx = i;
                let index;
                if (it.tagCommonBetClientHead.wBetCount.value > 1) {
                  itemInfo.placeBetHead.wKindID.value = gameId;
                  itemInfo.tagCommonBetClientHead.cPeriodNumber.value = it.tagCommonBetClientHead.cPeriodNumber.value;

                  it.tagCommonBetInfo.forEach((its: common.tagCommonBetInfo, i) => {
                    if (its.AreaInfo.cbBetMainType.value !== info.mainType || its.AreaInfo.cbBetSubType.value !== info.subMainType) {
                      itemInfo.tagCommonBetInfo.push(its);
                    } else {
                      index = i;
                    }
                  });
                  itemInfo.tagCommonBetClientHead.wBetCount.value = itemInfo.tagCommonBetInfo.length;
                } else {
                  itemInfo = null;
                }
                if (it.tagCommonBetClientHead.wMultipleCount.value > 1) {
                  // 特殊赔率的处理
                  it.tagSpecialMultiple.forEach((item: common.tagSpecialMultiple) => {
                    if (item.wBetIndex.value < index) {
                      itemInfo.tagSpecialMultiple.push(item);
                    } else if (item.wBetIndex.value > index) {
                      item.wBetIndex.value -= 1;
                      itemInfo.tagSpecialMultiple.push(item);
                    }
                  });
                  itemInfo.tagCommonBetClientHead.wMultipleCount.value = itemInfo.tagSpecialMultiple.length;
                }
              }
            });
            betInfo.splice(idx, 1);
            if (itemInfo) {
              betInfo.push(itemInfo);
            }
            return betInfo.length > 0 ? betInfo : null;
          });
        }
      });
    }
  }

  // 封盘状态直接删除对应游戏
  delGameBet(gameId: number) {
    if (this.betInfoArr && !this.delGameIds.includes(gameId)) {
      console.log({ gameId });
      const bidx = this.betInfoArr.findIndex((it) => it.placeBetHead.wKindID.value === gameId);
      if (bidx > -1) {
        this.delGameIds.push(gameId);
        // 删除
        this.betInfoArr.splice(bidx, 1);
        let newNumKeyArr = [];
        this.numKeyArr.forEach((key) => {
          if (`${key}`.indexOf(`${gameId}`) === -1) {
            newNumKeyArr.push(key);
          }
        });
        this.numKeyArr = [...newNumKeyArr];
        newNumKeyArr = null;
        const ididx = this.delGameIds.findIndex((id) => id === gameId);
        this.delGameIds.splice(ididx, 1);
        this.isChange = !this.isChange;
      }
    }
  }
}

// 利用createContext 创建storeContext
export const storeChangLongBet = createContext(new ChangLongBetState());

// 导出一个hook 获取全局state的变量值
export const useChangLongBetStore = () => useContext(storeChangLongBet);

