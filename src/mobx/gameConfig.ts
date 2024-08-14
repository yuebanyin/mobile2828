import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { Obj } from '@/constants';
import { isArray, ssSetItem } from '@/utils/tools';

// 当前 class 类中的全局变量
// export type GameConfigType = 'pc28Games' | 'classicGames';

export class GameConfig {
  constructor() {
    makeAutoObservable(this);
    this.setGameSwitchConfig = this.setGameSwitchConfig.bind(this);
    this.getGameSwitchConfig = this.getGameSwitchConfig.bind(this);
    this.getWssUrl = this.getWssUrl.bind(this);
    this.setGameIdMobx = this.setGameIdMobx.bind(this);
    this.setFieldId = this.setFieldId.bind(this);
    this.setHouseLevel = this.setHouseLevel.bind(this);
    this.initGameConfig = this.initGameConfig.bind(this);
    this.saveCountTime = this.saveCountTime.bind(this);
    this.saveDwMultiple = this.saveDwMultiple.bind(this);
    this.saveTdMultiple = this.saveTdMultiple.bind(this);
    this.initGamesList = this.initGamesList.bind(this);
    this.setRedpacketConfig = this.setRedpacketConfig.bind(this);
    this.clearRedpacketConfig = this.clearRedpacketConfig.bind(this);
    this.changeTDMStatus = this.changeTDMStatus.bind(this);
    this.setGameList = this.setGameList.bind(this);
    this.setPC28List = this.setPC28List.bind(this);
    this.setHomeTypeGames = this.setHomeTypeGames.bind(this);
    this.setBetLenTip = this.setBetLenTip.bind(this);
  }

  // 平台聊天室 链接地址 wss://game2.yindnf.com/1770
  chatWsUrl: string = '';
  // chatWsUrl: string = 'ws://127.0.0.1:1770'; // 北丐本地测试 聊天室

  // 游戏: string = 'ws://127.0.0.1:'; // 北丐本地测试 wss://game.ktvstories.com/
  gameWsUrl: string = '';

  // 大厅
  msgWsUrl: string = '';
  // msgWsUrl: string = 'ws://127.0.0.1:1730'; // 北丐本地测试 大厅 顶号

  // iframe 链接域名
  iframeHost: string = '';

  // img 域名
  imgHost: string = '';

  // 系统提示
  systemTip: Obj = {
    CountDownContent1: '30SecondsUntil',
    CountDownContent2: '20SecondsUntil',
    CountDownContent3: '10SecondsUntil',
    CountDownTime1: 30,
    CountDownTime2: 20,
    CountDownTime3: 10,
    GetInto: 'welcomeToRoom',
    Lottery: 'lotteryResults',
    SealingIng: 'underCover',
    SealingStart: 'StartClosing',
    Startbet: 'StartBets',
    // CountDownContent1: '距离封盘还有30秒',
    // CountDownContent2: '距离封盘还有20秒',
    // CountDownContent3: '距离封盘还有10秒',
    // CountDownTime1: 30,
    // CountDownTime2: 20,
    // CountDownTime3: 10,
    // GetInto: '欢迎进入房间',
    // Lottery: '开奖结果',
    // SealingIng: '封盘中',
    // SealingStart: '开始封盘',
    // Startbet: '开始下注',
  };

  // 红包配置
  redpacketConfig: Map<string, any>;

  //首页启动配置
  gameSwitchConfig: Map<string, any>;

  // 初始化赔率（常规+特殊） initOdds
  initOdds: any[] = [];

  // 动态赔率（常规+特殊）moveOdds
  // moveOdds: Map<string, any[]> = null;
  moveOdds: any;

  // 动态赔率是否发送完成 isMOF
  isTDMFinish: boolean = true;

  // 倒计时时间、可能是封盘中
  countTime: number | string;

  // 所有游戏
  gameList: any[] | null;

  // 可选房号的游戏id
  pc28List: any[] | null;

  // 配置的游戏列表
  homeTypeGames: any[] | null;

  //当前选中游戏Id
  gameActiveId: number = 2801;

  //当前选中房间号 fieldId
  fieldId: number = 1;

  // 大厅游戏聊天室 房间等级
  houseLevelId: number = 1;

  // 开放游戏id
  openGamesId = [
    2801, 2802, 2803, 2804, 2901, 2902, 2903, 2904, 2905, 3102, 3202,
  ];
  // openGamesId = [2801, 2802, 2803, 2804, 2901, 2902, 2903, 2904, 2905, 3102, 3202, 3203];

  // betLenTip 主要用于连码、全不中、生肖连等排列组合的最小限制提示
  betLenTip: string;

  // betLenTip 主要用于连码、全不中、生肖连等排列组合的最小限制提示
  setBetLenTip(tip: string | null) {
    this.betLenTip = tip;
  }

  // 保存游戏到mbox
  setGameList(list: any[]) {
    this.gameList = list;
  }

  // 保存pc28游戏
   setPC28List(list: any[]) {
    this.pc28List = list;
  }

