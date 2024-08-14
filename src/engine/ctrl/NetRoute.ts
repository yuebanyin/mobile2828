
/**
 * @description: 统一网络模块
 */
export namespace NetCommonRoute {
  export const loginSuccess: number = 1; //登录成功
  export const loginFinish: number = 2; //登录完成
  export const systemMessage: number = 3; //系统消息
  export const webSocketClose: number = -5000; //网络关闭了
  export const webSocketReconnect: number = -5001; //网络重连了
  export const onRepeatLogin: number = -5002; //重复登录
}

/**
 * @description: 聊天模块
 */
export namespace ChatRoute {
  export const historyRecord: number = 1000; //聊天记录
  export const liveChat: number = 1001; //即时聊天信息
  export const deleteMessage: number = 1002; //管理员删除消息，需要将界面上对应的聊天消息删除
  export const managerMessage: number = 1003; //管理员在后台手动发送消息

  export const userBetRecord: number = 1004; //推送用户下注信息，其中的赔率信息仅可用于展示
  export const betMultInfo: number = 1005; //下注赔率信息
  export const betSuccess: number = 1006; //下注成功
  export const betFaild: number = 1007; //下注失败
  export const selectGame: number = 1008; //选择游戏
  export const gameRecord: number = 1009; //游戏记录

  export const onNoticeMessage: number = 1010; //系统公告更新，需要主动查询最新公告内容
  export const winBroadcast: number = 1011; //推送游戏内满足条件的赢分消息

  export const sysRedPacketInfo: number = 1012; //系统红包配置信息
  export const userRedPacketInfo: number = 1013; //用户红包配置信息
  export const sysRedPacketState: number = 1014; //系统红包取消置顶时下发
  export const sendRedPacketSuccess: number = 1015; //发送红包成功
  export const sendRedPacketFaild: number = 1016; //发送红包失败
  export const receiveRedPacketSuccess: number = 1017; //领取红包-奖励结果
  export const receiveRedPacketFaild: number = 1018; //红包领取失败
  export const receiveRedPacketRank: number = 1019; //红包领取排行
  export const qureyRedPacketState: number = 1020; //查询红包状态
  export const qureyRedPacketConfig: number = 1021; //查询发送红包 配置
}

/**
 * @description: 消息服外部监听消息
 */
export namespace MsgRoute {
  export const kickUser: number = 2000; //管理员踢出用户 ---不需要再进行重连
  export const refreshUserScore: number = 2001; //刷新用户积分 ---纯粹的通知---客户端需要通过http-api进行更新
  export const newEmail: number = 2002; //新邮件 ---纯粹的通知---客户端需要通过http-api进行更新
  export const rechargeSuccess: number = 2003; //充值成功 ---纯粹的通知---客户端需要通过http-api进行更新

  export const regPacketConfig: number = 2004; //新增红包活动或者已有活动在用户登录时下发，同一时间仅有一个活动
  export const regPacketState: number = 2005; //查询自己是否已经领取过奖励
  export const robRedPacketSuccess: number = 2006; //抢到红包事件

  export const gameState: number = 2007; //时间配置或者游戏维护状态已发送变化，需要重新查询更新
}

/**
 * @description: 游戏外部监听消息
 */
export namespace GameRoute {
  export const gameSceneState: number = 3000; //游戏场景状态
  export const gameScenConfig: number = 3001; //游戏场景配置
  export const sceneChange: number = 3002; //推送游戏场景变化
  export const refreshBaseConfig: number = 3003; //基础配置发送变化时推送，一般仅在新一期开始后推送
  export const historyRecord: number = 3004; //进入房间后，推送最近50期的游戏记录。后续仅推送最新一期的开奖结果，不再推送全部记录。
  export const dynamicMultiple: number = 3005; //动态赔率指会根据所有玩家当期在某个下注区域的累计下注额来动态调整某个下注区域赔率,动态赔率包含普通赔率和特殊赔率,当期存在动态赔率，则会下发存在动态赔率的所有区域,在进入新一期之后，客户端需要主动清除上一期的动态赔率，恢复至基础赔率
  export const dynamicMultipleFinish: number = 3006; //动态赔率下发完成
  export const userBetInfo: number = 3007; //推送其他玩家的下注信息
  export const userBetSuccess: number = 3008; //用户下注成功
  export const userBetFaild: number = 3009; //用户下注失败
  export const forecastRank: number = 3010; //查询预测专家排名
  export const gameEnd: number = 3999; //游戏开奖结果--当前期游戏结束
}

/**
 * @description: 长龙界面操作路由
 */
export namespace LongDragonRoute {
  export const areaInfo: number = 4000; //区域信息 -- 登录成功后或者有新增的区域，会下发区域信息
  export const removeareaInfo: number = 4001; //移除区域-- 当区域不满足连开条件，会下发移除区域消息
  export const multInfo: number = 4002; //登录成功后或者有变化的赔率，会下发赔率信息  ---客户端进入场景后，需要根据此消息维护本地的赔率信息，新增的区域信息时不会附加赔率信息下来
  export const ldRecord: number = 4003; //查询单个长龙区域的游戏记录
  export const betInfo: number = 4004; //查询所有长龙区域的下注信息
  export const ldClose: number = 4005; //长龙游戏关闭
  export const betSuccess: number = 4006; //长龙下注成功
  export const betFaild: number = 4007; //长龙下注失败
}

/**
 * @description: 网络分类数据
 */
export class NetData {
  dateType: number = 0; //针对每个网络分类
  data: object = null; //网络数据
  constructor(_dataType: number, _data: object) {
    this.dateType = _dataType;
    this.data = _data;
  }
}
/**
 * @description: 网络分类数据
//  */
// class NetData extends Component<any> {
//   dateType: number = 0; //针对每个网络分类
//   data: object = null; //网络数据
//   constructor(props) {
//     super(props);
//     const {_dataType, _data } = this.props;
//     this.formatMsg = this.formatMsg.bind(this)
//     this.dateType = _dataType;
//     this.data = this.formatMsg(_data?.key, _data?.parm);
//   }
//   formatMsg = (key: string, parm: any[]) => {
//     const { t } = this.props;
//     console.log(key, parm);
    
//     if (valueArr.includes(key)) {
//       return t(key);
//     }
//     if (normalArr.includes(key)) {
//       return t(key, { keyCode: parm[0] });
//     }
//     if (rateArr.includes(key)) {
//       return t(key, { rateNum: parm[0] / 10000 });
//     }
//     if (transArr.includes(key)) {
//       return t(key, { tarnsText: t(parm[0]) });
//     }
//     return t(key);
//   };
// }

// export default withTranslation()(NetData);
/**
 * @description: 聊天室历史记录分类消息
 */
export class ChatHistoryRecord {
  recordType: number = 0;
  data: object = null;
  constructor(_recordType: number, _data: object) {
    this.recordType = _recordType;
    this.data = _data;
  }
}
