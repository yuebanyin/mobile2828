/**
 * 尾数连-页面
 */
import {
  forwardRef,
  useCallback, useEffect, useImperativeHandle, useRef, useState
} from 'react';
import { Toast } from '@nutui/nutui-react';
import styles from '../index.module.scss';
import { RadioButton } from '@/pages/gameComponents/radioButton';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { MutileItemDesc } from '.';
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
    title: '二尾连',
  },
  {
    id: 1,
    title: '三尾连',
  },
  {
    id: 2,
    title: '四尾连',
  },
];

const wslist = [
  {
    id: 1,
    name: '1',
    numlist: [1, 11, 21, 31, 41],
    active: false,
  },
  {
    id: 6,
    name: '6',
    numlist: [6, 16, 26, 36, 46],
    active: false,
  },
  {
    id: 2,
    name: '2',
    numlist: [2, 12, 22, 32, 42],
    active: false,
  },
  {
    id: 7,
    name: '7',
    numlist: [7, 17, 27, 37, 47],
    active: false,
  },
  {
    id: 3,
    name: '3',
    numlist: [3, 13, 23, 33, 43],
    active: false,
  },
  {
    id: 8,
    name: '8',
    numlist: [8, 18, 28, 38, 48],
    active: false,
  },
  {
    id: 4,
    name: '4',
    numlist: [4, 14, 24, 34, 44],
    active: false,
  },
  {
    id: 9,
    name: '9',
    numlist: [9, 19, 29, 39, 49],
    active: false,
  },
  {
    id: 5,
    name: '5',
    numlist: [5, 15, 25, 35, 45],
    active: false,
  },
  {
    id: 0,
    name: '0',
    numlist: [10, 20, 30, 40],
    active: false,
  },
];

// 尾数列表
export const WsList = forwardRef((props: { title?, mutile: Array<DWORD>, onChange?, currentRadioId, currentRadioIdEx }, ref) => {
  const {
    title, mutile, onChange, currentRadioId, currentRadioIdEx
  } = props;

  const getMultype = (id: any, currentRadioId?: number, currentRadioIdEx?: number) => {
    if (currentRadioId === 0) { ///中
      if (currentRadioIdEx === 0) { //二尾连
        if (id === 0) {
          return CMD_2903.emMultipleType.MT_WSL_ZHONG_2_0;
        }
        return CMD_2903.emMultipleType.MT_WSL_ZHONG_2;
      } if (currentRadioIdEx === 1) { //三尾连
        if (id === 0) {
          return CMD_2903.emMultipleType.MT_WSL_ZHONG_3_0;
        }
        return CMD_2903.emMultipleType.MT_WSL_ZHONG_3;
      } if (currentRadioIdEx === 2) {
        if (id === 0) {
          return CMD_2903.emMultipleType.MT_WSL_ZHONG_4_0;
        }
        return CMD_2903.emMultipleType.MT_WSL_ZHONG_4;
      }
    } else if (currentRadioId === 1) { //buzhong
      if (currentRadioIdEx === 0) { //二尾连
        if (id === 0) {
          return CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_2_0;
        }
        return CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_2;
      } if (currentRadioIdEx === 1) { //三尾连
        if (id === 0) {
          return CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_3_0;
        }
        return CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_3;
      } if (currentRadioIdEx === 2) {
        if (id === 0) {
          return CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_4_0;
        }
        return CMD_2903.emMultipleType.MT_WSL_BU_ZHONG_4;
      }
    }
    return CMD_2903.emMultipleType.MT_INVALID;
  };


  const selectNumArray = useRef([]);
  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>(wslist);
  const numEx = useRef(wslist);

  useEffect(() => {
    if (numEx.current.length === 0) {
      numEx.current = wslist;
      setNumlistEx([...numEx.current]);
    }
  }, []);

  const onNumBtnHandleClick = useCallback((isActive, _title, _bottomTitle, data, index) => {
    if (isActive) {
      selectNumArray.current.push(data['id']);
      selectNumIndex.current.push(index);
      numEx.current[index].active = true;
      setNumlistEx([...numEx.current]);
    } else {
      selectNumArray.current = selectNumArray.current.filter((itemNum) => itemNum !== data['id']);
    }
    onChange(isActive, _title, _bottomTitle, selectNumArray.current);
    return true;
  }, [onChange]);

  const onResetData = () => {
    for (let i = 0; i < selectNumIndex.current.length; i += 1) {
      numEx.current[selectNumIndex.current[i]].active = false;
    }

    setNumlistEx([...numEx.current]);
    selectNumArray.current = [];
    selectNumIndex.current = [];
  };

  useImperativeHandle<any, any>(ref, () => ({
    onResetData,
  }));


  return (
    <>
      {title ? (
        <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
          {title}
        </div>
      ) : ''}
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        {numlistEx.map((item, i) => (
          <NumberButton
            index={i}
            isActive={item.active}
            key={item.name || i}
            size='middle'
            className='m-l-20 m-t-30'
            title={item.numlist}
            bottomTitle={<MutileItemDesc desc={item.name} mutile={mutile} multType={getMultype(item.id, currentRadioId, currentRadioIdEx)} isShowMultType isShowSymbol />}
            onChange={onNumBtnHandleClick}
            data={{ cbBetMainType: CMD_2903.emBetMainType.BTM_WEI_SHU_LIAN, id: item.id }}
          />
        ))}
      </div>
    </>
  );
});

