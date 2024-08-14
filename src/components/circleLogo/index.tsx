import { useMemo } from 'react';
import { useLottile } from '@/hooks';
import { useGlobalStore } from '@/mobx';

const CircleLogo = (props: any) => {
  const { className, boxClass = 'w-860 h-540' } = props;

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

  useLottile(circleId, option);

  return (
    <div className={className}>
      <div id={circleId} className={boxClass} />
    </div>
  );
};

export default CircleLogo;
