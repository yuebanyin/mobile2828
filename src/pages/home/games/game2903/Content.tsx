import {
  forwardRef,
  useCallback, useImperativeHandle, useState
} from 'react';
import { TabPane, Tabs } from '@/components';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { TmPage } from './betPage/tmPage';
import { BbPage } from './betPage/bbPage';
import { SxList } from './betPage';
import { ZtwPage } from './betPage/ztwPage';
import { WslPage } from './betPage/wslPage';
import { LmPage } from './betPage/lmPage';
import { DWORD } from '@/engine/base/basetype';
import { QbzPage } from './betPage/qbzPage';
import { useRefs } from '@/hooks/useRefs';
import { CountTimeBox } from '@/pages/gameComponents/gameEntertained';
import { HxPage } from './betPage/hxPage';
import { SxlPage } from './betPage/sxlPage';
import { ZmPage } from './betPage/zmPage';

export interface ContentProps {
  numlist?: Array<any>;
  mutile: Array<DWORD>;
  onChange?: Function;
  dynamicList: Array<any>;
  onTabs?: Function;
  curXiao?: number;
}

export const Content = forwardRef((props: ContentProps, ref) => {
  const {
    numlist, mutile, onChange, onTabs, curXiao, dynamicList
  } = props;
  const [activeId, setActiveId] = useState('1');


  const [refs, setRefs] = useRefs();

  const handleClick = useCallback(
    (e) => {
      onTabs(e);
      console.log({ e });
      setActiveId(e.paneKey);
    },
    [onTabs]
  );

  function onResetData() {
    for (let index = 0; index < 17; index += 1) {
      refs[index]?.onResetData();
    }
  }

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  return (
    <Tabs titleClassName='p-b-80 b-t-1 b-b-1 bc-split  ws-no w-230' titleItemClassName='p-30-20-10 h-110' animatedTime={100} activeId={activeId} type='tabs' direction='vertical' onClick={handleClick}>
      <TabPane className='o-none' paneKey='1' title='特码'>
        <CountTimeBox />
        <TmPage numlist={numlist} dynamicList={dynamicList} mutile={mutile} onChange={onChange} ref={setRefs(0)} />
      </TabPane>
      <TabPane className='o-none' paneKey='2' title='正码一'>
        <CountTimeBox />
        <ZmPage type='一' mutile={mutile} dynamicList={dynamicList} numlist={numlist} onChange={onChange} ref={setRefs(1)} />
      </TabPane>
      <TabPane className='o-none' paneKey='3' title='正码二'>
        <CountTimeBox />
        <ZmPage type='二' mutile={mutile} dynamicList={dynamicList} numlist={numlist} onChange={onChange} ref={setRefs(2)} />
      </TabPane>
      <TabPane className='o-none' paneKey='4' title='正码三'>
        <CountTimeBox />
        <ZmPage type='三' mutile={mutile} dynamicList={dynamicList} numlist={numlist} onChange={onChange} ref={setRefs(3)} />
      </TabPane>
      <TabPane className='o-none' paneKey='5' title='正码四'>
        <CountTimeBox />
        <ZmPage type='四' mutile={mutile} dynamicList={dynamicList} numlist={numlist} onChange={onChange} ref={setRefs(4)} />
      </TabPane>
      <TabPane className='o-none' paneKey='6' title='正码五'>
        <CountTimeBox />
        <ZmPage type='五' mutile={mutile} dynamicList={dynamicList} numlist={numlist} onChange={onChange} ref={setRefs(5)} />
      </TabPane>
      <TabPane className='o-none' paneKey='7' title='正码六'>
        <CountTimeBox />
        <ZmPage type='六' mutile={mutile} dynamicList={dynamicList} numlist={numlist} onChange={onChange} ref={setRefs(6)} />
      </TabPane>
      <TabPane className='o-none' paneKey='8' title='正码'>
        <CountTimeBox />
        <ZmPage type='' mutile={mutile} numlist={numlist} dynamicList={dynamicList} onChange={onChange} ref={setRefs(7)} />
      </TabPane>
      <TabPane className='o-none' paneKey='9' title='半波'>
        <CountTimeBox />
        <BbPage mutile={mutile} dynamicList={dynamicList} curXiao={curXiao} onChange={onChange} ref={setRefs(8)} />
      </TabPane>
      <TabPane className='o-none' paneKey='10' title='特肖'>
        <CountTimeBox />
        <SxList title='特肖' mutile={mutile} onChange={onChange} dynamicList={dynamicList} cbBetMainType={CMD_2903.emBetMainType.BTM_TE_XIAO} curXiao={curXiao} ref={setRefs(9)} />
      </TabPane>
      <TabPane className='o-none' paneKey='11' title='一肖'>
        <CountTimeBox />
        <SxList title='一肖' mutile={mutile} onChange={onChange} dynamicList={dynamicList} cbBetMainType={CMD_2903.emBetMainType.BTM_YI_XIAO} curXiao={curXiao} ref={setRefs(10)} />
      </TabPane>
      <TabPane className='o-none' paneKey='12' title='正特尾'>
        <CountTimeBox />
        <ZtwPage mutile={mutile} onChange={onChange} dynamicList={dynamicList} ref={setRefs(11)} />
      </TabPane>
      <TabPane className='o-none' paneKey='13' title='连码'>
        <CountTimeBox />
        <LmPage numlist={numlist} mutile={mutile} dynamicList={dynamicList} onChange={onChange} ref={setRefs(12)} />
      </TabPane>
      <TabPane className='o-none' paneKey='14' title='合肖'>
        <CountTimeBox />
        <HxPage title='合肖' mutile={mutile} onChange={onChange} dynamicList={dynamicList} cbBetMainType={CMD_2903.emBetMainType.BTM_HE_XIAO} curXiao={curXiao} ref={setRefs(13)} />
      </TabPane>
      <TabPane className='o-none' paneKey='15' title='生肖连'>
        <CountTimeBox />
        <SxlPage title='生肖连' mutile={mutile} onChange={onChange} dynamicList={dynamicList} cbBetMainType={CMD_2903.emBetMainType.BTM_SHENG_XIAO_LIAN} curXiao={curXiao} ref={setRefs(14)} />
      </TabPane>
      <TabPane className='o-none' paneKey='16' title='尾数连'>
        <CountTimeBox />
        <WslPage title='尾数连' mutile={mutile} onChange={onChange} ref={setRefs(15)} />
      </TabPane>
      <TabPane className='o-none flex-1 d-f fd-c' paneKey='17' title='全不中'>
        <CountTimeBox />
        <QbzPage numlist={numlist} mutile={mutile} dynamicList={dynamicList} onChange={onChange} ref={setRefs(16)} />
      </TabPane>
    </Tabs>
  );
});
