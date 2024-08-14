import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../index.module.scss';
import { setMailRead } from '@/services';
import { useUserInfoStore } from '@/mobx/userInfo';
import { useUserEmailCountStore } from '@/mobx/userEmail';
import { useGlobalStore } from '@/mobx';

const AnnounceInfo = () => {
  const { state } = useLocation();
  const { account } = useUserInfoStore();
  const { changeUserEmailCount } = useUserEmailCountStore();
  const { userEmailCount } = useUserEmailCountStore();
  const { changeState } = useGlobalStore();

  useEffect(() => {
    if (state.item.Id && state.item.Status === false) {
      changeState('isLoading', true);
      setMailRead({ Id: state.item.Id })
        .then((res: any) => {
          console.log('🚀 ~ file: index.tsx:15 ~ setMailRead ~ res:', res);
          changeUserEmailCount(userEmailCount - 1);
        })
        .catch(() => {
          console.log('加载数据失败');
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [state, account, changeUserEmailCount, userEmailCount, changeState]);

  return (
    <>
      <div className='bg-body flex-1'>
        <div>
          <div className='color-primary-text wds-h2 m-0-50 m-t-30 font-w-bolder'>{state.item.Title}</div>
          <div className='color-con-ass wds-con m-0-50 m-t-30'>{state.item.Date || state.item.SendTime}</div>
          <div className='m-t-30 b-b-1 bc-split' />
        </div>
        <div className={`${styles['content']} color-primary-text`}>
          <div>{state.item.Content || state.item.Body}</div>
        </div>
      </div>
    </>
  );
};

export default memo(AnnounceInfo);
