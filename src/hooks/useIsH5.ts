// import { useLayoutEffect, useState } from 'react';
// import { getH5WebUrl } from '@/services';
// import { REGEXOBJ, h5WebUrl } from '@/constants';

// const useIsH5 = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   useLayoutEffect(() => {
//     // 手机端
//     if (REGEXOBJ.PHONE.test(window.navigator.userAgent)) {
//       getH5WebUrl()
//         .then((res: any) => {
//           if (res.data.code === 210) {
//             window.location.href = res.data.data;
//           } else {
//             throw new Error();
//           }
//         })
//         .catch(() => {
//           // 如果接口报错，直接跳转默认地址
//           window.location.href = h5WebUrl;
//         });
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   return [isLoading];
// };

// export default useIsH5;
