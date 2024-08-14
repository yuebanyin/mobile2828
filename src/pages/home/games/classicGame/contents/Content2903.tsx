import { memo, useMemo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import {
  betNumberList,
  tabListFirst,
  subBetTypeMap,
  subTypeCode,
  getMul,
  getWSLMul,
  subWxTypeCode,
} from '../constFiles/const2903';
import {
  LianMa,
  Quanbu,
  SpecialCode,
  SXCode,
  HXCode,
  LianCode,
} from '../contentTabs';
import styles from '../index.module.scss';
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
  getStandNum?: Function;
  cbCurrXiao?: number;
}

const commonCN = 'm-t-30 m-l-30 p-b-220 o-y h-full';

/**
 * 1. 生肖连和位数连、2.半波、3.特肖和一肖、4.正特尾、5.连码和全不中、6.合肖
 */
export const Content = memo((props: ContentProps) => {
  const {
    curPeriodNumber,
    curGameId,
    getItememMultip,
    handleBetClick,
    ik,
    onClear,
    getStandNum,
  } = props;

  const [actKey, setActKey] = useState('1');
  const { formatMsg } = useLanguage();

  const groupListMap = useMemo(() => {
    const tmArr = betNumberList[0].list; // 特码
    const zmOneArr = betNumberList[1].list; // 正码1
    const zmTwoArr = betNumberList[2].list; // 正码2
    const zmThreeArr = betNumberList[3].list; // 正码3
    const zmFourArr = betNumberList[4].list; // 正码4
    const zmFiveArr = betNumberList[5].list; // 正码5
    const zmSixArr = betNumberList[6].list; // 正码6
    const zmArr = betNumberList[7].list; // 正码
    const bbArr = betNumberList[8].list; // 半波
    const txArr = betNumberList[9].list; // 特肖
    const yxArr = betNumberList[10].list; // 一肖
    const ztwArr = betNumberList[11].list; // 正特尾
    const lmaArr = betNumberList[12].list; // 连码
    const hxArr = betNumberList[13].list; // 合肖
    const sxlArr = betNumberList[14].list; // 生肖连
    const wslArr = betNumberList[15].list; // 尾数连
    const qbzArr = betNumberList[16].list; // 全不中

    return {
      tmArr,
      zmOneArr,
      zmTwoArr,
      zmThreeArr,
      zmFourArr,
      zmFiveArr,
      zmSixArr,
      zmArr,
      bbArr,
      txArr,
      yxArr,
      ztwArr,
      lmaArr,
      hxArr,
      sxlArr,
      wslArr,
      qbzArr,
    };
  }, []);

  const handleChange = (it) => {
    if (it.paneKey !== actKey) {
      setActKey(it.paneKey);
      onClear();
    }
  };
  console.warn('父组件~~~');

  return (
    <Tabs
      titleClassName='p-b-50 ws-no w-230'
      titleItemClassName='p-30-20-10 h-110'
      type='tabs'
      activeId={actKey}
      direction='vertical'
      onChange={handleChange}
    >
      <TabPane className='o-none' paneKey='1' title={formatMsg('TE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '1' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={0}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='2' title={formatMsg('ZM_1')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '2' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={1}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='3' title={formatMsg('ZM_2')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '3' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={2}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='4' title={formatMsg('ZM_3')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '4' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={3}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='5' title={formatMsg('ZM_4')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '5' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={4}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='6' title={formatMsg('ZM_5')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '6' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={5}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='7' title={formatMsg('ZM_6')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '7' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={6}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='8' title={formatMsg('ZM')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '8' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={7}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='9' title={formatMsg('BB')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '9' && (
          <SXCode
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            curPeriodNumber={curPeriodNumber}
            className={commonCN}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            tabList={[tabListFirst[8]]}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='10' title={formatMsg('TX')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '10' && (
          <SXCode
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            curPeriodNumber={curPeriodNumber}
            className={commonCN}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            tabList={[tabListFirst[9]]}
            boxClassName={styles['dabble-columns']}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='11' title={formatMsg('YX')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '11' && (
          <SXCode
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            curPeriodNumber={curPeriodNumber}
            className={commonCN}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            tabList={[tabListFirst[10]]}
            boxClassName={styles['dabble-columns']}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='12' title={formatMsg('ZTW')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '12' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={11}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='13' title={formatMsg('LM')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '13' && (
          <LianMa
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            getStandNum={getStandNum}
            curPeriodNumber={curPeriodNumber}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            onClear={onClear}
            tabList={[tabListFirst[12]]}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='14' title={formatMsg('HX')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '14' && (
          <HXCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            tabList={[tabListFirst[13]]}
            subBetTypeMap={subBetTypeMap}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='15' title={formatMsg('SXL')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '15' && (
          <LianCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            tabList={[tabListFirst[14]]}
            subTitles={subTypeCode}
            idx={0}
            getMul={getMul}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='16' title={formatMsg('WSL')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '16' && (
          <LianCode
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            tabList={[tabListFirst[15]]}
            subTitles={subWxTypeCode}
            idx={1}
            getMul={getWSLMul}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='17' title={formatMsg('QBZ')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '17' && (
          <Quanbu
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            curPeriodNumber={curPeriodNumber}
            className={commonCN}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            tabList={[tabListFirst[16]]}
            nums={49}
          />
        )}
      </TabPane>
    </Tabs>
  );
});

export default Content;

