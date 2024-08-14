import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
// import './index.css';
import styles from './index.module.scss';
import { useGlobalStore } from '@/mobx';

// mobx 使用
const MobxDemoTwo: React.FC = () => {
  const { theme, changeState } = useGlobalStore();
  const { t } = useTranslation();
  return (
    <div className='t'>
      <div
        onClick={() => {
          changeState('theme', 'ddd');
        }}
        className={styles['t-m']}
      >
        {t('thisIs')}
        {theme}
      </div>
    </div>
  );
};

export default observer(MobxDemoTwo);
