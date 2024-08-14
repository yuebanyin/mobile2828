import { useSearchParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { Iframe } from '@/components';
import { getPreferentialInfoData } from '@/services';
import { useGlobalStore } from '@/mobx';

function PreferentialDetail() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const { changeState } = useGlobalStore();
  const [webUrl, setWebUrl] = useState<string>('');

  useEffect(() => {
    if (id) {
      changeState('isLoading', true);
      getPreferentialInfoData({ Id: id })
        .then((res: any) => {
          if ((res.Data?.length ?? 0) > 0) {
            setWebUrl(res.Data.shift().Url ?? '');
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [id, changeState]);

  return (
    <>
      <Iframe src={webUrl} id={`PreferentialDetail-${id}`} className='h-full' />
    </>
  );
}

export default memo(PreferentialDetail);

