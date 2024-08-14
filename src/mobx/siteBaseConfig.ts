import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { Obj } from '@/constants';

export class SiteBaseConfig {
  baseConfig: Map<string, Obj> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  setBaseConfig(key: string, value: Obj) {
    this.baseConfig.set(key, value);
  }

  getBaseConfig(key: string):Obj {
    if (this.baseConfig.has(key)) return null;
    return this.baseConfig.get(key);
  }
}

// 利用createContext 创建storeContext
export const storeSiteBaseConfig = createContext(new SiteBaseConfig());

// 导出一个hook 获取全局state的变量值
export const useSiteBaseConfigStore = () => useContext(storeSiteBaseConfig);

