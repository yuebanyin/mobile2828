import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Img, HorizolScroll, OutLink } from '@/components';
import { getNoticeData } from '@/services';
import styles from './index.module.scss';
import { useGlobalStore } from '@/mobx';

const Announcement = () => {
  const [data, setData] = useState('');
  const { language } = useGlobalStore();

  useEffect(() => {
    if (language) {
      getNoticeData()
        .then((res: any) => {
          setData(res?.Data?.Content);
        })
        .catch(() => {});
    }
  }, [language]);

  return (
    <OutLink
      href='/mine/announce'
      className='d-f ai-c jc-sb bg-home py-20 px-50 p-r'
    >
      <Img
        className={`${styles['w-52']} ${styles['h-46']}`}
        src='/home/suona.png'
      />
      <HorizolScroll classNameBox='m-l-12'>
        <span className={`${styles['notice-text']} color-sm-con`}>{data}</span>
      </HorizolScroll>
      <OutLink
        href='/home/leaderBoard'
        className={`${styles['right-mask']} p-a d-f jc-end ai-c`}
      >
        <Img className={styles['img-right']} src='/home/mask-right-rank.png' />
      </OutLink>
    </OutLink>
  );
};

export default observer(Announcement);

