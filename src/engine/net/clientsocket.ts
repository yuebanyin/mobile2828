/* eslint-disable */
import { CreateObject, Struct } from '../base/basetype';
import { DataBuffer } from '../base/databuffer';
import Encry from '../base/encry';
import { common } from '../cmd/common/CMD_COMMON';
import { NetHeadLen, TCP_Head, TCP_Validate } from './headinfo';
function MAKELONG(a: number, b: number) {
  return (a & 0xffff) | ((b & 0xffff) << 16);
}
// function LOWORD(l:number){
//     return l&0xffff
// }

// function HIWORD(l:number){
//     return ((l>>16)&0xffff)
// }

class RegistEvent {
  private target: any = null;
  private cb: Function = null;
  private bonce: boolean = true;
  private once: number = 0;
  private ctor: any = null;
  private blist: boolean = false;
  constructor(_cb: Function, _target: any = null, _bonce: boolean = false) {
    this.target = _target;
    this.cb = _cb;
    this.bonce = _bonce;
    this.blist = false;
    if (_bonce) {
      this.once = 1;
    }
  }

  /**
   * @description: 绑定结构方法
   * @param {Function} _cb
   * @param {function} ctor
   * @param {any} _target
   * @param {boolean} _bonce
   * @return {*}
   */
  SetParams<T>(_cb: Function, ctor: new (len: number) => T, _target: any = null, blist: boolean = false, _bonce: boolean = false) {
    this.target = _target;
    this.cb = _cb;
    this.ctor = ctor;
    this.blist = blist;
    this.bonce = _bonce;
    if (_bonce) {
      this.once = 1;
    }
  }

  /**
   * @description: 解析数据包
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @param {DataBuffer} data
   * @return {*}
   */
  private analysisPack(MainCmdID: number, SubCmdID: number, data: DataBuffer) {
    if (this.ctor) {
      if (this.blist) {
        let list = data.toStructList(this.ctor);
        this.cb.call(this.target, list, MainCmdID, SubCmdID);
      } else {
        let msg = data.toStruct(this.ctor);
        this.cb.call(this.target, msg, MainCmdID, SubCmdID);
      }
    } else {
      this.cb.call(this.target, data, MainCmdID, SubCmdID);
    }
  }

  /**
   * @description: 执行
   * @param {number} MainCmdID
   * @param {null} SubCmdID
   * @param {DataBuffer} data
   * @return {*}
   */
  Run(MainCmdID: number, SubCmdID: number, data: DataBuffer) {
    if (this.bonce && this.once === 1) {
      this.analysisPack(MainCmdID, SubCmdID, data);
      this.once = 0;
    } else {
      this.analysisPack(MainCmdID, SubCmdID, data);
    }
  }

  IsOnce() {
    return this.bonce;
  }
}
class NetDispatcher {
  private handlers = new Map<number, RegistEvent>(); //注册消息头与响应函数

  /**
   * @description: 注册监听事件
   * @param {any} target
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @param {Function} callFunc
   * @return {*}
   */
  registMessage(MainCmdID: number, SubCmdID: number, callFunc: Function, target: any = null, bonce: boolean = false): boolean {
    if (callFunc === null) {
      clog.warn('registMessage error: MainCmdID = {},SubCmdID = {}, func({}) is undefined', MainCmdID, SubCmdID, callFunc);
      return false;
    } else {
      let msgId = MAKELONG(SubCmdID, MainCmdID);
      let handler = this.handlers.get(msgId);
      if (handler === null || handler === undefined) {
        handler = new RegistEvent(callFunc, target, bonce);
        this.handlers.set(msgId, handler);
      }
    }
    return true;
  }

