import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPlayRules } from '@/services';
import { Iframe } from '@/components';
import { useGlobalStore } from '@/mobx';

function RulesDetail() {
  const [webUrl, setWebUrl] = useState<string>('');
  const { state } = useLocation();
  const { theme, changeState } = useGlobalStore();

  useEffect(() => {
    if (!state.kindId) {
      return;
    }
    changeState('isLoading', true);
    getPlayRules({ Id: state.kindId })
      .then((res: any) => {
        if ((res.Data?.length ?? 0) > 0) {
          let item = null;
          if (theme === 'blueyellow') {
            item = res.Data.find((it) => it.Version === '');
          } else {
            item = res.Data.find((it) => it.Version !== '');
          }
          if (item) {
            setWebUrl(item.Url ?? '');
          } else {
            setWebUrl('');
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [state, theme, changeState]);

  return (
    <>
      <Iframe
        src={webUrl}
        id={`RulesDetail-${state.id}`}
        className='h-full p-0-30'
      />
    </>
  );
}

export default RulesDetail;
