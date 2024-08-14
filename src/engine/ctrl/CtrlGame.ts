import { valueArr, normalArr, rateArr, transArr } from '@/constants';
import { time } from '@/utils/time';
import { withTranslation } from 'react-i18next';
import { BOOL, BYTE, CreateObject, WORD } from '../base/basetype';
import { DataBuffer } from '../base/databuffer';
import { common } from '../cmd/common/CMD_COMMON';
import { CMD_Game } from '../cmd/game/CMD_Game';
import { BaseSocket } from '../net/clientsocket';
import { LongDragonRoute, NetCommonRoute, NetData } from './NetRoute';

class CtrlGame extends BaseSocket {
  //区分判断用什么登录方式
  private token: any = false;
  // 外部回调函数
  private netCallBack: Function = null;
  // 游戏逻辑回调
  private gameCallBack: Function = null;
  // 长龙相关回调
  private longDragonCallBack: Function = null;
  // 目标对象
  private target: object = null;
  // 游戏场景状态
  gameSceneState: number = 0;

  private isReconnect: boolean = true;

  private webId: string = '';

  constructor(url: string, webId: string) {
    super(url, null, true);
    this.webId = webId;
  }

  // constructor(props) {
  //   const { url, webId, t } = props;
  //   super(url, null, true);
  //   this.webId = webId;
  //   this.ownProps = props
  // }

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
  dispatcherCall(netCallback: Function, gameCallback: Function, _target?: object) {
    this.netCallBack = netCallback;
    this.gameCallBack = gameCallback;
    this.target = _target;
  }

  /**
   * @description: 添加长龙外部回调方法
   * @param {Function} callback
   * @param {object} _target
   * @return {*}
   */
  dispatcherDragon(longDragonCallBack: Function, _target?: object) {
    this.longDragonCallBack = longDragonCallBack;
    this.target = _target;
  }

