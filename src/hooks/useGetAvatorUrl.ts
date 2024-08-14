// import { useSelector } from '@umijs/max';
// import { avatarOptions } from '@/constants';
// import { useMemo } from 'react';

// const useGetAvatorUrl = () => {
//   // 获取头像id
//   const faceId: number = useSelector((mobx: any) => mobx.global.userInfo?.faceId);

//   const faceUrl = useMemo(() => {
//     let src = '';
//     if (faceId) {
//       avatarOptions.forEach((it) => {
//         if (it.id === faceId) {
//           src = it.url;
//         }
//       });
//     }
//     return src;
//   }, [faceId]);
//   return { faceUrl };
// };

// export default useGetAvatorUrl;
