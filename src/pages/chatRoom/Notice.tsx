import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { getAnoData } from '@/services';
import { Img, HorizolScroll } from '@/components';
import { isArray } from '@/utils/tools';
import { useGlobalStore } from '@/mobx';

const Notice = () => {
  const [data, setData] = useState('');
  const { language } = useGlobalStore();

  useEffect(() => {
    if (language) {
      getAnoData()
        .then((res: any) => {
          if (isArray(res?.Data)) {
            setData(res?.Data?.join(','));
          }
        })
        .catch(() => {});
    }
  }, [language]);

  return (
    <div className='d-f ai-c jc-sb bg-int-lig p-l-50 p-r-50'>
      <Img className='w-55' src='/home/suona.png' />
      <HorizolScroll classNameBox='m-l-12 h-70 ai-c'>
        <span className='color-primary'>{data}</span>
      </HorizolScroll>
    </div>
  );
};

export default observer(Notice);
