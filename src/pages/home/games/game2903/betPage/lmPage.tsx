/**
 * 连码-页面
 */
import {
  forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState
} from 'react';
import { ContentProps } from '../Content';
import styles from '../index.module.scss';
import { NumberButton } from '@/pages/gameComponents/numberButton';
import { RadioButton } from '@/pages/gameComponents/radioButton';
import { CMD_2903 } from '@/engine/game/pc/2903/CMD_2903';
import { common } from '@/engine/cmd/common/CMD_COMMON';
import { getMultipleData } from '../rules';

const getMultype = (id: number) => {
  switch (id) {
    case 0:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_L_SI_QUAN, dwSpecialMultiple: 0 };
    case 1:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_L_SAN_QUAN, dwSpecialMultiple: 0 };
    case 2:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_L_SAN_ER, dwSpecialMultiple: CMD_2903.emMultipleType.MT_L_SAN_ER_SAN };
    case 3:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_L_ER_QUAN, dwSpecialMultiple: 0 };
    case 4:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_L_ER_TE, dwSpecialMultiple: CMD_2903.emMultipleType.MT_L_ER_TE_ER };
    case 5:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_L_TE_CHUAN, dwSpecialMultiple: 0 };
    default:
      return { dwNormalMultiple: CMD_2903.emMultipleType.MT_INVALID, dwSpecialMultiple: CMD_2903.emMultipleType.MT_INVALID };
  }
};


