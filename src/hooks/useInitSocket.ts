// /**
//  * useInitSocket 初始化soket 实例
//  * @param wsUrl 要连接的soket的服务端地址
//  */
// import WebSocketClass from '@/utils/websocket';
// import { message } from 'antd';
// import { useCallback, useEffect, useRef } from 'react';

// const useInitSocket = (wsUrl: string = '') => {
//   const wsRef = useRef<WebSocketClass | null>(null);

//   // 手动关闭websoket
//   const closeWebsoket = useCallback(() => {
//     if (wsRef?.current) {
//       wsRef.current?.close();
//       wsRef.current = null;
//     }
//   }, []);

//   // 连接webSocket
//   const connect = useCallback(
//     (count?: number) => {
//       // 没有传要连接的soket地址直接return
//       if (!wsUrl) {
//         return;
//       }
//       // 浏览器不支持给出提示然后 return
//       if (!window?.WebSocket) {
//         message.error('当前浏览器不支持 websoket！');
//         return;
//       }
//       if (!wsRef?.current) {
//         wsRef.current = new WebSocketClass(wsUrl);
//         if (count) {
//           wsRef.current.reconnectConfig.reconnectCount = count;
//         }
//         wsRef.current.init({
//           reconnectConfig: {
//             isReconnect: true,
//             reconnectMeans: (count?: number) => {
//               closeWebsoket();
//               connect(count);
//             },
//           },
//         });
//       }
//     },
//     [closeWebsoket, wsUrl],
//   );

//   useEffect(() => {
//     connect();
//     return closeWebsoket;
//   }, [connect, closeWebsoket]);
// };

// export default useInitSocket;
