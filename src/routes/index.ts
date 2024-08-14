import { lazy } from 'react';
import { LazyImportComponent } from '@/components';

// layout 组件不做懒加载
import Layout from '@/layouts';

// 需要懒加载的组件
const Mistake = lazy(() /** 404 */ => import('@/pages/404'));
const Demo = lazy(() /** 样例 */ => import('@/pages/demo'));
const Login = lazy(() /** 登录 */ => import('@/pages/login'));
const ForgetPsw = lazy(() /** 找回密码 */ => import('@/pages/forgetPsw'));
const ForgetWithDrawPsw = lazy(
  () /** 找回密码 */ => import('@/pages/forgetWithDrawPsw')
);
const Register = lazy(() /** 注册 */ => import('@/pages/register'));
const Home = lazy(() /** 首页 */ => import('@/pages/home'));
const Preferential = lazy(() /** 优惠 */ => import('@/pages/preferential'));
const PreferentialDetail = lazy(
  () /** 优惠详情页 */ => import('@/pages/preferential/detail')
);
const Recharge = lazy(() /** 充值 */ => import('@/pages/recharge'));
const Mine = lazy(() /** 我的 */ => import('@/pages/mine'));
const ChatRoom = lazy(() /** 聊天室 */ => import('@/pages/chatRoom'));
const OutChatRoom = lazy(() /** 聊天室 */ => import('@/pages/outChatRoom'));

/********************** 聊天室下的二级页面****************** */
const SendRedpacket = lazy(
  () /** 发送红包 */ => import('@/pages/chatRoom/sendRedpacket')
);

/********************** 客服下的二级页面****************** */
const CustomerService = lazy(
  () /** 客服 */ => import('@/pages/serviceCenter/customerService')
);
const ServiceCenter = lazy(
  () /** 客服中心 */ => import('@/pages/serviceCenter')
);

/********************** 客服下的二级页面****************** */
const ServiceBusiness = lazy(
  () /** 商务合作 */ => import('@/pages/serviceBusiness')
);

const CurBusiness = lazy(
  () /** 商务合作-客服 */ => import('@/pages/serviceBusiness/curBusiness')
);

/********************** 充值下的二级页面****************** */
// const Alipay = lazy(() /** 充值 */ => import('@/pages/recharge/alipay'));
const EnterUsdt = lazy(
  () /** USDT充值 */ => import('@/pages/recharge/enterUsdt')
);
const PayRules = lazy(
  () /** USDT充值 */ => import('@/pages/recharge/payRules')
);
// const BankTransf = lazy(() /** 银行卡充值 */ => import('@/pages/recharge/bankTransf'));
// const OfflinePay = lazy(() /** 线下支付充值 */ => import('@/pages/recharge/offlinePay'));

/**********************我的页面下的二级页面****************** */
const ModifyData = lazy(
  () /** 修改资料 */ => import('@/pages/mine/modifyData')
);
const CreateWithdrawPsd = lazy(
  () /** 创建提现密码 */ => import('@/pages/mine/createWithdrawPsw')
);
const Audit = lazy(() /** 提现稽核 */ => import('@/pages/mine/audit'));
const YueBao = lazy(() /** 余额宝 */ => import('@/pages/mine/yueBao'));
const QuotaConvert = lazy(
  () /** 额度转换 */ => import('@/pages/mine/quotaConvert')
);
const FundingTransf = lazy(
  () /** 资金明细 */ => import('@/pages/mine/fundingTransf')
);
const BetRecord = lazy(() /** 投注记录 */ => import('@/pages/mine/betRecord'));
const PointsRecord = lazy(
  () /** 积分记录 */ => import('@/pages/mine/pointsRecord')
);
const Rebate = lazy(() /** 会员返水 */ => import('@/pages/mine/rebate'));
const Reward = lazy(() /** 红包和奖金r */ => import('@/pages/mine/reward'));
const AgentRegister = lazy(
  () /** 代理注册 */ => import('@/pages/mine/agentRegister')
);
const EarnMoney = lazy(() /** 推广赚钱 */ => import('@/pages/mine/earnMoney'));

const SetUp = lazy(() /** 设置 */ => import('@/pages/mine/setUp'));
const About = lazy(() /** 关于 */ => import('@/pages/mine/about'));
const AboutDetail = lazy(
  () /** 关于详情页 */ => import('@/pages/mine/about/aboutDetail')
);
const Announcement = lazy(
  () /** 公告消息 */ => import('@/pages/mine/announce')
);
const LotteryLimit = lazy(
  () /** 彩种限额 */ => import('@/pages/mine/lotteryLimit')
);
const LotteryInfo = lazy(
  () /** 彩种限额详情 */ => import('@/pages/mine/lotteryLimit/lotteryLimitInfo')
);
const CurrentBet = lazy(
  () /** 当期下注 */ => import('@/pages/mine/currentBet')
);
const GameRules = lazy(() /** 游戏规则 */ => import('@/pages/mine/gameRules'));
const GameRulesDetail = lazy(
  () /** 游戏规则 */ => import('@/pages/mine/gameRules/rulesDetail')
);

