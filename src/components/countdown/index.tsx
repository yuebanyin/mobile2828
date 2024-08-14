import { useState } from 'react';
import { useSetInterval } from '@/hooks';

export const CountDown = ({ endTime, onEnd }: any) => {
  const [t, setT] = useState(endTime);

  const { clearTimer } = useSetInterval(() => {
    setT((pre) => {
      if (pre === 0) {
        clearTimer();
        onEnd && onEnd();
        return 0;
      }
      return pre - 1;
    });
  }, 1000);

  return (
    <>
      {t}
      <span className='mx-5'>s</span>
    </>
  );
};
