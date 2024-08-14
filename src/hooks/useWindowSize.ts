/**
 * useWindowSize 监听屏幕大小发生变化重新获取屏幕宽高
 * size 抛出的size是一个数组，分别是宽高
 */
import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([innerWidth, innerHeight]);
    }
    addEventListener('resize', updateSize);
    return () => removeEventListener('size', updateSize);
  }, []);

  return size;
};

export default useWindowSize;
