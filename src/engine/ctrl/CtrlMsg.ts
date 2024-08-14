import { BOOL, CreateObject, SCORE } from '../base/basetype';
import { DataBuffer } from '../base/databuffer';
import { CMD_Msg } from '../cmd/msg/CMD_Msg';
import { BaseSocket } from '../net/clientsocket';
import { MsgRoute, NetCommonRoute, NetData } from './NetRoute';

/**
 * @description: 当前类需要挂接在全局缓存下，类似挂接在App.tsx下
 */
export class CtrlMsg extends BaseSocket {
  //区分判断用什么登录方式
  private token: any = false;
  // 外部回调函数
  private netCallBack: Function = null;
  // 目标对象
  private target: object = null;

  private isReconnect: boolean = true;

  private webId: string = '';
  constructor(url: string, webId: string) {
    super(url, null, true);
    this.webId = webId;
  }

  /**
   * @description: 启动链接
   * @param {any} _token 传用户当前的token对象进来 (api返回的session信息)
   * @return {*}
   */
  connect(_token: any) {
    this.token = _token;
    this.initEvent();
    this.Init();
  }

  /**
   * @description: 添加外部回调方法
   * @param {Function} callback
   * @param {object} _target
   * @return {*}
   */
  dispatcherCall(callback: Function, _target?: object) {
    this.netCallBack = callback;
    this.target = _target;
  }

  /**
   * @description: 查询用户抢红包的状态
   * @return {*}
   */
  queryRedPacketState() {
    if (this.isCan()) {
      this.SendData(CMD_Msg.MDM_MSG_USER, CMD_Msg.SUB_MSG_HONGBAO_STATUS);
      return true;
    }
    return false;
  }

  /**
   * @description: 发送抢红包命令
   * @return {*}
   */
  robRegPacket() {
    if (this.isCan()) {
      this.SendData(CMD_Msg.MDM_MSG_USER, CMD_Msg.SUB_MSG_HONGBAO_RECEIVE);
      return true;
    }
    return false;
  }

  /**
   * @description: 跨房间自动下注，由消息服中转
   * @param {CMD_Msg} betScore
   * @return {*}
   */
  autoStartBetScore(startBetScore: CMD_Msg.CMD_MSG_AutoFollowBetStart) {
    if (this.isCan()) {
      this.SendData(
        CMD_Msg.MDM_MSG_SSC,
        CMD_Msg.SUB_MSG_SSC_AUTO_BET_START,
        startBetScore
      );
      return true;
    }
    return false;
  }

  /**
   * @description: 跨房间停止下注，由消息服中转
   * @param {CMD_Msg} betScore
   * @return {*}
   */
  stopBetScore(stopBetScore: CMD_Msg.CMD_MSG_AutoFollowBetStop) {
    if (this.isCan()) {
      this.SendData(
        CMD_Msg.MDM_MSG_SSC,
        CMD_Msg.SUB_MSG_SSC_AUTO_BET_STOP,
        stopBetScore
      );
      return true;
    }
    return false;
  }

  /**
   * @description: 是否允许发送
   * @return {*}
   */
  private isCan() {
    return this.IsConnect() && this.token;
  }

  /**
   * @description: 分发数据
   * @param {number} _dataType
   * @param {object} _data
   * @return {*}
   */
  private dispatch(_dataType: number, _data?: any) {
    if (this.netCallBack) {
      this.netCallBack.call(this.target, new NetData(_dataType, _data), this);
    }
  }

