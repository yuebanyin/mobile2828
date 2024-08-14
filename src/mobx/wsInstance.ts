/**
 * 为解决ws实例在不同路由中使用
 */
import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { CtrlChat } from '@/engine/ctrl/CtrlChat';
import { Obj } from '@/constants';
import { CtrlMsg } from '@/engine/ctrl/CtrlMsg';

// 当前 class 类中的全局变量
export type WSInstanceType = 'chatws' | 'msgws';

/**
 * 通用的数据源
 */
export class WSInstanceState {
  constructor() {
    makeAutoObservable(this);
    this.createMsgWs = this.createMsgWs.bind(this);
    this.logoutMsgHall = this.logoutMsgHall.bind(this);
    this.changeGeneralState = this.changeGeneralState.bind(this);
    this.saveRedpackData = this.saveRedpackData.bind(this);
    this.clearRedpack = this.clearRedpack.bind(this);
    // 全局红包逻辑组-start
    this.saveGlobalRedPacketData = this.saveGlobalRedPacketData.bind(this);
    this.clearGlobalRedPacketData = this.clearGlobalRedPacketData.bind(this);
    this.saveGlobalRedPacketState = this.saveGlobalRedPacketState.bind(this);
    this.saveGlobalRedPacketSuccess =
      this.saveGlobalRedPacketSuccess.bind(this);
    this.grpCheckNow = this.grpCheckNow.bind(this);
    this.grpReceiveNow = this.grpReceiveNow.bind(this);
    // 全局红包逻辑组-end
  }

  // 大厅ws
  msgws: CtrlMsg = null;

  // 聊天室ws 实例
  chatws: CtrlChat = null;

  // 聊天室红包逻辑处理
  redpacketData: Obj = null;

  // 全局红包数据
  globalRedPacketData: Obj = null;

  // 全局红包状态
  globalRedPacketState: Obj = null;

  // 全局红包成功状态
  globalRedPacketSuccess: Obj = null;

  // 全局红包显示场景
  // 展示场景：-2.聊天室,-1.首页,大于0表示游戏房间
  // 预计返回 [-2,-1,0,1,2,......]
  get grShowScene(): number[] {
    const temp =
      this.globalRedPacketData?.nShowScene?.map((r) => r.value) || [];
    return temp;
  }

  // 全局红包展示时间
  // 预计返回 [1689673200,1692072000]
  get grShowDate(): number[] {
    const sDate = this.globalRedPacketData?.stShowStartDate?.value || 0;
    const eDate = this.globalRedPacketData?.stShowEndDate?.value || 0;
    return [sDate, eDate];
  }

  // 全局红包领取时间
  // 预计返回 [1689673200,1692072000]
  get grReceiveDate(): number[] {
    const sDate = this.globalRedPacketData?.stReceiveStartDate.value || 0;
    const eDate = this.globalRedPacketData?.stReceiveEndDate?.value || 0;
    // return [1689740268 + 60 * 2, 1689740268 + 60 * 2 + 30];
    return [sDate, eDate];
  }

  // 保存当前红包信息
  saveRedpackData(key: string, value: any) {
    if (!this.redpacketData || key === 'id') {
      this.redpacketData = {};
    }
    this.redpacketData[key] = value;
  }

  // 清除当前红包信息
  clearRedpack() {
    this.redpacketData = null;
  }

  // 保存全局红包信息
  saveGlobalRedPacketData(value: any) {
    this.globalRedPacketData = value;
  }

  // 清除全局红包信息
  clearGlobalRedPacketData() {
    this.globalRedPacketData = null;
    this.grpStateCallBack = null;
    this.grpSuccessCallBack = null;
  }

  // 全局红包状态CallBack
  grpStateCallBack: Function = null;

  // 保存全局红包状态
  saveGlobalRedPacketState(value: any) {
    // console.log('🚀 ~ file: wsInstance.ts:55 ~ WSInstanceState ~ saveGlobalRedPacketState:', value);
    this.globalRedPacketState = value;
    if (this.grpStateCallBack) this.grpStateCallBack(value);
  }

  // 全局红包成功CallBack
  grpSuccessCallBack: Function = null;

  // 保存全局红包成功
  saveGlobalRedPacketSuccess(value: any) {
    // console.log('🚀 ~ file: wsInstance.ts:55 ~ WSInstanceState ~ saveGlobalRedPacketState:', value);
    this.globalRedPacketSuccess = value;
    if (this.grpSuccessCallBack) this.grpSuccessCallBack(value);
  }

  // 红包查询动作
  grpCheckNow(callback: Function) {
    this.grpStateCallBack = callback;
    this.msgws?.queryRedPacketState();
  }

  // 红包领取动作
  grpReceiveNow(callback: Function) {
    this.grpSuccessCallBack = callback;
    this.msgws?.robRegPacket();
  }

  logoutMsgHall(): any {
    if (this.msgws) {
      this.msgws.Close();
      this.msgws = null;
    }
  }

  // 创建大厅ws
  createMsgWs(url: string, webId: string): CtrlMsg {
    if (this.msgws) return null;
    this.msgws = new CtrlMsg(url, webId);
    return this.msgws;
  }

  // 修改状态
  changeGeneralState(type: WSInstanceType, value?: any) {
    this[type] = value;
  }
}

// 利用createContext 创建storeContext
export const storeWSInstance = createContext(new WSInstanceState());

// 导出一个hook 获取全局state的变量值
export const useWSInstanceStore = () => useContext(storeWSInstance);

