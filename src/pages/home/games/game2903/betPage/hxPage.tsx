/**
 * 合肖-页面
 */
import {
  forwardRef, useCallback, useImperativeHandle, useRef, useState
} from 'react';
import { Toast } from '@nutui/nutui-react';
import styles from '../index.module.scss';
import { RadioButton } from '@/pages/gameComponents/radioButton';
import { SxList } from '.';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { DWORD } from '@/engine/base/basetype';
import { getMultipleData } from '../rules';

const radioButtonList = [
  {
    id: 0,
    title: '中',
  },
  {
    id: 1,
    title: '不中',
  },
];


const radioButtonListEx = [
  {
    id: 0,
    title: '野兽',
  },
  {
    id: 1,
    title: '家禽',
  },
  {
    id: 2,
    title: '左',
  },
  {
    id: 3,
    title: '右',
  },
  {
    id: 4,
    title: '前肖',
  },
  {
    id: 5,
    title: '后肖',
  },
  {
    id: 6,
    title: '天肖',
  },
  {
    id: 7,
    title: '地肖',
  },
];


const heXiaoAreaIndex = [
  [0, 2, 3, 4, 5, 8],
  [1, 6, 7, 9, 10, 11],
  [0, 2, 4, 6, 8, 10],
  [1, 3, 5, 7, 9, 11],
  [0, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [1, 3, 4, 6, 8, 11],
  [0, 2, 5, 7, 9, 10]
];

let currentRadioId = 0;
let currentRadioIdEx = 0;


export const HxPage = forwardRef((props: { title?, mutile: Array<DWORD>, onChange?, dynamicList: Array<any>, cbBetMainType, curXiao }, ref) => {
  const {
    title, mutile, onChange, cbBetMainType, curXiao, dynamicList
  } = props;

  const [curMulType, setCurMulType] = useState(CMD_2903.emMultipleType.MT_INVALID);
  const hxRef = useRef<any>();
  const rRef = useRef<any>();
  const rRef_1 = useRef<any>();
  const selectNumArrayRef = useRef([]);
  const [selectNumArr, setSelectNumArr] = useState([]);
  //getMultype
  const getTypeData = () => {
    if (currentRadioId === 0) { ///中
      if (selectNumArrayRef.current.length === 1) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_1, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_1 }; //一肖中
      }
      if (selectNumArrayRef.current.length === 2) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_2, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_2 };
      }
      if (selectNumArrayRef.current.length === 3) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_3, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_3 };
      }
      if (selectNumArrayRef.current.length === 4) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_4, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_4 };
      }
      if (selectNumArrayRef.current.length === 5) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_5, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_5 };
      }
      if (selectNumArrayRef.current.length === 6) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_6, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_6 };
      }
      if (selectNumArrayRef.current.length === 7) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_7, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_7 };
      }
      if (selectNumArrayRef.current.length === 8) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_8, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_8 };
      }
      if (selectNumArrayRef.current.length === 9) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_9, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_9 };
      }
      if (selectNumArrayRef.current.length === 10) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_ZHONG_10, multType: CMD_2903.emMultipleType.MT_HE_ZHONG_10 };
      }
      return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_COUNT, multType: CMD_2903.emMultipleType.MT_INVALID };
    } if (currentRadioId === 1) { ///不中
      if (selectNumArrayRef.current.length === 2) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_2, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_2 };
      }
      if (selectNumArrayRef.current.length === 3) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_3, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_3 };
      }
      if (selectNumArrayRef.current.length === 4) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_4, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_4 };
      }
      if (selectNumArrayRef.current.length === 5) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_5, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_5 };
      }
      if (selectNumArrayRef.current.length === 6) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_6, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_6 };
      }
      if (selectNumArrayRef.current.length === 7) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_7, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_7 };
      }
      if (selectNumArrayRef.current.length === 8) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_8, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_8 };
      }
      if (selectNumArrayRef.current.length === 9) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_9, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_9 };
      }
      if (selectNumArrayRef.current.length === 10) {
        return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_BU_ZHONG_10, multType: CMD_2903.emMultipleType.MT_HE_BU_ZHONG_10 };
      }
      return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_COUNT, multType: CMD_2903.emMultipleType.MT_INVALID };
    }
    return { cbBetMainType: CMD_2903.emBetMainType.BTM_HE_XIAO, cbBetSubType: CMD_2903.emSubBetTypeHeXiao.SBTHX_COUNT, multType: CMD_2903.emMultipleType.MT_INVALID };
  };

  const onNumBtnHandleClick = useCallback((isActive, _title, _bottomTitle, data) => {
    console.log('🚀 ~ file: hxPage.tsx:212 ~ onNumBtnHandleClick ~ curMulType:', data);
    if (isActive) {
      if (selectNumArrayRef.current.length >= 10) {
        Toast.text('当前玩法最多选择10项！');
        return false;
      }
      selectNumArrayRef.current.push(data['value']['value']);
    } else {
      selectNumArrayRef.current = selectNumArrayRef.current.filter((itemNum) => itemNum !== data['value']['value']);
    }
    setCurMulType(getTypeData().multType);

    const tempVal = getMultipleData(selectNumArrayRef.current, getTypeData().multType, false,
      getTypeData().cbBetMainType, getTypeData().cbBetSubType, mutile, dynamicList, curXiao).dwNormalMultiple;
    onChange(false, '合肖', { array: selectNumArrayRef.current, mutile: tempVal }, getTypeData());
    return true;
  }, [onChange, dynamicList, curXiao, mutile]);

  const onRadioButtonclick = (_, item) => {
    currentRadioId = item['id'];
    setCurMulType(getTypeData().multType);

    const tempVal = getMultipleData(selectNumArrayRef.current, getTypeData().multType, false,
      getTypeData().cbBetMainType, getTypeData().cbBetSubType, mutile, dynamicList, curXiao).dwNormalMultiple;

    onChange(false, '合肖', { array: selectNumArrayRef.current, mutile: tempVal }, getTypeData());
  };


  const onRadioButtonclickEx = (_, item) => {
    console.log('🚀 ~ file: hxPage.tsx:188 ~ onRadioButtonclickEx ~ item:', item, selectNumArr);
    currentRadioIdEx = item['id'];
    selectNumArrayRef.current = heXiaoAreaIndex[currentRadioIdEx];
    setSelectNumArr(heXiaoAreaIndex[currentRadioIdEx]);
    setCurMulType(getTypeData().multType);
    const tempVal = getMultipleData(selectNumArrayRef.current, getTypeData().multType, false,
      getTypeData().cbBetMainType, getTypeData().cbBetSubType, mutile, dynamicList, curXiao).dwNormalMultiple;

    onChange(false, '合肖', { array: selectNumArrayRef.current, mutile: tempVal }, getTypeData());
  };


  function onResetData() {
    hxRef.current?.onResetData();
    rRef.current?.onResetData(-1);
    rRef_1.current?.onResetData(0);
    selectNumArrayRef.current = [];
    setSelectNumArr([]);
  }

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));

  const getData = useCallback(() => {
    const tempVal = getMultipleData(0, curMulType, false,
      getTypeData().cbBetMainType, getTypeData().cbBetSubType, mutile, dynamicList, curXiao).dwNormalMultiple;
    return tempVal;
  }, [curXiao, dynamicList, mutile, curMulType]);


  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        {title}
      </div>
      <div className='m-t-30 d-f jc-sb ai-c'>
        <RadioButton className='m-0-20' size='middle' data={radioButtonList} ref={rRef_1} currentId={0} onChange={onRadioButtonclick} />
        <div className='d-f jc-sb ai-c m-r-90'>
          <span className='w-100 ws-no'>赔率</span>
          <span className='color-red'>{curMulType !== CMD_2903.emMultipleType.MT_INVALID ? getData() / (common.GOLD_RATIO * 1.0) : 0}</span>
        </div>
      </div>
      <div className='m-t-30 w-full'>
        <RadioButton className='m-0-20' size='small' data={radioButtonListEx} ref={rRef} currentId={-1} onChange={onRadioButtonclickEx} />
      </div>
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        <SxList mutile={mutile} onChange={onNumBtnHandleClick} dynamicList={dynamicList} cbBetMainType={cbBetMainType} curXiao={curXiao} ref={hxRef} hxAreaIndex={selectNumArr} />
      </div>
      <div className='m-b-50' />
    </div>
  );
});