  /**
   * @description: 事件注册
   * @return {*}
   */
  private initEvent() {
    this.onConnected = this.onConnect.bind(this);
    this.onClosed = this.onClose.bind(this);
    this.onReconnectFailed = this.onReconnectFaile.bind(this);

    //登录成功
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_LOGON,
      CMD_Msg.SUB_MSG_LOGON_SUCCESS,
      this.onLoginSuccess.bind(this),
      CMD_Msg.CMD_MSG_LogonSuccess
    );
    this.RegistMessage(
      CMD_Msg.MDM_MSG_LOGON,
      CMD_Msg.SUB_MSG_LOGON_FINISH,
      this.onLoginFinish.bind(this)
    );
    //注册监听系统通知显示toast提示信息
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_USER,
      CMD_Msg.SUB_MSG_SYSTEM_MESSAGE,
      this.onSysMessage.bind(this),
      CMD_Msg.CMD_MSG_SystemMessage
    );

    //公共监听
    //管理员踢出用户
    this.RegistMessage(
      CMD_Msg.MDM_MSG_USER,
      CMD_Msg.SUB_MSG_KICK_USER,
      this.onKickUser.bind(this)
    );
    // 通知刷新用户积分
    this.RegistMessage(
      CMD_Msg.MDM_MSG_PUSH,
      CMD_Msg.SUB_MSG_PUSH_SCORE,
      this.onRefreshUserScore.bind(this)
    );
    // 通知用户有新的邮件
    this.RegistMessage(
      CMD_Msg.MDM_MSG_PUSH,
      CMD_Msg.SUB_MSG_PUSH_NEW_EMAIL,
      this.onNewEmail.bind(this)
    );
    // 通知用户充值成功提示
    this.RegistMessage(
      CMD_Msg.MDM_MSG_PUSH,
      CMD_Msg.SUB_MSG_PUSH_PAY,
      this.onRechargeSuccess.bind(this)
    );

    //////////////////////////////////////////////////////////////////////////////////////////
    //红包
    // 红包配置监听
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_USER,
      CMD_Msg.SUB_MSG_HONGBAO_CONFIG,
      this.onRedPacketConfig.bind(this),
      CMD_Msg.tagHongBaoConfig
    );
    // 红包状态
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_USER,
      CMD_Msg.SUB_MSG_HONGBAO_STATUS,
      this.onRedPacketState.bind(this),
      CMD_Msg.tagHongBaoUserStatus
    );
    // 抢到红包监听
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_USER,
      CMD_Msg.SUB_MSG_HONGBAO_RECEIVE,
      this.onRobRedPacketSuccess.bind(this),
      SCORE
    );

    //游戏SSC相关
    // 时间配置或者游戏维护状态已发送变化，需要重新查询更新
    this.RegistMessage(
      CMD_Msg.MDM_MSG_SSC,
      CMD_Msg.SUB_MSG_SSC_STATUS,
      this.onGameState.bind(this)
    );
    // 下注操作返回
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_SSC,
      CMD_Msg.SUB_MSG_SSC_AUTO_BET_STATUS,
      this.onBetOperationReturn.bind(this),
      BOOL
    );

    //同一用户重复登录时，会向较先登录的连接发送被顶号消息
    this.RegistMessageEx(
      CMD_Msg.MDM_MSG_LOGON,
      CMD_Msg.SUB_MSG_REPEAT_LOGON,
      this.onRepeatLogin.bind(this),
      BOOL
    );
  }

  /**
   * @description: 连接成功
   * @param {*} msg
   * @return {*}
   */
  private onConnect(_msg) {
    this.Login();
  }

  /**
   * @description: 断开处理
   * @param {*} _msg
   * @return {*}
   */
  private onClose(_msg) {
    this.dispatch(NetCommonRoute.webSocketClose);
    if (this.isReconnect) {
      this.Reconnect();
    }
  }

  /**
   * @description: 重连失败
   * @return {*}
   */
  private onReconnectFaile() {
    this.dispatch(NetCommonRoute.webSocketReconnect);
  }

  ///////////////////////////////////////////////////////////////////////////////
  //发送操作事件
  /**
   * @description: 发送登录事件
   * @return {*}
   */
  private Login() {
    if (this.token?.token) {
      let login = CreateObject(CMD_Msg.CMD_MSG_LogonToken);
      login.dwGameID.value = this.token.gameId;
      login.strToken.value = this.token.token;
      login.cbDeviceType.value = 0x40;
      login.szMachineID.value = this.webId.toMD5(true);
      this.SendData(CMD_Msg.MDM_MSG_LOGON, CMD_Msg.SUB_MSG_LOGON_TOKEN, login);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  //监听返回事件绑定函数

  /**
   * @description: 登录成功
   * @param {*} wCmdMain
   * @param {*} wSubCmdID
   * @param {*} data
   * @return {*}
   */
  private onLoginSuccess(data: CMD_Msg.CMD_MSG_LogonSuccess) {
    console.log('msg-登录成功', data);
    this.dispatch(NetCommonRoute.loginSuccess, data);
  }

  /**
   * @description: 登录完成
   * @param {*} data
   * @param {*} wCmdMain
   * @param {*} wSubCmdID
   * @return {*}
   */
  private onLoginFinish(data) {
    this.dispatch(NetCommonRoute.loginFinish, data);
  }

  /**
   * @description: 登录失败
   * @param {*} data
   * @return {*}
   */
  private onSysMessage(data: CMD_Msg.CMD_MSG_SystemMessage) {
    //用toast提示错误信息
    //检测一下红包领取的失败与否
    this.dispatch(NetCommonRoute.systemMessage, data);
    // 登录失败的情况下用系统提示
    if (
      data.wMainCmdID.value === CMD_Msg.MDM_MSG_LOGON &&
      data.wSubCmdID.value === CMD_Msg.SUB_MSG_LOGON_FAILURE
    ) {
      //判断登录失败的处理
      this.isReconnect = false;
      this.Close();
    }
  }

  /**
   * @description: 管理员踢出用户
   * @param {DataBuffer} _data
   * @return {*}
   */
  private onKickUser(_data: DataBuffer) {
    this.dispatch(MsgRoute.kickUser, _data);
    //理论要求把当前客户端所有websocket都关闭
    this.Close();
  }

  /**
   * @description: 刷新用户积分 ---纯粹的通知---客户端需要通过http-api进行更新
   * @param {DataBuffer} _data
   * @return {*}
   */
  private onRefreshUserScore(_data: DataBuffer) {
    this.dispatch(MsgRoute.refreshUserScore, _data);
  }

  /**
   * @description: 新邮件 ---纯粹的通知---客户端需要通过http-api进行更新
   * @param {DataBuffer} _data
   * @return {*}
   */
  private onNewEmail(_data: DataBuffer) {
    this.dispatch(MsgRoute.newEmail, _data);
  }

  /**
   * @description: 充值成功 ---纯粹的通知---客户端需要通过http-api进行更新
   * @param {DataBuffer} _data
   * @return {*}
   */
  private onRechargeSuccess(_data: DataBuffer) {
    this.dispatch(MsgRoute.rechargeSuccess, _data);
  }

  ////////////////////////////////////////////////////////
  //红包相关
  /**
   * @description: 新增红包活动或者已有活动在用户登录时下发，同一时间仅有一个活动
   * @param {CMD_Msg} data
   * @return {*}
   */
  private onRedPacketConfig(data: CMD_Msg.tagHongBaoConfig) {
    this.dispatch(MsgRoute.regPacketConfig, data);
  }

  /**
   * @description: 查询自己是否已经领取过奖励
   * @param {CMD_Msg} data
   * @return {*}
   */
  private onRedPacketState(data: CMD_Msg.tagHongBaoUserStatus) {
    this.dispatch(MsgRoute.regPacketState, data);
  }

  /**
   * @description: 抢红包成功
   * @param {SCORE} data
   * @return {*}
   */
  private onRobRedPacketSuccess(data: SCORE) {
    this.dispatch(MsgRoute.robRedPacketSuccess, data);
  }

  /**
   * @description: 时间配置或者游戏维护状态已发送变化，需要重新查询更新
   * @param {DataBuffer} _data
   * @return {*}
   */
  private onGameState(_data: DataBuffer) {
    this.dispatch(MsgRoute.gameState, _data);
  }

  /**
   * @description: 下注操作返回
   * @param {BOOL} data
   * @return {*}
   */
  private onBetOperationReturn(data: BOOL) {
    this.dispatch(MsgRoute.robRedPacketSuccess, data);
  }

  /**
   * @description: 同一用户重复登录时，会向较先登录的连接发送被顶号消息
   * @param {BOOL} data
   * @return {*}
   */
  private onRepeatLogin(data: BOOL) {
    this.isReconnect = false;
    this.dispatch(NetCommonRoute.onRepeatLogin, data);
    this.Close();
  }
}