let selectNumArray = [];
export const WslPage = forwardRef((props: { title?, mutile: Array<DWORD>, onChange?}, ref) => {
  const {
    title, mutile, onChange
  } = props;

  const [currentRadioId, setCurrentRadioId] = useState<number>(0);
  const [currentRadioIdEx, setCurrentRadioIdEx] = useState<number>(0);
  const selectObj = useRef({});
  selectNumArray = [];

  const getSubBetType = (currentRadioId: number, currentRadioIdEx: number, array: number[]) => {
    let isZeroValue = false;

    for (let index = 0; index < array.length; index += 1) {
      if (array[index] === 0) {
        isZeroValue = true;
        break;
      }
    }

    if (currentRadioId === 0) { ///中
      if (currentRadioIdEx === 0) { //二尾连
        if (isZeroValue) {
          return CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2_0;
        }
        return CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_2;
      } if (currentRadioIdEx === 1) { //三尾连
        if (isZeroValue) {
          return CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3_0;
        }
        return CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_3;
      } if (currentRadioIdEx === 2) {
        if (isZeroValue) {
          return CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4_0;
        }
        return CMD_2903.emSubBetTypeWSL.SBTWSL_ZHONG_4;
      }
    } else if (currentRadioId === 1) { //buzhong
      if (currentRadioIdEx === 0) { //二尾连
        if (isZeroValue) {
          return CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2_0;
        }
        return CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_2;
      } if (currentRadioIdEx === 1) { //三尾连
        if (isZeroValue) {
          return CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3_0;
        }
        return CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_3;
      } if (currentRadioIdEx === 2) {
        if (isZeroValue) {
          return CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4_0;
        }
        return CMD_2903.emSubBetTypeWSL.SBTWSL_BU_ZHONG_4;
      }
      return CMD_2903.emSubBetTypeWSL.SBTWSL_COUNT;
    }
    return CMD_2903.emSubBetTypeWSL.SBTWSL_COUNT;
  };

  const onNumBtnHandleClick = (isActive, _title, _bottomTitle, data) => {
    if (isActive) {
      if (selectNumArray.length >= 7) {
        Toast.text('当前玩法最多选择7项！');
        return false;
      }
      selectNumArray.push(data['id']);
    } else {
      selectNumArray = selectNumArray.filter((itemNum) => itemNum !== data['id']);
    }
    console.log('🚀 ~ file: sxlPage.tsx:212 ~ onNumBtnHandleClick ~ curMulType:', selectNumArray);
    selectObj.current = {
      cbBetMainType: data['cbBetMainType'], cbBetSubType: getSubBetType(currentRadioId, currentRadioIdEx, selectNumArray), array: selectNumArray, currentRadioId, currentRadioIdEx
    };
    onChange(false, '尾数连', {}, selectObj.current);
    return true;
  };


  const onRadioButtonclick = (_, item) => {
    setCurrentRadioId(item['id']);
    ///切换之后需要更新子类型，赔率类型
    selectObj.current['currentRadioId'] = item['id'];
    onChange(false, '尾数连', {}, selectObj.current);
  };

  const onRadioButtonclickEx = (_, item) => {
    setCurrentRadioIdEx(item['id']);
    selectObj.current['currentRadioIdEx'] = item['id'];
    onChange(false, '尾数连', {}, selectObj.current);
    console.log('🚀 ~ file: sxlPage.tsx:108 ~ onRadioButtonclickEx ~ currentRadioIdEx:', currentRadioIdEx);
  };

  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        {title}
      </div>
      <div className='m-t-30 flex-1 w-full'>
        <RadioButton className='m-0-20' size='slarge' data={radioButtonList} currentId={0} onChange={onRadioButtonclick} />
      </div>
      <div className='m-t-30 flex-1 w-full'>
        <RadioButton className='m-0-20' size='wsl-small' data={radioButtonListEx} currentId={0} onChange={onRadioButtonclickEx} />
      </div>
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        <WsList mutile={mutile} onChange={onNumBtnHandleClick} currentRadioId={currentRadioId} currentRadioIdEx={currentRadioIdEx} ref={ref} />
      </div>
      <div className='m-b-50' />
    </div>
  );
});


