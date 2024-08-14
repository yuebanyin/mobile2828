import {
 ReactNode, useCallback, useEffect, useMemo, useState 
} from 'react';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '@/mobx';
import styles from './index.module.scss';

interface NumberRadioButtonProps<T extends Record<string, any>> {
  /**
   * 主样式
   */
  className?: string;
  /**
   * label样式-label为ReactNode时不生效
   */
  labelClassName?: string;
  /**
   * label-显示球号
   */
  label?: number | string | ReactNode;
  /**
   * title样式-title为ReactNode时不生效
   */
  titleClassName?: string;
  /**
   * title-显示赔率
   */
  title?: number | string | ReactNode;
  /**
   * 变更事件
   */
  onChange?: Function;
  /**
   * 激活状态
   */
  isActive?: boolean;
  /**
   * 数据源
   */
  data?: T;
}

function NumberRadioButton<T>(props: NumberRadioButtonProps<T>) {
  const {
 className = '', labelClassName = '', label, titleClassName = '', title, onChange, isActive, data 
} = props;
  const { audioCKRef } = useGlobalStore();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof isActive === 'boolean') {
      setActive(isActive);
    }
  }, [isActive]);

  const mergeClassName = useMemo(() => {
    const cnList = ['h-102 d-f fd-r ai-c jc-c'];
    if (className) cnList.push(className);
    if (active) cnList.push(styles['nrb-bg-active']);
    else cnList.push(styles['nrb-bg-none']);
    return cnList.join(' ');
  }, [className, active]);

  const onClickItem = useCallback(
    (e: any) => {
      e?.stopPropagation();
      if (audioCKRef?.current) {
        audioCKRef.current.currentTime = 0;
        const playCall = audioCKRef.current.play();
        if (playCall) {
          playCall
            .then(() => {
              audioCKRef.current.play();
            })
            .catch((e) => {
              console.log('NumberRadioButton ~ audioCKRef:', e);
            });
        }
      }
      if (onChange && typeof onChange === 'function') {
        const ret = onChange(!active, data);
        if (ret) setActive(() => !active);
      }
    },
    [audioCKRef, onChange, active, data]
  );

  const buildLabelView = useCallback(() => {
    if (typeof label === 'number' || typeof label === 'string') {
      return <div className={`${labelClassName} d-f ai-c jc-c ta-c`}>{label}</div>;
    }
    return label;
  }, [labelClassName, label]);

  const buildTitleView = useCallback(() => {
    if (typeof title === 'number' || typeof title === 'string') {
      return <div className={`${titleClassName} w-140 d-f df-r jc-c color-red`}>{title}</div>;
    }
    return title;
  }, [titleClassName, title]);

  return (
    <div className={`NumberRadioButton ${mergeClassName}`} onClick={onClickItem}>
      {buildLabelView()}
      {buildTitleView()}
    </div>
  );
}

export default observer(NumberRadioButton);
