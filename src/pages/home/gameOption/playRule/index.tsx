import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Iframe } from '@/components';
import { getOddsDescription, getPlayRules } from '@/services';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

function PlayRule() {
  const [webData, setWebData] = useState<any>([]);
  const [params] = useSearchParams();
  const id = params.get('id');
  const title = params.get('title');
  const { theme } = useGlobalStore();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    if (title === formatMsg('gameplayRules')) {
      getPlayRules({ Id: Number(id) })
        .then((res: any) => {
          if (res.Data) {
            setWebData(res.Data);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    } else {
      getOddsDescription({ Id: id })
        .then((res: any) => {
          if (res.Data) {
            console.log('🚀 ~ file: index.tsx:39 ~ .then ~ res:', res);
            setWebData(res.Data);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [id, theme, title, changeState, formatMsg]);

  return (
    <div className='w-full h-full p-t-30'>
      {/* {webData?.map((item) => {
        if (theme === 'blueyellow') {
          if (item.Version !== '') return '';
          return (
            <Iframe
              key={item.Version}
              src={item.Url}
              className='h-full p-0-30'
            />
          );
        }
        if (item.Version === '') return '';
        return (
          <Iframe key={item.Version} src={item.Url} className='h-full p-0-30' />
        );
      })} */}
      {/* 接口去版本号 */}
      {webData?.map((item) => (
        <Iframe key={item.Url} src={item.Url} className='h-full p-0-30' />
      ))}
    </div>
  );
}

export default PlayRule;
