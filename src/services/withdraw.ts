import { post } from '@/utils/request';
import type { Obj } from '@/constants';
import { ApiV2Prefix } from './prefix';

/** ------------yuebao余额宝------------ */

// 验证是否创建提现密码
export const verifyWithdrawalPwd = () =>
  post(`${ApiV2Prefix}/Withdrawal/VerifyWithdrawalPwd`, {});
// 创建提现密码
export const createWithdrawalPwd = (params: Obj) =>
  post(`${ApiV2Prefix}/Withdrawal/CreateWithdrawalPwd`, params);
// 提现状态验证
export const withdrawalVerify = () =>
  post(`${ApiV2Prefix}/Withdrawal/WithdrawalVerify`, {});
// 提现稽核
export const exChangeRevenue = () =>
  post(`${ApiV2Prefix}/Withdrawal/ExChangeRevenue`, {});
// 提现-USDT钱包列表
export const getUsdtWalletList = () =>
  post(`${ApiV2Prefix}/USDTWithdrawal/USDTWalletList`, {});
// USDT提现
export const usdtWithdraw = (params: Obj) =>
  post(`${ApiV2Prefix}/USDTWithdrawal/Withdrawal`, params);
// 提现-银行卡列表
export const getUserWithdrawalCardList = () =>
  post(`${ApiV2Prefix}/BankWithdraw/UserWithdrawalCardList`, {});

// 银行卡提现
export const bankWithdraw = (params: Obj) =>
  post(`${ApiV2Prefix}/BankWithdraw/BankWithdraw`, params);

// 提现-GoPay提现钱包列表
export const getGoPayWalletList = () =>
  post(`${ApiV2Prefix}/GoPayBind/GoPayWalletList`, {});

// gopay钱包提现
export const goPayWithdraw = (params: Obj) =>
  post(`${ApiV2Prefix}/Pay/Go/Withdrawal`, params);

// 找回提现密码获取手机号
export const getPhoneNumber = () =>
  post(`${ApiV2Prefix}/User/GetPhoneNumber`, {});

// 找回提现密码发送验证码
export const sendWithdrawVerifyCode = () =>
  post(`${ApiV2Prefix}/App/SendWithdrawVerifyCode`, {});

// 找回提现密码提交
export const modifyWithdrawPassByCode = (params: Obj) =>
  post(`${ApiV2Prefix}/User/ModifyWithdrawPassByCode`, params);

