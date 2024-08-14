import { useLottile } from '@/hooks';

const LottieDemo2 = () => {
  // const option = {
  //   jsonUrl: './commonModule/lottie/logo/ruyi28.json',
  //   atlasUrl: './commonModule/lottie/logo/ruyi28.atlas',
  //   animation: 'SIJPCnfwO5w',
  //   preserveDrawingBuffer: false,
  // };

  const option = {
    jsonUrl: './commonModule/lottie/danmu/danmu1.json',
    atlasUrl: './commonModule/lottie/danmu/danmu1.atlas',
    animation: 'danmu1',
    preserveDrawingBuffer: false,
  };

  useLottile('test', option);

  return (
    <div>
      wode
      <div id='test' className='w-300 h-300' />
    </div>
  );
};

export default LottieDemo2;
