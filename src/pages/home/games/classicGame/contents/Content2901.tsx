import { memo, useMemo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
import { ChangLong } from '@/pages/gameComponents';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import { betNumberList } from '../../../pc28Games/const';
import { NumberCode, SpecialCode } from '../contentTabs';
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

const commonCN = 'm-t-30 m-l-30 m-r-30 p-b-220 o-y h-full';

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

  const groupListMap = useMemo(() => {
    const tmnArr = []; // 特码 号码盘
    const tmdArr = []; // 特码 大小、单双
    const tmjArr = []; // 特码 特殊组合
    const oneArr = [
      ...betNumberList[1].list.slice(10, 14),
      ...betNumberList[1].list.slice(0, 10),
    ];
    const twoArr = [
      ...betNumberList[2].list.slice(10, 14),
      ...betNumberList[2].list.slice(0, 10),
    ];
    const thrArr = [
      ...betNumberList[3].list.slice(10, 14),
      ...betNumberList[3].list.slice(0, 10),
    ];
    const lhhArr = [
      ...betNumberList[1].list.slice(-1),
      ...betNumberList[2].list.slice(-1),
      ...betNumberList[3].list.slice(-1),
    ];
    betNumberList[0].list.forEach((it) => {
      if (Number(it.text) >= 0) {
        tmnArr.push(it);
      } else if (
        [
          'DA',
          'XIAO',
          'DAN',
          'SHUANG',
          'DA_DAN',
          'XIAO_DAN',
          'DA_SHUANG',
          'XIAO_SHUANG',
        ].includes(it.text)
      ) {
        tmdArr.push(it);
      } else {
        tmjArr.push(it);
      }
    });
    return {
      tmnArr,
      tmdArr,
      tmjArr,
      oneArr,
      twoArr,
      thrArr,
      lhhArr,
    };
  }, []);

  const handleChange = (it) => {
    if (it.paneKey !== actKey) {
      setActKey(it.paneKey);
      onClear();
      if (
        typeof clRef?.current?.onResetData === 'function' &&
        (it.paneKey === '3' || actKey === '3')
      ) {
        clRef.current.onResetData();
      }
    }
  };

  return (
    <Tabs
      titleClassName='p-b-50 ws-no w-230'
      titleItemClassName='p-30-20-10 h-110'
      type='tabs'
      activeId={actKey}
      direction='vertical'
      onChange={handleChange}
    >
      <TabPane className='o-none' paneKey='1' title={formatMsg('DING_TE')}>
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
          />
        )}
      </TabPane>
      <TabPane className='o-none' paneKey='2' title={formatMsg('DIGHT_PAN')}>
        <CountTimeBox onClear={onClear} />
        {actKey === '2' && (
          <NumberCode
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
      <TabPane className='o-y' paneKey='3' title={formatMsg('CL_BET')}>
        {actKey === '3' && <ChangLong ik={ik} gameWs={gameWs} ref={clRef} />}
      </TabPane>
    </Tabs>
  );
});

export default Content;
