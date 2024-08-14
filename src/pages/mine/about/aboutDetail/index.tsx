import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAboutTypesDetail } from '@/services';
import { Iframe } from '@/components';
import { useGlobalStore } from '@/mobx';

function AboutDetail() {
  const [webUrl, setWebUrl] = useState<string>('');
  const { state } = useLocation();
  const { changeState } = useGlobalStore();

  useEffect(() => {
    if (!state.id) {
      return;
    }
    changeState('isLoading', true);
    getAboutTypesDetail({ Id: state.id, Version: state.Version })
      .then((res: any) => {
        if ((res.Data?.length ?? 0) > 0) {
          setWebUrl(res.Data.shift().Url ?? '');
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, state]);

  return (
    <>
      <Iframe
        src={webUrl}
        id={`AboutDetail-${state.id}`}
        className='h-full p-0-30'
      />
    </>
  );
}

export default AboutDetail;
