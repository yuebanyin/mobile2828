import { useLottile } from '@/hooks';

const LottieDemo4 = () => {
  const option = {
    jsonUrl: './commonModule/lottie/loginYellow/lanhuang.json',
    atlasUrl: './commonModule/lottie/loginYellow/lanhuang.atlas',
    animation: 'lanhuang',
    preserveDrawingBuffer: false,
  };

  useLottile('test', option);

  return (
    <div>
      <div id='test' className='w-300 h-300' />
    </div>
  );
};

export default LottieDemo4;
