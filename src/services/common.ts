import { post } from '@/utils/request';
import { ApiV2Prefix, ApiSlidercode } from './prefix';

type ObjectType = Record<string, any>;

/** --------------- 公共接口 ----------- */
// 语言列表
export const getLanguages = (params?: ObjectType) =>
  post(`${ApiV2Prefix}/Public/LanguageList`, params || {});
// 注册模板，控制推荐码状态
export const registerTemp = () => post(`${ApiV2Prefix}/Login/RegisterTemp`, {});
// 注册接口
export const registry = (params: ObjectType) =>
  post(`${ApiV2Prefix}/Login/Register`, params);
// 发送验证码接口
export const sendSms = (params: ObjectType) =>
  post(`${ApiV2Prefix}/App/SendSms`, params);
// 登录接口
export const login = (params: ObjectType) =>
  post(`${ApiV2Prefix}/Login/Login`, params);
// 试玩登录
export const virLogin = (params: ObjectType) =>
  post(`${ApiV2Prefix}/Login/Visitor`, params);
// 查询改设备是否已注册过账号
export const registerVerify = (params: ObjectType) =>
  post(`${ApiV2Prefix}/Login/RegisterVerify`, params);
// 退出登录接口
export const logout = () => post(`${ApiV2Prefix}/Login/LoginOut`, {});
// 创建验证码图片
export const createSliderCode = (params: ObjectType) =>
  post(`${ApiSlidercode}/Create`, params);

//登录界面忘记密码是否跳转找回密码
export const redirectPass = () => post(`${ApiV2Prefix}/Login/RedirectPass`, {});

//验证登录账号
export const verifyAccount = (params: ObjectType) =>
  post(`${ApiV2Prefix}/User/VerifyAccount`, params);

//发送验证码
export const sendVerifyCode = (params: ObjectType) =>
  post(`${ApiV2Prefix}/App/SendVerifyCode`, params);

//根据验证码修改登录密码
export const modifyLogonPassByCode = (params: ObjectType) =>
  post(`${ApiV2Prefix}/User/ModifyLogonPassByCode`, params);

// h5 地址
export const getH5WebUrl = () => post(`${ApiV2Prefix}/Public/MobileAddr`, {});
// 验证
export const verifySliderCode = (params: ObjectType) =>
  post(`${ApiSlidercode}/Verify`, params);
// 第三方游戏登录
export const getGameLogin = (params: ObjectType) =>
  post(`${ApiV2Prefix}/Game/Login`, params);
// 优惠活动详情
export const getActiveDetail = (params: ObjectType) =>
  post(`${ApiV2Prefix}/Activity/PreferentialInfo `, params);
// 支付类型
export const getPayTypes = (params?: ObjectType) =>
  post(`${ApiV2Prefix}/Public/PayTypes`, params || {});
// 提现类型
export const getWithdrawalTypes = (params?: ObjectType) =>
  post(`${ApiV2Prefix}/Public/WithdrawalTypes`, params || {});
// 游戏平台列表
export const getGamePlatforms = () =>
  post(`${ApiV2Prefix}/Public/GamePlatforms`, {});
// 主账户余额
export const getMainBalance = () => post(`${ApiV2Prefix}/Balance/Main`, {});
// AG平台 余额
export const getAgBalance = () => post(`${ApiV2Prefix}/Balance/Ag`, {});
// KY平台 余额
export const getKyBalance = () => post(`${ApiV2Prefix}/Balance/Ky`, {});
// Ob体育平台 余额
export const getObtyBalance = () => post(`${ApiV2Prefix}/Balance/Obty`, {});
// Ob视讯平台 余额
export const getObsxBalance = () => post(`${ApiV2Prefix}/Balance/Obsx`, {});
// Ob棋牌平台 余额
export const getObqpBalance = () => post(`${ApiV2Prefix}/Balance/Obqp`, {});
// Ob电竞平台 余额
export const getObdjBalance = () => post(`${ApiV2Prefix}/Balance/Obdj`, {});
// 余额宝总余额
export const getTotalBalance = () =>
  post(`${ApiV2Prefix}/Yeb/GetTotalBalance`, {});
// 金币比例
export const getScoreScale = () => post(`${ApiV2Prefix}/Public/ScoreScale`, {});
// 结算利率列表
export const getSettleRateList = () =>
  post(`${ApiV2Prefix}/Public/GetSettleRateList`, {});
// 游戏类型列表
export const getGameTypes = () => post(`${ApiV2Prefix}/Public/GameTypes`, {});

//首页启动配置
export const getGameSwitchConfig = () =>
  post(`${ApiV2Prefix}/ClientInterface/GameSwitchConfig`, {});

// 游戏房间列表
export const getGameList = () => post(`${ApiV2Prefix}/Public/GameList`, {});

// 游戏时间
export const getGameTime = () => post(`${ApiV2Prefix}/Public/GameTime`, {});

//账号等级列表
export const getGameLevelList = () =>
  post(`${ApiV2Prefix}/Public/GameLevelList`, {});

//汇款银行列表
export const getBankOptions = () =>
  post(`${ApiV2Prefix}/Public/BankOptions`, {});
