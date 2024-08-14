import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';


// 当前 class 类中的全局变量
export type UserEmailCount = 'userEmailCount';
export type IsEmail = 'isEmail';

export class UserEmailCountState {
  constructor() {
    makeAutoObservable(this);
    this.changeUserEmailCount = this.changeUserEmailCount.bind(this);
    this.clearUserEmailCount = this.clearUserEmailCount.bind(this);

    this.changeTabsEmailStatus = this.changeTabsEmailStatus.bind(this);
  }

  // 邮件数量
  userEmailCount?: number;

  // 
  isEmail?: boolean;

  // 修改得分状态
  changeUserEmailCount(value?: any) {
    this.userEmailCount = value;
  }

  // 修改当前是否是处在邮件列表
  changeTabsEmailStatus(value?: boolean) {
    this.isEmail = value;
  }

  // 清除所有数据
  clearUserEmailCount() {
    this.userEmailCount = 0;
  }
}

// 利用createContext 创建UserEmailContext
export const storeUserEmailCount = createContext(new UserEmailCountState());

// 导出一个hook 获取全局state的变量值
export const useUserEmailCountStore = () => useContext(storeUserEmailCount);

export const useUserEmailStatusStore = () => useContext(storeUserEmailCount);
