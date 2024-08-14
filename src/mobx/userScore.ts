import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

// 当前 class 类中的全局变量
export type UserScoreStateType = 'accountLevel' | 'score' | 'bindScore' | 'rewardScore';

export class UserScoreState {
  constructor() {
    makeAutoObservable(this);
    this.changeUserLevel = this.changeUserLevel.bind(this);
    this.changeUserScore = this.changeUserScore.bind(this);
    this.clearUserScore = this.clearUserScore.bind(this);
    this.changeUserIntegral = this.changeUserIntegral.bind(this);
  }

  // 用户等级Id
  accountLevel?: number;

  // 用户金币（元）
  score?: number;

  // 用户奖金（元）
  bindScore?: number;

  // 用户积分（元）
  rewardScore?: number;

  // 修改账户等级状态
  changeUserLevel(value?: any) {
    this.accountLevel = value;
  }

  // 修改得分状态
  changeUserScore(value?: any) {
    this.score = value?.Score;
    this.bindScore = value?.BindScore;
    this.rewardScore = value?.RewardScore;
  }

  // 修改积分状态
  changeUserIntegral(value?: any) {
    this.bindScore = value;
  }

  // 清除所有数据
  clearUserScore() {
    this.accountLevel = null;
    this.score = null;
    this.bindScore = null;
    this.rewardScore = null;
  }
}

// 利用createContext 创建storeContext
export const storeUserScore = createContext(new UserScoreState());

// 导出一个hook 获取全局state的变量值
export const useUserScoreStore = () => useContext(storeUserScore);

