import React from 'react';
import { observer } from 'mobx-react-lite';
// import './index.css';
import styles from './index.module.scss';
import { useGlobalStore } from '@/mobx';

// mobx 使用
const MobxDemo: React.FC = () => {
  const { theme, changeState } = useGlobalStore();

  return (
    <div className='t'>
      <div
        onClick={() => {
          changeState('theme', 'ddd');
        }}
        className={styles['t-m']}
      >
        mobx
      </div>
      {theme}
    </div>
  );
};

export default observer(MobxDemo);
