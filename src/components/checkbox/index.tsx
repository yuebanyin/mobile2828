import {
 ReactNode, memo, useCallback, useEffect, useMemo, useState 
} from 'react';
// import { Icon } from '../icon';
import './index.scss';
import { Img } from '../img';

interface CheckboxProps {
  checked?: boolean;
  value?: boolean;
  defaultValue?: boolean;
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
  className?: string;
  labelClassName?: string;
  onChange?: Function;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
 checked, value, defaultValue, label = 111, className, onChange, labelClassName, labelPosition = 'right' 
} = props;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (typeof value === 'boolean') {
      setIsChecked(value);
    }
  }, [value]);

  const mergeClassname = useMemo(() => {
    let cs = 'bx-checkbox d-ib va-m m-r-20';
    if (checked || isChecked) {
      cs = `${cs} bx-checkbox-checked`;
    }
    if (className) {
      cs = ` ${cs} ${className}`;
    }
    return cs;
  }, [className, isChecked, checked]);

  const chagneState = useCallback(() => {
    if (typeof onChange === 'function') {
      onChange(!isChecked, label);
    }
    setIsChecked(!isChecked);
  }, [onChange, label, isChecked]);

  return (
    <div onClick={chagneState} className='d-ib va-m'>
      {labelPosition === 'left' && label && <div className={`${labelClassName!} t-h2 d-ib va-m`}>{label}</div>}
      <div className={mergeClassname}>{(checked || isChecked) && <Img className='checkbox-icon' src='/login/check.png' />}</div>
      {labelPosition === 'right' && label && <div className={`${labelClassName!} t-h2 d-ib va-m`}>{label}</div>}
    </div>
  );
});
