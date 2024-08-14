import { memo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
import { ChangLong } from '@/pages/gameComponents';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import styles from '../index.module.scss';
import {
  bullfightTab,
  conformityTab,
  firstBallTab,
  fiveBallTab,
  fourBallTab,
  quickTab,
  secBallTab,
  thrBallTab,
} from '../constFiles/const2905';
import { QuickRectCodeGroup, RectCodeGroup } from '../contentTabs';
import { useLanguage } from '@/hooks';

export interface ContentProps {
  curPeriodNumber: string;
  curGameId: number;
  getItememMultip: Function;
  handleBetClick: Function;
  ik: number;
  onClear: Function;
  gameWs: any;
  clRef?: any;
}

const commonCN = 'p-b-220 o-y h-full';

const Content = memo((props: ContentProps) => {
  const {
    curPeriodNumber,
    curGameId,
    getItememMultip,
    handleBetClick,
    ik,
    onClear,
    gameWs,
    clRef,
  } = props;
  const [actKey, setActKey] = useState('1');
  const { formatMsg } = useLanguage();

  const handleChange = (it) => {
    if (it.paneKey !== actKey) {
      setActKey(it.paneKey);
      onClear();
      if (
        typeof clRef?.current?.onResetData === 'function' &&
        (it.paneKey === '9' || actKey === '9')
      ) {
        clRef.current.onResetData();
      }
    }
  };

  return (
    <Tabs
      titleClassName={`p-b-50 ws-no w-230 ${styles['content-wrap']}`}
      titleItemClassName='p-30-20-10 h-110'
      type='tabs'
      activeId={actKey}
      direction='vertical'
      onChange={handleChange}
    >
      <TabPane className='o-none' paneKey='1' title={formatMsg('ZHENG_HE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '1' && (
          <RectCodeGroup
            tabRes={conformityTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='2' title={formatMsg('QIU_1')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '2' && (
          <RectCodeGroup
            tabRes={firstBallTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='3' title={formatMsg('QIU_2')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '3' && (
          <RectCodeGroup
            tabRes={secBallTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='4' title={formatMsg('QIU_3')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '4' && (
          <RectCodeGroup
            tabRes={thrBallTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='5' title={formatMsg('QIU_4')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '5' && (
          <RectCodeGroup
            tabRes={fourBallTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='6' title={formatMsg('QIU_5')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '6' && (
          <RectCodeGroup
            tabRes={fiveBallTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='7' title={formatMsg('DOU_NIU')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '7' && (
          <RectCodeGroup
            tabRes={bullfightTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='8' title={formatMsg('KUAI_JIE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '8' && (
          <QuickRectCodeGroup
            onClear={onClear}
            tabRes={quickTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-y' paneKey='9' title={formatMsg('CL_BET')}>
        {actKey === '9' && <ChangLong gameWs={gameWs} ref={clRef} ik={ik} />}
      </TabPane>
    </Tabs>
  );
});

export default Content;
