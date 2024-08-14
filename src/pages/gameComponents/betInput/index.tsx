import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { t } from 'i18next';
import { BgImg, Button, Img, Input, Dialog, toastText } from '@/components';
import styles from './index.module.scss';
import { SCORE } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { Score } from '@/components/score';
import { isArray, multiply } from '@/utils/tools';
import BetDialogCard from '@/pages/gameComponents/betDialogCard';
import BetDialogCardCL from '../betDialogCardCL';
import { useGameConfigStore, useGlobalStore } from '@/mobx';
import { Obj } from '@/constants';
import { useChangLongBetStore } from '@/mobx/changLongBet';
import { CMD_Game } from '@/engine/cmd/game/CMD_Game';
import { useLanguage } from '@/hooks';

interface BetInputProps {
  betChip?: Array<SCORE>;
  onBetClick?: Function;
  onClear?: Function;
  betCount?: number; // 注单条数
  tagCommonBetInfo?: common.tagCommonBetInfo[]; // 注单信息
  stPlaceBetFunction?: Function; ///长龙用
  betPeriod?: string;
  curGameId?: number;
  notSatisfyTips?: string;
  tagDynamicMultiple?: common.tagDynamicMultiple[]; // 特殊赔率
  standNum?: Obj;
}

const BetBtn = observer((props: any) => {
  const {
    curGameId,
    tagCommonBetInfo,
    betPeriod,
    onBetClick,
    tagDynamicMultiple,
    betTotal,
    changeValue,
  } = props;

  const { betLenTip } = useGameConfigStore();
  const { betInfoArr, changeBetInfoArr } = useChangLongBetStore();
  const { formatMsg } = useLanguage();

  useEffect(() => {
    // 下注总额值计算
    changeValue(betInfoArr?.length || 0);
  }, [betInfoArr, changeValue]);

  // 下注弹窗
  const handleBet = useCallback(
    (v) => {
      if (v <= 0) {
        toastText(`${formatMsg('beatIsagain')}`);
        return;
      }

      if (betInfoArr && betInfoArr?.length > 0) {
        changeBetInfoArr((betArr) => {
          const newBetArr = [];
          betArr.forEach((it: CMD_Game.CMD_GR_SSCCL_PlaceBet) => {
            it.tagCommonBetInfo.forEach((its: common.tagCommonBetInfo) => {
              its.lBetScore.value = Number(
                multiply(v, common.GOLD_RATIO, null)
              );
            });
            newBetArr.push(it);
          });
          return newBetArr;
        });

        Dialog.confirm({
          isTitle: false,
          onlyConfirm: false,
          onOk: () => onBetClick(betInfoArr),
          children: <BetDialogCardCL />,
        });
      } else {
        if (!tagCommonBetInfo || tagCommonBetInfo.length <= 0) {
          // toastText(`${standNum.len}不中，最少选择${standNum.len}个号码`);
          return;
        }

        if (isArray(tagCommonBetInfo)) {
          tagCommonBetInfo.map((it) => {
            it.lBetScore.value = Number(multiply(v, common.GOLD_RATIO, null));
            return it;
          });

          Dialog.confirm({
            isTitle: false,
            onlyConfirm: false,
            onOk: () => onBetClick(),
            btnName: `${t('bet')}`,
            children: (
              <BetDialogCard
                tagDynamicMultiple={tagDynamicMultiple}
                cPeriodNumber={{ value: betPeriod } as any}
                tagCommonBetInfo={tagCommonBetInfo}
                wKindID={{ value: curGameId }}
              />
            ),
          });
        }
      }
    },
    [
      betInfoArr,
      formatMsg,
      changeBetInfoArr,
      onBetClick,
      tagCommonBetInfo,
      tagDynamicMultiple,
      betPeriod,
      curGameId,
    ]
  );

  // 打开投注弹窗的点击事件
  const betClick = useCallback(() => {
    if (betLenTip) {
      // 处理连码、生肖连、尾数连、等排列组合最小注码数的判断
      if (betLenTip.indexOf('&') !== -1) {
        let tip = '';
        const arr = betLenTip.split('&');
        arr.forEach((t) => {
          tip += `${formatMsg(t)}`;
        });
        toastText(tip);
      } else {
        toastText(formatMsg(betLenTip));
      }
      return;
    }
    handleBet(betTotal);
  }, [betLenTip, handleBet, betTotal, formatMsg]);

  return (
    <Button
      className={`${styles['btn-bet']} m-0-30`}
      size='h-d-nol'
      onClick={betClick}
    >
      {t('bet')}
    </Button>
  );
});

