import { memo, useMemo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import {
 betNumberList, touWeiArr, weiArr, wuHangArr 
} from '../constFiles/const3402';
import {
 LianMa, Quanbu, SeBo, SpecialCode, TeXiaoCode, TouWei 
} from '../contentTabs';

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

export const Content = memo((props: ContentProps) => {
  const {
 curPeriodNumber, curGameId, getItememMultip, handleBetClick, ik, onClear, cbCurrXiao, getStandNum 
} = props;

  const [actKey, setActKey] = useState('1');

  const groupListMap = useMemo(() => {
    const tmArr = betNumberList[0].list; // 特码
    const lmArr = betNumberList[1].list; // 两面
    const zmOneArr = betNumberList[2].list; // 正码1
    const zmTwoArr = betNumberList[3].list; // 正码2
    const zmThreeArr = betNumberList[4].list; // 正码3
    const zmFourArr = betNumberList[5].list; // 正码4
    const zmFiveArr = betNumberList[6].list; // 正码5
    const zmSixArr = betNumberList[7].list; // 正码6
    const zxArr = betNumberList[8].list; // 总肖
    const txArr = betNumberList[9].list; // 特肖
    const zhxArr = betNumberList[10].list; // 正肖
    const yxArr = betNumberList[11].list; // 一肖
    const lxArr = betNumberList[12].list; // 连肖
    const hxArr = betNumberList[13].list; // 合肖
    const twsArr = betNumberList[14].list; // 头尾数
    const whArr = betNumberList[15].list; // 五行
    const wsArr = betNumberList[16].list; // 尾数
    const lwArr = betNumberList[17].list; // 连尾
    const lmaArr = betNumberList[18].list; // 连码
    const qbzArr = betNumberList[19].list; // 全不中
    const sbArr = betNumberList[20].list; // 色波
    return {
      tmArr,
      lmArr,
      zmOneArr,
      zmTwoArr,
      zmThreeArr,
      zmFourArr,
      zmFiveArr,
      zmSixArr,
      zxArr,
      txArr,
      zhxArr,
      yxArr,
      lxArr,
      hxArr,
      twsArr,
      whArr,
      wsArr,
      lwArr,
      lmaArr,
      qbzArr,
      sbArr,
    };
  }, []);

  const handleChange = (it) => {
    console.log('changegggg', it.paneKey, actKey);
    if (it.paneKey !== actKey) {
      setActKey(it.paneKey);
      onClear();
    }
  };

  return (
    <Tabs titleClassName='p-b-50 ws-no w-230' titleItemClassName='p-30-20-10 h-110' type='tabs' activeId={actKey} direction='vertical' onChange={handleChange}>
      <TabPane className='o-none' paneKey='1' title='特码'>
        <CountTimeBox />
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
      <TabPane className='o-none' paneKey='2' title='两面'>
        <CountTimeBox />
        {actKey === '2' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={8}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='3' title='色波'>
        <CountTimeBox />
        {actKey === '3' && (
          <SeBo
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            curPeriodNumber={curPeriodNumber}
            className={commonCN}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            titleIdx={22}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='4' title='特肖'>
        <CountTimeBox />
        {actKey === '4' && (
          <TeXiaoCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={11}
            cbCurrXiao={cbCurrXiao}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='5' title='头尾数'>
        <CountTimeBox />
        {actKey === '5' && (
          <TouWei
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={16}
            numList={touWeiArr}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='6' title='正码'>
        <CountTimeBox />
        {actKey === '6' && (
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
      <TabPane className='o-none' paneKey='7' title='正一特'>
        <CountTimeBox />
        {actKey === '7' && (
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
      <TabPane className='o-none' paneKey='8' title='正二特'>
        <CountTimeBox />
        {actKey === '8' && (
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
      <TabPane className='o-none' paneKey='9' title='正三特'>
        <CountTimeBox />
        {actKey === '9' && (
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
      <TabPane className='o-none' paneKey='10' title='正四特'>
        <CountTimeBox />
        {actKey === '10' && (
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
      <TabPane className='o-none' paneKey='11' title='正五特'>
        <CountTimeBox />
        {actKey === '11' && (
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
      <TabPane className='o-none' paneKey='12' title='正六特'>
        <CountTimeBox />
        {actKey === '12' && (
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
      <TabPane className='o-none' paneKey='13' title='正码1~6'>
        <CountTimeBox />
        {actKey === '13' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={9}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='14' title='五行'>
        <CountTimeBox />
        {actKey === '14' && (
          <TouWei
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={17}
            numList={wuHangArr}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='15' title='一肖'>
        <CountTimeBox />
        {actKey === '15' && (
          <TeXiaoCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={13}
            cbCurrXiao={cbCurrXiao}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='16' title='尾数'>
        <CountTimeBox />
        {actKey === '16' && (
          <TouWei
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={18}
            numList={weiArr}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='17' title='正肖'>
        <CountTimeBox />
        {actKey === '17' && (
          <TeXiaoCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={12}
            cbCurrXiao={cbCurrXiao}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='18' title='总肖'>
        <CountTimeBox />
        {actKey === '18' && (
          <SpecialCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            titleIdx={10}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='19' title='全不中'>
        <CountTimeBox />
        {actKey === '19' && (
          <Quanbu
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            curPeriodNumber={curPeriodNumber}
            className={commonCN}
            childrenData={groupListMap}
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            titleIdx={21}
            nums={49}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='20' title='连肖'>
        <CountTimeBox />
        {actKey === '20' && (
          <TeXiaoCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            topNode={Boolean(true)}
            titleIdx={14}
            cbCurrXiao={cbCurrXiao}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='21' title='连尾'>
        <CountTimeBox />
        {actKey === '21' && (
          <TouWei
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            topNode
            titleIdx={19}
            numList={weiArr}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='22' title='合肖'>
        <CountTimeBox />
        {actKey === '22' && (
          <TeXiaoCode
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            topNode={Boolean(true)}
            titleIdx={15}
            cbCurrXiao={cbCurrXiao}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='23' title='连码'>
        <CountTimeBox />
        {actKey === '23' && (
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
            // titleIdx={20}
            // nums={49}
          />
        )}
      </TabPane>
    </Tabs>
  );
});

export default Content;

