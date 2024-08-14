import { memo, useCallback, useRef } from 'react';
import { Dialog, Swiper, Icon } from '@/components';
import styles from '../index.module.scss';

const AutoAnnoImg = memo((props: { setStep: Function; data: any[] }) => {
  const { setStep, data } = props;
  const dialogRef = useRef<any>();

  const handleClose = useCallback(() => {
    if (dialogRef?.current) {
      dialogRef?.current?.onClose();
    }
  }, []);

  return (
    <Dialog ref={dialogRef} onClose={() => setStep('step', 2)} isTitle={false} isShowOkBtn={false} bodyClassname={styles['anno-img-wrap']} defaultVisible>
      <Icon onClick={handleClose} className={`${styles['anno-img-wrap-close']} m-0-auto d-f`} name='circle-close' />
      <Swiper className={`${styles['anno-img-wrap-swiper-img']} m-0-auto`} imgClassName={styles['anno-img-wrap-swiper-img']} list={data} />
    </Dialog>
  );
});

export default AutoAnnoImg;
