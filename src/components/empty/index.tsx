/**
 * Empty 该组件是为了统一处理内容为空
 * @param src 图片地址，默认都是以主题文件夹下一层开头
 * @param className 图片样式
 * @param style 图片行内样式
 */

import { useMemo, memo } from 'react';
import { Img } from '../img';

interface EmptyProps {
  src?: string;
  className?: string;
  style?: Record<string, any>;
}
export const Empty = memo((props: EmptyProps) => {
  const { src = '/common/empty.png', className } = props;

  //合并组合图片样式
  const mergeClassName = useMemo(() => {
    let csn = 'm-0-auto';
    if (className) {
      csn = `${csn} ${className}`;
    }
    return csn;
  }, [className]);

  return <Img className={`p-100-80-0-100 ${mergeClassName}`} src={src} />;
});
