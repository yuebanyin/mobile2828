import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { ssSetJsonItem, ssGetJsonItem } from '@/utils/localStorage';

// 当前 class 类中的全局变量
export type UserInfoStateType =
  | 'token'
  | 'account'
  | 'gameId'
  | 'loginTime'
  | 'nickname'
  | 'faceId';

export class UserInfoState {
  constructor() {
    makeAutoObservable(this);
    this.changeAllUserInfo = this.changeAllUserInfo.bind(this);
    this.clearUserInfo = this.clearUserInfo.bind(this);
    this.changeLocalMobx = this.changeLocalMobx.bind(this);
    this.setAgent = this.setAgent.bind(this);
    this.setFaceId = this.setFaceId.bind(this);
    this.setOtherInfo = this.setOtherInfo.bind(this);
    this.setTxpsd = this.setTxpsd.bind(this);
    this.changeLocalMobx();
  }

  // 用户token
  token: string;

  // 账号
  account: string;

  // 昵称
  nickname: string;

  // 游戏ID
  gameId: number;

  // 用户等级
  level: number;

  // 登陆时间
  loginTime: string;

  // 用户头像id
  faceId: number;

  //是否未代理标识
  isAgent: boolean;

  //是否是试玩玩家还是正式玩家 false为正式玩家 true为试玩玩家
  isVisitor: boolean;

  // 手机号
  mobliePhone: string;

  // 真实姓名
  realName: string;

  // QQ
  qq: string;

  // wx
  weChat: string;

  // 是否创建了提现密码
  isCreatetxpsd: boolean;

  // 是否是测试账号
  isTest: boolean;

  // 设置代理状态
  setAgent(value: boolean) {
    const userInfo = ssGetJsonItem('userInfo');
    if (userInfo) {
      this.isAgent = value;
      userInfo.IsAgent = value;
      ssSetJsonItem('userInfo', userInfo);
    }
  }

  // 是否创建提现密码
  setTxpsd(value: boolean) {
    const userInfo = ssGetJsonItem('userInfo');
    if (userInfo) {
      this.isCreatetxpsd = value;
      userInfo.isCreatetxpsd = value;
      ssSetJsonItem('userInfo', userInfo);
    }
  }

  // 修改头像
  setFaceId(value: number) {
    const userInfo = ssGetJsonItem('userInfo');
    if (userInfo) {
      this.faceId = value;
      userInfo.FaceId = value;
      ssSetJsonItem('userInfo', userInfo);
    }
  }

  // 修改其他信息
  setOtherInfo(
    nickName: string,
    qq: string,
    weChat: string,
    realName?: string,
    mobliePhone?: string
  ) {
    const userInfo = ssGetJsonItem('userInfo');
    if (userInfo) {
      this.nickname = nickName || this.nickname;
      this.qq = qq || this.qq;
      this.weChat = weChat || this.weChat;
      this.realName = realName || this.realName;
      this.mobliePhone = mobliePhone || this.mobliePhone;
      userInfo.NickName = this.nickname;
      userInfo.QQ = this.qq;
      userInfo.WeChat = this.weChat;
      userInfo.RealName = this.realName;
      userInfo.MobliePhone = this.mobliePhone;
      ssSetJsonItem('userInfo', userInfo);
    }
  }

  // 修改状态
  changeAllUserInfo(value?: any) {
    ssSetJsonItem('userInfo', value);
    this.level = value?.Level;
    this.account = value?.Account;
    this.token = value?.CurrToken;
    this.gameId = value?.GameId;
    this.nickname = value?.NickName;
    this.loginTime = value?.LoginTime;
    this.faceId = value?.FaceId;
    this.isAgent = value?.IsAgent;
    this.isVisitor = value?.IsVisitor;
    this.mobliePhone = value?.MobliePhone;
    this.realName = value?.RealName;
    this.qq = value?.QQ;
    this.weChat = value?.WeChat;
    this.isTest = value?.IsTest;
  }

  // 清除所有数据
  clearUserInfo() {
    ssSetJsonItem('userInfo', '');
    this.account = '';
    this.token = '';
    this.gameId = null;
    this.level = 0;
    this.nickname = '';
    this.loginTime = '';
    this.faceId = null;
    this.isAgent = false;
    this.isVisitor = true;
    this.mobliePhone = '';
    this.realName = '';
    this.qq = '';
    this.weChat = '';
    this.isCreatetxpsd = false;
    this.isTest = false;
  }

  // 自动补充用户信息
  changeLocalMobx() {
    const userInfo = ssGetJsonItem('userInfo') || {};
    // 如果已经有值就保存起来
    if (userInfo?.CurrToken && userInfo?.GameId) {
      this.changeAllUserInfo(userInfo);
    }
  }
}

// 利用createContext 创建storeContext
export const storeUserInfo = createContext(new UserInfoState());

// 导出一个hook 获取全局state的变量值
export const useUserInfoStore = () => useContext(storeUserInfo);