  // 保存首页配置游戏列表
  setHomeTypeGames(list: any[]) {
    this.homeTypeGames = list;
  }

  // 保存红包配置
  setRedpacketConfig(key: string, value: any) {
    if (!this.redpacketConfig) {
      this.redpacketConfig = new Map();
    }
    this.redpacketConfig.set(key, value);
  }

  // 清除红包配置
  clearRedpacketConfig() {
    this.redpacketConfig = null;
  }

  // 设置首页启动配置
  setGameSwitchConfig(hostList: any[]) {
    if (!this.gameSwitchConfig) {
      this.gameSwitchConfig = new Map();
    }
    if (isArray(hostList)) {
      hostList.forEach((host: any) => {
        const key = host?.GameKey;
        if (!key) return;
        const value = isArray(host?.Value)
          ? host?.Value[0]?.Value
          : host?.Value;
        switch (key) {
          case 's1':
            this.gameWsUrl = value;
            break;
          case 's2':
            this.msgWsUrl = `${this.gameSwitchConfig.get('s1')}${value}`;
            break;
          case 's3':
            this.chatWsUrl = `${this.gameSwitchConfig.get('s1')}${value}`;
            break;
          case 's14':
            ssSetItem('api_host', value);
            break;
          case 's15':
            this.imgHost = value;
            break;
          case 's16':
            this.iframeHost = value;
            break;
          default:
            break;
        }
        this.gameSwitchConfig.set(key, value);
      });
    }
    // this.gameSwitchConfig.set(key, value);
    // if (key === 's1') {
    //   this.gameWsUrl = this.getWssUrl();
    // }
    // if (key === 's2') {
    //   this.msgWsUrl = `${this.getWssUrl()}${value}`;
    // }
    // if (key === 's3') {
    //   this.chatWsUrl = `${this.getWssUrl()}${value}`;
    // }
  }

  //获取首页启动配置项
  getGameSwitchConfig(key: string): any {
    if (this.gameSwitchConfig) {
      return this.gameSwitchConfig.get(key);
    }
    return '';
  }

  // 获取网络节点
  getWssUrl(): string {
    const item = this.getGameSwitchConfig('s1');
    if (item && item.length > 0) {
      const host = isArray(item) ? item[0]?.Value : 'ws';
      return host;
    }
    return '';
  }

  setHouseLevel(level: number) {
    this.houseLevelId = level;
  }

  // 保存当前游戏的倒计时时间
  saveCountTime(t: number | string, cb?: Function) {
    if (typeof cb === 'function') {
      this.countTime = cb(this.countTime);
    } else {
      this.countTime = t;
    }
  }

  //记录当前选中的游戏
  setGameIdMobx(gameID: number) {
    this.gameActiveId = gameID;
  }

  // 保存初始化赔率
  saveDwMultiple(dwMultipleArr: any[]) {
    this.initOdds = [...dwMultipleArr];
  }

  // 保存动态赔率
  saveTdMultiple(key: string, tdMultipleArr: any[], isClear?: boolean) {
    if (isClear) {
      this.moveOdds = null;
    } else {
      // if (!this.moveOdds) {
      //   this.moveOdds = new Map();
      // }
      // if (this.isTDMFinish) {
      //   this.moveOdds.set(key, tdMultipleArr);
      //   this.isTDMFinish = false;
      // } else {
      //   const preArr = this.moveOdds.get(key) || [];
      //   this.moveOdds.set(key, [...preArr, ...tdMultipleArr]);
      // }
      const preArr = this.moveOdds?.get(key) || [];
      const preMoveMutil = [...preArr, ...tdMultipleArr]; // 收集多次推送得动态赔率
      this.moveOdds = null; // 方便全局监听动态赔率，实时更新
      this.moveOdds = new Map(); //
      this.moveOdds.set(key, preMoveMutil);
    }
  }

  // 修改动态赔率返回的状态
  changeTDMStatus(v: boolean) {
    this.isTDMFinish = v;
  }

  //记录当前选中的游戏房间 fieldId
  setFieldId(fieId?: number) {
    if (fieId) {
      this.fieldId = fieId;
    } else if (this.gameActiveId) {
      // const gameItem = this.getGameConfig({ gameId: this.gameActiveId });
      // this.fieldId = gameItem.Field[0].FieldId;
    }
  }
  
  // 初始化游戏数据
  initGameConfig() {
    this.gameActiveId = 2801;
    this.fieldId = 1;
    this.houseLevelId = 1;
    this.countTime = null;
    // this.gameSwitchConfig = null;
    this.initOdds = [];
    this.moveOdds = null;
  }

  // layout 初始化游戏列表
  initGamesList() {
    this.gameList = null;
    this.pc28List = null;
  }
}

// 利用createContext 创建storeContext
export const storeGameConfig = createContext(new GameConfig());

// 导出一个hook 获取全局state的变量值
export const useGameConfigStore = () => useContext(storeGameConfig);
