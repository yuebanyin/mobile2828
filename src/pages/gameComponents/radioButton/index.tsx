import {
 ReactNode, forwardRef, useCallback, useImperativeHandle, useMemo, useState 
} from 'react';
import styles from './index.module.scss';
import { DWORD } from '@/engine/base/basetype';

interface RadioItem {
  id: number | string;
  title: number | string | ReactNode;
  bottomTitle?: Function;
}

interface RadioButtonProps {
  className?: string;
  size?: 'small' | 'middle' | 'large' | 'slarge' | string;
  data: RadioItem[];
  currentId?: number | string;
  onChange?: Function;
  isActive?: boolean;
  mutile?: Array<DWORD>;
  dynamicList?: Array<any>; 
  curXiao?: number
}

export const RadioButton = forwardRef((props: RadioButtonProps, ref) => {
  const {
 className, size = 'large', data, currentId = 1, onChange, dynamicList, curXiao
} = props;
  const [selectId, setSelectId] = useState(currentId);

  const mergeClassName = useMemo(() => {
    const csn = '';
    if (className) {
      return `${csn} ${className}`;
    }
    return csn;
  }, [className]);

  const onResetData = (value) => {
    setSelectId(value);
  };

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  const getClassName = useCallback(
    (id) => {
      if (id === selectId) {
        return styles['rb-bg-active'];
      }
      return styles['rb-bg-none'];
    },
    [selectId]
  );

  const clickItem = useCallback(
    (item) => {
      if (item.id === selectId) return;
      setSelectId(item.id);
      if (onChange && typeof onChange === 'function') {
        onChange(selectId, item);
      }
    },
    [selectId, onChange]
  );

  return (
    <div className={`${mergeClassName} d-f jc-start ai-c w-full flex-w`}>
      {data.map((item, i) => (
        <div
          key={item.id || i}
          className={`p-r df-aic-jcc fd-c ${styles[size]} ${getClassName(item.id)}`}
          onClick={() => {
            clickItem(item);
          }}
        >
          <div className={styles['fs']}>{item.title}</div>
          {item.bottomTitle ? item.bottomTitle(item, props.mutile, dynamicList, curXiao) : ''}
        </div>
      ))}
    </div>
  );
});
