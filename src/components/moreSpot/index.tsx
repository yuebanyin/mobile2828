/**
 * MoreSpot 更多按钮 三个点
 * @param classname 样式类名
 */
import {
 memo, useCallback, useMemo, useRef 
} from 'react';

interface MoreSpotProps {
  classname?: string;
  onClick?: Function;
  isPromise?: boolean;
  spotClass?: string;
}

export const MoreSpot = memo((props: MoreSpotProps) => {
  const {
 classname, onClick, isPromise, spotClass = 'bg-more-spot' 
} = props;

  // 异步请求时判断是否点击过
  const isClick = useRef(false);

  const mergeClassName = useMemo(() => {
    let cs = 'more-spot w-80';
    // let cs = 'more-spot m-0-50-0-24';
    if (classname) {
      cs = `${cs} ${classname}`;
    }
    return cs;
  }, [classname]);

  const handleClick = useCallback(
    (e: any) => {
      // 异步请求时如果点击了还未得到响应就控制按钮不再让点击
      if (isClick.current) return;
      if (typeof onClick === 'function') {
        if (isPromise) {
          isClick.current = true;
          new Promise((resolve) => {
            onClick(e, resolve);
          }).finally(() => {
            isClick.current = false;
          });
        } else {
          onClick(e);
        }
      }
    },
    [onClick, isPromise]
  );

  return (
    <div className={mergeClassName} onClick={handleClick}>
      <span className={spotClass} />
      <span className={spotClass} />
      <span className={spotClass} />
    </div>
  );
});
