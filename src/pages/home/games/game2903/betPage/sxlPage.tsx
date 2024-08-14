/**
 * 生肖连-页面
 */
import {
 forwardRef, useImperativeHandle, useRef, useState 
} from 'react';
import { Toast } from '@nutui/nutui-react';
import styles from '../index.module.scss';
import { RadioButton } from '@/pages/gameComponents/radioButton';
import { SxList } from '.';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { DWORD } from '@/engine/base/basetype';

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
    title: '二肖连',
  },
  {
    id: 1,
    title: '三肖连',
  },
  {
    id: 2,
    title: '四肖连',
  },
  {
    id: 3,
    title: '五肖连',
  },
];


// let currentRadioId = 0;
// const currentRadioIdEx = 0;


export const SxlPage = forwardRef((props: { title?, mutile: Array<DWORD>, onChange?, cbBetMainType, curXiao, dynamicList: Array<any> }, ref) => {
  const {
    title, mutile, onChange, cbBetMainType, curXiao, dynamicList
  } = props;

  const [currentRadioId, setCurrentRadioId] = useState<number>(0);
  const [currentRadioIdEx, setCurrentRadioIdEx] = useState<number>(0);
  const selectObjRef = useRef({});
  const selectNumArrayRef = useRef([]);

  const slRef = useRef<any>();

  const getSubBetType = (currentRadioId: number, currentRadioIdEx: number, array: number[]) => {
    let isCurXiao = false;

    for (let index = 0; index < array.length; index += 1) {
      if (array[index] === curXiao) {
        isCurXiao = true;
        break;
      }
    }

    if (currentRadioId === 0) { ///中
      if (currentRadioIdEx === 0) { //二连肖
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_2;
      } if (currentRadioIdEx === 1) { //三连肖
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_3;
      } if (currentRadioIdEx === 2) {
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_4;
      } if (currentRadioIdEx === 3) {
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_ZHONG_5;
      }
    } else if (currentRadioId === 1) { //buzhong
      if (currentRadioIdEx === 0) { //二连肖
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_2;
      } if (currentRadioIdEx === 1) { //三连肖
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_3;
      } if (currentRadioIdEx === 2) {
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_4;
      } if (currentRadioIdEx === 3) {
        if (isCurXiao) {
          return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5_BEN;
        }
        return CMD_2903.emSubBetTypeSXL.SBTSXL_BU_ZHONG_5;
      }
    }
    return CMD_2903.emSubBetTypeSXL.SBTSXL_COUNT;
  };

  const onNumBtnHandleClick = (isActive, _title, _bottomTitle, data) => {
    if (isActive) {
      if (selectNumArrayRef.current.length >= 7) {
        Toast.text('当前玩法最多选择7项！');
        return false;
      }
      selectNumArrayRef.current.push(data['value']['value']);
    } else {
      selectNumArrayRef.current = selectNumArrayRef.current.filter((itemNum) => itemNum !== data['value']['value']);
    }
    console.log('🚀 ~ file: sxlPage.tsx:212 ~ onNumBtnHandleClick ~ curMulType:', selectNumArrayRef.current);
    selectObjRef.current = {
      cbBetMainType: data['cbBetMainType'], cbBetSubType: getSubBetType(currentRadioId, currentRadioIdEx, selectNumArrayRef.current), array: selectNumArrayRef.current, currentRadioId, currentRadioIdEx
    };
    onChange(false, '生肖连', {}, selectObjRef.current);
    return true;
  };


  const onRadioButtonclick = (_, item) => {
    setCurrentRadioId(item['id']);
    ///切换之后需要更新子类型，赔率类型
    selectObjRef.current['currentRadioId'] = item['id'];
    onChange(false, '生肖连', {}, selectObjRef.current);
  };

  const onRadioButtonclickEx = (_, item) => {
    setCurrentRadioIdEx(item['id']);
    selectObjRef.current['currentRadioIdEx'] = item['id'];
    onChange(false, '生肖连', {}, selectObjRef.current);
    console.log('🚀 ~ file: sxlPage.tsx:108 ~ onRadioButtonclickEx ~ currentRadioIdEx:', currentRadioIdEx);
  };

  function onResetData() {
    selectNumArrayRef.current = [];
    slRef.current?.onResetData();
  }

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));


  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        {title}
      </div>
      <div className='m-t-30 flex-1 w-full'>
        <RadioButton className='m-0-20' size='slarge' data={radioButtonList} currentId={0} onChange={onRadioButtonclick} />
      </div>
      <div className='m-t-30 flex-1 w-full'>
        <RadioButton className='m-0-20' size='small' data={radioButtonListEx} currentId={0} onChange={onRadioButtonclickEx} />
      </div>
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        <SxList
          mutile={mutile}
          onChange={onNumBtnHandleClick}
          dynamicList={dynamicList}
          cbBetMainType={cbBetMainType} 
          curXiao={curXiao}
          currentRadioId={currentRadioId}
          currentRadioIdEx={currentRadioIdEx}
          ref={slRef}
        />
      </div>
      <div className='m-b-50' />
    </div>
  );
});
