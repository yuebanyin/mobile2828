/**
 * useScrollTop 监听页面的滚动条高度
 * @params callback 外部传入的回调可做优化使用
 */
import { useEffect, useState } from 'react';

const useScrollTop = (callback: Function) => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    function fn() {
      // 获取 scrollTop
      const newScrollTop: number = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (typeof callback === 'function') {
        callback(setScrollTop, newScrollTop);
      }
    }
    window?.addEventListener('scroll', fn);
    return () => window?.removeEventListener('scroll', fn);
  }, [callback]);

  return { scrollTop };
};

export default useScrollTop;
