//个人中心信息 按钮路由处理

//公告通知路由信息
export const mineNotice = {
  href: '/mine/announce',
  icon: '/mine/icon_geren_004.png',
};

//登录信息路由
export const mineLoginButtonInfo = {
  login: {
    href: '/login',
    text: 'signIn',
  },
  reg: {
    href: '/register',
    text: 'registry',
  },
};

//充值 提现 余额宝
export const cryList = [
  {
    id: 1,
    title: 'pay',
    href: '/recharge',
    icon: '/mine/icon_geren_005.png',
  },
  {
    id: 2,
    title: 'Withdraw',
    href: '/mine/audit',
    icon: '/mine/icon_geren_006.png',
  },
  {
    id: 3,
    title: 'personal.yuebao',
    href: '/mine/yueBao',
    icon: '/mine/icon_geren_019.png',
  },
];

//按钮列表信息
export const mineList = [
  [
    {
      id: 1,
      title: 'quotaConversion',
      href: '/mine/quotaConvert',
      icon: '/mine/icon_geren_007.png',
    },
    {
      id: 2,
      title: 'personal.fundDetail',
      href: '/mine/fundingTransf',
      icon: '/mine/icon_geren_008.png',
    },
    {
      id: 3,
      title: 'personal.betRecord',
      href: '/mine/betRecord',
      icon: '/mine/icon_geren_009.png',
    },
  ],
  [
    {
      id: 3,
      title: 'integralRecord',
      href: '/mine/pointsRecord',
      icon: '/mine/icon_geren_010.png',
    },
    {
      id: 4,
      title: 'memberRebate',
      href: '/mine/rebate',
      icon: '/mine/icon_geren_011.png',
    },
    {
      id: 5,
      title: 'reaEnvelopesBonuses',
      href: '/mine/reward',
      icon: '/mine/icon_geren_012.png',
    },
  ],
  [
    {
      id: 6,
      title: 'proxyRegistration',
      href: '/mine/agentRegister',
      icon: '/mine/icon_geren_013.png',
    },
    {
      id: 7,
      title: 'promoteToMoney',
      href: '/mine/earnMoney',
      icon: '/mine/icon_geren_014.png',
    },
    {
      id: 21,
      title: 'businessCooperation',
      href: '/serbusiness',
      icon: '/mine/icon_geren_020.png',
      blockend: 1,
    },
    {
      id: 8,
      title: 'service',
      href: '/serCenter',
      icon: '/mine/icon_geren_017.png',
      blockend: 1,
    },
  ],
  [
    {
      id: 9,
      title: 'setting',
      href: '/mine/setUp',
      icon: '/mine/icon_geren_015.png',
    },
    {
      id: 10,
      title: 'about',
      href: '/mine/about',
      icon: '/mine/icon_geren_018.png',
      blockend: 1, //块结束符
    },
  ],
];

//右侧mine

export const rightMine = {
  userInfo: {
    bkicon: '/common/headbk.png',
    avatar: '/mine/Vector.png',
  },
  winOrLose: [
    {
      id: 1,
      // title: '今日输赢',
      title: 'todayBunko',
      icon: '/mine/rightmine/icon5.png',
    },
    {
      id: 2,
      // title: '未结算',
      title: 'unsettled',
      icon: '/mine/rightmine/icon6.png',
    },
  ],
  recordList: [
    {
      id: 1,
      title: 'quotaConversion',
      icon: '/mine/rightmine/icon1.png',
      path: '/mine/quotaConvert',
    },
    {
      id: 2,
      title: 'currentBet',
      icon: '/mine/rightmine/icon2.png',
      path: '/mine/currentBet',
    },
    {
      id: 3,
      title: 'bettingRecord',
      icon: '/mine/rightmine/icon3.png',
      path: '/mine/betRecord',
    },
    {
      id: 4,
      title: 'colorLimit',
      icon: '/mine/rightmine/icon12.png',
      path: '/mine/lotteryLimit',
    },
    {
      id: 5,
      title: 'gameRule',
      icon: '/mine/rightmine/icon13.png',
      path: '/mine/gameRules',
    },
    {
      id: 6,
      title: 'proxyRegistration',
      icon: '/mine/rightmine/icon7.png',
      path: '/mine/agentRegister',
    },
    {
      id: 7,
      title: 'contactCustomer',
      icon: '/mine/rightmine/icon8.png',
      path: '/serCenter',
    },
    {
      id: 10,
      title: 'downApp',
      icon: '/mine/rightmine/icon17.png',
      pathKey: 's11',
      linkType: 2,
      target: '_self',
      mobx: true,
    },
    {
      id: 11,
      title: 'lineSwitch',
      icon: '/mine/rightmine/icon18.png',
      pathKey: 's13',
      linkType: 2,
      target: '_self',
      mobx: true,
    },
    {
      id: 8,
      title: 'openMusic',
      icon: '/mine/rightmine/icon4.png',
      switch: 1,
    },
    {
      id: 9,
      title: 'personalizedPeel',
      icon: '/mine/rightmine/icon14.png',
      type: 'dialog',
    },
  ],
  // groupList: [
  //   {
  //     id: 1,
  //     title: '说明',
  //     celllist: [
  //       {
  //         id: 1,
  //         title: '彩种限额',
  //         icon: '/mine/rightmine/icon12.png',
  //         path: '/mine/lotteryLimit',
  //       },
  //       {
  //         id: 2,
  //         title: '游戏规则',
  //         icon: '/mine/rightmine/icon13.png',
  //         path: '/mine/gameRules',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: '其他',
  //     celllist: [
  //       {
  //         id: 1,
  //         title: '代理注册',
  //         icon: '/mine/rightmine/icon7.png',
  //         path: '/mine/agentRegister',
  //       },
  //       {
  //         id: 2,
  //         title: '联系客服',
  //         icon: '/mine/rightmine/icon8.png',
  //         path: '/mine/serCenter',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: '设置',
  //     celllist: [
  //       {
  //         id: 1,
  //         title: '开启音乐',
  //         icon: '/mine/rightmine/icon4.png',
  //         switch: 1,
  //       },
  //       {
  //         id: 2,
  //         title: '个性换肤',
  //         icon: '/mine/rightmine/icon14.png',
  //         type: 'dialog',
  //       },
  //     ],
  //   },
  // ],
};
