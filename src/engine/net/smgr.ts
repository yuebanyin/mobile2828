/* eslint-disable */
import { Struct } from "../base/basetype";
import { DataBuffer } from "../base/databuffer";
import { BaseSocket } from "./clientsocket";

export enum SRV_TYPE {
    SRV_LOGIN       = 1,
    SRV_MESSGAE,
    SRV_GAME,
    SRV_MATCH
}

export enum SRV_NET_EVENT {
    SRV_EV_CONNECT  = 1,            //连接事件
    SRV_EV_MESSGAE,                 //网络读取事件
    SRV_EV_CLOSE,                   //网络关闭事件
    SRV_EV_ERROR,                   //网络错误事件
    SRV_EV_RECONNECTFAILED          //网络重连失败事件
}

export class Singleton<T>{
    private static instance: any = null;
    public static Instance<T>(c: { new(): T }): T {
        if (this.instance == null) {
            this.instance = new c();
            console.log("create")
        }
        return this.instance;
    }

}

export class SocketManager extends Singleton<SocketManager> {
    private socketMap = new Map<SRV_TYPE,BaseSocket>();

    /**
     * @description: 获取单例网络管理
     * @return {*}
     */
    static GetInstance() {
        return SocketManager.Instance(SocketManager)
    }

    /**
     * @description: 初始化服务
     * @param {SRV_TYPE} srvTarget
     * @param {string} url
     * @param {any} caller
     * @return {*}
     */
    InitSrv(srvTarget:SRV_TYPE,url:string,caller:any):BaseSocket {
        let socket = this.socketMap.get(srvTarget)
        if(socket === null || socket === undefined) {
            socket = new BaseSocket(url,caller)
            this.socketMap.set(srvTarget,socket);
            return socket;
        }
        return socket
    }

    /**
     * @description: 绑定网络事件
     * @param {SRV_TYPE} srvTarget
     * @param {SRV_NET_EVENT} srvEvent
     * @param {Function} cb
     * @return {*}
     */
    BindNetEvent(srvTarget:SRV_TYPE,srvEvent:SRV_NET_EVENT,cb:Function):boolean {
        let socket = this.socketMap.get(srvTarget)
        if(socket) {
            switch(srvEvent) {
                case SRV_NET_EVENT.SRV_EV_CONNECT:
                    socket.onConnected = cb
                    return true
                    break
                case SRV_NET_EVENT.SRV_EV_MESSGAE:
                    socket.onMessage = cb
                    return true
                    break
                case SRV_NET_EVENT.SRV_EV_CLOSE:
                    socket.onClosed = cb
                    return true
                    break
                case SRV_NET_EVENT.SRV_EV_ERROR:
                    socket.onError = cb
                    return true
                    break
                case SRV_NET_EVENT.SRV_EV_RECONNECTFAILED:
                    socket.onReconnectFailed = cb
                    return true
                    break
            }
        }
        return false
    }

    /**
     * @description: 发起连接服务
     * @param {SRV_TYPE} srvTarget
     * @return {*}
     */
    Connect(srvTarget:SRV_TYPE):boolean {
        let socket = this.socketMap.get(srvTarget)
        if(socket) {
            return socket.Init()
        }
        return false
    }

    /**
     * @description: 注册接收事件
     * @param {SRV_TYPE} srvTarget
     * @param {any} target
     * @param {number} wMainCmdID
     * @param {number} wSubCmdID
     * @param {Function} CallBack
     * @param {boolean} bonce
     * @return {*}
     */
    RegistMessage(srvTarget:SRV_TYPE,wMainCmdID:number,wSubCmdID:number,CallBack:Function,target:any = null,bonce:boolean = false):boolean {
        let socket = this.socketMap.get(srvTarget)
        if(socket) {
            return socket.RegistMessage(wMainCmdID,wSubCmdID,CallBack,target,bonce)
        }
        return false
    }

    /**
     * @description: 取消事件绑定
     * @param {SRV_TYPE} srvTarget
     * @param {number} wMainCmdID
     * @param {number} wSubCmdID
     * @return {*}
     */
    CancelMessage(srvTarget:SRV_TYPE,wMainCmdID:number, wSubCmdID:number) {
        let socket = this.socketMap.get(srvTarget)
        if(socket) {
            socket.CancelMessage(wMainCmdID,wSubCmdID)
        }
    }

    /**
     * @description: 发送网络包
     * @param {SRV_TYPE} srvTarget
     * @param {number} wMainCmdID
     * @param {number} wSubCmdID
     * @param {Struct} data
     * @return {*}
     */
    SendData(srvTarget:SRV_TYPE,wMainCmdID:number, wSubCmdID:number,data?:Struct|DataBuffer) {
        let socket = this.socketMap.get(srvTarget)
        if(socket) {
            socket.SendData(wMainCmdID,wSubCmdID,data)
        }
    }
}

export const SMgr = SocketManager.GetInstance()