import {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from 'react';
import i18n from 'i18next';
import { observer } from 'mobx-react-lite';
import { Dialog, Icon, Tabs, TabPane, Img, Button } from '@/components';
import styles from './index.module.scss';
import lotResult from '@/assets/image/common/pc28chat/lotResult.png';
import dataRes from '@/assets/image/common/pc28chat/dataRes.png';
import douDragon from '@/assets/image/common/pc28chat/douDragon.png';
import numTrend from '@/assets/image/common/pc28chat/numTrend.png';
import singleDou from '@/assets/image/common/pc28chat/singleDou.png';
import size from '@/assets/image/common/pc28chat/size.png';
import miCardNum from '@/assets/image/common/pc28chat/miCard_1.png';
import miCardTime from '@/assets/image/common/pc28chat/miCard_2.png';
import LotResult from '../pc28Trend/lotResult';
import { Scratch } from '@/pages/gameComponents';
import DewdropTray from '../dewdropTray';
import NumberTrend from '../numberTrend';
import DataAnalysis from '../pc28Trend/dataAnalysis';
import DoubleChanglong from '../pc28Trend/doubleChanglong';
import { ResultNumber } from '../../games/mipaiDialog';
import { useGameConfigStore } from '@/mobx';
import { useLanguage } from '@/hooks';

const tabsHeader = [
  {
    paneKey: '1',
    imgSrc: lotResult,
    text: '开奖结果',
    textKey: i18n.t('lotteryResults'),
  },
  {
    paneKey: '2',
    imgSrc: dataRes,
    text: '数据分析',
    textKey: i18n.t('dataAnalysis'),
  },
  {
    paneKey: '3',
    imgSrc: douDragon,
    text: '双面长龙',
    textKey: i18n.t('doubleDragon'),
  },
  {
    paneKey: '4',
    imgSrc: singleDou,
    text: '单双露珠',
    textKey: i18n.t('SingleDoubleDewdrops'),
  },
  {
    paneKey: '5',
    imgSrc: size,
    text: '大小露珠',
    textKey: i18n.t('sizeDewdrops'),
  },
  {
    paneKey: '6',
    imgSrc: numTrend,
    text: '号码走势',
    textKey: i18n.t('numTrend'),
  },
];

interface BetModelProps {
  curGameId: number;
  onCancel?: Function;
  gameRecords: any[];
  sourceNode?: ReactNode;
  lastPeriod?: string;
}

/**
 * tabs 传入的头部 dom 节点
 * @returns node
 */
const TabTitleNode = (props: any) => {
  const { imgSrc, textKey } = props;
  const { formatMsg } = useLanguage();

  return (
    <div className='df-fdc ai-c'>
      <Img isNoTheme className='w-100 h-100' src={imgSrc} />
      <div className='t-small m-t-10'>{formatMsg(textKey)}</div>
    </div>
  );
};

// 截止第几期
const PreiCount = observer(
  ({
    lastPeriod,
    initCanvas,
  }: Pick<BetModelProps, 'lastPeriod'> & { initCanvas: Function }) => {
    const { countTime } = useGameConfigStore();
    const { formatMsg } = useLanguage();

    useEffect(() => {
      if (!(Number(countTime) >= 0)) {
        initCanvas();
      }
    }, [countTime, initCanvas]);

    return (
      <div className='m-r-90'>
        <div className='wds-con color-white m-b-12'>
          <span>{formatMsg('mipai_con_2')}</span>
          <span className='color-yel'>{`${lastPeriod}`.slice(-8)}</span>
          <span>{formatMsg('mipai_con_3')}：</span>
          <span className='color-yel'>{countTime}</span>
          {Number(countTime) >= 0 && <span>{formatMsg('mipai_con_4')}</span>}
        </div>
        <div className='wds-con color-white'>
          <span>{formatMsg('mipai_con_2')}</span>
          <span className='color-yel'>{`${lastPeriod}`.slice(-8)}</span>
          <span>{formatMsg('mipai_con_5')}：</span>
          <span className='color-yel'>
            {Number(countTime) >= 0 ? Number(countTime) + 10 : 10}
          </span>
          <span>{formatMsg('mipai_con_4')}</span>
        </div>
      </div>
    );
  }
);

const TabsContent = memo(
  ({ gameRecords, canvasRefTwo, curGameId, onBigClear, lastPeriod }: any) => {
    const [actId, setActId] = useState('1');

    // 外部控制tabs切换
    const hanldeTabChange = useCallback(
      (tabInfo?) => {
        if (tabInfo.paneKey !== actId) {
          setActId(tabInfo.paneKey);
        }
      },
      [actId]
    );
    return (
      <Tabs
        childreClassName='d-f'
        animatedTime={200}
        className='df-fdc f-1'
        type='tabs'
        activeId={actId}
        onClick={hanldeTabChange}
      >
        <TabPane
          isActChildren
          paneKey={tabsHeader[0].paneKey}
          title={<TabTitleNode {...tabsHeader[0]} />}
        >
          <LotResult
            recordData={gameRecords}
            canvasRefTwo={canvasRefTwo}
            isScratch
            onBigClear={onBigClear}
          />
        </TabPane>
        <TabPane
          isActChildren
          paneKey={tabsHeader[1].paneKey}
          title={<TabTitleNode {...tabsHeader[1]} />}
        >
          <DataAnalysis recordsData={gameRecords} gameId={curGameId} />
        </TabPane>
        <TabPane
          isActChildren
          paneKey={tabsHeader[2].paneKey}
          title={<TabTitleNode {...tabsHeader[2]} />}
        >
          <DoubleChanglong recordsData={gameRecords} gameId={curGameId} />
        </TabPane>
        <TabPane
          isActChildren
          paneKey={tabsHeader[3].paneKey}
          title={<TabTitleNode {...tabsHeader[3]} />}
        >
          <DewdropTray gameType={curGameId} ballType='DS' data={gameRecords} />
        </TabPane>
        <TabPane
          isActChildren
          paneKey={tabsHeader[4].paneKey}
          title={<TabTitleNode {...tabsHeader[4]} />}
        >
          <DewdropTray gameType={curGameId} ballType='DX' data={gameRecords} />
        </TabPane>
        <TabPane
          isActChildren
          paneKey={tabsHeader[5].paneKey}
          title={<TabTitleNode {...tabsHeader[5]} />}
        >
          <NumberTrend
            gameType={curGameId}
            data={gameRecords}
            lastPeriod={lastPeriod}
          />
        </TabPane>
      </Tabs>
    );
  }
);

export const MiCardModel = (props: BetModelProps) => {
  const { gameRecords, curGameId, sourceNode, lastPeriod } = props;
  const { formatMsg } = useLanguage();

  const canvasRef = useRef(null);
  const canvasRefTwo = useRef(null);

  const dialogRef = useRef(null);

  const historyRef = useRef(null); // 传到历史记录组件ref

  const onCancel = useCallback(() => {
    if (typeof dialogRef?.current?.onClose === 'function') {
      dialogRef?.current?.onClose();
    }
  }, []);

  // 刷新
  const handleReff = useCallback(() => {
    historyRef?.current?.handleRef();
    if (typeof canvasRef?.current?.initDraw === 'function') {
      canvasRef?.current?.initDraw();
    }
    if (typeof canvasRefTwo?.current?.initDraw === 'function') {
      canvasRefTwo?.current?.initDraw();
    }
  }, []);

  // 小的canvas 清空处理
  const onClear = useCallback(() => {
    if (typeof canvasRefTwo?.current?.clearAll === 'function') {
      canvasRefTwo?.current?.clearAll();
    }
  }, []);

  // 大的canvas 清空处理
  const onBigClear = useCallback(() => {
    if (typeof canvasRef?.current?.clearAll === 'function') {
      canvasRef?.current?.clearAll();
    }
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      sourceNode={sourceNode}
      isFooter={false}
      isTitle={false}
      bodyClassname={`${styles['miCard-body']} w-full h-full`}
      contentCls='w-full h-full'
    >
      <div className='w-full h-full d-f fd-c o-none bg-body'>
        <div className='bg-gdt-top color-white h-150 d-f ai-c jc-sb p-0-50'>
          <Icon
            onClick={onCancel}
            className={styles['goback']}
            name='rect-left'
          />
          <div className='t-h1 ta-c'>{formatMsg('miPai')}</div>
          <div className='h-150 w-70' />
        </div>
        <div className='o-y'>
          <div className='p-r'>
            <Img isNoTheme className='h-94' src={miCardNum} />
            <div className='w-full p-a df-aic-jcc top-24 color-white t-small-title'>
              <span>{formatMsg('di')}</span>
              <span className='color-yel'>
                {`${gameRecords[0]?.szPeriodNumber?.value}`.slice(-8)}
              </span>
              <span>{formatMsg('mipai_con_1')}</span>
            </div>
          </div>
          <div className={`w-full d-f ai-c jc-c ${styles['cavas-box']}`}>
            <ResultNumber
              className={styles['result-number']}
              numberList={gameRecords[0]?.cbTableCard}
              gameType={curGameId}
            />
            <Scratch
              clear={onClear}
              className='p-r zi-small'
              ref={canvasRef}
              width={1080}
              height={264}
            />
          </div>
          <div className='p-r'>
            <Img isNoTheme className='h-164' src={miCardTime} />
            <div className='w-full p-a df-aic-jcc top-30'>
              <PreiCount lastPeriod={lastPeriod} initCanvas={handleReff} />
              <div>
                <Button onClick={handleReff} className='w-210 h-90 bg-ref-lig'>
                  <span className='t-h2 color-game-ball-red'>
                    {formatMsg('refresh')}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <TabsContent
            gameRecords={gameRecords}
            canvasRefTwo={canvasRefTwo}
            curGameId={curGameId}
            onBigClear={onBigClear}
            lastPeriod={lastPeriod}
          />
        </div>
      </div>
    </Dialog>
  );
};
