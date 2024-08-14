import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { CommonLoading } from '@/components';
import { noSignAceRouter, ykIceR } from '@/constants';
import lhp from '@/assets/image/blueyellow/preferential/head-bg.png';
import hjp from '@/assets/image/blackgold/preferential/head-bg.png';
import blp from '@/assets/image/whiteblue/preferential/head-bg.png';
import lhr from '@/assets/image/blueyellow/recharge/head-bg.png';
import hjr from '@/assets/image/blackgold/recharge/head-bg.png';
import blr from '@/assets/image/whiteblue/recharge/head-bg.png';
import lhm from '@/assets/image/blueyellow/mine/topBk.png';
import hjm from '@/assets/image/blackgold/mine/topBk.png';
import blm from '@/assets/image/whiteblue/mine/topBk.png';

const preloadMap = {
  recharge_blueyellow: lhr,
  recharge_blackgold: hjr,
  recharge_whiteblue: blr,
  preferential_blueyellow: lhp,
  preferential_blackgold: hjp,
  preferential_whiteblue: blp,
  mine_blueyellow: lhm,
  mine_blackgold: hjm,
  mine_whiteblue: blm,
};

const PreloadImg = observer(() => {
  const { theme } = useGlobalStore();
  const { isVisitor, token } = useUserInfoStore();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const isReloadRef = useRef({
    blueyellow: false,
    blackgold: false,
    whiteblue: false,
  });

  // 做图片的预加载
  useEffect(() => {
    // 需要换肤的懒加载
    setTimeout(() => {
      if (!theme || isReloadRef?.current[theme]) return;
      ['recharge', 'preferential', 'mine'].forEach((urlKey, i) => {
        if (pathname !== `/${urlKey}`) {
          let img = new Image();
          img.src = preloadMap[`${urlKey}_${theme}`];
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            img = null;
            if (i === 2) {
              isReloadRef.current[theme] = true;
            }
          };
        }
      });
    }, 300);
  }, [theme, pathname]);

  useEffect(() => {
    if (!token && !noSignAceRouter.test(pathname)) {
      // 未登录
      navigation('/login', { replace: true });
    } else if (isVisitor && ykIceR.test(pathname)) {
      // 试玩是有token
      navigation('/login', { replace: true });
    }
  }, [pathname, token, isVisitor, navigation]);

  return <CommonLoading />;
});

export default PreloadImg;
