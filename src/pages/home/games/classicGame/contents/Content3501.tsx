import { memo, useMemo, useState } from 'react';
import { TabPane, Tabs } from '@/components';
// import { ChangLong } from '@/pages/gameComponents';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import { betNumberList } from '../constFiles/const3501';
import { RenXuan, SpecialColorCode } from '../contentTabs';

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
}

const commonCN = 'm-t-30 m-l-30 m-r-30 p-b-220 o-y h-full';

export const Content = memo((props: ContentProps) => {
  // gameWs,
  const {
 curPeriodNumber, curGameId, getItememMultip, handleBetClick, ik, onClear, clRef, getStandNum 
} = props;
  const [actKey, setActKey] = useState('1');
  const groupListMap = useMemo(() => {
    const sumArr = betNumberList[0].list; // 总和
    const partArr = betNumberList[1].list; // 分布
    const conArr = betNumberList[2].list; // 连码
    return {
      sumArr,
      partArr,
      conArr,
    };
  }, []);

  const handleChange = (it) => {
    if (it.paneKey !== actKey) {
      setActKey(it.paneKey);
      onClear();
      if (typeof clRef?.current?.onResetData === 'function' && (it.paneKey === '3' || actKey === '3')) {
        clRef.current.onResetData();
      }
    }
  };

  return (
    <Tabs titleClassName='p-b-50 ws-no w-230' titleItemClassName='p-30-20-10 h-110' type='tabs' activeId={actKey} direction='vertical' onChange={handleChange}>
      <TabPane className='o-none' paneKey='1' title='整面盘'>
        <CountTimeBox />
        {actKey === '1' && (
          <SpecialColorCode
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
      <TabPane className='o-none' paneKey='2' title='任选'>
        <CountTimeBox />
        {actKey === '2' && (
          <RenXuan
            ik={ik}
            key={0 || `${curPeriodNumber}-${ik}`}
            getStandNum={getStandNum}
            curPeriodNumber={curPeriodNumber}
            title='连码'
            getItememMultip={getItememMultip}
            handleBetClick={handleBetClick}
            curGameId={curGameId}
            onClear={onClear}
          />
        )}
      </TabPane>
      {/* <TabPane className='o-y' paneKey='3' title='长龙投注'>
        {actKey === '3' && <ChangLong gameWs={gameWs} ref={clRef} ik={ik} />}
      </TabPane> */}
    </Tabs>
  );
});

export default Content;
