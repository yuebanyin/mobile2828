import i18n from 'i18next';
import { REGEXOBJ } from './regex';
//更换头像部分
import avarar_1 from '@/assets/image/common/avatar/1.png';
import avarar_2 from '@/assets/image/common/avatar/2.png';
import avarar_3 from '@/assets/image/common/avatar/3.png';
import avarar_4 from '@/assets/image/common/avatar/4.png';
import avarar_5 from '@/assets/image/common/avatar/5.png';
import avarar_6 from '@/assets/image/common/avatar/6.png';
import avarar_7 from '@/assets/image/common/avatar/7.png';
import avarar_8 from '@/assets/image/common/avatar/8.png';
import avarar_9 from '@/assets/image/common/avatar/9.png';
import avarar_10 from '@/assets/image/common/avatar/10.png';
import avarar_11 from '@/assets/image/common/avatar/11.png';
import avarar_12 from '@/assets/image/common/avatar/12.png';
import avarar_13 from '@/assets/image/common/avatar/13.png';
import avarar_14 from '@/assets/image/common/avatar/14.png';
import avarar_15 from '@/assets/image/common/avatar/15.png';
import avarar_16 from '@/assets/image/common/avatar/16.png';
import avarar_17 from '@/assets/image/common/avatar/17.png';
import avarar_18 from '@/assets/image/common/avatar/18.png';
import avarar_19 from '@/assets/image/common/avatar/19.png';
import avarar_20 from '@/assets/image/common/avatar/20.png';
import avarar_21 from '@/assets/image/common/avatar/21.png';
import avarar_22 from '@/assets/image/common/avatar/22.png';
import avarar_23 from '@/assets/image/common/avatar/23.png';
import avarar_24 from '@/assets/image/common/avatar/24.png';
import avarar_25 from '@/assets/image/common/avatar/25.png';
import avarar_26 from '@/assets/image/common/avatar/26.png';
import avarar_27 from '@/assets/image/common/avatar/27.png';
import avarar_28 from '@/assets/image/common/avatar/28.png';
import avarar_29 from '@/assets/image/common/avatar/29.png';
import avarar_30 from '@/assets/image/common/avatar/30.png';
// import avarar_199 from '@/assets/image/common/avatar/199.png';

export const setList = [
  {
    id: 1,
    title: 'bindBankCard',
    icon: '/mine/setUp/icon_1.png',
    href: '/mine/setUp/bindBankCard',
  },
  {
    id: 2,
    title: 'bindUSDT',
    icon: '/mine/setUp/icon_1.png',
    href: '/mine/setUp/bindUsdt',
  },
  // {
  //   id: 3,
  //   title: '绑定GO钱包',
  //   icon: '/mine/setUp/icon_1.png',
  //   href: '/mine/setUp/bindGoPay',
  // },
  {
    id: 4,
    title: 'withdrawPSW',
    icon: '/mine/setUp/icon_2.png',
    href: '/mine/setUp/modifyWithdrawPassword',
  },
  {
    id: 5,
    title: 'personal.loginpwd',
    icon: '/mine/setUp/icon_3.png',
    href: '/mine/setUp/modifyLoginPassword',
  },
];

export const earnTabs = [
  { id: 1, text: 'promotionBonu' },
  { id: 2, text: 'promoteMember' },
];

// export const earnTabs = [
//   { id: 1, text: `${i18n.t('promotionBonu')}` },
//   { id: 2, text: `${i18n.t('promoteMember')}` },
// ];

export const modifyDataFormItems = [
  {
    text: 'username',
    name: 'account',
    placeholder: 'numberOrLetter_4_11',
    reg: REGEXOBJ.NUMBER_OR_LETTER_4_11,
    // required: true,
    // message: '请输入4-11位账号',
    message: 'pleaseEnterAccount',
    maxlength: 11,
  },
  {
    text: 'nickname',
    name: 'nickName',
    placeholder: 'chineseNumberOrLetter_2_8',
    reg: REGEXOBJ.CHINESENUMBERORLETTER_2_8,
    maxlength: 8,
    // message: '请输入2-8位昵称',
    message: 'pleaseEnternickname',
  },
  {
    text: 'relName',
    name: 'realName',
    placeholder: 'entryRelName',
    // required: true,
    // message: '请输入真实姓名',
    message: 'entryRelName',
  },
  {
    text: 'phone',
    name: 'mobliePhone',
    placeholder: 'entryPhone',
    // reg: REGEXOBJ.PHONE_NUM,
    // required: true,
    // message: '请输入正确的手机号码',
    message: 'pleaseEnterphone',
  },
  {
    text: 'whatNumber',
    name: 'weChat',
    placeholder: 'entryWeChat',
    reg: REGEXOBJ.WECHAT,
  },
  {
    text: 'qqNumber',
    name: 'qq',
    placeholder: 'entryQQ',
    reg: REGEXOBJ.QQ,
  },
];

