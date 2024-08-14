import { post } from '@/utils/request';
import { ApiPlayform, ApiV2Prefix } from './prefix';
import type { Obj } from '@/constants';

/** ------------个人资料------------ */
// 获取用户信息
export const getUserInfo = () => post(`${ApiV2Prefix}/Player/PlayerInfo`, {});

// 修改用户信息
export const editUserInfo = (params: Obj) => post(`${ApiV2Prefix}/Player/EditPlayerInfo`, params);

/** ------------资金明细------------ */
// 获取支付类型
export const getPayTypeList = () => post(`${ApiV2Prefix}/Public/PayTypeList`, {});

// 获取充值明细
export const getRechargeList = (params: Obj) => post(`${ApiV2Prefix}/Recharge/RechargeQuery`, params);

// 获取提现类型
export const getWithdrawTypeList = () => post(`${ApiV2Prefix}/Public/WithdrawalTypeList`, {});

// 获取提现明细
export const getWithdrawalList = (params: Obj) => post(`${ApiV2Prefix}/Withdrawal/WithdrawalQuery`, params);

// 获取交易明细
export const getFundDetails = (params: Obj) => post(`${ApiV2Prefix}/User/FundDetails`, params);

// 获取红包明细
export const getRedPacketDetails = (params: Obj) => post(`${ApiV2Prefix}/Record/HbRecord`, params);

// 获取红包明细详情
export const getRedPacketRecordDetail = (params: Obj) => post(`${ApiV2Prefix}/Record/HbRecordDetail`, params);

/** -----------------------------额度转换----------------------- */
// 设置 免钱包转入
export const getSetWalletStatus = () => post(`${ApiV2Prefix}/Balance/SetWallet`, {});
// 额度转换
export const getBalanceTransfer = (params: Obj) => post(`${ApiV2Prefix}/Game/Transfer`, params);
// 一键归集
export const getBalanceTransferAll = () => post(`${ApiV2Prefix}/Game/TransferAll`, {});

// 额度转换明细
export const getBalanceTransferRecord = () => post(`${ApiV2Prefix}/Game/TransferRecordList`, {});

/** -----------------------------余额宝---------------------------- */
// 余额宝详细
export const getYebInfo = () => post(`${ApiV2Prefix}/Yeb/YebInfo`, {});
// 获取 余额宝结算日率
export const getYebSettleRateList = () => post(`${ApiV2Prefix}/Yeb/GetSettleRateList`, {});
// 余额宝额度转出
export const getTransferOut = (params: Obj) => post(`${ApiV2Prefix}/Yeb/TransferOut`, params);
// 余额宝额度转入
export const getTransferIn = (params: Obj) => post(`${ApiV2Prefix}/Yeb/TransferIn`, params);
// 余额宝明细
export const getUserYebDetailList = (params: Obj) => post(`${ApiV2Prefix}/Yeb/GetUserYebDetailList`, params);
// 余额宝温馨提示
export const getYebDescription = () => post(`${ApiV2Prefix}/Yeb/Description`, {});

/** -----------------------------账户总览---------------------------- */
//主账户
export const getAccountMain = () => post(`${ApiV2Prefix}/AccountOverview/Main`, {});
//余额宝
export const getAccountYveb = () => post(`${ApiV2Prefix}/AccountOverview/Yveb`, {});
//每日签到
export const getAccountSignIn = () => post(`${ApiV2Prefix}/AccountOverview/SignIn`, {});
//积分摇奖
export const getAccountIntegral = () => post(`${ApiV2Prefix}/AccountOverview/Integral`, {});
//返水回水
export const getAccountReturnWater = () => post(`${ApiV2Prefix}/AccountOverview/ReturnWater`, {});
//取款绑定
export const getAccountWithdraw = () => post(`${ApiV2Prefix}/AccountOverview/Withdraw`, {});
//站内信息
export const getAccountMessage = () => post(`${ApiV2Prefix}/AccountOverview/Message`, {});
//推广赚钱
export const getAccountPromotion = () => post(`${ApiV2Prefix}/AccountOverview/Promotion`, {});

//余额宝描述文本
export const getYueDescription = () => post(`${ApiV2Prefix}/Yeb/Description`, {});

/** -----------------------------存款---------------------------- */
// 存款方式列表
export const getDepositTypes = () => post(`${ApiV2Prefix}/Deposit/Types`, {});
// 存款通道
export const getDepositChannels = (params: Obj) => post(`${ApiV2Prefix}/Deposit/Channels`, params);

/** -----------------------------额度转换---------------------------- */
//外接游戏下拉框
export const getPlatformOptions = () => post(`${ApiPlayform}/Platform/PlatformOptions`, {});
//外接游戏列表
export const getPlatformList = () => post(`${ApiPlayform}/Platform/PlatformList`, {});

//外接游戏地址
export const getPlatformGameUrl = (params: Obj) => post(`${ApiPlayform}/Platform/Login`, params);

//设置免钱包
export const setAvoidSecret = () => post(`${ApiPlayform}/Platform/SubmitBindAvoidSecret`, {});

//额度转换
export const transfer = (params: Obj) => post(`${ApiPlayform}/Platform/Transfer`, params);

//一键归集
export const transferAll = () => post(`${ApiPlayform}/Platform/TransferAll`, {});

//额度转换记录
export const getTransferRecordList = (params: Obj) => post(`${ApiPlayform}/Platform/TransferRecordList`, params);

// 获取余额
export const getBalance = (key?: string) => {
  if (!key) {
    key = 'Main';
  }
  const url = `${ApiPlayform}/Platform/${key}Balance`;
  return new Promise((resolve, reject) => {
    post(url, {})
      .then((res: any) => resolve({ ...res, key }))
      .catch((err: any) => reject(err));
  });
};

