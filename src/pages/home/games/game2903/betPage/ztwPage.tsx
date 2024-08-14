/**
 * 正特尾-页面
 */
import {
  forwardRef, useImperativeHandle, useRef
} from 'react';
import { ContentProps } from '../Content';
import { NumberButtonGroup } from '@/pages/gameComponents/numberButton';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';


const numlist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const ZtwPage = forwardRef((props: ContentProps, ref) => {
  const {
    mutile, onChange, dynamicList, curXiao
  } = props;

  const nbGroupRef = useRef<any>();

  const onResetData = () => {
    nbGroupRef.current?.onResetData();
  };

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  const getMultype = (num) => (num === 0 ? CMD_2903.emMultipleType.MT_ZTW_0 : CMD_2903.emMultipleType.MT_ZTW_9);


  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        正特尾
      </div>
      <NumberButtonGroup
        numberList={numlist}
        dynamicList={dynamicList}
        multType={getMultype}
        cbBetMainType={CMD_2903.emBetMainType.BTM_ZHENG_TE_WEI}
        cbBetSubType={CMD_2903.emSubBetTypeZTW.SBTZTW_NUM}
        mutile={mutile}
        ref={nbGroupRef}
        onChange={onChange}
        curXiao={curXiao}
      />
    </div>
  );
});