export const bindBankFormItems = [
  {
    text: 'bankCardNumber',
    name: 'bankCardNumber',
    placeholder: 'banknumberLetter_10_20',
    reg: REGEXOBJ.BANKNUMBER_LETTER_10_20,
    required: true,
    // message: '请输入正确的银行卡号',
    message: 'bankCardNumberMsg',
    maxlength: 20,
  },
  {
    text: 'bankOName',
    name: 'bankOName',
    required: true,
    maxlength: 8,
    placeholder: 'entryBank',
    message: 'entryBank',
  },
  {
    text: 'bankName',
    name: 'bankName',
    placeholder: 'entryRelName',
    required: true,
    // message: '请输入开户人姓名',
    message: 'openBankName',

  },
  {
    text: 'bankAddress',
    name: 'bankAddress',
    placeholder: 'entryBankAddress',
    required: true,
    // message: '请选择开户地址',
    message: 'entryBankAddress',
  },
  {
    text: 'phone',
    name: 'mobliePhone',
    placeholder: 'entryPhone',
    reg: REGEXOBJ.PHONE_6_11,
    required: true,
    // message: '请输入6-11位手机号码',
    message: 'phoneLength',
    maxlength: 11,
  },
];

export const bindGoPayFormItems = [
  // {
  //   text: 'relName',
  //   name: 'relName',
  //   placeholder: 'entryRelName',
  //   required: true,
  //   message: '请输入真实姓名',
  // },
  // {
  //   text: 'phone',
  //   name: 'mobliePhone',
  //   placeholder: 'entryPhone',
  //   reg: REGEXOBJ.PHONE_NUM,
  //   required: true,
  //   message: '请输入手机号码',
  // },
  {
    text: 'goPayAddress',
    name: 'goPayAddress',
    placeholder: 'entryGoPayAddress',
    required: true,
    // message: '请输入钱包地址',
    message: 'entryGoPayAddress',
  },
  {
    text: 'withdrawPSW',
    name: 'withdrawPSW',
    placeholder: 'entryWithdrawPsd',
    required: true,
    // message: '请输入提现密码',
    message: 'entryWithdrawPsd',
  },
];


//头像选择
export const avatarOptions = [
  { id: 1, url: avarar_1 },
  { id: 2, url: avarar_2 },
  { id: 3, url: avarar_3 },
  { id: 4, url: avarar_4 },
  { id: 5, url: avarar_5 },
  { id: 6, url: avarar_6 },
  { id: 7, url: avarar_7 },
  { id: 8, url: avarar_8 },
  { id: 9, url: avarar_9 },
  { id: 10, url: avarar_10 },
  { id: 11, url: avarar_11 },
  { id: 12, url: avarar_12 },
  { id: 13, url: avarar_13 },
  { id: 14, url: avarar_14 },
  { id: 15, url: avarar_15 },
  { id: 16, url: avarar_16 },
  { id: 17, url: avarar_17 },
  { id: 18, url: avarar_18 },
  { id: 19, url: avarar_19 },
  { id: 20, url: avarar_20 },
  // { id: 199, url: avarar_199 },
];
export const avatarOptions1 = [
  { id: 21, url: avarar_21 },
  { id: 22, url: avarar_22 },
  { id: 23, url: avarar_23 },
  { id: 24, url: avarar_24 },
  { id: 25, url: avarar_25 },
  { id: 26, url: avarar_26 },
  { id: 27, url: avarar_27 },
  { id: 28, url: avarar_28 },
  { id: 29, url: avarar_29 },
  { id: 30, url: avarar_30 },
];

// 修改资料-温馨提示
export const modifyKindTips = [
  { text: 'modifyKindTips_1', id: 1 },
  {
    text: 'modifyKindTips_2',
    id: 2,
  },
];
// 存款通道充值-温馨提示
export const rechargeAliKindTips = [
  { text: 'genghuanxingxing', id: 1 },
  {
    text: 'copyCompanyInfo',
    id: 2,
  },
  {
    text: 'transferOperation',
    id: 3,
  },
  {
    text: 'receiptRequest',
    id: 4,
  },
  {
    text: 'delayedArrival',
    id: 5,
  },
  {
    text: 'pleaseConcatServer',
    id: 6,
  },
];
// 方式下拉数据
export const styleOptions = [
  { id: '0', textb: '全部方式', text: 'allStyle' },
  { id: '1', textb: '话费扫码', text: 'scanBill' },
  { id: '2', textb: '支付宝', text: 'alipay' },
  { id: '3', textb: '微信电费', text: 'WeChatElectBill' },
  { id: '4', textb: '口令红包', text: 'Pwdenvelope' },
  { id: '5', textb: '微信H5', text: 'WeChatH5' },
  { id: '6', textb: '淘宝零钱', text: 'TaobaoChange' },
  { id: '7', textb: '银行卡转账', text: 'bankTrans' },
];
// 全部状态数据
export const typeOptions = [
  { id: '-1', textb: '全部状态', text: 'allState' },
  { id: '1', textb: '已完成', text: 'completed' },
  { id: '2', textb: '已取消', text: 'cancelled' },
  { id: '3', textb: '处理中', text: 'processing' },
];
//日期下拉选项
export const dateOptions = [
  { id: '1', textb: '交易日期', query: 'all', text: 'transDate' },
  { id: '2', textb: '今天', query: 'today', text: 'now' },
  { id: '3', textb: '昨天', query: 'yesterday', text: 'yesterdays' },
  { id: '4', textb: '近七天', query: 'lastWeek', text: 'sevenDays' },
  { id: '5', textb: '近一个月', query: 'lastMonth', text: 'nearlyAmonth' },
];
// 综合
export const rechargeData = [
  { id: '0', textb: '全部方式', text: 'allStyle' },
  { id: '1', textb: '全部状态', text: 'allState' },
  { id: '2', textb: '交易日期', text: 'transDate' },
];