/**********************home页面进入二级页面****************** */
const GameOption = lazy(
  () /** pc28进入的游戏房选项 */ => import('@/pages/home/gameOption')
);
const DrawLottery = lazy(
  () /** 积分摇奖r */ => import('@/pages/home/drawLottery')
);
const LotteryTrend = lazy(
  () /** 开奖走势 */ => import('@/pages/home/lotteryTrend')
);
const SignForPrizes = lazy(
  () /** 签到领奖 */ => import('@/pages/home/signForPrizes')
);
const CheckIn = lazy(() /** 签到有奖 */ => import('@/pages/home/checkIn'));
// const HkMarkSix = lazy(() /** 香港六合彩 */ => import('@/pages/home/games/game2903'));
// const CanadaPc = lazy(() /** 加拿大Pc28 */ => import('@/pages/home/games/game2901'));
// const LuckyAirship = lazy(() /** 幸运飞艇 */ => import('@/pages/home/games/game2902'));
// const AuLuckTen = lazy(() /** 澳洲幸运10 */ => import('@/pages/home/games/game2904'));
// const AULuckyFive = lazy(() /** 澳洲幸运5 */ => import('@/pages/home/games/game2905'));
// const BitcoinRacing = lazy(() /** 比特币1分赛车 */ => import('@/pages/home/games/game3102'));
// const SlovakLuckyFive = lazy(() /** 斯洛伐克幸运5 */ => import('@/pages/home/games/game3202'));
// const CanadianLuckyFive = lazy(() /** 加拿大幸运5 */ => import('@/pages/home/games/game3203'));
const ClassicGame = lazy(
  () /** 经典彩游戏 */ => import('@/pages/home/games/classicGame')
);
const Pc28Game = lazy(() /** pc28游戏 */ => import('@/pages/home/pc28Games'));
const Pc28GameRoom = lazy(
  () /** pc28游戏入口 */ => import('@/pages/home/pc28Games/Room')
);
const FollowUpPlan = lazy(
  () /** pc28游戏跟单计划 */ => import('@/pages/home/pc28Games/followUpPlan')
);
const FollowUpPlanDetail = lazy(
  () /** pc28游戏跟单计划详情 */ =>
    import('@/pages/home/pc28Games/followUpPlan/Detail')
);
const LeaderBoard = lazy(
  () /** 排行榜 */ => import('@/pages/home/leaderBoard')
);

/**********************开奖走势页面进入三级页面****************** */
const TrendCharts = lazy(
  () /** 走势图标 */ => import('@/pages/home/lotteryTrend/trendCharts')
);
const GamesFifty = lazy(
  () /** 五十条记录页面: */ =>
    import('@/pages/home/lotteryTrend/2801FiftyRecords')
);

