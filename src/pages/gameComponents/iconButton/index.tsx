import { memo, useMemo } from 'react';
import { Img, OutLink } from '@/components';
import styles from './index.module.scss';

interface IconButtonProps {
  size?: 'small' | 'middle' | 'large';
  className?: string;
  title: string;
  titleClass?: string;
  icon: string;
  iconClass?: string;
  url?: string;
  click?: Function;
}

export const IconButton = memo((props: IconButtonProps) => {
  const {
 size = 'small', className, title, titleClass, icon, iconClass, url, click 
} = props;

  const mergeClassName = useMemo(() => {
    let csn = '';
    csn = `${styles['bg']} ${styles[`${size}`]} ${className || ''}`;
    return csn;
  }, [className, size]);

  const btnNode = useMemo(() => {
    if (url) {
      return (
        <OutLink href={url}>
          <div className={`${mergeClassName} d-f ai-c jc-sb p-0-20`}>
            <Img className={iconClass || styles['icon']} src={icon} />
            <div className={`${styles['fs']} m-l-20 w-full flex-1 ${titleClass}`}>{title}</div>
          </div>
        </OutLink>
      );
    }
    return (
      <div
        className={`${mergeClassName} d-f ai-c jc-sb p-0-20`}
        onClick={() => {
          if (click && typeof click === 'function') {
            click();
          }
        }}
      >
        <Img className={iconClass || styles['icon']} src={icon} />
        <div className={`${styles['fs']} m-l-20 w-full flex-1 ${titleClass}`}>{title}</div>
      </div>
    );
  }, [url, iconClass, icon, titleClass, title, mergeClassName, click]);

  return <>{btnNode}</>;
});
