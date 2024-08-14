import { memo, useMemo } from 'react';

/**
 * 加拿大幸运5-号码球颜色
 */
export const CirRankBox = memo((props: { num: string | number; className?: string }) => {
  const { num, className } = props;

  const mergeClassName = useMemo(() => {
    const csn = 'icon-72 br-half color-home-login-btn d-f ai-c jc-c';
    const bg = 'bg-gdt-main';
    if (className) {
      return `${csn} ${bg} ${className}`;
    }
    return `${csn} ${bg}`;
  }, [className]);
  return <div className={`${mergeClassName}`}>{num}</div>;
});

