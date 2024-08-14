import { post } from '@/utils/request';
import { ApiPayPrefix, ApiV2Prefix } from './prefix';
import type { Obj } from '@/constants';


/** ------------recharge充值------------ */

// 获取 充值类型
export const getRechargeTypeList = () => post(`${ApiPayPrefix}/UserRecharge/RechargeTypeList`, {});

// 获取 充值下单示例
export const getPay = (params: Obj) => post(`${ApiPayPrefix}/XiYou/Pay`, params);

export const postRecharge = (url, params: Obj) => {
  url = url.replace('Api', 'ApiV1');
  return post(url, params);
};
// 充值通道
export const getUserChargeChannelList = (params: Obj) => post(`${ApiPayPrefix}/UserRecharge/UserChargeChannelList `, params);

// USDT入款信息
export const getProtocolList = () => post(`${ApiV2Prefix}/USDTRecharge/GetProtocolList`, {});

// 银行卡入款信息
export const getUserBankRechargeInfo = () => post(`${ApiV2Prefix}/BankRecharge/UserBankRechargeInfo`, {});

// 线下淘宝支付入款信息
export const getTaoBaoRechargeInfo = () => post(`${ApiV2Prefix}/TaoBaoRecharge/TaoBaoRechargeInfo`, {});

// 线下支付宝入款信息
export const getALiRechargeInfo = () => post(`${ApiV2Prefix}/ALiRecharge/ALiRechargeInfo`, {});

// 线下微信入款信息
export const getWeChatRechargeInfo = () => post(`${ApiV2Prefix}/WeChatRecharge/WeChatRechargeInfo`, {});

// 线下QQ 入款信息
export const getQQRechargeInfo = () => post(`${ApiV2Prefix}/QQRecharge/QQRechargeInfo`, {});


