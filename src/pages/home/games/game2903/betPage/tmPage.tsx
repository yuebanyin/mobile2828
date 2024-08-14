/*
 * 特码--页面
 */
import {
 forwardRef, useCallback, useImperativeHandle, useRef, useState 
} from 'react';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import styles from '../index.module.scss';
import { NumberButton, NumberButtonGroup } from '@/pages/gameComponents/numberButton';
import { MutileItemEx } from '.';
import { ContentProps } from '../Content';
import { DWORD } from '@/engine/base/basetype';
import { getMultipleData } from '../rules';

const initList = [
  {
    id: 0,
    title: '单',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_DAN, multType: CMD_2903.emMultipleType.MT_TE_DAN, value: 255 },
  },
  {
    id: 1,
    title: '大',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_DA, multType: CMD_2903.emMultipleType.MT_TE_DA, value: 255 },
  },
  {
    id: 2,
    title: '合单',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_HE_DAN, multType: CMD_2903.emMultipleType.MT_TE_HE_DAN, value: 255 },
  },
  {
    id: 3,
    title: '尾大',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_WEI_DA, multType: CMD_2903.emMultipleType.MT_TE_WEI_DA, value: 255 },
  },
  {
    id: 4,
    title: '红波',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_HONG, multType: CMD_2903.emMultipleType.MT_TE_HONG, value: 255 },
  },
  {
    id: 5,
    title: '双',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_SHUANG, multType: CMD_2903.emMultipleType.MT_TE_SHUANG, value: 255 },
  },
  {
    id: 6,
    title: '小',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_XIAO, multType: CMD_2903.emMultipleType.MT_TE_XIAO, value: 255 },
  },
  {
    id: 7,
    active: false,
    title: '合双',
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_HE_SHUANG, multType: CMD_2903.emMultipleType.MT_TE_HE_SHUANG, value: 255 },
  },
  {
    id: 8,
    title: '尾小',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_WEI_XIAO, multType: CMD_2903.emMultipleType.MT_TE_WEI_XIAO, value: 255 },
  },
  {
    id: 9,
    title: '蓝波',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_LAN, multType: CMD_2903.emMultipleType.MT_TE_LAN, value: 255 },
  },
  {
    id: 10,
    title: '绿波',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeTeMa.SBTT_LV, multType: CMD_2903.emMultipleType.MT_TE_LV, value: 255 },
  },
];

// 特码-其他按钮页面
const TeMaBottom = forwardRef((props: { mutile: Array<DWORD>; onChange?; dynamicList: Array<any>; curXiao: number }, ref) => {
  const {
 mutile, onChange, dynamicList, curXiao 
} = props;

  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>(initList);
  const numEx = useRef(initList);

  const onResetData = () => {
    for (let i = 0; i < selectNumIndex.current.length; i += 1) {
      numEx.current[selectNumIndex.current[i]].active = false;
    }

    setNumlistEx([...numEx.current]);
    selectNumIndex.current = [];
  };

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  const onNumBtnHandleClick = useCallback(
    (isActive, _title, _bottomTitle, data, index) => {
      if (isActive) {
        selectNumIndex.current.push(index);
        numEx.current[index].active = true;
        setNumlistEx([...numEx.current]);
      }
      onChange(isActive, _title, _bottomTitle, data);
      return true;
    },
    [onChange]
  );

  return (
    <div className={`${styles['b-con']} d-f ai-c jd-start flex-w m-b-50`}>
      {numlistEx.map((item, i) => {
        const itemValue = getMultipleData(item['value'], item['data'].multType, false, CMD_2903.emBetMainType.BTM_TE, item['data'].cbBetSubType, mutile, dynamicList, curXiao);
        return (
          <NumberButton
            index={i}
            key={i || item}
            size='small'
            isActive={item.active}
            className='m-l-20 m-t-30'
            topType='none'
            title={item.title}
            bottomTitle={<MutileItemEx dwNormalMultiple={itemValue.dwNormalMultiple} dwSpecialMultiple={itemValue.dwSpecialMultiple} />}
            onChange={onNumBtnHandleClick}
            data={{ cbBetMainType: CMD_2903.emBetMainType.BTM_TE, cbBetSubType: item['data'].cbBetSubType, value: itemValue }}
          />
        );
      })}
    </div>
  );
});

export const TmPage = forwardRef((props: ContentProps, ref) => {
  const {
 numlist, mutile, onChange, dynamicList, curXiao 
} = props;

  const nbGroupRef = useRef<any>();
  const handle_0 = useRef<any>();

  const onResetData = () => {
    nbGroupRef.current?.onResetData();
    handle_0.current?.onResetData();
  };

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>特码</div>

      <NumberButtonGroup
        numberList={numlist}
        dynamicList={dynamicList}
        multType={CMD_2903.emMultipleType.MT_TE_NUM}
        cbBetMainType={CMD_2903.emBetMainType.BTM_TE}
        cbBetSubType={CMD_2903.emSubBetTypeTeMa.SBTT_NUM}
        mutile={mutile}
        ref={nbGroupRef}
        onChange={onChange}
      />

      <TeMaBottom mutile={mutile} onChange={onChange} curXiao={curXiao} dynamicList={dynamicList} ref={handle_0} />
    </div>
  );
});
