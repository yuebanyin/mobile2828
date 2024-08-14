import { useLottile } from '@/hooks';

const LottieDemo3 = () => {
  const option = {
    jsonUrl: './commonModule/lottie/logoYellow/ruyi28.json',
    atlasUrl: './commonModule/lottie/logoYellow/ruyi28.atlas',
    animation: 'ruyi28',
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

export default LottieDemo3;
