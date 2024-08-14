import {
 forwardRef, useImperativeHandle, useRef, useState 
} from 'react';
import { TabPane, Tabs } from '@/components';
import { SzpPage } from './betPage/SzpPage';
import { LmpPage } from './betPage/LmpPage';
import { GyhPage } from './betPage/GyhPage';
import { GyzhPage } from './betPage/GyzhPage';
import { D1to5mPage } from './betPage/D1to5mPage';
import { D6to10mPage } from './betPage/D6to10mPage';
import { ChangLongPage } from '@/pages/gameComponents/changlong/changlongPage';
import { ContentProps } from './rules';
import { useRefs } from '@/hooks';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
// import styles from './index.module.scss';

export const Content = forwardRef((props: ContentProps, ref) => {
  const {
 gameMultiple = [], dyMultiple = [], onChange, onChangLongChange, gameWs 
} = props;
  const [activeId, setActiveId] = useState('1');
  const clRef = useRef<any>();
  const [refs, setRefs] = useRefs();

  function onReset(isTabs = true) {
    for (let index = 0; index < 7; index += 1) {
      refs[index]?.onReset();
    }
    clRef.current?.onResetData(isTabs);
  }

  const onChangeTabs = (r: any) => {
    setActiveId(r.paneKey);
    onChange([]);
    onReset(true);
  };

  function sendJetton(score) {
    console.log('🚀 ~ file: Content.tsx:68 ~ sendJetton ~ sendJetton:', score);
    if (activeId === '7') {
      return clRef.current?.sendJetton();
    }
    return false;
  }

  useImperativeHandle<any, any>(ref, () => ({
    onReset,
    sendJetton,
  }));

  return (
    <Tabs onChange={onChangeTabs} titleClassName='p-b-50 w-230' titleItemClassName='p-30-20-10 h-110' animatedTime={100} activeId={activeId} type='tabs' direction='vertical'>
      <TabPane className='o-none' paneKey='1' title='数字盘'>
        <CountTimeBox />
        <SzpPage
          ref={setRefs(0)}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChange} 
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
      </TabPane>
      <TabPane className='o-none' paneKey='2' title='两面盘'>
        <CountTimeBox />
        <LmpPage
          ref={setRefs(1)}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChange} 
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
      </TabPane>
      <TabPane className='o-none' paneKey='3' title='冠亚和'>
        <CountTimeBox />
        <GyhPage
          ref={setRefs(2)}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChange} 
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
      </TabPane>
      <TabPane className='o-none' paneKey='4' title='冠亚组合'>
        <CountTimeBox />
        <GyzhPage
          ref={setRefs(3)}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChange} 
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
      </TabPane>
      <TabPane className='o-none' paneKey='5' title='1~5名'>
        <CountTimeBox />
        <D1to5mPage
          ref={setRefs(4)}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChange} 
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
      </TabPane>
      <TabPane className='o-none' paneKey='6' title='6~10名'>
        <CountTimeBox />
        <D6to10mPage
          ref={setRefs(5)}
          gameMultiple={gameMultiple}
          dyMultiple={dyMultiple}
          onChange={onChange} 
          ik={0}
          curGameId={0}
          curPeriodNumber=''
          getItememMultip={undefined}
          handleBetClick={undefined}
          onClear={undefined}
        />
      </TabPane>
      <TabPane className='o-y' paneKey='7' title='长龙投注'>
        <ChangLongPage gameWs={gameWs} onChange={onChangLongChange} ref={clRef} />
      </TabPane>
    </Tabs>
  );
});
