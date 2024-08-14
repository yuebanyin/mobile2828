import { useMemo } from 'react';
import { useLottile } from '@/hooks';
import { useGlobalStore } from '@/mobx';

const LogoMove = () => {
  const { theme } = useGlobalStore();

  const logoJsonUrl = useMemo(() => {
    let jsonUrl = '';
    switch (theme) {
      case 'blueyellow':
        jsonUrl = './commonModule/lottie/logoYellow/ruyi28.json';
        break;
      case 'blackgold':
        jsonUrl = './commonModule/lottie/logoBlack/ruyi28.json';
        break;
      case 'whiteblue':
        jsonUrl = './commonModule/lottie/logoPurple/ruyi28.json';
        break;
      default:
        break;
    }
    return jsonUrl;
  }, [theme]);

  const logoAtlasUrl = useMemo(() => {
    let jsonUrl = '';
    switch (theme) {
      case 'blueyellow':
        jsonUrl = './commonModule/lottie/logoYellow/ruyi28.atlas';
        break;
      case 'blackgold':
        jsonUrl = './commonModule/lottie/logoBlack/ruyi28.atlas';
        break;
      case 'whiteblue':
        jsonUrl = './commonModule/lottie/logoPurple/ruyi28.atlas';
        break;
      default:
        break;
    }
    return jsonUrl;
  }, [theme]);

  const logoAnimation = useMemo(() => {
    let jsonUrl = '';
    switch (theme) {
      case 'blueyellow':
        jsonUrl = 'ruyi28';
        break;
      case 'blackgold':
        jsonUrl = 'ruyi28';
        break;
      case 'whiteblue':
        jsonUrl = 'ruyi28';
        break;
      default:
        break;
    }
    return jsonUrl;
  }, [theme]);

  const option = {
    jsonUrl: logoJsonUrl || './commonModule/lottie/logoYellow/ruyi28.json',
    atlasUrl: logoAtlasUrl || './commonModule/lottie/logoYellow/ruyi28.atlas',
    animation: logoAnimation,
    preserveDrawingBuffer: false,
  };

  useLottile('logo', option);

  return (
    <div className='p-r right-100 o-none bottom-105'>
      <div id='logo' className='w-400 h-195' />
      {/* <div id='logo' className='w-460 h-190' /> */}
    </div>
  );
};

export default LogoMove;
