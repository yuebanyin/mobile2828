import { useEffect, useState } from 'react';
import { Cell, CellGroup, Icon, toastText } from '@/components';
import styles from '../index.module.scss';
import { getBindGoPayList } from '@/services/personal';
import { useGlobalStore } from '@/mobx';
import { useLanguage } from '@/hooks';

// BindGoPay
function BindGoPay() {
  const { formatMsg } = useLanguage();
  const [count, setCount] = useState(3);
  const [goPayList, setGoPayList] = useState<Array<any>>([]);
  const { changeState } = useGlobalStore();

  useEffect(() => {
    changeState('isLoading', true);
    getBindGoPayList()
      .then((res: any) => {
        if ((res.Data?.length ?? 0) >= 0) {
          setGoPayList(res.Data);
          setCount(res.Count);
        } else {
          toastText('Network Error');
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  return (
    <>
      <div className='p-30-50-0'>
        {goPayList.map((item, i) => (
          <CellGroup key={`${i}` || item.WalletAddress} className='m-t-30'>
            <div className='d-f ai-c jc-sb p-0-50 p-t-30 p-b-30'>
              <span className={`${styles['title']}`}>
                {`GoPay${formatMsg('address')}`}
              </span>
              <span className={`${styles['title']}`}>{item.WalletAddress}</span>
            </div>
            <div className='d-f ai-c jc-sb p-0-50 p-t-30 p-b-30'>
              <span className={`${styles['title']}`}>
                {formatMsg('bindTime')}
              </span>
              <span className='wds-sm-con color-tips'>{item.BindTime}</span>
            </div>
          </CellGroup>
        ))}
      </div>
      {count < 3 ? (
        <div className='p-30-50-0'>
          <Cell
            key={1}
            title={
              <div className={`d-f fd-r jc-c flex-1  ${styles['m-l-50']}`}>
                <Icon
                  name='uploader'
                  size={15}
                  className={`${styles['add-icon']}`}
                />
                <span className={`${styles['title']}`}>
                  {formatMsg('addTo')}
                </span>
              </div>
            }
            rightDesc=' '
            isDivider={false}
            borderRadius='30'
            href='./detail'
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default BindGoPay;
