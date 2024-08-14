import { RefObject, useCallback, useEffect } from 'react';
import { throttle } from '@/utils/tools';

export const useImgLazyload = (imgRef: RefObject<HTMLImageElement | HTMLDivElement>, dataSrc: string, isBg = false) => {
  // 判断该图片是否进入可视区域
  const isInSight = useCallback((el) => {
    // 获取视窗的高度 图片距离可视区域10单位 就开始加载
    const clientHeight = window.innerHeight - 10;
    // 使用 getBoundingClientRect API
    if (el.getBoundingClientRect) {
      const bound = el.getBoundingClientRect();
      //如果只考虑向下滚动加载
      return bound.top <= clientHeight;
    }
    // 获取文档滚动的高度
    const S = document.documentElement.scrollTop || document.body.scrollTop;
    // 获取当前元素的距离
    const T = el.offsetTop;
    return clientHeight + S > T;
  }, []);

  // 懒加载的兼容性处理
  const lazyLoadImg: Function = useCallback(() => {
    const el: HTMLImageElement | HTMLDivElement = imgRef?.current;
    // 如果加载过就跳过
    if (el['isLoad'] || !dataSrc) return;
    // 判断图片进入可视区域做赋值操作
    if (isInSight(el)) {
      if (isBg) {
        // 背景图设置
        el.setAttribute('style', `background-image:url(${dataSrc})`);
      } else {
        el.setAttribute('src', dataSrc);
      }
      el['isLoad'] = true;
    }
  }, [isInSight, imgRef, dataSrc, isBg]);

  useEffect(() => {
    let reLazyLoadImg = null;
    if (imgRef?.current && dataSrc) {
      const el: HTMLImageElement | HTMLDivElement = imgRef?.current;
      // 浏览器支持 img标签的懒加载
      if ('loading' in HTMLImageElement.prototype) {
        // 如果图片有缓存直接设置为加载成功
      } else if (typeof IntersectionObserver === 'function') {
        // 如果图片有缓存或者已经加载过 移出监听
        // if (el?.complete) {
        // console.log('complete', el?.complete);
        // }
        // 浏览器支持 IntersectionObserver 方法
        const obs = new IntersectionObserver((e) => {
          e.forEach((entry) => {
            if (entry.isIntersecting) {
              const i = entry.target;
              if (entry.intersectionRatio > 0 && entry.intersectionRatio <= 1) {
                if (isBg) {
                  // 背景图设置
                  i.setAttribute('style', `background-image:url(${dataSrc})`);
                } else {
                  i.setAttribute('src', dataSrc);
                }
                // 移出监听
                obs.unobserve(i);
              }
            }
          });
        });
        obs.observe(el);
      } else {
        // 计算当前元素距离可视区域高度做懒加载
        reLazyLoadImg = throttle(lazyLoadImg, 200);
        lazyLoadImg();
        window.addEventListener('touchmove', reLazyLoadImg);
      }
    }
    return () => {
      if (reLazyLoadImg) {
        window.removeEventListener('touchmove', reLazyLoadImg);
        reLazyLoadImg = null;
      }
    };
  }, [imgRef, dataSrc, lazyLoadImg, isBg]);
};
