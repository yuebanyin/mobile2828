// import { useState } from 'react';
import { Tabs, TabPane } from '@/components';
// import { MajiangBall } from '../gameComponents';
import styles from './index.module.scss';

// const Two = () => {
//   const [ids, setIds] = useState([]);
//   return [...new Array(50)].map((it, i) => (
//     <div
//       onClick={() => setIds((pre) => {
//           if (pre.includes(i)) {
//             return [...pre.filter((it) => it !== i)];
//           }
//           return [...pre, i];
//         })}
//       style={{
//         width: '50px',
//         height: '50px',
//         margin: '10px',
//       }}
//       className={ids.includes(i) ? 'bg-gdt-foc' : 'bg-main'}
//     >
//       {i}
//     </div>
//   ));
// };

const One = () => (
  <div className='d-f flex-w ai-c'>
    {[...new Array(10)].map((i) => (
      <div key={i}>{i}</div>
    ))}
  </div>
);

function TabsDemo() {
  return (
    <div>
      {/* <Tabs
        activeId='1'
        type='tabs'
        onChange={(e) => {
          console.log({ e }, e.title);
        }}
        onClick={(e) => {
          console.log({ e }, e.title);
        }}
        // isCapsule
        className='br-30'
      >
        <TabPane title={<MajiangBall text='1' />} paneKey='1'>
          constent-11
        </TabPane>
        <TabPane title='title-22' paneKey='2'>
          constent-22
        </TabPane>
        <TabPane title='title-33' paneKey='3'>
          constent-33
        </TabPane>
      </Tabs>
      <Tabs
        activeId={1}
        searchList={[
          { text: 'title-11', id: 1 },
          { text: 'title-12', id: 2 },
        ]}
      /> */}
      <Tabs className={styles['tabs-demo']} animatedTime={100} activeId='1' type='tabs' direction='vertical'>
        <TabPane className='bg-body o-y' title='title-11' paneKey='1'>
          <One />
        </TabPane>
        <TabPane className='bg-body o-y' title='title-22' paneKey='2'>
          <One />
        </TabPane>
        <TabPane className='bg-body o-y' title='title-33' paneKey='3'>
          <One />
        </TabPane>
        <TabPane className='bg-body o-y' title='title-44' paneKey='4'>
          <One />
        </TabPane>
        <TabPane className='bg-body o-y' title='title-55' paneKey='5'>
          <One />
        </TabPane>
        <TabPane className='bg-body o-y' title='title-66' paneKey='6'>
          <One />
        </TabPane>
        <TabPane className='bg-body o-y' title='title-77' paneKey='7'>
          <One />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabsDemo;