  /**
   * @description: 注册监听事件
   * @param {any} target
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @param {Function} callFunc
   * @return {*}
   */
  registMessageEx<T>(MainCmdID: number, SubCmdID: number, callFunc: Function, ctor: new (len: number) => T, target: any = null, bonce: boolean = false): boolean {
    if (callFunc === null) {
      clog.warn('registMessage error: MainCmdID = {},SubCmdID = {}, func({}) is undefined', MainCmdID, SubCmdID, callFunc);
      return false;
    } else {
      let msgId = MAKELONG(SubCmdID, MainCmdID);
      let handler = this.handlers.get(msgId);
      if (handler === null || handler === undefined) {
        handler = new RegistEvent(callFunc, target, bonce);
        handler.SetParams(callFunc, ctor, target, bonce);
        this.handlers.set(msgId, handler);
      }
    }
    return true;
  }

  /**
   * @description: 注册监听事件--列表结构
   * @param {any} target
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @param {Function} callFunc
   * @return {*}
   */
  registMessageList<T>(MainCmdID: number, SubCmdID: number, callFunc: Function, ctor: new (len: number) => T, target: any = null, blist: boolean = false, bonce: boolean = false): boolean {
    if (callFunc === null) {
      clog.warn('registMessage error: MainCmdID = {},SubCmdID = {}, func({}) is undefined', MainCmdID, SubCmdID, callFunc);
      return false;
    } else {
      let msgId = MAKELONG(SubCmdID, MainCmdID);
      let handler = this.handlers.get(msgId);
      if (handler === null || handler === undefined) {
        handler = new RegistEvent(callFunc, target, bonce);
        handler.SetParams(callFunc, ctor, target, blist, bonce);
        this.handlers.set(msgId, handler);
      }
    }
    return true;
  }

  /**
   * @description: 取消事件绑定
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @return {*}
   */
  cancelMessage(MainCmdID: number, SubCmdID: number) {
    let msgId = MAKELONG(SubCmdID, MainCmdID);
    let handler = this.handlers.get(msgId); // 取到消息msgId对应的响应对象map
    if (handler) {
      this.handlers.delete(msgId);
    }
  }

  /**
   * @description: 根据消息头响应函数
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @param {DataBuffer} data
   * @return {*}
   */
  dispatchMessage(MainCmdID: number, SubCmdID: number, data: DataBuffer) {
    let msgId = MAKELONG(SubCmdID, MainCmdID);
    let handler = this.handlers.get(msgId); // 取到消息msgId对应的响应对象map
    if (handler) {
      handler.Run(MainCmdID, SubCmdID, data);
      if (handler.IsOnce()) {
        this.handlers.delete(msgId);
      }
    }
  }
  /**
   * 获取响应函数
   */
  isCallFuncExist(MainCmdID, SubCmdID) {
    let msgId = MAKELONG(SubCmdID, MainCmdID);
    return this.handlers.has(msgId);
  }

  /**
   * @description: 移除所有绑定
   * @return {*}
   */
  clear() {
    this.handlers.clear();
  }
}

class ClientSocket {
  static ReConnectCount: number = 30;
  private OPEN: number = 1;
  private CLOSE: number = 2;
  private ERROR: number = 3;
  private bsendheart: boolean = false; // 是否开启心跳
  private url: string = ''; //服务ip
  private ws: WebSocket | null = null; //websocket
  private zdCloseStatus: boolean = false; //主动断开状态
  private connectStatus: boolean = false; //连接状态
  private targetcaller: any = null; //回调类对象
  private reconnectclockid: number = -1; //重连timeid
  private reconnectinterval: number = 5; //重连间隔/s
  private reconnectcount: number = ClientSocket.ReConnectCount; //重连次数
  private breconnect: boolean = false; //是否断线重连上
  private heartbeatclockid: number = -1; // 心跳时钟id
  private heartbeattimer: number = 10000; // 心跳秒钟

  onConnected: Function = null; //连接回调
  onMessage: Function = null; //网络消息回调
  onError: Function = null; //错误回调
  onClosed: Function = null; //关闭回调
  ShutDownClose: Function = null; //服务器主动关闭连接
  onReconnectFailed: Function = null; //重连失败回调

