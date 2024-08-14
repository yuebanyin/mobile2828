import { useMemo } from 'react';
import { useLottile } from '@/hooks';
import { useGlobalStore } from '@/mobx';

export const CircleLogo = (props: any) => {
  const { className } = props;

  const { theme } = useGlobalStore();

  const circleJsonUrl = useMemo(() => {
    let jsonUrl = '';
    switch (theme) {
      case 'blueyellow':
        jsonUrl = './commonModule/lottie/loginYellow/lanhuang.json';
        break;
      case 'blackgold':
        jsonUrl = './commonModule/lottie/loginBlack/heijin.json';
        break;
      case 'whiteblue':
        jsonUrl = './commonModule/lottie/loginPurple/lanhuang.json';
        break;
      default:
        break;
    }
    return jsonUrl;
  }, [theme]);

  const circleAtlasUrl = useMemo(() => {
    let jsonUrl = '';
    switch (theme) {
      case 'blueyellow':
        jsonUrl = './commonModule/lottie/loginYellow/lanhuang.atlas';
        break;
      case 'blackgold':
        jsonUrl = './commonModule/lottie/loginBlack/heijin.atlas';
        break;
      case 'whiteblue':
        jsonUrl = './commonModule/lottie/loginPurple/lanhuang.atlas';
        break;
      default:
        break;
    }
    return jsonUrl;
  }, [theme]);

  const circleAnimation = useMemo(() => {
    let jsonUrl = '';
    switch (theme) {
      case 'blueyellow':
        jsonUrl = 'lanhuang';
        break;
      case 'blackgold':
        jsonUrl = 'heijin';
        break;
      case 'whiteblue':
        jsonUrl = 'lanhuang';
        break;
      default:
        break;
    }
    return jsonUrl;
  }, [theme]);

  const option = {
    jsonUrl: circleJsonUrl || './commonModule/lottie/loginYellow/lanhuang.json',
    atlasUrl: circleAtlasUrl || './commonModule/lottie/loginYellow/lanhuang.atlas',
    animation: circleAnimation,
    preserveDrawingBuffer: false,
  };

  const circleId = useMemo(() => {
    let id = '';
    switch (theme) {
      case 'blueyellow':
        id = 'circleY';
        break;
      case 'blackgold':
        id = 'circleB';
        break;
      case 'whiteblue':
        id = 'circleP';
        break;
      default:
        break;
    }
    return id;
  }, [theme]);

  console.log('seeeeeee', theme);
  useLottile(circleId, option);

  return (
    <div className={className}>
      <div id={circleId} className='w-400 h-400' />
    </div>
  );
};

export const CircleLogoY = () => {
  const option = {
    jsonUrl: './commonModule/lottie/loginYellow/lanhuang.json',
    atlasUrl: './commonModule/lottie/loginYellow/lanhuang.atlas',
    animation: 'lanhuang',
    preserveDrawingBuffer: false,
  };

  useLottile('CircleLogoY', option);

  return (
    <div>
      <div id='CircleLogoY' className='w-300 h-300' />
    </div>
  );
};

export const CircleLogoB = () => {
  const option = {
    jsonUrl: './commonModule/lottie/loginBlack/heijin.json',
    atlasUrl: './commonModule/lottie/loginBlack/heijin.atlas',
    animation: 'heijin',
    preserveDrawingBuffer: false,
  };

  useLottile('CircleLogoB', option);

  return (
    <div>
      <div id='CircleLogoB' className='w-300 h-300' />
    </div>
  );
};

export const CircleLogoP = () => {
  const option = {
    jsonUrl: './commonModule/lottie/loginPurple/lanhuang.json',
    atlasUrl: './commonModule/lottie/loginPurple/lanhuang.atlas',
    animation: 'lanhuang',
    preserveDrawingBuffer: false,
  };

  useLottile('CircleLogoP', option);

  return (
    <div className='o-none'>
      <div id='CircleLogoP' className='w-300 h-300' />
    </div>
  );
};
