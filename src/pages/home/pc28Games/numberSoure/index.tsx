import { useCallback, useState, memo, ReactNode, useRef } from 'react';
import { Dialog, Icon, TabPane, Tabs } from '@/components';
import styles from './index.module.scss';
import SoureList from './soureList';
import SoureDesc from './soureDesc';
import SoureTool from './soureTool';
import { useLanguage } from '@/hooks';

interface NumberSoureModelProps {
  gameRecords: any[];
  sourceNode: ReactNode;
  onCancel?: Function;
}

export const NumberSoureModel = memo((props: NumberSoureModelProps) => {
  const { gameRecords, sourceNode } = props;
  const [srcData, setSrcData] = useState('');
  const [activeId, setActiveId] = useState('1');
  const { formatMsg } = useLanguage();

  const dialogRef = useRef(null);

  const onCheckSoureData = useCallback((srcdata) => {
    setSrcData(srcdata);
    setActiveId('3');
  }, []);

  const onCancel = useCallback(() => {
    if (typeof dialogRef?.current?.onClose === 'function') {
      dialogRef?.current?.onClose();
    }
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      sourceNode={sourceNode}
      isFooter={false}
      isTitle={false}
      bodyClassname={`${styles['numsrc-body']} w-full h-full`}
      contentCls='w-full h-full'
    >
      <div className='w-full h-full d-f fd-c o-none bg-body'>
        <div className='bg-gdt-top color-white h-150 d-f ai-c jc-sb p-0-50'>
          <Icon
            onClick={onCancel}
            className={styles['goback']}
            name='rect-left'
          />
          <div className='t-h1 ta-c'>{formatMsg('officialSource')}</div>
          <div className='w-70 h-150' />
        </div>
        <Tabs
          className='d-f fd-c'
          childreClassName='h-full'
          type='tabs'
          activeId={activeId}
        >
          <TabPane paneKey='1' title={formatMsg('showNumbers')}>
            <SoureList recordData={gameRecords} onCheck={onCheckSoureData} />
          </TabPane>
          <TabPane paneKey='2' title={formatMsg('numbersDesc')}>
            <SoureDesc />
          </TabPane>
          <TabPane paneKey='3' title={formatMsg('toolVerifi')}>
            <SoureTool srcdata={srcData} />
          </TabPane>
        </Tabs>
      </div>
    </Dialog>
  );
});