  constructor(url: string, caller: any, bheart: boolean = false) {
    this.url = url;
    this.targetcaller = caller;
    this.bsendheart = bheart;
    this.ws = null;
    this.onConnected = null;
    this.onMessage = null;
    this.onError = null;
    this.onClosed = null;
    this.onReconnectFailed = null;
  }

  /**
   * @description: 连接服务器
   * @param {string} url
   * @param {any} caller
   * @param {Function} onConnected
   * @param {Function} onMessage
   * @param {Function} onError
   * @param {Function} onClosed
   * @param {Function} onReconnectFailed
   * @return {*}
   */
  Init(): boolean {
    this.zdCloseStatus = false;
    if (this.url.length > 0) {
      if (this.ws !== null) {
        if (this.ws.readyState === WebSocket.CLOSED) {
          this.ws = new WebSocket(this.url);
        } else if (this.ws.readyState < WebSocket.CLOSING) {
          return false;
        }
      } else {
        this.ws = new WebSocket(this.url);
      }
      this.ws.onopen = this.Open.bind(this);
      this.ws.onclose = this.OnClose.bind(this);
      this.ws.onerror = this.OnError.bind(this);
      this.ws.onmessage = this.OnMsg.bind(this);
      return true;
    } else {
      if (!this.ws && this.ws.readyState < WebSocket.CLOSING) {
        return false;
      }
      return true;
    }
    return false;
  }

  /**是否连接
   * @description:
   * @return {*}
   */
  IsConnect(): boolean {
    return this.connectStatus;
  }

  /**
   * @description: 设置回调方法
   * @param {object} caller
   * @return {*}
   */
  SetCaller(caller: object) {
    if (caller) {
      this.targetcaller = caller;
    }
  }

  /**
   * @description: 设置心跳包间隔发送时间
   * @param {number} heartbeattimer
   * @return {*}
   */
  SetHeartTime(heartbeattimer: number) {
    if (heartbeattimer <= 0) {
      return;
    }
    this.heartbeattimer = heartbeattimer;
  }

  /**
   * @description: 发送验证信息
   * @return {*}
   */
  SendValidate() {
    if (this.IsConnect()) {
      let validate = CreateObject(TCP_Validate);
      validate.szValidateKey.value = common.COMPILATIO;
      this.SendData(common.MDM_KN_COMMAND, common.SUB_KN_VALIDATE_SOCKET_WEB, validate);
    }
  }

  /**
   * @description: 连接成功回调
   * @param {Event} event
   * @return {*}
   */
  private Open(event: Event) {
    clog.info('Socket: websocket onopen {},{}', event, this.url);
    if (this.reconnectclockid != -1) {
      clearInterval(this.reconnectclockid);
      this.reconnectclockid = -1;
    }
    this.connectStatus = true;
    this.breconnect = false;
    this.SendValidate();
    let msg = { Id: this.OPEN };
    //是否启动心跳
    if (this.bsendheart) {
      if (this.heartbeatclockid != -1) {
        clearInterval(this.heartbeatclockid);
        this.heartbeatclockid = -1;
      }

      let _this = this;
      this.heartbeatclockid = window.setInterval(function () {
        _this.SendData(0, 1);
      }, this.heartbeattimer);
    }
    if (this.onConnected != null) {
      this.onConnected.call(this.targetcaller, msg);
    }
  }

  /**
   * @description: 网络断开
   * @param {CloseEvent} event
   * @return {*}
   */
  private OnClose(event: CloseEvent) {
    clog.info('Socket: websocket onclose: {}, reconnect: {},connectStatus:{} ', event, this.reconnectcount, this.connectStatus);
    if (this.bsendheart) {
      if (this.heartbeatclockid != -1) {
        clearInterval(this.heartbeatclockid);
        this.heartbeatclockid = -1;
      }
    }
    if (this.onReconnectFailed && this.reconnectcount !== ClientSocket.ReConnectCount) {
      if (this.reconnectcount <= 0) {
        // -1 : 重连超时
        this.reconnectcount = ClientSocket.ReConnectCount;
        if (this.onReconnectFailed) {
          this.onReconnectFailed.call(this.targetcaller);
          return;
        }
      }
    }
    let msg = { Id: this.CLOSE };
    this.connectStatus = false;
    if (this.onClosed) {
      this.onClosed.call(this.targetcaller, msg);
    }
  }

