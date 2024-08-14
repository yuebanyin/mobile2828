import { memo } from 'react';
import { observer } from 'mobx-react-lite';
import i18n from 'i18next';
import { useUserScoreStore } from '@/mobx';
import { TrendModel } from './pc28Trend';
import { MiCardModel } from './miCard';
import CountDownTime from '@/pages/gameComponents/countDownTime';
import { NumberSoureModel } from './numberSoure';
import { BetOrderModel } from './betOrder';
import styles from './index.module.scss';
import { defaultAmount } from '@/constants';
import { formatDigit } from '@/utils/digit';

const modleMap = {
  hy: <div className={`${styles['modle-text-item']} d-f ai-c jc-c color-white br-10 m-r-20`}>{i18n.t('signal')}</div>,
  zd: <div className={`${styles['modle-text-item']} d-f ai-c jc-c color-white br-10 m-r-20`}>{i18n.t('beted')}</div>,
  mp: <div className={`${styles['modle-text-item']} d-f ai-c jc-c color-white br-10 m-r-20`}>{i18n.t('miPai')}</div>,
  zs: <div className={`${styles['modle-text-item']} d-f ai-c jc-c color-white br-10`}>{i18n.t('tendency')}</div>,
};

const GameOperateTop = observer((props: any) => {
  const { newPeriod, recordData, curGameId } = props;
  const { score } = useUserScoreStore();

  return (
    <div className='p-0-50 t-40 '>
      <div className='d-f jc-sb m-t-30 m-b-30 color-primary-text'>
        <div className='d-f ai-c '>
          <div className='m-r-30'>
            <span>{i18n.t('di')}</span>
            <span className='color-red'>{newPeriod?.slice(-8) || defaultAmount}</span>
            <span>{i18n.t('qi')}</span>
          </div>
          <CountDownTime className='p-10-40 br-10 bg-incon color-primary' />
        </div>
        <div className='d-f ai-c '>
          <div className='m-r-10'>{i18n.t('allBalance')}</div>
          <div className='p-10-30 br-10 bg-incon'>{formatDigit(score, 2) || defaultAmount}</div>
        </div>
      </div>
      <div className='d-f ai-c jc-c'>
        {curGameId === 2801 ? <NumberSoureModel sourceNode={modleMap.hy} gameRecords={recordData} /> : ''}
        <BetOrderModel sourceNode={modleMap.zd} gameRecords={recordData} curGameId={curGameId} />
        <MiCardModel lastPeriod={newPeriod} sourceNode={modleMap.mp} gameRecords={recordData} curGameId={curGameId} />
        <TrendModel sourceNode={modleMap.zs} gameRecords={recordData} curGameId={curGameId} />
      </div>
    </div>
  );
});
export default memo(GameOperateTop);

