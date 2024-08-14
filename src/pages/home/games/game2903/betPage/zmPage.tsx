/*
 * 正码1-6
 */

import {
  forwardRef,
  useCallback, useImperativeHandle, useRef, useState
} from 'react';
import { MutileItemEx } from '.';
import { ContentProps } from '../Content';
import styles from '../index.module.scss';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { NumberButton, NumberButtonGroup } from '@/pages/gameComponents/numberButton';
import { DWORD } from '@/engine/base/basetype';
import { getMultipleData } from '../rules';

const getBetMainType = (type: string) => {
  switch (type) {
    case '一': //
      return CMD_2903.emBetMainType.BTM_ZHENG_1;
    case '二': //
      return CMD_2903.emBetMainType.BTM_ZHENG_2;
    case '三':
      return CMD_2903.emBetMainType.BTM_ZHENG_3;
    case '四':
      return CMD_2903.emBetMainType.BTM_ZHENG_4;
    case '五':
      return CMD_2903.emBetMainType.BTM_ZHENG_5;
    case '六':
      return CMD_2903.emBetMainType.BTM_ZHENG_6;
    case '':
      return CMD_2903.emBetMainType.BTM_ZHENG;
    default:
      return CMD_2903.emBetMainType.BTM_HE;
  }
};

const initList = [
  {
    id: 0,
    title: '总单',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeHe.SBTH_DAN, multType: CMD_2903.emMultipleType.MT_HE_DAN, value: 255 }
  },
  {
    id: 1,
    title: '总双',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeHe.SBTH_SHUANG, multType: CMD_2903.emMultipleType.MT_HE_SHUANG, value: 255 }
  },
  {
    id: 2,
    title: '总大',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeHe.SBTH_DA, multType: CMD_2903.emMultipleType.MT_HE_DA, value: 255 }
  },
  {
    id: 3,
    title: '总小',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeHe.SBTH_XIAO, multType: CMD_2903.emMultipleType.MT_HE_XIAO, value: 255 }
  },];

const initListEx = [
  {
    id: 4,
    title: '单',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_DAN, multType: CMD_2903.emMultipleType.MT_ZN_DAN, value: 255 }
  },
  {
    id: 5,
    title: '大',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_DA, multType: CMD_2903.emMultipleType.MT_ZN_DA, value: 255 }
  },
  {
    id: 6,
    title: '合单',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_HE_DAN, multType: CMD_2903.emMultipleType.MT_ZN_HE_DAN, value: 255 }
  },
  {
    id: 7,
    title: '红波',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_HONG, multType: CMD_2903.emMultipleType.MT_ZN_HONG, value: 255 }
  },
  {
    id: 8,
    title: '绿波',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_LV, multType: CMD_2903.emMultipleType.MT_ZN_LV, value: 255 }
  },
  {
    id: 9,
    title: '双',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_SHUANG, multType: CMD_2903.emMultipleType.MT_ZN_SHUANG, value: 255 }
  },
  {
    id: 10,
    title: '小',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_XIAO, multType: CMD_2903.emMultipleType.MT_ZN_XIAO, value: 255 }
  },
  {
    id: 11,
    title: '合双',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_HE_SHUANG, multType: CMD_2903.emMultipleType.MT_ZN_HE_SHUANG, value: 255 }
  },
  {
    id: 12,
    title: '蓝波',
    active: false,
    data: { cbBetSubType: CMD_2903.emSubBetTypeZhengNum.SBTZN_LAN, multType: CMD_2903.emMultipleType.MT_ZN_LAN, value: 255 }
  },
];

export const ZmBottom = forwardRef((props: { mutile: Array<DWORD>, type, onChange?, curXiao, dynamicList }, ref) => {
  const {
    mutile, onChange, type, curXiao, dynamicList
  } = props;

  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>(!type || type === '' ? initList : initListEx);
  const numEx = useRef(!type || type === '' ? initList : initListEx);


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

  const onNumBtnHandleClick = useCallback((isActive, _title, _bottomTitle, data, index) => {
    if (isActive) {
      selectNumIndex.current.push(index);
      numEx.current[index].active = true;
      setNumlistEx([...numEx.current]);
    }
    onChange(isActive, _title, _bottomTitle, data);
    return true;
  }, [onChange]);


  return (
    <div className={`${styles['b-con']} d-f ai-c jd-start flex-w m-b-50`}>
      {numlistEx.map((item, i) => {
        const itemValue = getMultipleData(item['data'].value, item['data'].multType, false,
          getBetMainType(!type || type === '' ? 'he' : type), item['data'].cbBetSubType, mutile, dynamicList, curXiao);
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
            data={{ cbBetMainType: getBetMainType(!type || type === '' ? 'he' : type), cbBetSubType: item['data'].cbBetSubType, value: itemValue }}
          />
        );
      })}

    </div>
  );
});

export const ZmPage = forwardRef((props: Omit<ContentProps, 'ContentProps'> & { type }, ref) => {
  const {
    numlist, mutile, onChange, type = '一', dynamicList, curXiao
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
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        {`正码${type}`}
      </div>
      <NumberButtonGroup
        numberList={numlist}
        dynamicList={dynamicList}
        multType={!type || type === '' ? CMD_2903.emMultipleType.MT_ZHENG_NUM : CMD_2903.emMultipleType.MT_ZN_NUM}
        cbBetMainType={getBetMainType(type)}
        cbBetSubType={!type || type === '' ? CMD_2903.emSubBetTypeZheng.SBTZ_NUM : CMD_2903.emSubBetTypeZhengNum.SBTZN_NUM}
        mutile={mutile}
        ref={nbGroupRef}
        onChange={onChange}
        curXiao={curXiao}
      />
      <ZmBottom mutile={mutile} type={type} onChange={onChange} curXiao={curXiao} dynamicList={dynamicList} ref={handle_0} />
    </div>
  );
});
