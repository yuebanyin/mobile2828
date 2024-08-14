import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './index.scss';

interface InfiniteloadingProps {
  containerId: string;
  loadMore?: Function; //异步方法
  threshold?: number;
  capture?: boolean;
  hasMore: boolean;
  children?: ReactNode;
}

declare let window: Window & { webkitRequestAnimationFrame: any } & {
  mozRequestAnimationFrame: any;
};

export const Infiniteloading = forwardRef(
  (props: InfiniteloadingProps, ref) => {
    const {
      containerId,
      loadMore,
      threshold = 200,
      capture = false,
      hasMore = true,
      children,
    } = props;

    const [isInfiniting, setIsInfiniting] = useState(false);
    const containerRef = useRef<Window | HTMLElement | Node>(window);
    const beforeScrollTop = useRef(0);

    const infiniteDone = () => {
      setIsInfiniting(false);
    };

    useImperativeHandle<any, any>(ref, () => ({
      infiniteDone,
    }));

    const requestAniFrame = () =>
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function fn(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const isScrollAtBottom = useCallback(() => {
      let offsetDistance = 0;
      let resScrollTop = 0;
      let direction = 'down';
      const { scrollHeight, clientHeight, scrollTop } =
        containerRef.current as HTMLElement;
      offsetDistance = scrollHeight - clientHeight - scrollTop;
      resScrollTop = scrollTop;
      if (beforeScrollTop.current > resScrollTop) {
        direction = 'up';
      } else {
        direction = 'down';
      }
      beforeScrollTop.current = resScrollTop;
      return offsetDistance <= threshold && direction === 'down';
    }, [threshold]);
    /**
     * @description: 滚动事件
     * @param {*} useCallback
     * @return {*}
     */
    const onScrollEvent = useCallback(() => {
      requestAniFrame()(() => {
        console.log({ isbtm: isScrollAtBottom(), hasMore, isInfiniting });
        if (!isScrollAtBottom() || !hasMore || isInfiniting) {
          return false;
        }
        setIsInfiniting(true);
        try {
          console.log('加载接口');
          loadMore && loadMore(infiniteDone);
        } catch (error) {
          infiniteDone();
        }
        return true;
      });
    }, [hasMore, isInfiniting, isScrollAtBottom, loadMore]);

    useEffect(() => {
      if (containerId && document.getElementById(containerId)) {
        containerRef.current = document.getElementById(containerId) as
          | HTMLElement
          | Window;
      }
      if (containerRef.current) {
        containerRef.current.addEventListener('scroll', onScrollEvent, capture);
      }
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            'scroll',
            onScrollEvent,
            capture
          );
        }
      };
    }, [capture, containerId, hasMore, isInfiniting, onScrollEvent]);

    return <div className='infinyeload'>{children}</div>;
  }
);
