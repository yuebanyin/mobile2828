import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Img, OutLink } from '@/components';
import styles from './index.module.scss';
import { cryList } from '@/constants';

type DataType = {
  isVerfied: boolean;
};
function UserScore(props: DataType) {
  const { isVerfied } = props;
  const { t } = useTranslation();

  const getUrl = useCallback(
    (item) => {
      if (item.id === 2) {
        if (typeof isVerfied !== 'boolean') {
          return '';
        }
        if (!isVerfied) {
          return '/mine/cWithdrawPsd';
        }
      }
      return item.href;
    },
    [isVerfied]
  );

  return (
    <div
      className={`${styles['balance-icon']} d-f ai-c jc-sb bs-primary br-b-l-30 br-b-r-30`}
    >
      {cryList.map((item) => (
        <OutLink
          className={`${styles['icon-item']} d-f fd-c jc-c ai-c`}
          key={item.id}
          href={getUrl(item)}
        >
          <Img className='icon-main-110' src={item.icon} />
          <span className='t-small-title color-primary-text'>{t(item.title)}</span>
        </OutLink>
      ))}
    </div>
  );
}

export default memo(UserScore);
