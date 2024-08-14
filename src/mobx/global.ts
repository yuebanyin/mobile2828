import { makeAutoObservable } from 'mobx';
import { MutableRefObject, createContext, useContext } from 'react';
import { showHeader, showFooter, ThemeName } from '@/constants';

// 当前 class 类中的全局变量
export type GlobalStateType =
  | 'theme'
  | 'languageList'
  | 'language'
  | 'showHeader'
  | 'showFooter'
  | 'step'
  | 'navigation'
  | 'audioCTRef'
  | 'audioPZRef'
  | 'audioCKRef'
  | 'ismuted'
  | 'isLoading'
  | '';

export class GlobalState {
  constructor() {
    makeAutoObservable(this);
    this.changeState = this.changeState.bind(this);
    this.setAllGameList = this.setAllGameList.bind(this);
  }

  // 全局路由跳转
  navigation: Function;

  // 公告弹出步骤
  step = 1;

  // 主题色 默认blueyellow
  theme: ThemeName = null;

  // 语言列表
  languageList = ['zh-CN', 'en', 'zh-TW'];

  // 可选房号游戏列表
  pc28List = [];

  // 取自getGameInfoItem 平台所有游戏列表
  allGameList = [];

  // 系统当前语言
  language = 'zh-TW';

  // 添加到dva的目的为了可以控制头部的展示隐藏
  showHeader = showHeader;

  // 添加到dva的目的为了可以控制底部的展示隐藏
  showFooter = showFooter;

  // 倒计时音效
  audioCTRef: MutableRefObject<HTMLAudioElement>;

  // 开奖音效
  audioPZRef: MutableRefObject<HTMLAudioElement>;

  // 点击音效
  audioCKRef: MutableRefObject<HTMLAudioElement>;

  // 是否开启音效
  ismuted: boolean;

  // 全局loading
  isLoading: boolean;

  // 保存首页配置游戏列表
  setAllGameList(list: any[]) {
    this.allGameList = list;
  }

  // 修改状态
  changeState(type: GlobalStateType, value?: any) {
    this[type] = value;
  }
}

// 利用createContext 创建storeContext
export const storeGlobal = createContext(new GlobalState());

// 导出一个hook 获取全局state的变量值
export const useGlobalStore = () => useContext(storeGlobal);