/**********************资金明细页面下的三级页面****************** */
const RechargeDetail = lazy(
  () /** 充值明细 */ => import('@/pages/mine/fundingTransf/rechargeDetail')
);
const WithdrawDetail = lazy(
  () /** 提现明细 */ => import('@/pages/mine/fundingTransf/withdrawDetail')
);
const YueBaoDetail = lazy(
  () /** 余额宝明细 */ => import('@/pages/mine/fundingTransf/yueBaoDetail')
);
const QuotaConvertDetail = lazy(
  () /** 额度转换明细 */ =>
    import('@/pages/mine/fundingTransf/quotaConvertDetail')
);
const TradeDetail = lazy(
  () /** 交易明细 */ => import('@/pages/mine/fundingTransf/tradeDetail')
);
const EnvelopeDetail = lazy(
  () /** 红包明细 */ => import('@/pages/mine/fundingTransf/envelopeDetail')
);
const EnvelopeList = lazy(
  () /** 红包明细 */ =>
    import('@/pages/mine/fundingTransf/envelopeDetail/envelopeList')
);
/**********************推广赚钱页面下的三级页面****************** */
const ProBonus = lazy(
  () /** 推广红利会员 */ => import('@/pages/mine/earnMoney/proBonus')
);
/**********************会员返水下的三级页面****************** */
const RebateDetail = lazy(
  () /** 会员返水详情 */ => import('@/pages/mine/rebate/detail')
);
const RebateExplan = lazy(
  () /** 会员返水说明 */ => import('@/pages/mine/rebate/explanation')
);
/**********************设置页面下的三级页面****************** */
const BindBankCard = lazy(
  () /** 绑定银行卡 */ => import('@/pages/mine/setUp/bindBankCard')
);
const BindBankCardDetail = lazy(
  () /** 绑定银行卡明细 */ =>
    import('@/pages/mine/setUp/bindBankCard/bindBankCardDetail')
);
const BindUsdt = lazy(
  () /** 绑定USDT */ => import('@/pages/mine/setUp/bindUsdt')
);
const BindGoPay = lazy(
  () /** 绑定GoPay */ => import('@/pages/mine/setUp/bindGoPay')
);
const BindGoPayDetail = lazy(
  () /** 绑定GoPay */ => import('@/pages/mine/setUp/bindGoPay/bindGoPayDetail')
);
const ModifyWithdrawPassword = lazy(
  () /** 修改提现密码 */ => import('@/pages/mine/setUp/modifyWithdrawPassword')
);
const ModifyLoginPassword = lazy(
  () /** 修改登录密码 */ => import('@/pages/mine/setUp/modifyLoginPassword')
);
/**********************稽核下的页面****************** */
const Withdraw = lazy(() /** 提现 */ => import('@/pages/mine/audit/withdraw'));
const CardInfo = lazy(
  () /** 银行卡提现 */ => import('@/pages/mine/audit/withdraw/cardInfo')
);
const UsdtInfo = lazy(
  () /** USDT提现 */ => import('@/pages/mine/audit/withdraw/usdtInfo')
);
const GoPayInfo = lazy(
  () /** GoPay提现 */ => import('@/pages/mine/audit/withdraw/goPayInfo')
);
/**********************公告信息下的三级页面****************** */
const AnnounceInfo = lazy(
  () /** 公告消息内容 */ => import('@/pages/mine/announce/announceInfo')
);

/**********************PC28选房间下的三级页面****************** */
const PlayRule = lazy(
  () /** 玩法规则 */ => import('@/pages/home/gameOption/playRule')
);

/**********************投注记录下的三级页面****************** */
const BetRecordDetail = lazy(
  () /** 投注记录 */ => import('@/pages/mine/betRecord/betRecordInfo')
);
/**********************余额宝下的三级页面****************** */
const RateCalculation = lazy(
  () /** 余额宝收益计算 */ => import('@/pages/mine/yueBao/rateCalculation')
);
const RollInOut = lazy(
  () /** 余额宝转入转出 */ => import('@/pages/mine/yueBao/rollInOut')
);
const YuEBaoDetail = lazy(
  () /** 余额宝明细 */ => import('@/pages/mine/yueBao/detail')
);

/**********************积分摇奖下的三级页面****************** */
// const DrawRules = lazy(() /** 活动规则 */ => import('@/pages/home/drawLottery/drawRules'));
// const BonusOut = lazy(() /** 奖金提取 */ => import('@/pages/home/drawLottery/bonusOut'));

/**********************大厅红包****************** */
// const HallRedpacket = lazy(() /** 大厅红包领取 */ => import('@/pages/hallRedpack'));
// const RedPPlayRule = lazy(() /** 大厅红包玩法规则 */ => import('@/pages/hallRedpack/PlayRule'));

