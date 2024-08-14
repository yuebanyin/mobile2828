import { Obj } from '@/constants';
import { post } from '@/utils/request';
import { ApiV2Prefix } from './prefix';

// type ObjectType = Record<string, any>;

/** ------------首页接口------------ */
// 获取导航数据
export const getNavData = () => post(`${ApiV2Prefix}/Home/GameList`, {});

// 获取公告数据
export const getNoticeData = () =>
  post(`${ApiV2Prefix}/Home/NoticeCarousel`, {});

// 首页banner
export const getHomeBannerData = () =>
  post(`${ApiV2Prefix}/Home/BannerList`, {});

// 首页在线人数配置
export const getHomeOnlineConfigData = () =>
  post(`${ApiV2Prefix}/Home/OnlineConfig`, {});

// 首页弹窗公告
export const getHomeSystemNotice = () =>
  post(`${ApiV2Prefix}/Home/SystemNotice`, {});

// 首页 热门游戏
export const getHomeHotGameList = () =>
  post(`${ApiV2Prefix}/Home/HotGameList`, {});

// 首页 合作平台
export const getCooperationPlatform = () =>
  post(`${ApiV2Prefix}/Home/CooperationPlatform`, {});

// 首页 签到信息
export const getSignInUserInfo = () =>
  post(`${ApiV2Prefix}/Home/SignInUserInfo`, {});

// 首页 立即签到
export const nowSignInToday = () => post(`${ApiV2Prefix}/Home/SignIn`, {});

// 今日输赢
export const getUserWinLose = () => post(`${ApiV2Prefix}/Home/UserWinLose`, {});

// 游戏最近交易记录
export const geGameTsRecords = (params) =>
  post(`${ApiV2Prefix}/Home/SscUserBetRecordList`, params);

// 摇奖配置
export const getLotterySetting = () =>
  post(`${ApiV2Prefix}/Home/LotterySetting`, {});

// 积分摇奖
export const getDrawLottery = (params: Obj) =>
  post(`${ApiV2Prefix}/Home/DrawLottery `, params);

// 排行榜
export const getRankRankingList = (params: Obj) =>
  post(`${ApiV2Prefix}/Record/RankingList `, params);

// 首页配置
export const getHomeTypeGames = () =>
  post(`${ApiV2Prefix}/Home/HomeTypeGames`, {});

// 获取商务合作类型
export const getBusinessServiceTypeList = () =>
  post(`${ApiV2Prefix}/CustomerService/BusinessServiceTypeList`, {});
// 获取商务合作类型
export const getBusinessServiceList = (params: Obj) =>
  post(`${ApiV2Prefix}/CustomerService/BusinessServiceList`, params);