const radioButtonList = [
  {
    id: 0,
    title: '四全中',
    bottomTitle: (item, mutile, dynamicList, curXiao) => {
      const data = getMultipleData(0, getMultype(item.id).dwNormalMultiple, false,
        item.data['cbBetMainType'], item.data['cbBetSubType'], mutile, dynamicList, curXiao);
      return (
        <div className='df-aic-jcc wds-sm-con p-t-20'>
          <div className='color-con-ass'>{item.title}</div>
          <div className='color-red'>{data['dwNormalMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
        </div>
      );
    },
    data: { cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_SI_QUAN }
  },
  {
    id: 1,
    title: '三全中',
    bottomTitle: (item, mutile, dynamicList, curXiao) => {
      const data = getMultipleData(0, getMultype(item.id).dwNormalMultiple, false,
        item.data['cbBetMainType'], item.data['cbBetSubType'], mutile, dynamicList, curXiao);
      return (
        <div className='df-aic-jcc wds-sm-con p-t-20'>
          <div className='color-con-ass'>{item.title}</div>
          <div className='color-red'>{data['dwNormalMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
        </div>
      );
    },
    data: { cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_SAN_QUAN }
  },
  {
    id: 2,
    title: '三中二',
    bottomTitle: (item, mutile, dynamicList, curXiao) => {
      const data = getMultipleData(0, getMultype(item.id).dwNormalMultiple, getMultype(item.id).dwSpecialMultiple,
        item.data['cbBetMainType'], item.data['cbBetSubType'], mutile, dynamicList, curXiao);
      return (
        <div className='df-aic-jcc wds-sm-con p-t-20'>
          <div className='color-con-ass'>中二</div>
          <div className='color-red'>{data['dwNormalMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
          <div className='color-con-ass'>中三</div>
          <div className='color-red'>{data['dwSpecialMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
        </div>
      );
    },
    data: { cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_SAN_ER }
  },
  {
    id: 3,
    title: '二全中',
    bottomTitle: (item, mutile, dynamicList, curXiao) => {
      const data = getMultipleData(0, getMultype(item.id).dwNormalMultiple, false,
        item.data['cbBetMainType'], item.data['cbBetSubType'], mutile, dynamicList, curXiao);
      return (
        <div className='df-aic-jcc wds-sm-con p-t-20'>
          <div className='color-con-ass'>{item.title}</div>
          <div className='color-red'>{data['dwNormalMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
        </div>
      );
    },
    data: { cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_ER_QUAN }
  },
  {
    id: 4,
    title: '二中特',
    bottomTitle: (item, mutile, dynamicList, curXiao) => {
      const data = getMultipleData(0, getMultype(item.id).dwNormalMultiple, getMultype(item.id).dwSpecialMultiple,
        item.data['cbBetMainType'], item.data['cbBetSubType'], mutile, dynamicList, curXiao);
      return (
        <div className='df-aic-jcc wds-sm-con p-t-20'>
          <div className='color-con-ass'>中特</div>
          <div className='color-red'>{data['dwNormalMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
          <div className='color-con-ass'>中二</div>
          <div className='color-red'>{data['dwSpecialMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
        </div>
      );
    },
    data: { cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_ER_TE }
  },
  {
    id: 5,
    title: '特串',
    bottomTitle: (item, mutile, dynamicList, curXiao) => {
      const data = getMultipleData(0, getMultype(item.id).dwNormalMultiple, false,
        item.data['cbBetMainType'], item.data['cbBetSubType'], mutile, dynamicList, curXiao);
      return (
        <div className='df-aic-jcc wds-sm-con p-t-20'>
          <div className='color-con-ass'>{item.title}</div>
          <div className='color-red'>{data['dwNormalMultiple'] / (common.GOLD_RATIO * 1.0)}</div>
        </div>
      );
    },
    data: { cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_TE_CHUAN }
  },
];


export const LmPage = forwardRef((props: ContentProps, ref) => {
  const {
    numlist, onChange, mutile, dynamicList, curXiao
  } = props;

  const itemData = useRef<{}>({ cbBetMainType: CMD_2903.emBetMainType.BTM_LIAN_MA, cbBetSubType: CMD_2903.emSubBetTypeLianMa.SBTL_SI_QUAN });

  const selectNumIndex = useRef([]);
  const [numlistEx, setNumlistEx] = useState<Array<any>>([]);
  const numEx = useRef([]);
  const currentIdRef = useRef(0);

  useEffect(() => {
    if (numEx.current.length === 0) {
      for (let index = 0; index < numlist.length; index += 1) {
        numEx.current.push({ value: (numlist as Array<any>)[index], active: false });
      }
      setNumlistEx([...numEx.current]);
    }
  }, [numlist]);

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


  const onNumBtnHandleClick = useCallback((isActive, _title, _bottomTitle?, _data?, index?) => {
    if (isActive) {
      selectNumIndex.current.push(index);
      numEx.current[index].active = true;
      setNumlistEx([...numEx.current]);
    }
    const itemValue = getMultipleData(_title, getMultype(currentIdRef.current).dwNormalMultiple, getMultype(currentIdRef.current).dwSpecialMultiple,
      itemData.current['cbBetMainType'], itemData.current['cbBetSubType'], mutile, dynamicList, curXiao);

    onChange(isActive, '连码', { numVal: _title }, {
      cbBetMainType: itemData.current['cbBetMainType'],
      cbBetSubType: itemData.current['cbBetSubType'],
      value: itemValue
    });
    return true;
  }, [onChange, itemData, dynamicList, curXiao, mutile]);

  const onRadioHandleClick = (_, item) => {
    currentIdRef.current = item['id'];
    itemData.current = item['data'];
    onNumBtnHandleClick(false, -1);
  };


  return (
    <div className='o-y h-full'>
      <div className='m-l-30 m-t-30 wds-sm-title color-con-ass'>
        连码
      </div>
      <div>
        <div />
      </div>
      <div className='m-t-30 flex-1 w-full'>
        <RadioButton className='m-0-20' data={radioButtonList} currentId={0} dynamicList={dynamicList} curXiao={curXiao} mutile={mutile} onChange={onRadioHandleClick} />
      </div>
      <div className={`${styles['b-con']} d-f ai-c jd-start flex-w`}>
        {numlistEx.map((item, i) => (
          <NumberButton
            index={i}
            isActive={item.active}
            key={i || item}
            className='m-l-20 m-t-30'
            title={item.value}
            onChange={onNumBtnHandleClick}
          />
        ))}
      </div>
      <div className='m-b-50' />
    </div>
  );
});
