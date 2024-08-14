// import AWindow from '../../awindow';
import { BOOL, BYTE, CreateObject, DWORD, SCORE } from '../base/basetype';
import { DataBuffer } from '../base/databuffer';
import { CMD_Chat } from '../cmd/chat/CMD_Chat';
import { common } from '../cmd/common/CMD_COMMON';
import { BaseSocket } from '../net/clientsocket';
import { time } from '@/utils/time';
import { ChatHistoryRecord, ChatRoute, NetCommonRoute, NetData } from './NetRoute';

export class CtrlChat extends BaseSocket {
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
    //this.SetCaller(this)
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
   * @description: 发送聊天数据
   * @param {string} msgChat
   * @return {*}
   */
  sendChat(msgChat: string) {
    if (this.isCan()) {
      let userChat = CreateObject(CMD_Chat.CMD_CRS_C_UserChat);
      userChat.szChatString.value = msgChat;
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_USER_CHAT, userChat);
      return true;
    }
    return false;
  }

  /**
   * @description: 查询所下注区域最新的赔率信息，用于下注确认时的展示和后续的下注
   * @param {CMD_Chat.CMD_CRS_C_QueryMultInfo} qInfo
   * @return {*}
   */
  queryMeultInfo(qInfo: CMD_Chat.CMD_CRS_C_QueryMultInfo) {
    if (this.isCan() && qInfo) {
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_QUERY_MULT_INFO, qInfo);
      return true;
    }
    return false;
  }

  /**
   * @description: 用户下注
   * @param {CMD_Chat.CMD_CRS_C_PlaceBet} betInfo
   * @return {*}
   */
  userBetScore(betInfo: CMD_Chat.CMD_CRS_C_PlaceBet) {
    console.log({ betInfo }, this.isCan());
    if (this.isCan() && betInfo) {
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_USER_BET, betInfo);
      return true;
    }
    return false;
  }

  /**
   * @description: 用于推送各类游戏记录 选择游戏设置
   * @param {number} kindId
   * @param {number} serverId
   * @return {*}
   */
  selectGame(kindId: number, serverId: number) {
    if (this.isCan()) {
      let sgame = CreateObject(CMD_Chat.CMD_CRS_C_SetGameInfo);
      sgame.wKindID.value = kindId;
      sgame.wServerID.value = serverId;
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_SET_GAME_INFO, sgame);
      return true;
    }
    return false;
  }

  /**
   * @description: 查询当前选择selectGame游戏的记录
   * @return {*}
   */
  queryGameRecord() {
    if (this.isCan()) {
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_GAME_RECORD);
      return true;
    }
    return false;
  }

  /**
   * @description: 查询红包配置
   * @return {*}
   */
  queryRedPacketConfig() {
    if (this.isCan()) {
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_QUERY_CONFIG);
      return true;
    }
    return false;
  }

  /**
   * @description: 用户发送红包
   * @param {number} rCount
   * @param {number} score
   * @param {string} title
   * @return {*}
   */
  sendRebPacket(rCount: number, score: number, title: string) {
    if (this.isCan()) {
      const rebPacket = CreateObject(CMD_Chat.CMD_CRS_C_HongBaoSend);
      rebPacket.wCount.value = rCount;
      rebPacket.lScore.value = score * common.GOLD_RATIO;
      rebPacket.szTitle.value = title;
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_SEND, rebPacket);
      return true;
    }
    return false;
  }

  /**
   * @description: 用户领取红包
   * @param {number} packetId
   * @return {*}
   */
  userReceiveRedPacket(packetId: number) {
    if (this.isCan()) {
      let redPacketId = CreateObject(DWORD);
      redPacketId.value = packetId;
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_RECEIVE, redPacketId.toDataBuffer());
      return true;
    }
    return false;
  }

  /**
   * @description: 查询红包状态
   * @param {number} packetId
   * @return {*}
   */
  queryRedPacketState(packetId: DWORD) {
    if (this.isCan()) {
      this.SendData(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_RECEIVE_STATUS, packetId.toDataBuffer());
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
   * @description: 初始化网络事件
   * @return {*}
   */
  private initEvent() {
    this.onConnected = this.onConnect.bind(this);
    this.onClosed = this.onClose.bind(this);
    this.onReconnectFailed = this.onReconnectFaile.bind(this);
    //登录成功
    this.RegistMessageEx(CMD_Chat.MDM_CRS_LOGON, CMD_Chat.SUB_CRS_LOGON_SUCCESS, this.onLoginSuccess.bind(this), CMD_Chat.CMD_CRS_LogonSuccess);
    this.RegistMessage(CMD_Chat.MDM_CRS_LOGON, CMD_Chat.SUB_CRS_LOGON_FINISH, this.onLoginFinish.bind(this));
    //注册监听系统通知显示toast提示信息
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_SYSTEM_MESSAGE, this.onSysMessage.bind(this), CMD_Chat.CMD_CRS_SystemMessage);

    // 获取历史消息完成后再把用户消息放到列表后面
    // 历史记录
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_RECORD, this.onHistoryRecord.bind(this));
    // 历史记录完成
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_RECORD_FINISH, this.onHistoryRecordFinish.bind(this));

    //发送聊天消息返回数据
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_USER_CHAT, this.onLiveChat.bind(this), CMD_Chat.CMD_CRS_S_UserChat);
    //管理员删除消息，需要将界面上对应的聊天消息删除
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_DELETE_MESSAGE, this.onDeleteMessage.bind(this), CMD_Chat.CMD_CRS_S_DeleteMessage);
    //管理员删除消息
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_MANAGER_MESSAGE, this.onManagerMessage.bind(this), CMD_Chat.CMD_CRS_S_ManagerMessage);

    //下注相关
    //注册监听用户下注信息
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_USER_BET_INFO, this.onUserBetRecord.bind(this));
    //注册监听查询赔率
    this.RegistMessageList(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_QUERY_MULT_INFO, this.onRecvMultInfo.bind(this), common.tagDynamicMultiple);
    //下注成功
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_USER_BET_SUCCESS, this.onBetSuccess.bind(this));
    //下注失败
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_USER_BET_FAILURE, this.onBetFaild.bind(this));
    //选择游戏
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_SET_GAME_INFO, this.onSelectGame.bind(this));
    //游戏记录
    this.RegistMessageList(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_GAME_RECORD, this.onGameRecord.bind(this), common.tagCommonSSCRecordInfo);
    //公告更新通知---客户端主动请求http获取更新
    this.RegistMessage(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_NOTIVE_UPDATE, this.onNoticeMessage.bind(this));
    //游戏内赢分广播
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_WIN_BROADCAST, this.onGameBroadcast.bind(this), CMD_Chat.tagChatRoomWinBroadcast);

    //红包相关
    // 系统新发送红包时推送
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_SYSTEM, this.onSysRedPacketInfo.bind(this), CMD_Chat.tagChatSystemHongBaoInfo);

    // 用户新发送红包时推送
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_USER, this.onUserRedPacketInfo.bind(this), CMD_Chat.tagChatUserHongBaoInfo);

    // 系统红包取消置顶时下发
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_STATUS, this.onSysRedPacketState.bind(this), DWORD);

    // 领取红包-奖励结果
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_RESULT, this.onReceiveRedPacketSuccess.bind(this), SCORE);

    // 发送红包成功
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_SEND_SUCCESS, this.onSendRedPacketSuccess.bind(this), DWORD);
    // 发送红包失败---走系统提示

    // 领取红包失败--走系统提示
    // 领取红包排行
    this.RegistMessageList(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_RANKING, this.onReceiveRedPacketRank.bind(this), CMD_Chat.tagHongBaoReceive);

    // 查询红包状态返回
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_RECEIVE_STATUS, this.onRedPacketState.bind(this), BYTE);

    // 查询红包配置返回
    this.RegistMessageEx(CMD_Chat.MDM_CRS_USER, CMD_Chat.SUB_CRS_HONGBAO_QUERY_CONFIG, this.onRedPacketConfig.bind(this), CMD_Chat.tagChatHongBaoSendConfig);

    //同一用户重复登录时，会向较先登录的连接发送被顶号消息
    this.RegistMessageEx(CMD_Chat.MDM_CRS_LOGON, CMD_Chat.SUB_CRS_REPEAT_LOGON, this.onRepeatLogin.bind(this), BOOL);
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
      let login = CreateObject(CMD_Chat.CMD_CRS_LogonToken);
      login.wKindID.value = this.token.kindId ? this.token.kindId : 0;
      login.wServerID.value = this.token.serverId ? this.token.serverId : 0;
      login.dwGameID.value = this.token.gameId; // 22187586//86869826//22187586
      login.strToken.value = this.token.token; // 'a801778c4a764245a7d8aa69200fadb6'
      login.szMachineID.value = this.webId.toMD5(true);
      login.cbDeviceType.value = 0x40;
      this.SendData(CMD_Chat.MDM_CRS_LOGON, CMD_Chat.SUB_CRS_LOGON_TOKEN, login);
    } else {
      let login = CreateObject(CMD_Chat.CMD_CRS_LogonMachine);
      login.wKindID.value = this.token.kindId ? this.token.kindId : 0;
      login.wServerID.value = this.token.serverId ? this.token.serverId : 0;
      login.cbDeviceType.value = 0x40;
      login.szMachineID.value = this.webId.toMD5(true);
      login.tLogonTime.value = time.getCurTime();
      login.strLogonVerify.value = (common.COMPILATIO + '_' + login.tLogonTime.value).toMD5(false);
      this.SendData(CMD_Chat.MDM_CRS_LOGON, CMD_Chat.SUB_CRS_LOGON_MACHINE, login);
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
  private onLoginSuccess(data: CMD_Chat.CMD_CRS_LogonSuccess) {
    console.log('登录成功', data);
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
    console.log('登录完成', data);
    this.dispatch(NetCommonRoute.loginFinish, data);
  }

  /**
   * @description: 系统消息 提示
   * @param {*} data
   * @return {*}
   */
  private onSysMessage(data: CMD_Chat.CMD_CRS_SystemMessage) {
    //用toast提示错误信息
    if (data.wMainCmdID.value === CMD_Chat.MDM_CRS_USER && data.wSubCmdID.value === CMD_Chat.SUB_CRS_USER_BET_SUCCESS) {
      // data.szDescribeString.value = '下注成功';
      data.szDescribeString.value = JSON.stringify({key:'long-link-1'});
    }

    // if (data.wMainCmdID.value === CMD_Chat.MDM_CRS_USER && data.wSubCmdID.value === CMD_Chat.SUB_CRS_HONGBAO_FAILURE) {
    //   if (data.lRetCode.value > 0) {
    //     switch (data.lRetCode.value) {
    //       case 1:
    //         // data.szDescribeString.value = '您来晚了';
    //         data.szDescribeString.value = JSON.stringify({key:'long-link-2'});
    //         break;
    //       case 2:
    //         // data.szDescribeString.value = '您已经领取过了';
    //         data.szDescribeString.value = JSON.stringify({key:'long-link-3'});
    //         break;
    //       case 2:
    //         // data.szDescribeString.value = '系统错误';
    //         data.szDescribeString.value = JSON.stringify({key:'long-link-4'});
    //         break;
    //     }
    //   }
    // }

    this.dispatch(NetCommonRoute.systemMessage, data);
    // 登录失败的情况下用系统提示
    if (data.wMainCmdID.value === CMD_Chat.MDM_CRS_LOGON && data.wSubCmdID.value === CMD_Chat.SUB_CRS_LOGON_FAILURE) {
      //判断登录失败的处理
      this.isReconnect = false;
      this.Close();
    }
  }

  /**
   * @description: 查询赔率
   * @param {common} list
   * @return {*}
   */
  private onRecvMultInfo(list: Array<common.tagDynamicMultiple>) {
    //赔率信息需要全局设置处理
    // AHelpGame.sTagUserMultInfo_ = data;
    console.log('查询赔率', list);
    this.dispatch(ChatRoute.betMultInfo, list);
  }

  /**
   * @description: 用户下注信息
   * @param {DataBuffer} data
   * @return {*}
   */
  private onUserBetRecord(data: DataBuffer) {
    const placeBetInfo = new CMD_Chat.CMD_CRS_S_PlaceBetInfo();
    placeBetInfo.tagSpecialMultiple = [];
    placeBetInfo.tagCommonBetInfo = [];
    const placeBetHead = data.toStruct(CMD_Chat.CMD_CRS_S_PlaceBetHead);
    placeBetInfo.placeBetHead = placeBetHead;
    //游戏名称
    // let GameName = AWindow.GameTypeList[placeBetHead.wKindID.value];

    // if (GameName === null || GameName === undefined) return;

    if (!data.isEOF()) {
      // TODO:
      const tagCommonBetInfo = data.getDataBuffer(CreateObject(common.tagCommonBetInfo).size() * placeBetHead.wBetCount.value).toStructList(common.tagCommonBetInfo);
      placeBetInfo.tagCommonBetInfo = tagCommonBetInfo;
    }

    if (!data.isEOF()) {
      const tagSpecialMultiple = data.getDataBuffer(CreateObject(common.tagSpecialMultiple).size() * placeBetHead.wMultipleCount.value).toStructList(common.tagSpecialMultiple);
      placeBetInfo.tagSpecialMultiple = tagSpecialMultiple;
    }

    //屏蔽香港六合彩
    // if (data.wKindID.value === 2903) return;

    this.dispatch(ChatRoute.userBetRecord, placeBetInfo);
  }

  /**
   * @description: 下注成功
   * @param {DataBuffer} data
   * @return {*}
   */
  private onBetSuccess(data: DataBuffer) {
    this.dispatch(ChatRoute.betSuccess, data);
  }

  /**
   * @description: 下注信息失败
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onBetFaild(data: DataBuffer) {
    let betfaild = data.toStruct(CMD_Chat.CMD_CRS_S_BetFailure);
    let cbFailType = betfaild.nResultCode.value;

    //如果未读取完整 ---存在三个struct组合包下发需要进行特殊解析
    if (!data.isEOF()) {
      let followBetFailInfo = data.toStruct(common.tagBetFailInfo);
      cbFailType = followBetFailInfo.cbFailType;
    }
    let strBetFailType = common.GamePlaceJettonFail(cbFailType.value);
    //用toast提示错误信息
    console.log('下注信息失败', data);
    this.dispatch(ChatRoute.betFaild, strBetFailType);
  }

  /**
   * @description: 游戏设置
   * @param {DataBuffer} data
   * @return {*}
   */
  private onSelectGame(data: DataBuffer) {
    this.dispatch(ChatRoute.selectGame, data);
  }

  /**
   * @description: 游戏记录
   * @param {CMD_Chat} list
   * @return {*}
   */
  private onGameRecord(list: Array<common.tagCommonSSCRecordInfo>) {
    this.dispatch(ChatRoute.gameRecord, list);
  }

  /**
   * @description: 发送聊天消息成功
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onLiveChat(data: CMD_Chat.CMD_CRS_S_UserChat) {
    this.dispatch(ChatRoute.liveChat, new ChatHistoryRecord(CMD_Chat.emCRSRecordType.CRSRT_USER_CHAT, data));
  }

  /**
   * @description: 管理员删除消息，需要将界面上对应的聊天消息删除
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onDeleteMessage(data: CMD_Chat.CMD_CRS_S_DeleteMessage) {
    this.dispatch(ChatRoute.deleteMessage, data);
  }

  /**
   * @description: 管理员在后台手动发送消息
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onManagerMessage(data: CMD_Chat.CMD_CRS_S_ManagerMessage) {
    this.dispatch(ChatRoute.managerMessage, new ChatHistoryRecord(CMD_Chat.emCRSRecordType.CRSRT_MANAGER_MSG, data));
  }

  private onNoticeMessage(data: DataBuffer) {
    this.dispatch(ChatRoute.onNoticeMessage, data);
  }

  /**
   * @description: 推送游戏内满足条件的赢分消息
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onGameBroadcast(data: CMD_Chat.tagChatRoomWinBroadcast) {
    this.dispatch(ChatRoute.winBroadcast, data);
  }

  /**
   * @description: 历史记录
   * @param {DataBuffer} data
   * @return {*}
   */
  private onHistoryRecord(data: DataBuffer) {
    let headRecord = CreateObject(CMD_Chat.tagRecordHead);
    let recordList = new Array<ChatHistoryRecord>();

    while (!data.isEOF()) {
      headRecord.readBuffer(data);
      if (headRecord.cbRecordType.value < CMD_Chat.emCRSRecordType.CRSRT_USER_CHAT || headRecord.cbRecordType.value > CMD_Chat.emCRSRecordType.CRSRT_USER_HB) {
        break;
      }
      let recordItem = null;
      let tmpData = null;
      switch (headRecord.cbRecordType.value) {
        case CMD_Chat.emCRSRecordType.CRSRT_USER_CHAT: //用户聊天
          // 因为结构数据是不固定长需要单独读取相应字节数进行另外处理
          tmpData = data.getDataBuffer(headRecord.wDataSize.value);
          if (tmpData === null) break;
          recordItem = tmpData.toStruct(CMD_Chat.CMD_CRS_S_UserChat);
          break;

        case CMD_Chat.emCRSRecordType.CRSRT_MANAGER_MSG: //管理员信息
          // 因为结构数据是不固定长需要单独读取相应字节数进行另外处理
          tmpData = data.getDataBuffer(headRecord.wDataSize.value);
          if (tmpData === null) break;
          recordItem = tmpData.toStruct(CMD_Chat.CMD_CRS_S_ManagerMessage);
          break;

        case CMD_Chat.emCRSRecordType.CRSRT_SYS_HB: //系统红包
          recordItem = data.toStruct(CMD_Chat.tagChatSystemHongBaoInfo);
          break;

        case CMD_Chat.emCRSRecordType.CRSRT_USER_HB: //用户红包
          recordItem = data.toStruct(CMD_Chat.tagChatUserHongBaoInfo);
          break;
      }
      //抛出数据列表还是单独一个个发 看效果情况
      recordList.push(new ChatHistoryRecord(headRecord.cbRecordType.value, recordItem));
    }

    this.dispatch(ChatRoute.historyRecord, recordList);
  }

  /**
   * @description: 历史记录下发完成
   * @param {DataBuffer} _data 数据是空的无需处理
   * @return {*}
   */
  private onHistoryRecordFinish(_data: DataBuffer) {}

  //////////////////////////////////////////////////////////////////////////////////////
  //红包相关

  /**
   * @description: 系统红包配置信息
   * @return {*}
   */
  private onSysRedPacketInfo(data: CMD_Chat.tagChatSystemHongBaoInfo) {
    this.dispatch(ChatRoute.sysRedPacketInfo, new ChatHistoryRecord(CMD_Chat.emCRSRecordType.CRSRT_SYS_HB, data));
  }

  /**
   * @description: 用户新发红包信息
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onUserRedPacketInfo(data: CMD_Chat.tagChatUserHongBaoInfo) {
    this.dispatch(ChatRoute.userRedPacketInfo, new ChatHistoryRecord(CMD_Chat.emCRSRecordType.CRSRT_USER_HB, data));
  }

  /**
   * @description: 系统红包取消置顶时下发
   * @param {DWORD} data
   * @return {*}
   */
  private onSysRedPacketState(data: DWORD) {
    this.dispatch(ChatRoute.sysRedPacketState, data);
  }

  /**
   * @description: 领取红包-奖励结果
   * @param {SCORE} data
   * @return {*}
   */
  private onReceiveRedPacketSuccess(data: SCORE) {
    this.dispatch(ChatRoute.receiveRedPacketSuccess, data);
  }

  /**
   * @description: 发送红包成功
   * @param {SCORE} data
   * @return {*}
   */
  private onSendRedPacketSuccess(data: DWORD) {
    this.dispatch(ChatRoute.sendRedPacketSuccess, data);
  }

  /**
   * @description: 领取红包排行
   * @param {Array} list
   * @return {*}
   */
  private onReceiveRedPacketRank(list: Array<CMD_Chat.tagHongBaoReceive>) {
    this.dispatch(ChatRoute.receiveRedPacketRank, list);
  }

  /**
   * @description: 查询红包状态
   * @param {BYTE} data
   * @return {*}
   */
  private onRedPacketState(data: BYTE) {
    this.dispatch(ChatRoute.qureyRedPacketState, data);
  }

  /**
   * @description: 查询红包配置
   * @param {CMD_Chat} data
   * @return {*}
   */
  private onRedPacketConfig(data: CMD_Chat.tagChatHongBaoSendConfig) {
    this.dispatch(ChatRoute.qureyRedPacketConfig, data);
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
