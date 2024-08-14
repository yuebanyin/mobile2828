import {
 forwardRef, useImperativeHandle, useRef, useState 
} from 'react';
import { TabPane, Tabs } from '@/components';
import { ZhPage } from './betPage/ZhPage';
import { SzpPage } from './betPage/SzpPage';
import { LmpPage } from './betPage/LmpPage';
import { BallPage } from './betPage/BallPage';
import { ChangLongPage } from '@/pages/gameComponents/changlong/changlongPage';
import { ContentProps, ballButton } from './rules';
import { useRefs } from '@/hooks';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';

/**
 * 斯洛伐克幸运5
 */
export const Content = forwardRef((props: ContentProps, ref) => {
  const {
 gameMultiple = [], dyMultiple = [], onChange, onChangLongChange, gameWs 
} = props;
  const [activeId, setActiveId] = useState('1');
  const clRef = useRef<any>();
  const [refs, setRefs] = useRefs();

  function onReset(isTabs = true) {
    for (let index = 0; index < 9; index += 1) {
      refs[index]?.onReset();
    }
    clRef.current?.onResetData(isTabs);
  }

  const onChangeTabs = (r: any) => {
    setActiveId(r.paneKey);
    onChange([]);
    onReset(true);
    // if (r['paneKey'] === '9') {
    //   gameWs?.loginLongDragon();
    //   gameWs?.queryLongDragonBetInfo();
    // } else {
    //   gameWs?.logoutLongDragon();
    // }
  };

  function sendJetton(score) {
    console.log('🚀 ~ file: Content.tsx:68 ~ sendJetton ~ sendJetton:', score);
    if (activeId === '9') {
      return clRef.current?.sendJetton();
    }
    return false;
  }

  useImperativeHandle<any, any>(ref, () => ({
    onReset,
    sendJetton,
  }));

  return (
    <Tabs onChange={onChangeTabs} titleClassName='p-b-50 w-220' titleItemClassName='p-30-20-10 h-110' activeId={activeId} animatedTime={100} type='tabs' direction='vertical'>
      <TabPane className='o-none' paneKey='1' title='整合'>
        <CountTimeBox />
        <ZhPage ref={setRefs(0)} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='2' title='数字盘'>
        <CountTimeBox />
        <SzpPage ref={setRefs(1)} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='3' title='两面盘'>
        <CountTimeBox />
        <LmpPage ref={setRefs(2)} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='4' title='第一球'>
        <CountTimeBox />
        <BallPage ref={setRefs(3)} ball={ballButton[0]} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='5' title='第二球'>
        <CountTimeBox />
        <BallPage ref={setRefs(4)} ball={ballButton[1]} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='6' title='第三球'>
        <CountTimeBox />
        <BallPage ref={setRefs(5)} ball={ballButton[2]} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='7' title='第四球'>
        <CountTimeBox />
        <BallPage ref={setRefs(6)} ball={ballButton[3]} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-none' paneKey='8' title='第五球'>
        <CountTimeBox />
        <BallPage ref={setRefs(7)} ball={ballButton[4]} gameMultiple={gameMultiple} dyMultiple={dyMultiple} onChange={onChange} />
      </TabPane>
      <TabPane className='o-y' paneKey='9' title='长龙投注'>
        <ChangLongPage gameWs={gameWs} onChange={onChangLongChange} ref={clRef} />
      </TabPane>
    </Tabs>
  );
});
