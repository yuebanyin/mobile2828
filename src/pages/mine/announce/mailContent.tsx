import { memo, useCallback, useEffect, useState } from 'react';
import { Icon, Swipe } from '@nutui/nutui-react';
import { observer } from 'mobx-react-lite';
import { Img, OutLink } from '@/components';
import styles from './index.module.scss';
import { deleteMail, getUserMail } from '@/services';
import { useUserEmailCountStore } from '@/mobx/userEmail';
import { useRefs } from '@/hooks/useRefs';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const MailCon = observer(() => {
  const [tableEmail, setTableEmail] = useState<any[]>([]);
  const { changeUserEmailCount, userEmailCount } = useUserEmailCountStore();
  const { formatMsg } = useLanguage();
  const { changeState } = useGlobalStore();
  const [refs, setRefs] = useRefs();

  useEffect(() => {
    changeState('isLoading', true);
    getUserMail()
      .then((res: any) => {
        setTableEmail(res.Data.List);
        let val = 0;
        for (let i = 0; i < res.Data.List.length; i += 1) {
          if (res.Data.List[i].Status === false) {
            val += 1;
          }
        }
        if (val > 0) {
          changeUserEmailCount(val);
        }
      })
      .catch(() => {
        console.log('加载数据失败');
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, changeUserEmailCount, userEmailCount]);

  const clickDelete = useCallback(
    (item) => {
      changeState('isLoading', true);
      deleteMail({ Id: item.Id })
        .then((res: any) => {
          const tempVal = tableEmail.filter((val) => val.Id !== item.Id);
          setTableEmail([]);
          setTimeout(() => {
            setTableEmail(tempVal);
          }, 5);
          console.log('🚀 ~ file: mailContent.tsx:38 ~ .then ~ res:', res);
        })
        .catch(() => {
          console.log('加载数据失败');
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, tableEmail]
  );

  return (
    <div>
      {tableEmail.map((item, i) => (
        <OutLink
          key={item.id || i}
          href={`/mine/announce/info?title=${formatMsg('msgContent')}`}
          routeOptions={{ state: { item } }}
        >
          <Swipe
            ref={setRefs[i]}
            rightAction={
              <Img
                className={`${styles['del-btn']}`}
                src='/mine/btn_del.png'
                onClick={() => {
                  refs[i]?.current.onClose();
                  clickDelete(item);
                }}
              />
            }
          >
            <div
              className={`d-f ai-c jc-sb bg-body b-b-1 ${
                tableEmail.length === i + 1 ? '' : 'bc-split'
              }`}
            >
              <Img
                className={`${styles['msg-icon']}`}
                src='/mine/icon_xiaoxi.png'
              />
              <div className='df-fdc flex-1 p-30 o-none color-con-ass'>
                <div className='d-f ai-c jc-sb o-none'>
                  <div className='wds-con oe flex-1 color-primary-text'>
                    {item.Title}
                  </div>
                  <Icon className='m-r-20' name='right' />
                </div>
                <div className='d-f ai-c jc-sb o-none'>
                  <div className={`wds-sm-con m-t-20  ${styles['time']}`}>
                    {item.SendTime}
                  </div>
                  <div
                    className={`wds-sm-con m-t-20 m-r-20 ${
                      item.Status ? styles['status'] : styles['statusEx']
                    }`}
                  >
                    {item.Status
                      ? formatMsg('UserMailMsg3')
                      : formatMsg('unread')}
                  </div>
                </div>
              </div>
            </div>
          </Swipe>
        </OutLink>
      ))}
    </div>
  );
});

export default memo(MailCon);
