/**
 * 全不中-页面
 */
import {
  forwardRef,
  useCallback, useEffect, useImperativeHandle, useRef, useState
} from 'react';
import { Toast } from '@nutui/nutui-react';
import styles from '../index.module.scss';
import { RadioButton } from '@/pages/gameComponents/radioButton';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { MutileItemDescEx } from '.';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { DWORD } from '@/engine/base/basetype';
import { getMultipleData } from '../rules';


const radioButtonList = [
  {
    id: 0,
    title: '五不中',
  },
  {
    id: 1,
    title: '六不中',
  },
  {
    id: 2,
    title: '七不中',
  },
  {
    id: 3,
    title: '八不中',
  },
  {
    id: 4,
    title: '九不中',
  },
  {
    id: 5,
    title: '十不中',
  },
  {
    id: 6,
    title: '十一不中',
  },
  {
    id: 7,
    title: '十二不中',
  },
];


export const QbzPage = forwardRef((props: { title?, numlist, mutile: Array<DWORD>, onChange?, dynamicList: Array<any> }, ref) => {
  const {
    title, numlist, mutile, onChange, dynamicList
  } = props;

  const [currentRadioId, setCurrentRadioId] = useState<number>(0);
  const selectObj = useRef({});
  const selectNumArray = useRef([]);
  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>([]);
  const numEx = useRef([]);
  useEffect(() => {
    if (numEx.current.length === 0) {
      for (let index = 0; index < numlist.length; index += 1) {
        numEx.current.push({ value: (numlist as Array<any>)[index], active: false });
      }
      setNumlistEx([...numEx.current]);
    }
  }, [numlist]);

  const getMultype = (currentRadioId: number) => {
    if (currentRadioId === 0) { ///五不中
      return CMD_2903.emMultipleType.MT_QBZ_5;
    } if (currentRadioId === 1) { //六不中
      return CMD_2903.emMultipleType.MT_QBZ_6;
    } if (currentRadioId === 2) {
      return CMD_2903.emMultipleType.MT_QBZ_7;
    } if (currentRadioId === 3) {
      return CMD_2903.emMultipleType.MT_QBZ_8;
    } if (currentRadioId === 4) {
      return CMD_2903.emMultipleType.MT_QBZ_9;
    } if (currentRadioId === 5) {
      return CMD_2903.emMultipleType.MT_QBZ_10;
    } if (currentRadioId === 6) {
      return CMD_2903.emMultipleType.MT_QBZ_11;
    } if (currentRadioId === 7) {
      return CMD_2903.emMultipleType.MT_QBZ_12;
    }
    return CMD_2903.emMultipleType.MT_INVALID;
  };

  const getSubBetType = (currentRadioId: number) => {
    if (currentRadioId === 0) { ///五不中
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_5;
    } if (currentRadioId === 1) { //六不中
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_6;
    } if (currentRadioId === 2) {
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_7;
    } if (currentRadioId === 3) {
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_8;
    } if (currentRadioId === 4) {
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_9;
    } if (currentRadioId === 5) {
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_10;
    } if (currentRadioId === 6) {
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_11;
    } if (currentRadioId === 7) {
      return CMD_2903.emSubBetTypeQBZ.SBTQBZ_12;
    }
    return CMD_2903.emSubBetTypeQBZ.SBTQBZ_COUNT;
  };

  const onRadioButtonclick = (_, item) => {
    console.log('🚀 ~ file: qbzPag.tsx:110 ~ onRadioButtonclick ~ item:', item);
    setCurrentRadioId(item['id']);
    ///切换之后需要更新子类型，赔率类型
    selectObj.current['currentRadioId'] = item['id'];
    selectObj.current['cbBetSubType'] = getSubBetType(item['id']);
    selectObj.current['multType'] = getMultype(item['id']);
    onChange(false, '全不中', {}, selectObj.current);
  };

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

  const onNumBtnHandleClick = useCallback((isActive, _title, _bottomTitle, data, index) => {
    if (isActive) {
      const maxNum = currentRadioId + 7;
      console.log('🚀 ~ file: qbzPag.tsx:118 ~ onNumBtnHandleClick ~ maxNum:', maxNum);
      if (selectNumArray.current.length >= maxNum) {
        Toast.text(`当前玩法最多选择${maxNum}项！`);
        return false;
      }
      selectNumArray.current.push(data['value']['value']);
      selectNumIndex.current.push(index);
      numEx.current[index].active = true;
      setNumlistEx([...numEx.current]);
    } else {
      selectNumArray.current = selectNumArray.current.filter((itemNum) => itemNum !== data['value']['value']);
    }
    const itemValue = getMultipleData(selectNumArray.current, getMultype(currentRadioId), false,
      data['cbBetMainType'], getSubBetType(currentRadioId), mutile, dynamicList, 0).dwNormalMultiple;

    console.log('🚀 ~ file: qbzPage.tsx:157 ~ onNumBtnHandleClick ~ itemValue:', itemValue);

    selectObj.current = {
      cbBetMainType: data['cbBetMainType'], cbBetSubType: getSubBetType(currentRadioId), array: selectNumArray.current, currentRadioId, value: itemValue
    };
    onChange(false, '全不中', {}, selectObj.current);
    return true;
  }, [currentRadioId, onChange, dynamicList, mutile]);

  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        {title}
      </div>
      <div className='m-t-30 flex-1 w-full'>
        <RadioButton className='m-0-20' size='small' data={radioButtonList} currentId={0} onChange={onRadioButtonclick} />
      </div>
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        {numlistEx.map((item, i) => {
          const itemValue = getMultipleData(item['value'], getMultype(currentRadioId), false,
            CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG, getSubBetType(currentRadioId), mutile, dynamicList, 0);
          return (
            <NumberButton
              index={i}
              key={i || item}
              className='m-l-20 m-t-30'
              title={item.value}
              isActive={item.active}
              // bottomTitle={<MutileItemDesc desc='' mutile={mutile} isShowMultType isShowSymbol={false} multType={getMultype(currentRadioId)} />}
              bottomTitle={<MutileItemDescEx desc='' dwNormalMultiple={itemValue.dwNormalMultiple} isShowMultType isShowSymbol={false} />}
              onChange={onNumBtnHandleClick}
              // data={{ cbBetMainType: CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG, id: item.value }}
              data={{ cbBetMainType: CMD_2903.emBetMainType.BTM_QUAN_BU_ZHONG, cbBetSubType: getSubBetType(currentRadioId), value: itemValue }}
            />
          );
        })}
      </div>
      <div className='m-b-50' />
    </div>
  );
});
