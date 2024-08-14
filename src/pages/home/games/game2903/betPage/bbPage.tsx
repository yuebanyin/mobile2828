/**
 * 半波页面
 */

import {
  forwardRef,
  useCallback, useEffect, useImperativeHandle, useRef, useState
} from 'react';
import { MutileItemDescEx } from '.';
import styles from '../index.module.scss';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { DWORD } from '@/engine/base/basetype';
import { getMultipleData } from '../rules';
import { NumberButton } from '@/pages/gameComponents/numberButton';

const titleList = [
  {
    id: 0,
    title: '红单',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DAN, multType: CMD_2903.emMultipleType.MT_B_HONG_DAN, value: [1, 7, 13, 19, 23, 29, 35, 45] },
    active: false
  },

  {
    id: 1,
    title: '红双',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_HONG_SHUANG, multType: CMD_2903.emMultipleType.MT_B_HONG_SHUANG, value: [2, 8, 12, 18, 24, 30, 34, 40, 46] },
    active: false
  },

  {
    id: 2,
    title: '红大',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_HONG_DA, multType: CMD_2903.emMultipleType.MT_B_HONG_DA, value: [29, 30, 34, 35, 40, 45, 46] },
    active: false
  },

  {
    id: 3,
    title: '红小',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_HONG_XIAO, multType: CMD_2903.emMultipleType.MT_B_HONG_XIAO, value: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24] },
    active: false
  },

  {
    id: 4,
    title: '蓝单',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DAN, multType: CMD_2903.emMultipleType.MT_B_LAN_DAN, value: [3, 9, 15, 25, 31, 37, 41, 47] },
    active: false
  },

  {
    id: 5,
    title: '蓝双',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LAN_SHUANG, multType: CMD_2903.emMultipleType.MT_B_LAN_SHUANG, value: [4, 10, 14, 20, 26, 36, 42, 48] },
    active: false
  },

  {
    id: 6,
    title: '蓝大',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LAN_DA, multType: CMD_2903.emMultipleType.MT_B_LAN_DA, value: [25, 26, 31, 36, 37, 41, 42, 47, 48] },
    active: false
  },

  {
    id: 7,
    title: '蓝小',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LAN_XIAO, multType: CMD_2903.emMultipleType.MT_B_LAN_XIAO, value: [3, 4, 9, 10, 14, 15, 20] },
    active: false
  },

  {
    id: 8,
    title: '绿单',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LV_DAN, multType: CMD_2903.emMultipleType.MT_B_LV_DAN, value: [5, 11, 17, 21, 27, 33, 39, 43, 49] },
    active: false
  },
  {
    id: 9,
    title: '绿双',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LV_SHUANG, multType: CMD_2903.emMultipleType.MT_B_LV_SHUANG, value: [6, 16, 22, 28, 32, 38, 44] },
    active: false
  },
  {
    id: 10,
    title: '绿大',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LV_DA, multType: CMD_2903.emMultipleType.MT_B_LV_DA, value: [27, 28, 32, 33, 38, 39, 43, 44, 49] },
    active: false
  },

  {
    id: 11,
    title: '绿小',
    data: { cbBetSubType: CMD_2903.emSubBetTypeBanBo.SBTB_LV_XIAO, multType: CMD_2903.emMultipleType.MT_B_LV_XIAO, value: [5, 6, 11, 16, 17, 21, 22] },
    active: false
  },
];

export const BbPage = forwardRef((props: { mutile: Array<DWORD>, onChange?, dynamicList: Array<any>; curXiao: number }, ref) => {
  const {
    mutile, onChange, dynamicList, curXiao
  } = props;

  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>(titleList);
  const numEx = useRef(titleList);

  useEffect(() => {
    if (numEx.current.length === 0) {
      numEx.current = titleList;
      setNumlistEx([...numEx.current]);
    }
  }, []);


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
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        半波
      </div>
      {numlistEx.map((item) => {
        const itemValue = getMultipleData(item['value'], item['data'].multType, false,
          CMD_2903.emBetMainType.BTM_BAN_BO, item['data'].cbBetSubType, mutile, dynamicList, curXiao);
        return (
          <div key={item.id}>
            <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
              <NumberButton
                index={item.id}
                size='large'
                className='m-0-20 m-t-30'
                title={item['data'].value}
                isActive={item.active}
                bottomTitle={<MutileItemDescEx desc={item.title} dwNormalMultiple={itemValue.dwNormalMultiple} isShowMultType isShowSymbol />}
                onChange={onNumBtnHandleClick}
                data={{ cbBetMainType: CMD_2903.emBetMainType.BTM_BAN_BO, cbBetSubType: item['data'].cbBetSubType, value: itemValue }}
              />
            </div>
          </div>
        );
      })}
      <div className='m-b-50' />
    </div>
  );
});
