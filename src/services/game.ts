import { Obj } from '@/constants';
import { post } from '@/utils/request';
import { ApiV2Prefix } from './prefix';

/**------------------游戏接口-------------------------- */

// 开奖走势-最新
export const getSscRecordList = () =>
  post(`${ApiV2Prefix}/Home/SscRecordList`, {});

// 开奖走势历史 单个50条
export const getSscHistoryRecordList = (params: Obj) =>
  post(`${ApiV2Prefix}/Home/SscHistoryRecordList `, params);

// 获取当期下注
export const getCusBetList = (params: Obj) =>
  post(`${ApiV2Prefix}/Record/CusBetList`, params);

//数据分析
export const getDataAnalysis = (params: Obj) =>
  post(`${ApiV2Prefix}/Record/DataAnalysis `, params);

// 聊天室相关
export const getAnoData = () => post(`${ApiV2Prefix}/ChatRoom/Broadcast`, {});

//游戏房间赔率说明
export const getOddsDescription = (params: Obj) =>
  post(`${ApiV2Prefix}/Information/OddsDescription`, params);

//游戏-所有游戏
export const getGameInfoItem = () =>
  post(`${ApiV2Prefix}/Public/GameInfoItem`, {});
