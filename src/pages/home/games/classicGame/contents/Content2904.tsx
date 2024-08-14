import { memo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
import { ChangLong } from '@/pages/gameComponents';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import styles from '../index.module.scss';
import {
  d1_10Tab,
  dualityTab,
  quickTab,
  sumTab,
} from '../constFiles/const2904';
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
      <TabPane className='o-none' paneKey='1' title={formatMsg('LIANG_MIAN')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '1' && (
          <RectCodeGroup
            tabRes={dualityTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='2' title={formatMsg('NUMBER_1_10')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '2' && (
          <RectCodeGroup
            tabRes={d1_10Tab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='3' title={formatMsg('GUAN_YA_HE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '3' && (
          <RectCodeGroup
            tabRes={sumTab}
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='4' title={formatMsg('KUAI_JIE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '4' && (
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

