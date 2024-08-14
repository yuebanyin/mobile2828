import { useCallback, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import countTimeMp3 from '@/assets/audio/countTime.mp3';
import openPrizeMp3 from '@/assets/audio/openPrize.mp3';
import { useGlobalStore } from '@/mobx';
import clickMp3 from '@/assets/audio/click.wav';

const CountTimeAudio = observer(() => {
  const { changeState, ismuted } = useGlobalStore();

  // 倒计时音效dom 节点
  const audioCTRef = useRef<HTMLAudioElement>(null);
  // 开奖音效dom 节点
  const audioPZRef = useRef<HTMLAudioElement>(null);
  // 点击音效
  const audioCKRef = useRef<HTMLAudioElement>(null);

  // 监听全局事件，用户操作过就直接play
  const initAudio = useCallback(() => {
    // 倒计时音效
    if (audioCTRef?.current) {
      audioCTRef.current.load();
      audioCTRef.current.autoplay = true;
      audioCTRef.current.currentTime = 0;
      const p = audioCTRef.current.play();
      audioCTRef.current.pause();
      if (p) {
        p.then(() => {
          audioCTRef.current.play();
        }).catch((e) => console.info(e));
      }
    }
    // 开奖音效
    if (audioPZRef?.current) {
      audioPZRef.current.load();
      audioPZRef.current.autoplay = true;
      audioPZRef.current.currentTime = 0;
      const p = audioPZRef.current.play();
      audioPZRef.current.pause();
      if (p) {
        p.then(() => {
          audioPZRef.current.play();
        }).catch((e) => console.info(e));
      }
    }
  }, []);

  useEffect(() => {
    // 监听用户操作，只要触碰屏幕就
    document.addEventListener('touchstart', initAudio, { once: true });
    return () => {
      document.removeEventListener('touchstart', initAudio);
    };
  }, [initAudio]);

  useEffect(() => {
    if (audioCTRef?.current) {
      changeState('audioCTRef', audioCTRef);
    }
    if (audioPZRef?.current) {
      changeState('audioPZRef', audioPZRef);
    }
    if (audioCKRef?.current) {
      changeState('audioCKRef', audioCKRef);
    }
    return () => {
      changeState('audioPZRef', null);
      changeState('audioCTRef', null);
      changeState('audioCKRef', null);
    };
  }, [changeState]);

  return (
    <>
      <audio className='n-none' ref={audioCTRef} src={countTimeMp3} muted={!ismuted}>
        {/* <source type='audio/mpeg' src={countTimeMp3} /> */}
      </audio>
      <audio className='n-none' ref={audioPZRef} src={openPrizeMp3} muted={!ismuted} />
      <audio ref={audioCKRef} src={clickMp3} muted={!ismuted} />
    </>
  );
});

export default CountTimeAudio;
