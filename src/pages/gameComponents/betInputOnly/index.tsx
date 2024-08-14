import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
 BgImg, Button, Img, Input 
} from '@/components';
import styles from './index.module.scss';
import { SCORE } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { Score } from '@/components/score';

interface BetInputOnlyProps {
  betChip?: Array<SCORE>;
  betValue?: number;
  // eslint-disable-next-line no-unused-vars
  betTotal?: number;
  // eslint-disable-next-line no-unused-vars
  onBetClick?: (betValue: number) => void;
  onClearClick?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange?: (betValue: number) => void;
}

export const BetInputOnly = (props: BetInputOnlyProps) => {
  console.log('🚀 ~ file: index.tsx:23 ~ BetInputOnly ~ props:', props);
  const {
 betChip, betValue = 0, betTotal = 0, onBetClick, onClearClick, onChange 
} = props;
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const betInputChange = useCallback(
    (e: any) => {
      const temp = parseInt(`${e}` || '0');
      setValue(() => temp);
      if (onChange) onChange(temp);
    },
    [onChange]
  );

  // const buildBetTotal = useCallback(() => {
  //   if (betTotalRender) return betTotalRender(betValue);
  //   return 0;
  // }, [betTotalRender, betValue]);

  const betInputClear = useCallback(() => {
    setValue(() => 0);
    if (onChange) onChange(0);
    if (onClearClick) onClearClick();
  }, [onChange, onClearClick]);

  const betClick = useCallback(() => {
    if (onBetClick) onBetClick(betValue);
  }, [onBetClick, betValue]);

  const itemClick = useCallback(
    (num: number) => {
      const temp = betValue + num;
      setValue(() => temp);
      if (onChange) onChange(temp);
    },
    [betValue, onChange]
  );

  useEffect(() => {
    setValue(() => betValue);
  }, [betValue]);

  return (
    <div className={`${styles['bet-ctrl']} bg-body w-full p-r`}>
      <div className={`${styles['b-20']} bg-body w-full p-a`}>
        <div className='d-f jc-sb m-0-30'>
          {/* 输入框 */}
          <div className='d-f fd-c jc-end flex-1'>
            <div className='d-f jc-c'>
              <Input type='number' value={value} className={`${styles['bg-i']} h-120 w-320 br-20`} placeholder={t('inputAmount')} onChange={(e) => betInputChange(e)} />
              <div className='wds-con d-f fd-c jc-end p-l-10 flex-1'>
                <div className='wds-con color-tips font-w-bold'>{t('betSum')}</div>
                <div className='wds-con w-180 color-red'>{betTotal}</div>
              </div>
            </div>
          </div>
          {/* 按钮模块 */}
          <div className={`${styles['btn']} d-f jc-sb m-t-30`}>
            <div className='d-f jc-end'>
              <div className='w-180 h-100'>
                <Button className={`${styles['btn-clr']}`} size='h-d-nol' onClick={() => betInputClear()}>
                {t('empty')}
                </Button>
              </div>
              <Button className={`${styles['btn-bet']} m-0-30`} size='h-d-nol' onClick={() => betClick()}>
                {t('bet')}
              </Button>
            </div>
            <div className='m-t-30 m-r-30' />
          </div>
        </div>
      </div>
      <div className={`${styles['bet-icon']} h-180 o-none p-a zi-small`}>
        <div className='d-f jc-start'>
          <div className={`${styles['im-inner']}`}>
            {betChip.map((item, i) => {
              if (item.value > 0) {
                return (
                  <BgImg
                    key={item.value || i}
                    className={`${styles['icon']} m-l-20`}
                    url={`/common/chip/chip_0${i + 1}.png`}
                    onClick={() => {
                      itemClick((item.value * 1.0) / common.GOLD_RATIO);
                    }}
                  >
                    <div className={`${styles['icon-text']} ${styles[`icon-text-${i + 1}`]}`}>
                      {(item.value * 1.0) / common.GOLD_RATIO >= 1000 ? `${Math.floor((item.value * 1.0) / common.GOLD_RATIO / 1000)}K` : (item.value * 1.0) / common.GOLD_RATIO}
                    </div>
                  </BgImg>
                );
              }
              return '';
            })}
          </div>
          <div className={styles.balanceBg}>
            <Img className={styles.balanceImg} src='/home/GameField/balance_bg.png' />
            <div className={styles.balanceScore}>
              <div className='d-f fd-c jc-start m-t-10 m-l-10 color-primary-text'>
                <div>{t('totalBalance')}</div>
                <div className='m-t-3'>
                  <Score />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