  /////////////////////////////////////////
  //游戏场景
  /**
   * @description: 请求最新的游戏场景
   * @return {*}
   */
  postGameScene() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GF_FRAME, CMD_Game.SUB_GF_SCENE_CONFIG);
      return true;
    }
    return false;
  }

  /**
   * @description: 获取场景状态
   * @return {*}
   */
  getGameSceneState() {
    return this.gameSceneState;
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  //长龙相关发送命令接口

  /**
   * @description: 进入长龙界面
   * @return {*}
   */
  loginLongDragon() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_ENTER);
      return true;
    }
    return false;
  }

  /**
   * @description: 离开长龙界面
   * @return {*}
   */
  logoutLongDragon() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_LEAVE);
      return true;
    }
    return false;
  }

  /**
   * @description: 查询单个长龙区域的游戏记录
   * @param {number} kindId 游戏类型
   * @param {number} ltype 长龙主类型
   * @return {*}
   */
  queryLongDragonRecord(kindId: number, ltype: number) {
    if (this.isCan()) {
      let qInfo = CreateObject(CMD_Game.CMD_GR_SSCCL_QueryRecord);
      qInfo.wKindID.value = kindId;
      qInfo.cbChangLongMainType.value = ltype;
      this.SendData(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_QUERY_RECORD, qInfo);
      return true;
    }
    return false;
  }

  /**
   * @description: 查询所有长龙区域的下注信息
   * @return {*}
   */
  queryLongDragonBetInfo() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_QUERY_BET);
      return true;
    }
    return false;
  }

  /**
   * @description: 关闭游戏
   * @return {*}
   */
  longDragonClose() {
    if (this.isCan()) {
      this.SendData(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_CLOSE);
      return true;
    }
    return false;
  }

  /**
   * @description: 长龙界面用户下注
   * @param {CMD_Game} betScore
   * @return {*}
   */
  longDragonBet(betScore: CMD_Game.CMD_GR_SSCCL_PlaceBet) {
    if (this.isCan() && betScore) {
      this.SendData(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_USER_BET, betScore);
      return true;
    }
    return false;
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  /**
   * @description: 是否允许发送
   * @return {*}
   */
  isCan() {
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
   * @description: 游戏逻辑分发数据
   * @param {number} _dataType
   * @param {any} _data
   * @return {*}
   */
  dispatchGame(_dataType: number, _data?: any) {
    if (this.gameCallBack) {
      this.gameCallBack.call(this.target, new NetData(_dataType, _data), this);
    }
  }

  /**
   * @description: 长龙数据派发
   * @param {number} _dataType
   * @param {any} _data
   * @return {*}
   */
  private dispatchLongDragon(_dataType: number, _data?: any) {
    if (this.longDragonCallBack) {
      this.longDragonCallBack.call(this.target, new NetData(_dataType, _data), this);
    }
  }

  /**
   * @description: 事件注册
   * @return {*}
   */
  initEvent() {
    this.onConnected = this.onConnect.bind(this);
    this.onClosed = this.onClose.bind(this);
    this.onReconnectFailed = this.onReconnectFaile.bind(this);

    //登录成功
    this.RegistMessageEx(CMD_Game.MDM_GR_LOGON, CMD_Game.SUB_GR_LOGON_SUCCESS, this.onLoginSuccess.bind(this), CMD_Game.CMD_GR_LogonSuccess);
    this.RegistMessage(CMD_Game.MDM_GR_LOGON, CMD_Game.SUB_GR_LOGON_FINISH, this.onLoginFinish.bind(this));
    //注册监听系统通知显示toast提示信息
    this.RegistMessageEx(CMD_Game.MDM_GR_USER, CMD_Game.SUB_GR_SYSTEM_MESSAGE, this.onSysMessage.bind(this), CMD_Game.CMD_GR_SystemMessage);

    // 游戏场景

    /**
     * @description: 游戏场景状态
     */
    this.RegistMessageEx(CMD_Game.MDM_GF_FRAME, CMD_Game.SUB_GF_GAME_STATUS, this.onGameSceneState.bind(this), BYTE);

    /**
     * @description: 游戏场景配置
     */
    this.RegistMessage(CMD_Game.MDM_GF_FRAME, CMD_Game.SUB_GF_GAME_SCENE, this.onGameSceneConfig.bind(this));

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //长龙相关接口
    /**
     * @description: 登录成功后或者有新增的区域，会下发区域信息
     */
    this.RegistMessageList(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_ITEM, this.onLongDragonAreaInfo.bind(this), common.tagSSCChangLongInfoItem);

    /**
     * @description: 当区域不满足连开条件，会下发移除区域消息
     */
    this.RegistMessageEx(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_REMOVE_ITEM, this.onRemoveLongDragonAreaInfo.bind(this), CMD_Game.CMD_GR_SSCCL_RemoveItem);

    /**
     * @description: 登录成功后或者有变化的赔率，会下发赔率信息
     * 客户端进入场景后，需要根据此消息维护本地的赔率信息，新增的区域信息时不会附加赔率信息下来
     */
    this.RegistMessageList(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_MULT, this.onLongDragonMult.bind(this), common.tagSSCChangLongInfoMult);

    /**
     * @description: 查询单个长龙区域的游戏记录
     */
    this.RegistMessageEx(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_QUERY_RECORD, this.onLongDragonRecord.bind(this), common.tagSSCChangLongInfoRecord);

    /**
     * @description: 查询所有长龙区域的下注信息
     */
    this.RegistMessageList(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_BET_INFO, this.onLongDragonBetInfo.bind(this), common.tagSSCChangLongInfoBet);

    /**
     * @description: 游戏关闭
     */
    this.RegistMessageEx(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_CLOSE, this.onLongDragonClose.bind(this), WORD);

    /**
     * @description: 长龙下注成功
     */
    this.RegistMessageEx(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_USER_BET_SUCCESS, this.onLongDragonBetSuccess.bind(this), WORD);

    /**
     * @description: 长龙下注失败
     */
    this.RegistMessage(CMD_Game.MDM_GR_SSC, CMD_Game.SUB_GR_SSC_CL_USER_BET_FAILURE, this.onLongDragonBetFaild.bind(this));

    //同一用户重复登录时，会向较先登录的连接发送被顶号消息
    this.RegistMessageEx(CMD_Game.MDM_GR_LOGON, CMD_Game.SUB_GR_REPEAT_LOGON,this.onRepeatLogin.bind(this), BOOL)
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
   * @param {*} _GR
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
      let login = CreateObject(CMD_Game.CMD_GR_LogonToken);
      login.dwGameID.value = this.token.gameId; //22187586//86869826
      login.strToken.value = this.token.token; //'a801778c4a764245a7d8aa69200fadb6'//'a801778c4a764245a7d8aa69200fadb6'
      login.cbDeviceType.value = 0x40;
      login.szMachineID.value = this.webId.toMD5(true);
      this.SendData(CMD_Game.MDM_GR_LOGON, CMD_Game.SUB_GR_LOGON_TOKEN, login);
    } else {
      let login = CreateObject(CMD_Game.CMD_GR_LogonMachine);
      login.cbDeviceType.value = 0x40;
      login.szMachineID.value = this.webId.toMD5(true);
      login.tLogonTime.value = time.getCurTime();
      login.strLogonVerify.value = (common.COMPILATIO+'_'+login.tLogonTime.value).toMD5(false);
      this.SendData(CMD_Game.MDM_GR_LOGON, CMD_Game.SUB_GR_LOGON_MACHINE, login);
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
  private onLoginSuccess(data: CMD_Game.CMD_GR_LogonSuccess) {
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
   * @description: 登录失败
   * @param {*} data
   * @return {*}
   */
  private onSysMessage(data: CMD_Game.CMD_GR_SystemMessage) {
    //用toast提示错误信息
    this.dispatch(NetCommonRoute.systemMessage, data);
    // 登录失败的情况下用系统提示
    if (data.wMainCmdID.value === CMD_Game.MDM_GR_LOGON && data.wSubCmdID.value === CMD_Game.SUB_GR_LOGON_FAILURE) {
      //判断登录失败的处理
      this.isReconnect = false;
      this.Close();
    }
  }

  /**
   * @description: 游戏场景接口
   * @param {DataBuffer} data
   * @return {*}
   */
  onGameSceneState(sceneState: BYTE) {
    if (sceneState) {
      this.gameSceneState = sceneState.value;
    }
  }

  /**
   * @description: 游戏场景配置
   * @param {DataBuffer} data
   * @return {*}
   */
  onGameSceneConfig(_data: DataBuffer) {
    // console.log(_data);
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  //长龙相关

  /**
   * @description: 区域信息下发
   * @param {common} data
   * @return {*}
   */
  onLongDragonAreaInfo(list: Array<common.tagSSCChangLongInfoItem>) {
    this.dispatchLongDragon(LongDragonRoute.areaInfo, list);
  }

  /**
   * @description: 移除区域信息
   * @param {CMD_Game} data
   * @return {*}
   */
  onRemoveLongDragonAreaInfo(data: CMD_Game.CMD_GR_SSCCL_RemoveItem) {
    this.dispatchLongDragon(LongDragonRoute.removeareaInfo, data);
  }

  /**
   * @description: 赔率信息 每个区域信息会有2-3个赔率信息，取决于该区域的长龙子类型数量
   * @param {common} list
   * @return {*}
   */
  onLongDragonMult(list: Array<common.tagSSCChangLongInfoMult>) {
    this.dispatchLongDragon(LongDragonRoute.multInfo, list);
  }

  /**
   * @description: 查询单个长龙区域的游戏记录
   * @param {common} data
   * @return {*}
   */
  onLongDragonRecord(data: common.tagSSCChangLongInfoRecord) {
    this.dispatchLongDragon(LongDragonRoute.ldRecord, data);
  }

  /**
   * @description: 查询所有长龙区域的下注信息
   * @param {common} list
   * @return {*}
   */
  onLongDragonBetInfo(list: Array<common.tagSSCChangLongInfoBet>) {
    this.dispatchLongDragon(LongDragonRoute.betInfo, list);
  }

  /**
   * @description: 游戏关闭
   * @param {DataBuffer} data
   * @return {*}
   */
  onLongDragonClose(kindId: DataBuffer) {
    this.dispatchLongDragon(LongDragonRoute.ldClose, kindId);
  }

  /**
   * @description: 下注成功
   * @param {DataBuffer} data
   * @return {*}
   */
  onLongDragonBetSuccess(kindId: WORD) {
    this.dispatchLongDragon(LongDragonRoute.betSuccess, kindId);
  }

  // formatMsg = (key: string, parm: any[]) => {
  //   const { t } = this.ownProps;
  //   console.log(key, parm);
    
  //   if (valueArr.includes(key)) {
  //     return t(key);
  //   }
  //   if (normalArr.includes(key)) {
  //     return t(key, { keyCode: parm[0] });
  //   }
  //   if (rateArr.includes(key)) {
  //     return t(key, { rateNum: parm[0] / 10000 });
  //   }
  //   if (transArr.includes(key)) {
  //     return t(key, { tarnsText: t(parm[0]) });
  //   }
  //   return t(key);
  // };


  /**
   * @description: 下注失败
   * @param {CMD_Game} data
   * @return {*}
   */


  onLongDragonBetFaild(data: DataBuffer): void{
    let errInfo = data.toStruct(CMD_Game.CMD_GR_SSCCL_BetFailure)
    let errorDesc = '';
    if (!data.isEOF()) {
      errorDesc = common.GetBetFaildDesc(data);
    } else {
      // errorDesc = errInfo.szDescribeString.value;
      errorDesc =  JSON.parse(errInfo.szDescribeString.value)
    }
    this.dispatchLongDragon(LongDragonRoute.betFaild, errorDesc);
  }
  
  /**
   * @description: 同一用户重复登录时，会向较先登录的连接发送被顶号消息
   * @param {BOOL} data
   * @return {*}
   */
  private onRepeatLogin(data:BOOL) {
    this.isReconnect = false;
    this.dispatch(NetCommonRoute.onRepeatLogin,data)
    this.Close();
  }
  /////////////////////////////////////////////////////////////////////////////////////////
}

// export default withTranslation()(CtrlGame);
export default CtrlGame;