/**
 * 聊天室中的红包数据保存
 */
// import { makeAutoObservable } from 'mobx';
// import { createContext, useContext } from 'react';
// import { CtrlChat } from '@/engine/ctrl/CtrlChat';
// import { Obj } from '@/constants';

// /**
//  * 通用的数据源
//  */
// export class ChatMsgRedpacketState {
//   constructor() {
//     makeAutoObservable(this);
//     this.setRedpacketMap = this.setRedpacketMap.bind(this);
//   }

//   // 接收红包的数据
//   redpacketMap: Map<string | number, Obj> = null;

//   // 接收红包后存取数据
//   setRedpacketMap(key: string | number, value: any) {
//     if (!this.redpacketMap) {
//       this.redpacketMap = new Map();
//     }
//     this.redpacketMap.set(key, value);
//   }

//   // 切换时
// }

// // 利用createContext 创建storeContext
// export const storeChatMsgRedpacket = createContext(new ChatMsgRedpacketState());

// // 导出一个hook 获取全局state的变量值
// export const useChatMsgRedpacketStore = () => useContext(storeChatMsgRedpacket);