  /**
   * @description: 网络错误
   * @param {Event} event
   * @return {*}
   */
  private OnError(event: Event) {
    clog.info('Socket: websocket onerror: {}', event);
    this.breconnect = false;
    let msg = { Id: this.ERROR };
    if (this.onError != null) {
      this.onError.call(this.targetcaller, msg);
    }
  }

  /**
   * @description: 网络读取回调
   * @param {MessageEvent} ev
   * @return {*}
   */
  private OnMsg(ev: MessageEvent) {
    if (this.reconnectclockid !== -1) {
      clearInterval(this.reconnectclockid);
      this.reconnectclockid = -1;
    }
    let type = Object.prototype.toString.call(ev.data);
    let _this = this;
    if (type === '[object String]') {
      this.ReadUint8Array(ev.data);
    } else if (type === '[object Blob]') {
      let reader = new FileReader();
      reader.readAsArrayBuffer(ev.data);
      reader.onload = function (_e: ProgressEvent<FileReader>) {
        let data = new Uint8Array(reader.result as ArrayBuffer);
        if (common.MDM_DATAKIND === 1) {
          _this.CrevasseBuffer(data);
        }
        _this.ReadUint8Array(data);
      }.bind(this);
    } else {
      let data = new Uint8Array(ev.data);
      if (common.MDM_DATAKIND === 1) {
        this.CrevasseBuffer(data);
      }
      this.ReadUint8Array(data);
    }
  }

  /**
   * @description: 数据派发处理
   * @param {Uint8Array} data
   * @return {*}
   */
  private ReadUint8Array(data: Uint8Array | string) {
    let type = Object.prototype.toString.call(data);
    if (type === '[object String]') {
      if (this.onMessage != null) {
        this.onMessage.call(this.targetcaller, -1000, -1000, data);
      }
    } else {
      let asm = new DataBuffer(0, data);
      let head = CreateObject(TCP_Head);
      let headbuf = asm.getUint8Array(head.size());
      head.readBuffer(new DataBuffer(0, headbuf));
      if (head.CommandInfo.wMainCmdID.value == common.MDM_KN_COMMAND && head.CommandInfo.wSubCmdID.value == common.SUB_KN_DETECT_SOCKET) {
        // clog.info("heartbeat：{}",head.CommandInfo.wSubCmdID.value)
        return;
      } else if (head.CommandInfo.wMainCmdID.value == common.MDM_KN_COMMAND && head.CommandInfo.wSubCmdID.value == common.SUB_KN_SHUT_DOWN_SOCKET) {
        if (this.ShutDownClose) {
          this.ShutDownClose.call(this.targetcaller);
          return;
        }
      }
      let packsize = head.TCPInfo.wPacketSize.value - head.size();
      let packdata = asm.getDataBuffer(packsize);
      if (this.onMessage != null) {
        this.onMessage.call(this.targetcaller, head.CommandInfo.wMainCmdID.value, head.CommandInfo.wSubCmdID.value, packdata);
      }
    }
  }

  /**
   * @description: 数据加密处理
   * @param {Uint8Array} MsgBuf
   * @return {*}
   */
  private EncryptBuffer(MsgBuf: Uint8Array): number {
    let cbCheckCode = 0;
    for (let i = NetHeadLen.TCP_INFO_LEN; i < MsgBuf.length; i++) {
      cbCheckCode = Encry.getUnsignedByte(cbCheckCode + Encry.getUnsignedByte(MsgBuf[i]));
      MsgBuf[i] = Encry.MapSendByte(MsgBuf[i]);
    }
    cbCheckCode = Encry.getUnsignedByte(Encry.getUnsignedByte(~cbCheckCode) + 1);
    MsgBuf[1] = cbCheckCode;
    return cbCheckCode;
  }

