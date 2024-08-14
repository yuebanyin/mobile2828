import i18n from 'i18next';
import { REGEXOBJ } from './regex';
import themeblueyellowPng from '@/assets/image/common/theme-blueyellow.png';
import themeBlackgoldPng from '@/assets/image/common/theme-blackgold.png';
import themeWhiteBlue from '@/assets/image/common/theme-whiteblue.png';
// import themeWaitPng from '@/assets/image/common/theme-wait.png';

// 等级
import level0 from '@/assets/image/common/grade/level0.png';
import level1 from '@/assets/image/common/grade/level1.png';
import level2 from '@/assets/image/common/grade/level2.png';
import level3 from '@/assets/image/common/grade/level3.png';
import level4 from '@/assets/image/common/grade/level4.png';
import level5 from '@/assets/image/common/grade/level5.png';
import level6 from '@/assets/image/common/grade/level6.png';
import level7 from '@/assets/image/common/grade/level7.png';
import level8 from '@/assets/image/common/grade/level8.png';
import level9 from '@/assets/image/common/grade/level9.png';
import level10 from '@/assets/image/common/grade/level10.png';
import level11 from '@/assets/image/common/grade/level11.png';
import level12 from '@/assets/image/common/grade/level12.png';

import blevel0 from '@/assets/image/common/grade/big/level0.png';
import blevel1 from '@/assets/image/common/grade/big/level1.png';
import blevel2 from '@/assets/image/common/grade/big/level2.png';
import blevel3 from '@/assets/image/common/grade/big/level3.png';
import blevel4 from '@/assets/image/common/grade/big/level4.png';
import blevel5 from '@/assets/image/common/grade/big/level5.png';
import blevel6 from '@/assets/image/common/grade/big/level6.png';
import blevel7 from '@/assets/image/common/grade/big/level7.png';
import blevel8 from '@/assets/image/common/grade/big/level8.png';
import blevel9 from '@/assets/image/common/grade/big/level9.png';
import blevel10 from '@/assets/image/common/grade/big/level10.png';
import blevel11 from '@/assets/image/common/grade/big/level11.png';
import blevel12 from '@/assets/image/common/grade/big/level12.png';

// 默认展示导航栏的对应路由
export const showHeader = [
  /^\/$/,
  /^\/gamedesc$/,
  /^\/personinfo$/,
  /^\/personal\/\w*/,
];
// 默认展示底部的对应路由
export const showFooter = /^\/(home|preferential|recharge|mine)?$/;
// 自动展示公告弹窗的页面
export const openAutoPop = /^\/(home)?$/;