export const routes = [
  {
    path: '/',
    element: LazyImportComponent({ lazyChildren: Layout }),
    children: [
      {
        path: '',
        element: LazyImportComponent({ lazyChildren: Home }),
      },
      {
        path: 'demo',
        element: LazyImportComponent({ lazyChildren: Demo }),
      },
      {
        path: 'serCenter',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: ServiceCenter }),
          },
          {
            path: 'cuService',
            element: LazyImportComponent({ lazyChildren: CustomerService }),
          },
        ],
      },
      {
        path: 'serbusiness',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: ServiceBusiness }),
          },
          {
            path: 'curbusiness',
            element: LazyImportComponent({ lazyChildren: CurBusiness }),
          },
        ],
      },
      { path: 'login', element: LazyImportComponent({ lazyChildren: Login }) },
      {
        path: 'register',
        element: LazyImportComponent({ lazyChildren: Register }),
      },
      {
        path: 'forgetPsw',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: ForgetPsw }),
          },
        ],
      },
      {
        path: 'findwithdrawpsw',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: ForgetWithDrawPsw }),
          },
        ],
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: Home }),
          },
          {
            path: 'checkIn',
            element: LazyImportComponent({ lazyChildren: CheckIn }),
          },
          {
            path: 'classic',
            element: LazyImportComponent({ lazyChildren: ClassicGame }),
          },
          {
            path: 'pc28',
            element: LazyImportComponent({ lazyChildren: Pc28Game }),
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: Pc28GameRoom }),
              },
              {
                path: 'followupplan',
                children: [
                  {
                    path: '',
                    element: LazyImportComponent({
                      lazyChildren: FollowUpPlan,
                    }),
                  },
                  {
                    path: 'detail',
                    element: LazyImportComponent({
                      lazyChildren: FollowUpPlanDetail,
                    }),
                  },
                ],
              },
            ],
          },
          {
            path: 'leaderBoard',
            element: LazyImportComponent({ lazyChildren: LeaderBoard }),
          },
          {
            path: 'gameOption',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: GameOption }),
              },
              {
                path: 'playRule',
                element: LazyImportComponent({ lazyChildren: PlayRule }),
              },
            ],
          },
          {
            path: 'drawLottery',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: DrawLottery }),
              },
              // {
              //   path: 'drawRules',
              //   element: LazyImportComponent({ lazyChildren: DrawRules }),
              // },
              // {
              //   path: 'bonusOut',
              //   element: LazyImportComponent({ lazyChildren: BonusOut }),
              // },
            ],
          },
          {
            path: 'lotteryTrend',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: LotteryTrend }),
              },
              {
                path: 'trendCharts',
                element: LazyImportComponent({ lazyChildren: TrendCharts }),
              },
              {
                path: 'gamesFifty',
                element: LazyImportComponent({ lazyChildren: GamesFifty }),
              },
            ],
          },
          {
            path: 'sign',
            element: LazyImportComponent({ lazyChildren: SignForPrizes }),
          },
        ],
      },
      {
        path: 'preferential',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: Preferential }),
          },
          {
            path: 'detail',
            element: LazyImportComponent({ lazyChildren: PreferentialDetail }),
          },
        ],
      },
      {
        path: 'chatroom',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: ChatRoom }),
          },
          {
            path: 'sendRedpacket',
            element: LazyImportComponent({ lazyChildren: SendRedpacket }),
          },
        ],
      },
      {
        path: 'outchatroom',
        element: LazyImportComponent({ lazyChildren: OutChatRoom }),
      },
      {
        path: 'recharge',
        // element: LazyImportComponent({ lazyChildren: Recharge }),
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: Recharge }),
          },
          // {
          //   path: 'alipay',
          //   element: LazyImportComponent({ lazyChildren: Alipay }),
          // },
          // {
          //   path: 'bankTransf',
          //   element: LazyImportComponent({ lazyChildren: BankTransf }),
          // },
          {
            path: 'enterUsdt',
            element: LazyImportComponent({ lazyChildren: EnterUsdt }),
          },
          // {
          //   path: 'offlinePay',
          //   element: LazyImportComponent({ lazyChildren: OfflinePay }),
          // },
          {
            path: 'payRules',
            element: LazyImportComponent({ lazyChildren: PayRules }),
          },
        ],
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            element: LazyImportComponent({ lazyChildren: Mine }),
          },
          {
            path: 'modifyData',
            element: LazyImportComponent({ lazyChildren: ModifyData }),
          },
          {
            path: 'cWithdrawPsd',
            element: LazyImportComponent({ lazyChildren: CreateWithdrawPsd }),
          },
          {
            path: 'audit',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: Audit }),
              },
              {
                path: 'withdraw',
                children: [
                  {
                    path: '',
                    element: LazyImportComponent({ lazyChildren: Withdraw }),
                  },
                  {
                    path: 'cInfo',
                    element: LazyImportComponent({ lazyChildren: CardInfo }),
                  },
                  {
                    path: 'uInfo',
                    element: LazyImportComponent({ lazyChildren: UsdtInfo }),
                  },
                  {
                    path: 'gInfo',
                    element: LazyImportComponent({ lazyChildren: GoPayInfo }),
                  },
                ],
              },
            ],
          },
          {
            path: 'yueBao',
            // element: LazyImportComponent({ lazyChildren: YueBao }),
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: YueBao }),
              },
              {
                path: 'rateCalculation',
                element: LazyImportComponent({ lazyChildren: RateCalculation }),
              },
              {
                path: 'detail',
                element: LazyImportComponent({ lazyChildren: YuEBaoDetail }),
              },
              {
                path: 'rollInOut',
                element: LazyImportComponent({ lazyChildren: RollInOut }),
              },
            ],
          },
          {
            path: 'quotaConvert',
            element: LazyImportComponent({ lazyChildren: QuotaConvert }),
          },
          {
            path: 'fundingTransf',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: FundingTransf }),
              },
              {
                path: 'rechargeDetail',
                element: LazyImportComponent({ lazyChildren: RechargeDetail }),
              },
              {
                path: 'withdrawDetail',
                element: LazyImportComponent({ lazyChildren: WithdrawDetail }),
              },
              {
                path: 'yueBaoDetail',
                element: LazyImportComponent({ lazyChildren: YueBaoDetail }),
              },
              {
                path: 'quotaConvertDetail',
                element: LazyImportComponent({
                  lazyChildren: QuotaConvertDetail,
                }),
              },
              {
                path: 'tradeDetail',
                element: LazyImportComponent({ lazyChildren: TradeDetail }),
              },
              {
                path: 'envelopeDetail',
                // element: LazyImportComponent({ lazyChildren: EnvelopeDetail }),
                children: [
                  {
                    path: '',
                    element: LazyImportComponent({
                      lazyChildren: EnvelopeDetail,
                    }),
                  },
                  {
                    path: 'list',
                    element: LazyImportComponent({
                      lazyChildren: EnvelopeList,
                    }),
                  },
                ],
              },
            ],
          },
          {
            path: 'betRecord',
            // element: LazyImportComponent({ lazyChildren: BetRecord }),
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: BetRecord }),
              },
              {
                path: 'detail',
                element: LazyImportComponent({ lazyChildren: BetRecordDetail }),
              },
            ],
          },
          {
            path: 'pointsRecord',
            element: LazyImportComponent({ lazyChildren: PointsRecord }),
          },
          {
            path: 'rebate',
            // element: LazyImportComponent({ lazyChildren: Rebate }),
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: Rebate }),
              },
              {
                path: 'detail',
                element: LazyImportComponent({ lazyChildren: RebateDetail }),
              },
              {
                path: 'explan',
                element: LazyImportComponent({ lazyChildren: RebateExplan }),
              },
            ],
          },
          {
            path: 'reward',
            element: LazyImportComponent({ lazyChildren: Reward }),
          },
          {
            path: 'agentRegister',
            element: LazyImportComponent({ lazyChildren: AgentRegister }),
          },
          {
            path: 'earnMoney',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: EarnMoney }),
              },
              {
                path: 'proBonus',
                element: LazyImportComponent({ lazyChildren: ProBonus }),
              },
            ],
          },
          {
            path: 'setUp',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: SetUp }),
              },
              {
                path: 'bindBankCard',
                children: [
                  {
                    path: '',
                    element: LazyImportComponent({
                      lazyChildren: BindBankCard,
                    }),
                  },
                  {
                    path: 'detail',
                    element: LazyImportComponent({
                      lazyChildren: BindBankCardDetail,
                    }),
                  },
                ],
              },
              {
                path: 'bindUsdt',
                element: LazyImportComponent({ lazyChildren: BindUsdt }),
              },
              {
                path: 'bindGoPay',
                children: [
                  {
                    path: '',
                    element: LazyImportComponent({ lazyChildren: BindGoPay }),
                  },
                  {
                    path: 'detail',
                    element: LazyImportComponent({
                      lazyChildren: BindGoPayDetail,
                    }),
                  },
                ],
              },
              {
                path: 'modifyWithdrawPassword',
                element: LazyImportComponent({
                  lazyChildren: ModifyWithdrawPassword,
                }),
              },
              {
                path: 'modifyLoginPassword',
                element: LazyImportComponent({
                  lazyChildren: ModifyLoginPassword,
                }),
              },
            ],
          },
          {
            path: 'about',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: About }),
              },
              {
                path: 'detail',
                element: LazyImportComponent({ lazyChildren: AboutDetail }),
              },
            ],
          },
          {
            path: 'announce',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: Announcement }),
              },
              {
                path: 'info',
                element: LazyImportComponent({ lazyChildren: AnnounceInfo }),
              },
            ],
          },
          {
            path: 'lotteryLimit',
            // element: LazyImportComponent({ lazyChildren: LotteryLimit }),
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: LotteryLimit }),
              },
              {
                path: 'info',
                element: LazyImportComponent({ lazyChildren: LotteryInfo }),
              },
            ],
          },
          {
            path: 'currentBet',
            element: LazyImportComponent({ lazyChildren: CurrentBet }),
          },
          {
            path: 'gameRules',
            children: [
              {
                path: '',
                element: LazyImportComponent({ lazyChildren: GameRules }),
              },
              {
                path: 'detail',
                element: LazyImportComponent({ lazyChildren: GameRulesDetail }),
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: LazyImportComponent({ lazyChildren: Mistake }),
      },
    ],
  },
];

