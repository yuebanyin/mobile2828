import {
 memo, useEffect, useMemo, useState 
} from 'react';
import './index.scss';
import { Img } from '../img';


export const Eye = memo((props: {className?:string, eysClassName?:string, isShow?:boolean, onChange?:Function}) => {
  const {
 isShow = null, onChange, className, eysClassName 
} = props;
  const [show, setShow] = useState(false);
  const clickEye = () => {
    setShow(!show);
    onChange && onChange(!show);
  };
  const mergeClassName = useMemo(() => {
    let cs = 'bx-eye d-f fd-c ai-c jc-c';
    if (className) {
      cs = `${cs} ${className}`;
    }
    return cs;
  }, [className]);
  
  useEffect(() => {
    if (typeof isShow === 'boolean') {
      setShow(isShow);
    }
  }, [isShow, show]);
  return (
    <div 
      className={mergeClassName}
      onClick={clickEye}
    >
      {!show ? (
        <Img className={`bx-e-hide ${eysClassName}`} src='/mine/eye_h.png' />
      ) : (
        <Img className={`bx-e-show ${eysClassName}`} src='/mine/eye_s.png' />
      )}
    </div>
  );
});
