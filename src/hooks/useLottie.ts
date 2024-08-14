import { SpinePlayer, SpinePlayerConfig } from '@esotericsoftware/spine-player';
import { useEffect, useRef } from 'react';

const defalulOptions = {
  showControls: false,
  premultipliedAlpha: false,
  alpha: true,
  preserveDrawingBuffer: true,
  defaultMix: 0,
};

export const useLottile = (dom: HTMLElement | string, options: SpinePlayerConfig) => {
  const domRef = useRef(null);

  useEffect(() => {
    if (dom && !domRef.current) {
      domRef.current = new SpinePlayer(dom, { ...defalulOptions, ...options });
    }
    return () => {
      if (domRef.current) {
        domRef.current = null;
      }
    };
  }, [dom, options]);
};
