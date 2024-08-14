import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

// 当前 class 类中的全局变量
export type GeneralStateType = 'levelList' | 'bankList' | 'addressList';

export type LevelDto = {
  Key: string;
  Value: number;
  Expand: number;
};

/**
 * 通用的数据源
 */
export class GeneralState {
  constructor() {
    makeAutoObservable(this);
    this.changeGeneralState = this.changeGeneralState.bind(this);
    this.getLevelExpand = this.getLevelExpand.bind(this);
  }

  // 账号等级列表
  levelList: LevelDto[] = [];

  // 汇款银行列表
  bankList = [];

  // 地址列表
  addressList = [];

  // 修改状态
  changeGeneralState(type: GeneralStateType, value?: any) {
    this[type] = value;
  }

  // 获取日化率
  getLevelExpand(level): number {
    const it = this.levelList.find((it) => it.Value === level);
    if (it) {
      return it.Expand;
    }
    return 0;
  }
}

// 利用createContext 创建storeContext
export const storeGeneral = createContext(new GeneralState());

// 导出一个hook 获取全局state的变量值
export const useGeneralStore = () => useContext(storeGeneral);
