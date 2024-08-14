import { forwardRef, useMemo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
import { ChangLong } from '@/pages/gameComponents';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import {
  betNumberList,
  getLmFourTitle,
  getLmSixTitle,
  tabListFifth,
  tabListSixth,
} from '../constFiles/const3102';
import { DWORD } from '@/engine/base/basetype';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { ButtonDataType } from '../../game3202/rules';
import { DoubleDisk, FsCom, FsRank, FsSub, NumberDisk } from '../contentTabs';
import { useLanguage } from '@/hooks';

export interface ContentProps {
  gameMultiple?: DWORD[]; // 赔率信息
  dyMultiple?: common.tagDynamicMultiple[]; // 动态赔率信息
  // eslint-disable-next-line no-unused-vars
  onChange?: (types: ButtonDataType[]) => void;
  // eslint-disable-next-line no-unused-vars
  onChangLongChange?: (...args: any) => void;
  gameWs?: any;
  ik: number;
  curGameId: number;
  curPeriodNumber: string;
  getItememMultip: Function;
  handleBetClick: Function;
  onClear: Function;
  clRef?: any;
}

const commonCN = 'm-t-30 m-l-30 m-r-30 p-b-220 o-y h-full';
export const Content = forwardRef((props: ContentProps) => {
  // onChangLongChange
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
  const groupListMap = useMemo(() => {
    const firstArr = [...betNumberList[0].list.slice(0, 10)]; // 数字盘 冠军-第十名
    const secArr = [...betNumberList[0].list.slice(10, 20)];
    const thirArr = [...betNumberList[0].list.slice(20, 30)];
    const forthArr = [...betNumberList[0].list.slice(30, 40)];
    const fifthArr = [...betNumberList[0].list.slice(40, 50)];
    const sixArr = [...betNumberList[0].list.slice(50, 60)];
    const sevArr = [...betNumberList[0].list.slice(60, 70)];
    const eightArr = [...betNumberList[0].list.slice(70, 80)];
    const nineArr = [...betNumberList[0].list.slice(80, 90)];
    const tenArr = [...betNumberList[0].list.slice(90, 100)];
    ////两面盘
    const fsArr = [...betNumberList[1].list.slice(0, 4)];
    const fsArr_1 = [...betNumberList[1].list.slice(4, 10)];
    const fsArr_2 = getLmSixTitle('BTM_RANK_2');
    const fsArr_3 = getLmSixTitle('BTM_RANK_3');
    const fsArr_4 = getLmSixTitle('BTM_RANK_4');
    const fsArr_5 = getLmSixTitle('BTM_RANK_5');
    const fsArr_6 = getLmFourTitle('BTM_RANK_6');
    const fsArr_7 = getLmFourTitle('BTM_RANK_7');
    const fsArr_8 = getLmFourTitle('BTM_RANK_8');
    const fsArr_9 = getLmFourTitle('BTM_RANK_9');
    const fsArr_10 = getLmFourTitle('BTM_RANK_10');
    ///冠亚和
    const fsSubArr = [...betNumberList[2].list.slice(0, 21)];
    const fsSubArr_1 = [...betNumberList[2].list.slice(21, 37)];
    const fsSubArr_2 = [...betNumberList[2].list.slice(37, 53)];
    //冠亚组合
    const fsComArr = [...betNumberList[3].list];
    //1~5名
    const fsRank_1 = [
      ...getLmSixTitle('BTM_RANK_1'),
      ...betNumberList[0].list.slice(0, 10),
    ];
    const fsRank_2 = [
      ...getLmSixTitle('BTM_RANK_2'),
      ...betNumberList[0].list.slice(10, 20),
    ];
    const fsRank_3 = [
      ...getLmSixTitle('BTM_RANK_3'),
      ...betNumberList[0].list.slice(20, 30),
    ];
    const fsRank_4 = [
      ...getLmSixTitle('BTM_RANK_4'),
      ...betNumberList[0].list.slice(30, 40),
    ];
    const fsRank_5 = [
      ...getLmSixTitle('BTM_RANK_5'),
      ...betNumberList[0].list.slice(40, 50),
    ];
    //6~10名
    const fsRank_6 = [
      ...getLmFourTitle('BTM_RANK_6'),
      ...betNumberList[0].list.slice(50, 60),
    ];
    const fsRank_7 = [
      ...getLmFourTitle('BTM_RANK_7'),
      ...betNumberList[0].list.slice(60, 70),
    ];
    const fsRank_8 = [
      ...getLmFourTitle('BTM_RANK_8'),
      ...betNumberList[0].list.slice(70, 80),
    ];
    const fsRank_9 = [
      ...getLmFourTitle('BTM_RANK_9'),
      ...betNumberList[0].list.slice(80, 90),
    ];
    const fsRank_10 = [
      ...getLmFourTitle('BTM_RANK_10'),
      ...betNumberList[0].list.slice(90, 100),
    ];

    return {
      firstArr,
      secArr,
      thirArr,
      forthArr,
      fifthArr,
      sixArr,
      sevArr,
      eightArr,
      nineArr,
      tenArr,
      fsArr,
      fsArr_1,
      fsArr_2,
      fsArr_3,
      fsArr_4,
      fsArr_5,
      fsArr_6,
      fsArr_7,
      fsArr_8,
      fsArr_9,
      fsArr_10,
      fsSubArr,
      fsSubArr_1,
      fsSubArr_2,
      fsComArr,
      fsRank_1,
      fsRank_2,
      fsRank_3,
      fsRank_4,
      fsRank_5,
      fsRank_6,
      fsRank_7,
      fsRank_8,
      fsRank_9,
      fsRank_10,
    };
  }, []);

  const handleChange = (it) => {
    if (it.paneKey !== actKey) {
      setActKey(it.paneKey);
      onClear();
      if (
        typeof clRef?.current?.onResetData === 'function' &&
        (it.paneKey === '7' || actKey === '7')
      ) {
        clRef.current.onResetData();
      }
    }
  };

  return (
    <Tabs
      onChange={handleChange}
      titleClassName='p-b-50 w-230'
      titleItemClassName='p-30-20-10 h-110'
      animatedTime={100}
      activeId={actKey}
      type='tabs'
      direction='vertical'
    >
      <TabPane className='o-none' paneKey='1' title={formatMsg('DIGHT_PAN')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '1' && (
          <NumberDisk
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-y' paneKey='2' title={formatMsg('LIANG_MIAN_PAN')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '2' && (
          <DoubleDisk
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-y' paneKey='3' title={formatMsg('GUAN_YA_HE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '3' && (
          <FsSub
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='4' title={formatMsg('GUAN_YA_ZUHE')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '4' && (
          <FsCom
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='5' title={formatMsg('NUMBER_1_5')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '5' && (
          <FsRank
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            tabList={tabListFifth}
            wordLine={3}
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='6' title={formatMsg('NUMBER_6_10')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '6' && (
          <FsRank
            ik={ik}
            getItememMultip={getItememMultip}
            curGameId={curGameId}
            className={commonCN}
            childrenData={groupListMap}
            curPeriodNumber={curPeriodNumber}
            handleBetClick={handleBetClick}
            tabList={tabListSixth}
            wordLine={4}
          />
        )}
      </TabPane>
      <TabPane className='o-y' paneKey='7' title={formatMsg('CL_BET')}>
        {actKey === '7' && <ChangLong gameWs={gameWs} ref={clRef} ik={ik} />}
      </TabPane>
    </Tabs>
  );
});

export default Content;