// 支付宝通道
export const aliTitle = [{ id: '0', textb: '请选择通道', text: 'pSelectChannel' }];


export const alibtnGroup = [
  {
    text: '20元',
    id: 1,
    expand: null,
  },
  {
    text: '30元',
    id: 2,
    expand: null,
  },
  {
    text: '50元',
    id: 3,
    expand: null,
  },
  {
    text: '100元',
    id: 4,
    expand: null,
  },
  {
    text: '200元',
    id: 5,
    expand: null,
  },
  {
    text: '300元',
    id: 6,
    expand: null,
  },
];


// 游戏提取 bonusTabs bonusCols bonusList gameRules 暂时没有用
// 大转盘游戏规则-温馨提示
export const gameRules = [
  {
    text: i18n.t('gameRules-1'),
    // text: '1.每5积分可进行一次积分摇奖。',
    id: 1,
  },
  {
    text: i18n.t('gameRules-2'),
    // text: '2.签到一次可获得5积分,每天限签到一次 。',
    id: 2,
  },
  {
    text: i18n.t('gameRules-3'),
    // text: '3.有效打码1000元可以获得1积分，即时到积分帐户 。',
    id: 3,
  },
  {
    text: i18n.t('gameRules-4'),
    // text: '4.转盘金额1.8元到18888元不等，只要积分馀额足够或是签到一次，即可参加摇奖。',
    id: 4,
  },
  {
    text: i18n.t('gameRules-5'),
    // text: '5.会员所获奖金需在2周内完成1倍奖金有效打码即可取款，过期将失效。',
    id: 5,
  },
  {
    text: i18n.t('gameRules-6'),
    // text: ' 6.积分在每年1月1日归零。 ',
    id: 6,
  },
  {
    text: i18n.t('gameRules-7'),
    // text: ' 7.本活动不与网站其它优惠冲突。 ',
    id: 7,
  },
  {
    text: i18n.t('gameRules-8'),
    // text: ' 8.本活动同姓名、同ip、同电话号码、同银行卡,依系统判定只能有一个帐户获得领取奖金机会，对于涉嫌套取本活动优事奖金会员，网站有权不予发放。 ',
    id: 8,
  },
  {
    text: i18n.t('gameRules-9'),
    // text: ' 9.本网站保留在任何时候终止或修改本活动规则及内容，最终解释权归本网站所有。 ',
    id: 9,
  },
];

export const bonusTabs = [
  { id: 1, textb: '未领取', text: i18n.t('unclaimed') },
  { id: 2, textb: '已领取', text: i18n.t('hasReceived') },
  { id: 3, textb: '已失效', text: i18n.t('lostEffectiveness') },
];
export const bonusCols = [
  {
    // title: '奖金金额',
    title: i18n.t('bonusAmount'),
    key: 'rewardScore',
  },
  {
    title: i18n.t('yardsRequired'),
    // title: '需要码量',
    key: 'needBetScore',
  },
  {
    title: i18n.t('validity'),
    // title: '有效期',
    key: 'validDate',
  },
  {
    title: i18n.t('status'),
    // title: '状态',
    key: 'status',
  },
];

export const bonusList = [
  {
    rewardScore: 100,
    needBetScore: 101,
    validDate: '2022-02-09 17:20:00 - 2023-02-09 17:20:00',
    status: i18n.t('nonactivated'),
    // status: '未激活',
  },
  {
    rewardScore: 100,
    needBetScore: 101,
    validDate: '2022-02-09 17:20:00 - 2023-02-09 17:20:00',
    status: i18n.t('nonactivated'),
    // status: '未激活',
  },
  {
    rewardScore: 100,
    needBetScore: 101,
    validDate: '2022-02-09 17:20:00 - 2023-02-09 17:20:00',
    status: i18n.t('nonactivated'),
    // status: '未激活',
  },
];

export const rechargeKeyList = new Map<number, string>([
  [1, '/recharge/enterUsdt'],
  [2, '/recharge/payRules'],
]);