// 二级头部
export const showSecondaryHeader =
  /^\/((chatroom|login|register|forgetPsw|findwithdrawpsw)\/*|(preferential|mine|home|recharge|serCenter|serbusiness)\/+)/;

// 未登录的权限控制: 未登录非游客时能访问的路由
export const noSignAceRouter =
  /^\/(login|register|(outchatroom.*)|(forgetPsw.*)|(findwithdrawpsw.*)|(serCenter.*)|(serbusiness.*)|preferential(\/detail\??.*)?|chatroom|mine|home(\/(gameOption|pc28|classic|bitRacing)\??.*)?)?$/;

// 游客的路由权限，没有权限的路由 (试玩)
export const ykIceR =
  /^\/((home\/(sign|drawLottery).*)|(recharge.*)|(mine\/(audit|yueBao|quotaConvert|fundingTransf|betRecord|pointsRecord|rebate|reward|agentRegister|earnMoney|cWithdrawPsd).*))$/;

export const ykNRTip = '请登录正式账号';

// 设计稿全屏宽度 /10
export const fullWithUI = 108;

// aes 加密淄川
export const aesKey = '6dp726pzyidguxu7';
// 金额类的默认值
export const defaultAmount = '--.--';

// 跳转类型
export const linkType = {
  inner: 1, // 内跳（注意：后端给的不是路由，而是id)
  out: 2, // 外部
  act: 3, // 活动页
  game: -1, // 游戏类
  route: -2, // 内部跳转，直接返回路由
};

// 用户信息
export const initUserInfo = {
  account: '', // 账号称
  faceId: 0, // 用户头像
  gameLevel: '', // 用户等级
  mobile: '', // 用户手机号
  nickName: '', // 用户昵称
  qq: '',
  realName: '', // 用户真实姓名
  registerTime: '', // 用户注册时间
  wechat: '',
};

// 用户余额
export const initUserBalance = {
  mainBalance: defaultAmount, // 主账户余额
  agBalance: defaultAmount, // ag余额
  kyBalance: defaultAmount, // ky余额
  obtBalance: defaultAmount, // OB体育余额
  obsBalance: defaultAmount, // OB视讯余额
  obqBalance: defaultAmount, // OB棋牌余额
  obdBalance: defaultAmount, // OB电竞余额
  yuebaoBalance: defaultAmount, // 余额宝余额
  mainLoading: false,
  agLoading: false,
  kyLoading: false,
  obtLoading: false,
  obsLoading: false,
  obqLoading: false,
  obdLoading: false,
  yuebaoLoading: false,
};
// 用户余额对应的key值
export const userBalanceType = {
  main: 1, // 主账户对应key
  ag: 2, // ag对应key
  ky: 3, // ky对应key
  obt: 4, // OB体育余额对应key
  obs: 5, // OB视讯余额对应key
  obq: 6, // OB棋牌余额对应key
  obd: 7, // OB电竞余额对应key
  yuebao: 8, // 余额宝余额对应key
};

// 客服跳转地址
export const customerServiceUrl =
  'https://chatlink.mstatik.com/widget/standalone.html?eid=a3e731e30d4c268c7280ccf16ecf2e7e';

// 周
export const week: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// 时间相关
export const defaultTimeOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'short',
  hour12: false,
  timeZoneName: 'short',
  timeZone: 'America/New_York',
};

export const tableBar = [
  {
    // text: '首页',
    text: 'home',
    icon: '/home/home.png',
    actIcon: '/home/home-active.png',
    id: 1,
    to: '/home',
  },
  {
    // text: '优惠',
    text: 'discounts',
    icon: '/home/sale.png',
    actIcon: '/home/sale-active.png',
    id: 2,
    to: '/preferential',
  },
  {
    // text: '聊天',
    text: 'chat',
    icon: '/home/chat.png',
    actIcon: '/home/chat.png',
    id: 3,
    to: '/chatroom',
  },
  {
    // text: '充值',
    text: 'pay',
    icon: '/home/recharge.png',
    actIcon: '/home/recharge-active.png',
    id: 4,
    to: '/recharge',
  },
  {
    // text: '我的',
    text: 'my',
    icon: '/home/mine.png',
    actIcon: '/home/mine-active.png',
    id: 5,
    to: '/mine',
  },
];

/** 找回密码 */
export const findPSWFormItems = [
  {
    text: 'findAccount',
    name: 'account',
    placeholder: 'entryYourFindAccount',
    reg: REGEXOBJ.NUMBER_OR_LETTER_4_11,
    message: 'pleaseEnterAccount',
    // message: '请输入4-11位账号',
    maxlength: 11,
    Id: 1,
  },
  {
    text: 'entryNewPassword',
    name: 'password',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    message: 'pleaseEnterPwd8-12',
    // message: '请输入8-12位新密码',
    maxlength: 12,
    Id: 2,
    type: 'password',
  },
  {
    text: 'confirmLoginPSWPassword',
    name: 'confirmPassword',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    message: 'pleaseConfirmPwd8-12',
    // message: '请确认8-12位新密码',
    message1: 'enterTwoSamePassward',
    // message1: '两次输入的密码不一致，请重新输入',
    maxlength: 12,
    Id: 3,
    type: 'password',
  },
  {
    text: 'verifyCode',
    name: 'code',
    placeholder: 'entryVerifyCode',
    message: 'pleaseVerifi5Code',
    // message: '请输入5位验证码',
    reg: REGEXOBJ.NUMBER_5,
    Id: 4,
    maxlength: 5,
    type: 'number',
  },
];

export const withdrawPsw = [
  {
    text: 'entryNewPassword',
    name: 'password',
    placeholder: 'numberOrLetter_6_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    message: 'pleaseEnterPwd6-12',
    // message: '请输入6-12位新密码',
    maxlength: 12,
    Id: 2,
    type: 'password',
  },
  {
    text: 'confirmLoginPSWPassword',
    name: 'confirmPassword',
    placeholder: 'numberOrLetter_6_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    message: 'pleaseConfirmPwd6-12',
    // message: '请确认6-12位新密码',
    message1: 'enterTwoSamePassward',
    // message1: '两次输入的密码不一致，请重新输入',
    maxlength: 12,
    Id: 3,
    type: 'password',
  },
];

export const findPswFormItems = [
  {
    text: 'password',
    name: 'password',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    required: true,
    message: i18n.t('enterPassword'),
    // message: '请输入8-12位密码',
    maxlength: 12,
  },
  {
    text: 'rePassword',
    name: 'confirmPassword',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    required: true,
    message: i18n.t('enterTwoSamePassward'),
    // message: '两次输入的密码不一致，请重新输入',
    maxlength: 12,
  },
];

export const registryFormItems = [
  {
    text: 'username',
    name: 'account',
    placeholder: 'numberOrLetter_4_11',
    reg: REGEXOBJ.NUMBER_OR_LETTER_4_11,
    required: true,
    message: 'pleaseEnterAccount',
    // message: '请输入4-11位账号',
    maxlength: 11,
    Id: 1,
  },
  {
    text: 'nickname',
    name: 'nickName',
    placeholder: 'chineseNumberOrLetter_2_8',
    reg: REGEXOBJ.CHINESENUMBERORLETTER_2_8,
    maxlength: 8,
    message: 'pleaseEnternickname',
    // message: '请输入2-8位昵称',
    Id: 2,
  },
  {
    text: 'password',
    name: 'password',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    required: true,
    message: 'enterPassword',
    // message: '请输入8-12位密码',
    maxlength: 12,
    Id: 3,
    type: 'password',
  },
  {
    text: 'rePassword',
    name: 'confirmPassword',
    placeholder: 'numberOrLetter_8_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    required: true,
    message: 'enterTwoSamePassward',
    // message: '两次输入的密码不一致，请重新输入',
    maxlength: 12,
    Id: 4,
    type: 'password',
  },
  {
    text: 'withdrawPSW',
    name: 'withdrawPassword',
    placeholder: 'numberOrLetter_6_12',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    maxlength: 12,
    message: 'pleaseEnterWithdrawPwd6-12',
    // message: '请输入6-12位提现密码',
    Id: 5,
    type: 'password',
  },
  {
    text: 'relName',
    name: 'realName',
    placeholder: 'entryRelName',
    reg: REGEXOBJ.CHINESEORLETTER_2_20,
    required: true,
    message: 'enter_2_20_name',
    // message: '请输入2-20位真实姓名',
    Id: 6,
  },
  {
    text: 'phone',
    name: 'mobliePhone',
    placeholder: 'entryPhone',
    reg: REGEXOBJ.NUMBER,
    required: true,
    message: 'pleaseEnterphone',
    // message: '请输入正确的手机号码',
    maxlength: 11,
    Id: 7,
    type: 'number',
  },
  {
    text: 'whatNumber',
    name: 'weChat',
    placeholder: 'entryWeChat',
    reg: REGEXOBJ.WECHAT,
    message: 'entryExactnessWeChat',
    // message: '请输入正确的微信号',
    Id: 8,
  },
  {
    text: 'qqNumber',
    name: 'qq',
    placeholder: 'entryQQ',
    reg: REGEXOBJ.QQ,
    message: 'entryQQ',
    // message: '请输入正确的QQ号',
    Id: 9,
  },
  {
    text: 'spreadCode',
    name: 'spreadCode',
    placeholder: 'entrySpreadCode',
    Id: 10,
  },
  {
    text: 'verifyCode',
    name: 'VerifyCode',
    placeholder: 'entryVerifyCode',
    message: 'entryVerifyCode',
    // message: '请输入验证码',
    Id: 11,
    maxlength: 5,
    type: 'number',
  },
];

// 代理注册数据 与接口Id匹配 顺序不能动
export const agentRegistryFormItems = [
  {
    text: 'account',
    name: 'LoginName',
    placeholder: 'numberOrLetter_6_12',
    required: true,
    message: 'pleaseEnterAccount6-12',
    // message: i18n.t('pleaseEnterAccount6-12'),
    // message: '请输入6-12位账号',
    reg: REGEXOBJ.NUMBER_OR_LETTER_6_12,
    maxlength: 11,
    Id: 1,
  },
  {
    text: 'password',
    name: 'LoginPwd',
    placeholder: 'numberOrLetter_8_12',
    required: true,
    message: 'enterPassword',
    // message: '请输入8-12位密码',
    reg: REGEXOBJ.NUMBER_OR_LETTER_8_12,
    maxlength: 12,
    Id: 2,
  },
  {
    text: 'relName',
    name: 'RealName',
    placeholder: 'mustSameWithBankUserName',
    required: true,
    message: 'pleaseEnterName',
    // message: '请输入正确的真实姓名',
    Id: 3,
  },

  {
    text: 'phone',
    name: 'MobilePhone',
    placeholder: 'entryPhone',
    required: true,
    message: 'phoneLength',
    // message: '请输入6-11位手机号码',
    reg: REGEXOBJ.PHONE_6_11,
    maxlength: 11,
    Id: 4,
  },
  {
    text: 'qqNumber',
    name: 'QQNumber',
    placeholder: 'entryQQ',
    required: false,
    message: 'entryQQ',
    // message: '请输入正确的QQ',
    reg: REGEXOBJ.QQ,
    Id: 5,
  },
  {
    text: 'email',
    name: 'Email',
    placeholder: 'entryEmail',
    required: false,
    message: 'pleaseEnterEmail',
    // message: '请输入正确的Email',
    Id: 6,
  },

  {
    text: 'bankOName',
    name: 'BankId',
    placeholder: 'entryBank',
    required: false,
    message: 'entryBank',
    // message: '请选择开户银行',
    Id: 7,
  },
  {
    text: 'bankCardNumber',
    name: 'BankAccount',
    placeholder: 'entryBankCardId',
    required: false,
    message: 'bankCardNumberMsg',
    // message: '请输入正确的银行卡号',
    reg: REGEXOBJ.BANKNUMBER_LETTER_10_20,
    maxlength: 20,
    Id: 8,
  },
  {
    text: 'bankAddress',
    name: 'BankAddress',
    placeholder: 'entryBankAddress',
    required: false,
    message: 'entryBankAddress',
    // message: '请选择开户地址',
    Id: 9,
  },
  {
    text: 'verifyCode',
    name: 'VerifyCode',
    placeholder: 'entryVerifyCode',
    message: 'entryVerifyCode',
    // message: '请输入验证码',
    Id: 10,
    maxlength: 5,
    type: 'number',
  },
];

// 注册页-温馨提示
export const regKindTips = [
  { text: 'Rrequired_ield', id: 1 },
  {
    text: 'openingAgreement',
    id: 2,
    special: '“开户协议”',
    // special: '“开户协议”',
    specialcn: 'color-red',
  },
];

// 统一-温馨提示
export const sameKindTips = [
  {
    // text: '1.提现时需完善银行信息，请前往【我的-设置- 绑定银行卡】完善银行信息，并设置提现密码',
    text: 'KindTips-1',
    id: 1,
  },
  { text: 'KindTips-2', id: 2 },
];

export const yuebaoKindTips = [
  {
    // text: '1.提现时需完善银行信息，请前往【我的-设置- 绑定银行卡】完善银行信息，并设置提现密码',
    text: 'ykindTips-1',
    id: 1,
  },
  { text: 'ykindTips-2', id: 2 },
  { text: 'ykindTips-3', id: 3 },
  { text: 'ykindTips-4', id: 4 },
];


// 统一-客服温馨提示
export const kefuKindTips = [
  { text: '1.若需修改提现账户信息，请联系客服修改', id: 1 },
  { text: '2.若无特殊需求情况，约3-5分钟即可到账，请耐心等待；', id: 2 },
];

// 统一-绑定银行卡温馨提示
export const bindBankKindTips = [
  {
    text: 'sameName',
    id: 1,
  },
  { text: 'userMaxThreeAccount', id: 2 },
  { text: 'editCardToCustomer', id: 3 },
];

// 统一-绑定银行卡详情温馨提示
export const bindBankDetailKindTips = [
  { text: 'KindTips-3', id: 1 },
  { text: 'KindTips-4', id: 2 },
];

// 统一-绑定usdt温馨提示
export const bindUsdtKindTips = [
  { text: 'viewOperationHelp', id: 1 },
  { text: 'bindAgreement', id: 2 },
  { text: 'USDT-TRON_agreement', id: 3 },
];

// 统一-修改登录密码温馨提示
export const modifyLoginPsdKindTips = [
  { text: 'forgetCustomerService', id: 1 },
  { text: 'passwordConsistency', id: 2 },
  { text: 'noLeakagePassword', id: 3 },
];

// 统一-修改提现密码温馨提示
export const modifyWithdrawPsdKindTips = [
  { text: 'forgetCustomerService', id: 1 },
  { text: 'passwordConsistency', id: 2 },
  { text: 'noLeakagePassword', id: 3 },
];

// 个性换肤
export const themeList = [
  { url: themeblueyellowPng, title: '蓝黄皮肤', key: 'blueyellow' },
  { url: themeBlackgoldPng, title: '黑金皮肤', key: 'blackgold' },
  { url: themeWhiteBlue, title: '紫蓝皮肤', key: 'whiteblue' },
  // { url: themeWaitPng, title: '敬请期待', key: 'wait' },
];

/** 项目版本 */
export const themesMap = {
  blackgold: {
    name: '黑金版',
    key: 2,
  },
  blueyellow: {
    name: '',
    key: 1,
  },
  whiteblue: {
    name: '紫蓝版',
    key: 3,
  },
};

/**
 * 二级以下页面标题
 */
export const secondaryTitle = {
  outchatroom: {
    title: '咨询',
    titleKey: 'consult',
  },
  chatroom: {
    title: '聊天室',
    titleKey: 'chatroom',
  },
  chatroomsendRedpacket: {
    title: '发红包',
    titleKey: 'sendEnvelopes',
  },
  minequotaConvert: {
    title: '额度转换',
    titleKey: 'quotaConversion',
  },
  mineaudit: {
    title: '稽核',
    titleKey: 'audit',
  },
  mineauditwithdraw: {
    title: '提现',
    titleKey: 'Withdraw',
  },
  mineauditwithdrawcInfo: {
    title: '提现信息',
    titleKey: 'withdrawInfo',
  },
  mineauditwithdrawuInfo: {
    title: '提现信息',
    titleKey: 'withdrawInfo',
  },
  mineauditwithdrawgInfo: {
    title: '提现信息',
    titleKey: 'withdrawInfo',
  },
  minemodifyData: {
    title: '修改资料',
    titleKey: 'modifyInfo',
  },
  mineyueBao: {
    title: '余额宝',
    titleKey: 'yuerbao',
  },
  mineyuebaorateCalculation: {
    title: '收益计算器',
    titleKey: 'earningsCalc',
  },
  minefundingTransf: {
    title: '资金明细',
    titleKey: 'fundDetail',
  },
  minefundingTransfrechargeDetail: {
    title: '充值明细',
    titleKey: 'rechargeSheet',
  },
  minefundingTransfwithdrawDetail: {
    title: '提现明细',
    titleKey: 'embodyDetails',
  },
  minefundingTransfyueBaoDetail: {
    title: '余额宝明细',
    titleKey: 'yuerbaoDetail',
  },
  minefundingTransfquotaConvertDetail: {
    title: '额度转换明细',
    titleKey: 'transformDetail',
  },
  minefundingTransftradeDetail: {
    title: '交易明细',
    titleKey: 'transactionDetail',
  },
  minefundingTransfenvelopeDetail: {
    title: '红包明细',
    titleKey: 'redpacketsDetail',
  },
  minefundingTransfenvelopeDetailenvelopeList: {
    title: '红包明细详情',
    titleKey: 'envelopeDetails',
  },
  minebetRecord: {
    title: '投注记录',
    titleKey: 'bettingRecord',
  },
  minebetRecorddetail: {
    title: '投注详情',
    titleKey: 'bettingDetail',
  },
  minepointsRecord: {
    title: '积分记录',
    titleKey: 'integralRecord',
  },
  minerebate: {
    title: '会员返水',
    titleKey: 'memberRebate',
  },
  minerebatedetail: {
    title: '会员返水',
    titleKey: 'memberRebate',
  },
  minerebateexplan: {
    title: '返水说明',
    titleKey: 'rebateInfo',
  },
  minereward: {
    title: '奖金',
    titleKey: 'bonus',
  },
  mineagentRegister: {
    title: '代理注册',
    titleKey: 'proxyRegistration',
  },
  mineearnMoney: {
    title: '推广赚钱',
    titleKey: '',
  },
  mineearnMoneyproBonus: {
    title: '推广赚钱',
    titleKey: 'promoteToMoney',
  },
  minecuService: {
    title: '客服',
    titleKey: 'service',
  },
  minesetUp: {
    title: '设置',
    titleKey: 'setting',
  },
  minesetUpbindBankCard: {
    title: '绑定银行卡',
    titleKey: 'bindBankCard',
  },
  minesetUpbindBankCarddetail: {
    title: '绑定银行卡',
    titleKey: 'bindBankCard',
  },
  minesetUpbindUsdt: {
    title: '绑定USDT',
    titleKey: 'bindUSDT',
  },
  minesetUpbindGoPay: {
    title: '绑定GoPay',
    titleKey: 'bindGoPay',
  },
  minesetUpbindGoPaydetail: {
    title: 'GoPay',
    titleKey: 'goPay',
  },
  minesetUpmodifyWithdrawPassword: {
    title: '更改提现密码',
    titleKey: 'modifyWithdrawPwd',
  },
  minesetUpmodifyLoginPassword: {
    title: '更改登录密码',
    titleKey: 'modifyLoginPwd',
  },
  minecWithdrawPsd: {
    title: '创建提现密码',
    titleKey: 'creatWithdrawPwd',
  },
  mineabout: {
    title: '关于',
    titleKey: 'about',
  },
  mineannounce: {
    title: '公告消息',
    titleKey: 'announceInfo',
  },
  mineannounceinfo: {
    title: '消息内容',
    titleKey: 'msgContent',
  },
  homegameOption: {
    title: '游戏房间',
    titleKey: 'gamesRoom',
  },
  homelotteryTrend: {
    title: '开奖走势',
    titleKey: 'drawingTrend',
  },
  homelotteryTrendtrendCharts: {
    title: '走势图表',
    titleKey: 'trendChart',
  },
  homedrawLottery: {
    title: '积分摇奖',
    titleKey: 'pointsLottery',
  },
  homedrawLotterydrawRules: {
    title: '积分摇奖',
    titleKey: 'pointsLottery',
  },
  homedrawLotterybonusOut: {
    title: '奖金',
    titleKey: 'bonus',
  },
  homecheckIn: {
    title: '签到有奖',
    titleKey: 'signAward',
  },
  homeleaderBoard: {
    title: '排行榜',
    titleKey: 'rankList',
  },
  homegameTrend: {
    title: '开奖走势',
    titleKey: 'drawingTrend',
  },
  homegameTrendtrendChart: {
    title: '开奖走势',
    titleKey: 'drawingTrend',
  },
  login: {
    title: '登录',
    type: 'login',
    titleKey: 'signIn',
  },
  register: {
    title: '注册',
    type: 'register',
    titleKey: 'registry',
  },
  forgetPsw: {
    title: '找回密码',
    type: 'forgetPsw',
    titleKey: 'findCode',
  },
  findwithdrawpsw: {
    title: '找回提现密码',
    titleKey: 'findWithdrawPwd',
  },
  preferentialdetail: {
    title: '优惠活动',
    titleKey: 'specialOffer',
  },
  rechargealipay: {
    title: '存款通道',
    titleKey: 'depositChannel',
  },
  rechargeenterUsdt: {
    title: '存款通道',
    titleKey: 'depositChannel',
  },
  rechargebankTransf: {
    title: '存款通道',
    titleKey: 'depositChannel',
  },
  rechargeofflinePay: {
    title: '存款通道',
    titleKey: 'depositChannel',
  },
  rechargepayRules: {
    title: '存款通道',
    titleKey: 'depositChannel',
  },
  serCentercuService: {
    title: '客服',
    titleKey: 'service',
  },
  homemarkSix: {
    title: '香港六合彩',
    titleKey: 'HKMarkSix',
  },
  homelotteryTrendbitcoin: {
    title: '比特币1分28',
    titleKey: 'btb_1_28',
  },
  serbusinesscurbusiness: {
    title: '商务合作',
    titleKey: 'businessCooperation',
  },
  homelotteryTrendtaiwan: {
    title: '台湾宾果28',
    titleKey: 'TW_BG_28',
  },
  homelotteryTrendcanada: {
    title: '加拿大28',
    titleKey: 'Canada_28',
  },
  homelotteryTrendcanadaWest: {
    title: '加拿大西28',
    titleKey: 'Canad_West_28',
  },
  homelotteryTrendcanadaPc: {
    title: '加拿大PC28',
    titleKey: 'Canad_PC_28',
  },
  homelotteryTrendluckyAs: {
    title: '幸运飞艇',
    titleKey: 'luckAirship',
  },
  homelotteryTrendmarkSix: {
    title: '香港六合彩',
    titleKey: 'HKMarkSix',
  },
  homelotteryTrendauTen: {
    title: '澳洲幸运10',
    titleKey: 'Australian_Luck_10',
  },
  homelotteryTrendauFive: {
    title: '澳洲幸运5',
    titleKey: 'Australian_Luck_5',
  },
  homelotteryTrendbitRacing: {
    title: '比特币1分赛车',
    titleKey: 'btb_1_car',
  },
  homelotteryTrendsloLuckyFive: {
    title: '斯洛伐克幸运5',
    titleKey: 'Slovakia_Luck_5',
  },
  homelotteryTrendcanLuckyFive: {
    title: '加拿大幸运5',
    titleKey: 'Canada_luck_5',
  },
  homesign: {
    title: '签到领奖',
    titleKey: 'SignToPrizes',
  },
  minelotteryLimit: {
    title: '彩种限额',
    titleKey: 'colorLimit',
  },
  minelotteryLimitinfo: {
    title: '彩种限额',
    titleKey: 'colorLimit',
  },
  minecurrentBet: {
    title: '当期下注',
    titleKey: 'currentBet',
  },
  minegameRules: {
    title: '游戏规则',
    titleKey: 'gameRule',
  },
};

export const nGameList = [
  2801, 2802, 2803, 2804, 2901, 2902, 2903, 2904, 2905, 3102, 3202, 3203, 3501,
  3402,
];

export const strTimerList = {
  2801: i18n.t('notOpen'),
  2802: i18n.t('notOpen'),
  2803: i18n.t('notOpen'),
  2804: i18n.t('notOpen'),
  2901: i18n.t('notOpen'),
  2902: i18n.t('notOpen'),
  2903: i18n.t('notOpen'),
  2904: i18n.t('notOpen'),
  2905: i18n.t('notOpen'),
  3102: i18n.t('notOpen'),
  3202: i18n.t('notOpen'),
  3203: i18n.t('notOpen'),
  3501: i18n.t('notOpen'),
  3402: i18n.t('notOpen'),
};

// 用户等级
export const gradeList = [
  { name: '试玩', icon: level0, bIcon: blevel0, titleKey: 'demo' },
  { name: '士兵', icon: level1, bIcon: blevel1, titleKey: 'S-GL-1' },
  { name: '班长', icon: level2, bIcon: blevel2, titleKey: 'S-GL-2' },
  { name: '排长', icon: level3, bIcon: blevel3, titleKey: 'S-GL-3' },
  { name: '连长', icon: level4, bIcon: blevel4, titleKey: 'S-GL-4' },
  { name: '营长', icon: level5, bIcon: blevel5, titleKey: 'S-GL-5' },
  { name: '团长', icon: level6, bIcon: blevel6, titleKey: 'S-GL-6' },
  { name: '旅长', icon: level7, bIcon: blevel7, titleKey: 'S-GL-7' },
  { name: '师长', icon: level8, bIcon: blevel8, titleKey: 'S-GL-8' },
  { name: '军长', icon: level9, bIcon: blevel9, titleKey: 'S-GL-9' },
  { name: '司令', icon: level10, bIcon: blevel10, titleKey: 'S-GL-10' },
  { name: '元帅', icon: level11, bIcon: blevel11, titleKey: 'S-GL-11' },
  { name: '主席', icon: level12, bIcon: blevel12, titleKey: 'S-GL-12' },
];
