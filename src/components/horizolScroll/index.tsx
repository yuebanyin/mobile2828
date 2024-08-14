/**
 * HorizolScroll 该组件是文字横向无限滚动组件，
 * @param children dom 节点
 * @param classNameBox 外层盒子的样式
 * @param classNameContent 内层盒子样式
 */
import type { ReactNode } from 'react';
import {
 useEffect, useMemo, useRef, useState, memo 
} from 'react';
import styles from './index.module.scss';

interface HorizolScrollProps {
  children: ReactNode;
  classNameBox?: string;
  classNameContent?: string;
}

export const HorizolScroll = memo((props: HorizolScrollProps) => {
  const { children, classNameBox, classNameContent } = props;
  const [time, setTime] = useState(12);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    const outBoxWidth = boxRef?.current?.offsetWidth || 0;
    const innerBoxWidth = contentRef?.current?.offsetWidth || 0;
    if (!innerBoxWidth || !outBoxWidth) {
      setIsAnimation(false);
    } else if (innerBoxWidth > outBoxWidth) {
      setIsAnimation(true);
      setTime(parseInt(`${(innerBoxWidth / outBoxWidth) * 6}`));
    } else if (innerBoxWidth < outBoxWidth) {
      setIsAnimation(true);
      setTime(5);
    }
  }, [contentRef.current?.offsetWidth]);

  const boxClassName = useMemo(() => {
    if (classNameBox) {
      return `${styles['scroll-box']} ${classNameBox}`;
    }
    return styles['scroll-box'];
  }, [classNameBox]);

  const conClassName = useMemo(() => {
    if (classNameContent) {
      return `${styles['scroll-content']} ${classNameContent}`;
    }
    return styles['scroll-content'];
  }, [classNameContent]);

  return (
    <div ref={boxRef} className={boxClassName}>
      <div ref={contentRef} style={{ animationDuration: `${time}s` }} className={`${conClassName} ${isAnimation ? styles['scroll-content-animation'] : ''}`}>
        {children}
      </div>
    </div>
  );
});