  /**
   * @description: 解密处理
   * @param {Uint8Array} MsgBuf
   * @return {*}
   */
  private CrevasseBuffer(MsgBuf: Uint8Array) {
    for (let i = NetHeadLen.TCP_INFO_LEN; i < MsgBuf.length; i++) {
      MsgBuf[i] = Encry.MapRecvByte(MsgBuf[i]);
    }
  }

  /**
   * @description: Socket的状态
   * @return {*}
   */
  ReadyState() {
    if (!!this.ws) {
      return this.ws.readyState;
    }
    return 0;
  }

  /**
   * @description: 是否为主动断开
   * @return {*}
   */
  IsZdClose() {
    return this.zdCloseStatus;
  }

  /**
   * @description: 重新建立连接
   * @return {*}
   */
  Reconnect() {
    if (this.zdCloseStatus) return;
    clog.info('this Reconnect times = {}', this.reconnectcount);
    let _this = this;
    if (this.reconnectcount > 0) {
      (function () {
        if (_this.reconnectclockid === -1) {
          // 每5秒重试一次
          _this.reconnectclockid = window.setInterval(function () {
            if (_this.breconnect === true) return;
            clog.info('尝试重连+++', _this.reconnectcount);
            _this.Disconnect();
            --_this.reconnectcount;
            _this.breconnect = true;
            if (0 >= _this.reconnectclockid) {
              // 重连超时
              _this.reconnectcount = -1;
              clearInterval(_this.reconnectclockid);
              _this.reconnectclockid = -1;
              if (_this.onReconnectFailed) {
                _this.onReconnectFailed.call(_this.targetcaller);
              }
            } else {
              _this.Init();
            }
          }, _this.reconnectinterval * 1000);
        }
      })();
    }
  }

  /**
   * @description: 断开连接
   * @return {*}
   */
  Disconnect() {
    if (!!this.ws) {
      this.ws.close();
      delete this.ws;
      this.ws = null;
    }
    this.connectStatus = false;
    this.breconnect = false;
    if (this.bsendheart) {
      clearInterval(this.heartbeatclockid);
      this.heartbeatclockid = -1;
    }
  }

  /**
   * @description: 主动关闭连接
   * @return {*}
   */
  Close() {
    this.zdCloseStatus = true;
    if (this.reconnectclockid != -1) {
      if (this.reconnectclockid != -1) {
        clearInterval(this.reconnectclockid);
        this.reconnectclockid = -1;
      }
      this.reconnectcount = ClientSocket.ReConnectCount;
    }
    this.Disconnect();
  }

  /**
   * 发送数据
   * @param wMainCmdID
   * @param wSubCmdID
   * @param Data 可以是Struct、BaseType
   * @param DataSize
   * @returns
   */
  SendData(wMainCmdID: number, wSubCmdID: number, Data?: Struct | DataBuffer, DataSize: number = 0) {
    if (!this.IsConnect()) return false;
    let head = CreateObject(TCP_Head);
    let headsize = head.size();
    let DataBuf: DataBuffer = null;
    if (Data != null) {
      if (Data instanceof Struct) {
        DataBuf = Data.writeBuffer();
      } else if (Data instanceof DataBuffer) {
        DataBuf = Data;
      } else {
        return false;
      }
      DataSize = DataBuf.getOffset();
    }
    let asm = new DataBuffer(headsize + DataSize);
    head.CommandInfo.wMainCmdID.value = wMainCmdID;
    head.CommandInfo.wSubCmdID.value = wSubCmdID;
    head.TCPInfo.cbDataKind.value = 1;
    head.TCPInfo.wPacketSize.value = headsize + DataSize;
    asm.setUint8(head.TCPInfo.cbDataKind.value);
    asm.setUint8(head.TCPInfo.cbCheckCode.value);
    asm.setUint16(head.TCPInfo.wPacketSize.value);
    asm.setUint16(head.CommandInfo.wMainCmdID.value);
    asm.setUint16(head.CommandInfo.wSubCmdID.value);
    if (Data !== null && DataBuf !== null) {
      asm.setUint8Array(DataBuf.getBufferData(), DataSize);
    }
    let msg = asm.getBufferData();
    if (common.MDM_DATAKIND === 1) {
      this.EncryptBuffer(msg);
    }
    if (this.ws !== null) {
      this.ws.send(msg);
    }
    return true;
  }
}

