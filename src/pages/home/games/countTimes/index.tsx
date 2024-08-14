import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useCountDownTime } from '@/pages/gameComponents/countDownTime';
import { useGameConfigStore, useGlobalStore } from '@/mobx';

const CountTimeS = observer(() => {
  const { initGameConfig, countTime } = useGameConfigStore();
  const { audioCTRef } = useGlobalStore();

  // 计算倒计时
  useCountDownTime();

  // 清除操作，主要是清空倒计时
  useEffect(
    () => () => {
      initGameConfig();
    },
    [initGameConfig]
  );

  useEffect(() => {
    // 打开倒计时音效
    if ((countTime || countTime === 0) && Number(countTime) <= 10 && audioCTRef?.current) {
      audioCTRef.current.currentTime = 0;
      const p = audioCTRef.current.play();
      if (p) {
        p.then(() => {
          audioCTRef.current.play();
        }).catch((e) => {
          console.info(e);
        });
      }
    }
    // 关闭倒计时音效
    if (!(Number(countTime) <= 10) && audioCTRef?.current) {
      audioCTRef.current.pause();
    }
  }, [countTime, audioCTRef]);

  return <></>;
});

export default CountTimeS;