/** ------------投注记录------------ */
// 投注游戏列表
export const getBetRecordGameList = () => post(`${ApiV2Prefix}/Public/BetGameList`, {});

// 投注记录统计
export const getBetRecordList = (params: Obj) => post(`${ApiV2Prefix}/Record/BetList`, params);

// 获取投注详情
export const getBetRecordDetail = (params: Obj) => post(`${ApiV2Prefix}/Record/BetDetailList`, params);

// 获取客服类型
export const getCustomerServiceTypeList = () => post(`${ApiV2Prefix}/CustomerService/CustomerServiceTypeList`, {});
// 获取客服类型
export const getCustomerServiceList = (params: Obj) => post(`${ApiV2Prefix}/CustomerService/CustomerServiceList`, params);

//绑定的银行卡列表
export const getBindBankCardList = () => post(`${ApiV2Prefix}/BankWithdraw/UserBindCardList`, {});

//绑定银行卡
export const bindBankCard = (params: Obj) => post(`${ApiV2Prefix}/BankWithdraw/BindCard`, params);

//绑定的usdt列表
export const getBindUsdtList = () => post(`${ApiV2Prefix}/USDTBind/GetUSDTInfo`, {});

//绑定usdt
export const bindUsdt = (params: Obj) => post(`${ApiV2Prefix}/USDTBind/EditUSDTInfo`, params);

//绑定的gopay列表
export const getBindGoPayList = () => post(`${ApiV2Prefix}/GoPayBind/GoPayWalletList`, {});

//绑定gopay
export const bindGoPay = (params: Obj) => post(`${ApiV2Prefix}/GoPayBind/GoPayWalletBind`, params);

//更改提现密码
export const setWithdrawPwd = (params: Obj) => post(`${ApiV2Prefix}/Withdrawal/EditWithdrawalPwd`, params);

//修改登录密码
export const setLoginPwd = (params: Obj) => post(`${ApiV2Prefix}/User/ModifyLogonPass`, params);

// 关于界面列表
export const getAboutTypes = () => post(`${ApiV2Prefix}/Information/HelpDescriptionList`, {});

// 关于界面列表详情
export const getAboutTypesDetail = (params: Obj) => post(`${ApiV2Prefix}/Information/HelpDescriptionInfo`, params);

/** ------------积分记录------------ */
// 获取积分记录
export const getRecordList = (params: Obj) => post(`${ApiV2Prefix}/Record/IntegralRecord`, params);
/** ------------会员返水------------ */
// 会员返水
export const getBetRewardList = (params: Obj) => post(`${ApiV2Prefix}/Record/BetRewardList`, params);
/** ------------红包和奖金------------ */
// 获取奖金列表
export const getBonusList = (params: Obj) => post(`${ApiV2Prefix}/Bonus/BonusList`, params);
// 批量奖金领取
export const batchBonusList = (params: Obj) => post(`${ApiV2Prefix}/Bonus/BatchBonus`, params);
// 奖金领取
export const batchBonus = (params: Obj) => post(`${ApiV2Prefix}/Bonus/Bonus`, params);

/** ------------代理注册------------ */
// 注册状态
export const getAgentRegisterStatus = () => post(`${ApiV2Prefix}/Agent/RegisterStatus`, {});
// 注册模板
export const getAgentRegisterTemp = () => post(`${ApiV2Prefix}/Agent/AgentRegisterTemp`, {});
// 代理注册
export const postAgentRegister = (params: Obj) => post(`${ApiV2Prefix}/Agent/Register`, params);

/** ------------个人资料------------ */
// 账号明细
export const getUserScoreInfo = () => post(`${ApiV2Prefix}/User/UserScoreInfo`, {});
// 账号等级
export const getUserAccountLevel = () => post(`${ApiV2Prefix}/User/AccountLevel`, {});
// 获取个人资料
export const getUserUserInfo = () => post(`${ApiV2Prefix}/User/UserInfo`, {});
// 修改头像
export const postUserEditFaceId = (params: Obj) => post(`${ApiV2Prefix}/User/EditFaceId`, params);
// 修改个人资料
export const postUserEditUserInfo = (params: Obj) => post(`${ApiV2Prefix}/User/EditUserInfo`, params);

/** ------------彩种限额------------ */
// 彩种限额游戏列表
export const getLotteryLimitGame = () => post(`${ApiV2Prefix}/LotteryLimit/LotteryLimitGame`, {});
// 彩种限额详情
export const getLotteryLimitInfo = (params: Obj) => post(`${ApiV2Prefix}/LotteryLimit/LotteryLimitInfo `, params);

/** ------------公告消息------------ */


//获取公告消息
export const getHomeNotice = () => post(`${ApiV2Prefix}/Home/Notice`, {});

//获取邮件
export const getUserMail = () => post(`${ApiV2Prefix}/User/UserMail`, {});

//获取邮件
export const setMailRead = (params: Obj) => post(`${ApiV2Prefix}/User/Read`, params);

//删除邮件
export const deleteMail = (params: Obj) => post(`${ApiV2Prefix}/User/DeleteMail`, params);

// 游戏规则
export const getPlayRules = (params: Obj) => post(`${ApiV2Prefix}/Information/PlayRules`, params);


// 推广红利
export const getPromoteRecord = (type:number, params: Obj) => {
  switch (type) {
    case 1:
    return post(`${ApiV2Prefix}/Record/PromoteRecord`, params); // 推广红利
    case 2:
    return post(`${ApiV2Prefix}/Record/PromoteUserRecord`, params); // 推广会员
    default:
  }
  return null;
};
