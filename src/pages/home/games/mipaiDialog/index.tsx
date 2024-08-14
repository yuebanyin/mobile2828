import { memo, useCallback, useRef } from 'react';
import { Dialog, Img, BgImg, Button, Icon } from '@/components';
import { IconButton } from '@/pages/gameComponents/iconButton';
import boxBgPng from '@/assets/image/common/_scratchcard_bg.png';
import timeBoxPng from '@/assets/image/common/_scratchcard_time.png';
import peiPng from '@/assets/image/common/_scratchcard_period.png';
import resBgPng from '@/assets/image/common/_scratchcard_scratch.png';
import refBtnPng from '@/assets/image/common/_scratchcard_refresh.png';
import CountDownTime from '@/pages/gameComponents/countDownTime';
import {
  Scratch,
  BothColorLine,
  MajiangLine,
  SingGoldLine,
  ColorfulLine,
  TwentyBallLine,
} from '@/pages/gameComponents';
import styles from './index.module.scss';
import { useLanguage } from '@/hooks';

export const ResultNumber = memo(({ gameType, numberList, className }: any) => {
  const newList = numberList?.map((it) => it.value) || [];
  switch (gameType) {
    case 2801:
    case 2802:
    case 2803:
    case 2804:
    case 2901:
      return (
        <BothColorLine
          classBall={styles['n-ball']}
          classBox={`p-a zi-mini jc-c ${className}`}
          GameResult={newList || []}
        />
      );
    case 2902:
    case 2904:
    case 3102:
      return (
        <MajiangLine
          classBall='m-b-10'
          classBox={`${styles['mj-ball-box']} ${className}`}
          GameResult={newList || []}
        />
      );
    case 2903:
    case 3402:
      return (
        <ColorfulLine
          classBox={`${className}`}
          classBall='w-86 h-86'
          GameResult={numberList.map((it) => it.value)}
        />
      );
    case 2905:
    case 3202:
    case 3203:
      return (
        <SingGoldLine
          classBox={`${className}`}
          GameResult={numberList.map((it) => it.value)}
        />
      );
    case 3501:
      return (
        <div className={`d-f df-c ai-c ${className}`}>
          <TwentyBallLine
            classBall='m-b-10 m-r-20'
            GameResult={numberList.map((it) => it.value)}
          />
        </div>
      );
    default:
      return <></>;
  }
});

function MipaiDialog(props: any) {
  const { curPeriodNumber, periodNumber, numberList, gameType } = props;
  const { formatMsg } = useLanguage();

  const canvasRef = useRef(null);

  const mipaiDialogRef = useRef(null);

  const onClose = useCallback(() => {
    if (mipaiDialogRef?.current) {
      mipaiDialogRef.current.onClose();
    }
  }, []);

  // 刷新
  const handleReff = useCallback(() => {
    if (typeof canvasRef?.current?.initDraw === 'function') {
      canvasRef?.current?.initDraw();
    }
  }, []);

  return (
    <Dialog
      contentCls={`w-full h-full ${styles['content']} p-r`}
      isFooter={false}
      isTitle={false}
      sourceNode={
        <IconButton
          className='m-r-15'
          title={formatMsg('miPai')}
          iconClass={styles.icon}
          icon='/home/GameField/mp.png'
        />
      }
      bodyClassname={`${styles['body']} w-full bg-body o-y p-r`}
      ref={mipaiDialogRef}
    >
      <Img className='w-full h-full' src={boxBgPng} isNoTheme />
      <div className='p-a left-0 top-0 bottom-0 right-0 zi-mini'>
        <BgImg
          className={`${styles['time-box']} p-r`}
          url={timeBoxPng}
          isNoTheme
        >
          <div className={`${styles['time-box-a']} p-a d-f ai-c jc-sb`}>
            <div
              className={`color-white wds-con ta-c ${styles['time-box-a-l']}`}
            >
              <div className='color-yel'>
                {formatMsg('di')}
                <span className='color-white m-0-10'>
                  {`${curPeriodNumber}`.slice(-4)}
                </span>
                {formatMsg('qi')}
              </div>
              <div className='m-t-2'>{formatMsg('BettingCutOff')}</div>
            </div>
            <div className={`${styles['time-box-a-r']} ta-c t-large lh-52`}>
              <CountDownTime isHours={gameType !== 2904} />
            </div>
          </div>
        </BgImg>
        <BgImg
          className={`${styles['prei-box']} d-f ai-c jc-c`}
          url={peiPng}
          isNoTheme
        >
          <div className='color-yel t-h1 lh-52'>
            {formatMsg('di')}
            <span className='color-white m-0-20'>
              {`${periodNumber}`.slice(-4)}
            </span>
            {formatMsg('qi')}
          </div>
        </BgImg>
        <BgImg
          className={`${styles['res-box']} d-f ai-c jc-c`}
          url={resBgPng}
          isNoTheme
        >
          <ResultNumber
            className={`p-a zi-mini jc-c ${styles['result-number']}`}
            numberList={numberList}
            gameType={gameType}
          />
          <Scratch
            className='p-r zi-small'
            ref={canvasRef}
            width={844}
            height={317}
          />
        </BgImg>
        <BgImg
          onClick={handleReff}
          className={`${styles['ref-box']}`}
          url={refBtnPng}
          isNoTheme
        />
        <div className={`${styles['close-png']} p-a w-full`}>
          <Button
            className='icon-chat-150 m-0-auto bg-gdt-blue'
            onClick={onClose}
          >
            <Icon name='close' color='#fff' className='t-large-64' />
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(MipaiDialog);
