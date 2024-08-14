// // import { message } from 'antd';

// /**
//  * 封装websockt 类
//  */
// interface HeartbeatConfig {
//   timeout: number; // 心跳超时间隔
//   time: number; // 心跳间隔
//   reconnect: number; // 断线重连时
// }

// interface ReconnectConfig {
//   // 是否开启断线重连
//   isReconnect: boolean;
//   // 断线重连执行函数
//   reconnectMeans?: (c?: number) => void;
//   // 断线重连次数
//   reconnectCount?: number;
//   // 最大断线重连次数
//   maxReconnectCount?: number;
// }

// // init 函数的类型
// interface InitConfig {
//   heartbeatConfig?: HeartbeatConfig;
//   reconnectConfig?: ReconnectConfig;
// }

// /**
//  * 创建 WebSocketClass 类
//  */
// class WebSocketClass extends WebSocket {
//   // 心跳配置
//   heartbeat: HeartbeatConfig = {
//     time: 30000, // 每次隔 30s 向soket服务器发一条心跳信息
//     timeout: 3000, // 超过一定时间如果服务器没有回复则认为断连了，需要重新连接
//     reconnect: 10000, // 10s 执行重连的回调
//   };
//   // 断线重连配置
//   reconnectConfig: ReconnectConfig = {
//     isReconnect: false, // 默认关闭重连
//     reconnectMeans: () => {},
//     reconnectCount: 0,
//     maxReconnectCount: 3,
//   };
//   // 连接状态
//   connectState: boolean = false;
//   // 断线重连存储的变量
//   reconnectTimer: NodeJS.Timeout | null = null;

//   constructor(url: string, protocols?: string[]) {
//     super(url, protocols);
//     return this;
//   }

//   /**
//    * 入口函数
//    * @param heartBeatConfig  time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间间隔
//    * @param isReconnect 是否断线重连
//    * @param reconnectMeans 断线重连执行函数
//    */
//   init({ heartbeatConfig, reconnectConfig }: InitConfig) {
//     this.onopen = this.openMeans;
//     this.onclose = this.closeMeans;
//     this.onmessage = this.receiveMessage;
//     this.onerror = this.errorMeans;
//     this.heartbeat = { ...this.heartbeat, ...heartbeatConfig };
//     this.reconnectConfig = { ...this.reconnectConfig, ...reconnectConfig };
//     this.reconnectTimer = null; //断线重连时间器
//     this.connectState = false; //socket状态 true为已连接
//   }

//   // 处理链接成功的回调
//   openMeans() {
//     // socket状态设置为连接，做为后面的断线重连的拦截器
//     this.connectState = true;
//     // 是否启动心跳机制
//     if (this.heartbeat && this.heartbeat.time) {
//       this.startHeartbeat(this.heartbeat.time);
//     }
//     // 连接成功重置连接次数
//     this.reconnectConfig.reconnectCount = 0;
//   }

//   // 发送消息
//   sendMessage(msgObj: any) {
//     this.send(JSON.stringify(msgObj));
//   }

//   // 处理收到的消息
//   receiveMessage(e: any) {
//     // console.log(e);
//   }

//   // socket 关闭
//   closeMeans() {
//     this.connectState = false;
//   }

//   // soket连接 出错
//   errorMeans() {
//     // message.error('websoket 连接出错');
//     this.connectState = false;
//     this.reconnect();
//   }

//   /**
//    * 心跳函数
//    * @param time 心跳时间间隔
//    */
//   startHeartbeat(time: number) {
//     // 没相隔 time 秒发送一条消息
//     setTimeout(() => {
//       this.sendMessage({
//         code: 1, // 和后端约定code专用做心跳检测
//         msg: new Date(),
//       });
//       this.waitingServer();
//     }, time);
//   }

//   // 延时等待服务端响应
//   waitingServer() {
//     this.connectState = false;
//     setTimeout(() => {
//       // 如果正常连接状态则执行心跳函数
//       if (this.connectState) {
//         this.startHeartbeat(this.heartbeat.time);
//         return;
//       }
//       try {
//         // 手动关闭该websoket连接，避免出现多实例消耗性能
//         this.close();
//       } catch (error) {}
//       // 重新连接
//       this.reconnect();
//     }, this.heartbeat.timeout);
//   }

//   /**
//    * reconnect 失败自动重连 默认最大重连次数是10次
//    */
//   reconnect() {
//     if (this.reconnectConfig.isReconnect) {
//       // 记录重连次数
//       if (typeof this.reconnectConfig.reconnectCount === "number") {
//         this.reconnectConfig.reconnectCount++;
//       }
//       // 判断最大次数
//       if (
//         typeof this.reconnectConfig.reconnectCount === "number" &&
//         this.reconnectConfig.reconnectCount >
//           (this.reconnectConfig.maxReconnectCount || 10)
//       ) {
//         // message.error('重连次数超过最大限度，请检查网络状况');
//       } else {
//         // 如果有延时器先清除
//         if (this.reconnectTimer) {
//           clearTimeout(this.reconnectTimer);
//           this.reconnectTimer = null;
//         }
//         // 重新建立延时器
//         this.reconnectTimer = setTimeout(() => {
//           // 重新连接 此处不需要任何逻辑只是给到外面做判断
//           if (typeof this.reconnectConfig.reconnectMeans === "function") {
//             // message.warning('重连', this.reconnectCount);
//             this.reconnectConfig.reconnectMeans(
//               this.reconnectConfig.reconnectCount
//             );
//           }
//           // 操作完成清除定时器
//           clearTimeout(this.reconnectTimer as NodeJS.Timeout);
//           this.reconnectTimer = null;
//         }, this.heartbeat.reconnect);
//       }
//     }
//   }
// }

// export default WebSocketClass;