const ScoreItem = observer(({ item, i, itemClick }: any) => {
  const { audioCKRef } = useGlobalStore();

  return (
    <BgImg
      key={item.value || i}
      className={`${styles['icon']} m-l-20`}
      url={`/common/chip/chip_0${i + 1}.png`}
      onClick={() => {
        // 点击音效
        if (audioCKRef?.current) {
          audioCKRef.current.currentTime = 0;
          const p = audioCKRef.current.play();
          if (p) {
            p.then(() => {
              audioCKRef.current.play();
            }).catch((e) => console.info(e));
          }
        }
        itemClick((item.value * 1.0) / common.GOLD_RATIO);
      }}
    >
      <div className={`${styles['icon-text']} ${styles[`icon-text-${i + 1}`]}`}>
        {(item.value * 1.0) / common.GOLD_RATIO >= 1000
          ? `${Math.floor((item.value * 1.0) / common.GOLD_RATIO / 1000)}K`
          : (item.value * 1.0) / common.GOLD_RATIO}
      </div>
    </BgImg>
  );
});

export const BetInput = forwardRef((props: BetInputProps, ref) => {
  const {
    betChip,
    onBetClick,
    onClear,
    betCount = 0,
    tagDynamicMultiple,
    tagCommonBetInfo,
    betPeriod,
    curGameId,
    standNum,
  } = props;
  const [betTotal, setBetTotal] = useState(0);
  const [betTotalScore, setBetTotalScore] = useState(0);
  const { formatMsg } = useLanguage();

  const itemClick = useCallback((num) => {
    setBetTotal((prev) => prev + num);
  }, []);

  const betInputChange = useCallback((e) => {
    if (parseFloat(e) < 0) {
      setBetTotal(0);
    } else {
      setBetTotal(parseFloat(e || '0'));
    }
  }, []);

  const clearSate = useCallback(() => {
    setBetTotal(0);
    onClear && onClear();
  }, [onClear]);

  // useEffect(() => {
  //   if (typeof betCount === 'number') {
  //     setBetTotalScore(betCount * betTotal);
  //   }
  // }, [betCount, betTotal]);

  function onResetData() {
    setBetTotal(0);
    setBetTotalScore(0);
  }

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  // 计算总金额
  const changeValue = useCallback(
    (len?: number) => {
      setBetTotalScore(betTotal * (betCount || len));
    },
    [betCount, betTotal]
  );

  return (
    <div className={`${styles['bet-ctrl']} bg-body w-full p-r`}>
      <div className={`${styles['b-20']} bg-body w-full p-a`}>
        <div className='d-f jc-sb m-0-30'>
          {/* 输入框 */}
          <div className='d-f fd-c jc-end flex-1'>
            <div className='d-f jc-c'>
              <Input
                type='number'
                value={betTotal}
                className={`${styles['bg-i']} h-100 w-300 br-20`}
                placeholder={`${formatMsg('inputAmount')}`}
                onChange={(e) => betInputChange(e)}
              />
              <div className='wds-con d-f fd-c jc-end p-l-10 flex-1'>
                <div className={`${styles.mB5} wds-con color-tips font-w-bold`}>
                  {t('betSum')}
                </div>
                <div className='wds-con w-180 color-red'>{betTotalScore}</div>
              </div>
            </div>
          </div>
          {/* 按钮模块 */}
          <div className={`${styles['btn']} d-f jc-sb m-t-30`}>
            <div className='d-f jc-end'>
              <div className='w-180 h-100'>
                <Button
                  className={`${styles['btn-clr']}`}
                  size='h-d-nol'
                  onClick={clearSate}
                >
                  {t('empty')}
                </Button>
              </div>
              <BetBtn
                betTotal={betTotal}
                curGameId={curGameId}
                standNum={standNum}
                tagCommonBetInfo={tagCommonBetInfo}
                betPeriod={betPeriod}
                onBetClick={onBetClick}
                tagDynamicMultiple={tagDynamicMultiple}
                changeValue={changeValue}
              />
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
                  <ScoreItem
                    key={item.value || i}
                    item={item}
                    i={i}
                    itemClick={itemClick}
                  />
                );
              }
              return '';
            })}
          </div>
          <div className={styles.balanceBg}>
            <Img
              className={styles.balanceImg}
              src='/home/GameField/balance_bg.png'
            />
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
});
