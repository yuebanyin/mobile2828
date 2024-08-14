import { memo, useEffect, useState } from 'react';
import { Img, OutLink, toastText } from '@/components';
import styles from './index.module.scss';
import { getHomeNotice } from '@/services';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const NoticContent = () => {
  const [tableNotice, setTableNotice] = useState<any[]>([]);
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    changeState('isLoading', true);
    getHomeNotice()
      .then((res: any) => {
        setTableNotice(res.Data);
      })
      .catch(() => {
        toastText(`${formatMsg('bulletinLoadFailed')}`);
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, formatMsg]);

  return (
    <div>
      {/* <TabPane className='m-t-30 o-y' title='公告' paneKey='1'> */}
      {tableNotice.map((item, i) => (
        <OutLink
          key={item.id || i}
          href={`/mine/announce/info?title=${formatMsg('annContent')}`}
          routeOptions={{ state: { item } }}
        >
          <div
            className={`d-f ai-c jc-sb bg-body b-b-1 ${
              tableNotice.length === i + 1 ? '' : 'bc-split'
            }`}
          >
            <Img
              className={`${styles['msg-icon']}`}
              src='/mine/icon_xiaoxi.png'
            />
            <div className='df-fdc flex-1 p-30 o-none color-con-ass'>
              <div className='d-f ai-c jc-sb o-none'>
                <div className='wds-con oe color-primary-text flex-1'>
                  {item.Title}
                </div>
                <div className='wds-sm-con m-r-20'>{item.Date}</div>
              </div>
              <div className='oe m-t-20'>{item.Content}</div>
            </div>
          </div>
        </OutLink>
      ))}
      {/* </TabPane> */}
    </div>
  );
};

export default memo(NoticContent);
