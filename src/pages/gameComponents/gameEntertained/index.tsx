import { observer } from 'mobx-react-lite';
import i18n from 'i18next';
import { useEffect } from 'react';
import { Img } from '@/components';
import entertainedPng from '@/assets/image/common/entertained.png';
import styles from './index.module.scss';
import { useGameConfigStore, useGameTimeStore } from '@/mobx';
import { useChangLongBetStore } from '@/mobx/changLongBet';

export const CountTimeBox = observer((props?: any) => {
  const { onClear } = props;
  const { countTime } = useGameConfigStore();

  useEffect(() => {
    // 清除投注信息
    if (typeof countTime === 'string' && onClear) {
      onClear();
    }
  }, [onClear, countTime]);

  if (typeof countTime === 'string') {
    return (
      <div className='bg-mask d-f jc-c ai-c p-a w-full h-full zi-middle '>
        <Img
          className={styles['entertained-png']}
          src={entertainedPng}
          isNoTheme
          onClick={(e) => {
            e?.stopPropagation();
          }}
        />
      </div>
    );
  }
  return <></>;
});

export const CountCLTimeBox = observer((props: { gameId: number }) => {
  const { gameId } = props;
  const { gameTimeMap } = useGameTimeStore();
  const { delGameBet } = useChangLongBetStore();
  const timeText = gameTimeMap[gameId];

  useEffect(() => {
    if (timeText === `${i18n.t('underCover')}`) {
      delGameBet(gameId);
    }
  }, [timeText, delGameBet, gameId]);

  if (timeText === `${i18n.t('underCover')}`) {
    return (
      <div
        className='bg-mask d-f jc-c ai-c p-a zi-small br-l-30 left-0 right-0 top-0 bottom-0'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className={`${styles['status-str']}`}>{i18n.t('underCover')}</span>
      </div>
    );
  }

  return <></>;
});
