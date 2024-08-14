import { ReactNode, useRef, useCallback, useState, memo } from 'react';
import { Dialog, Icon, Tabs, TabPane, Img } from '@/components';
import styles from './index.module.scss';
import lotResult from '@/assets/image/common/pc28chat/lotResult.png';
import dataRes from '@/assets/image/common/pc28chat/dataRes.png';
import douDragon from '@/assets/image/common/pc28chat/douDragon.png';
import numTrend from '@/assets/image/common/pc28chat/numTrend.png';
import singleDou from '@/assets/image/common/pc28chat/singleDou.png';
import size from '@/assets/image/common/pc28chat/size.png';
import DewdropTray from '../dewdropTray';
import NumberTrend from '../numberTrend';
import LotResult from './lotResult';
import DataAnalysis from './dataAnalysis';
import DoubleChanglong from './doubleChanglong';
import { useLanguage } from '@/hooks';

const tabsHeader = [
  {
    paneKey: '1',
    imgSrc: lotResult,
    text: '开奖结果',
    textKey: 'lotteryResults',
  },
  {
    paneKey: '2',
    imgSrc: dataRes,
    text: '数据分析',
    textKey: 'dataAnalysis',
  },
  {
    paneKey: '3',
    imgSrc: douDragon,
    text: '双面长龙',
    textKey: 'doubleDragon',
  },
  {
    paneKey: '4',
    imgSrc: singleDou,
    text: '单双露珠',
    textKey: 'SingleDoubleDewdrops',
  },
  {
    paneKey: '5',
    imgSrc: size,
    text: '大小露珠',
    textKey: 'sizeDewdrops',
  },
  {
    paneKey: '6',
    imgSrc: numTrend,
    text: '号码走势',
    textKey: 'numTrend',
  },
];

interface BetModelProps {
  curGameId?: number;
  onCancel?: Function;
  gameRecords?: any[];
  sourceNode?: ReactNode;
  // gameScen?: Obj;
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

const TabsContent = memo(({ gameRecords, curGameId }: any) => {
  const [actId, setActId] = useState('1');

  const handleClick = useCallback(
    (info) => {
      if (info?.paneKey && actId !== info?.paneKey) {
        setActId(info.paneKey);
      }
    },
    [actId]
  );

  return (
    <Tabs
      className='df-fdc f-1'
      type='tabs'
      onClick={handleClick}
      isRectangle
      activeId={actId}
    >
      <TabPane
        paneKey={tabsHeader[0].paneKey}
        title={<TabTitleNode {...tabsHeader[0]} />}
      >
        <LotResult recordData={gameRecords} />
      </TabPane>
      <TabPane
        paneKey={tabsHeader[1].paneKey}
        title={<TabTitleNode {...tabsHeader[1]} />}
      >
        <DataAnalysis recordsData={gameRecords} gameId={curGameId} />
      </TabPane>
      <TabPane
        paneKey={tabsHeader[2].paneKey}
        title={<TabTitleNode {...tabsHeader[2]} />}
      >
        <DoubleChanglong recordsData={gameRecords} gameId={curGameId} />
      </TabPane>
      <TabPane
        paneKey={tabsHeader[3].paneKey}
        title={<TabTitleNode {...tabsHeader[3]} />}
      >
        <DewdropTray gameType={curGameId} ballType='DS' data={gameRecords} />
      </TabPane>
      <TabPane
        paneKey={tabsHeader[4].paneKey}
        title={<TabTitleNode {...tabsHeader[4]} />}
      >
        <DewdropTray gameType={curGameId} ballType='DX' data={gameRecords} />
      </TabPane>
      <TabPane
        paneKey={tabsHeader[5].paneKey}
        title={<TabTitleNode {...tabsHeader[5]} />}
      >
        <NumberTrend gameType={curGameId} data={gameRecords} />
      </TabPane>
    </Tabs>
  );
});

export const TrendModel = (props: BetModelProps) => {
  const { gameRecords, curGameId, sourceNode } = props;
  const dialogRef = useRef(null);
  const { formatMsg } = useLanguage();

  const onCancel = useCallback(() => {
    if (typeof dialogRef?.current?.onClose === 'function') {
      dialogRef?.current?.onClose();
    }
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      sourceNode={sourceNode}
      isFooter={false}
      isTitle={false}
      bodyClassname={`${styles['trend-body']} w-full h-full`}
      contentCls='w-full h-full'
    >
      <div
        className={`w-full h-full d-f fd-c o-none ${styles['trend-content']} bg-body`}
      >
        <div className='bg-gdt-top color-white h-150 d-f ai-c jc-sb p-0-50'>
          <div className='h-150' />
          <div className='t-h1 ta-c'>{formatMsg('tendency')}</div>
          <Icon onClick={onCancel} className={styles['goback']} name='close' />
        </div>
        <TabsContent gameRecords={gameRecords} curGameId={curGameId} />
      </div>
    </Dialog>
  );
};
