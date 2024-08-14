import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

// 当前 class 类中的全局变量
export type GameTimeStateType =
  | '2801'
  | '2802'
  | '2803'
  | '2804'
  | '2901'
  | '2902'
  | '2903'
  | '2904'
  | '2905'
  | '3102'
  | '3202'
  | '3203'
  | '3501'
  | '3402';

type GameTimeMap = {
  2801: string;
  2802: string;
  2803: string;
  2804: string;
  2901: string;
  2902: string;
  2903: string;
  2904: string;
  2905: string;
  3102: string;
  3202: string;
  3203: string;
  3501: string;
  3402: string;
};
/**
 * 通用的数据源
 */
export class GameTimeState {
  constructor() {
    makeAutoObservable(this);
    this.changeGameTimeMapState = this.changeGameTimeMapState.bind(this);
    this.saveCountDownConfig = this.saveCountDownConfig.bind(this);
    this.getCurPeridId = this.getCurPeridId.bind(this);
    this.changeRequest = this.changeRequest.bind(this);
  }

  // 倒计时接口数据
  countDownConfig: null | any[];

  // 保存data数据
  saveCountDownConfig(d) {
    this.countDownConfig = [...d];
  }

  // 是否重新请求
  isRequest: boolean;

  // 修改重新请求状态
  changeRequest() {
    this.isRequest = !this.isRequest;
  }

  // 计算最新期号
  getCurPeridId(id: number, data) {
    const newData = this.countDownConfig || data;
    if (newData) {
      // 加了一层判断，这里写具体获取期号的逻辑
      // console.log(this.countDownConfig);
      for (let i = 0; i < newData.length; i += 1) {
        const timeConfig = newData[i];
        const gameId = timeConfig['GameId'];
        if (gameId === id) {
          const nTime = Date.now() / 1000 - Number(timeConfig.Date);
          // FIXME 2023-09-06 12:15:44 今天的第n期
          const nIndex = Math.floor(nTime / timeConfig.RoundSeconds) + 1;
          if (gameId === 3202) {
            // FIXME 2023-09-06 11:45:10 斯洛伐克游戏期号处理
            const a = dayjs(timeConfig.PeriodId, 'YYYYMMDDHHmm');
            const curPeriodTime = a.add(nIndex * timeConfig.RoundSeconds, 's');
            return curPeriodTime.format('YYYYMMDDHHmm');
          }
          const curPeriod = Number(timeConfig.PeriodId) + nIndex;
          return curPeriod;
        }
      }
      return false;
    }
    return false;
  }

  // 游戏时间列表
  gameTimeMap: GameTimeMap = {
    2801: '',
    2802: '',
    2803: '',
    2804: '',
    2901: '',
    2902: '',
    2903: '',
    2904: '',
    2905: '',
    3102: '',
    3202: '',
    3203: '',
    3501: '',
    3402: '',
  };

  // 修改状态
  changeGameTimeMapState(value: GameTimeMap) {
    this.gameTimeMap = value;
  }
}

// 利用createContext 创建storeContext
export const storeGameTime = createContext(new GameTimeState());

// 导出一个hook 获取全局state的变量值
export const useGameTimeStore = () => useContext(storeGameTime);