export class BaseSocket extends ClientSocket {
  private dispatcher: NetDispatcher = null;
  constructor(url: string, caller: any, bheart: boolean = false) {
    super(url, caller, bheart);
    Encry.init();
    this.dispatcher = new NetDispatcher();
    this.onMessage = this.OnMsgIn.bind(this);
  }

  /**
   * @description: 接收消息
   * @param {*} wMainCmdID
   * @param {*} wSubCmdID
   * @param {*} data
   * @return {*}
   */
  private OnMsgIn(wMainCmdID, wSubCmdID, data) {
    if (!this.dispatcher) return;
    if (this.dispatcher.isCallFuncExist(wMainCmdID, wSubCmdID)) {
      this.dispatcher.dispatchMessage(wMainCmdID, wSubCmdID, data);
    }
  }

  /**
   * @description: 注册接收事件
   * @param {*} wMainCmdID
   * @param {*} wSubCmdID
   * @param {*} CallBack
   * @param {*} Target
   * @return {*}
   */
  RegistMessage(wMainCmdID: number, wSubCmdID: number, CallBack: Function, target: any = null, bonce: boolean = false): boolean {
    if (!this.dispatcher) return false;
    return this.dispatcher.registMessage(wMainCmdID, wSubCmdID, CallBack, target, bonce);
  }

  /**
   * @description: 注册接收事件 -- 只允许单个结构体的绑定，解析列表数组用 RegistMessage 单独解析
   * @param {*} wMainCmdID
   * @param {*} wSubCmdID
   * @param {*} CallBack
   * @param {*} Target
   * @return {*}
   */
  RegistMessageEx<T>(wMainCmdID: number, wSubCmdID: number, CallBack: Function, ctor: new (len: number) => T, target: any = null, bonce: boolean = false): boolean {
    if (!this.dispatcher) return false;
    return this.dispatcher.registMessageEx(wMainCmdID, wSubCmdID, CallBack, ctor, target, bonce);
  }

  /**
   * @description: 注册接收事件 -- 解析列表数组用
   * @param {*} wMainCmdID
   * @param {*} wSubCmdID
   * @param {*} CallBack
   * @param {*} Target
   * @return {*}
   */
  RegistMessageList<T>(wMainCmdID: number, wSubCmdID: number, CallBack: Function, ctor: new (len: number) => T, target: any = null, bonce: boolean = false): boolean {
    if (!this.dispatcher) return false;
    return this.dispatcher.registMessageList(wMainCmdID, wSubCmdID, CallBack, ctor, target, true, bonce);
  }

  /**
   * @description: 取消事件绑定
   * @param {number} MainCmdID
   * @param {number} SubCmdID
   * @return {*}
   */
  CancelMessage(MainCmdID: number, SubCmdID: number) {
    if (!this.dispatcher) return;
    this.dispatcher.cancelMessage(MainCmdID, SubCmdID);
  }

  /**
   * @description: 移除所有监听
   * @return {*}
   */
  CancelMessageAll() {
    if (!this.dispatcher) return;
    this.dispatcher.clear();
  }
}
