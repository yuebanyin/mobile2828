import {
 forwardRef, memo, useEffect, useRef 
} from 'react';
import styles from './index.module.scss';

const SmallBox = forwardRef(({
 isPos, getPos, value, isT, isBc = true 
}: any, ref: any) => {
  const smBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPos && smBoxRef.current.offsetHeight > 0) {
      const pos = smBoxRef.current.getBoundingClientRect();
      getPos(pos);
    }
  }, [isPos, getPos]);

  return (
    <div ref={ref} className='d-f ai-c p-r'>
      <div className={`${styles['small-box']} b-1 ${isBc ? 'bc-split' : ''}`} />
      {isPos && (
        <>
          <span className={`p-a color-primary-text w-full ta-c zi-small ${styles['circle-spot-text']}  ${value % 2 === 1 && isT ? styles['spot-value-sig'] : styles['spot-value-ss']}`}>{value}</span>
          <div className={`p-a zi-small br-half bg-body ${styles['circle-spot']} ${value % 2 === 1 && isT ? styles['circle-spot-sig'] : styles['circle-spot-ss']}`} ref={smBoxRef} />
        </>
      )}
    </div>
  );
});

export const SmallBoxBorder = memo((props: any) => {
  const { isY, text, isBc = true } = props;

  return (
    <div className={`${isY ? styles['box-y'] : styles['box-x']} p-r ${isBc ? 'bc-split' : ''}`}>{text && <div className={`p-a zi-small wb-w wb-all ws-p-w ta-c ${styles['text']}`}>{text}</div>}</div>
  );
});

export default SmallBox;
